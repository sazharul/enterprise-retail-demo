import {Link, ScrollRestoration, useLocation, useParams} from "react-router-dom";
import confirmedLogo from "../../assets/orderConfirmed/orderConfirmedLogo.png";
import {IoMdInformationCircleOutline} from "react-icons/io";
import Button from "../../components/ui/Button";

const OrderFailed = () => {
    const params = useParams();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const order_id = searchParams.get("order_id");

    return (
        <div className="flex justify-center items-center my-3 md:my-6 text-black mx-2 md:mx-0">
            <div
                style={{boxShadow: "0px 0px 24px 0px rgba(228, 237, 240, 0.65)"}}
                className="sm:w-8/12 md:w-6/12 lg:w-5/12 bg-white p-4 sm:p-6 md:p-8 rounded-lg "
            >
                <div className="bg-[#EEFAFF] rounded-lg py-12">
                    <div className="flex justify-center items-center">
                        <div className="flex flex-col items-center justify-center md:px-2">
                            {/* <img className="mb-10 w-6/12" src={confirmedLogo} alt="" /> */}
                            <IoMdInformationCircleOutline size={200} className="text-red-500"/>
                            <h3 className="text-3xl font-semibold mb-4 text-center">Order Failed!</h3>
                            <p className="font-semibold text-lg mb-3 text-center">Your order ID is: {order_id}</p>
                            {/* <p className="text-sm font-semibold text-center mb-8 text-[#00000099]">
                                You will receive an order confirmation email <br /> with details of your order.
                            </p> */}
                            <Link className="w-full flex justify-center" to={"/"}>

                                <Button className={` hover:cursor-pointer`}>
                                    Continue Shopping
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <ScrollRestoration/>
        </div>
    );
};

export default OrderFailed;
