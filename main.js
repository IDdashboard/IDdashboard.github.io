//follow quick menu
$(window).scroll(function () {
    var scrollTop = $(document).scrollTop();
    if (scrollTop < 150) {
        scrollTop = 160;
    } else if(scrollTop > 200){
        scrollTop = 170;
    }
    $("#followquick").stop();
    $("#followquick").animate({ "top": scrollTop });
});

var img1 = document.getElementById('#img1');
function togcheck() {
    var src = jQuery('#img1').attr('src')
    switch (src) {
        case "img/boy.png" :
            document.getElementById('img1').src ='img/girl.png';
            break;
        case "img/girl.png" :
            document.getElementById('img1').src= "img/boy.png";
            break;
    }
}