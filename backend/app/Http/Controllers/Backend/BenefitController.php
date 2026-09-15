<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Models\Benefit;
use Illuminate\Http\Request;

class BenefitController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\View\View
     */
    public function index(Request $request)
    {
        $keyword = $request->get('search');
        $perPage = 15;

        if (!empty($keyword)) {
            $benefit = Benefit::where('name', 'LIKE', "%$keyword%")
                ->orWhere('status', 'LIKE', "%$keyword%")
                ->orderBy('id', 'asc')->paginate($perPage);
        } else {
            $benefit = Benefit::orderBy('id', 'asc')->paginate($perPage);
        }

        return view('benefit.index', compact('benefit'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\View\View
     */
    public function create()
    {
        return view('benefit.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     *
     * @return \Illuminate\Http\RedirectResponse|\Illuminate\Routing\Redirector
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name'  => 'required|string|max:255',
            'image' => 'image|max:2048',

        ]);
        $requestData = $request->all();
        $file = $request->file('image');
        if ($file) {
            $extension = $file->getClientOriginalExtension();
            $fileName = time() . rand(1, 999999) . '.' . $extension;
            $file->move('images/benefits', $fileName);
            $path = '/images/benefits/' . $fileName;
        } else {
            $path = null;
        }

        // Create a new brand with the processed data
        $requestData['image'] = $path;
        Benefit::create($requestData);

        return redirect()->route('benefit.index')->with('flash_message', 'Benefit added!');
    }



    /**
     * Display the specified resource.
     *
     * @param int $id
     *
     * @return \Illuminate\View\View
     */
    public function show($id)
    {
        $benefit = Benefit::findOrFail($id);

        return view('benefit.show', compact('benefit'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param int $id
     *
     * @return \Illuminate\View\View
     */
    public function edit($id)
    {
        $benefit = Benefit::findOrFail($id);

        return view('benefit.edit', compact('benefit'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $id
     *
     * @return \Illuminate\Http\RedirectResponse|\Illuminate\Routing\Redirector
     */
    public function update(Request $request, $id)
    {

        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'image' => 'image|max:2048',

        ]);


        $benefit = Benefit::findOrFail($id);
        $requestData = $request->all();

        $file = $request->file('image');
        if ($file) {
            $extension = $file->getClientOriginalExtension();
            $fileName = time() . rand(1, 999999) . '.' . $extension;
            $file->move('images/benefits', $fileName);
            $path = '/images/benefits/' . $fileName;
        } else {

            $path= $benefit->image;
        }
        $requestData['image'] = $path;
        $benefit->update($requestData);

        return redirect()->route('benefit.index')->with('flash_message', 'Benefit updated!');
    }




    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     *
     * @return \Illuminate\Http\RedirectResponse|\Illuminate\Routing\Redirector
     */
    public function destroy($id)
    {
        Benefit::destroy($id);

        return redirect()->route('benefit.index')->with('flash_message', 'Benefit deleted!');
    }
}
