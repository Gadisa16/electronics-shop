import { Type } from './action.type';

export const initialState = {
    basket: [],
    user: null,
    products: [],           // All products
    filteredProducts: [],    // Filtered products for search/filter
    error: null,
    loading: false,
    searchTerm: ''          // added (Product.jsx reads this)
};

export const reducer = (state, action) => {
    switch (action.type) {
        case Type.ADD_TO_BASKET:
            const existingItem = state.basket.find(item => item.id === action.item.id);

            if (!existingItem) {
                return {
                    ...state,
                    basket: [...state.basket, { ...action.item, amount: 1 }]
                };
            } else {
                const updatedBasket = state.basket.map(item =>
                    item.id === action.item.id ? { ...item, amount: item.amount + 1 } : item
                );
                return {
                    ...state,
                    basket: updatedBasket
                };
            }


        case Type.REMOVE_FROM_BASKET:
            const index = state.basket.findIndex(item => item.id === action.id);
            let newBasket = [...state.basket];

            if (newBasket[index].amount > 1) {
                newBasket[index] = { ...newBasket[index], amount: newBasket[index].amount - 1 };
            } else {
                newBasket.splice(index, 1);
            }
            return {
                ...state,
                basket: newBasket
            };


        case Type.EMPTY_BASKET:
            return {
                ...state,
                basket: []
            };


        case Type.SET_USER:
            return {
                ...state,
                user: action.user
            };

        case Type.SET_PRODUCTS:
            // Set all products (e.g., after fetching from API)
            return {
                ...state,
                products: action.products,
                filteredProducts: [],
                error: null
            };

        case Type.FILTER_PRODUCTS: {
            const { searchTerm, category } = action.payload || {};
            let filtered = [...state.products];

            if (category) {
                filtered = filtered.filter(product =>
                    product?.category?.toLowerCase() === category.toLowerCase()
                );
            }
            if (searchTerm) {
                filtered = filtered.filter(product =>
                    product?.title?.toLowerCase().includes(searchTerm.toLowerCase())
                );
            }
            return {
                ...state,
                filteredProducts: filtered,
                searchTerm: searchTerm || '' // keep searchTerm in state
            };
        }

        case Type.SET_ERROR:
            return { ...state, error: action.error };
        
        case Type.SET_LOADING:
            return { ...state, loading: !!action.loading };

        default:
            return state;
    }
};
