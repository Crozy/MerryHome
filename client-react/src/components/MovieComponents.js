import React from 'react';

export default function MovieComponents(props){
   if(props.info != null){
       console.log(props.info);
       //if(response.results != null)
       //console.log(response.results[0]);
       var lienImage = "https://image.tmdb.org/t/p/w600_and_h900_bestv2";
       return <div>
        { props.info.results.map((item, index) => (
            
            <div key={index}>
                <h1>{item.title}</h1>
                <br/>
                <img src={lienImage + item.poster_path}></img>
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
