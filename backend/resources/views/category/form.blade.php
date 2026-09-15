<div class="form-group {{ $errors->has('parent_id') ? 'has-error' : '' }}">
    <label for="parent_id" class="control-label">{{ 'Parent_id *' }}</label>

    <select class="form-control" name="parent_id">
        <option value="0" {{ isset($category->id) && $category->parent_id == 0 ? 'selected' : '' }}>
            {{ '--Root--' }}</option>
        @php
            $categories = \App\Models\Category::where('status', 1)
                ->where('parent_id', 0)
                ->get();
        @endphp
        @foreach ($categories as $items)
            <option value="{{ $items->id }}"
                {{ isset($category->parent_id) && $category->parent_id == $items->id ? 'selected' : '' }}>
                {{ $items->name }}</option>
            <optgroup label="{{ $items->name }}">
                @php
                    $subcategories = \App\Models\Category::where('status', 1)
                        ->where('parent_id', $items->id)
                        ->get();
                @endphp
                @foreach ($subcategories as $item)
                <option value="{{ $item->id }}"
                    {{ isset($category->parent_id) && $category->parent_id == $item->id ? 'selected' : '' }}>
                    {{ $item->name }}</option>
                @endforeach

            </optgroup>
       @endforeach
    </select>

    {!! $errors->first('category_id', '<p class="help-block">:message</p>') !!}
</div>

<div class="form-group {{ $errors->has('name') ? 'has-error' : '' }}">
    <label for="name" class="control-label">{{ 'Name' }}</label>
    <input class="form-control" name="name" type="text" id="name"
        value="{{ isset($category->name) ? $category->name : '' }}">
    {!! $errors->first('name', '<p class="help-block">:message</p>') !!}
</div>
<div class="form-group">

    <label for="image" class="control-label">{{ 'Image' }}</label>
    {{-- <input class="form-control" name="image" type="file" id="image" value="{{ isset($category->image) ? $category->name : ''}}" > --}}
    <input type="file" name="image" id="image" class="form-control"
        value="{{ isset($category->image) ? $category->image : '' }}">
    @isset($category->image)
        <img src="{{ asset($category->image) }}" alt="" width="150px" height="100px">
    @endisset

</div>

<div class="form-group">

    <label for="icon" class="control-label">{{ 'Icon' }}</label>

    <input type="file" name="icon" id="icon" class="form-control"
        value="{{ isset($category->icon) ? $category->icon : '' }}">
    @isset($category->icon)
        <img src="{{ asset($category->icon) }}" alt="" width="150px" height="100px">
    @endisset

</div>

<div class="form-group {{ $errors->has('status') ? 'has-error' : '' }}">
    <label for="status" class="control-label">{{ 'Status' }}</label>
    <select class="form-control" name="status">
        <option value="1" {{ isset($category->status) && $category->status == 1 ? 'selected' : '' }}>Active
        </option>
        <option value="0" {{ isset($category->status) && $category->status == 0 ? 'selected' : '' }}>InActive
        </option>
    </select>
    {!! $errors->first('status', '<p class="help-block">:message</p>') !!}
</div>



<div class="form-group mt-2">
    <input class="btn btn-primary" type="submit" value="{{ $formMode === 'edit' ? 'Update' : 'Create' }}">
</div>
