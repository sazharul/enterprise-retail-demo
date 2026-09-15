import "./SaveCard.scss";
import backgroundImg from "../../../assets/save-card/background.webp";

const SaveCard = () => {
    return (
        <div className="save-card">
            <div
                className="card-image  bg-contain bg-center object-cover bg-no-repeat h-[282px] w-[235px] mx-auto flex justify-center items-center"
                style={{backgroundImage: `url("${backgroundImg}")`}}
            >
                <div className="details">
                    <h3>UNDER</h3>
                    <h3 className="price">$399</h3>
                    <h4>COMPACT</h4>
                </div>
            </div>
        </div>
    );
};

export default SaveCard;
