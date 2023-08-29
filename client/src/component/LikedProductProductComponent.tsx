import { AiFillHeart } from "react-icons/Ai";
import { BiSolidMinusCircle } from "react-icons/Bi";
import { BsFillPlusCircleFill } from "react-icons/Bs";

const LikedProductProductComponent = ({
  data,
  handleAddCartProduct,
  handleRemoveCartProduct,
  handleRemoveLikedProducts,
  isAlreadyIncart,
}: any) => {
  return (
    <div className="w-72 relative bg-white shadow-md rounded-sm duration-500 hover:scale-105 hover:shadow-xl cart overflow-hidden">
      <div className="absolute bg-[#ff930c] w-16 h-16 flex items-start justify-end rounded-bl-full addCartIcon duration-300">
        {isAlreadyIncart === false ? (
          <div
            className="bg-green-500 px-2 py-2 text-white hover:bg-green-400 cursor-pointer rounded-full duration-300 mt-2 me-2"
            onClick={() => handleAddCartProduct(data)}
          >
            <BsFillPlusCircleFill className="text-xl fill-black-400" />
          </div>
        ) : isAlreadyIncart === true ? (
          <div
            className="bg-green-500 px-2 py-2 text-white hover:bg-green-400 cursor-pointer rounded-full duration-300 mt-2 me-2"
            onClick={() => handleRemoveCartProduct(data)}
          >
            <BiSolidMinusCircle className="text-xl fill-red-600 " />
          </div>
        ) : (
          ""
        )}
      </div>
      <img
        src={data?.image}
        alt="Product"
        className="w-78 h-80 object-cover rounded-t-xl mx-auto"
      />
      <div className="px-4 py-3 w-72">
        <div className="flex items-center justify-between pb-3"></div>
        <p className="text-lg font-bold text-black truncate block capitalize">
          {data?.title}
        </p>
        <p className="truncate text-sm text-gray-700 fw-bold">
          {data?.description}
        </p>
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold text-black cursor-auto my-3">
            {data?.price} ₹
          </p>
          <div>
            <AiFillHeart
              className="text-xl text-red-600 cursor-pointer duration-400"
              onClick={() => handleRemoveLikedProducts(data)}
            />
          </div>
        </div>
      </div>
      {/* </a> */}
    </div>
  );
};

export default LikedProductProductComponent;
