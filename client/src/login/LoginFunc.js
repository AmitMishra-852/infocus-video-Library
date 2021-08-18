import axios from "axios";
import {useHistory} from "react-router-dom";

const LoginFunc=async(userCredential , dispatch , history)=> {
    

    dispatch({type:"LOGIN-START"})
    try {
        const res = await axios.post("http://localhost:5000/api/auth/login", userCredential)
        console.log(res.data)
        dispatch({type:"LOGIN-SUCCESSFULL",payload:res.data})
        history.push("/")

    } catch (err) {
        console.log(err)
        dispatch({type:"LOGIN-FAIL",payload:err})
    }
}

export default LoginFunc;
