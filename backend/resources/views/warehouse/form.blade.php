<div class="form-group {{ $errors->has('name') ? 'has-error' : ''}}">
    <label for="name" class="control-label">{{ 'Name' }}</label>
    <input class="form-control" name="name" type="text" id="name" value="{{ isset($warehouse->name) ? $warehouse->name : ''}}" >
    {!! $errors->first('name', '<p class="help-block">:message</p>') !!}
</div>
<div class="form-group {{ $errors->has('phone') ? 'has-error' : ''}}">
    <label for="phone" class="control-label">{{ 'Phone' }}</label>
    <input class="form-control" name="phone" type="text" id="phone" value="{{ isset($warehouse->phone) ? $warehouse->phone : ''}}" >
    {!! $errors->first('phone', '<p class="help-block">:message</p>') !!}
</div>
<div class="form-group {{ $errors->has('email') ? 'has-error' : ''}}">
    <label for="email" class="control-label">{{ 'Email' }}</label>
    <input class="form-control" name="email" type="email" id="email" value="{{ isset($warehouse->email) ? $warehouse->email : ''}}" >
    {!! $errors->first('email', '<p class="help-block">:message</p>') !!}
</div>

<div class="form-group">

    <label for="image" class="control-label">{{ 'Logo' }}</label>
    <input type="file" name="image" id="image" class="form-control" value="{{ isset($warehouse->image) ? $warehouse->image : ''}}">
    @isset($warehouse->image)
        <img src="{{ asset($warehouse->image) }}" alt="" width="150px" height="100px">
    @endisset

</div>

<div class="form-group {{ $errors->has('address') ? 'has-error' : ''}}">
    <label for="address" class="control-label">{{ 'Address' }}</label>
    <input class="form-control" name="address" type="text" id="address" value="{{ isset($warehouse->address) ? $warehouse->address : ''}}" >
    {!! $errors->first('address', '<p class="help-block">:message</p>') !!}
</div>

<div class="form-group {{ $errors->has('latitude') ? 'has-error' : ''}}">
    <label for="latitude" class="control-label">{{ 'Latitude' }}</label>
    <input class="form-control" name="latitude" type="number" step="any" id="latitude" value="{{ isset($warehouse->latitude) ? $warehouse->latitude : '' }}" >
    {!! $errors->first('latitude', '<p class="help-block">:message</p>') !!}
</div>

<div class="form-group {{ $errors->has('longitude') ? 'has-error' : ''}}">
    <label for="longitude" class="control-label">{{ 'Longitude' }}</label>
    <input class="form-control" name="longitude" type="number" step="any" id="longitude" value="{{ isset($warehouse->longitude) ? $warehouse->longitude : '' }}" >
    {!! $errors->first('longitude', '<p class="help-block">:message</p>') !!}
</div>

<div class="form-group {{ $errors->has('status') ? 'has-error' : ''}}">
    <label for="status" class="control-label">{{ 'Status' }}</label>
    <select class="form-control" name="status">
        <option value="1" {{ (isset($warehouse->status) && $warehouse->status == 1) ? 'selected' : '' }}>Active</option>
        <option value="0" {{ (isset($warehouse->status) && $warehouse->status == 0) ? 'selected' : '' }}>InActive</option>
    </select>
    {!! $errors->first('status', '<p class="help-block">:message</p>') !!}
</div>

<div class="form-group mt-2">
    <input class="btn btn-primary" type="submit" value="{{ $formMode === 'edit' ? 'Update' : 'Create' }}">
</div>

