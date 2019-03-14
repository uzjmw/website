/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
//Speichert Daten bis Anzahl der Messdatenpunkte erreicht ist
var pufferliste = [];
//Anzahl der benötigten Messdatenpunkte
var Messdatenpunkte = 200;
//Durschnitt der letzten Messung
var schnitt = 0;
//Schwelle um Kamera anzuzeigen
var schwelle = 1.1;

//wahr wenn Kamera nicht sichtbar
var check = true;

var video = document.getElementById('video');

function camera(){
// Get access to the camera!
if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    // Not adding `{ audio: true }` since we only want video now
    navigator.mediaDevices.getUserMedia({ video: { facingMode: { exact: "environment" } }}).then(function(stream) {
    //navigator.mediaDevices.getUserMedia({ video: true}).then(function(stream) {
        //video.src = window.URL.createObjectURL(stream);
	 start();
        video.srcObject = stream;
        video.play();
	    
    });
}
}




function start(){
                //document.getElementById("versteckt").style.backgroundColor = "red";
                
                window.ondevicemotion = function(event) {
                //var x = event.acceleration.x;	   
		var y = event.acceleration.y;
		var z = event.acceleration.z;	
		var summe = Math.abs(y) + Math.abs(z);
                pufferliste.push(summe);
                if(pufferliste.length < Messdatenpunkte){
                    return;
                }
                //document.getElementById("versteckt").style.backgroundColor = "green";
                var summe = 0;
                for(i = 0; i< pufferliste.length; i++){
                    summe += pufferliste[i];
                }
                schnitt = summe/ pufferliste.length;
                schnitt = Math.ceil(schnitt * 1000)/1000;
                pufferliste = [];
                if(schnitt > schwelle){
                    on();
                }
                else{
                    off();
                }
            }
    
    
}
function on(){
    //document.getElementById("versteckt").style.display = "none";
	if(!check)
	   {
	   return;
	   }
	var objDiv = document.getElementById("versteckt");
	objDiv.scrollTop = objDiv.scrollTop + window.innerHeight*0.38;
    document.getElementById("versteckt").style.height = "62%";
	check = false;	
}

function off(){
    //document.getElementById("versteckt").style.display = "block";
	var objDiv = document.getElementById("versteckt");
	if(check)
	   {
	   return;
	   }
	//objDiv.scrollTop = objDiv.scrollTop - screen.availHeight*0.3;
	objDiv.scrollTop = objDiv.scrollTop - window.innerHeight*0.38;
	document.getElementById("versteckt").style.height = "100%";
	check = true;
}

