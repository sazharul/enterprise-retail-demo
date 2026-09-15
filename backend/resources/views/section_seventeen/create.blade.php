@extends('layouts.app')
@section('title', 'Section 17 CreateOrEdit')
@section('content')
    <div class="main-content">
        <div class="row">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header">CreateOrUpdate</div>
                    <div class="card-body">
                        <a href="{{ route('section_seventeen.index') }}" title="Back"><button class="btn btn-warning btn-sm"><i
                                    class="fa fa-arrow-left" aria-hidden="true"></i> Back</button></a>
                        <br />
                        <br />

                        @if ($errors->any())
                            <ul class="alert alert-danger">
                                @foreach ($errors->all() as $error)
                                    <li>{{ $error }}</li>
                                @endforeach
                            </ul>
                        @endif


                        <form id="section_seventeen" action="{{ route('section_seventeen.index') }}" class="row g-3" novalidate
                            method="POST" enctype="multipart/form-data">
                            {{ csrf_field() }}

                            <div class="col-md-4 col-sm-4">
                                <label for="category_id" class="form-label">Category </label>
                                <select class="form-select" id="category_id" name="category_id"
                                    onchange="updateproduct(this,'{{ route('section_seventeen.create') }}')">
                                    <option value="0">All Categories</option>
                                    @if (count($categories))
                                        @foreach ($categories as $category)
                                            <option value="{{ $category->id }}">{{ $category->name }}</option>
                                        @endforeach
                                    @endif
                                </select>
                            </div>

                            <div class="col-md-4 col-sm-4">
                                <label for="brand_id" class="form-label">Brand </label>
                                <select class="form-select" id="brand_id" name="brand_id"
                                    onchange="updateproduct(this,'{{ route('section_seventeen.create') }}')">
                                    <option value="0">All Brands</option>
                                    @if (count($brands))
                                        @foreach ($brands as $brand)
                                            <option value="{{ $brand->id }}">{{ $brand->name }}</option>
                                        @endforeach
                                    @endif
                                </select>
                            </div>


                            <div class="row">
                                <div class="col-xl-12">
                                    <div class="card">
                                        <div class="card-body">

                                            <div class="table-responsive">
                                                <table class="table table-responsive" style="width:100%" id="section_seventeen_table">
                                                    <thead>
                                                        <tr>
                                                            <th><input type="checkbox" id="selectAll"
                                                                    onchange="selectAllCheckboxes()"></th>
                                                            <th>Id</th>
                                                            <th>Name</th>
                                                            <th>Price</th>
                                                            <th>Discount Price</th>


                                                        </tr>
                                                    </thead>

                                                    <tbody>

                                                    </tbody>
                                                </table>
                                            </div>




                                            <button type="submit"
                                                class="btn btn-primary waves-effect waves-light me-1 submit-form">
                                                Submit
                                            </button>


                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>


                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection

@push('scripts')
    <script src="{{ asset('backend/assets/js/section17.js') }}"></script>
    <script>

        $(document).ready(function() {

            var sectionsData = @json($sections);
            sectionsData.forEach(function(row) {

                // console.log(row);
                var rowData = {
                    product_id: row.product_id.toString(),
                };

                checkedData.push(rowData);
            });
            console.log(checkedData);
            updateproduct(this, '{{ route('section_seventeen.create') }}');

        });
    </script>
@endpush
