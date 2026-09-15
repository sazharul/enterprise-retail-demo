@extends('layouts.app')
@section('title', 'Reward Setting')

@section('content')
    <div class="main-content">

         <!--begin::Validation Message-->
         @include('include.validation-message')
         <!--end::Validation Message-->

        <div class="card">
            <div class="card-header">
                Reward Setting
            </div>
            <!--begin::Form-->
            <form class="validate-form" action="{{ route('setting.reward.store') }}" method="POST" enctype="multipart/form-data">
                @csrf
                <!--begin::Card Body-->
                <div class="card-body">
                    <div class="row">
                        <!--begin::Col-->
                        <div class="col-md-6 col-12">
                            <div class="form-group">
                                <label for="amount" class="col-form-label">Amount</label>
                                <input type="number" name="amount" required class="form-control" id="amount" placeholder="Amount" value="{{$reward->amount ?? 0}}">
                            </div>

                            <div class="form-group">
                                <label for="reward_point" class="col-form-label">Reward Point</label>
                                <input type="number" name="reward_point" required class="form-control" id="reward_point" placeholder="Reward Point" value="{{$reward->reward_point ?? 0}}">
                            </div>
                            <div class="form-group">
                                <label for="reward_point_value" class="col-form-label">Reward Point Value (Per Point)</label>
                                <input type="number" name="reward_point_value" required class="form-control" id="reward_point_value" placeholder="Reward Point Value" value="{{$reward->reward_point_value ?? 0}}">
                            </div>
                        </div>
                        <!--end::Col-->
                    </div>
                </div>
                <!--end::Card Body-->

                <!--begin::Card Footer-->
                <div class="card-footer">
                    <div class="col-sm-12 col-12">
                        <button type="submit" class="btn btn-success btn-sm">Update</button>
                    </div>
                </div>
                <!--end::Card Footer-->
            </form>
            <!--end::Form-->
        </div>
    </div>
@endsection

@push('scripts')
@endpush
