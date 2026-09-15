
@php
    $blogIds = \App\Models\Blog::all();

@endphp

<div class="form-group {{ $errors->has('blog_id') ? 'has-error' : '' }}">
    <label for="blog_id" class="control-label">{{ 'Blog Id' }}</label>
    <select class="form-control" name="blog_id" id="blog_id">
        <option value=""> -- Select Blog Id -- </option>

        @foreach ($blogIds as $blog)
            <option value="{{ $blog->id }}" {{ ($blog->id == $comment->blog_id) ? 'selected' : '' }}>
                {{ $blog->title }}
            </option>
        @endforeach
    </select>
    {!! $errors->first('blog_id', '<p class="help-block">:message</p>') !!}
</div>

<div class="form-group {{ $errors->has('comment') ? 'has-error' : ''}}" >
    <label for="comment" class="control-label">{{ 'Comment' }}</label>
    <textarea class="form-control" id="editor" rows="30" cols="80"  name="comment" >{{ isset($comment->comment) ? $comment->comment : '' }}</textarea>
    {!! $errors->first('comment', '<p class="help-block">:message</p>') !!}
</div>


<div class="form-group {{ $errors->has('status') ? 'has-error' : ''}}">
    <label for="status" class="control-label">{{ 'Status' }}</label>
    <select class="form-control" name="status">
        <option value="1" {{ (isset($comment->status) && $comment->status == 1) ? 'selected' : '' }}>Active</option>
        <option value="0" {{ (isset($comment->status) && $comment->status == 0) ? 'selected' : '' }}>InActive</option>
    </select>
    {!! $errors->first('status', '<p class="help-block">:message</p>') !!}
</div>

<div class="form-group mt-2 ">
    <input class="btn btn-primary" type="submit" value="{{ $formMode === 'edit' ? 'Update' : 'Create' }}">
</div>
