import React from 'react';

export default function MovieComponents(props){
   console.log("Demande effectué : " + props.demande);
    //if(props.info != null && props.demande == "affichage"){
        if(props.info != null){
       console.log(props.info);
       if(props.info.status_code == 404){
        return <div>
        <h1>Aucune résultat</h1>
        </div>;
       }else{
       if(props.info.results.length > 0){
    //    var titre = "";
    //    if(props.info.title != null){
    //        titre = props.info.title;
    //    }
    //    if(props.info.name != null){
    //     titre = props.info.name;
    // }
       //if(response.results != null)
       //console.log(response.results[0]);
       var lienImage = "https://image.tmdb.org/t/p/w600_and_h900_bestv2";
       if(props.demande === "movie"){
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
       }
       if(props.demande === "serie"){
        return <div>
        { props.info.results.map((item, index) => (
            
            <div key={index}>
                <h1>{item.name}</h1>
                <br/>
                <img src={lienImage + item.poster_path}></img>
                <h3>Résumé :</h3>
                <br/>
                {item.overview}
            </div>
            ))}  
        </div>;  
       }
       var youtube = "https://www.youtube.com/embed/";
       if(props.demande === "video" && props.info.status_code == null){
           var randonVideo = Math.floor(Math.random() * Math.floor(props.info.results.length));
        return <div>
            <h1>{props.info.name}</h1>
            <iframe width="560" height="315" src={youtube + props.info.results[randonVideo].key} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>;
       }else{
        return <div>
        <h1>Aucune vidéo trouvé</h1>
        </div>;
       }
    }else{
        return <div>
        <h1>Aucune résultat</h1>
        </div>;
    }
   }
}
//    else if(props.info != null && props.demande == "data"){
//        var top3;
//     props.info.results.map((item, index) => (
//         top3 = top3 + props.info.results.name;
//         if(index > 3){
//             return top3;
//         }
//         ));
//    }   
   else{
        return <div>
        <h1>Aucune résultat</h1>
        </div>;
   }
}
