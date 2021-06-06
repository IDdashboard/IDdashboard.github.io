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
        Spre.push(sp);
        Hpre.push(hp);
        deposit.push(d);
    }
    console.log(SS);
    // var ctx = document.getElementById('art').getContext('2d');
    var myChart = new Chart('h_chart', {
        data: {
            datasets: [{
                    type: 'line',
                    label: '실제',
                    data: Hdata,
                    yAxisID: "y",
                    borderColor: 'rgb(231, 26, 57)',
                    backgroundColor: 'rgba(231, 26, 57)',
                    steppedLine: true
                },{
                    type: 'line',
                    label: '예측',
                    data: Hpre,
                    yAxisID: "y",
                    borderColor: 'rgb(231, 26, 57, 0.5)',
                    backgroundColor: 'rgba(255,255,255)',
                    borderDash: [8,4],
                    steppedLine: true
                },
                {   
                    type: "bar",
                    label: '적중일',
                    data: HH,
                    yAxisID: "z",
                    backgroundColor: 'rgba(237, 33, 58, 0.3)'
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
                    max: Math.max.apply(Spre, Hpre)+1
                }, 
                z: {
                    id: 'z',
                    display: false,
                    type: 'linear',
                    position: 'right',
                    ticks: {
                        min: 0,
                        max: 1,
                        stepSize:1
                    }
                  }
            }
        }
    });
    var myChart = new Chart('s_chart',{
        data: {
            datasets: [{
                    type: 'line',
                    label: '실제',
                    data: Sdata,
                    yAxisID: "y",
                    borderColor: 'rgb(12, 77, 162)',
                    backgroundColor: 'rgba(12, 77, 162)',
                    steppedLine: true
                },{
                    type: 'line',
                    label: '예측',
                    data: Spre,
                    yAxisID: "y",
                    borderColor: 'rgb(12, 77, 162,0.5)',
                    backgroundColor: 'rgba(255,255,255)',
                    borderDash: [8,4],
                    steppedLine: true
                },
                {   
                    type: "bar",
                    label: '적중일',
                    data: SS,
                    yAxisID: "z",
                    backgroundColor: 'rgba(5, 117, 230, 0.3)'
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
                    max: Math.max.apply(Spre, Hpre)+1
                }, 
                z: {
                    id: 'z',
                    display: false,
                    type: 'linear',
                    position: 'right',
                    ticks: {
                        min: 0,
                        stepSize: 1,
                        max: 2
                    }
                  }
            }
        }
    });
}

