@extends('layouts.app')
@section('title', 'Udpate Warehouse')

@section('content')
    <div class="main-content">

         <!--begin::Validation Message-->
         @include('include.validation-message')
         <!--end::Validation Message-->

        <div class="card">
            <div class="card-header">Udpate Warehouse</div>
            <div class="card-body">
                <a href="{{ route('warehouse.index') }}" title="Back"><button class="btn btn-warning btn-sm"><i class="fa fa-arrow-left" aria-hidden="true"></i> Back</button></a>
                <br />
                <br />

                <!--begin::Form-->
                <form class="validate-form" action="{{ route('warehouse.update', $warehouse->id) }}" method="POST" enctype="multipart/form-data">
                    @csrf
                    <!--begin::Card Body-->
                    <div class="card-body">
                        <div class="row">
                            <!--begin::Col-->
                            <div class="col-md-12 col-12">
                                <div class="form-group">
                                    <label for="name" class="col-form-label">Name</label>
                                    <input type="text" name="name" required class="form-control" id="name" placeholder="Staff Name" value="{{$warehouse->name}}">
                                </div>

                                <div class="form-group">
                                    <label for="email" class="col-form-label">Email</label>
                                    <input type="email" name="email" required class="form-control" id="email" placeholder="Email" value="{{$warehouse->email}}">
                                </div>
                                <div class="form-group">
                                    <label for="address" class="col-form-label">Address</label>
                                    <textarea name="address" class="form-control" id="address" rows="2">{{$warehouse->address}}</textarea>
                                </div>
                                <div class="form-group">
                                    <label for="mobile" class="col-form-label">Mobile Number</label>
                                    <input type="text" name="mobile" required class="form-control" id="mobile" placeholder="Mobile Number" value="{{$warehouse->mobile}}">
                                </div>
                                <div class="form-group">
                                    <label for="password" class="col-form-label">Logo</label>
                                    <input type="file" name="logo" id="logo" class="form-control">

                                    <img src="{{asset($warehouse->logo)}}" width="100" height="100" class="img-thumbnail" alt="">
                                </div>

                                <div class="form-group">
                                    <label for="latitude" class="col-form-label">Latitude</label>
                                    <input type="number" step="any" name="latitude" id="latitude" class="form-control" value="{{$warehouse->latitude}}">
                                </div>

                                <div class="form-group">
                                    <label for="longitude" class="col-form-label">Longitude</label>
                                    <input type="number" step="any" name="longitude" id="longitude" class="form-control" value="{{$warehouse->longitude}}">
                                </div>

                                <div class="form-group">
                                    <label for="status" class="col-form-label">Status</label>
                                    <select name="status" id="status" class="form-control basic-select2">
                                        <option value="1" {{$warehouse->status == 1 ? 'selected' : ''}}>Active</option>
                                        <option value="0" {{$warehouse->status == 0 ? 'selected' : ''}}>InActive</option>
                                    </select>
                                </div>
                            </div>
                            <!--end::Col-->
                        </div>
                    </div>
                    <!--end::Card Body-->

                    <!--begin::Card Footer-->
                    <div class="card-footer">
                        <div class="col-sm-12 col-12">
                            <button type="submit" class="btn btn-success btn-sm">Update</button>
                        </div>
                    </div>
                    <!--end::Card Footer-->
                </form>
                <!--end::Form-->

            </div>


        </div>
    </div>
@endsection

@push('scripts')
@endpush
