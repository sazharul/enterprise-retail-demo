<div class="form-group {{ $errors->has('coupon_code') ? 'has-error' : ''}}">
    <label for="coupon_code" class="control-label">{{ 'Coupon Code *' }}</label>
    <input class="form-control" name="coupon_code" type="text" id="coupon_code" required value="{{ isset($coupon->coupon_code) ? $coupon->coupon_code : ''}}" >
    {!! $errors->first('coupon_code', '<p class="help-block">:message</p>') !!}
</div>

<div class="form-group {{ $errors->has('amount') ? 'has-error' : ''}}">
    <label for="amount" class="control-label">{{ 'Amount *' }}</label>
    <input class="form-control" name="amount" type="number" step="0.01" id="amount" required value="{{ isset($coupon->amount) ? $coupon->amount : ''}}" >
    {!! $errors->first('amount', '<p class="help-block">:message</p>') !!}
</div>

<div class="form-group {{ $errors->has('minimum_expenses') ? 'has-error' : ''}}">
    <label for="minimum_expenses" class="control-label">{{ 'Minimum Expense ' }}</label>
    <input class="form-control" name="minimum_expenses" type="number" step="0.01" id="minimum_expenses" value="{{ isset($coupon->minimum_expenses) ? $coupon->minimum_expenses : ''}}" >
    {!! $errors->first('minimum_expenses', '<p class="help-block">:message</p>') !!}
</div>

<div class="form-group {{ $errors->has('max_expenses') ? 'has-error' : ''}}">
    <label for="max_expenses" class="control-label">{{ 'Max Expense ' }}</label>
    <input class="form-control" name="max_expenses" type="number" step="0.01" id="max_expenses" value="{{ isset($coupon->max_expenses) ? $coupon->max_expenses : ''}}" >
    {!! $errors->first('max_expenses', '<p class="help-block">:message</p>') !!}
</div>

<div class="form-group {{ $errors->has('expire_date') ? 'has-error' : ''}}">
    <label for="expire_date" class="control-label">{{ 'Expire Date *' }}</label>
    <input class="form-control" name="expire_date" type="date" id="expire_date" required value="{{ isset($coupon->expire_date) ? $coupon->expire_date : ''}}" >
    {!! $errors->first('expire_date', '<p class="help-block">:message</p>') !!}
</div>

<div class="form-group {{ $errors->has('discount_type') ? 'has-error' : ''}}">
    <label for="discount_type" class="control-label">{{ 'Discount Type' }}</label>
    <select class="form-control" name="discount_type">
        <option value="1" {{ (isset($coupon->discount_type) && $coupon->discount_type == 1) ? 'selected' : '' }}>Percentage</option>
        <option value="0" {{ (isset($coupon->discount_type) && $coupon->discount_type == 0) ? 'selected' : '' }}>Fixed</option>
    </select>
    {!! $errors->first('status', '<p class="help-block">:message</p>') !!}
</div>

<div class="form-group {{ $errors->has('status') ? 'has-error' : ''}}">
    <label for="status" class="control-label">{{ 'Status' }}</label>
    <select class="form-control" name="status">
        <option value="1" {{ (isset($coupon->status) && $coupon->status == 1) ? 'selected' : '' }}>Active</option>
        <option value="0" {{ (isset($coupon->status) && $coupon->status == 0) ? 'selected' : '' }}>InActive</option>
    </select>
    {!! $errors->first('status', '<p class="help-block">:message</p>') !!}
</div>

<div class="form-group mt-2">
    <input class="btn btn-primary" type="submit" value="{{ $formMode === 'edit' ? 'Update' : 'Create' }}">
</div>
