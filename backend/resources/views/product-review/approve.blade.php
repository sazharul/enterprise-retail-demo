@extends('layouts.app')
@section('title', 'Product Review Approved')
@section('content')
    <div class="main-content">
        <div class="row">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header">Product Review</div>
                    <div class="card-body">

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
                                    <th>#</th>
                                    <th>Title</th>
                                    <th>Image</th>
                                    <th>Star</th>
                                    <th>Comment</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                @forelse($review as $item)
                                    <tr>
                                        <td>{{ $loop->iteration }}</td>
                                        <td>{{ $item->title }}</td>
                                        <td>
                                            @foreach(json_decode($item->image) as $singleImage)
                                                <a href="{{ asset($singleImage) }}" data-lightbox="mygellary" data-title="Caption Here">
                                                    <img src="{{ asset($singleImage) }}" alt="" class="zoom-on-hover"
                                                         width="50px" height="50px">
                                                </a>
                                            @endforeach
                                        </td>
                                        <td>{{ $item->star }}</td>
                                        <td>{{ Str::limit($item->comment, 100) }}</td>
                                        <td>
                                            @php
                                                $statusLabels = [
                                                    0 => 'Pending',
                                                    1 => 'Approved',
                                                    2 => 'Canceled',
                                                ];
                                            @endphp
                                            {{ $statusLabels[$item->status] ?? 'Unknown Status' }}
                                        </td>
                                        <td>

                                            <a href="{{ route('product-review.cancel', $item->id) }}"
                                               title="Cancel Review">
                                                <button class="btn btn-primary btn-sm"><i
                                                        class="fa fa-pencil-square-o" aria-hidden="true"></i>
                                                    Cancel</button>
                                            </a>
                                            <a href="{{ route('product-review.show', $item->id) }}"
                                               title="Review show">
                                                <button class="btn btn-primary btn-sm"><i
                                                        class="fa fa-pencil-square-o" aria-hidden="true"></i>
                                                    view</button>
                                            </a>
                                            <form method="POST" action="{{ url('/product-review' . '/' . $item->id) }}"
                                                  accept-charset="UTF-8" style="display:inline">
                                                {{ method_field('DELETE') }}
                                                {{ csrf_field() }}
                                                <button type="submit" class="btn btn-danger btn-sm"
                                                        title="Delete Brand"
                                                        onclick="return confirm(&quot;Confirm delete?&quot;)"><i
                                                        class="fa fa-trash-o" aria-hidden="true"></i>
                                                    Delete</button>
                                            </form>
                                        </td>
                                    </tr>
                                @empty
                                    <tr>
                                        <td colspan="6" class="text-center">No records found</td>
                                    </tr>
                                @endforelse
                                </tbody>
                            </table>

                            <div class="pagination-wrapper">
                                {!! $review->appends(['search' => Request::get('search')])->render() !!}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection




