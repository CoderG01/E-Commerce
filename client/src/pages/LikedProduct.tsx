import {
  removeLikedProduct,
  selectLikedProduct,
} from "../store/slices/LikedProductSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  addCartProduct,
  removeCartProduct,
  selectCartProduct,
} from "../store/slices/CartProductSlice";
import { ProductProps } from "./Home";
import LikedProductProductComponent from "../component/LikedProductProductComponent";

const LikedProduct = () => {
  const dispatch = useDispatch();
  const likedProduct = useSelector(selectLikedProduct);
  const cartProduct = useSelector(selectCartProduct);

  // REMOVE LIKED PRODUCT
  const handleRemoveLikedProducts = (data: ProductProps) => {
    let isAlreadyLiked = likedProduct.some(
      (data: ProductProps) => data.id === data.id
    );

    if (isAlreadyLiked) {
      dispatch(removeLikedProduct(data));
    }
  };

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
    <div className="pt-[100px] flex items-center justify-center flex-wrap gap-4">
      {likedProduct.map((products: any) => {
        return (
          <>
            <LikedProductProductComponent
              data={products}
              handleRemoveCartProduct={handleRemoveCartProduct}
              handleRemoveLikedProducts={handleRemoveLikedProducts}
              handleAddCartProduct={handleAddCartProduct}
              isAlreadyIncart={cartProduct?.some(
                (data: any) => data?.id === products?.id
              )}
            />
          </>
        );
      })}
    </div>
  );
};

export default LikedProduct;
