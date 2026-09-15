<div class="product-items">
    <div class="row">
        @forelse($products as $product)
            <div class="col-xl-3 col-lg-2 col-md-3 col-sm-4 col-6">
                <div class="productCard" data-product_id="{{$product->id}}">
                    <div class="productThumb" data-bs-toggle="modal" data-bs-target="#addProductInfo">
                        <img class="img-fluid" src="{{ asset('/') }}admin/assets/images/carousel/element-banner2-right.jpg" alt="ix">
                    </div>
                    <div class="productContent" data-bs-toggle="modal" data-bs-target="#addProductInfo">
                        <a href="#">{{ $product->name }}</a>
                        <span class="productPrice">{{ $product->price }}</span>
                    </div>
                </div>
            </div>
        @empty
            <p>No products found.</p>
        @endforelse
    </div>
</div>
