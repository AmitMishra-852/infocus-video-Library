import "./WatchLater.css";
import WatchlaterComp from "../componant/WatchlaterComp"
import "./WatchLater.css"
import { StateHandler } from "../context/StateProvider";
import { useEffect, useState } from "react"
import axios from "axios";
import Header from "../componant/Header"


function WatchLater({ click }) {
    const [watchlater , setWatchLater] = useState([]);
   
    const { user } = StateHandler();
     useEffect(()=>{
        const getAllWatchVideo = async() =>{
            const res = await axios.get(`/api/watchLater/${user._id}`)
            setWatchLater(res.data)
        }
        getAllWatchVideo()
     },[user])

     console.log(watchlater)

    return (
        <>
            <Header  click={click} />
            <div className = "Watchleter-container">
                {
                  watchlater.map((item)=><WatchlaterComp key={item._id} video={item} />)  
                }
            </div>
        </>
    )
}

export default WatchLater
