var data_global;
var clubs;

function handleSingleClub(country){
	// alert(country)

	document.getElementById('country').innerHTML = country;

	//find the clubs in that country and replace this array
	var path ="tempCSLData.json"


	readJSON(path).then((data) => {
		var response = JSON.parse(data)
		var data = response.data
		data_global = data
    //
		// console.log(data_global)
		clubs = readUniqueClubs(data)
		// console.log(clubs);
		// console.log("hhhh");
		//var clubs = ['Beijing','Shanghai','Najing','Shandong'];

		document.getElementById('club').innerHTML = writeClubButton(Array.from(clubs));
	})

	// console.log(data_global);

}

function readUniqueClubs(data){
	var clubs = new Set([]);
	for(var i = 0; i < data.length; i++){
		clubs.add(data[i].Club);
	}

	return clubs;
}

// function saveData(data){
// 	data_global = data;
// }

function readJSON(path) {
	return new Promise((resolve, reject) => {
		var data;
    var xhr = new XMLHttpRequest();
		// xhr.overrideMimeType("application/json")
    xhr.open('GET', path, true);
    xhr.onload = () => resolve(xhr.responseText)
		xhr.onerror = () => reject(xhr.statusText)
		xhr.send();
	})


}

function writeClubButton(clubs){
    // caution: drop the "new Array" part or it won't work!

    var printThis = "<h2>Select A Club</h2>";
    for(var i = 0; i < clubs.length; i++){
        printThis += '<button class="ui blue basic button" value ="'+clubs[i]+'" onclick = "readClubData(value)">'+clubs[i]+'</button> ';

    }

    return printThis; // <-- to be printed to the div
}

function readClubData(club){
	var club_data = [];
	let count = 0;

	// console.log(club);
	//Find the data for club and call drawChart
	for(var i = 0; i < data_global.length; i++){
		if(new String(data_global[i].Club).valueOf() == new String(club).valueOf()){
			club_data[count] = data_global[i];
			count++;
		}
	}

	// club_data.reverse();
	var radarData = [];
	var radarDataPrev = [];
	var Season = [];
	var rankData = [];
	var costData = [];
  //
	for(var i = 0; i < club_data.length; i++){
		if(i != club_data.length-1){
			radarData.unshift([club_data[i].GA,club_data[i].GS,club_data[i].Passing,club_data[i].Points,club_data[i].Possession, club_data[i].Shooting]);
			Season.unshift(club_data[i].Year);

			radarDataPrev.unshift([club_data[i+1].GA,club_data[i+1].GS,club_data[i+1].Passing,club_data[i+1].Points,club_data[i+1].Possession, club_data[i+1].Shooting]);
			if(club_data[i].Rank == -1){
				rankData.unshift(17);
			}else{
				rankData.unshift(club_data[i].Rank);
			}
		}
		// if(i != club_data){
		// 	radarDataPrev.unshift([club_data[i+1].GA,club_data[i+1].GS,club_data[i+1].Passing,club_data[i+1].Points,club_data[i+1].Possession, club_data[i+1].Shooting]);
		// }


		costData[i] = club_data[i].Transfer_Arrival-club_data[i].Transfer_Departure;
	}

	console.log("radar: "+radarData)
	console.log("prev: "+radarDataPrev)
	drawChartSingle(radarData, radarDataPrev,Season, costData, rankData);
}


// *******************************Draw charts for comparison************************

function handleCompare(country){
	// alert(country)
	let main = document.getElementById("main");
	let existInstance = echarts.getInstanceByDom(main);
	if (existInstance) {
    if (true) {
        echarts.dispose(existInstance);
    }
	}
	//find the clubs in that country and replace this array
	var path ="tempCSLData.json"

	readJSON(path).then((data) => {
		var response = JSON.parse(data)
		var data = response.data
		data_global = data
    //
		// console.log(data_global)
		clubs = readUniqueClubs(data)
		// console.log(clubs);
		// console.log("hhhh");
		//var clubs = ['Beijing','Shanghai','Najing','Shandong'];

		document.getElementById('club').innerHTML = writeSelectBox(Array.from(clubs));
	})

	// console.log(data_global);

}

function writeSelectBox(clubs){
  	// caution: drop the "new Array" part or it won't work!
    var printThis = '<h2>Select Two Clubs</h2>';
		printThis+='<div class="ui form">';
		printThis+='<div class="two fields">';

		//Draw select feild for first country
		printThis+='<div class="field">'
    printThis+='<label>Club One</label>'
    printThis+='<select id = "c1" class="ui fluid dropdown">';
		printThis+='<option value="">Club One</option>';
    for(var i = 0; i < clubs.length; i++){
        printThis += '<option value ="'+clubs[i]+'">'+clubs[i]+'</option> ';
    }

		printThis += '</select></div>'

		//Draw select feild for second country
		printThis+='<div class="field">'
    printThis+='<label>Club Two</label>'
    printThis+='<select id = "c2" class="ui fluid dropdown">';
		printThis+='<option value="">Club Two</option>';
    for(var i = 0; i < clubs.length; i++){
        printThis += '<option value ="'+clubs[i]+'">'+clubs[i]+'</option> ';
    }

		printThis += '</select></div></div>';
		printThis += '<div class="ui button" onclick ="compare()" >Show Graph</div>';
		return printThis;

}

function compare(){
	var c1= document.getElementById("c1").value;
	var c2= document.getElementById("c2").value;
	var c1_data = [];
	var c2_data = [];
	var count1 = 0;
	var count2 = 0;

	for(var i = 0; i < data_global.length; i++){
		if(new String(data_global[i].Club).valueOf() == new String(c1).valueOf()){
			c1_data[count1] = data_global[i];
			count1++;
		}

		if(new String(data_global[i].Club).valueOf() == new String(c2).valueOf()){
			c2_data[count2] = data_global[i];
			count2++;
		// console.log(data_global[i]);
	}
}

	// club_data.reverse();
	console.log(c1_data);
	console.log(c2_data);

	var DataC1 = [];
	var DataC2= [];

	for(var i = 0; i < c1_data.length; i++){
			var rank;
			var cost;

			if(c1_data[i].Rank == -1){
				rank = 17;
			}else{
				rank = c1_data[i].Rank;
			}
			cost = c1_data[i].Transfer_Arrival-c1_data[i].Transfer_Departure;

			DataC1.unshift([c1_data[i].Year,c1_data[i].GA,c1_data[i].GS,c1_data[i].Passing,c1_data[i].Points,c1_data[i].Possession, c1_data[i].Shooting, cost,rank]);

			if(c2_data[i].Rank == -1){
				rank = 17;
			}else{
				rank = c2_data[i].Rank;
			}
			cost = c2_data[i].Transfer_Arrival-c1_data[i].Transfer_Departure;
			DataC2.unshift([c2_data[i].Year,c2_data[i].GA,c2_data[i].GS,c2_data[i].Passing,c2_data[i].Points,c2_data[i].Possession, c2_data[i].Shooting, cost,rank]);

	}
	// console.log(radarData);
	// console.log(Season);
  //
  //
	drawChartCompare(DataC1,DataC2, [c1, c2]);


}
