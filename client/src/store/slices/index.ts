import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { Transform, persistReducer } from "redux-persist";
import { encryptTransform } from "redux-persist-transform-encrypt";
import { REDUX_SECRET_KEY } from "../../utils/environments";
import CartProductSlice from "./CartProductSlice";
import LikedProductSlice from "./LikedProductSlice";
import { combineReducers } from "redux";

const encryptor: Transform<unknown, string, any, any>
    = encryptTransform({
        secretKey: REDUX_SECRET_KEY,
        onError: function (error) {
            console.error('encryptTransform', error);
        }
    });

const persistConfig = {
    key: "root",
    storage,
    whitelist: ['likedProduct', 'cartProduct'],

    transforms: [encryptor]
};

const rootReducers: any = combineReducers({
    likedProduct: LikedProductSlice,
    cartProduct: CartProductSlice
});

export default persistReducer(persistConfig, rootReducers);
