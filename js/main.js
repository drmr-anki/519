function selectCountry(country){
	// alert(country)

	document.getElementById('country').innerHTML = country;

	//find the clubs in that country and replace this array
	var clubs = ['Beijing','Shanghai','Najing','Shandong'];

	document.getElementById('club').innerHTML = writeClubButton(clubs);
	var path ="tempCSLData.json"
	var data = readJSON(path);
	console.log(data);
	// console.log("hhhh");

}

function readJSON(path) {
		var data;
    var xhr = new XMLHttpRequest();
    xhr.open('GET', path, true);
    xhr.responseType = 'blob';
    xhr.onload = function(e) {
      if (this.status == 200) {
          var file = new File([this.response], 'temp');
          var fileReader = new FileReader();
          fileReader.addEventListener('load', function(){
               //do stuff with fileReader.result
							 console.log(fileReader.result.data);
							 // data = fileReader.result;
							 // console.log("hhhh");
          });
          fileReader.readAsText(file);
      }
    }
    xhr.send();
		return data;
}

function writeClubButton(clubs){
    // caution: drop the "new Array" part or it won't work!

    var printThis = "";
    for(var i = 0; i < clubs.length; i++){
        printThis += '<button class="ui blue basic button">'+clubs[i]+'</button>';
    }

    return printThis; // <-- to be printed to the div
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
