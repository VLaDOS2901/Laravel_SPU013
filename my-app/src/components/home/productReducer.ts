import { IProductState, ProdutActions, ProductActionTypes } from './types';
const initialState : IProductState = {
    list: [
        //{ id: 2, name: "вів", detail: "Опис" }
    ],
    count_page: 0,
    current_page: 0,
    total: 0
};

export const productReducer = (state = initialState, action: ProdutActions) : IProductState => {
    switch(action.type)
    {
        case ProductActionTypes.GET_PRODUCTS: {
            return {
                ...state,
                ...action.payload
            }
        }
    }
    return state;
}