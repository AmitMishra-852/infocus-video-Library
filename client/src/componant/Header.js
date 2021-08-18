import "./Header.css";
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import { Link } from "react-router-dom";

import { StateHandler } from "../context/StateProvider";


function Header({ click }) {

    const { user } = StateHandler()

    return (
        <div className="header">
            <div className="logo">
                <MenuIcon onClick={click} />
                <Link to="/" style={{textDecoration:"none"}}><div className="header-logo"> <span className="header-sub-logo">INFOCUS </span>Tube</div></Link>
            </div>

            <div className="profileimg-hambarger">
                <div className="profile">
                    <p className="profile-name">{user?.userName}</p>
                    <img
                        className="profile-img"
                        src={user?.profilePicture ? user?.profilePicture : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"}
                        alt=""
                    />
                </div>
            </div>
        </div>
    )
}

export default Header
