//Attempt to get selected title card
var rawtitle= document.querySelector(".previewModal--player-titleTreatment-logo");
if(rawtitle!=null){ //if a title is selected, perform actions
    var titleyear= document.querySelector(".videoMetadata--second-line").childNodes[0].innerHTML;
    //console.log(rawtitle.alt);
    let title= rawtitle.alt;
    title=title.replace(/ /g, "+");
    console.log(title);
    //const Url= "https://www.omdbapi.com/?t="+title+"&y="+titleyear+"&apikey=1867bf1d";
    const Url= "https://www.omdbapi.com/?t="+title+"&apikey=1867bf1d";
    console.log(Url);
    var omdbResults;
    fetch(Url)
    .then(data=>{
        return data.json();
    })
    .then(res=>{
        omdbResults=res;
        console.log(omdbResults);
    });
    // omdbResults={"Title":"Death Note","Year":"2017","Rated":"TV-MA","Released":"25 Aug 2017","Runtime":"101 min","Genre":"Action, Crime, Drama","Director":"Adam Wingard","Writer":"Charley Parlapanides, Vlas Parlapanides, Jeremy Slater","Actors":"Nat Wolff, LaKeith Stanfield, Margaret Qualley","Plot":"A high school student named Light Turner discovers a mysterious notebook that has the power to kill anyone whose name is written within its pages, and launches a secret crusade to rid the world of criminals.","Language":"English, Japanese, Spanish","Country":"United States","Awards":"N/A","Poster":"https://m.media-amazon.com/images/M/MV5BMTUwOTgzMTEyOF5BMl5BanBnXkFtZTgwNTk3MTM5MjI@._V1_SX300.jpg","Ratings":[{"Source":"Internet Movie Database","Value":"4.4/10"},{"Source":"Rotten Tomatoes","Value":"38%"},{"Source":"Metacritic","Value":"43/100"}],"Metascore":"43","imdbRating":"4.4","imdbVotes":"79,564","imdbID":"tt1241317","Type":"movie","DVD":"25 Aug 2017","BoxOffice":"N/A","Production":"N/A","Website":"N/A","Response":"True"};

    //Wait for api results to return before accessing values
    setTimeout(() => {
        console.log(omdbResults);
        //Check results and isolate data if movie found in db
        var titleNotFound=(omdbResults.Response=="False");
        if(titleNotFound==false){
            var ratings= omdbResults.Ratings;
            var imdbVotes=omdbResults.imdbVotes;
            var metaValue;
            var imdbValue;
            var imdbID=omdbResults.imdbID;
            var rottenValue;

            for(i=0; i<ratings.length; i++){
                let current= ratings[i];
                if (current.Source=="Metacritic")
                    console.log("Metacritic Score: ", current.Value);
                    metaValue="Metacritic Score: "+current.Value;

                if (current.Source=="Internet Movie Database")
                    //console.log("IMDB Score: ", current.Value, " (based on", imdbVotes, " votes)");
                    //imdbValue="IMDB Score: "+current.Value;
                    imdbValue=current.Value;
                if (current.Source=="Rotten Tomatoes")
                    //console.log("IRotten Tomatoes Score: ", current.Value);
                    rottenValue="Rotten Tomatoes Score: "+current.Value;
            }
        }

        //Create new div to hold IMDB rating content
        var ratingDiv = document.createElement("div");
        ratingDiv.style.class="wrapper";
        ratingDiv.style.setProperty("text-align", "center");
        ratingDiv.style.setProperty("float", "right");
        ratingDiv.style.setProperty("class", "wrapper");
        ratingDiv.style.setProperty("position", "relative");
        ratingDiv.id="ratingDiv";

        var textnodeLarge = document.createElement("a");
        textnodeLarge.href="https://www.imdb.com/title/"+imdbID;
        textnodeLarge.target="_blank";
        textnodeLarge.style.setProperty("font-size", "22px");
        textnodeLarge.addEventListener('mouseover', function(){
            event.target.style.color = "#CCCCCC";
        });
        textnodeLarge.addEventListener('mouseout', function(){
            event.target.style.color = "#FFFFFF";
        });

        // textnodeLarge.style.setProperty("text-decoration", "underline");
        // textnodeLarge.style.setProperty("text-decoration-thickness", "5%");




        //Create IMDB small text node
        var textnodeSmall = document.createElement("span");
        textnodeSmall.style.color="grey";
        textnodeSmall.style.setProperty("font-style", "italic")
        textnodeSmall.style.setProperty("font-size", "10px")

        // //IMDB icon formatting
        // var img = document.createElement("img");
        // img.innerHTML='<a href="https://www.imdb.com/?ref_=nv_home">'+img.innerHTML+'</a>';
        // img.style.class="icon";
        // img.src = "https://iconarchive.com/download/i80460/uiconstock/socialmedia/IMDb.ico";
        // img.style.width="80px";


        var img = document.createElement("a");
        img.href="https://www.imdb.com/?ref_=nv_home";
        img.target="_blank";
        img.innerHTML='<img class="icon" src="https://iconarchive.com/download/i80460/uiconstock/socialmedia/IMDb.ico" style="width:80px;">';


        //New div for rating text
        var textDiv = document.createElement("div");
        textDiv.style.setProperty("text-align", "center")
        textDiv.style.setProperty("padding-top", "20px")
        textDiv.style.setProperty("padding-right", "30px")
        textDiv.id="textNodeSmall";

        //New div for IMDB image
        var imgDiv = document.createElement("div");
        imgDiv.style.setProperty("text-align", "center");
        imgDiv.style.setProperty("float", "left");

        //Set text for rating
        if(titleNotFound==true){
            textnodeLarge.innerHTML="&nbsp&nbsp"+"N/A";
            textnodeSmall.innerHTML="";
            textDiv.style.setProperty("padding-top", "30px")
        }else{
            textnodeLarge.innerHTML="&nbsp"+imdbValue;
            textnodeSmall.innerHTML="</br>"+"("+imdbVotes+" votes)";
        }

        //Append nodes to divs if not on page already
        if(document.getElementById("ratingDiv")==null){
            textDiv.appendChild(textnodeLarge);
            textDiv.appendChild(textnodeSmall);
            imgDiv.appendChild(img);
            ratingDiv.appendChild(imgDiv);
            ratingDiv.appendChild(textDiv);

            //Add main div to right-side info for selected title
            document.querySelector(".previewModal--detailsMetadata-right").appendChild(ratingDiv);

            console.log(document.querySelector(".previewModal--detailsMetadata-right"));
            console.log(document.querySelector(".detail-modal-container").childNodes[1]);
        }

    }, 1000);

}
