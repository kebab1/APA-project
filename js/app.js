var tari=["Moldova","Romania","Italia","Germania","Spania","Austria","Grecia","Franta","Cehia","Turcia"];
let  xx;
var dialogCar = [];
var dialogAvion = [];

var auto = new Array(10);
	for(var i=0;i<10;i++){
		auto[i]=new Array(10);
		auto[i].fill(0);

	}

 	fetch("js/auto.txt")
	.then((res) => res.text())
		.then((data) => {
			let lines = data.split('\n');
			for(let i = 0; i < lines.length; i++) {
					xx = lines[i].split(' ');
					auto[parseInt(xx[0])][parseInt(xx[1])]=parseInt(xx[2]);
					auto[parseInt(xx[1])][parseInt(xx[0])]=parseInt(xx[2]);
					dialogCar.push([tari[xx[0]], tari[xx[1]], parseInt(xx[2])]);
                    
				}
                
                document.getElementById('opener').addEventListener('click', 
                  $( function() {
					$('#dialog_auto').dialog({
					    autoOpen: false,
					    modal: true,
					    title: 'Automobil',
						   show: {
						        effect: "blind",
						        duration: 1000
						      },
						      hide: {
						        effect: "explode",
						        duration: 1000
						      },
					     width: 300, height: 400,
					     open: function(event, ui) {
					        $(dialogCar).each(function(index, data){
					      
					         if($("ul.auto").children().length === index) {
					            $("ul.auto").append(data.toString().split(',').join('->') + "<br>");
					          } 
					        });
					        
					     } 
					   });
					    $( "#opener" ).on( "click", function() {
					      $( "#dialog_auto" ).dialog( "open" );
					    });
					  }) );
		});

  var avion= new Array(10);
	for(var i=0;i<10;i++){
		avion[i]=new Array(10);
		avion[i].fill(0);

	}
 	fetch("js/avion.txt")
	.then((res) => res.text())
		.then((data) => {
			let lines = data.split('\n');
			for(let i = 0; i < lines.length; i++) {
					xx = lines[i].split(' ');
					avion[parseInt(xx[0])][parseInt(xx[1])]=parseInt(xx[2]);
					avion[parseInt(xx[1])][parseInt(xx[0])]=parseInt(xx[2]);
					dialogAvion.push([tari[xx[0]], tari[xx[1]], parseInt(xx[2])]);
				}

			  document.getElementById('opener1').addEventListener('click', 
                  $( function() {
					$('#dialog_avion').dialog({
					    autoOpen: false,
					    modal: true,
					    title: 'Avion',
						   show: {
						        effect: "blind",
						        duration: 1000
						      },
						      hide: {
						        effect: "explode",
						        duration: 1000
						      },
					     width: 300, height: 400,
					     open: function(event, ui) {
					        $(dialogAvion).each(function(index, data){
					          if($("ul.avion").children().length === index) {
					          	$("ul.avion").append(data.toString().split(',').join('->') + "<br>");
					          }
					         
					        });
					        
					     } 
					   });
					    $( "#opener1" ).on( "click", function() {
					      $( "#dialog_avion" ).dialog( "open" );
					    });
			  }) );
		});


function MIN(a,b){
  if(a > b) {return b;}
  if(a < b) {return a;}
}	 
document.getElementById('firstButton').addEventListener('click',function(){
 	var locatie;
 	var destinatie;

 	 	var el = document.getElementById("locatie");
	     locatie = el.options[el.selectedIndex].value;
        var totalSum = document.getElementById('suma').value;
 	    var ed = document.getElementById("destinatie");
	     destinatie = ed.options[ed.selectedIndex].value;
	   if(totalSum != 0) {
		   	if(document.getElementById('auto').checked) {
	        Dijkstra(auto,locatie,destinatie,totalSum);
	       }
	       if(document.getElementById('avion').checked) {
	        Dijkstra(avion,locatie,destinatie,totalSum);
	       } 
	    } else {
          $("#dialog_sum").dialog(); 
	    }
 });


var drum=[];
function Dijkstra(gr,loc,dest,totalSum){
	drum.splice(0,drum.length);
	var suma=parseInt(totalSum);
	var string="";
	var drumuri=[];
	var ant = [];
	var current = [];
	var index = [];
	var initial = parseInt(loc);
	var final = parseInt(dest);
	var min=99999;
	var n=10,x,h,m,K,i,j,k,l=0,z=0;
	var tabel = new Array(n);
		for( i=0;i<n;i++){
			tabel[i]= new Array(n);
			tabel[i].fill(0);
		}
		for( i=0; i<n; i++){
		 if(i == 0) {
		  ant.push(0);
		 } else {
		  ant.push(99999);
		 }
		 tabel[0][i]=ant[i];
		 current.push(0);
		 index.push(i);
		}
		l=final;
		index.splice(initial, 1);
		index.unshift(initial);

		while(l<n){
			if(l!=initial){
				drum.splice(0,drum.length);
				if(initial>l){
				index.splice(l+1, 1);}
				else{index.splice(l, 1);}
				index.push(l);
				for( i=0;i<n;i++){
				                x=index[i];
				                for( j=0;j<n;j++){
				                    h=index[j];
				                    if(gr[x][h]!=0){
				                        m=current[i]+gr[x][h];
				                        current[j]=MIN(ant[j],m);}
				                    else{current[j]=ant[j];}
				                   }
				                for( k=0;k<n;k++){
				                    ant[k]=current[k];
				                    tabel[i][k]=ant[k];
				                }
				    }
			      drum.push(tari[l]);         
			      i=n-1;
			     for( j=n-1;j>0;j--){
		        		if(tabel[j][i]!=tabel[j-1][i]){
		        			i=index[j];
		        			drum.push(tari[i]);
		        
		        		}
			        }
			  drum.push(tari[initial]);
			  drum.reverse();
			 if(ant[n-1]<=suma && z==0 && ant[n-1] !=0 ){
			 	string=(drum.join(" -> ")+" cu costul = "+ant[n-1]);
			 	drumuri.push(string);
			 	break;
			 }
			 if(z==0){l=z;z++;}
			 if(ant[n-1]<=suma&&ant[n-1]!=0){
					string=(drum.join(" -> ")+" cu costul = "+ant[n-1]);
					drumuri.push(string);	
		 	}
			 	
			 for(i=0;i<n;i++){
			 	tabel[i].fill(0);	
			 }
			 index.splice(n-1,1);
			 if(initial>l){
			 	index.splice(l+1,0,l);
			 }
			 else{
			 	index.splice(l,0,l);
			 }
			 drum.splice(0,drum.length);
			 ant.splice(0,ant.length);
			 current.splice(0,current.length);
			 string="";
			 for( i=0; i<n; i++){
				 if(i == 0) {
				  ant.push(0);
				 } else {
				  ant.push(99999);
				 }
				 current.push(0);
			}
		  }
		  else{
		  	drum.splice(0,drum.length);
		  	break;
		  }
		 l++;
 }
 		//if(drumuri.length!=1){drum.splice(0,drum.length);}
		if(drumuri.length==0){
			drum.splice(0,drum.length);
	        document.getElementById("drum_pos").className = "btn btn-danger";
	        document.getElementById('drum_pos').style.marginLeft = "20px";
	        alert("Punct inaccsibil");  
	     } else {
	     	document.getElementById("drum_pos").className = "btn btn-success";
	        document.getElementById('drum_pos').style.marginLeft = "20px";
	     }

        document.getElementById('drum_pos').addEventListener('click', function () {
        	if( drumuri.length != 0 ) {
          		alert(drumuri.join("\n"));
        		document.getElementById("drum_pos").className = "btn btn-default";
        		drumuri.splice(0,drumuri.length);
        		drum.splice(0,drum.length);
        		
        	}		
        });    
	 draw();
}

var canvas,img;
function preload() {
  img = loadImage("imagini/harta.jpg");
}

function draw() {
	noLoop();
	var arrCoord=[];
	var culoare=color(255,0,0);
	canvas=createCanvas(windowWidth-250, windowHeight-86);	
 	canvas.position(250,86);
 	background(img);
  	fill(0);
    strokeWeight(2);
    line(873, 302, 813, 355);
    line(873, 302, 553, 450);
    line(873, 302, 571, 117);
    line(873, 302, 237, 496);
    line(873, 302, 747, 543);
    line(873, 302, 356, 241);
    line(873, 302, 877, 476);
    line(813, 355, 571, 117);
    line(813, 355, 877, 476);
    line(553, 450, 356, 241);
    line(571, 117, 630, 263);
    line(571, 117, 237, 496);
    line(237, 496, 553, 450);
    line(630, 263, 591, 204);
    strokeWeight(1);
 	fill(culoare);
  	ellipse(873, 302,14,14);
  	ellipse(813 ,355,14,14);
  	ellipse(553 ,450,14,14);
  	ellipse(571 ,117,14,14);
  	ellipse(237 ,496,14,14);
  	ellipse(630 ,263,14,14);
  	ellipse(747 ,543,14,14);
  	ellipse(356 ,241,14,14);
  	ellipse(591 ,204,14,14);
  	ellipse(877 ,476,14,14);
  	arrCoord.push([873,302]);
  	arrCoord.push([813,355]);
  	arrCoord.push([553,450]);
  	arrCoord.push([571,117]);
  	arrCoord.push([237,496]);
  	arrCoord.push([630,263]);
  	arrCoord.push([747,543]);
  	arrCoord.push([356,241]);
  	arrCoord.push([591,204]);
  	arrCoord.push([877,476]);
  	var ind=[];
  	var z;
 	
	for(let i=0;i<drum.length;i++){
		z=tari.indexOf(drum[i]);
		ind.push(z);
	}
	for(let i=0;i<ind.length-1;i++){
			stroke(255,0,0);
			strokeWeight(3);
			line(arrCoord[ind[i]][0],arrCoord[ind[i]][1],arrCoord[ind[i+1]][0],arrCoord[ind[i+1]][1])
	}
	ind.splice(0,ind.length);
}
