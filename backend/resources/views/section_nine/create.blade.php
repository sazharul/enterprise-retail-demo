@extends('layouts.app')
@section('title', 'Section 9 Create')
@section('content')
    <div class="main-content">
        <div class="row">
            <div class="col-md-8 offset-md-3">
                <div class="card">
                    <div class="card-header">Create New Section 9</div>
                    <div class="card-body">
                        <a href="{{ route('section_nine.index') }}" title="Back"><button class="btn btn-warning btn-sm"><i class="fa fa-arrow-left" aria-hidden="true"></i> Back</button></a>
                        <br />
                        <br />

                        @if ($errors->any())
                            <ul class="alert alert-danger">
                                @foreach ($errors->all() as $error)
                                    <li>{{ $error }}</li>
                                @endforeach
                            </ul>
                        @endif

                        <form method="POST" action="{{ route('section_nine.index') }}" accept-charset="UTF-8" class="form-horizontal" enctype="multipart/form-data">
                            {{ csrf_field() }}

                            @include ('section_nine.form', ['formMode' => 'create'])

                        </form>

                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
