import "./SideBar.css"
import SidebarOptions from "./SidebarOptions";
import WatchLaterRoundedIcon from '@material-ui/icons/WatchLaterRounded';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import HistoryRoundedIcon from '@material-ui/icons/HistoryRounded';
import HomeIcon from '@material-ui/icons/Home';
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { StateHandler } from "../context/StateProvider";



function SideBar({ show, click }) {


    const history = useHistory()

    const { user, dispatch } = StateHandler()

    const LogoutHandler = () => {
        localStorage.removeItem('User')
        dispatch({
            type: "LOGOUT-USER",
        })
        window.location.reload()
    
    }


    return (
        <div className={show ? "sidebar show" : "sidebar"}>
            {user &&
                <div className="user_name_img">
                    <img
                        className="user_img"
                        src={user?.profilePicture ? user?.profilePicture : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"}
                        alt=""
                    />
                    <p className="user-name">{user?.userName}</p>
                </div>

            }
            <hr />
            <Link to="/" onClick={click} style={{ textDecoration: "none", color: "black" }}>
                <SidebarOptions Icon={HomeIcon} value="Home" />
            </Link>
            <hr />

            <Link to="/watchLater" onClick={click} style={{ textDecoration: "none", color: "black" }}>
                <SidebarOptions Icon={WatchLaterRoundedIcon} value="Watch Later" />
            </Link>
            <Link to="/history" onClick={click} style={{ textDecoration: "none", color: "black" }}>
                <SidebarOptions Icon={HistoryRoundedIcon} value="History" />
            </Link>

            {
                user ? <div onClick={LogoutHandler}><SidebarOptions Icon={ExitToAppIcon} value="Log Out"/></div> :
                    <Link to="/login" onClick={click} style={{ textDecoration: "none", color: "black" }}>
                        <SidebarOptions Icon={ExitToAppIcon} value="Login" />
                    </Link> 

            }

        </div>
    )
}

export default SideBar

{/* <SidebarOptions Icon={ExitToAppIcon}  value="Log Out" onClick={LogoutHandler}/> : */ }