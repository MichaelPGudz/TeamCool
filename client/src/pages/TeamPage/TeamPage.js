import React from "react";
import {useParams} from "react-router-dom"

export default function TeamPage (){
    let {id} = useParams();
    return(
        <div>
            <h1>TEAM PAGE {id}</h1>
        </div>
    )
}