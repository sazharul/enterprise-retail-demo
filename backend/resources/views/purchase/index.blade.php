@extends('layouts.app')
@section('title', 'Purchase List')

@section('content')
    <div class="main-content">

        <!--begin::Validation Message-->
        @include('include.validation-message')
        <!--end::Validation Message-->

        <div class="card">
            <div class="card-header">Purchase List</div>
            <div class="card-body">
                <a href="{{ route('purchase.create') }}" class="btn btn-success btn-sm" title="Add New Purchase">
                    <i class="lni lni-plus"></i> Add New Purchase
                </a>

                <form method="GET" action="{{ route('purchase.index') }}" accept-charset="UTF-8"
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
                                <th>Purchase No.</th>
                                <th>TAX</th>
                                <th>VAT</th>
                                <th>Total Dis.</th>
                                <th>Total Qty.</th>
                                <th>Note</th>
                                <th>Purchase By</th>
                                <th>Time</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody class="align-middle">
                            @foreach ($purchases as $purchase)
                                <tr>
                                    <td>{{ $loop->iteration }}</td>
                                    <td>{{ $purchase->purchase_no }}</td>
                                    <td>{{ $purchase->tax }}</td>
                                    <td>{{ $purchase->vat }}</td>
                                    <td>{{ $purchase->total_discount }}</td>
                                    <td>{{ $purchase->total_quantity }}</td>
                                    <td>{{ $purchase->note }}</td>
                                    <td>{{ $purchase->admin->name }}</td>
                                    <td>{{ str_replace(',', '', $purchase->created_at->format('d M y, g:i a')); }}</td>
                                    <td>
                                        <a href="{{ route('purchase.edit', $purchase->id) }}" title="Edit Purchase">
                                            <button class="btn btn-primary btn-sm"><i class="fa fa-pencil-square-o"
                                                    aria-hidden="true"></i> Edit
                                            </button>
                                        </a>

                                        {{-- <form method="POST" action="{{ route('purchase.destroy', $purchase->id) }}"
                                            accept-charset="UTF-8" style="display:inline">
                                            {{ method_field('DELETE') }}
                                            {{ csrf_field() }}
                                            <button type="submit" class="btn btn-danger btn-sm" title="Delete staff"
                                                onclick="return confirm(&quot;Confirm delete?&quot;)"><i
                                                    class="fa fa-trash-o" aria-hidden="true"></i>
                                                Delete
                                            </button>
                                        </form> --}}
                                    </td>
                                </tr>
                            @endforeach
                        </tbody>

                    </table>

                    <div class="pagination-wrapper"> {!! $purchases->appends(['search' => Request::get('search')])->render() !!} </div>

                </div>

            </div>
        </div>
    </div>
@endsection
