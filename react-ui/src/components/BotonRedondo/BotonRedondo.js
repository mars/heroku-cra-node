import React from "react"
import {Fab} from "@material-ui/core"
import AddIcon from "@material-ui/icons/Add"

import "./BotonRedondo.css"

export default function BotonRedondo ()
{
    return (
        
    <div className="boton">
        <Fab className="boton__open-modal"
         color="primary"
         aria-label="add">
             <AddIcon/>
         </Fab>
    </div>
    )
}