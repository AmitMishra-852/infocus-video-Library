import { useState } from "react"
import "./Register.css"
import { useHistory , Link} from "react-router-dom"
import axios from "axios"


function Register() {
    const [file, setFile] = useState(null)
    const [userName, setUserName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [error , setError] = useState("")
    const history = useHistory()
    console.log(file)
    
    const SubmitHandler = async (e) => {
        e.preventDefault()
        let cloudinaryImageUrl
        console.log(cloudinaryImageUrl)

        if (password !== confirmPassword) {
            setPassword("")
            setConfirmPassword("")
            setTimeout(()=>{
                setError("")
            },3000)
            return setError("password do not match")
        }

        const data = new FormData()
        data.append("file", file)
        data.append("upload_preset", "infocusTube")
        data.append("cloud_name", "philomath")

        try {
            const res = file && await axios.post("https://api.cloudinary.com/v1_1/philomath/image/upload", data)
            console.log(res)
            cloudinaryImageUrl = res.data.secure_url;
            console.log(cloudinaryImageUrl)
        } catch (err) {
            console.log(err)
        }

        try {
            const res = await axios.post("http://localhost:5000/api/auth",{
                userName,
                email,
                password,
                cloudinaryImageUrl
            })
            console.log(res.data)
            history.push('/login')
        } catch (err) {
            setError(err.res?.data)
            setTimeout(()=>{
                setError("")
            })
            console.log(err)
        }
    }

    return (
        <div className="register-page">
            <div className="register">
                <label htmlFor="file" className="upload-DP">
                    <img
                        className="user-img"
                        src="https://cdn.pixabay.com/photo/2016/08/31/11/54/user-1633249_960_720.png"
                        alt=""
                    />
                    <input
                        style={{ display: "none" }}
                        id="file"
                        type="file"
                        accept=".png,.jpeg,.jpg"
                        onChange={(e) => setFile(e.target.files[0])}
                    />
                    <p className="upload-text">Upload Your Profile Picture</p>
                </label>

                {error && <span className="error-Field">{error}</span>}

                <form className="registerContainer" onSubmit={SubmitHandler}>
                    <input
                       className="register-input" 
                       id="userName" 
                       value={userName} 
                       placeholder="User Name" 
                       onChange={(e)=>setUserName(e.target.value)}
                       />

                    <input 
                       className="register-input" 
                       id="email" 
                       value={email} 
                       placeholder="Email" 
                       onChange={(e)=>setEmail(e.target.value)}
                       />

                    <input 
                       className="register-input" 
                       id="pasword" 
                       value={password} 
                       placeholder="Password" 
                       onChange={(e)=>setPassword(e.target.value)}
                       />

                    <input 
                       className="register-input" 
                       id="confirmPassword" 
                       value={confirmPassword} 
                       placeholder="comfirm password" 
                       onChange={(e)=>setConfirmPassword(e.target.value)}
                       />

                    <button type="submit" className="register-button">Register</button>
                </form>
                <p className="signin-Link">already have an account..? <Link to="/login">login</Link></p>
            </div>

        </div>
    )
}

export default Register
