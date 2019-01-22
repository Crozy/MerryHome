import React from 'react';
import PluginItem from "./PluginItem"

export default function MovieComponents(props){
   if(props.info != null){
       console.log(props.info);
       //if(response.results != null)
       //console.log(response.results[0]);
       return <div>
        { props.info.results.map((item, index) => (
            <div key={index}>
                <h1>{item.title}</h1>
                <br/>
                <h3>Résumé :</h3>
                <br/>
                {item.overview}
            </div>
            ))}  
        </div>;
   }else{
        return "rien";
   }

}
