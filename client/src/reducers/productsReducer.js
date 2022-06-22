import {
  CREATE_PRODUCT,
  RESET_PRODUCTS,
  LOADING_MESSAGE,
  FETCH_PRODUCTS,
  LIKE,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
  RESET_MESSAGE,
  START_LOADING,
  END_LOADING,
  DEFAULT_LOADING,
  FETCH_PRODUCTS_BY_USER,
  FETCH_PRODUCTS_BY_CATEGORY,
  FETCH_PRODUCT,
  FETCH_PRODUCTS_BY_SUBCATEGORY,
  FETCH_PRODUCTS_BY_LIKE,
  FETCH_PRODUCTS_BY_SEARCH,
  FETCH_PRODUCTS_BY_LIKES_DESC,
  FETCH_PRODUCTS_BY_PRICE_ASC,
  FETCH_PRODUCTS_BY_PRICE_DESC,
  SORT_PRICE,
  DEFAULT_PRICE,
  SORT_LIKES
} from "../actions/types";

const products = (
  state = {
    isLoading: null,
    products: [],
    message: null,
    currentPage: 1,
    numberOfPages: null,
    likedProducts: [],
    sortPrice:'',
    sortLikes:'',
    loadingSubCategory:null,
    detect:null
  },
  action
) => {
  switch (action.type) {
    case DEFAULT_LOADING:
      return { ...state, isLoading: null };
    case START_LOADING:
      return { ...state, isLoading: true };
    case END_LOADING:
      return { ...state, isLoading: false };
    case RESET_PRODUCTS:
      return { ...state, products: [] };
    case RESET_MESSAGE:
      return { ...state, message: null };
    case LOADING_MESSAGE:
      return { ...state, message: "loading" };

    case FETCH_PRODUCTS:
      return { ...state, products: action.payload };
    case UPDATE_PRODUCT:
      return {
        ...state,
        message: action.payload.message,
        products: state.products.map((product) =>
          product._id === action.payload.productUpdated._id
            ? action.payload.productUpdated
            : product

            
        ),
      };
    case FETCH_PRODUCTS_BY_USER:
      console.log(action.payload);
      return {
        ...state,
        products: action.payload.products,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
      };
    case FETCH_PRODUCT:
      return { ...state, products: action.payload };
    case FETCH_PRODUCTS_BY_SEARCH:
      return {
        ...state,
        products: action.payload.products,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
      };
    case FETCH_PRODUCTS_BY_CATEGORY:
      return {
        ...state,
        products: action.payload.products,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
      };
    case FETCH_PRODUCTS_BY_SUBCATEGORY:
      return {
        ...state,
        products: action.payload.products,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
        loadingSubCategory:false
      };
    case CREATE_PRODUCT:
      return {
        ...state,
        products: [action.payload.newProduct, ...state.products],
        message: action.payload.message,
      };
    case LIKE:
      return {
        ...state,
        products: state.products.map((product) =>
          product._id === action.payload._id ? action.payload : product
        ),
      };
    case FETCH_PRODUCTS_BY_LIKE:
      return { ...state, likedProducts: action.payload };
    case FETCH_PRODUCTS_BY_LIKES_DESC:
      return { ...state, products: action.payload };

    case FETCH_PRODUCTS_BY_PRICE_ASC:
      return {
        ...state,
        products: action.payload.products,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
      };

    case FETCH_PRODUCTS_BY_PRICE_DESC:
      return { ...state, products: action.payload };

    case DELETE_PRODUCT:
      return {
        ...state,
        products: state.products.filter(
          (product) => product._id !== action.payload
        ),
      };
      case SORT_PRICE:
      return {
        ...state,sortPrice:action.payload
        
      }
      case SORT_LIKES:
      return {
        ...state,sortPrice:action.payload
        
      }
      case DEFAULT_PRICE:
      return {
        ...state,sortPrice:'',sortLikes:''
        
      }
      
      case 'DEFAULT_DETECT':
        return {
          ...state,detect:null
          
        }
        case 'OBJECT_DETECT':
          return {
            ...state,detect:true
            
          }
          case 'OBJECT_NOT_DETECT':
          return {
            ...state,detect:false
            
          }

    default:
      return state;
  }
};

export default products;
