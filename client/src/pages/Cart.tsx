import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useMemo } from "react";
import {
  removeCartProduct,
  selectCartProduct,
  setCartProduct,
  resetState,
} from "../store/slices/CartProductSlice";
import { AiFillMinusSquare, AiFillPlusSquare } from "react-icons/Ai";
import { ProductProps } from "./Home";

import { loadStripe } from '@stripe/stripe-js';
import axios from "axios";
import session from "redux-persist/lib/storage/session";


const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartProduct = useSelector(selectCartProduct);

  const handleRemoveCartProduct = (data: any) => {
    dispatch(removeCartProduct(data));
  };

  const handleIncreaseQuantity = (product: ProductProps) => {
    const updatedCart = cartProduct.map((element: ProductProps) =>
      element.id === product.id
        ? { ...element, quantity: Number(element.quantity) + 1 }
        : element
    );
    dispatch(setCartProduct(updatedCart));
  };

  const handleDecreaseQuantity = (product: ProductProps) => {
    const updatedCart = cartProduct.map((element: ProductProps) =>
      element.id === product.id
        ? { ...element, quantity: Number(element.quantity) - 1 }
        : element
    );
    dispatch(setCartProduct(updatedCart));
  };

  const totalPrice = useMemo(() => {
    let tPrice = 0;

    cartProduct.map((element: ProductProps) => {
      const price = Number(element?.quantity) * element?.price;
      tPrice = tPrice + price;
    });

    return tPrice;
  }, [cartProduct]);


  // PAYMENT INTEGRETION
  const handleCheckout = async () => {
    const stripe = await loadStripe('pk_test_51NkO1nSJXKszfcMqQ2Mkt5KMR1TTEBj1kltRejKSPUIj7FrKbZKDPA1aBa2Nq2iCQtZHls3arR7gVP149dqfxJPT00IYygSRHF');

    const body = {
      products: cartProduct
    };

    const headers = {
      "Content-Type" : "application/json"
    };

    const response = await fetch('http://localhost:1000/api/create-checkout-session',{
      method: "POST",
      headers: headers,
      body: JSON.stringify(body)
    });
   
    const session = await response.json();

    const result: any  = stripe?.redirectToCheckout({
      sessionId: session.id
    });

    if(result.error){
      console.log(result.error);
    };
    dispatch(resetState());

  };

  return (
    <div>
      <div className="container mx-auto pt-[64px]">
        <div className="flex shadow-lg my-10">
          <div className="w-3/4 bg-white px-10 py-4">
            <div className="flex justify-between border-b pb-8">
              <h1 className="font-semibold text-2xl">Shopping Cart</h1>
              <h2 className="font-semibold text-2xl">{cartProduct.length}</h2>
            </div>
            <div className="flex mt-10 mb-5">
              <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">
                Product Details
              </h3>
              <h3 className="font-semibold text-gray-600 text-xs uppercase w-1/5 text-center">
                Quantity
              </h3>
              <h3 className="font-semibold text-gray-600 text-xs uppercase w-1/5 text-center">
                Price
              </h3>
              <h3 className="font-semibold text-gray-600 text-xs uppercase w-1/5 text-center">
                Total
              </h3>
            </div>
            {cartProduct.map((data: any) => {
              return (
                <>
                  <div
                    className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5 cursor-pointer"
                    key={data?.id}
                  >
                    <div className="flex w-2/5">
                      <div className="w-20">
                        <img
                          className="w-full h-full"
                          src={data?.image}
                          alt="product image"
                        />
                      </div>
                      <div className="flex flex-col justify-between ml-4 flex-grow">
                        <span className="font-bold text-sm">{data?.title}</span>
                        <span className="text-gray-500 text-xs">
                          {data?.description.substr(0, 60)}...
                        </span>
                        <div className="mt-2">
                          <button
                            className="font-semibold hover:text-red-500 text-gray-500 text-xs"
                            onClick={() => handleRemoveCartProduct(data)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-center w-1/5">
                      <AiFillMinusSquare
                        className={`text-4xl hover:text-black-400 ${data?.quantity === 0
                          ? "text-gray-500 pointer-events-none"
                          : "text-black"
                          }`}
                        onClick={() => handleDecreaseQuantity(data)}
                      />
                      <p className="select-none	">{data?.quantity}</p>
                      {/* <input
                        className="mx-2 border text-center w-8"
                        type="text"
                        inputMode="numeric"
                        name="productQuantity"
                        value={data?.quantity}
                      /> */}
                      <AiFillPlusSquare
                        className={`text-4xl hover:text-black-400 ${data.quantity === 10
                          ? "text-gray-500 pointer-events-none"
                          : "text-black"
                          }`}
                        onClick={() => handleIncreaseQuantity(data)}
                      />
                    </div>
                    <span className="text-center w-1/5 font-semibold text-sm select-none">
                      ${data?.price}
                    </span>
                    <span className="text-center w-1/5 font-semibold text-sm select-none">
                      $
                      {Math.floor(Number(data?.quantity) * Number(data?.price))}
                    </span>
                  </div>
                </>
              );
            })}
            <div
              className="flex font-semibold text-indigo-600 text-sm mt-10 cursor-pointer"
              onClick={() => navigate("/")}
            >
              <svg
                className="fill-current mr-2 text-indigo-600 w-4"
                viewBox="0 0 448 512"
              >
                <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
              </svg>
              Continue Shopping
            </div>
          </div>
          <div id="summary" className="w-1/4 px-8 py-10">
            <h1 className="font-semibold text-2xl border-b pb-8">
              Order Summary
            </h1>
            <div className="flex justify-between mt-10 mb-5">
              <span className="font-semibold text-sm uppercase">Items 3</span>
              <span className="font-semibold text-sm">590$</span>
            </div>
            <div>
              <label className="font-medium inline-block mb-3 text-sm uppercase">
                Shipping
              </label>
              <select className="block p-2 text-gray-600 w-full text-sm">
                <option>Standard shipping - $10.00</option>
              </select>
            </div>
            <div className="py-10">
              <label
                htmlFor="promo"
                className="font-semibold inline-block mb-3 text-sm uppercase"
              >
                Promo Code
              </label>
              <input
                type="text"
                id="promo"
                placeholder="Enter your code"
                className="p-2 text-sm w-full"
              />
            </div>
            <button className="bg-red-500 hover:bg-red-600 px-5 py-2 text-sm text-white uppercase">
              Apply
            </button>
            <div className="border-t mt-8">
              <div className="flex font-semibold justify-between py-6 text-sm uppercase">
                <span>Total cost</span>
                <span>${Math.floor(totalPrice)}</span>
              </div>
              <button
                onClick={() => {
                  handleCheckout();
                }}
                className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full"
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
