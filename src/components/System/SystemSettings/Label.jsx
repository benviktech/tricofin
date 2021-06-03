import React from 'react'

export default function Label({name, icon}) {
    const withOutIcon = {
        width:"150px",
    }

    const withIcon = { display:"flex", alignItems:"center"}

    return (
        <label for="name" style={icon ? withIcon : withOutIcon} class="col-form-label form-label">
            {name && <>{name}</>}
        {icon && <span style={{display:"flex",alignItems:"center", justifyContent:"center", backgroundColor:"#D7D7D7", width:"20px",height:"20px", borderRadius:"20px", padding:"2px", marginLeft:"5px"}}>
            {icon}
        </span>}
        </label>
    )
}


