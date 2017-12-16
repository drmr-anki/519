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
