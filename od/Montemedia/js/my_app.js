$(document).ready(function() {
    initAll();
});

function initAll(){
    //switchShowInfo();
    loadMap();
    getData();
    drawGradient();
}

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
var currentKantonId;

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
var cssObj2 = document.createElement('style');
cssObj2.type = 'text/css';
document.getElementsByTagName('head')[0].appendChild(cssObj2);
// use cssObj2.innerHTML to change styles




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

function switchShowInfo(){
    var info = document.getElementById("info");
    var cover = document.getElementById("cover");
    if(info.style.display == "block"){
        info.style.display = "none";
        cover.style.display = "none";
    }else{
        info.style.display = "block";
        cover.style.display = "block";
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


function colorBrewer(amount){ //0-255
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

function colorBrewer2(amount){ //0-255
    var redd, redmin, red, greend, greenmin, green, blued, bluemin, blue;
    var red0=0, green0=0, blue0=255;
    var red50=255, green50=255, blue50=255;
    var red100=0, green100=255, blue100=0;
    
    //amount = Math.round(amount);
    
    var redAmount=0;
    var greenAmount=0;
    var blueAmount=0;
    
    if (amount<128){
        redd = red50-red0; greend = green50-green0; blued = blue50-blue0;
        redmin = Math.min(red50,red0);greenmin = Math.min(green50,green0);bluemin = Math.min(blue50,blue0);
    }
    else{
        redd = red100-red50; greend = green100-green50; blued = blue100-blue50;
        redmin = Math.min(red100,red50);greenmin = Math.min(green100,green50);bluemin = Math.min(blue100,blue50);
    }
    red= Math.round(amount/255*redd);
    if(redd>0){redAmount = red;}else{redAmount = Math.abs(redd)+red}
    redAmount += redmin;
    green= Math.round(amount/255*greend);
    if(greend>0){greenAmount = green;}else{greenAmount = Math.abs(greend)+green}
    greenAmount += greenmin;
    blue= Math.round(amount/255*blued);
    if(blued>0){blueAmount = blue;}else{blueAmount = Math.abs(blued)+blue}
    blueAmount += bluemin;
   
    //alert(redAmount+","+greenAmount+","+blueAmount);
    
    /*
    blueAmount = 255 - amount;
    greenAmount = amount;
    
    blueAmount = 80;
    redAmount = 0;
    */    
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
                             .attr("height", 15)
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
    currentKantonName = kanton.getAttribute("name");
    var selectedData = document.getElementById("selectedData");
    currentKantonId = kanton.id;
    kanton = kantone[kanton.id];
    var amount = kantonsdaten[kanton].total;
    var text = "";
    if(selectionMode === 0){
        text += "Amount of Devices in selected Region:<br>"+ kantonsdaten[kanton].selected +" ("+kantonsdaten[kanton].percent+"% of all Switzerland Data)";
    }else{
        text += "Amount of selected Devices in selected Region:<br>"+kantonsdaten[kanton].selected+" out of "+kantonsdaten[kanton].total+" ("+kantonsdaten[kanton].percent+"%)<br>";   
    }
    selectedData.innerHTML = text;
    
    document.getElementById("descriptiondevice").innerHTML = "Amount of different device types in % out of totally "+kantonsdaten[kanton].total+" devices in selected region";
    barchart(kantonsdaten, kanton, "Device");
    document.getElementById("descriptionos").innerHTML = "Amount of different operating systems in % out of totally "+kantonsdaten[kanton].total+" devices in selected region";
    barchart(kantonsdaten, kanton, "OS");
    document.getElementById("descriptionbrowser").innerHTML = "Amount of different browsers in % out of totally "+kantonsdaten[kanton].total+" devices in selected region";
    barchart(kantonsdaten, kanton, "Browser");
    sequences(kantonsdaten, kanton);
    
    showDataBox(true);
    
    if(currentKantonId == "schweiz"){
        //cssObj2.innerHTML = "#canton * {opacity:1;}"; 
        cssObj2.innerHTML = "";
    }else{
        //cssObj2.innerHTML = "#canton * {opacity:0.8;} #"+currentKantonId+" {stroke-width: 5px;opacity:1;}";
        cssObj2.innerHTML = "#"+currentKantonId+" {stroke-width: 5px;}";
    }
    
}


function paintData(){
    //showDataBox(false);
    console.clear();
    
    var exps = document.getElementById("expl").getElementsByTagName('p');
    
    
    
    
    
    
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
    
    
    var ext = "";
    if(selectionMode == 0){
        exps[5].innerHTML = "Devices in Kanton";
    }else{
        exps[5].innerHTML = "Devices of Kanton selected";
        ext = "%";
    }
    exps[0].innerHTML = "0"+ext;
    exps[1].innerHTML = round(max*0.25)+ext;
    exps[2].innerHTML = round(max*0.5)+ext;
    exps[3].innerHTML = round(max*0.75)+ext;
    exps[4].innerHTML = round(max)+ext;
    
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

    //schows swiss data
    var schweiz = {'id':'schweiz'};
    window.setTimeout("printData(schweiz);", 10);
    //activates first tab (Selection)
    $( "#tabs" ).tabs({ active: 0 });
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




