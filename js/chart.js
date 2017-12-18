function drawChart(radarData, radarDataPrev, Season, costData, rankData){
	let main = document.getElementById("main");
	let existInstance = echarts.getInstanceByDom(main);
	if (existInstance) {
    if (true) {
        echarts.dispose(existInstance);
    }
	}
	let myChart = echarts.init(main);
	// echarts.init(document.getElementById('main')).dispose();

	// Data
	// Season => Year
	// var Season = ["10/11","11/12","12/13","13/14","14/15","15/16","16/17"];
	// var radarData = [];
	var radarDataPrev = radarData;
	var maxDataSingle = 25;
	var maxData = [maxDataSingle,maxDataSingle,maxDataSingle,maxDataSingle,maxDataSingle,maxDataSingle,maxDataSingle];
	// var costData = [355,280,801,2693,550,1783,2899];
	// var rankData =[];

	//7 years with 9 element each year
	// radarData.unshift([49,33,330,11649,400,379]);
	// radarData.unshift([38,45,416,12864,314,429]);
	// radarData.unshift([66,41,426,12329,331,483]);
	// radarData.unshift([41,29,516,11593,378,465]);
	// radarData.unshift([55,35,466,11725,328,497]);
	// radarData.unshift([46,43,457,11117,336,470]);
	// radarData.unshift([37,40,377,11020,269,441]);

	// radarDataPrev.unshift([38,45,416,12864,314,429]);
	// radarDataPrev.unshift([66,41,426,12329,331,483]);
	// radarDataPrev.unshift([41,29,516,11593,378,465]);
	// radarDataPrev.unshift([55,35,466,11725,328,497]);
	// radarDataPrev.unshift([46,43,457,11117,336,470]);
	// radarDataPrev.unshift([37,40,377,11020,269,441]);
	// radarDataPrev.unshift([40,31,407,11230,321,412]);

	// Set color
	var color = {
	linearYtoG: {
		type: 'linear',
		x: 0,
		y: 0,
		x2: 1,
		y2: 1,
		colorStops: [{
			offset: 0,
			color: '#f5b44d'
		}, {
			offset: 1,
			color: '#28f8de'
		}]
	},
	linearGtoB: {
		type: 'linear',
		x: 0,
		y: 0,
		x2: 1,
		y2: 0,
		colorStops: [{
			offset: 0,
			color: '#43dfa2'
		}, {
			offset: 1,
			color: '#28f8de'
		}]
	},
	linearBtoG: {
		type: 'linear',
		x: 0,
		y: 0,
		x2: 1,
		y2: 0,
		colorStops: [{
			offset: 0,
			color: '#1c98e8'
		}, {
			offset: 1,
			color: '#28f8de'
		}]
	},
	areaBtoG: {
		type: 'linear',
		x: 0,
		y: 0,
		x2: 0,
		y2: 1,
		colorStops: [{
			offset: 0,
			color: 'rgba(35,184,210,.2)'
		}, {
			offset: 1,
			color: 'rgba(35,184,210,0)'
		}]
	}
	};

	var option = {
	title: {
		text: 'Analysis of Player Transfer',
		textStyle: {
			color: '#fff',
			fontSize: 24,
			fontWeight: 'normal'
		},
		subtext: "Hao Wang, Anqi Mao",
		subtextStyle: {
			color: '#fff',
			fontSize: 16,
		},
		top: 50,
		left: 80
	},
	legend: {
		top: 220,
		left: 80,
		orient: 'vertical',
		itemGap: 15,
		itemWidth: 12,
		itemHeight: 12,
		data: ['Last Season', 'Current Season'],
		textStyle: {
			color: '#fff',
			fontSize: 14,
		},
	},
	tooltip: {
		trigger: 'item'
	},
	radar: {
		center: ['68%', '27%'],
		radius: '40%',
		name: {
			color: '#fff'
		},
		splitNumber: 8,
		axisLine: {
			lineStyle: {
				color: color.linearYtoG,
				opacity: .6
			}
		},
		splitLine: {
			lineStyle: {
				color: color.linearYtoG,
				opacity: .6
			}
		},
		splitArea: {
			areaStyle: {
				color: '#fff',
				opacity: .1,
				shadowBlur: 25,
				shadowColor: '#000',
				shadowOffsetX: 0,
				shadowOffsetY: 5,
			}
		},
		indicator: [{
			name: 'GA',
			max: 70
		}, {
			name: 'GS',
			max: 60
		}, {
			name: 'Passing',
			max: 600
		}, {
			name: 'Points',
			max: 14000
		},{
			name: 'Possession',
			max: 500

		},{
			name: 'Shooting',
			max: 500

		}]
	},
	grid: {
		left: 90,
		right: 80,
		bottom: 40,
		top: '60%',
	},
	xAxis: {
		type: 'category',
		position: 'bottom',
		axisLine: true,
		axisLabel: {
			color: 'rgba(255,255,255,.8)',
			fontSize: 12
		},
		data: Season,
	},
	yAxis: [{
		name: 'Cost(Mill. €)',
		nameLocation: 'end',
		nameGap: 24,
		position: 'left',
		nameTextStyle: {
			color: 'rgba(255,255,255,.5)',
			fontSize: 14
		},
		max: maxDataSingle,
		splitNumber: 4,

		axisLine: {
			lineStyle: {
				opacity: 0
			}
		},
		splitLine: {
			show: true,
			lineStyle: {
				color: '#fff',
				opacity: .1
			}
		},
		axisLabel: {
			color: 'rgba(255,255,255,.8)',
			fontSize: 12

		}
	},{
		name: 'Rank',
		nameLocation: 'start',
		nameGap: 24,
		position: 'right',
		nameTextStyle: {
			color: 'rgba(255,255,255,.5)',
			fontSize: 14
		},
		max: 17,
		min: 1,
		inverse: true,
		splitNumber: 4,

		axisLine: {
			lineStyle: {
				opacity: 0
			}
		},
		splitLine: {
			show: true,
			lineStyle: {
				color: '#fff',
				opacity: .1
			}
		},
		axisLabel: {
			color: 'rgba(255,255,255,.8)',
			fontSize: 12

		}
	}],
	series: [{
		name: 'statistics',
		type: 'radar',
		symbolSize: 0,
		data: [{
			value: radarDataPrev[5],
			name: 'Last Season',
			itemStyle: {
				normal: {
					color: '#f8d351',
				}
			},
			lineStyle: {
				normal: {
					opacity: 0,
				}
			},
			areaStyle: {
				normal: {
					color: '#f8d351',
					shadowBlur: 25,
					shadowColor: 'rgba(248,211,81,.3)',
					shadowOffsetX: 0,
					shadowOffsetY: -10,
					opacity: 1
				}
			},
		}, {
			value: radarData[5],
			name: 'Current Season',
			itemStyle: {
				normal: {
					color: '#43dfa2',
				}
			},
			lineStyle: {
				normal: {
					opacity: 0,
				}
			},
			areaStyle: {
				normal: {
					color: color.linearGtoB,
					shadowBlur: 15,
					shadowColor: 'rgba(0,0,0,.2)',
					shadowOffsetX: 0,
					shadowOffsetY: 5,
					opacity: .8
				}
			},
		}]
	}, {
		name: 'Cost History',
		type: 'line',
		smooth: true,
		symbol: 'emptyCircle',
		symbolSize: 8,
		itemStyle: {
			normal: {
				color: '#fff'
			}
		},
		lineStyle: {
			normal: {
				color: color.linearBtoG,
				width: 3
			}
		},
		areaStyle: {
			normal: {
				color: color.areaBtoG,
			}
		},
		data: costData,
		lineSmooth: true,
		markLine: {
			silent: true,
			data: [{
				type: 'average',
				name: 'Average of Cost'
			}],
			precision: 0,
			label: {
				normal: {
					formatter: 'Avg Cost: \n {c}'
				}
			},
			lineStyle: {
				normal: {
					color: 'rgba(248,211,81,.7)'
				}
			}
		},
		tooltip: {
			position: 'top',
			formatter: '{c} Mill. €',
			backgroundColor: 'rgba(28,152,232,.2)',
			padding: 6
		}
	}, {
		name: 'Rank',
		type: 'line',
		smooth: true,
		data: rankData,
		yAxisIndex:1,
		lineStyle: {
			normal: {
				color: color.linearGtoB,
				width: 3
			}
		}
	},{
		name: 'background',
		type: 'bar',
		itemStyle: {
			normal: {
				show: true,
				color: '#000',
				opacity: 0
			}
		},
		silent: true,
		barWidth: '50%',
		data: maxData,
		animation: false
	}, {
		name: 'background',
		type: 'bar',
		itemStyle: {
			normal: {
				show: true,
				color: '#000',
				opacity: .1
			}
		},
		silent: true,
		barWidth: '50%',
		barGap: 0,
		data: maxData,
		animation: false
	}],
	backgroundColor: '#383546',
	};

	// Clcik event
	myChart.on('click', function(params) {
	if (params.componentType === 'series' && params.seriesType === 'line') {

		var dataIndex = params.dataIndex;
		myChart.setOption({
			series: [
			{
		name: 'statistics',
		type: 'radar',
		symbolSize: 0,
		data: [{
			name: 'Last Season',
			value: radarDataPrev[dataIndex],
			itemStyle: {
				normal: {
					color: '#f8d351',
				}
			},
			lineStyle: {
				normal: {
					opacity: 0,
				}
			},
			areaStyle: {
				normal: {
					color: '#f8d351',
					shadowBlur: 25,
					shadowColor: 'rgba(248,211,81,.3)',
					shadowOffsetX: 0,
					shadowOffsetY: -10,
					opacity: 1
				}
			},
		}, {
			name: 'Current Season',
			value: radarData[dataIndex],
			itemStyle: {
				normal: {
					color: '#43dfa2',
				}
			},
			lineStyle: {
				normal: {
					opacity: 0,
				}
			},
			areaStyle: {
				normal: {
					color: color.linearGtoB,
					shadowBlur: 15,
					shadowColor: 'rgba(0,0,0,.2)',
					shadowOffsetX: 0,
					shadowOffsetY: 5,
					opacity: .8
				}
			},
		}]
	}]
		})
	}
	});
	// Pass value to chart
	myChart.setOption(option);


}
