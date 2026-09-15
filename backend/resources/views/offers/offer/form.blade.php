<div class="form-group {{ $errors->has('name') ? 'has-error' : '' }}">
    <label for="name" class="control-label">{{ 'Name' }}</label>
    <input class="form-control" name="name" type="text" id="name"
        value="{{ isset($offer->name) ? $offer->name : '' }}" required>
    {!! $errors->first('name', '<p class="help-block">:message</p>') !!}
</div>

<div class="form-group {{ $errors->has('color') ? 'has-error' : '' }}">
    <label for="color" class="control-label">{{ 'Color' }}</label>
    <input type="color" class="form-control form-control-color" id="color" name="color" required
        placeholder="Enter color code" color="color" value="{{ $offer->color ?? '' }}" />

    {!! $errors->first('color', '<p class="help-block">:message</p>') !!}
</div>

<div class="form-group">

    <label for="banner_web" class="control-label">{{ 'Banner Web' }}</label>
    <input type="file" name="banner_web" id="banner_web" class="form-control"
        value="{{ isset($offer->banner_web) ? $offer->banner_web : '' }}">
    @isset($offer->banner_web)
        <img src="{{ asset($offer->banner_web) }}" alt="" width="150px" height="100px">
    @endisset

</div>


<div class="form-group">

    <label for="banner_mobile" class="control-label">{{ 'Banner Mobile' }}</label>
    <input type="file" name="banner_mobile" id="banner_mobile" class="form-control"
        value="{{ isset($offer->banner_mobile) ? $offer->banner_mobile : '' }}">
    @isset($offer->banner_mobile)
        <img src="{{ asset($offer->banner_mobile) }}" alt="" width="150px" height="100px">
    @endisset

</div>

<div class="form-group {{ $errors->has('offer_type_id') ? 'has-error' : '' }}">
    <label for="offer_type_id" class="control-label">{{ 'Offer Type' }}</label>
    <select class="form-control" name="offer_type_id" required>
        {{-- <option value="1" {{ isset($offer->offer_type_id) && $offer->offer_type_id == 1 ? 'selected' : '' }}>Free Delivery</option> --}}
        <option value="1" {{ isset($offer->offer_type_id) && $offer->offer_type_id == 1 ? 'selected' : '' }}>Upto Sale</option>
        <option value="2" {{ isset($offer->offer_type_id) && $offer->offer_type_id == 2 ? 'selected' : '' }}>Combo Sale</option>
        {{-- <option value="4" {{ isset($offer->offer_type_id) && $offer->offer_type_id == 4 ? 'selected' : '' }}>Same Product Sale</option> --}}

    </select>
    {!! $errors->first('status', '<p class="help-block">:message</p>') !!}
</div>

<div class="form-group {{ $errors->has('is_free_delivery') ? 'has-error' : '' }}">
    <div class="form-check">
        <input type="hidden" name="is_free_delivery" value="0">
        <input class="form-check-input" type="checkbox" name="is_free_delivery" id="is_free_delivery" value="1" {{ isset($offer->is_free_delivery) && $offer->is_free_delivery == 1 ? 'checked' : '' }}>
        <label class="form-check-label" for="is_free_delivery">
            Free Delivery
        </label>
    </div>
    {!! $errors->first('is_free_delivery', '<p class="help-block">:message</p>') !!}
</div>

<div class="form-group {{ $errors->has('min_amount') ? 'has-error' : '' }}">
    <label for="min_amount" class="control-label">{{ 'Minimum Amount' }}</label>
    <input class="form-control" type="text" name="min_amount" id="min_amount" placeholder="0" value="{{ isset($offer->min_amount) ? $offer->min_amount : '0' }}">
    {!! $errors->first('min_amount', '<p class="help-block">:message</p>') !!}
</div>

<div class="form-group {{ $errors->has('max_amount') ? 'has-error' : '' }}">
    <label for="max_amount" class="control-label">{{ 'Maximum Amount' }}</label>
    <input class="form-control" type="text" name="max_amount" id="max_amount" placeholder="0" value="{{ isset($offer->max_amount) ? $offer->max_amount : '0' }}">
    {!! $errors->first('max_amount', '<p class="help-block">:message</p>') !!}
</div>

<div class="form-group {{ $errors->has('start_date') ? 'has-error' : '' }}">
    <label for="start_date" class="control-label">{{ 'Start Date' }}</label>
    <input class="form-control" type="date" name="start_date" id="start_date" value="{{ isset($offer->start_date) ? $offer->start_date : now()->toDateString() }}">
    {!! $errors->first('start_date', '<p class="help-block">:message</p>') !!}
</div>

<div class="form-group {{ $errors->has('expiry_date') ? 'has-error' : '' }}">
    <label for="expiry_date" class="control-label">{{ 'Expiry Date' }}</label>
    <input class="form-control" type="date" name="expiry_date" id="expiry_date" value="{{ isset($offer->expiry_date) ? $offer->expiry_date : '' }}">
    {!! $errors->first('expiry_date', '<p class="help-block">:message</p>') !!}
</div>

<div class="form-group {{ $errors->has('status') ? 'has-error' : '' }}">
    <label for="status" class="control-label">{{ 'Status' }}</label>
    <select class="form-control" name="status">
        <option value="1" {{ isset($offer->status) && $offer->status == 1 ? 'selected' : '' }}>Active</option>
        <option value="0" {{ isset($offer->status) && $offer->status == 0 ? 'selected' : '' }}>InActive</option>
    </select>
    {!! $errors->first('status', '<p class="help-block">:message</p>') !!}
</div>

<div class="form-group mt-2">
    <input class="btn btn-primary" type="submit" value="{{ $formMode === 'edit' ? 'Update' : 'Create' }}">
</div>
