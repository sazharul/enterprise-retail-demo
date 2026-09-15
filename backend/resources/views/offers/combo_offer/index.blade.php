@extends('layouts.app')
@section('title', 'Combo Offer List')
@push('css')
    <style>
        .dataTables_wrapper .dataTables_filter {
            margin-bottom: 30px; /* Adjust the margin bottom as needed */
        }

    </style>
@endpush
@section('content')
    <div class="main-content">
        <div class="row">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header">Combo Offer List</div>
                    <div class="card-body">
                        <a href="{{ route('combo_offer.create') }}" class="btn btn-success btn-sm" title="Add New Offer">
                            <i class="fa fa-plus" aria-hidden="true"></i> Add New
                        </a>

                        <br />
                        <br />
                        <div class="table-responsive" >
                            <table id="example" style="width:100%" >
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Name</th>
                                        <th>Total Product</th>
                                        <th>Offer Type</th>
                                        <th>Free Delivery</th>
                                        <th>Min Amount</th>
                                        <th>Max Amount</th>
                                        <th>Start Date</th>
                                        <th>Expiry Date</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    @if ($offers)
                                        @foreach ($offers as $item)
                                            <tr>
                                                <td>{{ $loop->iteration }}</td>
                                                <td>{{ $item->name }}</td>
                                                <td>{{ $item->offer_combos_count }}</td>
                                                <td>{{ $item->offer_type_id == 2 ? 'Combo' : 'UptoSale' }}</td>
                                                <td>{{ ($item->is_free_delivery == 1) ? 'Yes' : 'No' }}</td>
                                                <td>{{ $item->min_amount }}</td>
                                                <td>{{ $item->max_amount }}</td>
                                                <td>{{ $item->start_date }}</td>
                                                <td>{{ $item->expiry_date }}</td>
                                                <td>{{ ($item->status == 1) ? 'Active' : 'InActive' }}</td>
                                                <td>
                                                    <a href="{{ route('combo_offer.edit', $item->id) }}" class="btn btn-primary btn-sm" title="Edit Offer"><i class="fa fa-pencil-square-o" aria-hidden="true"></i> Edit</a>
                                                </td>
                                            </tr>
                                        @endforeach
                                    @endif
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
