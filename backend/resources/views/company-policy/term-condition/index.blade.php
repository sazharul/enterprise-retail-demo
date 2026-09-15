@extends('layouts.app')
@section('title', 'Term & Conditions Details')
@section('content')
    <div class="main-content">
        <div class="row">
            <div class="col-md-8 offset-md-2">
                <div class="card">
                    <div class="card-header">Terms And Conditions</div>
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

                                            <a href="{{ route('termcondition.edit',$document->id) }}" title="Edit Terms and Condition">
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
