// (C) http://walter.bislins.ch/doku/zoom

var xOp7Up,xOp6Dn,xIE4Up,xIE4,xIE5,xNN4,xUA=navigator.userAgent.toLowerCase();if(window.opera){var i=xUA.indexOf('opera');if(i!=-1){var v=parseInt(xUA.charAt(i+6),10);xOp7Up=v>=7;xOp6Dn=v<7;}}
else if(navigator.vendor!='KDE'&&document.all&&xUA.indexOf('msie')!=-1){xIE4Up=parseFloat(navigator.appVersion)>=4;xIE4=xUA.indexOf('msie 4')!=-1;xIE5=xUA.indexOf('msie 5')!=-1;}
else if(document.layers){xNN4=true;}
xMac=xUA.indexOf('mac')!=-1;function xDef(){for(var i=0;i<arguments.length;++i){if(typeof(arguments[i])=='undefined'){return false;}}
return true;}
function xFunc(){for(var i=0;i<arguments.length;++i){if(typeof(arguments[i])!='function'){return false;}}
return true;}
function xStr(){for(var i=0;i<arguments.length;++i){if(typeof(arguments[i])!='string'){return false;}}
return true;}
function xNum(){for(var i=0;i<arguments.length;++i){if(typeof(arguments[i])!='number'){return false;}}
return true;}
function xGetElementById(e){if(typeof(e)!='string'){return e;}
if(document.getElementById){e=document.getElementById(e);}
else if(document.all){e=document.all[e];}
else{e=null;}
return e;}
function xInnerHTML(e,t){if(!(e=xGetElementById(e))){return'';}
if(xDef(e.innerHTML)){if(xStr(t)){e.innerHTML=t;}
else{t=e.innerHTML;}}
return t;}
function xInnerText(e,defaultText){if(!(e=xGetElementById(e))){return defaultText;}
if(xDef(e.innerText)){return e.innerText;}
if(xDef(e.textContent)){return e.textContent;}
return defaultText;}
function xTagName(e){if(!(e=xGetElementById(e))){return;}
return xDef(e.tagName)?e.tagName.toLowerCase():'undefined';}
function xShow(e){xVisibility(e,1);}
function xHide(e){xVisibility(e,0);}
function xVisibility(e,bShow)
{if(!(e=xGetElementById(e))){return;}
if(e.style&&xDef(e.style.visibility)){if(xDef(bShow)){e.style.visibility=bShow?'visible':'hidden';}
return e.style.visibility;}
return null;}
function xDisplay(e,val){if(!(e=xGetElementById(e))){return;}
if(e.style&&xDef(e.style.display)){if(xStr(val)){var oldDisplay=e.style.display;e.style.display=val;if(oldDisplay!=val){xDisplayChanged(e);}}
return e.style.display;}
return null;}
function xIsDisplayed(e){if(!(e=xGetElementById(e))){return false;}
while(e&&!xIsRoot(e)){if(e.style&&xDef(e.style.display)){if(e.style.display=='none'){return false;}}
e=xParent(e,true);}
return true;}
function xMoveTo(e,iX,iY){xLeft(e,iX);xTop(e,iY);}
function xLeft(e,iX){if(!(e=xGetElementById(e))){return 0;}
var css=xDef(e.style);if(css&&xStr(e.style.left)){if(xNum(iX)){e.style.left=iX+'px';}
else{iX=parseInt(e.style.left,10);if(isNaN(iX)){iX=0;}}}
else if(css&&xDef(e.style.pixelLeft)){if(xNum(iX)){e.style.pixelLeft=iX;}
else{iX=e.style.pixelLeft;}}
return iX;}
function xTop(e,iY){if(!(e=xGetElementById(e))){return 0;}
var css=xDef(e.style);if(css&&xStr(e.style.top)){if(xNum(iY)){e.style.top=iY+'px';}
else{iY=parseInt(e.style.top,10);if(isNaN(iY)){iY=0;}}}
else if(css&&xDef(e.style.pixelTop)){if(xNum(iY)){e.style.pixelTop=iY;}
else{iY=e.style.pixelTop;}}
return iY;}
function xOpacity(e,uO){if(!(e=xGetElementById(e))){return 100;}
if(xDef(e.style)&&xDef(e.style.opacity)){if(xNum(uO)){e.style.opacity=uO/100.0;}else{uO=e.style.opacity*100;}}
else if(xDef(e.filters)&&xDef(e.filters.alpha)&&xDef(e.filters.alpha.opacity)){if(xNum(uO)){e.filters.alpha.opacity=uO;}
else{uO=e.filters.aplha.opacity;}}
else{uO=100;}
return uO;}
function xResizeTo(e,uW,uH,bBorderBoxSizing){xWidth(e,uW,bBorderBoxSizing);xHeight(e,uH,bBorderBoxSizing);}
function xWidth(e,uW,bBorderBoxSizing){if(!(e=xGetElementById(e))){return 0;}
if(xNum(uW)){if(uW<0){uW=0;}
else{uW=Math.round(uW);}}
else{uW=-1;}
var css=xDef(e.style);if(css&&xDef(e.offsetWidth)&&xStr(e.style.width)){if(uW>=0){xSetCW(e,uW,bBorderBoxSizing);}
uW=e.offsetWidth;}
else if(css&&xDef(e.style.pixelWidth)){if(uW>=0){e.style.pixelWidth=uW;}
uW=e.style.pixelWidth;}
return uW;}
function xScrollWidth(e){if(!(e=xGetElementById(e))){return 0;}
var sw=0;if(e.scrollWidth){sw=e.scrollWidth;}
return sw;}
function xScrollHeight(e){if(!(e=xGetElementById(e))){return 0;}
var sh=0;if(e.scrollHeight){sh=e.scrollHeight;}
return sh;}
function xHeight(e,uH,bBorderBoxSizing){if(!(e=xGetElementById(e))){return 0;}
if(xNum(uH)){if(uH<0){uH=0;}
else{uH=Math.round(uH);}}
else{uH=-1;}
var css=xDef(e.style);if(css&&xDef(e.offsetHeight)&&xStr(e.style.height)){if(uH>=0){xSetCH(e,uH,bBorderBoxSizing);}
uH=e.offsetHeight;}
else if(css&&xDef(e.style.pixelHeight)){if(uH>=0){e.style.pixelHeight=uH;}
uH=e.style.pixelHeight;}
return uH;}
function xGetCS(ele,sP){return parseInt(document.defaultView.getComputedStyle(ele,'').getPropertyValue(sP),10);}
function xSetCW(ele,uW,bBorderBoxSizing){var pl=0,pr=0,bl=0,br=0;var bbs=bBorderBoxSizing;if(!xDef(bbs))bbs=false;if(xDef(document.defaultView)&&xDef(document.defaultView.getComputedStyle)){pl=xGetCS(ele,'padding-left');pr=xGetCS(ele,'padding-right');bl=xGetCS(ele,'border-left-width');br=xGetCS(ele,'border-right-width');}
else if(xDef(ele.currentStyle,document.compatMode)&&(document.compatMode=='CSS1Compat')){pl=parseInt(ele.currentStyle.paddingLeft,10);pr=parseInt(ele.currentStyle.paddingRight,10);bl=parseInt(ele.currentStyle.borderLeftWidth,10);br=parseInt(ele.currentStyle.borderRightWidth,10);}
else if(xDef(ele.offsetWidth,ele.style.width)){ele.style.width=uW+'px';pl=ele.offsetWidth-uW;}
if(isNaN(pl)){pl=0;}
if(isNaN(pr)){pr=0;}
if(isNaN(bl)){bl=0;}
if(isNaN(br)){br=0;}
var cssW=uW-(pl+pr+bl+br);if(bbs){cssW=uW;}
if(isNaN(cssW)||cssW<0){return;}
else{ele.style.width=cssW+'px';}}
function xSetCH(ele,uH,bBorderBoxSizing){var pt=0,pb=0,bt=0,bb=0;var bbs=bBorderBoxSizing;if(!xDef(bbs))bbs=false;if(xDef(document.defaultView)&&xDef(document.defaultView.getComputedStyle)){pt=xGetCS(ele,'padding-top');pb=xGetCS(ele,'padding-bottom');bt=xGetCS(ele,'border-top-width');bb=xGetCS(ele,'border-bottom-width');}
else if(xDef(ele.currentStyle,document.compatMode)&&(document.compatMode=='CSS1Compat')){pt=parseInt(ele.currentStyle.paddingTop,10);pb=parseInt(ele.currentStyle.paddingBottom,10);bt=parseInt(ele.currentStyle.borderTopWidth,10);bb=parseInt(ele.currentStyle.borderBottomWidth,10);}
else if(xDef(ele.offsetHeight,ele.style.height)){ele.style.height=uH+'px';pt=ele.offsetHeight-uH;}
if(isNaN(pt)){pt=0;}
if(isNaN(pb)){pb=0;}
if(isNaN(bt)){bt=0;}
if(isNaN(bb)){bb=0;}
var cssH=uH-(pt+pb+bt+bb);if(bbs){cssH=uH;}
if(isNaN(cssH)||cssH<0){return;}
else{ele.style.height=cssH+'px';}}
function xClientWidth(){var w=0;if(xOp6Dn){w=window.innerWidth;}
else if(document.compatMode=='CSS1Compat'&&!window.opera&&document.documentElement&&document.documentElement.clientWidth){w=document.documentElement.clientWidth;}
else if(document.body&&document.body.clientWidth){w=document.body.clientWidth;}
else if(xDef(window.innerWidth,window.innerHeight,document.height)){w=window.innerWidth;if(document.height>window.innerHeight){w-=16;}}
return w;}
function xClientHeight(){var h=0;if(xOp6Dn){h=window.innerHeight;}
else if(document.compatMode=='CSS1Compat'&&!window.opera&&document.documentElement&&document.documentElement.clientHeight){h=document.documentElement.clientHeight;}
else if(document.body&&document.body.clientHeight){h=document.body.clientHeight;}
else if(xDef(window.innerWidth,window.innerHeight,document.width)){h=window.innerHeight;if(document.width>window.innerWidth){h-=16;}}
return h;}
function xPageX(e){if(!(e=xGetElementById(e))){return 0;}
var x=0;var n=e;while(e&&!xIsRoot(e)){if(xDef(e.offsetLeft)){x+=e.offsetLeft;}
e=xDef(e.offsetParent)?e.offsetParent:null;}
e=n;while(e&&!xIsRoot(e)){if(xNum(e.scrollLeft)){x-=e.scrollLeft;}
e=xParent(e,true);}
return x;}
function xPageY(e){if(!(e=xGetElementById(e))){return 0;}
var y=0;var n=e;while(e&&!xIsRoot(e)){if(xDef(e.offsetTop)){y+=e.offsetTop;}
e=xDef(e.offsetParent)?e.offsetParent:null;}
e=n;while(e&&!xIsRoot(e)){if(xNum(e.scrollTop)){y-=e.scrollTop;}
e=xParent(e,true);}
return y;}
function xIsRoot(e){return(e==document||e.tagName.toLowerCase()=='html'||e.tagName.toLowerCase()=='body');}
function xScrollLeft(e,bWin)
{var offset=0;if(!xDef(e)||bWin||xIsRoot(e)){var w=window;if(bWin&&e){w=e;}
if(w.document.documentElement&&w.document.documentElement.scrollLeft){offset=w.document.documentElement.scrollLeft;}
else if(w.document.body&&xDef(w.document.body.scrollLeft)){offset=w.document.body.scrollLeft;}}
else{e=xGetElementById(e);if(e&&xNum(e.scrollLeft)){offset=e.scrollLeft;}}
return offset;}
function xScrollTop(e,bWin,val)
{var offset=0;if(!xDef(e)||bWin||xIsRoot(e)){var w=window;if(bWin&&e){w=e;}
if(w.document.documentElement&&w.document.documentElement.scrollTop){offset=w.document.documentElement.scrollTop;if(xNum(val)){w.document.documentElement.scrollTop=val;}}
else if(w.document.body&&xDef(w.document.body.scrollTop)){offset=w.document.body.scrollTop;if(xNum(val)){w.document.body.scrollTop=val;}}}
else{e=xGetElementById(e);if(e&&xNum(e.scrollTop)){offset=e.scrollTop;if(xNum(val)){e.scrollTop=val;}}}
return offset;}
function xZIndex(e,uZ)
{if(!(e=xGetElementById(e))){return 0;}
if(e.style&&xDef(e.style.zIndex)){if(xNum(uZ)){e.style.zIndex=uZ;}
uZ=parseInt(e.style.zIndex,10);}
return uZ;}
function xCursor(e,c)
{if(!(e=xGetElementById(e))){return'';}
if(e.style&&xDef(e.style.cursor)){if(xStr(c)){e.style.cursor=c;}
c=e.style.cursor;}
return c;}
function xStyle(e,sStyle,sVal){if(!(e=xGetElementById(e))){return'';}
if(e.style&&xStr(sStyle)&&xDef(e.style[sStyle])){if(xDef(sVal)){e.style[sStyle]=sVal;}
else{sVal=e.style[sStyle];}}
return sVal;}
function xMaskRegExp(s){return s.replace(/\-/g,'\\-');}
function xHasClass(e,cls){if(!(e=xGetElementById(e))){return false;}
return e.className.match(new RegExp('(\\s|^)'+xMaskRegExp(cls)+'(\\s|$)'));}
function xAddClass(e,cls){if(!(e=xGetElementById(e))){return;}
if(!this.xHasClass(e,cls))e.className+=' '+cls;}
function xRemoveClass(e,cls){if(!(e=xGetElementById(e))){return;}
if(xHasClass(e,cls)){var reg=new RegExp('(\\s|^)'+xMaskRegExp(cls)+'(\\s|$)');e.className=e.className.replace(reg,' ').replace(/^\s+|\s+$/g,'');}}
function xParent(e,bNode){if(!(e=xGetElementById(e))){return null;}
var p=null;if(!bNode&&xDef(e.offsetParent)){p=e.offsetParent;}
else if(xDef(e.parentNode)){p=e.parentNode;}
else if(xDef(e.parentElement)){p=e.parentElement;}
return p;}
function xCreateElement(sTag){if(document.createElement){return document.createElement(sTag);}
else{return null;}}
function xCreateTextNode(s){if(document.createTextNode){return document.createTextNode(s);}
else{return null;}}
function xHasChildNodes(oParent){if(oParent.hasChildNodes){return oParent.hasChildNodes();}
else{return false;}}
function xChildNodes(oParent){if(oParent.childNodes){return oParent.childNodes;}
else{return[];}}
function xAppendChild(oParent,oChild){if(oParent.appendChild){return oParent.appendChild(oChild);}
else{return null;}}
function xInsertBefore(oParent,oChild,oRef){if(oParent.insertBefore){return oParent.insertBefore(oChild,oRef);}
else{return oChild;}}
function xRemoveChild(oParent,oChild){if(oParent.removeChild){return oParent.removeChild(oChild);}
else{return oChild;}}
function xGetElementsByTagName(t,p)
{var list=null;t=t||'*';p=p||document;if(xIE4||xIE5){if(t=='*'){list=p.all;}
else{list=p.all.tags(t);}}
else if(p.getElementsByTagName){list=p.getElementsByTagName(t);}
return list||[];}
function xAddEventListener(e,eT,eL,cap)
{if(!(e=xGetElementById(e))){return;}
eT=eT.toLowerCase();if((!xIE4Up&&!xOp7Up)&&e==window){if(eT=='resize'){window.xPCW=xClientWidth();window.xPCH=xClientHeight();window.xREL=eL;xResizeEvent();return;}
if(eT=='scroll'){window.xPSL=xScrollLeft();window.xPST=xScrollTop();window.xSEL=eL;xScrollEvent();return;}}
var eh='e.on'+eT+'=eL';if(e.addEventListener){e.addEventListener(eT,eL,cap);}
else if(e.attachEvent){e.attachEvent('on'+eT,eL);}
else{eval(eh);}}
function xResizeEvent()
{if(window.xREL){setTimeout('xResizeEvent()',250);}
var cw=xClientWidth(),ch=xClientHeight();if(window.xPCW!=cw||window.xPCH!=ch){window.xPCW=cw;window.xPCH=ch;if(window.xREL){window.xREL();}}}
function xScrollEvent()
{if(window.xSEL){setTimeout('xScrollEvent()',250);}
var sl=xScrollLeft(),st=xScrollTop();if(window.xPSL!=sl||window.xPST!=st){window.xPSL=sl;window.xPST=st;if(window.xSEL){window.xSEL();}}}
function xRemoveEventListener(e,eT,eL,cap)
{if(!(e=xGetElementById(e))){return;}
eT=eT.toLowerCase();if((!xIE4Up&&!xOp7Up)&&e==window){if(eT=='resize'){window.xREL=null;return;}
if(eT=='scroll'){window.xSEL=null;return;}}
var eh='e.on'+eT+'=null';if(e.removeEventListener){e.removeEventListener(eT,eL,cap);}
else if(e.detachEvent){e.detachEvent('on'+eT,eL);}
else{eval(eh);}}
function xEvent(evt)
{this.Init(evt);}
xEvent.prototype.Init=function(evt)
{var e=evt||window.event;this.event=e;if(!e){return;}
if(e.type){this.type=e.type;}
if(e.target){this.target=e.target;}
else if(e.srcElement){this.target=e.srcElement;}
if(e.relatedTarget){this.relatedTarget=e.relatedTarget;}
else if(e.type=='mouseover'&&e.fromElement){this.relatedTarget=e.fromElement;}
else if(e.type=='mouseout'){this.relatedTarget=e.toElement;}
if(xOp6Dn){this.pageX=e.clientX;this.pageY=e.clientY;}
else if(xDef(e.pageX,e.pageY)){this.pageX=e.pageX;this.pageY=e.pageY;}
else if(xDef(e.clientX,e.clientY)){this.pageX=e.clientX+xScrollLeft();this.pageY=e.clientY+xScrollTop();}
if(xDef(e.offsetX,e.offsetY)){this.offsetX=e.offsetX;this.offsetY=e.offsetY;}
else if(xDef(e.layerX,e.layerY)){this.offsetX=e.layerX;this.offsetY=e.layerY;}
else{this.offsetX=this.pageX-xPageX(this.target);this.offsetY=this.pageY-xPageY(this.target);}
if(e.keyCode){this.keyCode=e.keyCode;}
else if(xDef(e.which)&&e.type.indexOf('key')!=-1){this.keyCode=e.which;}
this.shiftKey=e.shiftKey;this.ctrlKey=e.ctrlKey;this.altKey=e.altKey;return this;};xEvent.prototype.PreventDefault=function(){if(!this.event){return;}
if(this.event.preventDefault){this.event.preventDefault();}
this.event.returnValue=false;};xEvent.prototype.StopPropagation=function(){if(!this.event){return;}
if(this.event.stopPropagation){this.event.stopPropagation();}
this.event.cancelBubble=true;};function xCallbackChain(){this.Callback=null;this.Active=false;}
xCallbackChain.prototype.Add=function(aFunc){aFunc.NextCallback=this.Callback;this.Callback=aFunc;};xCallbackChain.prototype.Call=function(aArg){if(this.Active){return;}
this.Active=true;var cb=this.Callback;while(cb){cb(aArg);cb=cb.NextCallback;}
this.Active=false;};function xOnDisplay(aFunc){if(!window.onEleDisplay){window.onEleDisplay=new xCallbackChain();}
window.onEleDisplay.Add(aFunc);}
function xDisplayChanged(aEle){if(window.onEleDisplay){window.onEleDisplay.Call(aEle);}}
function xOnLoad(aFunc){var oldLoadFunc=window.onload;window.onload=function(){if(oldLoadFunc){oldLoadFunc();}
aFunc();};}
function xOnUnload(aFunc){var oldUnloadFunc=window.onunload;window.onunload=function(){if(oldUnloadFunc){oldUnloadFunc();}
aFunc();};}
function xClipboard(text){if(xDef(window.clipboardData)){if(xStr(text)){window.clipboardData.setData('Text',text);}
else{text=window.clipboardData.getData('Text');}}
return text;}
function xTimeMS(){var date=new Date();return date.getTime();}
function xImage(aImgFilename){var img=new Image();img.src=aImgFilename;return img;}
function xChangeImage(aImgID,aImg){var img=xGetElementById(aImgID);if(img){img.src=aImg.src;}}
function xMultiImage(aImgID){this.ImgID=aImgID;this.Images=[];var a=xMultiImage.arguments;for(var i=1;i<a.length;i++){this.Images[i-1]=xImage(a[i]);}}
xMultiImage.prototype.Show=function(aImageNumber){xChangeImage(this.ImgID,this.Images[aImageNumber]);};var xDbgMess='';var xDbgSep='\n';function xDbg(aMess){if(aMess){xDbgMess+=aMess+xDbgSep;}
else{alert(xDbgMess);}}
function xDbgOut(x){var o=xGetElementById('xdbgout');if(o){o.value=x;}}
function xDbgApp(x){var o=xGetElementById('xdbgout');if(o){o.value+=x+'\n';}}
function xSetCookie(name,value,days){days=days||1;var date=new Date();date.setTime(date.getTime()+(days*24*60*60*1000));var expires='; expires='+date.toGMTString();document.cookie=name+'='+escape(value)+expires+'; path=/';}
function xGetCookie(name){var ca=document.cookie.split(';');for(var i=0;i<ca.length;i++){var c=ca[i];var eqPos=c.indexOf('=');var cName=c.substr(0,eqPos).replace(/^\s+|\s+$/g,'');if(name==cName){return unescape(c.substr(eqPos+1));}}
return null;}
function xDeleteCookie(name){xSetCookie(name,'',-1);}
function htmlString(aStr){var s=aStr;s=s.replace(/</g,'&lt;');s=s.replace(/>/g,'&gt;');return s;}//

var IC=new CImgCache();var ICLoadPending=0;var ICLoading=1;var ICLoaded=2;var ICError=3;var ICAbort=4;function CImgCache(){this.CheckLoadInterval=100;this.MaxNLoading=2;this.LoadDelay=0;this.EnableStatusDisplay=true;this.NImages=0;this.NLoading=0;this.NUnloaded=0;this.NError=0;this.NAbort=0;this.NLoaded=0;this.Images=[];this.ErrorMsg='';this.OnAllLoaded=new xCallbackChain();this.OnImgLoaded=new xCallbackChain();this.OnLoadCalling=false;this.LoadNextCalling=false;this.PrioList=[];this.Timer=null;var me=this;this.OnCheckLoaded=function(){me.CheckLoaded();};}
CImgCache.prototype.AddOnAllLoaded=function(aFunc){this.OnAllLoaded.Add(aFunc);};CImgCache.prototype.AddOnImgLoaded=function(aFunc){this.OnImgLoaded.Add(aFunc);};CImgCache.prototype.IsValid=function(aImageID){return((aImageID>=0)&&(aImageID<this.NImages));};CImgCache.prototype.PreloadImages=function(aUrls,aRoot)
{if(!xDef(aRoot)){aRoot='';}
for(i=0;i<aUrls.length;i++){if(aUrls[i]){this.PreloadImage(aRoot+aUrls[i]);}}};CImgCache.prototype.PreloadImage=function(aUrl,aOnLoadFunc)
{var id=this.FindImage(aUrl);if(id>=0){var img=this.Images[id];if(!xDef(aOnLoadFunc)){aOnLoadFunc=this.Images[id].OnLoadFunc;}
if(img.CacheState==ICError||img.CacheState==ICAbort){this.ReloadImage(id,aOnLoadFunc);}else{this.Images[id].OnLoadFunc=aOnLoadFunc;}}else{if(!xDef(aOnLoadFunc)){aOnLoadFunc=null;}
id=this.AddImage(aUrl,aOnLoadFunc);}
this.LoadNext();return id;};CImgCache.prototype.LoadImage=function(aUrl,aOnLoadFunc)
{var id=this.FindImage(aUrl);if(id>=0){var img=this.Images[id];if(!xDef(aOnLoadFunc)){aOnLoadFunc=this.Images[id].OnLoadFunc;}
if(img.CacheState==ICError||img.CacheState==ICAbort){this.ReloadImage(id,aOnLoadFunc);}else{this.Images[id].OnLoadFunc=aOnLoadFunc;}}else{if(!xDef(aOnLoadFunc)){aOnLoadFunc=null;}
id=this.AddImage(aUrl,aOnLoadFunc);}
if(this.Images[id].CacheState==ICLoadPending&&!this.InPrioList(id)){this.PrioList[this.PrioList.length]=id;}
this.LoadNext();return id;};CImgCache.prototype.ReloadImage=function(aImgID,aOnLoadFunc)
{var img=this.Images[aImgID];img.OnLoadFunc=aOnLoadFunc;if(img.CacheState!=ICLoadPending){img.CacheState=ICLoadPending;this.NUnloaded++;this.DisplayStatus();}};CImgCache.prototype.FindImage=function(aUrl){for(var i=0;i<this.NImages;i++){if(this.Images[i].CacheUrl==aUrl){return i;}}
return-1;};CImgCache.prototype.Image=function(aImageID){return this.Images[aImageID];};CImgCache.prototype.ImageByUrl=function(aUrl){var imgID=this.FindImage(aUrl);return(imgID>=0)?this.Image(imgID):null;};CImgCache.prototype.GetNUnloaded=function(){this.CheckLoaded();return this.NUnloaded;};CImgCache.prototype.IsLoaded=function(aImageID){return(this.IsValid(aImageID)&&(this.Images[aImageID].CacheState==ICLoaded));};CImgCache.prototype.IsLoadedByUrl=function(aUrl){var imgID=this.FindImage(aUrl);if(imgID>=0){return this.IsLoaded(imgID);}
return false;};CImgCache.prototype.ImageState=function(aImageID){return(this.Images[aImageID].CacheState);};CImgCache.prototype.ImageStateByUrl=function(aUrl){var imgID=this.FindImage(aUrl);if(imgID>=0){return this.ImageState(imgID);}
return-1;};CImgCache.prototype.ImageUrl=function(aImageID){return this.Image(aImageID).CacheUrl;};CImgCache.prototype.GetStatus=function()
{var s='';if(this.NUnloaded>0||this.NError>0||this.NAbort>0){s+='Bilder zu laden: noch '+this.NUnloaded+' von '+this.NImages+'. ';if(this.NError>0||this.NAbort>0){s+='(Geladen: '+this.NLoaded+'; ';s+='Fehler: '+this.NError+'; ';s+='Abbruch: '+this.NAbort+')';}}
return s;};CImgCache.prototype.ResetStatus=function(){this.ErrorMsg='';this.NError=0;this.NAbort=0;};CImgCache.prototype.DisplayStatus=function()
{if(this.EnableStatusDisplay){window.status=this.GetStatus();}};CImgCache.prototype.AddImage=function(aUrl,aOnLoadFunc)
{var id=this.NImages;var img=new Image();img.CacheUrl=aUrl;img.CacheState=ICLoadPending;img.OnLoadFunc=aOnLoadFunc;img.WasLoaded=false;img.WasError=false;img.WasAbort=false;img.onload=function(){this.WasLoaded=true;};img.onerror=function(){this.WasError=true;};img.onabort=function(){this.WasAbrort=true;};this.Images[id]=img;this.NUnloaded++;this.NImages++;this.DisplayStatus();return id;};CImgCache.prototype.InPrioList=function(aImageID){for(var i=0;i<this.PrioList.length;i++){if(this.PrioList[i]==aImageID){return true;}}
return false;};CImgCache.prototype.LoadNext=function()
{if(this.NUnloaded==0||this.LoadNextCalling){return;}
this.LoadNextCalling=true;while((this.NUnloaded>0)&&(this.PrioList.length>0)&&(this.NLoading<this.MaxNLoading)){var id=this.PrioList.shift();this.StartLoading(id);}
var found=true;while((this.NUnloaded>0)&&found&&(this.NLoading<this.MaxNLoading)){var id=this.FindLoadPending();if(id==-1){found=false;}else{this.StartLoading(id);}}
this.LoadNextCalling=false;};CImgCache.prototype.FindLoadPending=function(){for(var id=0;id<this.Images.length;id++){if(this.Images[id].CacheState==ICLoadPending){return id;}}
return-1;};CImgCache.prototype.StartLoading=function(aImageID){if(this.Timer){clearTimeout(this.Timer);this.Timer=null;}
var img=this.Images[aImageID];if(img.CacheState==ICLoadPending||img.CacheState==ICAbort){this.NLoading++;this.DisplayStatus();img.CacheState=ICLoading;if(this.LoadDelay>0){setTimeout(function(){img.src=img.CacheUrl;},this.LoadDelay);}else{img.src=img.CacheUrl;}}
if(this.NLoading>0&&this.Timer==null){this.Timer=setTimeout(this.OnCheckLoaded,this.CheckLoadInterval);}};CImgCache.prototype.CheckLoaded=function()
{if(this.Timer){clearTimeout(this.Timer);this.Timer=null;}
for(var id=0;id<this.NImages;id++){var img=this.Images[id];if(img.CacheState==ICLoading){if(img.complete||img.WasLoaded){this.OnLoad(id);}
if(img.WasError){this.OnError(id);}
if(img.WasAbort){this.OnAbort(id);}}}
if(this.NLoading>0&&this.Timer==null){this.Timer=setTimeout(this.OnCheckLoaded,this.CheckLoadInterval);}};CImgCache.prototype.OnImage=function(aImageID)
{this.NLoading--;this.NUnloaded--;this.DisplayStatus();this.CallLoadedFunc(aImageID);this.OnImgLoaded.Call(aImageID);if(this.NUnloaded==0){this.OnAllLoaded.Call();}else{this.LoadNext();}};CImgCache.prototype.OnLoad=function(aImageID)
{if(this.Images[aImageID].CacheState!=ICLoading){return;}
this.NLoaded++;this.DisplayStatus();this.Images[aImageID].CacheState=ICLoaded;this.OnImage(aImageID);};CImgCache.prototype.OnError=function(aImageID)
{if(this.Images[aImageID].CacheState!=ICLoading){return;}
this.NError++;this.ErrorMsg+=' Error loading '+this.Images[aImageID].src;this.DisplayStatus();this.Images[aImageID].CacheState=ICError;this.OnImage(aImageID);};CImgCache.prototype.OnAbort=function(aImageID)
{if(this.Images[aImageID].CacheState!=ICLoading){return;}
this.NAbort++;this.DisplayStatus();this.Images[aImageID].CacheState=ICAbort;this.OnImage(aImageID);};CImgCache.prototype.CallLoadedFunc=function(aImageID){var img=this.Images[aImageID];if(!this.OnLoadCalling&&img.OnLoadFunc){this.OnLoadCalling=true;try{img.OnLoadFunc(aImageID);}catch(e){this.OnLoadCalling=false;return;}
this.OnLoadCalling=false;}};//

var Zoom=null;function ZoomInit(){Zoom.Init(ZoomInit.arguments);}
function ZoomPics(){Zoom.LoadPicsOnPageLoad(ZoomPics.arguments);}
function ZoomDebug(){Zoom.DebugOn=true;}
function ZoomIn(aImgName,aBigImgUrl,aXOffset,aYOffset,aRelEleID){Zoom.ZoomIn(aImgName,aBigImgUrl,aXOffset,aYOffset,aRelEleID);}
function ZoomOut(){Zoom.ZoomOut();}
function ZoomEnable(){Zoom.Enable();}
function ZoomDisable(){Zoom.Disable();}
var CZHidden=0;var CZLoading=1;var CZZoomIn=2;var CZZoomed=3;var CZZoomOut=4;function CZoom()
{if(Zoom){return;}
this.DebugOn=false;this.AutoPreload=true;this.EnableInitOnClick=false;this.EnableDblClick=true;this.ZoomWindowName='Zoom';this.ZoomWindowFeatures='';this.NewWindowOnDblClick=false;this.BorderColor='black';this.BorderWidth=1;this.BaseZIndex=1;this.ZIndex=100;this.TimeSpan=500;this.TimerInterval=40;this.HideSmall=false;this.TimeModifyFunc=null;this.Enabled=true;this.VAlign='ToMiddle';this.HAlign='ToCenter';this.VMargin=0;this.HMargin=0;this.TargetOffsetX=0;this.TargetOffsetY=0;
this.TargetElement='';this.LoadText='Lade...';this.ErrorText='Zoom-Fehler!';this.ErrMsg='';
this.ZoomFunctionName='ZoomIn';this.AddPosX=1;this.AddPosY=1;this.SmallPosX=0;this.SmallPosY=0;this.SmallWidth=0;this.SmallHeight=0;this.BigPosX=0;this.BigPosY=0;this.BigWidth=0;this.BigHeight=0;this.CurrVAlign=this.VAlign;this.CurrHAlign=this.HAlign;this.CurrTargetEle=null;this.CurrTargetOffX=0;this.CurrTargetOffY=0;this.StartTime=0;this.Timer=null;this.BigImgID=-1;this.SmallImg=null;this.WaitObj=null;this.ErrObj=null;this.ZoomImg=null;this.State=CZHidden;this.InitExecuted=false;this.PreloadExecuted=false;this.InitForced=false;this.HtmlWritten=false;this.DblClickActive=false;this.DebugDisplayed=false;Zoom=this;}
CZoom.prototype.Init=function(aImgUrlList){var me=this;function AfterPageLoad(){me.CreateHtmlObjects();if(aImgUrlList.length>0){me.Preload(aImgUrlList);}
if(me.AutoPreload){me.FindAndPreloadImages();}
me.InitExecuted=true;}
if(this.InitExecuted){return;}
xOnLoad(AfterPageLoad);};CZoom.prototype.ForceInit=function(){if(this.InitExecuted){return;}
this.CreateHtmlObjects();this.InitExecuted=true;this.InitForced=true;};CZoom.prototype.FindAndPreloadImages=function(){var urlList=[];var callList=this.FindZoomFunctionCalls();for(var i=0;i<callList.length;i++){urlList.push(this.GetPathFromZoomFunctionCall(callList[i]));}
if(urlList.length>0){this.Preload(urlList);}}
CZoom.prototype.FindZoomFunctionCalls=function(){var callList=[];var el=xGetElementsByTagName('*');for(var i=0;i<el.length;i++){var e=el[i];if(e.onclick){var src=this.IsZoomFunctionCall(e.onclick);if(src!=''){callList.push(src);}}
if(e.tagName&&e.tagName.toLowerCase()=='a'){var href=e.href||'';if(href.indexOf('javascript:')>=0){var src=this.IsZoomFunctionCall(href);if(src!=''){callList.push(src);}}}}
return callList;}
CZoom.prototype.HasMultipleCallsWithSameId=function(){var lastId='';var callList=this.FindZoomFunctionCalls();for(var i=0;i<callList.length;i++){var id=this.GetIdFromZoomFunctionCall(callList[i]);if(id==lastId){return true;}
lastId=id;}
return false;}
CZoom.prototype.IsZoomFunctionCall=function(aHandler){var s=''+aHandler;var p=s.indexOf(this.ZoomFunctionName);return(p>=0)?s:'';}
CZoom.prototype.GetPathFromZoomFunctionCall=function(aCallStr){var p=aCallStr.indexOf(this.ZoomFunctionName);if(p<0){return'';}
p=aCallStr.indexOf(',',p);var sp=aCallStr.indexOf('\'',p);var ep=aCallStr.indexOf('\'',sp+1);return aCallStr.substring(sp+1,ep);}
CZoom.prototype.GetIdFromZoomFunctionCall=function(aCallStr){var p=aCallStr.indexOf(this.ZoomFunctionName);if(p<0){return'';}
p=aCallStr.indexOf('(',p);var sp=aCallStr.indexOf('\'',p);var ep=aCallStr.indexOf('\'',sp+1);return aCallStr.substring(sp+1,ep);}
CZoom.prototype.LoadPicsOnPageLoad=function(aImgUrlList){var me=this;function AfterPageLoad(){if(aImgUrlList.length>0){me.Preload(aImgUrlList);}}
xOnLoad(AfterPageLoad);};CZoom.prototype.Preload=function(aImgUrlList){if(aImgUrlList.length==2&&typeof(aImgUrlList[1])=='object'){IC.PreloadImages(aImgUrlList[1],aImgUrlList[0]);}
else{IC.PreloadImages(aImgUrlList);}
this.PreloadExecuted=true;};CZoom.prototype.Diagnose=function(){var ics=IC.GetStatus();var s='';if(this.ErrMsg!=''){s+='Errors:\n';s+=this.ErrMsg+'\n';}
if(!this.PreloadExecuted){s+='Warning: No images preloaded!\nUse ZoomInit or ZoomPics to preload the zoom images or set Zoom.AutoPreload = true.';this.PreloadExecuted=true;}
if(this.HasMultipleCallsWithSameId()){s+='Warning: Same id used in different calls of ZoomIn()!\nThis is commonly the cause for zooming in from the wrong thumbnail picture.';}
if(s==''){if(ics!=''){s='Zoom Status: ok.\nBut problems with some images detected.\nCheck url\'s in ZoomInit and ZoomIn!';}}else{s='Zoom Status:\n\n'+s;}
if(ics!=''){s+='\n\nIC Status (IC = Image Caching and Preload):\n'+ics+'\n'+IC.ErrorMsg;IC.ResetStatus();}
if(s!=''||!this.DebugDisplayed){if(s==''){s='Zoom Status: all fine!\n\nTo remove this message,\ndelete or comment the line with ZoomDebug(); from your script.';}
alert(s);}
this.ErrMsg='';this.DebugDisplayed=true;};CZoom.prototype.AddError=function(aMsg){this.ErrMsg+=aMsg+'\n';};CZoom.prototype.CreateHtmlObjects=function()
{var me=this;var msgFailed='CZoom.CreateHtmlObjects: creating Zoom HTML failed ';function OnClick(){me.ZoomOut();}
function OnDblClick(){me.NewWindow();}
var oImg=xCreateElement('img');if(!oImg||!oImg.style){this.AddError(msgFailed+'(xCreateElement)');return;}
oImg.id='ZoomPic';oImg.style.position='absolute';oImg.style.visibility='hidden';oImg.style.zIndex=this.ZIndex;if(this.BorderWidth>0){oImg.style.border=this.BorderWidth+'px solid '+this.BorderColor;}
oImg.onclick=OnClick;if(this.EnableDblClick){oImg.ondblclick=OnDblClick;}
var oDivWait=xCreateElement('div');var oDivError=xCreateElement('div');var oTextWait=xCreateTextNode(this.LoadText);var oTextError=xCreateTextNode(this.ErrorText);if(!oDivWait||!oDivError||!oTextWait||!oTextError){this.AddError(msgFailed+'(xCreateTextNode)');return;}
xAppendChild(oDivWait,oTextWait);xAppendChild(oDivError,oTextError);oDivWait.id='ZoomPicWait';oDivWait.style.position='absolute';oDivWait.style.visibility='hidden';oDivWait.style.zIndex=this.BaseZIndex+1;oDivWait.style.backgroundColor='white';oDivWait.style.color='black';oDivWait.style.padding='0 4px';oDivWait.style.fontSize='10pt';oDivWait.style.border='1px solid black';oDivError.id='ZoomPicError';oDivError.style.position='absolute';oDivError.style.visibility='hidden';oDivError.style.zIndex=this.BaseZIndex+1;oDivError.style.backgroundColor='white';oDivError.style.color='black';oDivError.style.padding='0 4px';oDivError.style.fontSize='10pt';oDivError.style.border='1px solid black';var oElements=xGetElementsByTagName('body');if(!oElements||oElements.length<1){this.AddError(msgFailed+'(no body tag found)');return;}
var oBody=oElements[0];if(!xHasChildNodes(oBody)){this.AddError(msgFailed+'(no html elements in body tag found)');return;}
oElements=xChildNodes(oBody);xInsertBefore(oBody,oDivError,oElements[0]);xInsertBefore(oBody,oDivWait,oDivError);xInsertBefore(oBody,oImg,oDivWait);this.WaitObj=oDivWait;this.ErrObj=oDivError;this.ZoomImg=oImg;this.HtmlWritten=true;};CZoom.prototype.ZoomIn=function(aImgName,aBigImgUrl,aXOffset,aYOffset,aRelEleID)
{if(!this.InitExecuted){if(this.EnableInitOnClick){this.AddError('CZoomIn: Zoom not initialized - forcing init now!\nCheck ZoomInit and ensure no onload is in body tag!');this.ForceInit();if(!this.HtmlWritten){this.AddError('CZoomIn: forced Init failed, give up here.');return;}}else{if(this.DebugOn){this.AddError('CZoomIn: Zoom not initialized!\nCheck ZoomInit and ensure no onload is in body tag\nor set Zoom.EnableInitOnClick = true;');this.Diagnose();}
return;}}
if(this.DebugOn){this.Diagnose();}
if(!this.Enabled){return;}
if(!this.WaitObj){this.WaitObj=xGetElementById('ZoomPicWait');}
if(!this.ErrObj){this.ErrObj=xGetElementById('ZoomPicError');}
if(!this.ZoomImg){this.ZoomImg=xGetElementById('ZoomPic');}
var bigImgID=IC.FindImage(aBigImgUrl);if(this.EnableDblClick&&this.DblClickActive){return;}
this.CurrVAlign=this.VAlign;this.CurrHAlign=this.HAlign;this.CurrTargetEle=null;this.CurrTargetOffX=this.TargetOffsetX;this.CurrTargetOffY=this.TargetOffsetY;if(this.TargetElement!=''){var relEle=xGetElementById(this.TargetElement);if(relEle){this.CurrTargetEle=relEle;}}
if(xNum(aXOffset)||xNum(aYOffset)||xStr(aRelEleID)){this.CurrVAlign='Relative';this.CurrHAlign='Relative';this.CurrTargetEle=null;this.CurrTargetOffX=0;this.CurrTargetOffY=0;}
if(xNum(aXOffset)){this.CurrTargetOffX=aXOffset;}
if(xNum(aYOffset)){this.CurrTargetOffY=aYOffset;}
if(xStr(aRelEleID)){var relEle=xGetElementById(aRelEleID);if(relEle){this.CurrTargetEle=relEle;}}
if((this.State!=CZHidden)&&(bigImgID!=-1)&&(bigImgID==this.BigImgID)){if(this.State==CZLoading){xHide(this.WaitObj);xHide(this.ErrObj);this.State=CZHidden;return;}
if(this.State==CZZoomIn||this.State==CZZoomed){this.ZoomOut();return;}
if(this.Timer){clearTimeout(this.Timer);this.Timer=null;}
this.StartTime=xTimeMS()-this.TimeSpan+(xTimeMS()-this.StartTime);this.State=CZZoomIn;var me=this;this.Timer=setTimeout(function(){me.Enlarge();},this.TimerInterval);return;}
if(this.State==CZLoading){xHide(this.WaitObj);xHide(this.ErrObj);this.State=CZHidden;}
else if(this.State!=CZHidden){if(this.Timer){clearTimeout(this.Timer);this.Timer=null;}
this.HideZoomImg();}
this.SmallImg=xGetElementById(aImgName);if((bigImgID!=-1)&&IC.IsLoaded(bigImgID)){this.BigImgID=bigImgID;this.StartZoom();}
else{this.GetSmallImgData();var y=(this.SmallHeight-xHeight(this.WaitObj)-5);xMoveTo(this.WaitObj,this.SmallPosX+3,this.SmallPosY+y);xMoveTo(this.ErrObj,this.SmallPosX+3,this.SmallPosY+y);xShow(this.WaitObj);this.State=CZLoading;var me=this;this.BigImgID=IC.LoadImage(aBigImgUrl,function(aImgID){me.OnLoad(aImgID);});}};CZoom.prototype.Enable=function(){this.Enabled=true;};CZoom.prototype.Disable=function(){this.Enabled=false;};CZoom.prototype.GetSmallImgData=function()
{this.SmallWidth=xWidth(this.SmallImg)+2*this.BorderWidth;this.SmallHeight=xHeight(this.SmallImg)+2*this.BorderWidth;this.SmallPosX=xPageX(this.SmallImg)+(xWidth(this.SmallImg)-this.SmallWidth)/2+this.AddPosX;this.SmallPosY=xPageY(this.SmallImg)+(xHeight(this.SmallImg)-this.SmallHeight)/2+this.AddPosY;};CZoom.prototype.OnLoad=function(aImgID)
{if((this.State==CZLoading)&&(this.BigImgID==aImgID)){var imgState=IC.Image(aImgID).CacheState;if(imgState==ICLoaded){this.StartZoom();}
else if(imgState==ICError||imgState==ICAbort){this.State=CZHidden;xHide(this.WaitObj);xShow(this.ErrObj);var me=this;setTimeout(function(){xHide(me.ErrObj);},2500);}}};CZoom.prototype.Range=function(aValue,aMin,aMax){return aMin+(aMax-aMin)*aValue;};CZoom.prototype.StartZoom=function()
{this.BigImg=IC.Image(this.BigImgID);this.ZoomImg.src=this.BigImg.src;this.GetSmallImgData();this.BigWidth=this.BigImg.width+2*this.BorderWidth;this.BigHeight=this.BigImg.height+2*this.BorderWidth;if((this.SmallWidth>=this.BigWidth)||(this.SmallHeight>=this.BigHeight)){return;}
var clW=xClientWidth();var clX=xScrollLeft();if(this.CurrHAlign=='Left'){this.BigPosX=this.HMargin;if((this.BigPosX+this.BigWidth)>(clX+clW)){this.BigPosX=(clX+clW)-this.BigWidth;}
if((this.BigPosX)<(clX)){this.BigPosX=clX;}}else if(this.CurrHAlign=='Right'){this.BigPosX=(clX+clW)-this.BigWidth-this.HMargin;if((this.BigPosX)<(clX)){this.BigPosX=clX;}}else if(this.CurrHAlign=='Relative'){var ref=this.SmallImg;if(this.CurrTargetEle){ref=this.CurrTargetEle;}
this.BigPosX=xPageX(ref)+this.CurrTargetOffX;}else{var dxCenter=1;if(this.BigWidth<=clW){dxCenter=(this.BigWidth-this.SmallWidth)/(clW-this.SmallWidth);if(dxCenter<0){dxCenter=0;}}
if(this.CurrHAlign=='Center'){dxCenter=1;}
var cxBig=clW/2;var cxSmall=this.SmallPosX-clX+(this.SmallWidth/2);var cx=dxCenter*(cxBig-cxSmall)+cxSmall;this.BigPosX=clX+cx-this.BigWidth/2;if(this.BigPosX<0){this.BigPosX=0;}
if(this.BigWidth<=clW){if((this.BigPosX+this.BigWidth)>(clX+clW)){this.BigPosX=(clX+clW)-this.BigWidth;}
if((this.BigPosX)<(clX)){this.BigPosX=clX;}}}
var clH=xClientHeight();var clY=xScrollTop();if(this.CurrVAlign=='Top'){this.BigPosY=this.VMargin;if((this.BigPosY+this.BigHeight)>(clY+clH)){this.BigPosY=(clY+clH)-this.BigHeight;}
if((this.BigPosY)<(clY)){this.BigPosY=clY;}}else if(this.CurrVAlign=='Bottom'){this.BigPosY=(clY+clH)-this.BigHeight-this.VMargin;if((this.BigPosY)<(clY)){this.BigPosY=clY;}}else if(this.CurrVAlign=='Relative'){var ref=this.SmallImg;if(this.CurrTargetEle){ref=this.CurrTargetEle;}
this.BigPosY=xPageY(ref)+this.CurrTargetOffY;}else{var dyCenter=1;if(this.BigHeight<=clH){dyCenter=(this.BigHeight-this.SmallHeight)/(clH-this.SmallHeight);if(dyCenter<0){dyCenter=0;}}
if(this.CurrVAlign=='Middle'){dyCenter=1;}
var cyBig=clH/2;var cySmall=this.SmallPosY-clY+(this.SmallHeight/2);var cy=dyCenter*(cyBig-cySmall)+cySmall;this.BigPosY=clY+cy-this.BigHeight/2;if(this.BigPosY<0){this.BigPosY=0;}
if(this.BigHeight<=clH){if((this.BigPosY+this.BigHeight)>(clY+clH)){this.BigPosY=(clY+clH)-this.BigHeight;}
if((this.BigPosY)<(clY)){this.BigPosY=clY;}}}
this.StartTime=xTimeMS();var me=this;this.Timer=setTimeout(function(){me.Enlarge();},this.TimerInterval);};CZoom.prototype.Enlarge=function()
{if(this.Timer){clearTimeout(this.Timer);this.Timer=null;}
if(this.DblClickActive){return;}
var param=(xTimeMS()-this.StartTime)/this.TimeSpan;var eom=param>=1;if(param>1){param=1;}
if(this.TimeModifyFunc){param=this.TimeModifyFunc(param);}
if(param<0){param=0;}
if(param>1){param=1;}
var x=this.Range(param,this.SmallPosX,this.BigPosX);var y=this.Range(param,this.SmallPosY,this.BigPosY);var w=this.Range(param,this.SmallWidth,this.BigWidth);var h=this.Range(param,this.SmallHeight,this.BigHeight);xMoveTo(this.ZoomImg,x,y);xResizeTo(this.ZoomImg,w,h);if(this.State!=CZZoomIn){xHide(this.WaitObj);xHide(this.ErrObj);xShow(this.ZoomImg);if(this.HideSmall){xHide(this.SmallImg);}
this.State=CZZoomIn;}
var me=this;if(eom)
{this.State=CZZoomed;this.Timer=setTimeout(function(){me.CheckOutOfWindow();},200);}
else
{this.Timer=setTimeout(function(){me.Enlarge();},this.TimerInterval);}};CZoom.prototype.CheckOutOfWindow=function()
{var space=(xClientHeight()-this.BigHeight)/2;var newY=xScrollTop()+space;var toleranz;if(space>0){toleranz=space+(this.BigHeight*2/3);}else{toleranz=-space+(xClientHeight()*2/3);}
if(Math.abs(newY-this.BigPosY)>toleranz){this.ZoomOut();return;}
var me=this;this.Timer=setTimeout(function(){me.CheckOutOfWindow();},200);};CZoom.prototype.NewWindow=function()
{function CancelDblClick(){me.DblClickActive=false;}
if(!this.HtmlWritten){return;}
var me=this;if(!this.DblClickActive){this.DblClickActive=true;setTimeout(function(){CancelDblClick();},500);}
if(this.HideSmall){xShow(this.SmallImg);}
xHide(this.ZoomImg);xMoveTo(this.ZoomImg,0,0);xResizeTo(this.ZoomImg,0,0);this.State=CZHidden;if(this.NewWindowOnDblClick){var features=this.ZoomWindowFeatures;features=features.replace(/%w/gi,this.BigWidth.toString());features=features.replace(/%h/gi,this.BigHeight.toString());var w=window.open(IC.ImageUrl(this.BigImgID),this.ZoomWindowName,features);}else{location.href=IC.ImageUrl(this.BigImgID);}};CZoom.prototype.ZoomOut=function()
{if(!this.HtmlWritten){return;}
if(this.State==CZHidden||this.State==CZZoomOut){return;}
if(this.State==CZLoading){xHide(this.WaitObj);xHide(this.ErrObj);this.State=CZHidden;return;}
if(this.Timer){clearTimeout(this.Timer);this.Timer=null;}
this.SmallPosX=xPageX(this.SmallImg)+(xWidth(this.SmallImg)-this.SmallWidth)/2+this.AddPosX;this.SmallPosY=xPageY(this.SmallImg)+(xHeight(this.SmallImg)-this.SmallHeight)/2+this.AddPosY;if(this.State==CZZoomIn){this.StartTime=xTimeMS()-this.TimeSpan+(xTimeMS()-this.StartTime);}else{this.StartTime=xTimeMS();}
this.State=CZZoomOut;var me=this;this.Timer=setTimeout(function(){me.Shrink();},this.TimerInterval);};CZoom.prototype.HideZoomImg=function()
{if(this.HideSmall){xShow(this.SmallImg);}
xHide(this.ZoomImg);xMoveTo(this.ZoomImg,0,0);xResizeTo(this.ZoomImg,0,0);this.State=CZHidden;};CZoom.prototype.Shrink=function()
{if(this.Timer){clearTimeout(this.Timer);this.Timer=null;}
var param=(xTimeMS()-this.StartTime)/this.TimeSpan;var eom=param>=1;if(param>1){param=1;}
if(this.TimeModifyFunc){param=this.TimeModifyFunc(param);}
if(param<0){param=0;}
if(param>1){param=1;}
var x=this.Range(param,this.BigPosX,this.SmallPosX);var y=this.Range(param,this.BigPosY,this.SmallPosY);var w=this.Range(param,this.BigWidth,this.SmallWidth);var h=this.Range(param,this.BigHeight,this.SmallHeight);xMoveTo(this.ZoomImg,x,y);xResizeTo(this.ZoomImg,w,h);if(eom)
{this.HideZoomImg();}
else
{xMoveTo(this.ZoomImg,x,y);xResizeTo(this.ZoomImg,w,h);var me=this;this.Timer=setTimeout(function(){me.Shrink();},this.TimerInterval);}};Zoom=new CZoom();Zoom.TimeModifyFunc=function(aValue){return(0.5-0.5*Math.cos(Math.PI*aValue));};