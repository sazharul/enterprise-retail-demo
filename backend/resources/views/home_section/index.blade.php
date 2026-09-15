@extends('layouts.app')
@section('title', 'Home Section List')
@section('content')
    <div class="main-content">
        <div class="row">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header">Home Section</div>
                    <div class="card-body">
                        {{-- <a href="{{ route('home_section.create') }}" class="btn btn-success btn-sm" title="Add New Home Section">
                            <i class="fa fa-plus" aria-hidden="true"></i> Add New
                        </a> --}}

                        {{-- <form method="GET" action="{{ route('home_section.index') }}" accept-charset="UTF-8" class="form-inline my-2 my-lg-0 float-right" role="search"
                              style="display: inline-block;float: right;">
                            <div class="input-group">
                                <input type="text" class="form-control" name="search" placeholder="Search..." value="{{ request('search') }}">
                                <span class="input-group-append">
                                    <button class="btn btn-secondary" type="submit">
                                        <i class="lni lni-search-alt"></i>
                                    </button>
                                </span>
                            </div>
                        </form> --}}

                        <br/>
                        <br/>
                        <div class="table-responsive">
                            <table class="table" id="homesection">
                                <thead>
                                    <tr>
                                        <th>Section ID</th>
                                        <th>Title Web</th>
                                        <th>Title mobile</th>
                                        <th>Banner</th>
                                        <th>Position</th>
                                        <th>Section Type</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    @foreach($home_section as $item)
                                        <tr>
                                            <td>{{ $item->id }}</td>
                                            <td>{{ $item->title }}</td>
                                            <td>{{ $item->mobile_title }}</td>
                                            <td><img src="{{ asset($item->banner) }}" alt="" width="150px" height="100px"></td>
                                            <td>{{ $item->position }}</td>
                                            <td>{{ ($item->type == 1) ? 'Web' : (($item->type == 2) ? 'Mobile' : 'Both') }}</td>
                                            <td>{{ ($item->status == 1) ? 'Active' : 'InActive' }}</td>
                                            <td>

                                                <a href="{{ route('home_section.edit',$item->id) }}" title="Edit Home Section">
                                                    <button class="btn btn-primary btn-sm"><i class="fa fa-pencil-square-o" aria-hidden="true"></i> Edit
                                                    </button>
                                                </a>

                                                {{-- <form method="POST" action="{{ route('home_section.destroy',$item->id) }}" accept-charset="UTF-8"
                                                      style="display:inline">
                                                    {{ method_field('DELETE') }}
                                                    {{ csrf_field() }}
                                                    <button type="submit" class="btn btn-danger btn-sm" title="Delete Home Section"
                                                            onclick="return confirm(&quot;Confirm delete?&quot;)"><i class="fa fa-trash-o"
                                                                                                                     aria-hidden="true"></i>
                                                        Delete
                                                    </button>
                                                </form> --}}
                                            </td>
                                        </tr>
                                    @endforeach
                                </tbody>

                            </table>

                            {{-- <div class="pagination-wrapper"> {!! $home_section->appends(['search' => Request::get('search')])->render() !!} </div> --}}

                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
@push('scripts')
<script>
    $(document).ready(function() {
        $('#homesection').DataTable();
    });
</script>

@endpush
