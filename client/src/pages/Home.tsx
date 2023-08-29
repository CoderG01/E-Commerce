// REACT
import { useEffect, useState } from "react";
// THIRD PARTY LIBRARY
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ClockLoader } from "react-spinners";
// COMPONENT
import Product from "../component/Product";
import { useDispatch, useSelector } from "react-redux";
import {
  addLikedProduct,
  removeLikedProduct,
  selectLikedProduct,
} from "../store/slices/LikedProductSlice";
import { selectCartProduct } from "../store/slices/CartProductSlice";

export interface ProductProps {
  id: string;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
  quantity?: number;
}

const Home = () => {
  // REDUX
  const dispatch = useDispatch();
  const likedProduct = useSelector(selectLikedProduct);
  const cartProducts = useSelector(selectCartProduct);

  // STATE
  const [products, setProducts] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<any>(false);

  // GETTING PRODUCT
  const getProducts = async () => {
    setIsLoading(true);
    try {
      await axios
        .get("https://fakestoreapi.com/products")
        .then((result: any) => {
          let data: any = result?.data;
          setProducts(data);
        });
      setIsLoading(false);
    } catch (error: any) {
      toast(error);
    }
  };

  // ADD LIKED PRODUCT
  const handleAddLikedProd = (lProd: ProductProps) => {
    let isLikedProduct = likedProduct.some(
      (product: any) => product.id === lProd.id
    );
    !isLikedProduct && dispatch(addLikedProduct(lProd));
  };

  // REMOVE LIKED PRODECT
  const handleRemoveLikedProducts = (iProd: ProductProps) => {
    dispatch(removeLikedProduct(iProd));
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      {isLoading ? (
        <>
          <div className="w-full h-screen bg-gray-200 flex items-center justify-center z-50">
            <ClockLoader color="#74777c" />
          </div>
        </>
      ) : (
        <div className="bg-gray-200 mt-[80px]">
          <div className="flex items-center justify-center gap-8 flex-wrap py-6 max-w-[100%] lg:max-w-[85%] mx-auto">
            <ToastContainer position="top-center" />
            {products?.map((product: any) => {
              return (
                <>
                  <Product
                    key={product.id}
                    data={product}
                    handleLikedProducts={handleAddLikedProd}
                    handleRemoveLikedProducts={handleRemoveLikedProducts}
                    isAlreadyIncart={cartProducts?.some(
                      (data: any) => data?.id === product?.id
                    )}
                  />
                </>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
