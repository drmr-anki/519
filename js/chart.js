function drawChartSingle(radarData, radarDataPrev, Season, costData, rankData){
	let main = document.getElementById("main");
	let existInstance = echarts.getInstanceByDom(main);
	if (existInstance) {
    if (true) {
        echarts.dispose(existInstance);
    }
	}
	let myChart = echarts.init(main);
	
	// var radarDataPrev = radarData;
	var maxDataSingle = 30;
	var maxData = [maxDataSingle,maxDataSingle,maxDataSingle,maxDataSingle,maxDataSingle,maxDataSingle,maxDataSingle];


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
			max: 100
		}, {
			name: 'GS',
			max: 100
		}, {
			name: 'Passing',
			max: 15000
		}, {
			name: 'Points',
			max: 114
		},{
			name: 'Possession',
			max: 100

		},{
			name: 'Shooting',
			max: 600

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
