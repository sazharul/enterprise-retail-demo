<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Models\PrivacyPolicy;
use Illuminate\Http\Request;

class PrivacyPolicyController extends Controller
{
    public function index()
    {
        $document = PrivacyPolicy::get()->first();
        return view('company-policy/privacy-policy.index', compact('document'));
    }

    public function edit(string $id)
    {
        $document = PrivacyPolicy::findOrFail($id);
        return view('company-policy/privacy-policy.edit', compact('document'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validated = $request->validate([
            'document' => 'required',
        ]);

        $document = PrivacyPolicy::findOrFail($id);
        $document->update($request->all());

        return redirect()->route('privacypolicy.index')->with('flash_message', 'Privacy Policy updated!');
    }
}
