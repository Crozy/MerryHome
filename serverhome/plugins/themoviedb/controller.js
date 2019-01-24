const request = require('sync-request');

class WikipediaController {
    
    constructor(io){
            this.io = io;
    }
    
    postAction(req, res){
        switch(req.params.actionId){
			case "SearchSerie": 
			resultatMovies("tv", req, res);
			break;
			case "SearchSerie1": 
			resultatMovies("tv", req, res);
			break;
			case "SearchSerie2": 
			resultatMovies("tv", req, res);
			break;
			case "SearchSerie3": 
			resultatMovies("tv", req, res);
			break;
			case "SearchSerie4": 
			resultatMovies("tv", req, res);
			break;
			case "SearchMovie": 
			resultatMovies("movie", req, res);
			break;
			case "SearchMovie1": 
			resultatMovies("movie", req, res);
			break;
			case "SearchMovie2": 
			resultatMovies("movie", req, res);
			break;
			case "SearchMovie3": 
			resultatMovies("movie", req, res);
			break;
			case "SearchMovie4": 
			resultatMovies("movie", req, res);
			break;
			case "TopMovies": 
			resultatTop("movie", req, res);
			break;
			case "TopSeries": 
			resultatTop("tv", req, res);
			break;
			case "VideoSerie":
			getVideo("tv", req, res);
			break;
			case "VideoMovie":
			getVideo("movie", req, res);
			break;
            default:
                res.end(JSON.stringify({}));
                break;
            
        }
    }
}

//movieOrSerie -> tv ou movie
function resultatMovies(movieOrSerie, req, res){
	var requestUrl="https://api.themoviedb.org/3/search/" + movieOrSerie + "?query=" + req.body.searchValue + "&api_key=829549883362a2a4620637ad10662863&language=fr-FR&page=1";
			console.log(requestUrl);
			var wikiReq = request('GET', encodeURI(requestUrl),{cache:'file'});
			var response = JSON.parse(wikiReq.getBody('utf8'));
			res.end(JSON.stringify({response}));
}

function resultatTop(movieOrSerie, req, res){
	var requestUrl="https://api.themoviedb.org/3/discover/" + movieOrSerie + "?api_key=829549883362a2a4620637ad10662863&language=fr-FR";
			console.log(requestUrl);
			var wikiReq = request('GET', requestUrl,{cache:'file'});
			var response = JSON.parse(wikiReq.getBody('utf8'));
			res.end(JSON.stringify({response}));
}

function getVideo(movieOrSerie, req, res){
	var requestUrl="https://api.themoviedb.org/3/search/" + movieOrSerie + "?query=" + req.body.searchValue + "&api_key=829549883362a2a4620637ad10662863&language=fr-FR&page=1";
			console.log(requestUrl);
			var wikiReq = request('GET', encodeURI(requestUrl),{cache:'file'});
			console.log(wikiReq.statusCode);
			var response = JSON.parse(wikiReq.getBody('utf8'));
			var dataList = response.results ? response.results : [];
			var id = 0;
			if(movieOrSerie == "tv"){
				for(i = 0;i<dataList.length;i++){
					if(req.body.searchValue.toLowerCase() == dataList[i].name.toLowerCase()){
						id = dataList[i].id;
					}
				}
			}
			if(movieOrSerie == "movie"){
				for(i = 0;i<dataList.length;i++){
					if(req.body.searchValue.toLowerCase() == dataList[i].title.toLowerCase()){
						id = dataList[i].id;
					}
				}
			}
			console.log("Le DATA : " + id);
			var requestUrl="https://api.themoviedb.org/3/" + movieOrSerie + "/" + id + "/videos?api_key=829549883362a2a4620637ad10662863";
			console.log(requestUrl);
			var wikiReq = request('GET', requestUrl,{cache:'file'});
			if(wikiReq.statusCode == 200){
			var response = JSON.parse(wikiReq.getBody('utf8'));
			res.end(JSON.stringify({response}));
			}else{
			 	res.end(JSON.stringify(wikiReq));
			 }
			//res.end(JSON.stringify(false));
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