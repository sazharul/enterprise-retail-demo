import './IngredientCard.scss'
import backgroundImg from "../../../assets/ingredient-card/background.webp";

const IngredientCard = () => {
    return (
        <div className="ingredient-card">
            <div
                className="card-image  bg-contain bg-center object-cover bg-no-repeat h-[130px] w-[258px] mx-auto flex justify-center items-center"
                style={{backgroundImage: `url("${backgroundImg}")`}}
            >
                <div className="details">
                    <h3>VITAMIN C</h3>
                </div>
            </div>
        </div>
    );
};

export default IngredientCard;