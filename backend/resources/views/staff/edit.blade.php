@extends('layouts.app')
@section('title', 'Update Staff')

@section('content')
    <div class="main-content">

        <!--begin::Validation Message-->
        @include('include.validation-message')
        <!--end::Validation Message-->

        <div class="card">
            <div class="card-header">Update Staff</div>
            <div class="card-body">
                <a href="{{ route('staff.index') }}" title="Back"><button class="btn btn-warning btn-sm"><i class="fa fa-arrow-left" aria-hidden="true"></i> Back</button></a>
                <br />
                <br />

                @if ($errors->any())
                    <ul class="alert alert-danger">
                        @foreach ($errors->all() as $error)
                            <li>{{ $error }}</li>
                        @endforeach
                    </ul>
                @endif

                <!--begin::Form-->
                <form class="validate-form" action="{{ route('staff.update', $staff->id) }}" method="POST" enctype="multipart/form-data">
                    @csrf
                    <!--begin::Card Body-->
                    <div class="card-body">
                        <div class="row">
                            <!--begin::Col-->
                            <div class="col-md-12 col-12">
                                <div class="form-group">
                                    <label for="name" class="col-form-label">Name</label>
                                    <input type="text" name="name" required class="form-control" id="name" placeholder="Staff Name" value="{{$staff->name}}">
                                </div>
                                <div class="form-group">
                                    <label for="email" class="col-form-label">Email Address</label>
                                    <input type="email" name="email" required class="form-control" id="email" placeholder="Email Address" value="{{$staff->email}}">
                                </div>
                                
                                <div class="form-group">
                                    <label for="phone" class="col-form-label">Mobile Number</label>
                                    <input type="text" name="phone" required class="form-control" id="phone" placeholder="Mobile Number" value="{{$staff->phone}}">
                                </div>
                                
                                <div class="form-group">
                                    <label for="role_id" class="col-form-label">Assign Role</label>
                                    <select name="role_id" id="role_id" class="form-control">
                                        @foreach ($roles as $role)
                                            <option value="{{ $role->id }}">{{ $role->name }}</option>
                                        @endforeach
                                    </select>
                                </div>

                                <div class="form-group">
                                    <label for="password" class="col-form-label">Password</label>
                                    <input type="password" name="password" required class="form-control" id="password" placeholder="Password" value="{{old('password')}}">
                                </div>
                                <div class="form-group">
                                    <label for="password_confirmation" class="col-form-label">Confirm Password</label>
                                    <input type="password" name="password_confirmation" required class="form-control"  id="password_confirmation" autocomplete="new-password" placeholder="Confirm Password">
                                </div>

                                <div class="form-group">
                                    <label for="password" class="col-form-label">Profile Picture</label>
                                    <input type="file" name="avatar" id="avatar" class="form-control">
                                    <img src="{{asset('upload/staffs/'.$staff->avatar)}}" alt="" class="img-thumbnail" width="100" height="100">
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