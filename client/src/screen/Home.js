import "./Home.css";
import Videopage from "../componant/Videopage";
import Header from '../componant/Header';
import { useEffect, useState } from "react";
import {StateHandler} from "../context/StateProvider";
import axios from "axios";
import { BounceLoader } from "react-spinners"

function Home({click}) {
    const [videos, setVideos] = useState([])

    useEffect(() => {   
        try{
            const getVideos = async () => {
                const res = await axios.get("/api/post")
                setVideos(res?.data)
            }
            getVideos()

        }catch(error){
            console.log(error)
        }
    }, [])

    console.log(videos)

    return (
        <>
            <Header click={click} />
            { !videos && <BounceLoader loading/> }
              <div className="Home">
                 {videos && <Videopage key={videos._id} videos={videos} />}
              </div>  
        </>
    )
}

export default Home
