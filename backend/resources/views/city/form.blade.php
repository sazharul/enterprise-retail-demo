<div class="form-group {{ $errors->has('district_id') ? 'has-error' : '' }}">
    <label for="district_id" class="control-label">{{ 'District Name *' }}</label>

    <select class="form-control" name="district_id">
        @foreach ($districts as $items)
            <option value="{{ $items->id }}"
                {{ isset($city->district_id) && $city->district_id == $items->id? 'selected' : '' }}>
                {{ $items->name }}</option>
       @endforeach
    </select>

    {!! $errors->first('city_id', '<p class="help-block">:message</p>') !!}
</div>

<div class="form-group {{ $errors->has('name') ? 'has-error' : '' }}">
    <label for="name" class="control-label">{{ 'Name' }}</label>
    <input class="form-control" name="name" type="text" id="name"
        value="{{ isset($city->name) ? $city->name : '' }}">
    {!! $errors->first('name', '<p class="help-block">:message</p>') !!}
</div>

<div class="form-group {{ $errors->has('status') ? 'has-error' : '' }}">
    <label for="status" class="control-label">{{ 'Status' }}</label>
    <select class="form-control" name="status">
        <option value="1" {{ isset($city->status) && $city->status == 1 ? 'selected' : '' }}>Active
        </option>
        <option value="0" {{ isset($city->status) && $city->status == 0 ? 'selected' : '' }}>InActive
        </option>
    </select>
    {!! $errors->first('status', '<p class="help-block">:message</p>') !!}
</div>



<div class="form-group">
    <input class="btn btn-primary" type="submit" value="{{ $formMode === 'edit' ? 'Update' : 'Create' }}">
</div>
