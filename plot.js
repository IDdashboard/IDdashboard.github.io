d3.csv("dataset/data.csv").then(makeChart);

function makeChart(sdata) {
    var Sdata = [];
    var Hdata = [];                //데이터를 저장할 배열을 준비
    var deposit = [];
    var label = [];
    var Spre = [];
    var Sori = [];
    var Spori = [];
    var Hori = [];
    var Hpori = [];
    var Hpre = [];
    var SS = [];
    var HH = [];
    var k =0;
    var d =0;
    var s = 0;
    var sp = 0;
    var hp = 0;
    var ss = 0;
    var hh = 0;
    var p =0, p2=0;
    var index = 30; //10일 보기
    for (let i = 0; i < index; i++) {              
        k = k + Number(sdata[sdata.length-1-index+i].Sy)
        s = s + Number(sdata[sdata.length-1-index+i].Hy)
        d = d + Number(sdata[sdata.length-1-index+i].deposit)
        hp = hp + Number(sdata[sdata.length-1-index+i].Hpre)
        sp = sp + Number(sdata[sdata.length-1-index+i].Spre)
        ss = Number(sdata[sdata.length-1-index+i].SS)
        hh = Number(sdata[sdata.length-1-index+i].HH)
        Sdata.push(k);    //item1의 레이블 데이터만 추출
        Hdata.push(s);
        SS.push(ss);
        HH.push(hh);
        Sori.push(sdata[sdata.length-1-index+i].Sy);
        Spori.push(sdata[sdata.length-1-index+i].Spre);
        Hori.push(sdata[sdata.length-1-index+i].Hy);
        Hpori.push(sdata[sdata.length-1-index+i].Hpre);
        label.push(sdata[sdata.length-1-index+i].date);
        p = p+hh;
        p2 = p2+ss;
        Spre.push(sp);
        Hpre.push(hp);
        deposit.push(d);
    }
    var h_correct = p/index*100;
    var s_correct = p2/index*100;
    console.log(h_correct, s_correct);
    // var ctx = document.getElementById('art').getContext('2d');
    var ctx = document.getElementById('h_chart').getContext("2d");
    var gradientStroke = ctx.createLinearGradient(500, 0, 100, 0);
    gradientStroke.addColorStop(0, "#F25C05");
    gradientStroke.addColorStop(1, "#F2B705"); 
    var myChart = new Chart('h_chart', {
        data: {
            datasets: [{
                    type: 'line',
                    label: '실제',
                    data: Hdata,
                    yAxisID: "y",
                    borderColor: gradientStroke,
                    backgroundColor: gradientStroke,
                    fill: false,                
                    steppedLine: true
                },{
                    type: 'line',
                    label: '예측',
                    data: Hpre,
                    yAxisID: "y",
                    borderColor: 'rgb(242, 183, 5)',
                    backgroundColor: 'rgba(255,255,255)',
                    borderDash: [8,4],
                    steppedLine: true
                },
                {   
                    type: "bar",
                    label: '적중일',
                    data: HH,
                    yAxisID: "z",
                    backgroundColor: 'rgba(102, 102, 102, 0.5)'
                }],
            labels: label
        },
        options: {
            responsive: false,
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
                    max: Math.max.apply(Spre, Hpre)+3
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
    });
    var sctx = document.getElementById('s_chart').getContext("2d");
    var gradientStroke = sctx.createLinearGradient(500, 0, 100, 0);
    gradientStroke.addColorStop(0, "#0c4da2");
    gradientStroke.addColorStop(1, "#C216F2");

    var myChart = new Chart('s_chart',{
        data: {
            datasets: [{
                    type: 'line',
                    label: '실제',
                    data: Sdata,
                    yAxisID: "y",
                    borderColor: gradientStroke,
                    backgroundColor: gradientStroke,
                    steppedLine: true
                },{
                    type: 'line',
                    label: '예측',
                    data: Spre,
                    yAxisID: "y",
                    borderColor: 'rgba(194, 22, 242, 0.6)',
                    backgroundColor: 'rgba(255,255,255)',
                    borderDash: [8,4],
                    steppedLine: true
                },
                {   
                    type: "bar",
                    label: '적중일',
                    data: SS,
                    yAxisID: "z",
                    backgroundColor: 'rgba(102, 102, 102, 0.5)'
                }],
            labels: label
        },
        options: {
            responsive: false,
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
                    max: Math.max.apply(Spre, Hpre)+3
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
    });    
}
