<!--start sidebar-->
<aside class="sidebar-wrapper">
    <div class="sidebar-header">
        <div class="logo-icon">
            <img src="{{ asset('backend/assets/images/logo-icon.png') }}" class="logo-img" alt="">
        </div>
        <div class="logo-name flex-grow-1">
            <h5 class="mb-0">Metoxi</h5>
        </div>
        <div class="sidebar-close">
            <span class="material-icons-outlined">close</span>
        </div>
    </div>

    @php
        $usr = Auth::guard('admin')->user();
    @endphp

    <div class="sidebar-nav" data-simplebar="true">

        <!--navigation-->
        <ul class="metismenu" id="sidenav">
            <li>
                <a href="{{ route('admin.dashboard') }}">
                    <div class="parent-icon"><i class="material-icons-outlined">home</i></div>
                    <div class="menu-title">Dashboard</div>
                </a>
            </li>
            <li class="{{ request()->is('admin/pos*') ? 'mm-active' : '' }}">
                <a href="{{ route('pos.point_of_sales') }}">
                    <div class="parent-icon"><i class="material-icons-outlined">point_of_sale</i></div>
                    <div class="menu-title">POS</div>
                </a>
            </li>

            <li>
                <a href="javascript:void(0)" class="has-arrow">
                    <div class="parent-icon"><i class="material-icons-outlined">widgets</i>
                    </div>
                    <div class="menu-title">Warehouse</div>
                </a>
                <ul>
                    <li><a href="{{ route('warehouse.index') }}"><i
                                class="material-icons-outlined">circle</i>Warehouses</a>
                    </li>
                </ul>
            </li>
            <li>
                <a href="javascript:void(0)" class="has-arrow">
                    <div class="parent-icon"><i class="material-icons-outlined">shopping_bag</i>
                    </div>
                    <div class="menu-title">Products</div>
                </a>
                <ul>
                    <li><a href="{{ route('product.index') }}"><i class="material-icons-outlined">circle</i>Products</a>
                    </li>

                    <li><a href="{{ route('size.index') }}"><i class="material-icons-outlined">circle</i>Size</a>
                    </li>

                    <li><a href="{{ route('color.index') }}"><i class="material-icons-outlined">circle</i>Color</a>
                    </li>
                    <li><a href="{{ route('shade.index') }}"><i class="material-icons-outlined">circle</i>Shade</a>
                    </li>
                </ul>
            </li>
            <li>
                <a href="javascript:void(0)" class="has-arrow">
                    <div class="parent-icon"><i class="material-icons-outlined">archive</i>
                    </div>
                    <div class="menu-title">Purchase</div>
                </a>
                <ul>
                    <li><a href="{{ route('purchase.index') }}"><i
                                class="material-icons-outlined">circle</i>Purchases</a>
                    </li>

                </ul>
            </li>
            <li class="{{ request()->is('admin/order*') ? 'mm-active' : '' }}">
                <a href="{{ route('order.index') }}"
                    class="{{ request()->routeIs('order.index') ? 'mm-active' : '' }}">
                    <div class="parent-icon"><i class="material-icons-outlined">shopping_cart</i></div>
                    <div class="menu-title">Orders</div>
                </a>
            </li>
            <li class="{{ request()->is('admin/role*') ? 'mm-active' : '' }}">
                <a href="{{ route('role.index') }}"
                    class="{{ request()->routeIs('role.index') || request()->routeIs('role.create') || request()->routeIs('role.edit') ? 'mm-active' : '' }}">
                    <div class="parent-icon"><i class="material-icons-outlined">shield</i></div>
                    <div class="menu-title">Role Permission</div>
                </a>
            </li>
            <li class="{{ request()->is('admin/staff*') ? 'mm-active' : '' }}">
                <a href="{{ route('staff.index') }}"
                    class="{{ request()->routeIs('staff.index') || request()->routeIs('staff.create') || request()->routeIs('staff.edit') ? 'mm-active' : '' }}">
                    <div class="parent-icon"><i class="material-icons-outlined">person</i></div>
                    <div class="menu-title">Staffs</div>
                </a>
            </li>

            <li>
                <a href="javascript:void(0)" class="has-arrow">
                    <div class="parent-icon"><i class="material-icons-outlined">layers</i>
                    </div>
                    <div class="menu-title">Attributes</div>
                </a>
                <ul>
                    <li><a href="{{ route('brand.index') }}"><i class="material-icons-outlined">circle</i>Brand</a>
                    </li>

                    <li><a href="{{ route('category.index') }}"><i
                                class="material-icons-outlined">circle</i>Category</a>
                    </li>

                    <li><a href="{{ route('preference.index') }}"><i
                                class="material-icons-outlined">circle</i>Preference</a>
                    </li>
                    <li><a href="{{ route('formulation.index') }}"><i
                                class="material-icons-outlined">circle</i>Formulation</a>
                    </li>
                    <li><a href="{{ route('finish.index') }}"><i class="material-icons-outlined">circle</i>Finish</a>
                    </li>
                    <li><a href="{{ route('country.index') }}"><i class="material-icons-outlined">circle</i>Country
                            Of Origin</a>
                    </li>
                    <li><a href="{{ route('gender.index') }}"><i class="material-icons-outlined">circle</i>Gender</a>
                    </li>
                    <li><a href="{{ route('coverage.index') }}"><i
                                class="material-icons-outlined">circle</i>Coverage</a>
                    </li>
                    <li><a href="{{ route('skin.index') }}"><i class="material-icons-outlined">circle</i>Skin
                            Type</a>
                    </li>
                    <li><a href="{{ route('benefit.index') }}"><i class="material-icons-outlined">circle</i>Benefit</a>
                    </li>
                    <li><a href="{{ route('concern.index') }}"><i class="material-icons-outlined">circle</i>Concern</a>
                    </li>
                    <li><a href="{{ route('ingredient.index') }}"><i
                                class="material-icons-outlined">circle</i>Ingredient</a>
                    </li>
                    <li><a href="{{ route('pack.index') }}"><i class="material-icons-outlined">circle</i>Pack
                            Size</a>

                </ul>
            </li>
            <li class="{{ request()->is('admin/offer*') ? 'mm-active' : '' }}">
                <a href="javascript:void(0)" class="has-arrow">
                    <div class="parent-icon"><i class="material-icons-outlined">card_giftcard</i>
                    </div>
                    <div class="menu-title">Offers</div>
                </a>

                <ul>
                    <li><a href="{{ route('offer.index') }}"><i class="material-icons-outlined">circle</i>Offer Details</a>
                    </li>
                    <li><a href="{{ route('uptosale.index') }}"><i class="material-icons-outlined">circle</i>UptoSale Offer</a>
                    </li>
                    <li class="{{ request()->routeIs('combo_offer.index') || request()->routeIs('combo_offer.edit') || request()->routeIs('combo_offer.create') ? 'mm-active' : '' }}"><a href="{{ route('combo_offer.index') }}"><i class="material-icons-outlined">circle</i>Assign Combo</a>
                    </li>
                    <li><a href="{{ route('combo_product.index') }}"><i class="material-icons-outlined">circle</i>Combo Products</a>
                    </li>
                </ul>
            </li>
            <li>
                <a href="javascript:void(0)" class="has-arrow">
                    <div class="parent-icon"><i class="material-icons-outlined">map</i>
                    </div>
                    <div class="menu-title">Address</div>
                </a>
                <ul>
                    <li><a href="{{ route('district.index') }}"><i
                                class="material-icons-outlined">circle</i>District</a>
                    </li>
                    <li><a href="{{ route('city.index') }}"><i class="material-icons-outlined">circle</i>City</a>

                </ul>
            </li>
            <li>
                <a href="javascript:void(0)" class="has-arrow">
                    <div class="parent-icon"><i class="material-icons-outlined">home</i>
                    </div>
                    <div class="menu-title">Home Page</div>
                </a>
                <ul>
                    <li><a href="{{ route('home_section.index') }}"><i
                                class="material-icons-outlined">circle</i>Home Section</a>
                    </li>
                    <li><a href="{{ route('section_one.index') }}"><i class="material-icons-outlined">circle</i>Section 1</a>
                    <li><a href="{{ route('section_two.index') }}"><i class="material-icons-outlined">circle</i>Section 2</a>
                    <li><a href="{{ route('section_three.index') }}"><i class="material-icons-outlined">circle</i>Section 3</a>
                    <li><a href="{{ route('section_four.index') }}"><i class="material-icons-outlined">circle</i>Section 4</a>
                    <li><a href="{{ route('section_five.index') }}"><i class="material-icons-outlined">circle</i>Section 5</a>
                    {{-- <li><a href="{{ route('section_six.index') }}"><i class="material-icons-outlined">circle</i>Section 6</a> --}}
                    <li><a href="{{ route('section_seven.index') }}"><i class="material-icons-outlined">circle</i>Section 7</a>
                    <li><a href="{{ route('section_eight.index') }}"><i class="material-icons-outlined">circle</i>Section 8</a>
                    <li><a href="{{ route('section_nine.index') }}"><i class="material-icons-outlined">circle</i>Section 9</a>
                    <li><a href="{{ route('section_ten.index') }}"><i class="material-icons-outlined">circle</i>Section 10</a>
                    <li><a href="{{ route('section_eleven.index') }}"><i class="material-icons-outlined">circle</i>Section 11</a>
                    <li><a href="{{ route('section_twelve.index') }}"><i class="material-icons-outlined">circle</i>Section 12</a>
                    <li><a href="{{ route('section_thirteen.index') }}"><i class="material-icons-outlined">circle</i>Section 13</a>
                    <li><a href="{{ route('section_fourteen.index') }}"><i class="material-icons-outlined">circle</i>Section 14</a>
                    <li><a href="{{ route('section_sixteen.index') }}"><i class="material-icons-outlined">circle</i>Section 16</a>
                    <li><a href="{{ route('section_seventeen.index') }}"><i class="material-icons-outlined">circle</i>Section 17</a>
                    <li><a href="{{ route('section_eighteen.index') }}"><i class="material-icons-outlined">circle</i>Section 18</a>
                    <li><a href="{{ route('section_nineteen.index') }}"><i class="material-icons-outlined">circle</i>Section 19</a>

                </ul>
            </li>
            <li>
                <a href="javascript:void(0)" class="has-arrow">
                    <div class="parent-icon"><i class="material-icons-outlined">folder</i>
                    </div>
                    <div class="menu-title">Blog Post</div>
                </a>
                <ul>
                    <li><a href="{{ route('blog.index') }}"><i class="material-icons-outlined">circle</i>Blog</a>
                    </li>
                    <li><a href="{{ route('comment.index') }}"><i
                                class="material-icons-outlined">circle</i>Comment</a>
                    </li>
                </ul>
            </li>
            <li>
                <a href="{{ route('faq.index') }}">
                    <div class="parent-icon"><i class="material-icons-outlined">help_outline</i>
                    </div>
                    <div class="menu-title">FAQ</div>
                </a>
            </li>

            <li>
                <a href="javascript:void(0)" class="has-arrow">
                    <div class="parent-icon"><i class="material-icons-outlined">description</i>
                    </div>
                    <div class="menu-title">Company Policy</div>
                </a>
                <ul>
                    <li><a href="{{ route('whoweare.index') }}"><i class="material-icons-outlined">circle</i>Who We
                            Are</a>
                    </li>

                    <li><a href="{{ route('termcondition.index') }}"><i
                                class="material-icons-outlined">circle</i>Terms and Condition</a>
                    </li>
                    <li><a href="{{ route('privacypolicy.index') }}"><i
                                class="material-icons-outlined">circle</i>Privacy Policy</a>
                    </li>
                    <li><a href="{{ route('cancellationpolicy.index') }}"><i
                                class="material-icons-outlined">circle</i>Cancellation Policy</a>
                    </li>
                    <li><a href="{{ route('deletionpolicy.index') }}"><i
                                class="material-icons-outlined">circle</i>Deletion Policy</a>
                    </li>
                    <li><a href="{{ route('returnrefund.index') }}"><i
                                class="material-icons-outlined">circle</i>Return & Refund Policy</a>
                    </li>
                </ul>
            </li>

            <li>
                <a href="javascript:void(0)" class="has-arrow">
                    <div class="parent-icon"><i class="material-icons-outlined">join_right</i>
                    </div>
                    <div class="menu-title">Product Review</div>
                </a>
                <ul>
                    <li><a href="{{ route('product-review.index') }}"><i
                                class="material-icons-outlined">circle</i>All Reviews</a>
                    </li>

                    <li><a href={{ route('product-review.pending') }}><i
                                class="material-icons-outlined">circle</i>Pending Review</a>
                    </li>
                    <li><a href={{ route('product-review.approve-review') }}><i
                                class="material-icons-outlined">circle</i>Approved Review</a>
                    </li>
                    <li><a href={{ route('product-review.cancel-review') }}><i
                                class="material-icons-outlined">circle</i>Cancel Review</a>
                    </li>

                </ul>
            </li>
            <li class="{{ request()->is('admin/product-bulk-edit*') ? 'mm-active' : '' }}">
                <a href="{{ route('product-bulk.edit') }}">
                    <div class="parent-icon"><i class="material-icons-outlined">support</i></div>
                    <div class="menu-title">Product Bulk Edit</div>
                </a>
            </li>
            <li class="{{ request()->is('admin/message*') ? 'mm-active' : '' }}">
                <a href="{{ route('message.index') }}">
                    <div class="parent-icon"><i class="material-icons-outlined">support</i></div>
                    <div class="menu-title">Massage</div>
                </a>
            </li>
            <li>
                <a href="javascript:void(0)" class="has-arrow">
                    <div class="parent-icon"><i class="material-icons-outlined">settings</i>
                    </div>
                    <div class="menu-title">Settings</div>
                </a>
                <ul>
                    <li>
                        <a href="{{ route('coupon.index') }}">
                            <i class="material-icons-outlined">circle</i>Coupon Informations
                        </a>
                    </li>
                    <li>
                        <a href="{{ route('setting.reward.index') }}">
                            <i class="material-icons-outlined">circle</i>Rewards
                        </a>
                    </li>
                    {{-- <li>
                        <a href="{{ route('warehouse.index') }}">
                            <i class="material-icons-outlined">circle</i>WareHouse
                        </a>
                    </li> --}}
                </ul>
                <ul>
                    <li><a href="{{ route('warehouse.index') }}"><i class="material-icons-outlined">circle</i>WareHouse</a>
                    </li>
                </ul>


            </li>


        </ul>
        <!--end navigation-->
    </div>

    <div class="sidebar-bottom gap-4">
        <div class="dark-mode">
            <a href="javascript:void(0)" class="footer-icon dark-mode-icon">
                <i class="material-icons-outlined">dark_mode</i>
            </a>
        </div>
    </div>
</aside>
<!--end sidebar-->
