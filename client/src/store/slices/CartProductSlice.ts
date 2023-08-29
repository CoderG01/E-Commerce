import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../index";

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

interface cartProduct {
    cartProduct: ProductProps[];
}
const initialState: cartProduct = {
    cartProduct: [],
}

const CartProductSlice = createSlice({
    name: "cartProduct",
    initialState,
    reducers: {
        resetState: () => {
            return initialState
        },
        addCartProduct: (state, action) => {
            state.cartProduct.push({
                ...action.payload,
                quantity: 1
            })
        },
        setCartProduct: (state, action) => {
            state.cartProduct = action.payload;
        },
        removeCartProduct: (state, action) => {
            state.cartProduct = state.cartProduct.filter((data: any) => data.id !== action.payload.id)
        },
    }
});

export const { addCartProduct, removeCartProduct, setCartProduct, resetState } = CartProductSlice.actions;

export default CartProductSlice.reducer;

export const selectCartProduct = (state: RootState) => state.cartProduct.cartProduct;

