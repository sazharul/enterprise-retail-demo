<?php

namespace App\Http\Controllers\Backend;


use App\Http\Controllers\Controller;
use App\Models\Formulation;
use Illuminate\Http\Request;

class FormulationController extends Controller
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
            $formulation = Formulation::where('name', 'LIKE', "%$keyword%")
                ->orWhere('status', 'LIKE', "%$keyword%")
                ->orderBy('id', 'asc')->paginate($perPage);
        } else {
            $formulation = Formulation::orderBy('id', 'asc')->paginate($perPage);
        }

        return view('formulation.index', compact('formulation'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\View\View
     */
    public function create()
    {
        return view('formulation.create');
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
        $validated = $request->validate([
            'name' => 'required',
            'image' => 'image|max:2048',
        ]);

        $requestData = $request->all();
        $file = $request->image;
        if ($file) {
            $extension = $file->getClientOriginalExtension();
            $fileName = time() . rand(1, 999999) . '.' . $extension;
            $file->move('images/Formulations', $fileName);
            $path = '/images/Formulations/' . $fileName;
        } else {
            $path = null;
        }
        $requestData['image'] = $path;
        Formulation::create($requestData);



        return redirect()->route('formulation.index')->with('flash_message', 'Formulation added!');
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
        $formulation = Formulation::findOrFail($id);

        return view('formulation.show', compact('formulation'));
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
        $formulation = Formulation::findOrFail($id);

        return view('formulation.edit', compact('formulation'));
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
        $validated = $request->validate([
            'name' => 'required',
            'image' => 'image|max:2048',
        ]);
        $formulation = Formulation::findOrFail($id);
        $requestData = $request->all();
        $file = $request->image;
        if ($file) {
            $extension = $file->getClientOriginalExtension();
            $fileName = time() . rand(1, 999999) . '.' . $extension;
            $file->move('images/Formulations', $fileName);
            $path = '/images/Formulations/' . $fileName;
        } else {
            $path= $formulation->image;
        }
        $requestData['image'] = $path;

        $formulation->update($requestData);

        return redirect()->route('formulation.index')->with('flash_message', 'Formulation updated!');
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
        Formulation::destroy($id);

        return redirect()->route('formulation.index')->with('flash_message', 'Formulation deleted!');
    }
}