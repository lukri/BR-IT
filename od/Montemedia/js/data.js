/*Maps id's with cantonname in csv-file*/
var kantone = {
"ag": "Aargau",
"ar": "Appenzell Ausser-rhoden",
"ai": "Appenzell Inner-rhoden",
"be": "Bern",
"bl": "Basel-landschaft",
"bs": "Basel-stadt",
"fr": "Fribourg",
"ge": "Geneve",
"gl": "Glarus",
"gr": "Graubunden",
"ju": "Jura",
"lu": "Luzern",
"ne": "Neuchatel",
"ow": "Obwalden",
"sg": "Sankt Gallen",
"sh": "Schaffhausen",
"so": "Solothurn",
"sz": "Schwyz",
"tg": "Thurgau",
"ur": "Uri",
"vs": "Valais",
"vd": "Vaud",
"ti": "Ticino",
"nw": "Nidwalden",
"zg": "Zug",
"zh": "Zurich",
"schweiz": "Schweiz"
};
var kantonsdaten = {}; //new Object();
var Total = {};
Total.amount = 0;
Total.Selection = 0;
Total.Device = {};
Total.OS = {};
Total.Browser = {};

var selectionMode = 0;

var Paint = {};
Paint.Device = "all";
Paint.OS = "all";
Paint.Browser = "all";

var dBTimer;
var opac = 0;
var opacMax = 80;
var opacMin = 0;
var opacDif = 5;

//http://stackoverflow.com/questions/1720320/how-to-dynamically-create-css-class-in-javascript-and-apply
var cssObj = document.createElement('style');
cssObj.type = 'text/css';
document.getElementsByTagName('head')[0].appendChild(cssObj);
// use cssObj.innerHTML to change styles

function initAll(){
    loadMap();
    getData();
    drawGradient();
}


function setWait(wait){
    var tip = document.getElementById("tip");
    var content = document.getElementById("content");
    if(wait){
        tip.style.display = "block";
    }else{
        tip.style.display = "none";
        content.style.display = "block";
        $('.compass').each(function(i) {this.style.display = "block";});
    }
}

function showDataBox(show){
    dBTimer = window.setInterval(function(){setDataBox(show)}, 20);
}

function setDataBox(show){
    var dataBox = document.getElementById("databox");
    if (show){
        if(opac!=opacMax){opac += opacDif;}
    } else {
        if(opac!=opacMin){opac -= opacDif;}
    }
    dataBox.style.opacity = opac/100;
    if((opac==opacMin)|(opac==opacMax)){
        clearInterval(dBTimer);
    }
}

function colorBrewer(amount){
    amount = Math.round(amount);
        var redAmount=0;
        var greenAmount=0;
        var blueAmount=0;
        
        if (amount<128){
            redAmount = 255 - 2*amount;
            blueAmount = 2*amount;
        }
        else{
            blueAmount = 510-2*amount;
            greenAmount = 2*amount - 255;
        }
        
    return "rgb("+redAmount+","+greenAmount+","+blueAmount+")";
}


function drawGradient(){
    var svgContainer = d3.select("#verlauf").append("svg")
                                     .attr("width", 400)
                                     .attr("height", 20);
    
    for (var i = 0; i < 101; i++) { 
    var rectangle = svgContainer.append("rect")
                             .attr("x", i*4.1)
                             .attr("y", 0)
                             .attr("width", 4)
                             .attr("height", 10)
                             .attr("fill", colorBrewer(Math.round(i*2.55)));
    }
}




function getData(kanton){
    setWait(true);
    // https://github.com/mbostock/d3/wiki/CSV
    var dsv = d3.dsv(";", "text/plain");
    /*
    //gibt erste zeile vollständig als objekt in die konsole aus.
    dsv('data/GeographicalAndTechnicalData.csv').get(function(error, rows) {
       console.log(rows[0]);
    });*/

    dsv('data/GeographicalAndTechnicalData.csv').row(function(d) {
      return {
        Land: d.Country,
        Kanton: d.Region,
        Device: d['Device Type'],
        OS: d.OS,
        Browser: d.Browser,

      };
    }).get(function(error, rows) {
      for (var i = 0; i < rows.length; i++) {
        if(rows[i].Land=="Switzerland"){
            prepareData(rows[i]);
        }
      }
      
      // Aufruf verzögern, damit alle Daten geladen sind
      window.setTimeout("printNavi()", 500); 
     
    });

    
}


function prepareData(d){

    Total.amount++;
    /*List for navi*/
    Total.Device[d.Device]=0;
    Total.OS[d.OS] = 0;
    Total.Browser[d.Browser] = 0;
    var kanton = d.Kanton;
    //1st round for Kanton, 2nd for Schweiz
    for(var i=0; i<2; i++){ 
        if(!kantonsdaten[kanton]){
            kantonsdaten[kanton] = {}; //new Object();
            kantonsdaten[kanton].total = 1;
            kantonsdaten[kanton].Device = {};
            kantonsdaten[kanton].OS = {};
            kantonsdaten[kanton].Browser = {};
        }else{
            kantonsdaten[kanton].total++;
        }
    
        if(!kantonsdaten[kanton].Device[d.Device]){
            kantonsdaten[kanton].Device[d.Device] = 1;
        } else {
            kantonsdaten[kanton].Device[d.Device]++;
        }
    
        if(!kantonsdaten[kanton].OS[d.OS]){
            kantonsdaten[kanton].OS[d.OS] = 1;
        } else {
            kantonsdaten[kanton].OS[d.OS]++;
        }
    
        if(!kantonsdaten[kanton].Browser[d.Browser]){
            kantonsdaten[kanton].Browser[d.Browser] = 1;
        } else {
            kantonsdaten[kanton].Browser[d.Browser]++;
        }
    
    
        // könnte verwendet werden, um abhängigkeit von verschiedenen eigenschaften zu zeigen
        if(!kantonsdaten[kanton][d.Device]){
            kantonsdaten[kanton][d.Device] = new Object();
        }
        if(!kantonsdaten[kanton][d.Device][d.OS]){
            kantonsdaten[kanton][d.Device][d.OS] = new Object();
            kantonsdaten[kanton][d.Device][d.OS].amount = 1;
        }else{
            kantonsdaten[kanton][d.Device][d.OS].amount++;
        }
        if(!kantonsdaten[kanton][d.Device][d.OS][d.Browser]){
            kantonsdaten[kanton][d.Device][d.OS][d.Browser] = 1;
        }else{kantonsdaten[kanton][d.Device][d.OS][d.Browser]++;
        }
        kanton = "Schweiz";    
    }
    
}

//round percent
function rpc(original, max){
    original = original/max*100;
    return Math.round(original*100)/100;
}

//round
function round(original){
    original = original*100;
    return Math.round(original)/100;
}




function printData(kanton){
    document.getElementById("titel").innerHTML = kanton.getAttribute("name");
    var selectedData = document.getElementById("selectedData");
    
    kanton = kantone[kanton.id];
    var amount = kantonsdaten[kanton].total;
    var text = "";
    if(selectionMode === 0){
        text += "Amount of Devices in Kanton:<br>"+ kantonsdaten[kanton].selected +" ("+kantonsdaten[kanton].percent+"% of all Switzerland Data)";
    }else{
        text += "Amount of selected Devices:<br>"+kantonsdaten[kanton].selected+" out of "+kantonsdaten[kanton].total+" ("+kantonsdaten[kanton].percent+"%)<br>";   
    }
    selectedData.innerHTML = text;
    

    barchart(kantonsdaten, kanton, "Device");
    barchart(kantonsdaten, kanton, "OS");
    barchart(kantonsdaten, kanton, "Browser");
    sequences(kantonsdaten, kanton);
    
    showDataBox(true);
    
}


function paintData(){
    //showDataBox(false);
    console.clear();
    
    var exps = document.getElementById("expl").getElementsByTagName('p');
    var total = document.getElementById("total");
    
    
    
    
    
    selectionMode = 0; //Mode 0-7
    if(Paint.Device != "all"){selectionMode+=1;}
    if(Paint.OS != "all"){selectionMode+=2;}
    if(Paint.Browser != "all"){selectionMode+=4;}
    //alert(selectionMode);
   
    $('.canton').each(function(i) {
        var kanton = kantone[this.id];
        kantonsdaten[kanton].selected = 0;
        kantonsdaten[kanton].percent = 0;
        switch(selectionMode) {
        case 0:
            kantonsdaten[kanton].selected = kantonsdaten[kanton].total;
            kantonsdaten[kanton].percent = rpc(kantonsdaten[kanton].selected, Total.amount);
            //kantonsdaten[kanton].value = i%10;
            break;
        case 1:
            if(!(kantonsdaten[kanton].selected = kantonsdaten[kanton].Device[Paint.Device])){kantonsdaten[kanton].selected = 0;}
            break;
        case 2:
            if(!(kantonsdaten[kanton].selected = kantonsdaten[kanton].OS[Paint.OS])){kantonsdaten[kanton].selected = 0;}
            break;
        case 3:
            if(kantonsdaten[kanton][Paint.Device]){
                if(kantonsdaten[kanton][Paint.Device][Paint.OS]){
                    kantonsdaten[kanton].selected = kantonsdaten[kanton][Paint.Device][Paint.OS].amount;
                }
            }
            break;
        case 4:
            if(!(kantonsdaten[kanton].selected = kantonsdaten[kanton].Browser[Paint.Browser])){kantonsdaten[kanton].selected = 0;}
            break;
        case 5:
            if(kantonsdaten[kanton][Paint.Device]){
                for(var os in kantonsdaten[kanton][Paint.Device]){
                    if(kantonsdaten[kanton][Paint.Device][os][Paint.Browser]){
                        kantonsdaten[kanton].selected += kantonsdaten[kanton][Paint.Device][os][Paint.Browser];
                    }
                }
            }
            break;
        case 6:
            for(var device in kantonsdaten[kanton]){
                if(kantonsdaten[kanton][device][Paint.OS]){
                    if(kantonsdaten[kanton][device][Paint.OS][Paint.Browser]){
                        kantonsdaten[kanton].selected += kantonsdaten[kanton][device][Paint.OS][Paint.Browser];
                    }    
                }
            }
            break;
        case 7:
            if(kantonsdaten[kanton][Paint.Device]){
                if(kantonsdaten[kanton][Paint.Device][Paint.OS]){
                    if(kantonsdaten[kanton][Paint.Device][Paint.OS][Paint.Browser]){
                        kantonsdaten[kanton].selected = kantonsdaten[kanton][Paint.Device][Paint.OS][Paint.Browser];
                    }
                }
            }
            break;
        default:
            break;
        }
        if(kantonsdaten[kanton].percent===0){kantonsdaten[kanton].percent = rpc(kantonsdaten[kanton].selected, kantonsdaten[kanton].total);}
        console.log(this.id+" - "+kantonsdaten[kanton].selected);
    });
   
   
   
   
    
    
    var max = 0;
    Total.Selection = 0;
    $('.canton').each(function(i) {
        var kanton = kantone[this.id];
        if(kanton!="Schweiz"){
            if(selectionMode == 0){
                max = Math.max(max, kantonsdaten[kanton].selected);
            }else{
                max = Math.max(max, kantonsdaten[kanton].percent); 
            }
            Total.Selection += kantonsdaten[kanton].selected;
        }
    });
    
    
    
    if(selectionMode == 0){
        exps[0].innerHTML = "0";
        exps[1].innerHTML = round(max*0.25);
        exps[2].innerHTML = round(max*0.5);
        exps[3].innerHTML = round(max*0.75);
        exps[4].innerHTML = round(max);
        exps[5].innerHTML = "Devices in Kanton";
        total.innerHTML = "Total of "+Total.amount+" Devices in Switzerland";
    }else{
        exps[0].innerHTML = "0%";
        exps[1].innerHTML = round(max*0.25)+'%';
        exps[2].innerHTML = round(max*0.5)+'%';
        exps[3].innerHTML = round(max*0.75)+'%';
        exps[4].innerHTML = round(max)+'%';
        exps[5].innerHTML = "Devices of Kanton";
        total.innerHTML = "Totally "+Total.Selection+" of "+Total.amount+" ("+rpc(Total.Selection,Total.amount)+"%) Devices selected in Switzerland";
    }

    cssObj.innerHTML = ""; //clear styles
    
    $('.canton').each(function(i) {
        var kanton = kantone[this.id];
        var amount = 0;
        if(max !== 0){
            if(selectionMode === 0){
                amount = kantonsdaten[kanton].selected/max*255;
            }else{
                amount = kantonsdaten[kanton].percent/max*255;
            }
        }else{
            amount = 0;
        }
        
        //this.style.fill="rgb("+redAmount+","+greenAmount+","+blueAmount+")";
        cssObj.innerHTML += '#'+this.id+" {fill: "+colorBrewer(amount)+";}\n";
    });
    console.log(cssObj.innerHTML);
    setWait(false);

    var schweiz = {'id':'schweiz','name':'Schwei'};
    //printData(schweiz);
    window.setTimeout("printData(schweiz);", 10);
}


//js sort object by key
//http://stackoverflow.com/questions/1359761/sorting-a-javascript-object
//or http://stackoverflow.com/questions/5467129/sort-javascript-object-by-key
function sortObject(o) {
    var sorted = {},
    key, a = [];
    for (key in o) {if (o.hasOwnProperty(key)) {a.push(key);} }
    a.sort();
    for (key = 0; key < a.length; key++) {sorted[a[key]] = o[a[key]];}
    return sorted;
}


function printNavi(){
    var inputBoxes = document.getElementById("inputBoxes");
    var text = "";
    text += 'Device Type: <select id="Device" onchange="setPaintParams(this)"><option value="all">All</option>';
    for(var device in sortObject(Total.Device)){
        text += '<option value="'+device+'">'+device+'</option>';
    }
    text += '</select>';
    
    text += ' OS: <select id="OS" onchange="setPaintParams(this)"><option value="all">All</option>';
    for(var os in sortObject(Total.OS)){
        text += '<option value="'+os+'">'+os+'</option>';
    }
    text += '</select>';
    
    text += ' Browser: <select id="Browser" onchange="setPaintParams(this)"><option value="all">All</option>';
    for(var browser in sortObject(Total.Browser)){
        text += '<option value="'+browser+'">'+browser+'</option>';
    }
    text += '</select><br>';
    inputBoxes.innerHTML = text;

    paintData();
}

function setPaintParams(input){
    Paint[input.id] = input.value;
    paintData();
}




