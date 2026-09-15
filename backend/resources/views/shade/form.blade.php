<div class="form-group {{ $errors->has('color_id') ? 'has-error' : '' }}">
    <label for="color_id" class="control-label">{{ 'Color Name *' }}</label>

    <select class="form-control" name="color_id">
        
        @foreach ($colors as $items)
            <option value="{{ $items->id }}"
                {{ isset($shade->color_id) && $shade->color_id == $items->id? 'selected' : '' }}>
                {{ $items->name }}</option>
       @endforeach
    </select>

    {!! $errors->first('city_id', '<p class="help-block">:message</p>') !!}
</div>

<div class="form-group {{ $errors->has('name') ? 'has-error' : '' }}">
    <label for="name" class="control-label">{{ 'Name' }}</label>
    <input class="form-control" name="name" type="text" id="name"
        value="{{ isset($shade->name) ? $shade->name : '' }}">
    {!! $errors->first('name', '<p class="help-block">:message</p>') !!}
</div>

<div class="form-group">

    <label for="image" class="control-label">{{ 'Image' }}</label>
    <input type="file" name="image" id="image" class="form-control" value="{{ isset($shade->image) ? $shade->image : ''}}">
    @isset($shade->image)
    <img src="{{ asset($shade->image) }}" alt="" width="150px" height="100px">
    @endisset

</div>

<div class="form-group {{ $errors->has('status') ? 'has-error' : '' }}">
    <label for="status" class="control-label">{{ 'Status' }}</label>
    <select class="form-control" name="status">
        <option value="1" {{ isset($shade->status) && $shade->status == 1 ? 'selected' : '' }}>Active
        </option>
        <option value="0" {{ isset($shade->status) && $shade->status == 0 ? 'selected' : '' }}>InActive
        </option>
    </select>
    {!! $errors->first('status', '<p class="help-block">:message</p>') !!}
</div>



<div class="form-group">
    <input class="btn btn-primary" type="submit" value="{{ $formMode === 'edit' ? 'Update' : 'Create' }}">
</div>
