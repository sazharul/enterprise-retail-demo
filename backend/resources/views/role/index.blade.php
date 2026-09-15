@extends('layouts.app')
@section('title', 'Role List')
@section('content')
    <div class="main-content">
        <div class="card">
            <div class="card-header">Role List</div>
            <div class="card-body">
                <a href="{{ route('role.create') }}" class="btn btn-success btn-sm" title="Add New Role">
                    <i class="lni lni-plus"></i> Add New Role
                </a>

                <form method="GET" action="{{ url('/blog') }}" accept-charset="UTF-8" class="form-inline my-2 my-lg-0 float-right" role="search"
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
                            <th>Role Name</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        @foreach($roles as $role)
                            <tr>
                                <td>{{ $loop->iteration }}</td>
                                <td>{{ $role->name }}</td>
                                <td>{{ ($role->status == 1) ? 'Active' : 'InActive' }}</td>
                                <td>

                                    @if ($role->id > 1)
                                        <a href="{{ route('role.edit', $role->id) }}" title="Edit Blog">
                                            <button class="btn btn-primary btn-sm"><i class="fa fa-pencil-square-o" aria-hidden="true"></i> Edit
                                            </button>
                                        </a>

                                        <form method="POST" action="{{ route('role.destroy', $role->id) }}" accept-charset="UTF-8"
                                                style="display:inline">
                                            {{ method_field('DELETE') }}
                                            {{ csrf_field() }}
                                            <button type="submit" class="btn btn-danger btn-sm" title="Delete Role"
                                                    onclick="return confirm(&quot;Confirm delete?&quot;)"><i class="fa fa-trash-o"
                                                                                                                aria-hidden="true"></i>
                                                Delete
                                            </button>
                                        </form>
                                    @endif
                                </td>
                            </tr>
                        @endforeach
                        </tbody>

                    </table>

                    {{-- <div class="pagination-wrapper"> {!! $blog->appends(['search' => Request::get('search')])->render() !!} </div> --}}

                </div>

            </div>
        </div>
    </div>
@endsection
