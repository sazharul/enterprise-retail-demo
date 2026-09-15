import axios from "axios";
import React, {useContext, useState} from "react";
import {FaFacebook} from "react-icons/fa";
import {FcGoogle} from "react-icons/fc";
import {useNavigate} from "react-router-dom";
import Swal from "sweetalert2";
import {AuthContext} from "../../../providers/AuthProvider";
import {addTokenToLocalStorage} from "../../../utilities/tokenHandler";

const SocialLogin = () => {
    const {googleLogin, facebookLogin} = useContext(AuthContext);
    const [isResponseLoading, setIsResponseLoading] = useState(false);
    const [errorFromAPI, setErrorFromAPI] = useState(null);
    const navigate = useNavigate();
    const handleFacebookSignIn = () => {
        facebookLogin()
            .then((result) => {
                // This gives you a Facebook Access Token. You can use it to access the Facebook API.
                // const credential = FacebookAuthProvider.credentialFromResult(result);
                // const accessToken = credential.accessToken;

                const loggedInUser = result.user;

                const saveUser = {
                    name: loggedInUser?.displayName,
                    email: loggedInUser?.email,
                    avatar: loggedInUser?.photoURL,
                    google_id: loggedInUser?.reloadUserInfo?.providerUserInfo[0]?.rawId,
                };

                axios
                    .post("login/google", saveUser)
                    .then((res) => {
                        setIsResponseLoading(false);
                        if (res.data.status === true) {
                            addTokenToLocalStorage(res.data.data.token);
                            Swal.fire({
                                position: "center",
                                icon: "success",
                                title: "Login successful",
                                showConfirmButton: false,
                                timer: 1500,
                            });
                            navigate("/");
                        } else {
                            // Handle other cases if needed
                            setIsResponseLoading(false);
                        }
                    })
                    .catch((error) => {
                        let errorMessageList = error.response.data.data;
                        setIsResponseLoading(false);

                        // Extracting a specific property for rendering
                        const errorMessage = errorMessageList.error || "An error occurred";

                        setErrorFromAPI(errorMessage);
                    });

                // fetch("https://bistro-boss-server-chi-one.vercel.app/users", {
                //   method: "POST",
                //   headers: {
                //     "Content-Type": "application/json",
                //   },
                //   body: JSON.stringify(saveUser),
                // })
                //   .then((res) => res.json())
                //   .then(() => {
                //     //   navigate(from, { replace: true });
                //   });
            })
            .catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
            });
    };
    const handleGoogleSignIn = () => {
        googleLogin()
            .then((result) => {
                const loggedInUser = result.user;
                const saveUser = {
                    name: loggedInUser?.displayName,
                    email: loggedInUser?.email,
                    avatar: loggedInUser?.photoURL,
                    google_id: loggedInUser?.reloadUserInfo?.providerUserInfo[0]?.rawId,
                };

                axios
                    .post("login/google", saveUser)
                    .then((res) => {
                        setIsResponseLoading(false);
                        if (res.data.status === true) {
                            addTokenToLocalStorage(res.data.data.token);
                            Swal.fire({
                                position: "center",
                                icon: "success",
                                title: "Login successful",
                                showConfirmButton: false,
                                timer: 1500,
                            });
                            navigate("/");
                        } else {
                            // Handle other cases if needed
                            setIsResponseLoading(false);
                        }
                    })
                    .catch((error) => {
                        let errorMessageList = error.response.data.data;
                        setIsResponseLoading(false);

                        // Extracting a specific property for rendering
                        const errorMessage = errorMessageList.error || "An error occurred";

                        setErrorFromAPI(errorMessage);
                    });
            })
            .catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
            });
    };
    return (
        <div className="w- flex justify-between items-center mx-auto">
            {/* <FaFacebook
        onClick={handleFacebookSignIn}
        size={24}
        className="text-[#0A8DDD] hover:cursor-pointer"
      /> */}
            <FcGoogle
                className="hover:cursor-pointer"
                onClick={handleGoogleSignIn}
                size={26}
            />
        </div>
    );
};

export default SocialLogin;
