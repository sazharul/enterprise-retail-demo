import {Divider, Modal, Upload} from "antd";
import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {TbEdit} from "react-icons/tb";
import Button from "../../../components/ui/Button";
import {useNavigate} from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useAuthUser from "../../../hooks/useAuthUser";
import showToast from "../../../utilities/showToast";
import {useUserDataQuery} from "../../../redux/features/auth/authApi";
import {FaStarOfLife} from "react-icons/fa6";
import {PlusOutlined} from "@ant-design/icons";
import ImageURL from "../../../components/ImageURL/ImageURL";
import {MdOutlineFileUpload} from "react-icons/md";

const UpdatePersonalDetails = () => {
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    const {userData} = useAuthUser();
    const [loading, setLoading] = useState(false);
    const [changeAvatar, setChangeAvatar] = useState(false);
    const [errorFromAPI, setErrorFromAPI] = useState(null);
    const [fileList, setFileList] = useState([]);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState("");
    const [previewTitle, setPreviewTitle] = useState("");


    // Function to filter out files with errors and set status to "done"
    const filterFilesWithoutErrors = (files) =>
        files.map(file => ({...file, status: 'done'}));

    // image
    const getBase64 = (file) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
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
    // image
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: {errors},
    } = useForm();

    // const { data: userData, error, isLoading } = useUserDataQuery();

    useEffect(() => {
        if (userData.status === true) {
            setValue("name", userData?.data?.name);
            setValue("email", userData?.data?.email);
            setValue("phone", userData?.data?.phone);
        }
    }, [setValue, userData]);

    const storedAvatar = userData?.data?.avatar;

    const onSubmit = (data) => {
        setLoading(true);
        const formData = new FormData();
        const avatar = fileList?.[0]?.originFileObj;

        formData.append("name", data.name);
        formData.append("phone", data.phone);
        formData.append("email", data.email);
        // ...(avatar == undefined || formData.append("avatar", avatar)),
        if (avatar !== undefined) {
            formData.append("avatar", avatar);
        }
        // formData.append("avatar", avatar);
        axiosSecure
            .post("edit", formData)
            .then((res) => {
                if (res.data.status === true) {
                    // addToLocalStorage(res.data.data.token);
                    showToast(res?.data?.message, "success");
                    navigate("/my-account/my-profile");
                    setLoading(false);
                } else {
                    if (res?.data?.data?.email) {
                        showToast(res?.data?.data?.email, "error");
                    } else if (res?.data?.data?.phone) {
                        showToast(res?.data?.data?.phone, "error");
                    }
                    // Handle other cases if needed
                }
            })
            .catch((error) => {
                let errorMessageList = error.response.data.message;

                setErrorFromAPI(errorMessageList);
                setLoading(false);
                //console.error('Error during registration:', error);
                // Handle errors from the API call
            });
    };

    return (
        <>
            <div style={{boxShadow: "0px 0px 8px 0px rgba(228, 237, 240, 0.65)"}} className="rounded-lg bg-white">
                <div className="py-3 ps-3 md:py-5 md:ps-8 border-b-[0.5px] border-[#ECECEC]">
                    <h3 className="text-black text-opacity-80 font-inter text-xl lg:text-2xl font-semibold leading-[33.5px]">My Profile</h3>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="pt-3 px-3 md:mb-3 md:pt-6 md:px-8">
                    <p className="text-black font-Inter text-lg font-medium leading-normal mb-5">Edit Personal Details</p>

                    {/* ------------ */}
                    {storedAvatar == null && (
                        <div className="relative w-min mx-aut">
                            <Upload listType="picture-card" fileList={filterFilesWithoutErrors(fileList)} onPreview={handlePreview} onChange={handleChange}>
                                {fileList.length >= 1 ? null : uploadButton}
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
                        </div>
                    )}
                    {changeAvatar ? (
                        <div className="relative w-min mx-aut mb-5">
                            <Upload listType="picture-card" fileList={filterFilesWithoutErrors(fileList)} onPreview={handlePreview} onChange={handleChange}>
                                {fileList.length >= 1 ? null : uploadButton}
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
                            <span onClick={() => setChangeAvatar(!changeAvatar)} className="absolute left-0 -bottom-2 z-2 text-xs hover:cursor-pointer hover:font-bold">
                                Cancel
                                {/* <MdOutlineFileUpload size={25} className="" /> */}
                            </span>
                        </div>
                    ) : (
                        <>
                            {storedAvatar !== null && (
                                <div className="mb-3">
                                    {storedAvatar?.includes("https://") ? <img className="h-24 w-24 rounded" src={storedAvatar} alt=""/> :
                                        <ImageURL className="h-24 w-24 rounded" image={storedAvatar}/>}

                                    {/* <span onClick={() => setChangeAvatar(!changeAvatar)} className="z-10 absolute top-0 text-xs hover:cursor-pointer hover:font-bold w-full h-full text-white flex justify-center items-center">
                      <MdOutlineFileUpload size={25} className="text-red-500" />
                    </span> */}
                                    <span onClick={() => setChangeAvatar(!changeAvatar)} className="text-xs hover:cursor-pointer hover:font-bold">
                                        Update Avatar
                                        {/* <MdOutlineFileUpload size={25} className="" /> */}
                                    </span>
                                </div>
                            )}
                        </>
                    )}

                    {/* ------------ */}
                    <div className="md:w-10/12 lg:w-8/12">
                        <div className="mb-[11px] ">
                            <label>
                                <span className="flex text-sm font-medium mb-1">
                                    Full Name
                                    {/* <FaStarOfLife size={6} className="text-[#F40F6F]" /> */}
                                </span>
                            </label>
                            <span className="relative">
                                <input
                                    {...register("name", {
                                        required: true,
                                        //    minLength: 8, // Minimum password length of 8 characters
                                    })}
                                    type="text"
                                    placeholder="Enter your full name"
                                    className="p-2 w-full rounded-sm bg-white border-[0.5px] border-[#bfbfbf] text-black text-[14px] font-normal leading-normal tracking-[-0.14px]"
                                />
                                {/* <span className="absolute right-2 top-[3px]">
                                        <IoEyeSharp size={16} className="text-[#807D7E]" />
                                    </span> */}
                            </span>
                            {errors.fullName && errors.fullName.type === "minLength" && <p className="text-red-500">Field must be at least 8 characters long</p>}
                            {errors.fullName && errors.fullName.type === "required" && <span className="text-red-600">This field is required</span>}
                        </div>
                        <div className="mb-[11px]">
                            <label>
                                <span className="flex text-sm font-medium mb-1">
                                    Email Address
                                    {/* <FaStarOfLife size={6} className="text-[#F40F6F]" /> */}
                                </span>
                            </label>
                            <input
                                {...register("email", {
                                    required: true,
                                    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Regular expression for basic email format validation
                                })}
                                // onChange={() => setErrorFromAPI(null)}
                                type="email"
                                placeholder="Enter your email"
                                className="p-2 w-full rounded-sm bg-white border-[0.5px] border-[#bfbfbf] text-black  text-[14px] font-normal leading-normal  tracking-[-0.14px]"
                            />
                            {errors.email && errors.email.type === "pattern" && <p className="text-red-500">Please enter a valid email address</p>}
                            {errors.email && errors.email.type === "required" && <span className="text-red-600">This field is required</span>}
                            {/* {errorFromAPI?.email && (
                  <p className="text-red-500">
                   {errorFromAPI?.email} || The email has already been taken
                  </p>
                )} */}
                        </div>

                        <div className="mb-5">
                            <label>
                                <span className="flex text-sm font-medium mb-1">
                                    Phone
                                    <FaStarOfLife size={6} className="text-[#F40F6F]"/>
                                </span>
                            </label>
                            <input
                                {...register("phone", {
                                    required: true,
                                    pattern: /^0\d{10}$/, // Regular expression for 11 digits starting with 0
                                })}
                                // onChange={() => setIsPhoneErrorFromApi("")}
                                type="number" // Change type to text to allow leading zeros
                                placeholder="Enter your phone number"
                                className="p-2 w-full rounded-sm text-[14px] bg-white border-[0.5px] border-[#bfbfbf]"
                            />
                            {/* {isPhoneErrorFromApi && <p className="text-red-500">{isPhoneErrorFromApi}</p>} */}
                            {errors.phone && errors.phone.type === "pattern" && <p className="text-red-500">Phone number must start with 0 and be 11 digits</p>}
                            {errors.phone && errors.phone.type === "required" && <span className="text-red-600">This field is required</span>}
                        </div>
                    </div>
                    <Button className="border mb-10 px-16">Save</Button>
                </form>
            </div>
        </>
    );
};

export default UpdatePersonalDetails;
