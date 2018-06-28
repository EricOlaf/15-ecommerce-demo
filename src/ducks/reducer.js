import axios from "axios";

const GET_PRODUCTS = "GET_PRODUCTS";

const initialState = {
  products: []
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS + "_FULFILLED":
      return { ...state, products: action.payload.data };
    default:
      return state;
  }
}

export function getProducts() {
  return {
    type: GET_PRODUCTS,
    payload: axios.get("/api/products")
  };
}
