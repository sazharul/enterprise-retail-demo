@extends('layouts.app')
@section('title', 'Blog Details')
@section('content')
    <div class="main-content">
        <div class="row">
            <div class="col-md-8 offset-md-2">
                <div class="card">
                    <div class="card-header">Blog {{ $brand->id }}</div>
                    <div class="card-body">

                        <a href="{{ route('blog.index') }}" title="Back">
                            <button class="btn btn-warning btn-sm"><i class="fa fa-arrow-left" aria-hidden="true"></i> Back</button>
                        </a>
                        <a href="{{ route('blog.edit', $brand->id) }}" title="Edit Brand">
                            <button class="btn btn-primary btn-sm"><i class="fa fa-pencil-square-o" aria-hidden="true"></i> Edit</button>
                        </a>

                        <form method="POST" action="{{ route('blog.destroy',$brand->id) }}" accept-charset="UTF-8" style="display:inline">
                            {{ method_field('DELETE') }}
                            {{ csrf_field() }}
                            <button type="submit" class="btn btn-danger btn-sm" title="Delete Brand" onclick="return confirm(&quot;Confirm delete?&quot;)"><i
                                    class="fa fa-trash-o" aria-hidden="true"></i> Delete
                            </button>
                        </form>
                        <br/>
                        <br/>

                        <div class="table-responsive">
                            <table class="table">
                                <tbody>
                                <tr>
                                    <th>ID</th>
                                    <td>{{ $brand->id }}</td>
                                </tr>
                                <tr>
                                    <th> Name</th>
                                    <td> {{ $brand->name }} </td>
                                </tr>
                                <tr>
                                    <th> Image</th>
                                    <td> <img src="{{ $brand->image }}" alt="" width="100px" height="150px"> </td>
                                </tr>
                                <tr>
                                    <th> Status</th>
                                    <td> {{ $brand->status }} </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
