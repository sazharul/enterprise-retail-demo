@extends('layouts.app')
@section('title', 'Combo Product List')

@section('content')
    <div class="main-content">

        <!--begin::Validation Message-->
        @include('include.validation-message')
        <!--end::Validation Message-->

        <div class="card">
            <div class="card-header">
                <div class="row">
                    <div class="col-6">
                        <h6 class="mb-0">Combo Product List</h6>
                    </div>
                    <div class="col-6">
                        <a href="{{ route('combo_product.create') }}" class="btn btn-sm btn-primary" style="float: right" title="Add Combo Product">Add Combo Product</a>
                    </div>
                </div>
            </div>
            <div class="card-body">
                <div class="table-responsive">
                    <table class="table" id="example" style="width:100%">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Is Optional</th>
                                <th>Description</th>
                                <th>Time</th>
                                {{-- <th>Action</th> --}}
                            </tr>
                        </thead>
                        <tbody class="align-middle">
                            @foreach ($comboProducts as $comboProduct)
                                <tr>
                                    <td>{{ $loop->iteration }}</td>
                                    <td>
                                        <div class="d-flex justify-content-start align-items-center">
                                            <div class="avatar me-2">
                                                <img src="{{ $comboProduct->image ? asset($comboProduct->image) : asset('backend/assets/images/avatar.png') }}" alt="Avatar" class="rounded-circle">
                                            </div>
                                            <span class="fw-medium">{{ ucwords($comboProduct->name) }}</span>
                                        </div>
                                    </td>
                                    
                                    <td>
                                        @if( $comboProduct->is_optional == 1)
                                        <span class="badge bg-success">Optional</span>
                                        @else
                                        <span class="badge bg-success">Fixed</span>
                                        @endif
                                    </td>
                                    <td>{{ $comboProduct->description }}</td>
                                    <td>{{ str_replace(',', '', $comboProduct->created_at->format('d M y, g:i a')); }}</td>
                                    {{-- <td>
                                        <a href="{{ route('purchase.edit', $purchase->id) }}" title="Edit Purchase">
                                            <button class="btn btn-primary btn-sm"><i class="fa fa-pencil-square-o"
                                                    aria-hidden="true"></i> Edit
                                            </button>
                                        </a>

                                        <form method="POST" action="{{ route('purchase.destroy', $purchase->id) }}"
                                            accept-charset="UTF-8" style="display:inline">
                                            {{ method_field('DELETE') }}
                                            {{ csrf_field() }}
                                            <button type="submit" class="btn btn-danger btn-sm" title="Delete staff"
                                                onclick="return confirm(&quot;Confirm delete?&quot;)"><i
                                                    class="fa fa-trash-o" aria-hidden="true"></i>
                                                Delete
                                            </button>
                                        </form>
                                    </td> --}}
                                </tr>
                            @endforeach
                        </tbody>

                    </table>

                    {{-- <div class="pagination-wrapper"> {!! $purchases->appends(['search' => Request::get('search')])->render() !!} </div> --}}

                </div>

            </div>
        </div>
    </div>
@endsection
