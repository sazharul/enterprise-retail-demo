import "./CategoryCard.scss";
import backgroundImg from "../../../assets/category-card/card-background.webp";
import img from "../../../assets/category-card/product-image.webp";
import ImageURL from "../../ImageURL/ImageURL";

const CategoryCard = () => {
    return (
        <div className="category-card">
            <div className="card-image" style={{backgroundImage: `url("${backgroundImg}")`}}>
                <ImageURL className={"img object-cover"} image={img}/>
                {/* <img src={img} alt="" /> */}
            </div>
            <p>Lips</p>
        </div>
    );
};

export default CategoryCard;
