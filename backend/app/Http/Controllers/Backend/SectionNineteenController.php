<?php

namespace App\Http\Controllers\Backend;

use Illuminate\Http\Request;
use App\Models\SectionNineteen;
use App\Http\Controllers\Controller;

class SectionNineteenController extends Controller
{
    public function index()
    {
        $sections = SectionNineteen::get()->first();
        return view('section_nineteen.index', compact('sections'));
    }

    public function edit(string $id)
    {
        $sections = SectionNineteen::findOrFail($id);
        return view('section_nineteen.edit', compact('sections'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validated = $request->validate([
            'image' => 'image|max:2048',
        ]);

        $sections = SectionNineteen::findOrFail($id);
        $requestData = $request->all();
        $file = $request->image;

        if ($file) {
            $extension = $file->getClientOriginalExtension();
            $fileName = time() . rand(1, 999999) . '.' . $extension;
            $file->move('images/SectionNineteen', $fileName);
            $path = '/images/SectionNineteen/' . $fileName;

            if (file_exists(public_path($sections->image))) {
                unlink(public_path($sections->image));
            }
        } else {
            $path= $sections->image;
        }

        $requestData['image'] = $path;
        // dd($path);
        $sections->update($requestData);

        return redirect()->route('section_nineteen.index')->with('flash_message', 'Return And Refund updated!');
    }
}
