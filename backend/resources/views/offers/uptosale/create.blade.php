@extends('layouts.app')
@section('title', 'UptoSale Create')
@section('content')
    <div class="main-content">
        <div class="row">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header">Add New Products</div>
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


                        <form id="offerform" action="{{ route('uptosale.index') }}" class="row g-3" novalidate
                            method="POST" enctype="multipart/form-data">
                            {{ csrf_field() }}
                            <div class="col-md-4 col-sm-4">
                                <label for="offer_id" class="form-label">Offer Name</label>
                                <select class="form-select" id="offer_id" name="offer_id"
                                    onchange="uptoupdateproduct(this,'{{ route('uptosale.create') }}')" required>
                                    {{-- <option value="0">Select</option> --}}
                                    @if (count($offers))
                                        @foreach ($offers as $offer)
                                            <option value="{{ $offer->id }}">{{ $offer->name }}</option>
                                        @endforeach
                                    @endif
                                </select>
                            </div>

                            <div class="col-md-4 col-sm-4">
                                <label for="category_id" class="form-label">Category </label>
                                <select class="form-select" id="category_id" name="category_id"
                                    onchange="uptoupdateproduct(this,'{{ route('uptosale.create') }}')">
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
                                    onchange="uptoupdateproduct(this,'{{ route('uptosale.create') }}')">
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
                                                        @if (count($products) > 0)
                                                            {{-- @dd($products) --}}
                                                            @foreach ($products as $key1 => $product)
                                                                @if ($product->shade_id)
                                                                    @foreach ($product->productShades as $key2 => $productShade)
                                                                        @if (!in_array($productShade->id, $p_shade_ids))
                                                                            <tr>
                                                                                <td><input type="checkbox" class="checkbox"
                                                                                        name="product_id[]"
                                                                                        data-id="{{ $product->id }}"
                                                                                        value="{{ $product->id }}"
                                                                                        onchange="updateSelectAll(this)">
                                                                                </td>
                                                                                <td>{{ $product->id }}</td>
                                                                                <td>{{ $product->name }}</td>
                                                                                <td>{{ $productShade?->shade->name }}</td>
                                                                                <input type="hidden" class="shade_id"
                                                                                    value="{{ $productShade->id }}">
                                                                                <input type="hidden" class="size_id">
                                                                                <td>
                                                                                    <span
                                                                                        class="price">{{ $productShade?->shade_price }}</span>
                                                                                </td>
                                                                                <td>{{ $product->discount_amount }}</td>
                                                                                <td><input type="text"
                                                                                        name="percent_discount[]"
                                                                                        class="form-control percent_discount"
                                                                                        value="0.00">
                                                                                </td>
                                                                                <td><input type="text"
                                                                                        name="flat_discount[]"
                                                                                        class="form-control flat_discount"
                                                                                        value="0.00">
                                                                                </td>
                                                                                <td><input type="text"
                                                                                        name="current_price[]"
                                                                                        class="form-control current_price_input"
                                                                                        value="{{ $productShade?->shade_price }}">
                                                                                </td>
                                                                            </tr>
                                                                        @endif
                                                                    @endforeach
                                                                @else
                                                                    @foreach ($product->productSizes as $key2 => $productSize)
                                                                        @if (!in_array($productSize->id, $p_size_ids))
                                                                            <tr>

                                                                                <td><input type="checkbox"
                                                                                        class="checkbox"
                                                                                        name="product_id[]"
                                                                                        data-id="{{ $product->id }}"
                                                                                        value="{{ $product->id }}"
                                                                                        onchange="updateSelectAll(this)">
                                                                                </td>
                                                                                <td>{{ $product->id }}</td>
                                                                                <td>{{ $product->name }}</td>
                                                                                <td>{{ $productSize?->size->name }}</td>
                                                                                <input type="hidden" class="size_id"
                                                                                    value="{{ $productSize->id }}">
                                                                                <input type="hidden" class="shade_id">
                                                                                <td>
                                                                                    <span
                                                                                        class="price">{{ $productSize?->size_price }}</span>
                                                                                </td>
                                                                                <td>{{ $product->discount_amount }}</td>
                                                                                <td><input type="text"
                                                                                        name="percent_discount[]"
                                                                                        class="form-control percent_discount"
                                                                                        value="0.00">
                                                                                </td>
                                                                                <td><input type="text"
                                                                                        name="flat_discount[]"
                                                                                        class="form-control flat_discount"
                                                                                        value="0.00">
                                                                                </td>
                                                                                <td><input type="text"
                                                                                        name="current_price[]"
                                                                                        class="form-control current_price_input"
                                                                                        value="0.00">
                                                                                </td>
                                                                            </tr>
                                                                        @endif
                                                                    @endforeach
                                                                @endif
                                                            @endforeach
                                                        @endif
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
@endpush
