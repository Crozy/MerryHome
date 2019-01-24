import React, { PropTypes, Component } from 'react'
import {isConfigured} from '../utils/authservice'
import { Button, Glyphicon, Form, FormGroup, ControlLabel, FormControl } from 'react-bootstrap'
import SpeechRecognition from 'react-speech-recognition'

import {getExpressions, sendRequest, emitEvent, subscribeToEvent} from '../utils/serverhome-api'
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
                       movieOrSerie: "",
                       searchValue: ""
                    };
    }

    handleChange (event) {
        this.setState({
             searchValue: event.target.value
         });
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
        //var dataList = data.response.results ? data.response.results : [];
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
	 		case "SearchMovie": 
                var utterThis = new SpeechSynthesisUtterance(data.response.total_results + "résultats on été trouvé pour " + objRequest.data.searchValue);
                utterThis.lang = 'fr-FR';
                window.speechSynthesis.speak(utterThis); // Le programme parle
                this.state.movieOrSerie = "movie";
	 		break;
             case "TopMovies": 
             //if(data.response.results != null){
             var dataList = data.response.results ? data.response.results : [];
                //var utterThis = new SpeechSynthesisUtterance(data.response.total_results + "résultats on été trouvé pour " + objRequest.data.searchValue);
                var utterThis = new SpeechSynthesisUtterance("Voici les meilleurs films du moment, les 3 premier sont : " + dataList[0].title +", "+ dataList[1].title +", "+ dataList[2].title);
                console.log("Voici les meilleurs films du moment, les 3 premier sont : " + dataList[0].title +", "+ dataList[1].title +", "+ dataList[2].title);
                utterThis.lang = 'fr-FR';
                window.speechSynthesis.speak(utterThis); // Le programme parle
                this.state.movieOrSerie = "movie";
             //}
             break;
             case "TopSeries": 
             var dataList = data.response.results ? data.response.results : [];
                var utterThis = new SpeechSynthesisUtterance("Voici les meilleurs films du moment, les 3 premier sont : " + dataList[0].name +", "+ dataList[1].name +", "+ dataList[2].name);
                console.log("Voici les meilleurs films du moment, les 3 premier sont : " + dataList[0].name +", "+ dataList[1].name +", "+ dataList[2].name);
                utterThis.lang = 'fr-FR';
                window.speechSynthesis.speak(utterThis); // Le programme parle
                this.state.movieOrSerie = "serie";
             break;
             case "VideoSerie":
             try{
                var dataList = data.response.results ? data.response.results : [];
                if(dataList != null){
                var utterThis = new SpeechSynthesisUtterance("Voici une bande-annonce de la série " + objRequest.data.searchValue);
                console.log("Voici une bande-annonce de la série " + objRequest.data.searchValue);
                utterThis.lang = 'fr-FR';
                window.speechSynthesis.speak(utterThis); // Le programme parle
                this.state.movieOrSerie = "video";
                }
            }
            catch{
                    var utterThis = new SpeechSynthesisUtterance("Aucune bande-annonce de la série " + objRequest.data.searchValue + " n'a été trouvé");
                    console.log("Aucune bande-annonce du film " + objRequest.data.searchValue + " n'a été trouvé");
                    utterThis.lang = 'fr-FR';
                    window.speechSynthesis.speak(utterThis); // Le programme parle
                    this.state.movieOrSerie = "video";
                }
                break;
            case "VideoMovie":
            try{
                var dataList = data.response.results ? data.response.results : [];
                if(dataList != null){
                var utterThis = new SpeechSynthesisUtterance("Voici une bande-annonce du film " + objRequest.data.searchValue);
                console.log("Voici une bande-annonce du film " + objRequest.data.searchValue);
                utterThis.lang = 'fr-FR';
                window.speechSynthesis.speak(utterThis); // Le programme parle
                this.state.movieOrSerie = "video";
                }
            }
            catch{
                var utterThis = new SpeechSynthesisUtterance("Aucune bande-annonce du film " + objRequest.data.searchValue + " n'a été trouvé");
                console.log("Aucune bande-annonce du film " + objRequest.data.searchValue + " n'a été trouvé");
                utterThis.lang = 'fr-FR';
                window.speechSynthesis.speak(utterThis); // Le programme parle
                this.state.movieOrSerie = "video";
            }
                break;
             default:
                 break;
         }
     }

     handleSubmit (event) {
        console.log("emit event themoviedbsearch : "+this.state.searchValue);

        var objRequest = searchRequest(this.state.searchValue, this.state.expressions);


        console.log(objRequest);
        emitEvent("themoviedbsearch", this.state.searchValue);
        var self= this;
        this.sendData(objRequest);
        // sendRequest("themoviedb", objRequest.action, {searchValue: objRequest.data.searchValue}).then((data)=>{
        //     console.log(data);
        //     if(data.resultText){
        //         var utterThis = new SpeechSynthesisUtterance(data.resultText);
        //         utterThis.lang = 'fr-FR';
        //         console.log({"response":data.resultText});
        //         window.speechSynthesis.speak(utterThis);
        //         self.setState({
        //             shortResult: data.resultText
        //         });
        //         console.log({"response":data.response});
        //         this.reponseVoie(objRequest.action, data, objRequest);
        //         this.setState({"response": data.response})
        //     }
        // });
        if(event){
            event.preventDefault();
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
                
                <Form onSubmit={this.handleSubmit.bind(this)} inline>
                    <FormGroup controlId="formInlineName">
                        <ControlLabel>Search</ControlLabel>
                        <FormControl type="text" placeholder="terms" value={this.state.searchValue} onChange={this.handleChange.bind(this)} />
                    </FormGroup>
                    <Button type="submit"><Glyphicon glyph="search" /></Button>
                </Form>
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