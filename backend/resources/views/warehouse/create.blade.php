@extends('layouts.app')
@section('title', 'Create Warehouse')

@section('content')
    <div class="main-content">

         <!--begin::Validation Message-->
         @include('include.validation-message')
         <!--end::Validation Message-->

        <div class="card">
            <div class="card-header">Create New Warehouse</div>
            <div class="card-body">
                <a href="{{ route('warehouse.index') }}" title="Back"><button class="btn btn-warning btn-sm"><i class="fa fa-arrow-left" aria-hidden="true"></i> Back</button></a>
                <br />
                <br />

                <!--begin::Form-->
                <form class="validate-form" action="{{ route('warehouse.store') }}" method="POST" enctype="multipart/form-data">
                    @csrf
                    <!--begin::Card Body-->
                    <div class="card-body">
                        <div class="row">
                            <!--begin::Col-->
                            <div class="col-md-12 col-12">
                                <div class="form-group">
                                    <label for="name" class="col-form-label">Name<span class="text-danger">*</span></label>
                                    <input type="text" name="name" required class="form-control" id="name" placeholder="Warehouse Name" value="{{old('name')}}">
                                </div>

                                <div class="form-group">
                                    <label for="email" class="col-form-label">Email<span class="text-danger">*</span></label>
                                    <input type="email" name="email" class="form-control" id="email" placeholder="Email" value="{{old('email')}}">
                                </div>
                                <div class="form-group">
                                    <label for="address" class="col-form-label">Address</label>
                                    <textarea name="address" class="form-control" id="address" rows="2"></textarea>
                                </div>
                                <div class="form-group">
                                    <label for="mobile" class="col-form-label">Mobile Number</label>
                                    <input type="text" name="mobile" class="form-control" id="mobile" placeholder="Mobile Number" value="{{old('mobile')}}">
                                </div>
                                <div class="form-group">
                                    <label for="logo" class="col-form-label">Logo</label>
                                    <input type="file" name="logo" id="logo" class="form-control">
                                </div>

                                <div class="form-group">
                                    <label for="latitude" class="col-form-label">Latitude</label>
                                    <input type="number" step="any" name="latitude" id="latitude" class="form-control">
                                </div>

                                <div class="form-group">
                                    <label for="longitude" class="col-form-label">Longitude</label>
                                    <input type="number" step="any" name="longitude" id="longitude" class="form-control">
                                </div>

                                <div class="form-group">
                                    <label for="status" class="col-form-label">Status</label>
                                    <select name="status" id="status" class="form-control basic-select2">
                                        <option value="1">Active</option>
                                        <option value="0">InActive</option>
                                    </select>
                                </div>

                                <div class="form-group mt-4">
                                    <div class="form-check ">
                                        <input class="form-check-input" type="checkbox" name="default" value="1" id="checkWarehouse">
                                        <label class="form-check-label" for="checkWarehouse">
                                          Default Warehouse</label>
                                      </div>
                                </div>
                            </div>
                            <!--end::Col-->
                        </div>
                    </div>
                    <!--end::Card Body-->

                    <!--begin::Card Footer-->
                    <div class="card-footer">
                        <div class="col-sm-12 col-12">
                            <button type="submit" class="btn btn-success btn-sm">Submit</button>
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
