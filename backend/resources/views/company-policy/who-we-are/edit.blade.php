@extends('layouts.app')
@section('title', 'Who We Are Edit')
@section('content')
    <div class="main-content">
        <div class="row">

            <div class="col-md-8 offset-md-2">
                <div class="card">
                    <div class="card-header">Who We Are #{{ $document->id }}</div>
                    <div class="card-body">
                        <a href="{{ route('whoweare.index') }}" title="Back"><button class="btn btn-warning btn-sm"><i class="fa fa-arrow-left" aria-hidden="true"></i> Back</button></a>
                        <br />
                        <br />

                        @if ($errors->any())
                            <ul class="alert alert-danger">
                                @foreach ($errors->all() as $error)
                                    <li>{{ $error }}</li>
                                @endforeach
                            </ul>
                        @endif

                        <form method="POST" action="{{ route('whoweare.update',$document->id) }}" accept-charset="UTF-8" class="form-horizontal" enctype="multipart/form-data">
                            {{ method_field('PATCH') }}
                            {{ csrf_field() }}

                            @include ('company-policy/who-we-are.form', ['formMode' => 'edit'])

                        </form>

                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection


