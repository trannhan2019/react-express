import React, { memo, useState } from "react";
import { formatMoney, renderStarFromNumber } from "../../ultils/helpers";
import label from "../../assets/new.png";
import trending from "../../assets/trending.png";
import SelectOption from "../../components/search/SelectOption";
import icons from "../../ultils/icons";
import { Link } from "react-router-dom";

const { AiFillEye, AiOutlineMenu, BsFillSuitHeartFill } = icons;

const Product = ({ productData, isNew, normal }) => {
  const [isShowOption, setIsShowOption] = useState(false);
  // chi-tiet-san-pham/pid/title/asdasds

  return (
    <div className="w-full text-base px-[10px]">
      <Link
        className="w-full border p-[15px] flex flex-col items-center"
        to={`/${productData?.category?.toLowerCase()}/${productData?._id}/${
          productData?.title
        }`}
        onMouseEnter={(e) => {
          e.stopPropagation();
          setIsShowOption(true);
        }}
        onMouseLeave={(e) => {
          e.stopPropagation();
          setIsShowOption(false);
        }}
      >
        <div className="w-full relative">
          {isShowOption && (
            <div className="absolute bottom-[-10px] left-0 right-0 flex justify-center gap-2 animate-slide-top">
              <SelectOption icon={<AiFillEye />} />
              <SelectOption icon={<AiOutlineMenu />} />
              <SelectOption icon={<BsFillSuitHeartFill />} />
            </div>
          )}
          <img
            src={
              productData?.thumb ||
              "https://apollobattery.com.au/wp-content/uploads/2022/08/default-product-image.png"
            }
            alt=""
            className="w-[274px] h-[274px]  object-cover"
          />
          {!normal && (
            <img
              src={isNew ? label : trending}
              alt=""
              className={`absolute w-[100px] h-[35px] top-0 right-[0] object-cover`}
            />
          )}
        </div>
        <div className="flex flex-col mt-[15px] items-start gap-1 w-full">
          <span className="flex h-4">
            {renderStarFromNumber(productData?.totalRatings)?.map(
              (el, index) => (
                <span key={index}>{el}</span>
              )
            )}
          </span>
          <span className="line-clamp-1">{productData?.title}</span>
          <span>{`${formatMoney(productData?.price)} VNĐ`}</span>
        </div>
      </Link>
    </div>
  );
};

export default memo(Product);
