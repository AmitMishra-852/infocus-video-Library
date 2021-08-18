import "./SidebarOptions.css"

function SidebarOptions({Icon , value}) {
    return (
        <div className="sidebaroption">
            <Icon className="sidebaroption-icon"/>
            <div className="sidebaroption-title">{value}</div>               
        </div>
    )
}

export default SidebarOptions
