<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Models\DeletionPolicy;
use Illuminate\Http\Request;

class DeletionPolicyController extends Controller
{
    public function index()
    {
        $document = DeletionPolicy::get()->first();
        return view('company-policy/deletion-policy.index', compact('document'));
    }

    public function edit(string $id)
    {
        $document = DeletionPolicy::findOrFail($id);
        return view('company-policy/deletion-policy.edit', compact('document'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validated = $request->validate([
            'document' => 'required',
        ]);

        $document = DeletionPolicy::findOrFail($id);
        $document->update($request->all());

        return redirect()->route('deletionpolicy.index')->with('flash_message', 'Deletion Policy updated!');
    }
}