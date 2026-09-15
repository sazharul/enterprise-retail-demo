import {BsStar, BsStarFill, BsStarHalf} from "react-icons/bs";

function StarRating({rating, totalStars, size, scrollToReviews}) {
    // Calculate the number of full stars, half stars, and empty stars
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = totalStars - fullStars - (hasHalfStar ? 1 : 0);

    // Create an array to store the star components
    const stars = [];

    // Add full stars to the array
    for (let i = 0; i < fullStars; i++) {
        stars.push(<BsStarFill key={`full-${i}`} color="#FFAC0A" size={size}/>);
    }

    // Add a half star if applicable
    if (hasHalfStar) {
        stars.push(<BsStarHalf key="half" color="#FFAC0A" size={size}/>);
    }

    // Add empty stars to complete the total number of stars
    for (let i = 0; i < emptyStars; i++) {
        stars.push(<BsStar key={`empty-${i}`} color="#FFAC0A" size={size}/>);
    }

    return <div className="flex gap-[6px]" onClick={scrollToReviews}>{stars}</div>;
}

export default StarRating;

