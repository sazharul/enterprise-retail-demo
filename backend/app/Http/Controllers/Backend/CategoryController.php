<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Category;

class CategoryController extends Controller
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
            $category = Category::where('name', 'LIKE', "%$keyword%")
                ->orWhere('status', 'LIKE', "%$keyword%")
                ->orderBy('id', 'asc')->paginate($perPage);
        } else {
            $category = Category::orderBy('id', 'asc')->paginate($perPage);
        }

        return view('category.index', compact('category'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\View\View
     */
    public function create()
    {
        return view('category.create');
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
            'icon' => 'image|max:2048',
        ]);


        $requestData = $request->all();
        $file1 = $request->image;
        if ($file1) {
            $extension = $file1->getClientOriginalExtension();
            $fileName = time() . rand(1, 999999) . '.' . $extension;
            $file1->move('images/Categories/image', $fileName);
            $path1 = '/images/Categories/image/' . $fileName;
        } else {
            $path1 = null;
        }
        $requestData['image'] = $path1;

        $file2 = $request->icon;
        if ($file2) {
            $extension = $file2->getClientOriginalExtension();
            $fileName = time() . rand(1, 999999) . '.' . $extension;
            $file2->move('images/Categories/icon', $fileName);
            $path2 = '/images/Categories/icon/' . $fileName;
        } else {
            $path2 = null;
        }
        $requestData['icon'] = $path2;
        Category::create($requestData);



        return redirect()->route('category.index')->with('flash_message', 'Category added!');
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
        $category = Category::findOrFail($id);

        return view('category.show', compact('category'));
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
        $category = Category::findOrFail($id);

        return view('category.edit', compact('category'));
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
            'icon' => 'image|max:2048',
        ]);
        $category = Category::findOrFail($id);
        $requestData = $request->all();
        $file1 = $request->image;
        if ($file1) {
            $extension = $file1->getClientOriginalExtension();
            $fileName = time() . rand(1, 999999) . '.' . $extension;
            $file1->move('images/Categories/image', $fileName);
            $path1 = '/images/Categories/image/' . $fileName;


            if (file_exists(public_path($category->image))) {
                unlink(public_path($category->image));
            }
        } else {
            $path1 = $category->image;;
        }
        $requestData['image'] = $path1;

        $file2 = $request->icon;
        if ($file2) {
            $extension = $file2->getClientOriginalExtension();
            $fileName = time() . rand(1, 999999) . '.' . $extension;
            $file2->move('images/Categories/icon', $fileName);
            $path2 = '/images/Categories/icon/' . $fileName;

            if (file_exists(public_path($category->icon))) {
                unlink(public_path($category->icon));
            }
        } else {
            $path2 = $category->icon;
        }
        $requestData['icon'] = $path2;

        $category->update($requestData);

        return redirect()->route('category.index')->with('flash_message', 'Category updated!');
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
        Category::destroy($id);

        return redirect()->route('category.index')->with('flash_message', 'Category deleted!');
    }

    //For ajax request
    public function getSubCategory(Request $request){
        $subCategories = Category::where('parent_id', $request->category_id)->where('status', 1)->get();
        return response()->json($subCategories);
    }

    //For ajax request
    public function getSubSubCategory(Request $request){
        $subSubCategories = Category::where('parent_id', $request->sub_category_id)->where('status', 1)->get();
        return response()->json($subSubCategories);
    }
}
