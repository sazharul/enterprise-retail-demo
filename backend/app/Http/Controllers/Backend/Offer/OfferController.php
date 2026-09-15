<?php

namespace App\Http\Controllers\Backend\Offer;

use App\Models\Offer;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class OfferController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\View\View
     */
    public function index()
    {
        $offer = Offer::orderBy('id', 'asc')->get();
        return view('offers.offer.index', compact('offer'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\View\View
     */
    public function create()
    {
        return view('offers.offer.create');
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
            'color' => 'required',
            'offer_type_id' => 'required',
            'banner_web' => 'image|nullable',
            'banner_mobile' => 'image|nullable',
        ]);


        $requestData = $request->all();
        $file1 = $request->banner_web;
        if ($file1) {
            $extension = $file1->getClientOriginalExtension();
            $file1Name = time() . rand(1, 999999) . '.' . $extension;
            $file1->move('images/Offers/Web', $file1Name);
            $path1 = '/images/Offers/Web/' . $file1Name;
        } else {
            $path1 = null;
        }
        $requestData['banner_web'] = $path1;

        $file2 = $request->banner_mobile;
        if ($file2) {
            $extension = $file2->getClientOriginalExtension();
            $file2Name = time() . rand(1, 999999) . '.' . $extension;
            $file2->move('images/Offers/Mobile', $file2Name);
            $path2 = '/images/Offers/Mobile/' . $file2Name;
        } else {
            $path2 = null;
        }
        $requestData['banner_mobile'] = $path2;
        Offer::create($requestData);


        return redirect()->route('offer.index')->with('flash_message', 'Offer added!');

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
        $offer = Offer::findOrFail($id);

        return view('offers.offer.show', compact('offer'));
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
        $offer = Offer::findOrFail($id);

        return view('offers.offer.edit', compact('offer'));
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
            'color' => 'required',
            'offer_type_id' => 'required',
            'banner_web' => 'image|nullable',
            'banner_mobile' => 'image|nullable',
        ]);
        $offer = Offer::findOrFail($id);
        $requestData = $request->all();
        $file1 = $request->banner_web;

        if ($file1) {
            $extension = $file1->getClientOriginalExtension();
            $file1Name = time() . rand(1, 999999) . '.' . $extension;
            $file1->move('images/Offers/Web', $file1Name);
            $path1 = '/images/Offers/Web/' . $file1Name;
        } else {
            $path1= $offer->banner_web;
        }
        $requestData['banner_web'] = $path1;

        $file2 = $request->banner_mobile;

        if ($file2) {
            $extension = $file2->getClientOriginalExtension();
            $file2Name = time() . rand(1, 999999) . '.' . $extension;
            $file2->move('images/Offers/Web', $file2Name);
            $path2 = '/images/Offers/Web/' . $file2Name;
        } else {
            $path2= $offer->banner_mobile;
        }
        $requestData['banner_mobile'] = $path2;

        $offer->update($requestData);

        return redirect()->route('offer.index')->with('flash_message', 'Offer Updated!');
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
        Offer::find($id)->delete();

        return redirect()->route('offer.index')->with('flash_message', 'Offer Deleted!');
    }
}
