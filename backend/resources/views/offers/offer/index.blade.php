@extends('layouts.app')
@section('title', 'Offer List')
@section('content')
    <div class="main-content">
        <div class="row">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header">Offer</div>
                    <div class="card-body">
                        <a href="{{ route('offer.create') }}" class="btn btn-success btn-sm" title="Add New Offer">
                            <i class="fa fa-plus" aria-hidden="true"></i> Add New
                        </a>

                        <br/>
                        <br/>
                        <div class="table-responsive">
                            <table id="example" class="table " style="width:100%">
                                <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Color</th>
                                    <th>Banner Web</th>
                                    <th>Banner Mobile</th>
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
                                @foreach($offer as $item)
                                    <tr>
                                        <td>{{ $loop->iteration }}</td>
                                        <td>{{ $item->name }}</td>
                                        <td>{{ $item->color }}</td>
                                        <td><img src="{{ asset($item->banner_web) }}" alt="" width="150px" height="40px"></td>
                                        <td><img src="{{ asset($item->banner_mobile) }}" alt="" width="150px" height="60px"></td>
                                        <td>{{ $item->offer_type_id==1 ? 'UptoSale' : 'Combo' }}</td>
                                        <td>{{ ($item->is_free_delivery == 1) ? 'Yes' : 'No' }}</td>
                                        <td>{{ $item->min_amount }}</td>
                                        <td>{{ $item->max_amount }}</td>
                                        <td>{{ $item->start_date }}</td>
                                        <td>{{ $item->expiry_date }}</td>
                                        <td>{{ ($item->status == 1) ? 'Active' : 'InActive' }}</td>
                                        <td>

                                            <a href="{{ route('offer.edit',$item->id) }}" title="Edit Offer">
                                                <button class="btn btn-primary btn-sm"><i class="fa fa-pencil-square-o" aria-hidden="true"></i> Edit
                                                </button>
                                            </a>

                                            <form method="POST" action="{{ route('offer.destroy',$item->id) }}" accept-charset="UTF-8"
                                                  style="display:inline">
                                                {{ method_field('DELETE') }}
                                                {{ csrf_field() }}
                                                <button type="submit" class="btn btn-danger btn-sm" title="Delete Offer"
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
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection

