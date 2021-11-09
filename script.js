document.addEventListener('DOMContentLoaded', function() {
    strFetch = 'https://api.nasa.gov/planetary/apod?api_key=68XutEhNvRO6HYZVOIXu0ozddtbcuM0wufBDX2rV';

    getPicture(strFetch);
});

function changeBodyClassName() {
    document.getElementById('pic_body').setAttribute('class', 'pic-body-shown');
}

function mediaType(mType, jsonRequest) {
    if (mType === 'video') {
        document.getElementById('pic_photo').setAttribute('class', 'pic-hidden');
        document.getElementById('pic_video').setAttribute('src', jsonRequest);
    } else {
        document.getElementById('pic_video').setAttribute('class', 'pic-hidden');
        document.getElementById('pic_photo').setAttribute('src', jsonRequest);
    }
}

function downloadPicture(mType, jsonRequest) {
    if (mType === 'video') {
        document.getElementById('pic_download').setAttribute('class', 'pic-hidden');
    } else {
        document.getElementById('pic_download').setAttribute('href', jsonRequest); //.href = jsonRequest; //request.response['hdurl'];
    }
}

function getPicture(strFetch) {
    var request = new XMLHttpRequest();
    
    request.open('GET', strFetch, true);
    request.responseType = 'json';

    request.onload = function () {
        if (this.readyState === 4) {
            if (this.status != 200) {
                document.getElementById('pic_title_h1').innerHTML = 'Oops, something went wrong...';  
            } 
            else {
                document.getElementById('pic_title_h1').innerHTML = request.response['title'];
                document.getElementById('pic_date').innerHTML = request.response['date'].replace(/-/gm, '.');
                document.getElementById('pic_exp').innerHTML = request.response['explanation'];

                if (request.response['copyright'] == undefined) {
                    document.getElementById('pic_info').innerHTML = 'Unknown Author'
                } else {
                    document.getElementById('pic_info').innerHTML = 'Photo by ' + request.response['copyright'];
                }

                mediaType(request.response['media_type'], request.response['url'])
                downloadPicture(request.response['media_type'], request.response['hdurl'])
                changeBodyClassName()
            } 
        }
    };
    request.send();
}
