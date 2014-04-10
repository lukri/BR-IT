//Zoom-Prop
Zoom.EnableDblClick = false;
Zoom.BorderColor = 'black';
Zoom.BorderWidth = 1;
Zoom.ZIndex = 100; // z-index des Zoom-Bildes
Zoom.TimeSpan = 700;
Zoom.TimerInterval = 40; // 40 ms = 25 fps (frames per second)
Zoom.HideSmall = false; // to hide small image during zoom
Zoom.AddPosX = 3; // Offset zur Startposition des Zoom-Bildes
Zoom.AddPosY = 1;


//Param
produkteshow = new Array();
produkte = new Array();
currentItem = 0;
ammountOfItems = 0;
textbox = null;
itemcountbox = null;
bilderbox = null;
infobox = null;
bilder = null;
locked = false;
timer = null;
timerx = 0;
mode = "show";
zoombild = null;
zoomstate = false;

maxHeight = 60; minHeight = 30;
maxWidth = 60; minWidth = 30;
mitte=175; distanz=90;
links=mitte-distanz;  rechts=mitte+distanz;


function changeMode()
{
  if(mode=="show"){
     document.getElementsByTagName("table")[0].style.display = "block";
     document.getElementById("produktebox").style.display = "none";
     mode="grid";
  }else{
     document.getElementsByTagName("table")[0].style.display = "none";
     document.getElementById("produktebox").style.display = "block";
     mode="show";
  }
}

document.onkeydown = function(e){
        if (-[1,]) {
           keyCode = e.which; // do non IE-specific things (http://css-tricks.com/snippets/javascript/test-for-ie-in-javascript/)
        } else {
           keyCode = window.event.keyCode; // do IE-specific things
        }        
        switch (keyCode) {
        case 37:
            changePic('left');
            break;
        case 39:
            changePic('right');
            break;
        case 13:
            zoom('in');
            break;
    }
    //alert(keyCode);
};




function initialize() {
        tabelle = document.getElementsByTagName("table")[0]; //alternative byId
        produkte = tabelle.getElementsByTagName("tr");
        for (i = 0; i < produkte.length; i++) {
                produnkt = produkte[i];
                infos = produnkt.getElementsByTagName("td");
                produnkt.bild = infos[0].innerHTML;
                produnkt.info = infos[1].innerHTML;
                produkteshow[i] = produnkt;
        }
   
        tabelle.style.display = "none";
   
        newElement = document.createElement('div');
        tabelle.parentNode.appendChild(newElement);
        newElement.innerHTML = '<input id="modeswitcher" type="button" value="Overview" onclick="changeMode()">';
        newElement.innerHTML += '<div id="produktebox"><div id="productline">'+produkteshow[0].bild + produkteshow[0].info+'</div><div id="showcontainer"></div></div>';
        showcontainertd = document.getElementById("showcontainer");
        showcontainertd.innerHTML = '<div id="show"><div id="bilderbox"></div><div id="infobox"></div></div>';
        bilderbox = document.getElementById("bilderbox");
        bilderbox.innerHTML = '<div></div><div></div><div></div><span id="rahmen1"></span>';
        infobox = document.getElementById("infobox");
        infobox.innerHTML = '<span id="text"></span><span id="itemcount"></span>';
        produkteshow.splice(0,1); //Take the first row out
        ammountOfItems = produkteshow.length;
        bilder = bilderbox.getElementsByTagName("div");
        bilder[0].innerHTML = produkteshow[(currentItem - 1 + ammountOfItems) % ammountOfItems].bild;
        bilder[1].innerHTML = produkteshow[(currentItem + ammountOfItems) % ammountOfItems].bild;
        bilder[2].innerHTML = produkteshow[(currentItem + 1 + ammountOfItems) % ammountOfItems].bild;
        trans = distanz/mitte;
        bilder[0].style.opacity = trans;
        bilder[0].style.filter  = 'alpha(opacity=' + trans*100 + ')';  // IE fallback
        bilder[2].style.opacity = trans;
        bilder[2].style.filter  = 'alpha(opacity=' + trans*100 + ')';  // IE fallback
        bilder[0].style.left = links + "px";
        bilder[1].style.left = mitte + "px";
        bilder[2].style.left = rechts + "px";
        ZoomInit();
        showInfo();
}


function changePic(direction) {
        if (!locked & zoom('out')) {
                locked = true;
                document.getElementById("pic1").id = "";
                bilder = bilderbox.getElementsByTagName("div");
                newBild = document.createElement("div");
                if (direction == 'right') {
                        currentItem++;
                        currentItem = currentItem % ammountOfItems;
                        bilderbox.insertBefore(newBild, null);
                        newBild.style.left = (rechts+distanz) + "px";
                        bilder[3].innerHTML = produkteshow[(currentItem + 1 + ammountOfItems) % ammountOfItems].bild;
                        bilder[3].style.opacity = 0;
                        bilder[3].style.filter  = 'alpha(opacity=' + 0 + ')';  // IE fallback                        
                        delid = 0;
                } else {
                        currentItem--;
                        currentItem = (currentItem + ammountOfItems) % ammountOfItems;
                        bilderbox.insertBefore(newBild, bilder[0]);
                        newBild.style.left = (links-distanz) + "px";
                        bilder[0].innerHTML = produkteshow[(currentItem - 1 + ammountOfItems) % ammountOfItems].bild;
                        bilder[0].style.opacity = 0;
                        bilder[0].style.filter  = 'alpha(opacity=' + 0 + ')';  // IE fallback      
                        delid = 3;
                }
                bilder = bilderbox.getElementsByTagName("div");
                timer = window.setInterval(function(){movePics(direction)}, 20);
        }
}

function movePics(direction) {
        timerx++;
        if (direction == 'right') {
                m = -5;
        } else {
                m = 5;
        }
        for(i=0; i<4; i++){
             linkpos = parseInt(bilder[i].style.left) + m;
             bilder[i].style.left = linkpos + "px";
             if(linkpos>mitte){
                 trans= (rechts+distanz-linkpos)/mitte;
             }else{
                 trans= (linkpos-links+distanz)/mitte;
             }
             if(linkpos == mitte){trans= 1;}
             bilder[i].style.opacity = trans;
             bilder[i].style.filter  = 'alpha(opacity=' + trans*100 + ')';  // IE fallback
             //if(linkpos<links| linkpos> rechts){trans = distanz/mitte;}
             //bilder[i].style.height = trans*50+50;
        }

        if (timerx == (distanz/5)) {
                locked = false;
                timerx = 0;
                bilderbox.removeChild(bilder[delid]);
                clearInterval(timer);
                //window.location.hash = currentItem+1;
                showInfo();
                
        }
}


function zoom(zoommode){
   if(!locked){
     zoombild = document.getElementById("ZoomPic");
     zoomstate = (zoombild.style.visibility != "hidden");
     if(zoomstate){
       ZoomIn("pic1",bild.src);
       return false;
     }
     if(zoommode=="in" & !zoomstate){
       ZoomIn("pic1",bild.src);
       zoomstate=true;
       return false;
     }
   }
   return true;
}

function showInfo() {
        bilder = bilderbox.getElementsByTagName("div");
        bilder[0].onclick=function(){changePic('left')};
        bilder[0].id = 'picl';
        bild = bilder[1].getElementsByTagName("img")[0];
        bilder[1].onclick=function(){zoom('in')};
        bilder[1].id = 'pic1';
        bilder[2].onclick=function(){changePic('right')};
        bilder[2].id = 'picr';
        textbox = document.getElementById("text");
        textbox.innerHTML = produkteshow[currentItem].info;
        itemcountbox = document.getElementById("itemcount");
        itemcountbox.innerHTML = (currentItem + 1) + '/' + ammountOfItems;
}