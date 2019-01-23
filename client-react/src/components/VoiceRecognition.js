import React, { PropTypes, Component } from 'react'
import {isConfigured} from '../utils/authservice'
import { Button, Glyphicon } from 'react-bootstrap'
import SpeechRecognition from 'react-speech-recognition'

import {getExpressions, sendRequest, subscribeToEvent} from '../utils/serverhome-api'
import {searchRequest} from '../utils/voice-helper'
import MovieComponent from './MovieComponents'

const propTypes = {
  // Props injected by SpeechRecognition
  transcript: PropTypes.string,
  resetTranscript: PropTypes.func,
  browserSupportsSpeechRecognition: PropTypes.bool
};

class VoiceRecognition extends Component {
    
    constructor(props){
        super(props);
        this.state = { expressions: [],
                       conversation: [],
                       response: "",
                       movieOrSerie: ""
                    };
    }

    componentDidMount(){
        if(!isConfigured()) return;
        var self= this;
        getExpressions().then((expressions)=>{
            self.setState({"expressions": expressions});
            self.subscribeServerSays();
            if(self.props.recognition){
                self.props.recognition.onresult = function(event) {
                    var result=event.results[event.results.length-1];
                    if(result.isFinal){
                        var objRequest = searchRequest(result[0].transcript, expressions);
                        console.log({"transcript": result[0].transcript,
                                     "data": objRequest});
                        if(objRequest && objRequest.plugin){
                            self.sendData(objRequest);
                        }
                    }
                };
            }
        });        
    }
    
    subscribeServerSays(){
        subscribeToEvent("serversays", function (data){
            var utterThis = new SpeechSynthesisUtterance(data);
            utterThis.lang = 'fr-FR';
            console.log({"event server says":data});
            window.speechSynthesis.speak(utterThis);
        });
    }
    
    sendData(objRequest){
        sendRequest(objRequest.plugin, objRequest.action, objRequest.data).then((data)=>{
         if(data){
            console.log("ICI : " + objRequest.action);
            console.log({"response":data.response});
            this.reponseVoie(objRequest.action, data, objRequest);
            this.setState({"response": data.response})
        }
        });
    }

     reponseVoie(questionPosé, data, objRequest){
        //var dataList = this.state.response ? <MovieComponent info={this.state.response} demande="data"/> : "";
        var dataList = data.response.results ? data.response.results : [];
        // console.log("ICI là");
        // console.log(dataList[0]);
        // console.log(dataList[0].title);
         switch(questionPosé){
	 		case "SearchSerie": 
	 		    var utterThis = new SpeechSynthesisUtterance(data.response.total_results + "résultats on été trouvé pour " + objRequest.data.searchValue);
                utterThis.lang = 'fr-FR';
                window.speechSynthesis.speak(utterThis); // Le programme parle
                this.state.movieOrSerie = "serie";
	 		    break;
	 	    case "SearchSerie1": 
                var utterThis = new SpeechSynthesisUtterance(data.response.total_results + "résultats on été trouvé pour " + objRequest.data.searchValue);
                utterThis.lang = 'fr-FR';
                window.speechSynthesis.speak(utterThis); // Le programme parle
                this.state.movieOrSerie = "serie";
	 	    break;
	 	    case "SearchSerie2": 
                var utterThis = new SpeechSynthesisUtterance(data.response.total_results + "résultats on été trouvé pour " + objRequest.data.searchValue);
                utterThis.lang = 'fr-FR';
                window.speechSynthesis.speak(utterThis); // Le programme parle
                this.state.movieOrSerie = "serie";
	 	    break;
	 	    case "SearchSerie3": 
                var utterThis = new SpeechSynthesisUtterance(data.response.total_results + "résultats on été trouvé pour " + objRequest.data.searchValue);
                utterThis.lang = 'fr-FR';
                window.speechSynthesis.speak(utterThis); // Le programme parle
                this.state.movieOrSerie = "serie";
	 	    break;
	 	    case "SearchSerie4": 
                var utterThis = new SpeechSynthesisUtterance(data.response.total_results + "résultats on été trouvé pour " + objRequest.data.searchValue);
                utterThis.lang = 'fr-FR';
                window.speechSynthesis.speak(utterThis); // Le programme parle
                this.state.movieOrSerie = "serie";
	 	    break;
	 		case "SearchMovie": 
                var utterThis = new SpeechSynthesisUtterance(data.response.total_results + "résultats on été trouvé pour " + objRequest.data.searchValue);
                utterThis.lang = 'fr-FR';
                window.speechSynthesis.speak(utterThis); // Le programme parle
                this.state.movieOrSerie = "movie";
	 		break;
	 		case "SearchMovie1": 
                var utterThis = new SpeechSynthesisUtterance(data.response.total_results + "résultats on été trouvé pour " + objRequest.data.searchValue);
                utterThis.lang = 'fr-FR';
                window.speechSynthesis.speak(utterThis); // Le programme parle
                this.state.movieOrSerie = "movie";
	 		break;
	 		case "SearchMovie2": 
                var utterThis = new SpeechSynthesisUtterance(data.response.total_results + "résultats on été trouvé pour " + objRequest.data.searchValue);
                utterThis.lang = 'fr-FR';
                window.speechSynthesis.speak(utterThis); // Le programme parle
                this.state.movieOrSerie = "movie";
	 		break;
	 		case "SearchMovie3": 
                var utterThis = new SpeechSynthesisUtterance(data.response.total_results + "résultats on été trouvé pour " + objRequest.data.searchValue);
                utterThis.lang = 'fr-FR';
                window.speechSynthesis.speak(utterThis); // Le programme parle
                this.state.movieOrSerie = "movie";
	 		break;
	 		case "SearchMovie4": 
                var utterThis = new SpeechSynthesisUtterance(data.response.total_results + "résultats on été trouvé pour " + objRequest.data.searchValue);
                utterThis.lang = 'fr-FR';
                window.speechSynthesis.speak(utterThis); // Le programme parle
                this.state.movieOrSerie = "movie";
             break;
             case "TopMovies": 
                //var utterThis = new SpeechSynthesisUtterance(data.response.total_results + "résultats on été trouvé pour " + objRequest.data.searchValue);
                var utterThis = new SpeechSynthesisUtterance("Voici les meilleurs films du moment, les 3 premier sont : " + dataList[0].title +", "+ dataList[1].title +", "+ dataList[2].title);
                console.log("Voici les meilleurs films du moment, les 3 premier sont : " + dataList[0].title +", "+ dataList[1].title +", "+ dataList[2].title);
                utterThis.lang = 'fr-FR';
                window.speechSynthesis.speak(utterThis); // Le programme parle
                this.state.movieOrSerie = "movie";
             break;
             case "TopSeries": 
                var utterThis = new SpeechSynthesisUtterance("Voici les meilleurs films du moment, les 3 premier sont : " + dataList[0].name +", "+ dataList[1].name +", "+ dataList[2].name);
                console.log("Voici les meilleurs films du moment, les 3 premier sont : " + dataList[0].name +", "+ dataList[1].name +", "+ dataList[2].name);
                utterThis.lang = 'fr-FR';
                window.speechSynthesis.speak(utterThis); // Le programme parle
                this.state.movieOrSerie = "serie";
             break;
             case "VideoSerie":
                var utterThis = new SpeechSynthesisUtterance("Voici une bande-annonce de la série " + objRequest.data.searchValue);
                console.log("Voici une bande-annonce de la série " + objRequest.data.searchValue);
                utterThis.lang = 'fr-FR';
                window.speechSynthesis.speak(utterThis); // Le programme parle
                this.state.movieOrSerie = "video";
                break;
            case "VideoMovie":
                var utterThis = new SpeechSynthesisUtterance("Voici une bande-annonce du film " + objRequest.data.searchValue);
                console.log("Voici une bande-annonce du film " + objRequest.data.searchValue);
                utterThis.lang = 'fr-FR';
                window.speechSynthesis.speak(utterThis); // Le programme parle
                this.state.movieOrSerie = "video";
                break;
             default:
                 break;
         }
     }


    render() {
        const { startListening, stopListening, browserSupportsSpeechRecognition } = this.props;
        
        if(!isConfigured()){
            return <div>Configurer le server de merry home ;)</div>;
        }
        
        if (!browserSupportsSpeechRecognition) {
            return <div>Pour utiliser la reconnaissance vocale, merci d'utiliser google chrome ;)</div>;
        }
        var resultats = this.state.response ? <MovieComponent info={this.state.response} demande={this.state.movieOrSerie}/> : "";
        return (
            <div>
               <Glyphicon glyph="comment" className={"voice-icon "+(this.props.listening  ? "listening" : "")} />
               { this.props.listening  ? 
                <Button bsStyle="danger" onClick={stopListening}><Glyphicon glyph="stop" /> stop </Button> : 
                <Button bsStyle="info" onClick={startListening }><Glyphicon glyph="play" /> start </Button> }
                <div>{resultats}</div>
            </div>
        );
    };
};

VoiceRecognition.propTypes = propTypes;

const options = {
  autoStart: false
};

export default SpeechRecognition(options)(VoiceRecognition);