import Video from "./Video"
import "./Videopage.css"
import {CircularProgress} from "@material-ui/core"


function Videopage({videos}) {
    console.log(videos)
    return (
        <div className="Videopage">
           {
              videos && videos.map((item) =><Video key={item._id} item={item}/>)
           }
            
        </div>
    )
}

export default Videopage
