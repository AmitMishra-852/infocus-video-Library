import { createContext, useContext, useReducer , useEffect} from "react";

const stateContext = createContext();

 export default function StateProvider({ children }) {  
    const [state, dispatch] = useReducer( reducerFuc ,
         {
            user: localStorage.getItem('User') ? JSON.parse(localStorage.getItem('User')) : null,
            isUserLogIn:false,
            isFatching:false,
            error:false
        });

    useEffect(()=>{
        localStorage.setItem("User" , JSON.stringify(state.user))
    },[state.user])

    

    console.log(state.user)
    return (
        <stateContext.Provider value={{
            user:state.user,
            isFatching:state.isFatching,
            error:state.error,
            dispatch}}
            >
            {children}
        </stateContext.Provider>
    )

}

export const StateHandler=()=>useContext(stateContext)

const reducerFuc=(state,action)=>{
    console.log(action.payload)
    switch(action.type){
        case "LOGIN-START":
            return{
              state,user:null,
              isUserLogIn:false,
              state,isFatching:true,
              state,error:false
            }

        case "LOGIN-SUCCESSFULL":
            return{
                state,user:action.payload,
                isUserLogIn:true,
                state,isFatching:false,
                state,error:false
            }
        case "LOGIN-FAIL":
            return{
                state,user:null,
                isUserLogIn:false,
                state,isFatching:false,
                state,error:true
            } 

        case "LOGOUT_USER":
            return{
                state,user:null,
                isUserLogIn:false,
                state,isFatching:false,
                state,error:false
            } 
    
        default:
            return state;        
    }
}