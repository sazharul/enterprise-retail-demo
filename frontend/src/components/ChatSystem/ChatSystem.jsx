import React, {useState} from "react";
import {GrChatOption} from "react-icons/gr";
import {IoClose} from "react-icons/io5";
import Button from "../ui/Button";
import ChatBox from "./ChatBox";
import "./chat.css";
// Create a separate component for the chat box

const ChatSystem = () => {
    const [isChatOpen, setIsChatOpen] = useState(false);
    return (
        <div>
            {isChatOpen && <ChatBox setIsChatOpen={setIsChatOpen}/>}
            <Button className="floating-button bg-primary-color p-3 right-1 md:right-5 bottom-3 md:bottom-20" onClick={() => setIsChatOpen(!isChatOpen)}>
                {
                    isChatOpen ? <IoClose size={25}/> : <GrChatOption size={25}/>
                }
            </Button>
            {/* <FloatButton.Group
                onClick={() => setIsChatOpen(!isChatOpen)}
                open={isChatOpen}
                className=""
                trigger="click"
                type="primary"
                style={{ right: 15 }}
                icon={<CommentOutlined size={40} />}
            ></FloatButton.Group> */}
        </div>
    );
};

export default ChatSystem;
