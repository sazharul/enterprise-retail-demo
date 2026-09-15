<?php

namespace App\Http\Controllers\Backend;

use Illuminate\Http\Request;
use App\Models\ReturnAndRefund;
use App\Http\Controllers\Controller;

class ReturnAndRefundController extends Controller
{
    public function index()
    {
        $document = ReturnAndRefund::get()->first();
        return view('company-policy/return-refund.index', compact('document'));
    }

    public function edit(string $id)
    {
        $document = ReturnAndRefund::findOrFail($id);
        return view('company-policy/return-refund.edit', compact('document'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validated = $request->validate([
            'document' => 'required',
        ]);

        $document = ReturnAndRefund::findOrFail($id);
        $document->update($request->all());

        return redirect()->route('returnrefund.index')->with('flash_message', 'Return And Refund updated!');
    }
}
