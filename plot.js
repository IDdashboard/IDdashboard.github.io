d3.csv("dataset/data.csv").then(read);
Sy=[], Hy=[], SS=[], HH=[], Spre=[], Hpre=[], date=[];
// Sy : S금리대비, Hy : H금리대비
// SS : S적중일, HH : H적중일
// Spre : S예측, Hpre : H예측
// label = 날짜

function read(data){
    function read_csv() {
        for (let j =0; j<data.length; j++){
        Sy.push(Number(data[j].Sy));
        Hy.push(Number(data[j].Hy));
        SS.push(Number(data[j].SS));
        HH.push(Number(data[j].HH));                
        date.push(String(data[j].date));
        Spre.push(Number(data[j].Spre));
        Hpre.push(Number(data[j].Hpre));
        }
    }
    read_csv();    

    function readChart(index=30) {
        readSy=[], readHy=[], readSS=[], readHH=[], readSpre=[], readHpre=[], readdate=[];
        var k=0, d=0, s=0, sp=0, hp=0, ss=0, hh=0, p=0, p2=0;
        hcorrect=0, scorrect=0;
        // console.log(SS.slice(-index-1,-1));
        for (let i = 0; i < index; i++) {
            k = k + Number(Sy[Sy.length-index+i]);
            s = s + Number(Hy[Hy.length-index+i]);        
            hp = hp + Number(Hpre[Hpre.length-index+i]);
            sp = sp + Number(Spre[Spre.length-index+i]);
            ss = Number(SS[SS.length-index+i]);
            hh = Number(HH[HH.length-index+i]);
            readSy.push(k);
            readHy.push(s);
            readSS.push(ss);
            readHH.push(hh);
            readSpre.push(sp);
            readHpre.push(hp);

            //적중률 계산
            hcorrect = hcorrect+hh;
            scorrect = scorrect+ss;
            console.log(scorrect);
        }
        readdate = date.slice(-index-1,-1);
        console.log(hcorrect);
        return readHy, readHpre, readHH, readdate, readSy, readSpre, readSS, hcorrect, scorrect;
    }
    
    function makeChart() {
        readChart();
        var ctx = document.getElementById('h_chart').getContext("2d");
        var gradientStroke = ctx.createLinearGradient(500, 0, 100, 0);
        gradientStroke.addColorStop(0, "#F25C05");
        gradientStroke.addColorStop(1, "#F2B705"); 

        var config = {
            data: {
                datasets: [{
                        type: 'line',
                        label: '실제',
                        data: readHy,
                        yAxisID: "y",
                        borderColor: gradientStroke,
                        backgroundColor: gradientStroke,
                        fill: false,                
                        steppedLine: true
                    },{
                        type: 'line',
                        label: '예측',
                        data: readHpre,
                        yAxisID: "y",
                        borderColor: 'rgb(242, 183, 5)',
                        backgroundColor: 'rgba(255,255,255)',
                        borderDash: [8,4],
                        steppedLine: true
                    },
                    {   
                        type: "bar",
                        label: '적중일',
                        data: readHH,
                        yAxisID: "z",
                        backgroundColor: 'rgba(102, 102, 102, 0.5)'
                    }],
                labels: readdate
            },
            options: {
                responsive: true,
                legend: {
                    display: true,
                    position: 'bottom'
                },
                scales: { 
                    y: {
                        id: 'y',
                        display: true,
                        type: 'linear',
                        position: 'left',
                        max: 30                    
                    }, 
                    z: {
                        id: 'z',
                        display: false,
                        type: 'linear',
                        position: 'right',
                        max: 8,
                        min: 0,
                        reverse: true            
                    },
                    x: {
                        ticks: {
                            autoSkip: true,
                            maxRotation: 0,
                            minRotation: 0
                        }
                    }
                }
            }
        };
        var myChart = new Chart(ctx, config);

        var sctx = document.getElementById('s_chart').getContext("2d");
        var gradientStroke = sctx.createLinearGradient(500, 0, 100, 0);
        gradientStroke.addColorStop(0, "#0c4da2");
        gradientStroke.addColorStop(1, "#C216F2");

        var sconfig = {
            data: {
                datasets: [{
                        type: 'line',
                        label: '실제',
                        data: readSy,
                        yAxisID: "y",
                        borderColor: gradientStroke,
                        backgroundColor: gradientStroke,
                        steppedLine: true
                    },{
                        type: 'line',
                        label: '예측',
                        data: readSpre,
                        yAxisID: "y",
                        borderColor: 'rgba(194, 22, 242, 0.6)',
                        backgroundColor: 'rgba(255,255,255)',
                        borderDash: [8,4],
                        steppedLine: true
                    },
                    {   
                        type: "bar",
                        label: '적중일',
                        data: readSS,
                        yAxisID: "z",
                        backgroundColor: 'rgba(102, 102, 102, 0.5)'
                    }],
                labels: readdate
            },
            options: {
                responsive: true,
                legend: {
                    display: true,
                    position: 'bottom'
                },
                scales: {
                    y: {
                        id: 'y',
                        display: true,
                        type: 'linear',
                        position: 'left',
                        max: 30                   
                    }, 
                    z: {
                        id: 'z',
                        display: false,
                        type: 'linear',
                        position: 'right',
                        max: 8,
                        min: 0,
                        reverse: true                    
                    },
                    x: {
                        ticks: {
                            autoSkip: true,
                            maxRotation: 0,
                            minRotation: 0
                        }
                    }
                }
            }
        };
        var myChart2 = new Chart(sctx, sconfig);
        var year_up=50.4, year_down =49.6;
        var month6_up=52.4, month6_down=47.6;
        var month_up=38.0, month_down=62.0;
        
        var syear_up=50.4, syear_down =49.6;
        var smonth6_up=48.3, smonth6_down=51.7;
        var smonth_up=47.6, smonth_down=52.4;
        
        document.getElementById('btn_month').onclick = function(){
            myChart.destroy();
            myChart2.destroy();
            var index = 30;
            readHy, readHpre, readHH, readdate, readSy, readSpre, readSS, hcorrect, scorrect= readChart(index);
            console.log(hcorrect);
            var data = myChart.config.data;        
            data.datasets[0].data = readHy;
            data.datasets[1].data = readHpre;
            data.datasets[2].data = readHH;
            data.labels = readdate;
            myChart.config.options.scales.y.max = index;
            myChart = new Chart(ctx, config);
            myChart.update();
            var data2 = myChart2.config.data;
            data2.datasets[0].data = readSy;
            data2.datasets[1].data = readSpre;
            data2.datasets[2].data = readSS;
            data2.labels = readdate;
            myChart2.config.options.scales.y.max = index;
            myChart2 = new Chart(sctx, sconfig);
            myChart2.update();

            jQuery('.redhigh > span > i').text(" " + month_up + "%");
            jQuery('.sredhigh > span > i').text(" " + smonth_up + "%");
            jQuery('.bluehigh > span > i').text(" " + month_down + "%");
            jQuery('.sbluehigh > span > i').text(" " +smonth_down + "%");
            jQuery('.hb-highlight').text(" " +(hcorrect/index*100).toFixed(2) + "%");
            jQuery('.sb-highlight').text(" " +(scorrect/index*100).toFixed(2) + "%");
            jQuery('.h-explain, s-explain').text("30일, 개장일 기준");         
            jQuery(".redhigh > span > i, .sredhigh > span > i, .bluehigh > span > i, .sbluehigh > span > i").animate({opacity:0.4},200);
            jQuery(".redhigh > span > i, .sredhigh > span > i, .bluehigh > span > i, .sbluehigh > span > i").animate({opacity:1},200);
            jQuery('#btn_month').css('background', 'linear-gradient(to bottom, #0093DD, #5AC3E1');
            jQuery('#btn_year, #btn_6month, #btn_ori').css('background', 'white');

        }

        
        document.getElementById('btn_6month').onclick = function(){
            myChart.destroy();
            myChart2.destroy();
            var index = 120;
            readHy, readHpre, readHH, readdate, readSy, readSpre, readSS, hcorrect, scorrect = readChart(index);
            var data = myChart.config.data;        
            data.datasets[0].data = readHy;
            data.datasets[1].data = readHpre;
            data.datasets[2].data = readHH;
            data.labels = readdate;
            myChart.config.options.scales.y.max = index;            
            myChart = new Chart(ctx, config);        
            myChart.update();
            var data2 = myChart2.config.data;
            data2.datasets[0].data = readSy;
            data2.datasets[1].data = readSpre;
            data2.datasets[2].data = readSS;
            data2.labels = readdate;
            myChart2.config.options.scales.y.max = index;
            myChart2 = new Chart(sctx, sconfig);
            myChart2.update();


            jQuery('.redhigh > span > i').text(" " + month6_up + "%");
            jQuery('.sredhigh > span > i').text(" " + smonth6_up + "%");
            jQuery('.bluehigh > span > i').text(" " + month6_down + "%");
            jQuery('.sbluehigh > span > i').text(" " +smonth6_down + "%");
            jQuery('.hb-highlight').text(" " +(hcorrect/index*100).toFixed(2) + "%");
            jQuery('.sb-highlight').text(" " +(scorrect/index*100).toFixed(2) + "%");
            jQuery('.h-explain, s-explain').text("120일, 개장일 기준");
            jQuery(".redhigh > span > i, .sredhigh > span > i, .bluehigh > span > i, .sbluehigh > span > i").animate({opacity:0.4},200);
            jQuery(".redhigh > span > i, .sredhigh > span > i, .bluehigh > span > i, .sbluehigh > span > i").animate({opacity:1},200);
            jQuery('#btn_6month').css('background', 'linear-gradient(to bottom, #0093DD, #5AC3E1');
            jQuery('#btn_month, #btn_year, #btn_ori').css('background', 'white');
        }


        document.getElementById('btn_year').onclick = function(){
            myChart.destroy();
            myChart2.destroy();
            index = 250;
            readHy, readHpre, readHH, readdate, readSy, readSpre, readSS, hcorrect, scorrect = readChart(index);
            var data = myChart.config.data;        
            data.datasets[0].data = readHy;
            data.datasets[1].data = readHpre;
            data.datasets[2].data = readHH;
            data.labels = readdate;
            myChart.config.options.scales.y.max = index;
            myChart = new Chart(ctx, config);
            myChart.update();
            var data2 = myChart2.config.data;
            data2.datasets[0].data = readSy;
            data2.datasets[1].data = readSpre;
            data2.datasets[2].data = readSS;
            data2.labels = readdate;
            myChart2.config.options.scales.y.max = index;
            myChart2 = new Chart(sctx, sconfig);
            myChart2.update();

            jQuery('.redhigh > span > i').text(" " + year_up + "%");
            jQuery('.sredhigh > span > i').text(" " + syear_up + "%");
            jQuery('.bluehigh > span > i').text(" " + year_down + "%");
            jQuery('.sbluehigh > span > i').text(" " +syear_down + "%");
            jQuery('.hb-highlight').text(" " +(hcorrect/index*100).toFixed(2) + "%");
            jQuery('.sb-highlight').text(" " +(scorrect/index*100).toFixed(2) + "%");
            jQuery('.h-explain, s-explain').text("250일, 개장일 기준");         
            // jQuery('.s-explain').text("1개월, 개장일 기준");
            jQuery(".redhigh > span > i, .sredhigh > span > i, .bluehigh > span > i, .sbluehigh > span > i").animate({opacity:0.4},200);
            jQuery(".redhigh > span > i, .sredhigh > span > i, .bluehigh > span > i, .sbluehigh > span > i").animate({opacity:1},200);            
            jQuery('#btn_year').css('background', 'linear-gradient(to bottom, #0093DD, #5AC3E1');
            jQuery('#btn_month, #btn_6month, #btn_ori').css('background', 'white');
        }

        
    }
    makeChart();
}
// 위 배열들은 모두 csv파일에서 필요한 부분 전체를 읽어온 뒤 각 기간 인덱스 버튼에 맞게 설정