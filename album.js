const autoChangeSlideBox = $('#autoChangeSlide');

isAutoChange = false;
slideIndex = 0;

autoChangeSlideBox.onclick = function () {
    isAutoChange = !isAutoChange;
    this.classList.toggle('active');
    if (!isAutoChange)
        clearInterval(albumInterval);
    loadAlbum();
}

function loadAlbum() {
    fetch('./data.json')
        .then(response => response.json())
        .then((data) => {
            album = data.songs[app.currentIndex].album;
            if (isAutoChange) {
                autoChangeslide(album);
            }
            else {
                $('#leftBtn').onclick = function () {
                    slideIndex--;
                    if (slideIndex < 0)
                        slideIndex = album.length - 1;
                    $('#nextSlide').style.backgroundImage = `url('${album[slideIndex]}')`;
                    chuyenSlideChoNutTrai();
                }

                $('#rightBtn').onclick = function () {
                    if (slideIndex >= album.length - 1)
                        slideIndex = 0;
                    else
                        slideIndex++;
                    $('#nextSlide').style.backgroundImage = `url('${album[slideIndex]}')`;
                    chuyenSlideChoNutPhai();
                }
            }
        });
}
function autoChangeslide(album) {
    directionRandom = 0;
    albumInterval = setInterval(function () {
        if (slideIndex >= album.length - 1)
            slideIndex = 0;
        else
            slideIndex++;
        $('#nextSlide').style.backgroundImage = `url('${album[slideIndex]}')`;
        if (directionRandom == 1) {
            chuyenSlideChoNutPhai();
            directionRandom = 0;
        }
        else {
            chuyenSlideChoNutTrai();
            directionRandom = 1;
        }
    }, 5000);
}

//When open web: auto change slide and auto animation
window.onload=function() {
    autoChangeSlideBox.click();
    randomAnimationBtn.click();
}