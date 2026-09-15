@extends('layouts.app')
@section('title', 'Coupon List')
@section('content')
    <div class="main-content">
        <div class="row">
            <div class="col-md-10 offset-md-1">
                <div class="card">
                    <div class="card-header">Coupon</div>
                    <div class="card-body">
                        <a href="{{ route('coupon.create') }}" class="btn btn-success btn-sm" title="Add New Coupon">
                            <i class="fa fa-plus" aria-hidden="true"></i> Add New
                        </a>

                        <form method="GET" action="{{ route('coupon.index') }}" accept-charset="UTF-8" class="form-inline my-2 my-lg-0 float-right" role="search"
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
                                    <th>Coupon Code</th>
                                    <th>Amount</th>
                                    <th>Minimum Expenses</th>
                                    <th>Max Expenses</th>
                                    <th>Expire Date</th>
                                    <th>Discount Type</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                @foreach($coupon as $item)
                                    <tr>
                                        <td>{{ $loop->iteration }}</td>
                                        <td>{{ $item->coupon_code }}</td>
                                        <td>{{ $item->amount }}</td>
                                        <td>{{ ($item->minimum_expenses) ? $item->minimum_expenses : '0' }}</td>
                                        <td>{{ ($item->max_expenses) ? $item->max_expenses : '0' }}</td>
                                        <td>{{date('j F y',strtotime($item->expire_date))}}</td>
                                        <td>{{ ($item->discount_type == 1) ? 'Percentage' : 'Fixed' }}</td>
                                        <td>{{ ($item->status == 1) ? 'Active' : 'InActive' }}</td>
                                        <td>

                                            <a href="{{ route('coupon.edit',$item->id) }}" title="Edit Coupon">
                                                <button class="btn btn-primary btn-sm"><i class="fa fa-pencil-square-o" aria-hidden="true"></i> Edit
                                                </button>
                                            </a>

                                            <form method="POST" action="{{ route('coupon.destroy',$item->id) }}" accept-charset="UTF-8"
                                                  style="display:inline">
                                                {{ method_field('DELETE') }}
                                                {{ csrf_field() }}
                                                <button type="submit" class="btn btn-danger btn-sm" title="Delete Coupon"
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

                            <div class="pagination-wrapper"> {!! $coupon->appends(['search' => Request::get('search')])->render() !!} </div>

                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection

