$(document).ready(function() {

    var GIPHY_API_KEY = "IKnQ0IRS696h5Z1Kpdsh5WEYRpANLepT";
    var GIPHY_API_LIMIT = "10";
    var GIPHY_API_OFFSET = "0";
    var GIPHY_API_RATING ="";
    var GIPHY_API_LANG ="en";
    var buttonsarray = ["dog","cat","hamster","fish","rabbit","monkey"];
    var search = $("#searchtext");
    var buttoncontainer = $("#buttoncontainer");
    var searchform = $("#seachform");
    var gifcontainer = $("#gifcontainer");

    populatebutton();

    searchform.on("submit",function(){
        searchgif(search.val());
        return false;
    });

    $("#buttoncontainer").on("click","button",function(){
        var tosearch = $(this).text();
        searchgif(tosearch);
    });

    $("#gifcontainer").on("click",".giphy_gif img",function(){
        var currentimg = $(this).attr("src");
        var swapimg = $(this).data("img_swap");
        $(this).attr("src",swapimg);
        $(this).data("img_swap",currentimg);
        
    });

    function populatebutton (){
        for(var i = 0; i < buttonsarray.length; i++) {
            buttoncontainer.append(
                "<button>"+
                buttonsarray[i] +
                "</button>"
                );
        }
    }

    function clearall() {
        gifcontainer.html("");
        search.val("");
        buttoncontainer.html("");
    }

    function searchgif(searchthis) {
        var seachterm = searchthis;
        clearall();

        if (seachterm !== ""){

            if(!checkduplicate(seachterm,buttonsarray)) {
                buttonsarray.push(seachterm);
            }

            var giphysearch = "https://api.giphy.com/v1/gifs/search?api_key=";
            giphysearch += GIPHY_API_KEY;
            giphysearch += "&q=";
            giphysearch += seachterm;
            giphysearch += "&limit=";
            giphysearch += GIPHY_API_LIMIT;
            giphysearch += "&offset=";
            giphysearch += GIPHY_API_OFFSET;
            giphysearch += "&rating=";
            giphysearch += GIPHY_API_RATING;
            giphysearch += "&lang=";
            giphysearch += GIPHY_API_LANG;
    
            $.ajax({
                url: giphysearch,
    
            }).done(function(data){
                addgifs(data.data);
            }).fail(function() {
                console.log("fail");
            });

        }

        populatebutton();

    }

    function addgifs(gifarray) {
        for(var i = 0; i < gifarray.length; i++) {
            gifcontainer.append(
                "<div class='giphy_gif'>"+
                "<img src='"+
                gifarray[i].images.fixed_height_still.url+
                "' data-img_swap='"+
                gifarray[i].images.fixed_height.url+
                "'>"+
                "<p>"+
                gifarray[i].rating+
                "<p>"+
                "</div>"
            );
        }
    }

    function checkduplicate(thestring,thearray) {
        for (var i = 0; i < thearray.length; i++) {
            if (thearray[i] === thestring){
                return true;
            }
        }
        return false;
    }

});


