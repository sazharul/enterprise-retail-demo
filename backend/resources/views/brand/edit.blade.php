@extends('layouts.app')
@section('title', 'Brand Edit')
@section('content')
    <div class="main-content">
        <div class="row">

            <div class="col-md-8 offset-md-2">
                <div class="card">
                    <div class="card-header">Edit Brand #{{ $brand->id }}</div>
                    <div class="card-body">
                        <a href="{{ route('brand.index') }}" title="Back"><button class="btn btn-warning btn-sm"><i class="fa fa-arrow-left" aria-hidden="true"></i> Back</button></a>
                        <br />
                        <br />

                        @if ($errors->any())
                            <ul class="alert alert-danger">
                                @foreach ($errors->all() as $error)
                                    <li>{{ $error }}</li>
                                @endforeach
                            </ul>
                        @endif

                        <form method="POST" action="{{ route('brand.update',$brand->id) }}" accept-charset="UTF-8" class="form-horizontal" enctype="multipart/form-data">
                            {{ method_field('PATCH') }}
                            {{ csrf_field() }}

                            @include ('brand.form', ['formMode' => 'edit'])

                        </form>

                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
