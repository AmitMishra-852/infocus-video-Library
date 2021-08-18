import "./VideoScreenComp.css";
import { useState, useEffect } from "react";
import { format } from 'timeago.js';
import axios from "axios";
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import ReactPlayer from 'react-player';
import RecommentVideo from "./RecommentVideo";
import { StateHandler } from "../context/StateProvider";

function VideoScreenComp({ onClickHandler, onStartHandler, postData, postUser , params }) {

    const [videos , setVideos] = useState([]);
    const { user } = StateHandler()
    const [like, setLike] = useState([])

    useEffect(() => {
        setLike(postData?.likes)
    }, [postData])

    console.log(params)

    useState(()=>{
        const getAllvideos =async() =>{
           const res =await axios.get("http://localhost:5000/api/post")
           setVideos(res?.data)
        }
        getAllvideos()
    },[])

    const likeHandler = async () => {

        const items = {
            currentUserId: user?._id,
            userId: postUser._id,
            channelName: postUser?.userName,
            title: postData?.title,
            userImg: postUser?.profilePicture,
            img: postData?.img
        }

        try {
            const res = await axios.put(`http://localhost:5000/api/post/likes/${postData?._id}`, {
                currentUserId: user?._id
            })

            setLike(res.data.likes)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="videoscreen">
            <div className="reactplayer">

                <div className="player-wrapper">
                    <ReactPlayer
                        width="100%"
                        height="100%"
                        className="video-Player"
                        controls
                        url={postData?.video}
                        onStart={onStartHandler}
                    />
                </div>

                <div className="videoplayerinfo">
                    <img
                        className="userplayerImg"
                        src={postUser?.profilePicture}
                        alt=""
                    />
                    <div className="about-video">
                        <div className="videoplayerinfo-title">{postData?.title}</div>
                        <div className="videoplayerinfo-channelname">{postUser?.userName}</div>
                        <div className="videoplayer-views-time">
                            <div className="views-time">
                                <span className="views">256 </span>
                                <span className="time">{format(postUser?.updatedAt)}</span>
                            </div>
                            <div className="featured-icon">
                                <span className="like" onClick={likeHandler}><ThumbUpAltIcon />{like?.length}</span>
                                <span className="save-video" onClick={onClickHandler}>Save <SaveAltIcon /></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="recommend-videos">
                {
                    videos.map((video)=>{                      
                        if(video._id === params){
                            return null
                        }
                        return <RecommentVideo key={video._id} video={video}/>
                    })
                }
            </div>

        </div>
    )
}

export default VideoScreenComp
