import "./HistoryScreen.css"
import { useEffect, useState } from "react"
import History from "../componant/History"
import Header from "../componant/Header"
import axios from "axios"
import { StateHandler } from "../context/StateProvider";

import React from 'react'

function HistoryScreen({click}) {

    const [state , setState] = useState([])
    const { user } = StateHandler()
    console.log(user._id)


    useEffect(() => {
        const getHistoryVideos = async () => {
            const res = await axios.get(`http://localhost:5000/api/history/currentUser/${user._id}`)
            setState(res.data);
        }
        getHistoryVideos()
    }, [user._id])

   console.log(state)

    return (
        <>
            <Header click={click}/>
            <div>
                {
                   state && state.map((items) => <History key={items._id} video={items}/>)
                }
            </div>
        </>
    );
}

export default HistoryScreen
