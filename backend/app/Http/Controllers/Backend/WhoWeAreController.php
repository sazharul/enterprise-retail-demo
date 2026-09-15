<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Models\WhoWeAre;
use Illuminate\Http\Request;

class WhoWeAreController extends Controller
{
    public function index()
    {
        $document = WhoWeAre::get()->first();
        return view('company-policy/who-we-are.index', compact('document'));
    }

    public function edit(string $id)
    {
        $document = WhoWeAre::findOrFail($id);
        return view('company-policy/who-we-are.edit', compact('document'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validated = $request->validate([
            'document' => 'required',
        ]);

        $document = WhoWeAre::findOrFail($id);
        $document->update($request->all());

        return redirect()->route('whoweare.index')->with('flash_message', 'Who We Are updated!');
    }
}
