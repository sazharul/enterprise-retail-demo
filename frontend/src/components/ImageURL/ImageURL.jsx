/* eslint-disable no-undef */
import {twMerge} from "tailwind-merge";
import {useInView} from "react-intersection-observer";
import imageURLErrorImage from "../../assets/imageURLErrorImage/imageURLErrorImage.png";

const ImageURL = ({style, image, className}) => {

    const {ref, inView} = useInView({
        triggerOnce: true,
        delay: 500
    });

    const handleError = (event) => {
        event.target.src = imageURLErrorImage;
    };

    return (
        <>
            {image && (
                <img
                    className={twMerge("", className)}
                    src={`${import.meta.env.VITE_ASSET_URL || "http://localhost:8002"}/${image}`}
                    // src={`${image}`}
                    alt="image"
                    style={style}
                    onError={handleError}
                />
            )}
        </>
    );
};

export default ImageURL;
