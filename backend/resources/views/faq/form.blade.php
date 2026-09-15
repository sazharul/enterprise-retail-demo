<div class="form-group {{ $errors->has('question') ? 'has-error' : ''}}">
    <label for="question" class="control-label">{{ 'Question' }}</label>
    <input class="form-control" name="question" type="text" id="question" value="{{ isset($faq->question) ? $faq->question : ''}}" >
    {!! $errors->first('question', '<p class="help-block">:message</p>') !!}
</div>

<div class="form-group {{ $errors->has('answer') ? 'has-error' : ''}}">
    <label for="answer" class="control-label">{{ 'Answer' }}</label>
    <input class="form-control" name="answer" type="text" id="answer" value="{{ isset($faq->answer) ? $faq->answer : ''}}" >
    {!! $errors->first('answer', '<p class="help-block">:message</p>') !!}
</div>

<div class="form-group {{ $errors->has('status') ? 'has-error' : ''}}">
    <label for="status" class="control-label">{{ 'Status' }}</label>
    <select class="form-control" name="status">
        <option value="1" {{ (isset($faq->status) && $faq->status == 1) ? 'selected' : '' }}>Active</option>
        <option value="0" {{ (isset($faq->status) && $faq->status == 0) ? 'selected' : '' }}>InActive</option>
    </select>
    {!! $errors->first('status', '<p class="help-block">:message</p>') !!}
</div>

<div class="form-group mt-2">
    <input class="btn btn-primary" type="submit" value="{{ $formMode === 'edit' ? 'Update' : 'Create' }}">
</div>

