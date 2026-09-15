<div class="form-group">

    <label for="image" class="control-label">{{ 'Image' }}</label>
    <input type="file" accept="" name="image" id="image" class="form-control"
        value="{{ isset($sections->image) ? $sections->image : '' }}">
    @isset($sections->image)
        <img src="{{ asset($sections->image) }}" alt="" width="150px" height="100px">
    @endisset

</div>

<div class="form-group {{ $errors->has('description') ? 'has-error' : ''}}" >
    <label for="description" class="control-label">{{ 'Description' }}</label>
    <textarea class="form-control" id="editor" rows="30" cols="80"  name="description" >{{ isset($sections->description) ? $sections->description : '' }}</textarea>
    {!! $errors->first('description', '<p class="help-block">:message</p>') !!}
</div>


<div class="form-group mt-2">
    <input class="btn btn-primary" type="submit" value="{{ $formMode === 'edit' ? 'Update' : 'Create' }}">
</div>

