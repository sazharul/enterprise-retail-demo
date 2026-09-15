@extends('layouts.app')
@section('title', 'Order List')

@section('content')
    <div class="main-content">

        <!--begin::Validation Message-->
        @include('include.validation-message')
        <!--end::Validation Message-->

        <div class="card">
            <div class="card-header">Order List</div>
            <div class="card-body">
                {{-- <a href="{{ route('product.create') }}" class="btn btn-success btn-sm" title="Add New Product">
                    <i class="lni lni-plus"></i> Add New Product
                </a> --}}

                <div class="table-responsive">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Order No</th>
                                <th>Customer</th>
                                <th>Quantity</th>
                                <th>Grand Total</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody class="align-middle">
                            @foreach ($orders as $order)
                                <tr>
                                    <td>{{ $loop->iteration }}</td>
                                    <td>{{$order->order_no}}</td>
                                    <td>{{$order->user->name}}</td>
                                    <td>{{$order->total_quantity}}</td>
                                    <td>{{number_format($order->grand_total)}}</td>
                                    <td>
                                        @if( $order->status == 1)
                                        <span class="badge bg-primary">Pending</span>
                                        @elseif( $order->status == 2)
                                        <span class="badge bg-info">Accepted</span>
                                        @elseif( $order->status == 3)
                                        <span class="badge bg-seconday">Shipped</span>
                                        @elseif( $order->status == 4)
                                        <span class="badge bg-success">Delivered</span>
                                        @elseif( $order->status == 5)
                                        <span class="badge bg-danger">Cancelled</span>
                                        @endif
                                    </td>
                                </tr>
                            @endforeach
                        </tbody>

                    </table>

                    <div class="pagination-wrapper"> {!! $orders->appends(['search' => Request::get('search')])->render() !!} </div>

                </div>

            </div>
        </div>
    </div>
@endsection
