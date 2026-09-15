import React, {useEffect, useRef, useState} from "react";
import {useForm} from "react-hook-form";
import {BsFillSendFill} from "react-icons/bs";
import {GrGallery} from "react-icons/gr";
import {IoClose} from "react-icons/io5";
import logo from "../../assets/logo/logo.png";
import person from "../../assets/chat/person image.png";
import useAuthUser from "../../hooks/useAuthUser";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import ImageURL from "../ImageURL/ImageURL";
import "./chat.css";
import {socket} from "./socket";

const ChatBox = ({setIsChatOpen}) => {
    const {userData} = useAuthUser();
    // Start chat message
    const axiosSecure = useAxiosSecure();
    const [messageList, setMessageList] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    const getAllMessageList = () => {
        axiosSecure
            .get(`get-message?perPage=${pageNumber * 10}`)
            .then((res) => {
                if (res.data.status === true) {
                    if (res?.data.data.message_details.data.length > 0) {
                        //const sortedData = res.data.data.message_details.data.sort((a, b) => a.id - b.id);
                        setMessageList(res.data.data.message_details.data.reverse());
                    }
                }
            })
            .catch((error) => {
            });
    };

    useEffect(() => {
        getAllMessageList();
    }, [pageNumber]);

    // socket message listen
    useEffect(() => {
        const handleChatMessage = (data) => {
            if ((data.receiver_id == 0 && data.sender_id == userData.data.id) || (data.receiver_id == userData.data.id && data.sender_id == 0)) {
                setMessageList((messageList) => [...messageList, data]);
            }
        };
        socket.on("chat message", handleChatMessage);
        return () => {
            socket.off("chat message", handleChatMessage);
        };
    }, []);

    // End chat message

    const [messages, setMessages] = useState([]); // Use state to manage messages
    const chatContainerRef = useRef(null);
    const sendMessage = (message) => {
        //setMessages([...messages, {text: message, sender: "user"}]);
        // Handle sending the message to the server or any other logic
    };

    useEffect(() => {
        // Scroll to the bottom of the chat when messages change
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

    const {
        register,
        handleSubmit,
        reset,
        formState: {errors},
    } = useForm();

    // const handleScroll = () => {
    //
    //     const element = document.getElementById("bottom");
    //     if (element) {
    //         element.scrollIntoView({ behavior: "smooth" });
    //     }
    // };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            const objectUrl = URL.createObjectURL(file);
            setImageUrl(objectUrl);
        }
    };
    // send message
    const onSubmit = (data) => {
        const formData = new FormData();
        selectedFile !== null && formData.append("image", selectedFile);
        //    formData.append("image", selectedFile);
        formData.append("message", data.message);

        axiosSecure
            .post(`send-message`, formData)
            .then((res) => {
                setImageUrl(null);
                setSelectedFile(null);
                if ((res.data.data.receiver_id == 0 && res.data.data.sender_id == userData.data.id) || (res.data.data.receiver_id == userData.data.id && res.data.data.sender_id == 0)) {
                    socket.emit("chat message", res.data.data);
                }
            })
            .catch((error) => {
            });

        reset();
    };
    // const handleMouseWheel = (e) => {
    //     // Check if the mouse wheel event occurred within the chat container
    //     if (chatContainerRef.current) {
    //         // Calculate the new scrollTop value based on the wheel delta
    //         chatContainerRef.current.scrollTop += e.deltaY;
    //     }
    // };

    // ...

    useEffect(() => {
        // Scroll to the bottom of the chat when messages change
        if (chatContainerRef.current) {
            // Check if the user has manually scrolled up
            const isScrolledToBottom = chatContainerRef.current.scrollHeight - chatContainerRef.current.scrollTop === chatContainerRef.current.clientHeight;

            // Update the state messages
            setMessages(messageList);

            // Scroll to the bottom only if the user was already at the bottom before the update
            if (isScrolledToBottom) {
                chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
            }
        }
    }, [messageList]);

    return (
        <div
            className="chat-box bottom-[70px] md:bottom-[135px] right-[0px] md:right-[20px] w-full max-w-[400px]"
        >
            <div className="messages">
                <div className="w-full flex justify-between border-b-2 pb-1">
                    <p className="text-lg">Chat with us</p>
                    <IoClose className="hover:cursor-pointer" onClick={() => setIsChatOpen(false)} size={24}/>
                </div>

                <div ref={chatContainerRef} className="w-full flex-col pt-3 px-1 max-h-64 md:max-h-96 overflow-hidden overflow-y-auto slim-scroll-for-chatting">
                    <p onClick={() => setPageNumber(pageNumber + 1)} className="text-center text-primary-color mb-3 hover:cursor-pointer"> Load more</p>
                    {messageList?.map((data, index) => (
                        <React.Fragment key={index}>
                            {data.receiver_id == 0 ? (
                                <>
                                    {/* <p >{moment(data?.created_at).format(" DD")}</p> */}
                                    <div className="flex flex-row-reverse">
                                        <ImageURL image={data?.image} className="flex flex-row-reverse max-h-40 max-w-40 me-14 mb-1 shadow"/>
                                    </div>
                                    <div className="flex flex-row-reverse items-start gap-3 mb-4">
                                        <div className="w-10 h-10 border-2 rounded-full ">
                                            <img src={person} className="w-full h-full object-scale-down"/>
                                        </div>
                                        <div style={{borderRadius: "26px 6px 26px 26px"}} className="bg-primary-color w-8/12 px-4 py-[10px]">
                                            <p>{data.message}</p>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div className="flex items-start gap-3 mb-4">
                                    <div className="w-10 h-10 border-2 rounded-full ">
                                        <img src={logo} className="w-full h-full object-scale-down"/>
                                    </div>
                                    <div className="bg-[#8EE6E11C] w-8/12 px-4 py-[10px] rounded-3xl">
                                        <p>{data.message}</p>
                                    </div>
                                </div>
                            )}
                        </React.Fragment>
                    ))}
                </div>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="flex gap-4 items-center pt-2 border-t-2">
                <input
                    type="text"
                    {...register("message")}
                    placeholder="Type your message..."
                    className="w-full border-primary-color rounded-md p-2 transition-all "
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            //sendMessage(e.target.value);
                            e.target.value = ""; // Clear the input field after sending the message
                        }
                    }}
                />
                {imageUrl && <img className={"h-10 w-10 border"} src={imageUrl}/>}
                <label htmlFor="image" className="file-input-label">
                    <input
                        // {...register("image", { required: true })}
                        type="file"
                        id="image"
                        name="image"
                        accept="image/*"
                        className="hidden" // Hide the default input
                        onChange={handleFileChange}

                    />
                    <div className="file-input-icon hover:cursor-pointer">
                        <GrGallery/>
                    </div>
                </label>
                <button type="submit">
                    <BsFillSendFill size={25} className=" text-primary-color"/>
                </button>
            </form>
        </div>
    );
};

export default ChatBox;
