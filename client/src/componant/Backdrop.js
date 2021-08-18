import "./Backdrop.css";

function Backdrop({show , click}) {
    return (
        <>
        {
            show && <div onClick={click} className="backdrop"></div>
        }
        </>
    )
}

export default Backdrop
