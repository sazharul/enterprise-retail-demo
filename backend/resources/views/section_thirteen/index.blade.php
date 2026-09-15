@extends('layouts.app')
@section('title', 'Section 13 List')
@section('content')
    <div class="main-content">
        <div class="row">
            <div class="col-md-8 offset-md-2">
                <div class="card">
                    <div class="card-header">Section 13</div>
                    <div class="card-body">
                        <a href="{{ route('section_thirteen.create') }}" class="btn btn-success btn-sm" title="Add New Section 13">
                            <i class="fa fa-plus" aria-hidden="true"></i> Add New
                        </a>

                        <form method="GET" action="{{ route('section_thirteen.index') }}" accept-charset="UTF-8" class="form-inline my-2 my-lg-0 float-right" role="search"
                              style="display: inline-block;float: right;">
                            <div class="input-group">
                                <input type="text" class="form-control" name="search" placeholder="Search..." value="{{ request('search') }}">
                                <span class="input-group-append">
                                    <button class="btn btn-secondary" type="submit">
                                        <i class="lni lni-search-alt"></i>
                                    </button>
                                </span>
                            </div>
                        </form>

                        <br/>
                        <br/>
                        <div class="table-responsive">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th>#</th>

                                        <th>Product Name</th>
                                        <th>Combo Name</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    @foreach($sections as $item)
                                        <tr>
                                            <td>{{ $loop->iteration }}</td>
                                            <td>{{ $item->product?->name }}</td>
                                            <td>{{ $item->combo?->name }}</td>
                                            <td>{{ ($item->status == 1) ? 'Active' : 'InActive' }}</td>

                                            <td>

                                                <a href="{{ route('section_thirteen.create') }}" title="Edit Section 13">
                                                    <button class="btn btn-primary btn-sm"><i class="fa fa-pencil-square-o" aria-hidden="true"></i> Edit
                                                    </button>
                                                </a>


                                            </td>
                                        </tr>
                                    @endforeach
                                </tbody>

                            </table>

                            <div class="pagination-wrapper"> {!! $sections->appends(['search' => Request::get('search')])->render() !!} </div>

                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
