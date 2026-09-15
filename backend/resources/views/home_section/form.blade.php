<div class="form-group {{ $errors->has('title') ? 'has-error' : '' }}">
    <label for="title" class="control-label">{{ 'Web Title' }}</label>
    <input class="form-control" name="title" type="text" id="title"
        value="{{ isset($home_section->title) ? $home_section->title : '' }}"
        {{ isset($home_section->type) && ($home_section->type == 1 || $home_section->type == 3) ? 'required' : 'disabled' }}>
    {!! $errors->first('title', '<p class="help-block">:message</p>') !!}
</div>

<div class="form-group {{ $errors->has('mobile_title') ? 'has-error' : '' }}">
    <label for="mobile_title" class="control-label">{{ 'Mobile Title' }}</label>
    <input class="form-control" name="mobile_title" type="text" id="mobile_title"
        value="{{ isset($home_section->mobile_title) ? $home_section->mobile_title : '' }}" {{ isset($home_section->type) && ($home_section->type == 2 || $home_section->type == 3) ? 'required' : 'disabled' }}
        >
    {!! $errors->first('mobile_title', '<p class="help-block">:message</p>') !!}
</div>

<div class="form-group">

    <label for="image" class="control-label">{{ 'Banner' }}</label>
    <input type="file" accept="" name="image" id="image" class="form-control"
        value="{{ isset($home_section->banner) ? $home_section->banner : '' }}">
    @isset($home_section->banner)
        <img src="{{ asset($home_section->banner) }}" alt="" width="150px" height="100px">
    @endisset

</div>

<div class="form-group {{ $errors->has('position') ? 'has-error' : '' }}">
    <label for="position" class="control-label">{{ 'Position' }}</label>
    <select class="form-control" name="position">
        @for ($i = 1; $i < 19; $i++)
            <option value="{{ $i }}"
                {{ isset($home_section->position) && $home_section->position == $i ? 'selected' : '' }}>
                {{ $i }}</option>
        @endfor

    </select>
    {!! $errors->first('position', '<p class="help-block">:message</p>') !!}
</div>

{{-- <div class="form-group {{ $errors->has('type') ? 'has-error' : '' }}">
    <label for="type" class="control-label">{{ 'Section Type' }}</label>
    <select class="form-control" name="type" required>
        <option value="1" {{ isset($home_section->type) && $home_section->type == 1 ? 'selected' : '' }}>Web
        </option>
        <option value="2" {{ isset($home_section->type) && $home_section->type == 2 ? 'selected' : '' }}>Mobile
        </option>
        <option value="3" {{ isset($home_section->type) && $home_section->type == 3 ? 'selected' : '' }}>Both
        </option>
    </select>
    {!! $errors->first('type', '<p class="help-block">:message</p>') !!}
</div> --}}

<div class="form-group {{ $errors->has('status') ? 'has-error' : '' }}">
    <label for="status" class="control-label">{{ 'Status' }}</label>
    <select class="form-control" name="status">
        <option value="1" {{ isset($home_section->status) && $home_section->status == 1 ? 'selected' : '' }}>
            Active</option>
        <option value="0" {{ isset($home_section->status) && $home_section->status == 0 ? 'selected' : '' }}>
            InActive</option>
    </select>
    {!! $errors->first('status', '<p class="help-block">:message</p>') !!}
</div>




<div class="form-group mt-2 ">
    <input class="btn btn-primary" type="submit" value="{{ $formMode === 'edit' ? 'Update' : 'Create' }}">
</div>
