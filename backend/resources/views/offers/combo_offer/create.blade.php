@extends('layouts.app')

@section('content')
    <div class="main-content">
        <div class="row">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header">Assign Combo Products</div>
                    <div class="card-body">
                        <a href="{{ route('combo_offer.index') }}" class="btn btn-primary btn-sm" title="Back"><i class="fa fa-arrow-left" aria-hidden="true"></i> Back</a>
                        <br />
                        <br />

                        @if ($errors->any())
                            <ul class="alert alert-danger">
                                @foreach ($errors->all() as $error)
                                    <li>{{ $error }}</li>
                                @endforeach
                            </ul>
                        @endif


                        <form action="{{ route('combo_offer.store') }}" method="POST">
                            @csrf

                            <div class="row">
                                <div class="col-md-4 col-sm-4">
                                    <label for="offer_id" class="form-label">Offer Name</label>
                                    <select class="form-select" id="offer_id" name="offer_id" required>
                                        <option value="" selected>Select Offer</option>
                                        @if (count($comboProducts) > 0)
                                            @foreach ($offers as $offer)
                                                <option value="{{ $offer->id }}">{{ $offer->name }}</option>
                                            @endforeach
                                        @endif
                                    </select>
                                </div>

                                <div class="col-xl-12 mt-3">
                                    <div class="table-responsive">
                                        <table class="table table-responsive" style="width:100%" id="example">
                                            <thead>
                                                <tr>
                                                    <th>Name</th>
                                                    <th>Image</th>
                                                    <th>Select Product</th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                @if (count($comboProducts) > 0)
                                                    @foreach ($comboProducts as $comboProduct)
                                                        <tr>
                                                            </td>
                                                            <td>{{ $comboProduct->name }}</td>
                                                            <td>
                                                                <img src="{{ $comboProduct->image ? asset($comboProduct->image) : asset('backend/assets/images/avatar.png') }}" alt="Avatar" class="img-fluid" height="60" width="60">
                                                            </td>
                                                            <td>
                                                                <input type="checkbox" class="checkbox" name="combo_product_id[]"
                                                                    value="{{ $comboProduct->id }}">
                                                            </td>
                                                        </tr>
                                                    @endforeach
                                                @endif
                                            </tbody>
                                        </table>
                                    </div>
                                    <button type="submit" class="btn btn-primary">Submit</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection

@push('script')
@endpush
