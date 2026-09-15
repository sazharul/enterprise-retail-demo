@extends('layouts.app')

@section('content')
    <div class="main-content">
        <div class="row">
            <div class="col-12 col-xl-5 col-xxl-4 d-flex">
                <div class="card rounded-4 w-100 shadow-none bg-transparent border-0">
                    <div class="card-body p-0">
                        <div class="row g-4">
                            <div class="col-12 col-xl-6 d-flex">
                                <div class="card mb-0 rounded-4 w-100">
                                    <div class="card-body">
                                        <div class="d-flex align-items-start justify-content-between mb-3">
                                            <div class="">
                                                <h4 class="mb-0">97.4K</h4>
                                                <p class="mb-0">Total Users</p>
                                            </div>
                                            <div class="dropdown">
                                                <a href="javascript:;" class="dropdown-toggle-nocaret options dropdown-toggle"
                                                   data-bs-toggle="dropdown">
                                                    <span class="material-icons-outlined fs-5">more_vert</span>
                                                </a>
                                                <ul class="dropdown-menu">
                                                    <li><a class="dropdown-item" href="javascript:;">Action</a></li>
                                                    <li><a class="dropdown-item" href="javascript:;">Another action</a></li>
                                                    <li><a class="dropdown-item" href="javascript:;">Something else here</a></li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div class="chart-container2">
                                            <div id="chart3"></div>
                                        </div>
                                        <div class="text-center">
                                            <p class="mb-0"><span class="text-success me-1">12.5%</span> from last month</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 col-xl-6 d-flex">
                                <div class="card mb-0 rounded-4 w-100">
                                    <div class="card-body">
                                        <div class="d-flex align-items-start justify-content-between mb-1">
                                            <div class="">
                                                <h4 class="mb-0">42.5K</h4>
                                                <p class="mb-0">Active Users</p>
                                            </div>
                                            <div class="dropdown">
                                                <a href="javascript:;" class="dropdown-toggle-nocaret options dropdown-toggle"
                                                   data-bs-toggle="dropdown">
                                                    <span class="material-icons-outlined fs-5">more_vert</span>
                                                </a>
                                                <ul class="dropdown-menu">
                                                    <li><a class="dropdown-item" href="javascript:;">Action</a></li>
                                                    <li><a class="dropdown-item" href="javascript:;">Another action</a></li>
                                                    <li><a class="dropdown-item" href="javascript:;">Something else here</a></li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div class="chart-container2">
                                            <div id="chart2"></div>
                                        </div>
                                        <div class="text-center">
                                            <p class="mb-0">24K users increased from last month</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div><!--end row-->
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
