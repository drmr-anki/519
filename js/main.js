function selectCountry(country){
	// alert(country)

	document.getElementById('country').innerHTML = country;

	//find the clubs in that country and replace this array
	var clubs = ['Beijing','Shanghai','Najing','Shandong'];

	document.getElementById('club').innerHTML = writeClubButton(clubs);

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


var url = "tempCSLData.xlsx";
var oReq = new XMLHttpRequest();
oReq.open("GET", url, true);
oReq.responseType = "arraybuffer";

oReq.onload = function(e) {
  var arraybuffer = oReq.response;

  /* convert data to binary string */
  var data = new Uint8Array(arraybuffer);
  var arr = new Array();
  for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
  var bstr = arr.join("");

  /* Call XLSX */
  var workbook = XLSX.read(bstr, {type:"binary"});

  /* DO SOMETHING WITH workbook HERE */
  var first_sheet_name = workbook.SheetNames[0];
  /* Get worksheet */
  var worksheet = workbook.Sheets[first_sheet_name];
  console.log(XLSX.utils.sheet_to_json(worksheet,{raw:true}));
}

oReq.send();
