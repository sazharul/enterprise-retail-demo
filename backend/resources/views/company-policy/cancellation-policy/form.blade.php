<div class="form-group {{ $errors->has('document') ? 'has-error' : ''}}" >
    <label for="document" class="control-label">{{ 'Comment' }}</label>
    <textarea class="form-control" id="editor" rows="30" cols="80"  name="document" >{{ isset($document->document) ? $document->document : '' }}</textarea>
    {!! $errors->first('document', '<p class="help-block">:message</p>') !!}
</div>


<div class="form-group mt-2">
    <input class="btn btn-primary" type="submit" value="{{ $formMode === 'edit' ? 'Update' : 'Create' }}">
</div>

