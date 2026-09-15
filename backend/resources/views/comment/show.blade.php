@extends('layouts.app')
@section('title', 'Comment Details')
@section('content')
    <div class="main-content">
        <div class="row">
            <div class="col-md-8 offset-md-2">
                <div class="card">
                    <div class="card-header">Comment {{ $comment->id }}</div>
                    <div class="card-body">

                        <a href="{{ route('comment.index') }}" title="Back">
                            <button class="btn btn-warning btn-sm"><i class="fa fa-arrow-left" aria-hidden="true"></i> Back</button>
                        </a>
                        <a href="{{ route('comment.edit',$comment->id) }}" title="Edit Comment">
                            <button class="btn btn-primary btn-sm"><i class="fa fa-pencil-square-o" aria-hidden="true"></i> Edit</button>
                        </a>

                        <form method="POST" action="{{ route('comment.destroy', $comment->id) }}" accept-charset="UTF-8" style="display:inline">
                            {{ method_field('DELETE') }}
                            {{ csrf_field() }}
                            <button type="submit" class="btn btn-danger btn-sm" title="Delete Comment" onclick="return confirm(&quot;Confirm delete?&quot;)"><i
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
                                        <td>{{ $comment->id }}</td>
                                    </tr>
                                    <tr>
                                        <th> Name</th>
                                        <td> {{ $comment->name }} </td>
                                    </tr>
                                    <tr>
                                        <th> Image</th>
                                        <td> <img src="{{ $comment->image }}" alt="" width="100px" height="150px"> </td>
                                    </tr>
                                    <tr>
                                        <th> Status</th>
                                        <td> {{ $comment->status }} </td>
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
