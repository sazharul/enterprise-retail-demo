@extends('layouts.app')
@section('title', 'Product List')

@section('content')
    <div class="main-content">

        <!--begin::Validation Message-->
        @include('include.validation-message')
        <!--end::Validation Message-->

        <div class="card">
            <div class="card-header">Product List</div>
            <div class="card-body">
                <a href="{{ route('product.create') }}" class="btn btn-success btn-sm" title="Add New Product">
                    <i class="lni lni-plus"></i> Add New Product
                </a>

                <form method="GET" action="{{ url('/blog') }}" accept-charset="UTF-8"
                    class="form-inline my-2 my-lg-0 float-right" staff="search" style="display: inline-block;float: right;">
                    <div class="input-group">
                        <input type="text" class="form-control" name="search" placeholder="Search..."
                            value="{{ request('search') }}">
                        <span class="input-group-append">
                            <button class="btn btn-secondary" type="submit">
                                <i class="lni lni-search-alt"></i>
                            </button>
                        </span>
                    </div>
                </form>

                <br />
                <br />
                <div class="table-responsive">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody class="align-middle">
                            @foreach ($products as $product)
                                <tr>
                                    <td>{{ $loop->iteration }}</td>
                                    <td>
                                        <div class="d-flex justify-content-start align-items-center">
                                            <div class="avatar me-2">
                                                <img src="{{ $product->avatar ? asset($product->avatar) : asset('backend/assets/images/avatar.png') }}" alt="Avatar" class="rounded-circle">
                                            </div>
                                            <span class="fw-medium">{{ ucwords($product->name) }}</span>
                                        </div>
                                    </td>
                                    
                                    <td>
                                        @if( $product->status == 1)
                                        <span class="badge bg-success">Active</span>
                                        @else
                                        <span class="badge bg-danger">InActive</span>
                                        @endif
                                    </td>
                                    <td>

                                        @if ($product->id > 1)
                                            <a href="{{ route('product.edit', $product->id) }}" title="Edit Product">
                                                <button class="btn btn-primary btn-sm"><i class="fa fa-pencil-square-o"
                                                        aria-hidden="true"></i> Edit
                                                </button>
                                            </a>

                                            <form method="POST" action="{{ route('product.destroy', $product->id) }}"
                                                accept-charset="UTF-8" style="display:inline">
                                                {{ method_field('DELETE') }}
                                                {{ csrf_field() }}
                                                <button type="submit" class="btn btn-danger btn-sm" title="Delete staff"
                                                    onclick="return confirm(&quot;Confirm delete?&quot;)"><i
                                                        class="fa fa-trash-o" aria-hidden="true"></i>
                                                    Delete
                                                </button>
                                            </form>
                                        @endif
                                    </td>
                                </tr>
                            @endforeach
                        </tbody>

                    </table>

                    {{-- <div class="pagination-wrapper"> {!! $products->appends(['search' => Request::get('search')])->render() !!} </div> --}}

                </div>

            </div>
        </div>
    </div>
@endsection
