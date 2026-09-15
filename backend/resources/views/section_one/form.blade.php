<div class="form-group {{ $errors->has('name') ? 'has-error' : '' }}">
    <label for="name" class="control-label">{{ 'Name*' }}</label>
    <input class="form-control" name="name" type="text" id="name"
        value="{{ isset($section_one->name) ? $section_one->name : '' }}">
    {!! $errors->first('name', '<p class="help-block">:message</p>') !!}
</div>

<div class="form-group">
    <label for="image" class="control-label">{{ 'Image' }}</label>
    <input type="file" accept="" name="image" id="image" class="form-control">
    @isset($section_one->image)
        <img src="{{ asset($section_one->image) }}" alt="" width="150px" height="100px">
    @endisset
</div>

<div class="form-group {{ $errors->has('offer_id') ? 'has-error' : '' }}">
    <label for="offer_id" class="control-label">{{ 'Offer Name*' }}</label>
    <select class="form-control" name="offer_id">
        <option value="">Select Offer</option>
        @foreach ($offers as $item)
            <option value="{{ $item->id }}"
                {{ isset($section_one->offer_id) && $section_one->offer_id == $item->id ? 'selected' : '' }}>
                {{ $item->name }}
            </option>
        @endforeach
    </select>
    {!! $errors->first('offer_id', '<p class="help-block">:message</p>') !!}
</div>


<div class="form-group {{ $errors->has('status') ? 'has-error' : '' }}">
    <label for="status" class="control-label">{{ 'Status' }}</label>
    <select class="form-control" name="status">
        <option value="1" {{ isset($section_one->status) && $section_one->status == 1 ? 'selected' : '' }}>Active
        </option>
        <option value="0" {{ isset($section_one->status) && $section_one->status == 0 ? 'selected' : '' }}>
            InActive</option>
    </select>
    {!! $errors->first('status', '<p class="help-block">:message</p>') !!}
</div>

<div class="form-group mt-2">
    <input class="btn btn-primary" type="submit" value="{{ $formMode === 'edit' ? 'Update' : 'Create' }}">
</div>
