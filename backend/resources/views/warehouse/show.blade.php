@extends('layouts.app')

@section('content')
    <div class="main-content">
        <div class="row">
            <div class="col-md-8 offset-md-2">
                <div class="card">
                    <div class="card-header">Ware House {{ $warehouse->id }}</div>
                    <div class="card-body">

                        <a href="{{ route('warehouse.index') }}" title="Back">
                            <button class="btn btn-warning btn-sm"><i class="fa fa-arrow-left" aria-hidden="true"></i> Back</button>
                        </a>
                        <a href="{{ route('warehouse.edit',$warehouse->id ) }}" title="Edit Ware House">
                            <button class="btn btn-primary btn-sm"><i class="fa fa-pencil-square-o" aria-hidden="true"></i> Edit</button>
                        </a>

                        <form method="POST" action="{{ route('warehouse.destroy',$warehouse->id) }}" accept-charset="UTF-8" style="display:inline">
                            {{ method_field('DELETE') }}
                            {{ csrf_field() }}
                            <button type="submit" class="btn btn-danger btn-sm" title="Delete Ware House" onclick="return confirm(&quot;Confirm delete?&quot;)"><i
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
                                    <td>{{ $warehouse->id }}</td>
                                </tr>
                                <tr>
                                    <th> Name</th>
                                    <td> {{ $warehouse->name }} </td>
                                </tr>
                                <tr>
                                    <th> Phone</th>
                                    <td> {{ $warehouse->phone }} </td>
                                </tr>
                                <tr>
                                    <th> Email</th>
                                    <td> {{ $warehouse->email }} </td>
                                </tr>
                                <tr>
                                    <th> Address</th>
                                    <td> {{ $warehouse->address }} </td>
                                </tr>
                                <tr>
                                    <th> Logo</th>
                                    <td> {{ $warehouse->image }} </td>
                                </tr>
                                <tr>
                                    <th> Status</th>
                                    <td> {{ $warehouse->status }} </td>
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


