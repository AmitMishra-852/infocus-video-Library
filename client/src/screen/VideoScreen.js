import './VideoScreen.css';
import { useEffect, useState } from 'react';
import { useParams } from "react-router";
import axios from "axios";
import { StateHandler } from "../context/StateProvider";
import VideoScreenComp from '../componant/VideoScreenComp';
import Header from "../componant/Header";


function VideoScreen({ click }) {

    const { videoId } = useParams()
    const [postData, setPostData] = useState({})
    const [postUser, setPostUser] = useState({})
    const [popMessage, setPopMessage] = useState("")
    const [error, setError] = useState("")

    const { user } = StateHandler();

    console.log("postData", postData.userId)


    useEffect(() => {
        const getPost = async () => {
            const res = await axios.get(`http://localhost:5000/api/post/${videoId}`)
            setPostData(res.data)
    
        }
        getPost()
    }, [videoId])


    useEffect(() => {
        const getUser = async () => {
            const res = await axios.get(`http://localhost:5000/api/user/${postData?.userId}`)
            setPostUser(res.data)
        }
        getUser()
    }, [postData])
    

    const onStartHandler = async () => {

        const items = {
            postId: postData?._id,
            currentUserId: user?._id,
            userId: postData?.userId,
            channelName: postUser?.userName,
            title: postData?.title,
            userImg: postUser?.profilePicture,
            img: postData?.img
        }

        try {
            const res = await axios.post(`http://localhost:5000/api/history`, items)
            console.log(res.data.message)
            setPopMessage(res.data.message)
            setTimeout(() => {
                setPopMessage("")
            }, 3000)
        } catch (err) {
            console.log(err)
            setError(err.response.data.error)
            setTimeout(() => {
                setError("")
            }, 3000)

        }
    }

    const onClickHandler = async () => {

        const items = {
            postId: postData?._id,
            currentUserId: user?._id,
            userId: postData?.userId,
            channelName: postUser?.userName,
            title: postData?.title,
            userImg: postUser?.profilePicture,
            img: postData?.img
        }

        try {
            const res = await axios.post("http://localhost:5000/api/Watchlater", items)
            console.log(res.data.message)
            setPopMessage(res.data.message)
            setTimeout(() => {
                setPopMessage("")
            }, 3000)
        } catch (err) {
            console.log(err)
            setError(err.response.data.error)
            setTimeout(() => {
                setError("")
            }, 3000)
        }
    }

    return (
        <>
            <Header click={click} />
            <div >
                {popMessage && <div className="popmesssage">{popMessage}</div>}
                {error && <div className="">{error}</div>}
                {postData && <VideoScreenComp
                    onClickHandler={onClickHandler}
                    onStartHandler={onStartHandler}
                    postData={postData}
                    postUser={postUser}
                    params={videoId}
                />}
            </div>
        </>
    )
}

export default VideoScreen
