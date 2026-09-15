@extends('layouts.app')
@section('title', 'Section Nineteen')
@section('content')
    <div class="main-content">
        <div class="row">
            <div class="col-md-8 offset-md-2">
                <div class="card">
                    <div class="card-header">Section Nineteen</div>
                    <div class="card-body">

                        <div class="table-responsive">
                            <table class="table">
                                <thead>
                                <tr>
                                    <th>Image</th>
                                    <th>Descritpion</th>
                                    <th>Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                    @if($sections)
                                    <tr>
                                        <td>
                                            {{-- @if(!$sections->image==null) --}}
                                                <img src="{{ asset($sections->image) }}" alt="" width="150px" height="100px">
                                            {{-- @endif --}}
                                        </td>
                                    </td>

                                        <td>{{ $sections->description ?? " " }}</td>
                                        <td>

                                            <a href="{{ route('section_nineteen.edit',$sections->id) }}" title="Edit Terms and Condition">
                                                <button class="btn btn-primary btn-sm"><i class="fa fa-pencil-square-o" aria-hidden="true"></i> Edit
                                                </button>
                                            </a>

                                        </td>
                                    </tr>
                                    @endif

                                </tbody>

                            </table>



                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
