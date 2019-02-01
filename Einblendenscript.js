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
var schwelle = 2;
function start(){
    
                document.getElementById("versteckt").style.backgroundColor = "red";
                
                window.ondevicemotion = function(event) {
                    
		var y = event.acceleration.y;
		var z = event.acceleration.z;	
		var summe = Math.abs(y) + Math.abs(z);
                pufferliste.push(summe);
                if(pufferliste.length < Messdatenpunkte){
                    return;
                }
                document.getElementById("versteckt").style.backgroundColor = "green";
                var summe = 0;
                for(i = 0; i< pufferliste.length; i++){
                    summe += pufferliste[i];
                }
                schnitt = summe/ pufferliste.length;
                schnitt = Math.round(schnitt * 100)/100;
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
    document.getElementById("versteckt").style.height = "80%";
}

function off(){
    //document.getElementById("versteckt").style.display = "block";
    document.getElementById("versteckt").style.height = "100%";
}
