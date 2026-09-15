@extends('layouts.app')
@section('title', 'Shade Details')
@section('content')
    <div class="main-content">
        <div class="row">
            <div class="col-md-6 offset-md-3">
                <div class="card">
                    <div class="card-header">Shade {{ $shade->id }}</div>
                    <div class="card-body">

                        <a href="{{ route('benefit.index') }}" title="Back">
                            <button class="btn btn-warning btn-sm"><i class="fa fa-arrow-left" aria-hidden="true"></i> Back</button>
                        </a>
                        <a href="{{ route('benefit.edit',$benefit->id ) }}" title="Edit Brand">
                            <button class="btn btn-primary btn-sm"><i class="fa fa-pencil-square-o" aria-hidden="true"></i> Edit</button>
                        </a>

                        <form method="POST" action="{{ route('benefit.destroy',$benefit->id) }}" accept-charset="UTF-8" style="display:inline">
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
                                        <td>{{ $shade->id }}</td>
                                    </tr>
                                    <tr>
                                        <th> Name</th>
                                        <td> {{ $shade->name }} </td>
                                    </tr>
                                    <tr>
                                        <th> Image</th>
                                        <td> <img src="{{ asset($shade->image) }}" alt="" width="150px" height="100px"> </td>
                                    </tr>
                                    <tr>
                                        <th> Color Name</th>
                                        <td>{{$shade->color->name}}</td>
                                    </tr>
                                    <tr>
                                        <th> Status</th>
                                        <td> {{ $shade->status }} </td>
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
