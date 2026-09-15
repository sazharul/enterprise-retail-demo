<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Models\TermAndCondition;
use Illuminate\Http\Request;

class TermAndConditionController extends Controller
{
    public function index()
    {
        $document = TermAndCondition::get()->first();
        return view('company-policy/term-condition.index', compact('document'));
    }

    public function edit(string $id)
    {
        $document = TermAndCondition::findOrFail($id);
        return view('company-policy/term-condition.edit', compact('document'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validated = $request->validate([
            'document' => 'required',
        ]);

        $document = TermAndCondition::findOrFail($id);
        $document->update($request->all());

        return redirect()->route('termcondition.index')->with('flash_message', 'Terms And Condition updated!');
    }
}
