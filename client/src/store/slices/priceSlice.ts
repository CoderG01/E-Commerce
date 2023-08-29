import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PriceState {
    [productId: string]: number;
}

const initialState: PriceState = {};

const priceSlice = createSlice({
    name: 'price',
    initialState,
    reducers: {
        setPrice: (state, action: PayloadAction<{ productId: string; price: number }>) => {
            const { productId, price } = action.payload;
            state[productId] = price;
        },
    },
});

export const { setPrice } = priceSlice.actions;
export default priceSlice.reducer;

export const selectPrice = (state: any) => state.price
