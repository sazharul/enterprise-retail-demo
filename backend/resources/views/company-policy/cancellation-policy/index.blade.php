@extends('layouts.app')
@section('title', 'Cancellation Policy Details')
@section('content')
    <div class="main-content">
        <div class="row">
            <div class="col-md-8 offset-md-2">
                <div class="card">
                    <div class="card-header">Cancellation Policy</div>
                    <div class="card-body">

                        <div class="table-responsive">
                            <table class="table">
                                <thead>
                                <tr>
                                    <th>Descritpion</th>
                                    <th>Actions</th>
                                </tr>
                                </thead>
                                <tbody>

                                    <tr>
                                        <td>{{ $document->document }}</td>
                                        <td>

                                            <a href="{{ route('cancellationpolicy.edit',$document->id) }}" title="Edit Cancellation Policy">
                                                <button class="btn btn-primary btn-sm"><i class="fa fa-pencil-square-o" aria-hidden="true"></i> Edit
                                                </button>
                                            </a>

                                        </td>
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
