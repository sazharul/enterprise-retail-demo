import React from 'react';
import {BsFacebook, BsLink45Deg, BsLinkedin, BsWhatsapp} from 'react-icons/bs';

const ShareSocial = ({socialTypes}) => {
    const currentUrl = window.location.href;
// 
    const copyLink = () => {
        navigator.clipboard.writeText(currentUrl).then(() => {
            alert('Link copied to clipboard!');
        }).catch((error) => {
            console.error('Failed to copy:', error);
        });
    };

    const shareOnFacebook = () => {
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`, '_blank');
    };

    const shareOnLinkedin = () => {
        window.open(`https://www.linkedin.com/shareArticle?url=${encodeURIComponent(currentUrl)}`, '_blank');
    };
    // share on whatsapp
    const shareOnWhatsapp = () => {
        const phoneNumber = '8801775423477';
        window.open(`https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(currentUrl)}`, '_blank');
    };

    return (
        <div className=" mx-1 px-2 py-3 0">
            <div className="flex items-center gap-6">
                <span className="whitespace-nowrap me-1 text-[10px] font-medium">Share via:</span>
                <span className="whitespace-nowrap hover:cursor-pointer h-min flex flex-col justify-center" onClick={copyLink}>
        <BsLink45Deg className="mx-auto"/>
        <span className="text-[8px] font-medium">Copy Link</span>
      </span>
                <span onClick={shareOnFacebook}>
        <BsFacebook className="text-[#1255D9] h-5 w-5 sm:h-7 sm:w-7 hover:cursor-pointer"/>
      </span>
                <span onClick={shareOnWhatsapp}>
        <BsWhatsapp className="text-[#3051C4] h-5 w-5 sm:h-7 sm:w-7 hover:cursor-pointer"/>
      </span>
            </div>
        </div>
    );
};

export default ShareSocial;
