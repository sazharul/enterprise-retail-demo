<div class="form-group {{ $errors->has('name') ? 'has-error' : ''}}">
    <label for="name" class="control-label">{{ 'Name' }}</label>
    <input class="form-control" name="name" type="text" id="name" value="{{ isset($color->name) ? $color->name : ''}}" >
    {!! $errors->first('name', '<p class="help-block">:message</p>') !!}
</div>

<div class="form-group">

    <label for="image" class="control-label">{{ 'Image' }}</label>
    <input type="file" name="image" id="image" class="form-control" value="{{ isset($color->image) ? $color->image : ''}}">
    @isset($color->image)
    <img src="{{ asset($color->image) }}" alt="" width="150px" height="100px">
    @endisset

</div>

<div class="form-group {{ $errors->has('status') ? 'has-error' : ''}}">
    <label for="status" class="control-label">{{ 'Status' }}</label>
    <select class="form-control" name="status">
        <option value="1" {{ (isset($color->status) && $color->status == 1) ? 'selected' : '' }}>Active</option>
        <option value="0" {{ (isset($color->status) && $color->status == 0) ? 'selected' : '' }}>InActive</option>
    </select>
    {!! $errors->first('status', '<p class="help-block">:message</p>') !!}
</div>

<div class="form-group">
    <input class="btn btn-primary" type="submit" value="{{ $formMode === 'edit' ? 'Update' : 'Create' }}">
</div>

