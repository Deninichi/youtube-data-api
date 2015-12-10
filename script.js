var nextPageToken, prevPageToken;
var count = 1;
function onClientLoad() {
    gapi.client.load('youtube', 'v3', onYouTubeApiLoad);
}

function onYouTubeApiLoad() {
    gapi.client.setApiKey('AIzaSyAATVsbGeW7bNnE7mX1ln7Lyy86VScqlO0');
    search();
}

function search(pageToken) {
    $('#search-container').html('');     
    var requestOptions = {
        q: "spring MVC",
        part: 'snippet', 
        maxResults: 5,
        type: "video",
    }
    if (pageToken) {
        requestOptions.pageToken = pageToken;
    }
    var request = gapi.client.youtube.search.list(requestOptions);
    request.execute(function(response) {  

        nextPageToken = response.result.nextPageToken;
        var nextVis;
        if (nextPageToken && count < 4){
            nextVis = 'visible';
        }
        else{
            nextVis = 'hidden';
        }
        $('#next-button').css('visibility', nextVis);
        
        prevPageToken = response.result.prevPageToken
        var prevVis = prevPageToken ? 'visible' : 'hidden';
        $('#prev-button').css('visibility', prevVis);
        
        var results = response.result.items;
        $("#count").html('Страница ' + count);
        $.each(results, function(index, item){
            displayResult(item);
        });
    });
 }; 
    
function displayResult(videoSnippet){
        var title = videoSnippet.snippet.title;
        var thumbUrl = videoSnippet.snippet.thumbnails.default.url;
        var videoId = videoSnippet.id.videoId; 
        $("#search-container").append('<div style="padding-bottom: 20px;"><a href="https://www.youtube.com/watch?v=' + videoId + '"><img src="'+thumbUrl+'" /></a><a href="https://www.youtube.com/watch?v=' + videoId + '"><span>' + title + '</span></a></div>');
    }
    
function nextPage() {
    count++;
    search(nextPageToken);
}

function previousPage() {
    count--;
    search(prevPageToken);
}   