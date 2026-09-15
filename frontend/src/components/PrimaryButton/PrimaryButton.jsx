import "./PrimaryButton.scss";

const PrimaryButton = ({title, icon}) => {
    return (
        <>
            <button className="primary-button"><span>{title}</span> <span>{icon}</span></button>
        </>
    );
};

export default PrimaryButton;
