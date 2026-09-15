import React, {useState} from "react";
import {FaAngleRight} from "react-icons/fa6";
import {Link} from "react-router-dom";
import Button from "../../../components/ui/Button";
import {useOrderHistoryListQuery} from "../../../redux/features/order/orderApi";
import {Bars} from "react-loader-spinner";
import moment from "moment";
import ImageURL from "../../../components/ImageURL/ImageURL";
import PerOrder from "./PerOrder/PerOrder";

const MyOrders = () => {
    const {data: orderHistoryListQuery, isLoading: orderHistoryListLoading} = useOrderHistoryListQuery();

    // 
    // Assuming response is the JSON object you have
    // const [orderList, setOrderList] = useState([])
    // let orderListOuter = [];

    // orderHistoryListQuery?.data?.orders?.data?.forEach((order) => {
    //     let orderList = [];
    //     if (order?.order_details !== null && order?.order_details?.length > 0) {
    //         order?.order_details?.forEach((element) => {
    //             if (element?.combo_id === null && element?.buy_get_id === null) {
    //                 orderList.push([element]);
    //             } else {
    //                 if (element?.combo_id !== null) {
    //                     if (orderList?.filter((el) => el?.filter((e) => e?.combo_id === element?.combo_id)?.length > 0)?.length === 0) {
    //                         orderList.push(order?.order_details?.filter((el) => el?.combo_id === element?.combo_id));
    //                     }
    //                 } else if (element?.buy_get_id !== null) {
    //                     if (orderList?.filter((el) => el?.filter((e) => e?.buy_get_id === element?.buy_get_id)?.length > 0).length === 0) {
    //                         orderList?.push(order?.order_details?.filter((el) => el?.buy_get_id === element?.buy_get_id));
    //                     }
    //                 }
    //             }
    //         });
    //     }
    //     orderListOuter.push(orderList);
    // });

    // for(let i = 0; i <  orderHistoryListQuery?.data?.orders?.data?.length; i++){
    //   orderHistoryListQuery?.data?.orders?.data?[i].order_details = orderListOuter[i]
    // }

    // 

    return (
        <>
            <div style={{boxShadow: "0px 0px 8px 0px rgba(228, 237, 240, 0.65)"}} className="rounded-lg bg-white">
                <div className="py-3 ps-3 md:py-2 lg:py-5 md:ps-6 lg:ps-8 border-b-[0.5px] border-[#ECECEC]">
                    <h3 className="text-black text-opacity-80 font-inter text-xl lg:text-2xl font-semibold leading-[33.5px]">My Orders</h3>
                </div>
                <div className="py-3 px-1 xs:px-3 md:mb-3 md:py-3 lg:py-6 md:px-6 lg:px-8">
                    {orderHistoryListLoading ? (
                        <div className="flex justify-center items-center min-h-[calc(100vh-70vh)]">
                            <Bars height="40" width="80" color="#5DC9F4" ariaLabel="bars-loading" wrapperStyle={{}} wrapperClass="" visible={true}/>
                        </div>
                    ) : (
                        orderHistoryListQuery?.status == true && (
                            <>
                                {orderHistoryListQuery?.data?.orders?.data?.length > 0 ? (
                                    orderHistoryListQuery?.data?.orders?.data?.map((item, i) => <PerOrder key={i} item={item}/>)
                                ) : (
                                    <div className="text-center text-red-500 text-xl">You haven't ordered anything yet</div>
                                )}
                            </>
                        )
                    )}
                </div>
            </div>
        </>
    );
};

export default MyOrders;
