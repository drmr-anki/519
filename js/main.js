var data_global;
var clubs;

function selectCountry(country){
	// alert(country)

	document.getElementById('country').innerHTML = country;

	//find the clubs in that country and replace this array

	var path ="tempCSLData.json"

	readJSON(path).then((data) => {
		var response = JSON.parse(data)
		var data = response.data
		data_global = data
    //
		console.log(data_global)
		clubs = readUniqueClubs(data)
		console.log(clubs);
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

		// () => {
    //   if (this.status == 200) {
    //       // var file = new File([this.response], 'temp');
    //       // var fileReader = new FileReader();
    //       // fileReader.addEventListener('load', function(){
    //       //      //do stuff with fileReader.result
		// 			// 		 console.log(fileReader.result);
		// 			// 		 // data = fileReader.result;
		// 			// 		 // console.log("hhhh");
    //       // });
    //       // fileReader.readAsText(file);
		// 			var response = JSON.parse(this.responseText);
		// 			// console.log(data.data);
		// 			var data = response.data;
		// 			// console.log(data);
		// 	    // data_global = data;
		// 			return data
		// 		}
    // xhr.responseType = 'blob'
    xhr.onload = () => resolve(xhr.responseText)
		xhr.onerror = () => reject(xhr.statusText)
		xhr.send();
	})


}

function writeClubButton(clubs){
    // caution: drop the "new Array" part or it won't work!

    var printThis = "";
    for(var i = 0; i < clubs.length; i++){
        printThis += '<button class="ui blue basic button" value ="'+clubs[i]+'" onclick = "readClubData(value)">'+clubs[i]+'</button> ';

    }

    return printThis; // <-- to be printed to the div
}

function readClubData(club){
	var club_data = [];
	let count = 0;

	console.log(club);
	//Find the data for club and call drawChart
	for(var i = 0; i < data_global.length; i++){
		if(new String(data_global[i].Club).valueOf() == new String(club).valueOf()){
			club_data[count] = data_global[i];
			count++;
			// console.log("I am here");
		}
		// console.log(data_global[i]);
	}

	// club_data.reverse();
	console.log(club_data);
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
			if(club_data[i].Rank == -1){
				rankData.unshift(17);
			}else{
				rankData.unshift(club_data[i].Rank);
			}
		}
		if(i != 0){
			radarDataPrev.unshift([club_data[i].GA,club_data[i].GS,club_data[i].Passing,club_data[i].Points,club_data[i].Possession, club_data[i].Shooting]);
		}


		costData[i] = club_data[i].Transfer_Arrival-club_data[i].Transfer_Departure;
	}
	console.log(radarData);
	console.log(Season);


	drawChart(radarData, radarDataPrev,Season, costData, rankData);
}


// var ExcelToJSON = function() {
// 	var file = "tempCSLData.xlsx";
//   this.parseExcel = function(file) {
//     var reader = new FileReader();
//
//     reader.onload = function(e) {
//       var data = e.target.result();
//       var workbook = XLSX.read(data, {
//         type: 'binary'
//
//       });
// 			// console.log("hhhhi");
// 			var sheetName = "tempCSLData"
//       workbook.SheetNames.forEach(function(sheetName) {
//         // Here is your object
//         var XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
//         var json_object = JSON.stringify(XL_row_object);
//         console.log(json_object);
//
//       })
//
//     };
//
//     reader.onerror = function(ex) {
//       console.log(ex);
//     };
//
//     reader.readAsBinaryString(file);
//   };
// };
//
//
// ExcelToJSON();
