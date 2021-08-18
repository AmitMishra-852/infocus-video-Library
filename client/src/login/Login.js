import "./login.css"
import { useRef , useState} from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {StateHandler} from "../context/StateProvider";
import {useHistory} from "react-router-dom";
import {CircularProgress} from "@material-ui/core"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Login() {

   const [error , setError] = useState("");
   console.log(error)

   const [email , setEmail] = useState("");
   const [password , setPassword] = useState("")

    const history = useHistory()

    const {user,isFatching,dispatch} = StateHandler()
    
    
    
    const submitHandler = async (e) => {
        e.preventDefault()
        const userCredential = {email, password}
        
        dispatch({type:"LOGIN-START"})
        try {
            const res = await axios.post("http://localhost:5000/api/auth/login", userCredential ,
            {headers:{authorization : "abcdefghi"}})

            console.log(res.data)
            dispatch({type:"LOGIN-SUCCESSFULL",payload:res.data.user})
            history.push('/')

        } catch (err) {
            console.log(err.response?.data.error)
            setError(err.response?.data.error)
            

            setTimeout(()=>{
               setError("")

               setEmail("")
               setPassword("")
            },3000)


            dispatch({type:"LOGIN-FAIL"})
        }
    }     

    return (
        <div className="loginpage">
            {error && <span className="login-error-field">{error}</span>}
            <div className="login">
                <h2 className="login-logo"><span className="login-infocus-logo">INFOCUS</span><span className="login-tube-logo">tube</span></h2>
                <form className="loginContainer" onSubmit={submitHandler}>
                    <input 
                       className="login-input" 
                       value={email} 
                       id="email" 
                       placeholder="Email" 
                       onChange={(e)=>setEmail(e.target.value)}
                       />
                    <input 
                       className="login-input" 
                       value={password} 
                       id="password" 
                       placeholder="Password"
                       onChange={(e)=>setPassword(e.target.value)} 
                       />
                    <button type="submit" className="login-btn">{isFatching ? <CircularProgress color="white" size="15px"/> :"Login"}</button>
                </form>
                <p className="signup-Link">Not a member..? <Link to="/register">SignUp</Link></p>
            </div>
        </div>
    )
}

export default Login
