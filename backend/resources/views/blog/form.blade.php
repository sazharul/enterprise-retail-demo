<div class="form-group {{ $errors->has('name') ? 'has-error' : ''}}">
    <label for="name" class="control-label">{{ 'Title' }}</label>
    <input class="form-control" name="title" type="text" id="name" value="{{ isset($blog->title) ? $blog->title : ''}}" >
    {!! $errors->first('name', '<p class="help-block">:message</p>') !!}
</div>
<div class="form-group">

    <label for="image" class="control-label">{{ 'Image' }}</label>
    {{-- <input class="form-control" name="image" type="file" id="image" value="{{ isset($brand->image) ? $brand->name : ''}}" > --}}
    <input type="file" name="image" id="image" class="form-control" value="{{ isset($blog->image) ? $blog->image : ''}}">
    @isset($blog->image)
        <img src="{{ asset($blog->image) }}" alt="" width="150px" height="100px">
    @endisset

</div>
<div class="form-group {{ $errors->has('description') ? 'has-error' : ''}}" >
    <label for="description" class="control-label">{{ 'Description' }}</label>
    <textarea class="form-control" id="editor" rows="10" cols="80"  name="description" >{{ isset($blog->description) ? $blog->description : '' }}</textarea>
    {!! $errors->first('description', '<p class="help-block">:message</p>') !!}
</div>


<div class="form-group {{ $errors->has('status') ? 'has-error' : ''}}">
    <label for="status" class="control-label">{{ 'Status' }}</label>
    <select class="form-control" name="status">
        <option value="1" {{ (isset($blog->status) && $blog->status == 1) ? 'selected' : '' }}>Active</option>
        <option value="0" {{ (isset($blog->status) && $blog->status == 0) ? 'selected' : '' }}>InActive</option>
    </select>
    {!! $errors->first('status', '<p class="help-block">:message</p>') !!}
</div>

<div class="form-group mt-2 ">
    <input class="btn btn-primary" type="submit" value="{{ $formMode === 'edit' ? 'Update' : 'Create' }}">
</div>
