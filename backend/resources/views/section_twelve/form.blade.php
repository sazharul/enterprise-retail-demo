
<div class="form-group">

    <label for="image" class="control-label">{{ 'Image' }}</label>
    <input type="file" accept="" name="image" id="image" class="form-control"
        value="{{ isset($sections->image) ? $sections->image : '' }}">
    @isset($sections->image)
        <img src="{{ asset($sections->image) }}" alt="" width="150px" height="100px">
    @endisset

</div>

<div class="form-group {{ $errors->has('category_id') ? 'has-error' : '' }}">
    <label for="category_id" class="control-label">{{ 'Category Name*' }}</label>
    {{-- @dd(isset($sections)); --}}
    <select class="form-control" name="category_id" required>
        @if (isset($sections))
        <option value="{{ $sections->category_id}}" selected>
            {{ $sections->categories?->name }}
        </option>
        @else
        <option value="">Select Category</option>
        @endif
        @foreach ($categories as $item)
            <option value="{{ $item->id }}">
                {{ $item->name }}
            </option>
        @endforeach
    </select>
    {!! $errors->first('category_id', '<p class="help-block">:message</p>') !!}
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

