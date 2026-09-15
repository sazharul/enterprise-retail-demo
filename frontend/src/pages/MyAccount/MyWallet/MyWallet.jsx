import {Divider} from "antd";
import moment from "moment";
import {IoIosStar} from "react-icons/io";
import {Bars} from "react-loader-spinner";
import {twMerge} from "tailwind-merge";
import rewardBG from "../../../assets/myWallet/rewardBG.jpeg";
import rewardStar from "../../../assets/myWallet/star.png";
import {useGetRewardPointsDataQuery, useGetRewardPointsHistoryQuery} from "../../../redux/features/rewardPoints/rewardPointsApi";
import useAuthUser from "../../../hooks/useAuthUser";

const MyWallet = () => {
    const {data: getRewardPointsHistoryQuery, isLoading: getRewardPointsHistoryLoading} = useGetRewardPointsHistoryQuery()
    const {data: getRewardPointsDataQuery} = useGetRewardPointsDataQuery();
    const {userData} = useAuthUser();

    if (getRewardPointsHistoryLoading) {
        return (
            <div className="flex justify-center items-center min-h-[calc(100vh-55vh)]">
                <Bars height="40" width="80" color="#5DC9F4" ariaLabel="bars-loading" wrapperStyle={{}} wrapperClass="" visible={true}/>
            </div>
        );
    }
    return (
        <>
            <div style={{boxShadow: "0px 0px 8px 0px rgba(228, 237, 240, 0.65)"}} className="rounded-lg bg-white">
                <div className="py-3 ps-3 md:py-5 md:ps-8 border-b-[0.5px] border-[#ECECEC]">
                    <h3 className="text-black text-opacity-80 font-inter text-xl lg:text-2xl font-semibold leading-[33.5px]">My Wallet</h3>
                </div>

                <div className="pt-3 px-3 md:mb-3 md:pt-6 md:px-8">
                    {/* <div>
                        <img className="rounded-lg" src={rewardBG} alt="" />
                    </div> */}

                    {/* -------------- */}
                    <div
                        className={twMerge(
                            ` bg-cover bg-center object-fill bg-no-repeat  lg:h-[150px] xl:h-[180px] 2xl:h-[230px] rounded-xl overflow-hidden w-full mx-auto flex justify-center items-center`
                        )}
                        style={{
                            backgroundImage: `url("${rewardBG}")`,
                        }}
                    >
                        <div className="h-20 lg:h-full flex flex-col items-center justify-evenly">
                            <h5 className="text-white font-Inter text-sm lg:text-2xl font-semibold leading-normal ">Your Redeemable Points</h5>
                            <div className={"h-5 lg:h-[70px] w-5 lg:w-[70px] "}>
                                {/* <ImageURL className={"max-h-full w-full"} image={rewardStar} /> */}
                                <img src={rewardStar} className={"max-h-full w-full"} alt=""/>
                            </div>
                            <h5 className="text-white font-Inter text-xs lg:text-base font-bold leading-normal ">{userData?.data?.reward_points} Points</h5>
                        </div>
                        {/* <ImageURL className={" max-h-[178px] max-w-[160px]"} image={rewardBG} /> */}
                    </div>
                    {/* -------------- */}
                    {/* <Divider style={{ margin: '12px !important' }} /> */}
                    <div className="border-b-[1px] mt-2 mb-1 md:mt-5 md:mb-2"></div>

                    <div className="w-full mb-3 md:mb-6">
                        <p className="mb-2 md:mb-4 text-black font-inter text-sm md:text-base md:text-[18px] font-medium leading-normal">
                            How to Earn GlowCart Reward Points
                        </p>
                        <div className="bg-[#EEFAFF] border-l-[6px] border-[#5DC9F4] rounded-md py-3 ps-5 w-full">
                            <p>
                                <span className=" text-black font-inter text-sm md:text-base font-semibold leading-normal mr-1">
                                    More you buy, the more you earn:
                                </span>
                                <span className="text-black text-opacity-80 font-inter text-sm md:text-base font-medium leading-normal">
                                    Earn <span className="font-bold">{getRewardPointsDataQuery?.data?.reward_point}</span> point for every  <span
                                    className="font-bold">{getRewardPointsDataQuery?.data?.amount}</span> taka purchases.
                                </span>
                                {/* <p className="text-black text-xs font-medium">
                                        The value of <span className="font-bold">{getRewardPointsDataQuery?.data?.reward_point}</span> reward point is{" "}
                                        <span className="font-bold">{getRewardPointsDataQuery?.data?.reward_point_value}</span> BDT.
                                    </p> */}
                            </p>
                        </div>
                        <div className="border-b-[1px] mt-2 mb-1 md:mt-5 md:mb-2"></div>
                    </div>
                    <div className="w-full mb-3 md:mb-6">
                        <p className="mb-2 md:mb-4 text-black font-inter text-sm md:text-base md:text-[18px] font-medium leading-normal">
                            How to Redeem GlowCart Reward Point?
                        </p>
                        <div className="bg-[#EEFAFF] border-l-[6px] border-[#5DC9F4] rounded-md py-3 ps-5 w-full">
                            <p>
                                {/* <span className=" text-black font-inter text-sm md:text-base font-semibold leading-normal mr-1">
                                        More you buy, the more you earn: 
                                    </span>  */}
                                <span className="text-black text-opacity-80 font-inter text-sm md:text-base font-medium leading-normal">
                                    While buying products from GlowCart, you can use your available reward points by applying at checkout.
                                </span>
                            </p>
                        </div>
                        <div className="border-b-[1px] mt-2 mb-1 md:mt-5 md:mb-2"></div>
                    </div>
                    <div>
                        <p className="mb-3 md:mb-6 text-black font-inter text-sm md:text-base md:text-[18px] font-medium leading-normal">
                            Reward Points History
                        </p>
                        <div className="grid md:grid-rows-1 md:grid-cols-2 gap-2 md:gap-6 pb-4 md:pb-8">
                            {getRewardPointsHistoryQuery?.status == true && getRewardPointsHistoryQuery?.data?.data.map((pointData, i) => (
                                <div key={i} className="border border-[#E2E8F0] rounded-lg py-5 px-4">
                                    <div className="flex flex-wrap gap-2 justify-between mb-2 md:mb-5">
                                        <p className="text-black font-inter text-[14px] font-semibold leading-normal">{moment(pointData?.created_at).format('DD MMM, YYYY, hh:mm A')}</p>
                                        <p className="text-black text-opacity-80 text-right font-inter text-base font-medium leading-normal tracking-[-0.16px]">
                                            {pointData?.order?.order_no}
                                        </p>
                                    </div>
                                    <div className="flex justify-between ">
                                        <p className="text-black font-inter text-base font-medium leading-normal tracking-[-0.16px]">
                                            Purchase:{" "}
                                            <span className="whitespace-nowrap text-black font-inter text-base font-semibold leading-normal tracking-[-0.16px]">
                                                ৳ {parseFloat(pointData?.order?.grand_total).toFixed(2)}
                                            </span>
                                        </p>
                                        <div className="flex flex-wrap gap-2">

                                            <p className="flex items-center gap-1 text-red-500 font-inter text-base font-semibold leading-normal">
                                            <span className="border-2 border-red-500 rounded-full p-[2px] ">
                                                <IoIosStar size={12}/>
                                            </span>{" "}
                                                +{pointData?.using_point}
                                            </p>
                                            <p className="flex items-center gap-1 text-[#0094CF] font-inter text-base font-semibold leading-normal">
                                            <span className="border-2 border-[#5DC9F4] rounded-full p-[2px] text-[#5DC9F4]">
                                                <IoIosStar size={12}/>
                                            </span>{" "}
                                                +{pointData?.added_point}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MyWallet;
