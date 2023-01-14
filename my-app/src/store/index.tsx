import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { productReducer } from "../components/home/productReducer";

//Редюсер, який обєднує усі редюсери
export const rootReducer = combineReducers({
    product: productReducer
});

export const store = createStore(rootReducer,
    composeWithDevTools(applyMiddleware(thunk)));