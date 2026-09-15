<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Models\Ingredient;
use Illuminate\Http\Request;

class IngredientController extends Controller
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
            $ingredient = Ingredient::where('name', 'LIKE', "%$keyword%")
                ->orWhere('status', 'LIKE', "%$keyword%")
                ->orderBy('id', 'asc')->paginate($perPage);
        } else {
            $ingredient = Ingredient::orderBy('id', 'asc')->paginate($perPage);
        }

        return view('ingredient.index', compact('ingredient'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\View\View
     */
    public function create()
    {
        return view('ingredient.create');
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
            $file->move('images/ingredients', $fileName);
            $path = '/images/ingredients/' . $fileName;
        } else {
            $path = null;
        }

        // Create a new brand with the processed data
        $requestData['image'] = $path;
        Ingredient::create($requestData);


        return redirect()->route('ingredient.index')->with('flash_message', 'Ingredient added!');
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
        $ingredient = Ingredient::findOrFail($id);

        return view('ingredient.show', compact('ingredient'));
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
        $ingredient = Ingredient::findOrFail($id);

        return view('ingredient.edit', compact('ingredient'));
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


        $ingredient = Ingredient::findOrFail($id);
        $requestData = $request->all();

        $file = $request->file('image');
        if ($file) {
            $extension = $file->getClientOriginalExtension();
            $fileName = time() . rand(1, 999999) . '.' . $extension;
            $file->move('images/ingredients', $fileName);
            $path = '/images/ingredients/' . $fileName;
        } else {

            $path= $ingredient->image;
        }
        $requestData['image'] = $path;
        $ingredient->update($requestData);

        return redirect()->route('ingredient.index')->with('flash_message', 'Ingredient updated!');
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
        Ingredient::destroy($id);

        return redirect()->route('ingredient.index')->with('flash_message', 'Ingredient deleted!');
    }
}
