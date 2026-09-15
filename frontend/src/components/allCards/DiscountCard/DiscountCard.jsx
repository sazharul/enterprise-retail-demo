import "./DiscountCard.scss";
import img from "../../../assets/DiscountCard/image.webp";
import ImageURL from "../../ImageURL/ImageURL";

const DiscountCard = () => {
    return (
        <div className="discount-card">
            <div
                className="card-image"
            >
                <ImageURL className={"img object-cover"} image={img}/>
                {/* <img className="img" src={img} alt="" /> */}
            </div>
            <h5>Oil Control Compact</h5>
            <p>Up To 30% off</p>
        </div>
    );
};

export default DiscountCard;
