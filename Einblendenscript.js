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
var schwelle = 1.65;
function start(){
    
                //document.getElementById("versteckt").style.backgroundColor = "red";
                
                window.ondevicemotion = function(event) {
                //var x = event.acceleration.x;	   
		var y = event.acceleration.y;
		var z = event.acceleration.z;	
		var summe = 1.5*Math.abs(y) + 1.5*Math.abs(z);
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
    document.getElementById("versteckt").style.height = "62%";
}

function off(){
    //document.getElementById("versteckt").style.display = "block";
    document.getElementById("versteckt").style.height = "100%";
}
