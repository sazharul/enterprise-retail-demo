@extends('layouts.app')
@section('title', 'Product Review Edit')
@section('content')
    <div class="main-content">
        <div class="row">

            <div class="col-md-6 offset-md-3">
                <div class="card">
                    <div class="card-header">Edit Product Review #{{ $review->id }}</div>
                    <div class="card-body">
                        <a href="{{ url('/product-review') }}" title="Back"><button class="btn btn-warning btn-sm"><i class="fa fa-arrow-left" aria-hidden="true"></i> Back</button></a>
                        <br />
                        <br />

                        @if ($errors->any())
                            <ul class="alert alert-danger">
                                @foreach ($errors->all() as $error)
                                    <li>{{ $error }}</li>
                                @endforeach
                            </ul>
                        @endif

                        <form method="POST" action="{{ url('/product-review/' . $review->id) }}" accept-charset="UTF-8" class="form-horizontal" enctype="multipart/form-data">
                            {{ method_field('PATCH') }}
                            {{ csrf_field() }}

                            @include ('product-review.form', ['formMode' => 'edit'])

                        </form>

                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection


