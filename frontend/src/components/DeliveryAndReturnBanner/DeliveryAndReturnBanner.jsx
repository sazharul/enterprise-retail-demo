import "./DeliveryAndReturnBanner.scss";
import {LiaTruckMovingSolid} from "react-icons/lia";
import {TfiReload} from "react-icons/tfi";
import securePayment from "../../assets/DeliveryAndReturnBanner/secure-payment.svg"
import magicIcon from "../../assets/DeliveryAndReturnBanner/DeliveryAndReturnBanner.svg"
import chat from "../../assets/DeliveryAndReturnBanner/chat.svg"

const DeliveryAndReturnBanner = () => {
    return (
        <div className="delivery-return">
            <div className="per-section">
                <div>
                    <LiaTruckMovingSolid className="icon"/>
                </div>
                <div>
                    <h5>5 days delivery</h5>
                    <p>Within Bangladesh we delivered within 5 days</p>
                </div>
            </div>
            <div className="per-section">
                <div>
                    <TfiReload className="icon"/>
                </div>
                <div>
                    <h5>7 Days Easy Return</h5>
                    <p>Easy return available in 7 days</p>
                </div>
            </div>
            <div className="per-section">
                <div>
                    <img src={securePayment} className="icon" alt=""/>
                </div>
                <div>
                    <h5>Secure Payment Method</h5>
                    <p>100% secure online payment method</p>
                </div>
            </div>
            <div className="per-section">
                <div>
                    <img src={magicIcon} className="icon" alt=""/>
                </div>
                <div>
                    <h5>Magic Offers</h5>
                    <p>We Offers discount all years around</p>
                </div>
            </div>
            <div className="per-section">
                <div>
                    <img src={chat} className="icon" alt=""/>
                </div>
                <div>
                    <h5>24/7 Support</h5>
                    <p>Dedicated support team</p>
                </div>
            </div>
        </div>
    );
};

export default DeliveryAndReturnBanner;
