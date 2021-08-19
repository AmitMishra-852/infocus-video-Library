import "./Video.css";
import VisibilityIcon from '@material-ui/icons/Visibility';
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { format } from 'timeago.js';
import axios from "axios";


function Video({ item }) {
    const [getUser, setGetUser] = useState();
    useEffect(() => {
        const getUser = async () => {
            const res = await axios.get(`/api/user/${item.userId}`)
            setGetUser(res?.data)
        }
        getUser()
    }, [item])

    // console.log(item?._id)

    return (
        <>
            <div className="video">
                <Link to={`/video/${item._id}`}>
                    <img
                        className="videoimg"
                        src={item?.img}
                        alt=""
                    />
                </Link>
                <div className="video-container">
                    <img
                        className="user-Profile-img"
                        src={getUser?.profilePicture ? getUser?.profilePicture : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"}
                        alt=""
                    />
                    <div className="videoinfo">
                        <div className="videoinfo-title">{item.title}</div>
                        <div className="videoinfo-channelname">{getUser?.userName}</div>
                        <div className="views-time">
                            <span className="views">256 <VisibilityIcon className="icon" /></span>
                            <span className="time">{format(item.updatedAt)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </>



    )
}
// updatedAt
export default Video
