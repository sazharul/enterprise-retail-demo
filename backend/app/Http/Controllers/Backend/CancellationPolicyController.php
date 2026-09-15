<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Models\CancellationPolicy;
use Illuminate\Http\Request;

class CancellationPolicyController extends Controller
{
    public function index()
    {
        $document = CancellationPolicy::get()->first();
        return view('company-policy/cancellation-policy.index', compact('document'));
    }

    public function edit(string $id)
    {
        $document = CancellationPolicy::findOrFail($id);
        return view('company-policy/cancellation-policy.edit', compact('document'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validated = $request->validate([
            'document' => 'required',
        ]);

        $document = CancellationPolicy::findOrFail($id);
        $document->update($request->all());

        return redirect()->route('cancellationpolicy.index')->with('flash_message', 'Cancellation Policy updated!');
    }
}
