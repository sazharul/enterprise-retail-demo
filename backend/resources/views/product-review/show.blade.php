@extends('layouts.app')
@section('title', 'Product Review Details')
@section('content')
    <div class="main-content">
        <div class="row">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header">Product Review #{{$review->id}}</div>
                    <div class="card-body">
                        <a href="{{ url('/product-review') }}" title="Back">
                            <button class="btn btn-warning btn-sm"><i class="fa fa-arrow-left" aria-hidden="true"></i> Back</button>
                        </a>

                        <form method="GET" action="{{ url('/product-review') }}" accept-charset="UTF-8"
                              class="form-inline my-2 my-lg-0 float-right" role="search" style="display: inline-block;float: right;">
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

                        <br/>
                        <br/>
                        <div class="table-responsive">
                            <table class="table">
                                <thead>
                                <tr>

                                    <th>Title</th>
                                    <th>Image</th>
                                    <th>Star</th>
                                    <th>Comment</th>
                                    <th>Status</th>

                                </tr>
                                </thead>
                                <tbody>
                                @if ($review)
                                    <tr>

                                        <td>{{ $review->title }}</td>
                                        <td>
                                            @foreach(json_decode($review->image) as $singleImage)
                                                <a href="{{ asset($singleImage) }}" data-lightbox="mygellary" data-title="Caption Here">
                                                    <img src="{{ asset($singleImage) }}" alt="" class="zoom-on-hover"
                                                         width="50px" height="50px">
                                                </a>
                                            @endforeach
                                        </td>
                                        <td>{{ $review->star }}</td>
                                        <td>{{ $review->comment }}</td>
                                        <td>
                                            @php
                                                $statusLabels = [
                                                    1 => 'Pending',
                                                    2 => 'Approved',
                                                    3 => 'Canceled',
                                                ];
                                            @endphp
                                            {{ $statusLabels[$review->status] ?? 'Unknown Status' }}
                                        </td>

                                    </tr>
                                @else
                                    <tr>
                                        <td colspan="5" class="text-center">No records found</td>
                                    </tr>
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

