<div class="form-group {{ $errors->has('name') ? 'has-error' : '' }}">
    <label for="name" class="control-label">{{ 'Name' }}</label>
    <input class="form-control" name="name" type="text" id="name"
        value="{{ isset($brand->name) ? $brand->name : '' }}">
    {!! $errors->first('name', '<p class="help-block">:message</p>') !!}
</div>
<div class="form-group">

    <label for="image" class="control-label">{{ 'Image' }}</label>
    <input type="file" accept="" name="image" id="image" class="form-control"
        value="{{ isset($brand->image) ? $brand->image : '' }}">
    @isset($brand->image)
        <img src="{{ asset($brand->image) }}" alt="" width="150px" height="100px">
    @endisset

</div>

<div class="form-group {{ $errors->has('status') ? 'has-error' : '' }}">
    <label for="status" class="control-label">{{ 'Status' }}</label>
    <select class="form-control" name="status">
        <option value="1" {{ isset($brand->status) && $brand->status == 1 ? 'selected' : '' }}>Active</option>
        <option value="0" {{ isset($brand->status) && $brand->status == 0 ? 'selected' : '' }}>InActive</option>
    </select>
    {!! $errors->first('status', '<p class="help-block">:message</p>') !!}
</div>

<div class="form-group {{ $errors->has('is_popular') ? 'has-error' : '' }}">
    <label for="is_popular" class="control-label">{{ 'Popular' }} :</label>
    <span class="checkbox">

        <input type="checkbox" name="is_popular" value="1"
            {{ isset($brand->is_popular) && $brand->is_popular == 1 ? 'checked' : '' }}>

    </span>

    {!! $errors->first('is_popular', '<p class="help-block">:message</p>') !!}
</div>

<div class="form-group {{ $errors->has('is_top_brand') ? 'has-error' : '' }}">
    <label for="is_top_brand" class="control-label">{{ 'Top Brand' }} :</label>
    <span class="checkbox">
        <input type="checkbox" name="is_top_brand" value="1"
            {{ isset($brand->is_top_brand) && $brand->is_top_brand == 1 ? 'checked' : '' }}>
    </span>

    {!! $errors->first('is_top_brand', '<p class="help-block">:message</p>') !!}
</div>


<div class="form-group mt-2 ">
    <input class="btn btn-primary" type="submit" value="{{ $formMode === 'edit' ? 'Update' : 'Create' }}">
</div>
