import { SIGN_IN, SIGN_UP, LOG_OUT, UPDATE_USER ,START_LOADING_AUTH,END_LOADING_AUTH} from "../actions/types";
const authReducer = (
  state = {
    userData:
      {
        id: JSON.parse(localStorage.getItem("profile"))?.loggedUser.id,
        email: JSON.parse(localStorage.getItem("profile"))?.loggedUser.email,
        firstName: JSON.parse(localStorage.getItem("profile"))?.loggedUser
          .firstName,
        lastName: JSON.parse(localStorage.getItem("profile"))?.loggedUser
        .lastName,
        token: JSON.parse(localStorage.getItem("profile"))?.token,
      } || null,
    isAuthenticated: !!JSON.parse(localStorage.getItem("profile")),
    loading:null
  },
  action
) => {
  switch (action.type) {
    case SIGN_IN:
      if(action.payload.token){
      localStorage.setItem("profile", JSON.stringify(action.payload))
      
      return {
        userData: {
          id: action.payload.loggedUser.id,
          email: action.payload.loggedUser.email,
          firstName: action.payload.loggedUser.firstName,
          lastName: action.payload.loggedUser.lastName,
          phone:action.payload.loggedUser.phone,
          image: action.payload.loggedUser.image || null,
          token: action.payload.token,
          role:action.payload.loggedUser.role||'user'

         
        },
        isAuthenticated: action.payload.token ? true : false,
        error:null

      };
    } else{
     return {...state,error:action.payload.message}
    }

    case LOG_OUT:
      localStorage.removeItem("profile");
      return { userData: null, isAuthenticated: false };
    case SIGN_UP:
      if(action.payload.token){
        localStorage.setItem("profile", JSON.stringify(action.payload))
        
      return {
        userData: {
          id: action.payload.loggedUser.id,
          email: action.payload.loggedUser.email,
          firstName: action.payload.loggedUser.firstName,
          lastName: action.payload.loggedUser.lastName,
          phone:action.payload.loggedUser.phone,
          token: action.payload.token,
          role:'user'

        },
        isAuthenticated: action.payload.token ? true : false,
        error:null
      };
    }
    else{
      return {...state,error:action.payload.message}
     }
      case UPDATE_USER:
        if(action.payload.token){
          localStorage.setItem("profile", JSON.stringify(action.payload))
          
                return {
        userData: {
          id: action.payload.loggedUser.id,
          email: action.payload.loggedUser.email,
          firstName: action.payload.loggedUser.firstName,
          lastName: action.payload.loggedUser.lastName,
          phone:action.payload.loggedUser.phone,
          image: action.payload.loggedUser.image || null,
          token: action.payload.token,
          role:action.payload.loggedUser.role||'user'
        },
        isAuthenticated: true,
        error:null

      };
    }
    else{
      return {...state,error:action.payload.message}
     }
      case START_LOADING_AUTH:
        return {...state,loading:true}
        case END_LOADING_AUTH:
        return {...state,loading:false}
        case 'DEFAULT_LOADING_AUTH':
          return {...state,loading:null}

    default:
      return state;
  }
};
export default authReducer;
