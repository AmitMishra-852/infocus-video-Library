import "./WatchlaterComp.css"
import { format } from "timeago.js"
import { Link } from "react-router-dom";
import axios from "axios";

function WatchlaterComp({ video }) {

    const clickHandler = async () => {
        const res = await axios.delete(`http://localhost:5000/api/watchLater/${video._id}`)
        console.log(res.data.message)
        window.location.reload()
    }

    return (
            <div className="watch-leter">
                <div className="watch-leter-videos">
                    <Link to={`/video/${video?.postId}`} style={{ textDecoration: "none", color: "black" }} className="LInk-container">
                        <img
                            className="watch-leter-videos-img"
                            src={video?.img}
                            alt=""
                        />
                    </Link>

                    <div className="watch-leter-videos-info">
                        <img
                            className="watch-leter-user-profile"
                            src={video?.userImg}
                            alt=""
                        />
                        <div className="watch-leter-about-videos">
                            <p className="watch-leter-title">{video?.title}</p>
                            <p className="watch-leter-channelname">{video?.channelName}</p>
                            <div className="time-remove">
                                <p className="watch-leter-time">{format(video?.createdAt)}</p>
                                <button
                                    className="remove-watchlater"
                                    onClick={clickHandler}
                                >Remove</button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
    )
}

export default WatchlaterComp
