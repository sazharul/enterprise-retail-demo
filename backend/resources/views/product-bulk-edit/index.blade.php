@extends('layouts.app')
@section('title', 'Product List')

@section('content')
    <div class="main-content">

        <!--begin::Validation Message-->
        @include('include.validation-message')
        <!--end::Validation Message-->

        <div class="card">
            <div class="card-header">Product Bulk Edit</div>
            <div class="card-body">

                <div class="row">
                    <div class="col-md-3">
                        <div class="mb-3">

                            <label class="form-label">Product Name</label>
                            <select class="form-control select2" name="product_id" id="productNameSelect" required>
                                <option value="">Select</option>
                                @foreach ($products as $product)
                                    <option value="{{ $product->id }}">
                                        {{ $product->name }}</option>
                                @endforeach
                            </select>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="mb-3">
                            <label class="form-label">Select Size</label>
                            <select class="form-control select2" name="size_id" id="sizeSelect">
                                <option value="">Select</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="mb-3">
                            <label class="form-label">Select Color</label>
                            <select class="form-control select2" name="color_id" id="colorSelect">
                                <option value="">Select</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="mb-3">
                            <label class="form-label">Select Shade</label>
                            <select class="form-control select2" name="shade_id" id="shadeSelect">
                                <option value="">Select</option>
                            </select>
                        </div>
                    </div>
                    <div class="table-responsive">
                        <!-- Table content will be dynamically loaded here -->
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Image</th>
                                    <th>Size</th>
                                    <th>Color</th>
                                    <th>Shade</th>
                                    <th>Price</th>
                                </tr>
                            </thead>
                            <tbody class="align-middle" id="productTableBody">

                            </tbody>
                        </table>
                        {{-- <div class="pagination-wrapper" id="paginationWrapper"> {!! $products->appends(['search' => Request::get('search')])->render() !!} </div> --}}
                        <div class="pagination-wrapper" id="paginationWrapper"> </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    @include('sweetalert::alert')
@endsection



@push('scripts')
    <script>
        setupEditablePrice('/admin/update-price', '.editable-price', 'id');
        $(document).ready(function() {

            // Initialize DataTable
            var table = $('#example').DataTable();

            // When product name is selected, fetch and populate size dropdown
            $('#productNameSelect').on('change', function() {
                var productId = $(this).val();
                $.ajax({
                    url: '/admin/get-sizes/' + productId,
                    type: 'GET',
                    success: function(data) {
                        $('#sizeSelect').html(data);
                        $('#colorSelect').html('<option value="">Select</option>');
                        $('#shadeSelect').html('<option value="">Select</option>');
                        updateTable();
                    }
                });
            });

            // When size is selected, fetch and populate color dropdown
            $('#sizeSelect').on('change', function() {
                var sizeId = $(this).val();
                $.ajax({
                    url: '/admin/get-colors/' + sizeId,
                    type: 'GET',
                    success: function(data) {
                        $('#colorSelect').html(data);
                        $('#shadeSelect').html('<option value="">Select</option>');
                        updateTable();
                    }
                });
            });

            // When color is selected, fetch and populate shade dropdown
            $('#colorSelect').on('change', function() {
                var colorId = $(this).val();
                $.ajax({
                    url: '/admin/get-shades/' + colorId,
                    type: 'GET',
                    success: function(data) {
                        $('#shadeSelect').html(data);
                        updateTable();
                    }
                });
            });

            // When shade is selected, update the table content
            $('#shadeSelect').on('change', function() {
                updateTable();
            });

            // Function to update the table content based on selected filters
            function updateTable() {

                var productId = $('#productNameSelect').val();
                var sizeId = $('#sizeSelect').val();
                var colorId = $('#colorSelect').val();
                var shadeId = $('#shadeSelect').val();
                $('#productTableBody').empty();
                $.ajax({
                    url: '/admin/get-table-content',
                    type: 'GET',
                    data: {
                        product_id: productId,
                        size_id: sizeId,
                        color_id: colorId,
                        shade_id: shadeId
                    },
                    success: function(data) {
                        console.log(data);
                        table.clear();
                        if (data.products.length > 0) {
                            $.each(data.products, function(index, product) {
                                var newRow = '<tr>' +
                                    '<td>' + (index + 1) + '</td>' +
                                    '<td>' + (product.name) + '</td>' +
                                    '<td><div class="d-flex justify-content-start align-items-center">' +
                                    '<div class="avatar me-2">' +
                                    '<img src="' + (product.shade_image ? 'upload/products/' +
                                        product.shade_image : 'backend/assets/images/avatar.png'
                                    ) + '" alt="Avatar" class="rounded-circle">' +
                                    '</div>' +
                                    '</div></td>' +
                                    '<td>' + (product.size_id ? product.size_id : ' ') +
                                    '</td>' +
                                    '<td>' + (product.shade && product.color ? product.color :
                                        ' ') + '</td>' +
                                    '<td>' + (product.shade ? product.shade.name : ' ') +
                                    '</td>' +
                                    '<td><div contenteditable="true" class="editable-price" data-id=' +
                                    product.id + '>' + product.shade_price + '</div></td>' +
                                    '</tr>';

                                // Append the new row to the table body
                                $('#productTableBody').append(newRow);
                                $('#paginationWrapper').html(data.products.links);
                            });
                        } else {
                            console.log('No products found for the selected filter.');
                            $('#example tbody').html(
                                '<tr><td colspan="100" style="text-align: center;">No data available in this table</td></tr>'
                            );
                        }

                    },
                    error: function(xhr, status, error) {
                        console.error(xhr.responseText);
                        // Handle errors if any

                        reject(error);
                    }
                });

            }

            // Initial update of the table when the page loads
            updateTable();
        });


    </script>
@endpush
