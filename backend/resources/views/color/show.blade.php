@extends('layouts.app')
@section('title', 'Color Details')
@section('content')
    <div class="main-content">
        <div class="row">
            <div class="col-md-6 offset-md-3">
                <div class="card">
                    <div class="card-header">Color {{ $color->id }}</div>
                    <div class="card-body">

                        <a href="{{ route('color.index') }}" title="Back">
                            <button class="btn btn-warning btn-sm"><i class="fa fa-arrow-left" aria-hidden="true"></i> Back</button>
                        </a>
                        <a href="{{ route('color.edit',$color->id) }}" title="Edit Brand">
                            <button class="btn btn-primary btn-sm"><i class="fa fa-pencil-square-o" aria-hidden="true"></i> Edit</button>
                        </a>

                        <form method="POST" action="{{ route('color.destroy', $color->id) }}" accept-charset="UTF-8" style="display:inline">
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
                                    <td>{{ $color->id }}</td>
                                </tr>
                                <tr>
                                    <th> Name</th>
                                    <td> {{ $color->name }} </td>
                                </tr>
                                <tr>
                                    <th> Image</th>
                                    <td> {{ $color->image }} </td>
                                </tr>
                                <tr>
                                    <th> Status</th>
                                    <td> {{ $color->status }} </td>
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


