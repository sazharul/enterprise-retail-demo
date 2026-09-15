@extends('layouts.app')
@section('title', 'Pack Details')
@section('content')
    <div class="main-content">
        <div class="row">
            <div class="col-md-8 offset-md-2">
                <div class="card">
                    <div class="card-header">Pack {{ $pack->id }}</div>
                    <div class="card-body">

                        <a href="{{ route('pack.index') }}" title="Back">
                            <button class="btn btn-warning btn-sm"><i class="fa fa-arrow-left" aria-hidden="true"></i> Back</button>
                        </a>
                        <a href="{{ route('pack.edit',$pack->id ) }}" title="Edit Brand">
                            <button class="btn btn-primary btn-sm"><i class="fa fa-pencil-square-o" aria-hidden="true"></i> Edit</button>
                        </a>

                        <form method="POST" action="{{ route('pack.destroy',$pack->id) }}" accept-charset="UTF-8" style="display:inline">
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
                                    <td>{{ $pack->id }}</td>
                                </tr>
                                <tr>
                                    <th> Name</th>
                                    <td> {{ $pack->name }} </td>
                                </tr>
                                <tr>
                                    <th> Name</th>
                                    <td> {{ $pack->image }} </td>
                                </tr>
                                <tr>
                                    <th> Status</th>
                                    <td> {{ $pack->status }} </td>
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


