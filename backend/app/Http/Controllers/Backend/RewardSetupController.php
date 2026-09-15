<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Models\RewardSetup;
use Illuminate\Http\Request;

class RewardSetupController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $reward = RewardSetup::first();
        return view('reward.index', compact('reward'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'amount' => 'numeric|required',
            'reward_point' => 'numeric|required',
        ]);

        $reward = RewardSetup::first() ?? new RewardSetup();
        $reward->amount = $request->amount;
        $reward->reward_point = $request->reward_point;
        $reward->reward_point_value = $request->reward_point_value;
        $reward->save();
        return redirect()->back()->with('success', 'Reward Setup Updated Successfully..!!');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
