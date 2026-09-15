<div class="form-group {{ $errors->has('name') ? 'has-error' : ''}}">
    <label for="name" class="control-label">{{ 'Name' }}</label>
    <input class="form-control" name="name" type="text" id="name" value="{{ isset($pack->name) ? $pack->name : ''}}" >
    {!! $errors->first('name', '<p class="help-block">:message</p>') !!}
</div>
<div class="form-group">

    <label for="image" class="control-label">{{ 'Image' }}</label>
    {{-- <input class="form-control" name="image" type="file" id="image" value="{{ isset($brand->image) ? $brand->name : ''}}" > --}}
    <input type="file" name="image" id="image" class="form-control" value="{{ isset($pack->image) ? $pack->image : ''}}">
    @isset($pack->image)
        <img src="{{ asset($pack->image) }}" alt="" width="150px" height="100px">
    @endisset

</div>

<div class="form-group {{ $errors->has('status') ? 'has-error' : ''}}">
    <label for="status" class="control-label">{{ 'Status' }}</label>
    <select class="form-control" name="status">
        <option value="1" {{ (isset($pack->status) && $pack->status == 1) ? 'selected' : '' }}>Active</option>
        <option value="0" {{ (isset($pack->status) && $pack->status == 0) ? 'selected' : '' }}>InActive</option>
    </select>
    {!! $errors->first('status', '<p class="help-block">:message</p>') !!}
</div>

<div class="form-group mt-2">
    <input class="btn btn-primary" type="submit" value="{{ $formMode === 'edit' ? 'Update' : 'Create' }}">
</div>

