@extends('layouts.app')
@section('title', 'Upto Sale Edit')
@section('content')
    <div class="main-content">
        <div class="row">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header">Update {{ $offer->name }}</div>
                    <div class="card-body">
                        <a href="{{ route('uptosale.index') }}" title="Back"><button class="btn btn-warning btn-sm"><i
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


                        <form id="offerform" action="{{ route('uptosale.update') }}" class="row g-3" novalidate
                            method="POST" enctype="multipart/form-data">
                            {{ csrf_field() }}
                            <input type="hidden" name="offer_id" value="{{ $offer->id }}">
                            <div class="col-md-4 col-sm-4">
                                <label for="offer_id" class="form-label">Offer Name</label>
                                    <select class="form-select" id="offer_id" name="offer_id"
                                    onchange="editupdateproduct(this,'{{ route('uptosale.create') }}')" disabled>
                                    <option value="{{ $offer->id }}" selected>{{ $offer->name }}</option>
                                </select>
                            </div>

                            <div class="col-md-4 col-sm-4">
                                <label for="category_id" class="form-label">Category </label>
                                <select class="form-select" id="category_id" name="category_id"
                                    onchange="editupdateproduct(this,'{{ route('uptosale.create') }}')">
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
                                    onchange="editupdateproduct(this,'{{ route('uptosale.create') }}')">
                                    <option value="0">All Brands</option>
                                    @if (count($brands))
                                        @foreach ($brands as $brand)
                                            <option value="{{ $brand->id }}">{{ $brand->name }}</option>
                                        @endforeach
                                    @endif
                                </select>
                            </div>
                            <div class="row justify-content-end mt-3">

                                <div class="col-md-3 col-sm-4">
                                    <div class="form-check pl-2 ">
                                        <input class="form-check-input" type="radio" name="is_percentage" checked
                                            value="1">
                                        <label class="form-check-label" for="PercentageValue">
                                            Percentage
                                        </label>
                                    </div>
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" name="is_percentage" value="0">
                                        <label class="form-check-label" for="FlateValue">
                                            Fixed
                                        </label>
                                    </div>
                                </div>
                                <div class="col-md-3 mb-3 col-sm-4">
                                    <label for="discount" class="form-label">Discount</label>
                                    <input class="form-control" type="number" id="discountAmount" name="amt" required>
                                </div>

                            </div>

                            <div class="row">
                                <div class="col-xl-12">
                                    <div class="card">
                                        <div class="card-body">

                                            <div class="table-responsive">
                                                <table class="table table-responsive" style="width:100%" id="uptosale">
                                                    <thead>
                                                        <tr>
                                                            <th><input type="checkbox" id="selectAll"
                                                                    onchange="selectAllCheckboxes()"></th>
                                                            <th>ID</th>
                                                            <th>Name</th>
                                                            <th>Shade/Size</th>
                                                            <th>Old Price</th>
                                                            <th>Previous Discount</th>
                                                            <th>Percentage Value (%)</th>
                                                            <th>Exact Discount Value</th>
                                                            <th>Current Price</th>

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
    <script src="{{ asset('backend/assets/js/uptoSale.js') }}"></script>
    <script>
        $(document).ready(function() {
            var uptoSalesData = @json($uptoSales);
            uptoSalesData.forEach(function(row) {

                // console.log(row);
                var rowData = {
                    product_id: row.product_id.toString(),
                    percent_discount: (row.percent_discount !== null) ? row.percent_discount
                        .toString() : '',
                    flat_discount: (row.flat_discount !== null) ? row.flat_discount.toString() : '',
                    discounted_price: (row.discounted_price !== null) ? row.discounted_price
                        .toString() : '',
                    product_size_id: (row.product_size_id !== null) ? row.product_size_id.toString() :
                        '',
                    product_shade_id: (row.product_shade_id !== null) ? row.product_shade_id
                        .toString() : ''
                };

                checkedData.push(rowData);
            });
            console.log(checkedData);
            editupdateproduct(this, '{{ route('uptosale.create') }}');
        });
    </script>
@endpush
