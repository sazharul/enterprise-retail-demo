<?php

namespace App\Http\Controllers\Backend;

use App\Models\Concern;
use Illuminate\Http\Request;
use App\Models\SectionFourteen;
use App\Http\Controllers\Controller;

class SectionFourteenController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $keyword = $request->get('search');
        $perPage = 15;

        if (!empty($keyword)) {
            $sections = SectionFourteen::where('name', 'LIKE', "%$keyword%")
                ->orWhere('status', 'LIKE', "%$keyword%")
                ->orderBy('id', 'asc')->paginate($perPage);
        } else {
            $sections = SectionFourteen::orderBy('id', 'asc')->paginate($perPage);
        }

        return view('section_fourteen.index', compact('sections'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $concerns = Concern::where('status', 1)
        ->whereNotIn('id', function ($query) {
        $query->select('concern_id')
        ->from(with(new SectionFourteen)->getTable());

    })
    ->get();
    // dd()
        return view('section_fourteen.create',compact('concerns'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $requestData = $request->all();
        $file = $request->image;
        if ($file) {
            $extension = $file->getClientOriginalExtension();
            $fileName = time() . rand(1, 999999) . '.' . $extension;
            $file->move('images/SectionFourteen', $fileName);
            $path = '/images/SectionFourteen/' . $fileName;
        } else {
            $path = null;
        }
        $requestData['image'] = $path;
        SectionFourteen::create($requestData);
        return redirect()->route('section_fourteen.index')->with('flash_message', 'SectionFourteen Added!');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $sections = SectionFourteen::findOrFail($id);
        $concerns = Concern::where('status', 1)
        ->whereNotIn('id', function ($query) {
        $query->select('concern_id')
        ->from(with(new SectionFourteen)->getTable());

    })
    ->get();
        return view('section_fourteen.edit', compact('sections','concerns'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $section_fourteen = SectionFourteen::findOrFail($id);
        $requestData = $request->all();
        $file = $request->image;

        if ($file) {
            $extension = $file->getClientOriginalExtension();
            $fileName = time() . rand(1, 999999) . '.' . $extension;
            $file->move('images/SectionFourteen', $fileName);
            $path = '/images/SectionFourteen/' . $fileName;


            if (file_exists(public_path($section_fourteen->image))) {
                unlink(public_path($section_fourteen->image));
            }
        } else {
            $path= $section_fourteen->image;
        }
        $requestData['image'] = $path;

        $section_fourteen->update($requestData);

        return redirect()->route('section_fourteen.index')->with('flash_message', 'SectionFourteen Updated!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        SectionFourteen::destroy($id);

        return redirect()->route('section_fourteen.index')->with('flash_message', 'SectionFourteen Deleted!');
    }
}
