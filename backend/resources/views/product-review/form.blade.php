<div class="form-group {{ $errors->has('status') ? 'has-error' : ''}}">
    <label for="status" class="control-label">{{ 'Status' }}</label>
    <select class="form-control" name="status">
        <option value="2" {{ (isset($review->status) && $review->status == 2) ? 'selected' : '' }}>Cancellation</option>
        <option value="1" {{ (isset($review->status) && $review->status == 1) ? 'selected' : '' }}>Approved</option>
        <option value="0" {{ (isset($review->status) && $review->status == 0) ? 'selected' : '' }}>Pending</option>
    </select>
    {!! $errors->first('status', '<p class="help-block">:message</p>') !!}
</div>

<div class="form-group">
    <input class="btn btn-primary" type="submit" value="{{ $formMode === 'edit' ? 'Update' : 'Create' }}">
</div>


