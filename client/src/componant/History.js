import "./History.css"
import { format } from "timeago.js"
import { Link } from "react-router-dom"
import axios from "axios"

function History({ video }) {

    console.log("videos",video._id)

    const removeHandler = async() => {
        const res = await axios.delete(`/api/history/${video._id}`) 
        console.log(res.data.message)
        window.location.reload()
    }

    return (
        <div className="history">
            <div className="history-videos">
                <Link to={`/video/${video?.postId}`} style={{ textDecoration: "none", color: "black" }}>
                    <img
                        className="history-videos-img"
                        src={video?.img}
                        alt=""
                    />
                </Link>

                <div className="history-videos-info">
                    <img
                        className="history-user-profile"
                        src={video?.userImg}
                        alt=""
                    />
                    <div className="history-about-videos">
                        <p className="history-title">{video?.title}</p>
                        <p className="history-channelname">{video?.channelName}</p>
                        <div className="history-time-remove">
                            <p className="history-time">{format(video?.createdAt)}</p>
                            <button className="remove-history" onClick={removeHandler}>Remove</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default History

