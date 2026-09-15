import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import Button from "../../components/ui/Button";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import axios from "axios";

const SslPayment = ({data}) => {
    const handlePayBtnClick = () => {
        // Handle payment button click here
        // You can access customerInfo state variable for the data

        axios
            .post(`pay-via-ajax`, data)
            .then((res) => {
                window.location.replace(res.data.data);
            })
            .catch((error) => {
            });
    };

    return (
        <>
            <Button
                title={"Place Order"}
                type={"submit"}
                onClick={handlePayBtnClick}
                className={"mb-2 py-3 w-full "}
            >
                Place Order With SSL
            </Button>
        </>
    );
};

export default SslPayment;
