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

interface likedProduct {
    likedProduct: ProductProps[];
}
const initialState: likedProduct = {
    likedProduct: [],
}

const LikedProductSlice = createSlice({
    name: "likedProduct",
    initialState,
    reducers: {
        addLikedProduct: (state, action) => {
            state.likedProduct.push(action.payload);
        },
        removeLikedProduct: (state, action) => {
            state.likedProduct = state.likedProduct.filter((data: any) => data.id !== action.payload.id)
        }
    }
});

export const { addLikedProduct, removeLikedProduct } = LikedProductSlice.actions;

export default LikedProductSlice.reducer;

export const selectLikedProduct = (state: RootState) => state.likedProduct.likedProduct;

