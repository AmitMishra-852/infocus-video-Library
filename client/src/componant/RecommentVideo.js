import "./RecommentVideo.css"
import { useEffect, useState } from "react";
import { format } from 'timeago.js';
import {Link} from "react-router-dom";
import axios from "axios";

function RecommentVideo({ video }) {
    const [users, setUsers] = useState([])

    useEffect(() => {
        const getAllUser = async () => {
            const res = await axios.get(`http://localhost:5000/api/user/${video.userId}`)
            setUsers(res.data)
        }
        getAllUser()
    }, [video.userId])

    return (
        <div className="Recomments">
            <Link to={`/video/${video._id}`} style={{textDecoration:"none", color:"black"}}>
                <div className="Recomments-videos">
                    <img
                        className="Recomments-videos-img"
                        src={video.img}
                        alt=""
                    />

                    <div className="Recomments-videos-info">
                        <img
                            className="Recomments-user-profile"
                            src={users?.profilePicture}
                            alt=""
                        />
                        <div className="Recomments-about-videos">
                            <p className="Recommentstitle">{video.title}</p>
                            <p className="Recomments-channelname">{users?.userName}</p>
                            <p className="Recomments-time">{format(video?.createdAt)}</p>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default RecommentVideo
