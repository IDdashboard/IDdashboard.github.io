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

function indicator_btn(te){
    var year_up=50.4, year_down =49.6;
    var month6_up=52.4, month6_down=47.6;
    var month_up=38.0, month_down=62.0;
    var ori_up=49.7, ori_down=50.3;
    
    var syear_up=50.4, syear_down =49.6;
    var smonth6_up=48.3, smonth6_down=51.7;
    var smonth_up=47.6, smonth_down=52.4;
    var sori_up=50.1, sori_down=49.9;

    var term = jQuery(te).attr('id');
    // var term = jQuery('button').attr('id')
    console.log(term);
    
    switch (term) {
        case "btn_year":
            jQuery('.redhigh > span > i').text(" " + year_up + "%");
            jQuery('.sredhigh > span > i').text(" " + syear_up + "%");
            jQuery('.bluehigh > span > i').text(" " + year_down + "%");
            jQuery('.sbluehigh > span > i').text(" " +syear_down + "%");            
            jQuery(".redhigh > span > i, .sredhigh > span > i, .bluehigh > span > i, .sbluehigh > span > i").animate({opacity:0.4},200);
            jQuery(".redhigh > span > i, .sredhigh > span > i, .bluehigh > span > i, .sbluehigh > span > i").animate({opacity:1},200);            
            jQuery('#btn_year').css('background', 'linear-gradient(to bottom, #0093DD, #5AC3E1');
            jQuery('#btn_month, #btn_6month, #btn_ori').css('background', 'white');
            break;
        case "btn_6month":
            jQuery('.redhigh > span > i').text(" " + month6_up + "%");
            jQuery('.sredhigh > span > i').text(" " + smonth6_up + "%");
            jQuery('.bluehigh > span > i').text(" " + month6_down + "%");
            jQuery('.sbluehigh > span > i').text(" " +smonth6_down + "%");
            jQuery(".redhigh > span > i, .sredhigh > span > i, .bluehigh > span > i, .sbluehigh > span > i").animate({opacity:0.4},200);
            jQuery(".redhigh > span > i, .sredhigh > span > i, .bluehigh > span > i, .sbluehigh > span > i").animate({opacity:1},200);
            jQuery('#btn_6month').css('background', 'linear-gradient(to bottom, #0093DD, #5AC3E1');
            jQuery('#btn_month, #btn_year, #btn_ori').css('background', 'white');
            break;
        case "btn_month":
            jQuery('.redhigh > span > i').text(" " + month_up + "%");
            jQuery('.sredhigh > span > i').text(" " + smonth_up + "%");
            jQuery('.bluehigh > span > i').text(" " + month_down + "%");
            jQuery('.sbluehigh > span > i').text(" " +smonth_down + "%");
            jQuery(".redhigh > span > i, .sredhigh > span > i, .bluehigh > span > i, .sbluehigh > span > i").animate({opacity:0.4},200);
            jQuery(".redhigh > span > i, .sredhigh > span > i, .bluehigh > span > i, .sbluehigh > span > i").animate({opacity:1},200);
            jQuery('#btn_month').css('background', 'linear-gradient(to bottom, #0093DD, #5AC3E1');
            jQuery('#btn_year, #btn_6month, #btn_ori').css('background', 'white');
            break;
        case "btn_ori":
            jQuery('.redhigh > span > i').text(" " + ori_up + "%");
            jQuery('.sredhigh > span > i').text(" " + sori_up + "%");
            jQuery('.bluehigh > span > i').text(" " + ori_down + "%");
            jQuery('.sbluehigh > span > i').text(" " + sori_down + "%");
            jQuery(".redhigh > span > i, .sredhigh > span > i, .bluehigh > span > i, .sbluehigh > span > i").animate({opacity:0.4},200);
            jQuery(".redhigh > span > i, .sredhigh > span > i, .bluehigh > span > i, .sbluehigh > span > i").animate({opacity:1},200);
            jQuery('#btn_ori').css('background', 'linear-gradient(to bottom, #0093DD, #5AC3E1');
            jQuery('#btn_month, #btn_6month, #btn_year').css('background', 'white');
            break;
    }   
}