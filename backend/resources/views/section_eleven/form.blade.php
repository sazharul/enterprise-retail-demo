<div class="form-group {{ $errors->has('name') ? 'has-error' : '' }}">
    <label for="name" class="control-label">{{ 'Name' }}</label>
    <input class="form-control" name="name" type="text" id="name"
        value="{{ isset($sections->name) ? $sections->name : '' }}">
    {!! $errors->first('name', '<p class="help-block">:message</p>') !!}
</div>
<div class="form-group">

    <label for="image" class="control-label">{{ 'Image' }}</label>
    <input type="file" accept="" name="image" id="image" class="form-control"
        value="{{ isset($sections->image) ? $sections->image : '' }}">
    @isset($sections->image)
        <img src="{{ asset($sections->image) }}" alt="" width="150px" height="100px">
    @endisset

</div>

<div class="form-group {{ $errors->has('link') ? 'has-error' : '' }}">
    <label for="link" class="control-label">{{ 'Video Link*' }}</label>
    <input class="form-control" name="link" type="text" id="link"
        value="{{ isset($sections->link) ? $sections->link : '' }}">
    {!! $errors->first('link', '<p class="help-block">:message</p>') !!}
</div>

<div class="form-group {{ $errors->has('status') ? 'has-error' : '' }}">
    <label for="status" class="control-label">{{ 'Status' }}</label>
    <select class="form-control" name="status">
        <option value="1" {{ isset($sections->status) && $sections->status == 1 ? 'selected' : '' }}>Active
        </option>
        <option value="0" {{ isset($sections->status) && $sections->status == 0 ? 'selected' : '' }}>InActive
        </option>
    </select>
    {!! $errors->first('status', '<p class="help-block">:message</p>') !!}
</div>


<div class="form-group mt-2 ">
    <input class="btn btn-primary" type="submit" value="{{ $formMode === 'edit' ? 'Update' : 'Create' }}">
</div>

