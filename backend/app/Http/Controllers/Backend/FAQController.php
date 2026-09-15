<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\FAQ;
class FAQController extends Controller
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
            $faq = FAQ::Where('status', 'LIKE', "%$keyword%")
                ->orderBy('id', 'asc')->paginate($perPage);
        } else {
            $faq = FAQ::orderBy('id', 'asc')->paginate($perPage);
        }

        return view('faq.index', compact('faq'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\View\View
     */
    public function create()
    {
        return view('faq.create');
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
            'question' => 'required',
            'answer' => 'required',
        ]);

        $requestData = $request->all();
        FAQ::create($requestData);

        return redirect()->route('faq.index')->with('flash_message', 'FAQ added!');
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
        $faq = FAQ::findOrFail($id);

        return view('faq.show', compact('faq'));
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
        $faq = FAQ::findOrFail($id);

        return view('faq.edit', compact('faq'));
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
        $faq = FAQ::findOrFail($id);
        $validated = $request->validate([
            'question' => 'required',
            'answer' => 'required',
        ]);

        $requestData = $request->all();

        $faq->update($requestData);

        return redirect()->route('faq.index')->with('flash_message', 'FAQ updated!');
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
        FAQ::destroy($id);

        return redirect()->route('faq.index')->with('flash_message', 'FAQ deleted!');
    }
}
