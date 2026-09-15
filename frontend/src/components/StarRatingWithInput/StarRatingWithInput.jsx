// import { useState } from "react";
// import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
// import "./StarRatingWithInput.css";

// function StarRatingWithInput({ totalStars, size }) {
//   const [rating, setRating] = useState(0); // State to track the selected rating
//

//   const handleStarClick = (selectedRating) => {
//     setRating(selectedRating === rating ? 0 : selectedRating);
//   };

//   // Create an array to store the star components
//   const stars = [];

//   // Generate star components based on the selected rating
//   for (let i = 1; i <= totalStars; i++) {
//     if (i <= rating) {
//       stars.push(
//         <BsStarFill
//           key={i}
//           color="#FFAC0A"
//           size={size}
//           onClick={() => handleStarClick(i)}
//           style={{ cursor: "pointer" }}
//         />
//       );
//     } else {
//       stars.push(
//         <BsStar
//           key={i}
//           color="#FFAC0A"
//           size={size}
//           onClick={() => handleStarClick(i)}
//           style={{ cursor: "pointer" }}
//         />
//       );
//     }
//   }

//   return <div className="flex gap-[6px]">{stars}</div>;
// }

// export default StarRatingWithInput;

import {useEffect, useState} from "react";
import {BsStar, BsStarFill, BsStarHalf} from "react-icons/bs";

function StarRatingWithInput({totalStars, size, setSelectedStarCount}) {
    const [rating, setRating] = useState(0); // State to track the selected rating
    const [hoverRating, setHoverRating] = useState(0); // State to track hover rating
    // const [selectedStarCount, setSelectedStarCount] = useState(0);
    //

    // const handleStarClick = (selectedRating) => {
    //   const newRating = selectedRating === rating ? 0 : selectedRating;
    //   setRating(newRating);
    //
    // };

    const handleStarClick = (selectedRating, setSelectedStarCount) => {
        const newRating = selectedRating === rating ? 0 : selectedRating;
        setRating(newRating);

        setSelectedStarCount(newRating);
    };

    const handleStarHover = (selectedRating) => {
        setHoverRating(selectedRating);
    };

    const handleStarHoverLeave = () => {
        setHoverRating(0);
    };

    // Create an array to store the star components
    const stars = [];

    // Generate star components based on the selected and hover ratings
    for (let i = 1; i <= totalStars; i++) {
        let starComponent;

        if (i <= (hoverRating || rating)) {
            starComponent = (
                <BsStarFill
                    key={i}
                    color="#FFAC0A"
                    size={size}
                    onClick={() => handleStarClick(i, setSelectedStarCount)}
                    onMouseEnter={() => handleStarHover(i)}
                    onMouseLeave={handleStarHoverLeave}
                    style={{cursor: "pointer"}}
                />
            );
        } else {
            starComponent = (
                <BsStar
                    key={i}
                    color="#FFAC0A"
                    size={size}
                    onClick={() => handleStarClick(i, setSelectedStarCount)}
                    onMouseEnter={() => handleStarHover(i)}
                    onMouseLeave={handleStarHoverLeave}
                    style={{cursor: "pointer"}}
                />
            );
        }

        stars.push(starComponent);
    }

    // return <div  {...register("star_count")} className="flex gap-[6px]">{stars}</div>;
    return <div className="flex gap-[6px]">{stars}</div>;
}

export default StarRatingWithInput;
