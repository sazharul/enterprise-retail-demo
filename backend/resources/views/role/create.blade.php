@extends('layouts.app')
@section('title', 'Create Role')

@section('content')
    <div class="main-content">
        <div class="card">
            <div class="card-header">Create New Role</div>
            <div class="card-body">
                <a href="{{ route('role.index') }}" title="Back"><button class="btn btn-warning btn-sm"><i class="fa fa-arrow-left" aria-hidden="true"></i> Back</button></a>
                <br />
                <br />

                @if ($errors->any())
                    <ul class="alert alert-danger">
                        @foreach ($errors->all() as $error)
                            <li>{{ $error }}</li>
                        @endforeach
                    </ul>
                @endif

                {{-- <form method="POST" action="{{ route('role.index') }}" accept-charset="UTF-8" class="form-horizontal" enctype="multipart/form-data">
                    {{ csrf_field() }}

                    @include ('admin.role.form', ['formMode' => 'create'])

                </form> --}}

                <!--begin::Form-->
                <form class="validate-form" action="{{ route('role.store') }}" method="POST">
                    @csrf
                    <!--begin::Card Body-->
                    <div class="card-body">
                        <div class="row">
                            <!--begin::Col-->
                            <div class="col-md-12 col-12">
                                <div class="form-group row">
                                    <label for="role_name"
                                        class="col-sm-3 col-form-label">Role Name</label>
                                    <div class="col-sm-9">
                                        <input type="text" name="name" required class="form-control" id="role_name" placeholder="Role Name" value="{{old('name')}}">
                                    </div>
                                </div>
                            </div>
                            <!--end::Col-->
                        </div>

                        <div class="row">
                            <!--begin::Col-->
                            <div class="col-md-12 col-12">
                                <div class="form-group">
                                    <label>Permissions</label>
                                    <div class="form-check">
                                        <input type="checkbox" class="form-check-input" id="checkPermissionAll" value="1">
                                        <label class="form-check-label" for="checkPermissionAll">All</label>
                                    </div>
                                    
                                    <hr>

                                    @php
                                        $sl = 1;
                                    @endphp
                                    @foreach ($permissionMenus as $menu)
                                        <div class="row">
                                            <div class="col-3">
                                                <div class="form-check">
                                                    <label class="form-check-label" for="checkPermission">{{ $menu->name }}</label>
                                                </div>
                                            </div>

                                            <div class="col-9 role-{{ $sl }}-management-checkbox">
                                                @php
                                                    $permissions = getPermissionsByMenuName($menu->name);
                                                    $j = 1;
                                                @endphp
                                                @foreach ($permissions as $permission)
                                                    <div class="form-check">
                                                        <input type="checkbox" class="form-check-input" name="permissions[]" id="checkPermission{{ $permission->id }}" value="{{ $permission->name }}">
                                                        <label class="form-check-label" for="checkPermission{{ $permission->id }}">{{ $permission->name }}</label>
                                                    </div>
                                                    @php  $j++; @endphp
                                                @endforeach
                                                <br>
                                            </div>

                                        </div>
                                        @php  
                                            $sl++; 
                                        @endphp
                                    @endforeach
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
<script>
    /**
     * Check all the permissions
     */
    $("#checkPermissionAll").click(function() {
        if ($(this).is(':checked')) {
            // check all the checkbox
            $('input[type=checkbox]').prop('checked', true);
        } else {
            // un check all the checkbox
            $('input[type=checkbox]').prop('checked', false);
        }
    });

    function checkPermissionByMenu(className, checkThis) {
        const groupIdName = $("#" + checkThis.id);
        const classCheckBox = $('.' + className + ' input');

        if (groupIdName.is(':checked')) {
            classCheckBox.prop('checked', true);
        } else {
            classCheckBox.prop('checked', false);
        }
        implementAllChecked();
    }

    function checkSinglePermission(groupClassName, groupID, countTotalPermission) {
        const classCheckbox = $('.' + groupClassName + ' input');
        const groupIDCheckBox = $("#" + groupID);

        // if there is any occurance where something is not selected then make selected = false
        if ($('.' + groupClassName + ' input:checked').length == countTotalPermission) {
            groupIDCheckBox.prop('checked', true);
        } else {
            groupIDCheckBox.prop('checked', false);
        }
        implementAllChecked();
    }

    function implementAllChecked() {
        const countPermissions = {{ count($permissions) }};
        const countPermissionGroups = {{ count($permissionMenus) }};

        if ($('input[type="checkbox"]:checked').length >= (countPermissions + countPermissionGroups)) {
            $("#checkPermissionAll").prop('checked', true);
        } else {
            $("#checkPermissionAll").prop('checked', false);
        }
    }
</script>
@endpush