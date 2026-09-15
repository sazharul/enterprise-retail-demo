@extends('layouts.app')
@section('title', 'Frequent Qeustion Details')
@section('content')
    <div class="main-content">
        <div class="row">
            <div class="col-md-8 offset-md-2">
                <div class="card">
                    <div class="card-header">FAQ {{ $faq->id }}</div>
                    <div class="card-body">

                        <a href="{{ route('faq.index') }}" title="Back">
                            <button class="btn btn-warning btn-sm"><i class="fa fa-arrow-left" aria-hidden="true"></i> Back</button>
                        </a>
                        <a href="{{ route('faq.edit',$faq->id ) }}" title="Edit Brand">
                            <button class="btn btn-primary btn-sm"><i class="fa fa-pencil-square-o" aria-hidden="true"></i> Edit</button>
                        </a>

                        <form method="POST" action="{{ route('faq.destroy',$faq->id) }}" accept-charset="UTF-8" style="display:inline">
                            {{ method_field('DELETE') }}
                            {{ csrf_field() }}
                            <button type="submit" class="btn btn-danger btn-sm" title="Delete Brand" onclick="return confirm(&quot;Confirm delete?&quot;)"><i
                                    class="fa fa-trash-o" aria-hidden="true"></i> Delete
                            </button>
                        </form>
                        <br/>
                        <br/>

                        <div class="table-responsive">
                            <table class="table">
                                <tbody>
                                <tr>
                                    <th>ID</th>
                                    <td>{{ $faq->id }}</td>
                                </tr>
                                <tr>
                                    <th> Question</th>
                                    <td> {{ $faq->question }} </td>
                                </tr>
                                <tr>
                                    <th> Answer</th>
                                    <td> {{ $faq->answer }} </td>
                                </tr>
                                <tr>
                                    <th> Status</th>
                                    <td> {{ $faq->status }} </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection


