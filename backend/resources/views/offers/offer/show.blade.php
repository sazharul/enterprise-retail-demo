@extends('layouts.app')
@section('title', 'Offer Details')
@section('content')
    <div class="main-content">
        <div class="row">
            <div class="col-md-8 offset-md-2">
                <div class="card">
                    <div class="card-header">Offer {{ $offer->id }}</div>
                    <div class="card-body">

                        <a href="{{ route('offer.index') }}" title="Back">
                            <button class="btn btn-warning btn-sm"><i class="fa fa-arrow-left" aria-hidden="true"></i> Back</button>
                        </a>
                        <a href="{{ route('offer.edit',$offer->id ) }}" title="Edit Brand">
                            <button class="btn btn-primary btn-sm"><i class="fa fa-pencil-square-o" aria-hidden="true"></i> Edit</button>
                        </a>

                        <form method="POST" action="{{ route('offer.destroy',$offer->id) }}" accept-charset="UTF-8" style="display:inline">
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
                                    <td>{{ $offer->id }}</td>
                                </tr>
                                <tr>
                                    <th> Name</th>
                                    <td> {{ $offer->name }} </td>
                                </tr>
                                <tr>
                                    <th> Image</th>
                                    <td> <img src="{{ asset($item->image) }}" alt="Image" width="300px"> </td>
                                </tr>
                                <tr>
                                    <th> Color</th>
                                    <td> {{ $offer->color_code }} </td>
                                </tr>
                                <tr>
                                    <th> Offer Type</th>
                                    <td> {{ $offer->offer_type }} </td>
                                </tr>
                                <tr>
                                    <th> Status</th>
                                    <td> {{ $offer->status }} </td>
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


