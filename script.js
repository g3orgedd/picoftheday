document.addEventListener("DOMContentLoaded", function() {
    strFetch = "https://api.nasa.gov/planetary/apod?api_key=68XutEhNvRO6HYZVOIXu0ozddtbcuM0wufBDX2rV";

    getPic(strFetch);
});

function changeClassName() {
    document.getElementById("pic_body").className = "pic-body-shown";
}

function getPic(strFetch) {
    var request = new XMLHttpRequest();
    
    request.open('GET', strFetch, true);
    request.responseType = 'json';

    request.onload = function () {
        if (this.readyState === 4) {
            if (this.status != 200) {
                document.getElementById("pic_title_h1").innerHTML = 'Oops, something went wrong...';  
            } 
            else {
                document.getElementById("pic_title_h1").innerHTML = request.response['title'];
                document.getElementById("pic_date").innerHTML = request.response['date'].replace(/-/gm, '.');
                document.getElementById("pic_photo").src = request.response['url'];
                document.getElementById("pic_exp").innerHTML = request.response['explanation'];
                
                if (request.response['copyright'] == undefined) {
                    document.getElementById("pic_info").innerHTML = 'Unknown Author'
                } else {
                    document.getElementById("pic_info").innerHTML = 'Photo by ' + request.response['copyright'];
                }

                document.getElementById("pic_download").href = request.response['hdurl'];
                
                changeClassName()
            } 
        }
    };
    request.send();
}