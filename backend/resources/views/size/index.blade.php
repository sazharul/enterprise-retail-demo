@extends('layouts.app')
@section('title', 'Size List')
@section('content')
    <div class="main-content">
        <div class="row">
            <div class="col-md-8 offset-md-2">
                <div class="card">
                    <div class="card-header">Sizes</div>
                    <div class="card-body">
                        <a href="{{ route('size.create') }}" class="btn btn-success btn-sm" title="Add New Brand">
                            <i class="fa fa-plus" aria-hidden="true"></i> Add New
                        </a>

                        <form method="GET" action="{{ route('size.index') }}" accept-charset="UTF-8" class="form-inline my-2 my-lg-0 float-right" role="search"
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
                                    <th>Name</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                @foreach($size as $item)
                                    <tr>
                                        <td>{{ $loop->iteration }}</td>
                                        <td>{{ $item->name }}</td>
                                        <td>{{ ($item->status == 1) ? 'Active' : 'InActive' }}</td>
                                        <td>

                                            <a href="{{ route('size.edit',$item->id) }}" title="Edit Brand">
                                                <button class="btn btn-primary btn-sm"><i class="fa fa-pencil-square-o" aria-hidden="true"></i> Edit
                                                </button>
                                            </a>

                                            <form method="POST" action="{{ route('size.destroy',$item->id) }}" accept-charset="UTF-8"
                                                  style="display:inline">
                                                {{ method_field('DELETE') }}
                                                {{ csrf_field() }}
                                                <button type="submit" class="btn btn-danger btn-sm" title="Delete Brand"
                                                        onclick="return confirm(&quot;Confirm delete?&quot;)"><i class="fa fa-trash-o"
                                                                                                                 aria-hidden="true"></i>
                                                    Delete
                                                </button>
                                            </form>
                                        </td>
                                    </tr>
                                @endforeach
                                </tbody>

                            </table>

                            <div class="pagination-wrapper"> {!! $size->appends(['search' => Request::get('search')])->render() !!} </div>

                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection

