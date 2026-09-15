{{-- <div class="form-group {{ $errors->has('name') ? 'has-error' : '' }}">
    <label for="name" class="control-label">{{ 'Name' }}</label>
    <input class="form-control" name="name" type="text" id="name"
        value="{{ isset($section_two->name) ? $section_two->name : '' }}">
    {!! $errors->first('name', '<p class="help-block">:message</p>') !!}
</div>
<div class="form-group">

    <label for="image" class="control-label">{{ 'Image' }}</label>
    <input type="file" accept="" name="image" id="image" class="form-control"
        value="{{ isset($section_two->image) ? $section_two->image : '' }}">
    @isset($section_two->image)
        <img src="{{ asset($section_two->image) }}" alt="" width="150px" height="100px">
    @endisset

</div>

<div class="form-group {{ $errors->has('description') ? 'has-error' : '' }}">
    <label for="description" class="control-label">{{ 'Short Description' }}</label>
    <input class="form-control" name="description" type="text" id="description"
        value="{{ isset($section_two->description) ? $section_two->description : '' }}">
    {!! $errors->first('description', '<p class="help-block">:message</p>') !!}
</div>


<div class="form-group my-2">
    <label class="control-label">Select Option:</label>
    <div>
        <label  class="radio mt-1 mx-2">
            <input type="radio" name="option" value="offer" checked> Offer
        </label>
        <label class="radio">
            <input type="radio" name="option" value="link" > Link
        </label>

    </div>

</div>

<div id="linkOption">
    <div class="form-group {{ $errors->has('link') ? 'has-error' : '' }}">
        <label for="link" class="control-label">{{ 'Link*' }}</label>
        <input class="form-control" name="link" type="text" id="link"
            value="{{ isset($section_two->link) ? $section_two->link : '' }}">
        {!! $errors->first('link', '<p class="help-block">:message</p>') !!}
    </div>
</div>

<div id="offerOption" style="display:none">
    <div class="form-group {{ $errors->has('offer_id') ? 'has-error' : '' }}">
        <label for="offer_id" class="control-label">{{ 'Offer Name*' }}</label>
        <select class="form-control" name="offer_id">
            <option value="">Select Offer</option>
            @foreach ($offers as $item)
                <option value="{{ $item->id }}"
                    {{ isset($section_two->offer_id) && $section_two->offer_id == $item->id ? 'selected' : '' }}>
                    {{ $item->name }}
                </option>
            @endforeach
        </select>
        {!! $errors->first('offer_id', '<p class="help-block">:message</p>') !!}
    </div>
</div>


<div class="form-group {{ $errors->has('status') ? 'has-error' : '' }}">
    <label for="status" class="control-label">{{ 'Status' }}</label>
    <select class="form-control" name="status">
        <option value="1" {{ isset($section_two->status) && $section_two->status == 1 ? 'selected' : '' }}>Active</option>
        <option value="0" {{ isset($section_two->status) && $section_two->status == 0 ? 'selected' : '' }}>InActive</option>
    </select>
    {!! $errors->first('status', '<p class="help-block">:message</p>') !!}
</div>


<div class="form-group mt-2 ">
    <input class="btn btn-primary" type="submit" value="{{ $formMode === 'edit' ? 'Update' : 'Create' }}">
</div>
@push('scripts')
<script>
    document.addEventListener('DOMContentLoaded', function () {
        var linkOption = document.getElementById('linkOption');
        var offerOption = document.getElementById('offerOption');
        var linkRadio = document.querySelector('input[name="option"][value="link"]');
        var offerRadio = document.querySelector('input[name="option"][value="offer"]');

        linkRadio.addEventListener('change', function () {
            linkOption.style.display = 'block';
            offerOption.style.display = 'none';
        });

        offerRadio.addEventListener('change', function () {
            linkOption.style.display = 'none';
            offerOption.style.display = 'block';
        });

        // Initially check which option is selected
        if (linkRadio.checked) {
            linkOption.style.display = 'block';
            offerOption.style.display = 'none';
        } else if (offerRadio.checked) {
            linkOption.style.display = 'none';
            offerOption.style.display = 'block';
        }
    });
</script>
@endpush --}}
