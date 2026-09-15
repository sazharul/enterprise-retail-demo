<div class="form-group {{ $errors->has('name') ? 'has-error' : ''}}">
    <label for="name" class="control-label">{{ 'Name' }}</label>
    <input class="form-control" name="name" type="text" id="name" value="{{ isset($concern->name) ? $concern->name : ''}}" >
    {!! $errors->first('name', '<p class="help-block">:message</p>') !!}
</div>
<div class="form-group">

    <label for="image" class="control-label mt-1">{{ 'Image' }}</label>
    <input type="file" name="image" id="image" class="form-control" value="{{ isset($concern->image) ? $concern->image : ''}}">
    @isset($concern->image)
        <img src="{{ asset($concern->image) }}" alt="" width="150px" height="100px">
    @endisset

</div>

<div class="form-group {{ $errors->has('status') ? 'has-error' : ''}}">
    <label for="status" class="control-label mt-1">{{ 'Status' }}</label>
    <select class="form-control" name="status">
        <option value="1" {{ (isset($concern->status) && $concern->status == 1) ? 'selected' : '' }}>Active</option>
        <option value="0" {{ (isset($concern->status) && $concern->status == 0) ? 'selected' : '' }}>InActive</option>
    </select>
    {!! $errors->first('status', '<p class="help-block">:message</p>') !!}
</div>

<div class="form-group mt-2">
    <input class="btn btn-primary" type="submit" value="{{ $formMode === 'edit' ? 'Update' : 'Create' }}">
</div>

