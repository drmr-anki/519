function drawChartCompare(DataC1, DataC2, clubName){
	let main = document.getElementById("main");
	let existInstance = echarts.getInstanceByDom(main);
	if (existInstance) {
    if (true) {
        echarts.dispose(existInstance);
    }
	}
	let myChart = echarts.init(main);


var schema = [
    {name:'year', index:0,text:'Season'},
    {name: 'date', index: 1, text: 'GA'},
    {name: 'AQIindex', index: 2, text: 'GS'},
    {name: 'PM25', index: 3, text: 'Passing'},
    {name: 'PM10', index: 4, text: 'Points'},
    {name: 'CO', index: 5, text: 'Possession'},
    {name: 'NO2', index: 6, text: 'Shooting'},
    {name: 'SO2', index: 7, text: 'Cost'},
    {name: '等级', index: 8, text: 'Rank'}
];

var lineStyle = {
    normal: {
        width: 3,
        opacity: 0.5
    }
};

option = {
    backgroundColor: '#333',
    legend: {
        bottom: 30,
        data: clubName,
        itemGap: 20,
        textStyle: {
            color: '#fff',
            fontSize: 14
        }
    },
    tooltip: {
        padding: 10,
        backgroundColor: '#222',
        borderColor: '#777',
        borderWidth: 1,
        formatter: function (obj) {
            var value = obj[0].value;
            return '<div style="border-bottom: 1px solid rgba(255,255,255,.3); font-size: 18px;padding-bottom: 7px;margin-bottom: 7px">'
                + obj[0].seriesName + ' ' + value[0] + '日期：'
                + value[7]
                + '</div>'
                + schema[1].text + '：' + value[1] + '<br>'
                + schema[2].text + '：' + value[2] + '<br>'
                + schema[3].text + '：' + value[3] + '<br>'
                + schema[4].text + '：' + value[4] + '<br>'
                + schema[5].text + '：' + value[5] + '<br>'
                + schema[6].text + '：' + value[6] + '<br>';
        }
    },
    // dataZoom: {
    //     show: true,
    //     orient: 'vertical',
    //     parallelAxisIndex: [0]
    // },
    parallelAxis: [
        {dim: 0, name: schema[0].text, inverse: true, nameLocation: 'start', scale: true},
        {dim: 1, name: schema[1].text},
        {dim: 2, name: schema[2].text},
        {dim: 3, name: schema[3].text},
        {dim: 4, name: schema[4].text},
        {dim: 5, name: schema[5].text},
        {dim: 6, name: schema[6].text},
        {dim: 7, name: schema[7].text},
        {dim: 8, name: schema[8].text, inverse: true, nameLocation: 'start'}
    ],
    // visualMap: {
    //     show: true,
    //     min: 0,
    //     max: 150,
    //     dimension: 2,
    //     inRange: {
    //         color: ['#d94e5d','#eac736','#50a3ba'].reverse(),
    //         // colorAlpha: [0, 1]
    //     }
    // },
    parallel: {
        left: '5%',
        right: '18%',
        bottom: 100,
        parallelAxisDefault: {
            type: 'value',
            name: 'AQI指数',
            nameLocation: 'end',
            nameGap: 20,
            nameTextStyle: {
                color: '#fff',
                fontSize: 12
            },
            axisLine: {
                lineStyle: {
                    color: '#aaa'
                }
            },
            axisTick: {
                lineStyle: {
                    color: '#777'
                }
            },
            splitLine: {
                show: false
            },
            axisLabel: {
                textStyle: {
                    color: '#fff'
                }
            }
        }
    },
    series: [
        {
            name: clubName[0],
            type: 'parallel',
            lineStyle: lineStyle,
            data: DataC1
        },

        {
            name: clubName[1],
            type: 'parallel',
            lineStyle: lineStyle,
            data: DataC2
        }
    ]
};

	myChart.setOption(option);

}
