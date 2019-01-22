const request = require('sync-request');

class WikipediaController {
    
    constructor(io){
            this.io = io;
    }
    
    postAction(req, res){
        switch(req.params.actionId){
			case "SearchSerie": 
			var requestUrl="https://api.themoviedb.org/3/search/tv?query=" + req.body.searchValue + "&api_key=829549883362a2a4620637ad10662863&language=fr-FR&page=1";
			console.log(requestUrl);
			var wikiReq = request('GET', requestUrl,{cache:'file'});
			var response = JSON.parse(wikiReq.getBody('utf8'));
			var lesNoms = "";
			for(var i= 0; i < response.results.length; i++)
			{
     			lesNoms = lesNoms+", "+response.results[i].name;
			}
				res.end(JSON.stringify({resultText: "Il y a " + response.results.length + " réponse. Ce sont : " + lesNoms}));
			//res.end({response});
			break;
			case "SearchMovie": 
			var requestUrl="https://api.themoviedb.org/3/search/movie?query=" + req.body.searchValue + "&api_key=829549883362a2a4620637ad10662863&language=fr-FR&page=1";
			console.log(requestUrl);
			var wikiReq = request('GET', requestUrl,{cache:'file'});
			var response = JSON.parse(wikiReq.getBody('utf8'));
			var lesNoms = "";
			//for(var i= 0; i < response.results.length; i++)
			//{
     		//	lesNoms = lesNoms+", "+response.results[i].title;
			//}
			//	res.end(JSON.stringify({resultText: "Il y a " + response.results.length + " réponse. Ce sont : " + lesNoms}));
			res.end(JSON.stringify({response}));
			break;
            default:
                res.end(JSON.stringify({}));
                break;
            
        }
    }
}

function parseDataSend(data){
	if(data.indexOf(" ")){
		var pieces = data.split(" ");
		data="";
		for ( var i in pieces){
			if(pieces[i].length>3){
				data += pieces[i].charAt(0).toUpperCase();
				data += pieces[i].substr(1);
				if(i!==pieces.length - 1){
					data+="_";
				}
			}
		}
	}
	return data;
}

function parseDataResponse(response){
	if(response){
		if(response.query){
			for(var i in response.query.pages){
				if(response.query.pages[i].extract){
					if(response.query.pages[i].extract.indexOf('\n')!==-1){
						var textResponse= response.query.pages[i].extract.substr(0, response.query.pages[i].extract.indexOf('\n'));
					}else{
						var textResponse= response.query.pages[i].extract;
					}
					if(textResponse.length > 300){
							textResponse= textResponse.substr(0, textResponse.indexOf("."));
					}
					console.log(textResponse);
					return textResponse;
				}
			}
		}
		console.log(response);
	}
	return false;
}

module.exports = WikipediaController;