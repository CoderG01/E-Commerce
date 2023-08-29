import { AiFillHeart } from "react-icons/Ai";
import { FiHeart } from "react-icons/Fi";
import { BsFillPlusCircleFill } from "react-icons/Bs";
import { BiSolidMinusCircle } from "react-icons/Bi";

import { useDispatch, useSelector } from "react-redux";
import StarRatings from "react-star-ratings";
import { RootState } from "../store";
import { ProductProps } from "../pages/Home";

import {
  addCartProduct,
  removeCartProduct,
  selectCartProduct,
} from "../store/slices/CartProductSlice";

interface productProps {
  data: any;
  isLike?: any;
  handleLikedProducts: any;
  handleRemoveLikedProducts: any;
  isAlreadyIncart: boolean;
}

const Product = ({
  data,
  handleLikedProducts,
  handleRemoveLikedProducts,
  isAlreadyIncart,
}: productProps) => {
  const dispatch = useDispatch();
  const cartProduct = useSelector(selectCartProduct);

  // Check if the product is liked
  const isProductLiked = useSelector((state: RootState) =>
    state.likedProduct.likedProduct.some(
      (product: any) => product.id === data.id
    )
  );

  // ADD CART PRODUCT
  const handleAddCartProduct = (cartProd: ProductProps) => {
    let isCartProduct = cartProduct.some(
      (data: any) => data.id === cartProd.id
    );

    if (!isCartProduct) {
      dispatch(addCartProduct(cartProd));
    }
  };

  // REMOVE CART PRODUCT
  const handleRemoveCartProduct = (cartProd: ProductProps) => {
    let isCartProduct = cartProduct.some(
      (data: any) => data.id === cartProd.id
    );
    if (isCartProduct) {
      dispatch(removeCartProduct(cartProd));
    }
  };

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
        <div className="flex items-center justify-between pb-3">
          <StarRatings
            rating={data?.rating?.rate} // Set the initial rating value
            starRatedColor="orange" // Color of the filled-in stars
            changeRating={(newRating: number) => console.log(newRating)} // Callback when the user changes the rating
            numberOfStars={5} // Total number of stars
            starDimension="20px" // Size of the stars
            starSpacing="2px" // Spacing between stars
            name="rating" // Unique name for the rating input
          />

          <span className="text-gray-400 mr-3 uppercase text-xs">
            {data?.category}
          </span>
        </div>
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
          {/* <div
            className="bg-blue-500 px-2 py-2 rounded-md text-white hover:bg-blue-400 duration-300 cursor-pointer"
            onClick={() => handleAddCartProduct(data)}
          >
            Add to Cart
          </div>
          <div
            className="bg-blue-500 px-2 py-2 rounded-md text-white hover:bg-blue-400 duration-300 cursor-pointer"
            onClick={() => handleRemoveCartProduct(data)}
          >
            remove
          </div> */}
          <div>
            {isProductLiked ? (
              <AiFillHeart
                className="text-xl text-red-600 cursor-pointer duration-400"
                onClick={() => handleRemoveLikedProducts(data)}
              />
            ) : (
              <FiHeart
                className="text-xl duration-400 cursor-pointer"
                onClick={() => handleLikedProducts(data)}
              />
            )}
          </div>
        </div>
      </div>
      {/* </a> */}
    </div>
  );
};

export default Product;
