import React, {useEffect, useState} from "react";
import StarRatingWithInput from "../../../components/StarRatingWithInput/StarRatingWithInput";
import Button from "../../../components/ui/Button";
import cn from "../../../utils/cn";
import {useForm} from "react-hook-form";
import {FaFileAlt, FaTrashAlt} from "react-icons/fa";
import {useSubmitProductReviewMutation} from "../../../redux/features/review/reviewApi";

import ImgCrop from "antd-img-crop";
import "./CreateReview.scss";

import {PlusOutlined} from "@ant-design/icons";
import {Modal, Rate, Upload} from "antd";
import {useParams} from "react-router-dom";
import showToast from "../../../utilities/showToast";

const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
// Function to filter out files with errors and set status to "done"
const filterFilesWithoutErrors = (files) =>
    files.map(file => ({...file, status: 'done'}));


const CreateReview = ({cancel, className, myReview, order_id}) => {
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState("");
    const [previewTitle, setPreviewTitle] = useState("");
    const [fileList, setFileList] = useState([]);
    const [starValue, setStarValue] = useState(0);
    // const [starCount, setStarCount] = useState(0);
    const [submitReview, {data: reviewData}] = useSubmitProductReviewMutation();
    const {id} = useParams();

    const {
        register,
        handleSubmit,
        setValue,
        formState: {errors},
    } = useForm();

    useEffect(() => {
        setStarValue(myReview?.star);
        setValue("title", myReview?.title || "");
        setValue("comment", myReview?.comment || "");
    }, [myReview]);

    const onSubmit = async (data) => {
        //

        if (starValue < 1 || starValue == undefined) {
            showToast("Please enter a valid rating", "error");
        } else {
            const imageArr = fileList?.map((img) => img?.[0]?.originFileObj);

            const formData = new FormData();
            formData.append("product_id", id);
            formData.append("order_id", order_id);
            formData.append("title", data?.title);
            formData.append("comment", data?.comment);
            formData.append("star", starValue);
            // formData.append("images[]", fileList?.[0]?.originFileObj);
            // formData.append("images[]", fileList?.[1]?.originFileObj);
            // Loop through fileList and append each file to the formData
            fileList.forEach((file) => {
                formData.append("images[]", file?.originFileObj);
            });

            // const review = {
            //     ...data,
            //     product_id: id,
            //     order_id: orderId,
            //     star: starCount,
            //     formData
            // };
            try {
                const result = await submitReview(formData);
                if (result?.data?.status) {
                    showToast("Review Successfully Submitted!");
                    cancel((prev) => !prev);
                }
            } catch (error) {
            }
        }
    };

    const handleCancel = () => setPreviewOpen(false);
    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf("/") + 1));
    };
    const handleChange = ({fileList: newFileList}) => {
        setFileList(newFileList);
    };
    const uploadButton = (
        <button
            style={{
                border: 0,
                background: "none",
            }}
            type="button"
        >
            <div className="text-[#5DC9F4] md:text-4xl">
                <PlusOutlined/>
            </div>
        </button>
    );

    return (
        <div className={cn("rounded-md bg-[#EEFAFF] p-2 md:p-3 lg:w-7/12", className)}>
            <form onSubmit={handleSubmit(onSubmit)} className="rounded-md bg-white p-2 md:p-6">
                <h2 className="text-black font-inter text-lg font-semibold leading-normal border-b-[1px] pb-2 mb-3">Create Review</h2>
                <p className="text-sm font-medium mb-2">Your Rating</p>
                <div className="flex gap-3 mb-5">
                    {/* <StarRatingWithInput size={35} totalStars={5} setSelectedStarCount={setStarCount} /> */}
                    <Rate className="text-3xl" onChange={setStarValue} value={starValue}/>
                    {/* <p className="text-base font-medium">{value}</p> */}
                </div>
                <p className="text-sm font-medium mb-2">Add a Headline</p>
                <div className="mb-5">
                    <input
                        type="text"
                        {...register("title", {required: true})}
                        className="p-2 w-full rounded-sm bg-white border-[0.5px] border-[#bfbfbf] text-black text-opacity-50 text-[14px] font-normal leading-normal  tracking-[-0.14px] "
                        placeholder="Enter your review headline"
                    />
                    {errors.title && errors.title.type === "required" && <span className="text-red-600 text-sm">This field is required</span>}
                </div>
                <p className="text-sm font-medium mb-2">Add A Written Review</p>
                <textarea
                    {...register("comment")}
                    rows="4"
                    className="p-2 w-full rounded-sm bg-white border-[0.5px] border-[#bfbfbf] text-black text-opacity-50 text-[14px] font-normal leading-normal  tracking-[-0.14px] mb-5"
                    placeholder="Enter your written review"
                />
                <p className="text-sm font-medium mb-2">Add Photo</p>
                <div className="flex items-center gap-4 mb-5">
                    {/* <div className="flex justify-center items-center px-2 py-1 xs:px-4 xs:py-2 rounded border border-dashed text-[#5DC9F4] bg-[#F8F8F8] md:text-4xl hover:cursor-pointer">
                        +
                    </div> */}
                    <>
                        <Upload listType="picture-card" fileList={filterFilesWithoutErrors(fileList)} onPreview={handlePreview} onChange={handleChange}>
                            {fileList.length >= 5 ? null : uploadButton}
                        </Upload>
                        <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                            <img
                                alt="example"
                                style={{
                                    width: "100%",
                                }}
                                src={previewImage}
                            />
                        </Modal>
                    </>
                </div>
                <div className="flex items-center justify-end gap-5">
                    <Button onClick={() => cancel((prev) => !prev)} variant="ghost" className="text-[#5DC9F4]">
                        Cancel
                    </Button>
                    <Button type="submit">Submit</Button>
                </div>
            </form>
        </div>
    );
};

export default CreateReview;
