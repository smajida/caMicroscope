parcelRequire=function(e,r,n,t){var i="function"==typeof parcelRequire&&parcelRequire,o="function"==typeof require&&require;function u(n,t){if(!r[n]){if(!e[n]){var f="function"==typeof parcelRequire&&parcelRequire;if(!t&&f)return f(n,!0);if(i)return i(n,!0);if(o&&"string"==typeof n)return o(n);var c=new Error("Cannot find module '"+n+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[n][1][r]||r};var l=r[n]=new u.Module(n);e[n][0].call(l.exports,p,l,l.exports,this)}return r[n].exports;function p(e){return u(p.resolve(e))}}u.isParcelRequire=!0,u.Module=function(e){this.id=e,this.bundle=u,this.exports={}},u.modules=e,u.cache=r,u.parent=i,u.register=function(r,n){e[r]=[function(e,r){r.exports=n},{}]};for(var f=0;f<n.length;f++)u(n[f]);if(n.length){var c=u(n[n.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=c:"function"==typeof define&&define.amd?define(function(){return c}):t&&(this[t]=c)}return u}({"WDG/":[function(require,module,exports) {
"use strict";function e(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}function t(){function t(e,t){return new Promise(function(n,r){Store.prototype.db.then(function(r){r.transaction(e).objectStore(e,"readonly").getAll().then(function(e){n(e.filter(function(e){var n=!0;for(var r in t)n=n&&Object.byString(e,r)==t[r];return n}))})})})}function n(e,t){var n=JSON.parse(window.localStorage.getItem(e));return n?n.filter(function(e){var n=!0;for(var r in t)n=n&&Object.byString(e,r)==t[r];return n}):[]}function r(e,t){var n=JSON.parse(window.localStorage.getItem(e));return n?n.filter(function(e){return e._id==t})[0]:{}}Store.prototype.db=idb.openDb("heatmap",1,function(e){e.createObjectStore("heatmap",{autoIncrement:!0})}),console.warn("{localstore mods enabled}"),Object.byString=function(e,t){for(var n=(t=(t=t.replace(/\[(\w+)\]/g,".$1")).replace(/^\./,"")).split("."),r=0,o=n.length;r<o;++r){var a=n[r];if(!(a in e))return;e=e[a]}return e},Store.prototype.validation=Store.prototype.validation||{},Store.prototype.filterBroken=Store.prototype.filterBroken||function(e,t){return e},Store.prototype.findMarkTypes=function(t,r){return new Promise(function(o,a){var i={};r&&(i["provenance.analysis.execution_id"]=r),t&&(i["provenance.image.slide"]=t);var c=n("mark",i);c?o([].concat(e(new Set(c.map(function(e){return Object.byString(e,"provenance")}))))):o([])})},Store.prototype.findMark=function(e,t,r,o,a,i,c,l,p,s){var u=this;return new Promise(function(a,c){var l={};t&&(l["provenance.image.slide"]=e),e&&(l["provenance.analysis.execution_id"]=t),i&&(l["provenance.analysis.source"]=i),r&&(l["provenance.image.specimen"]=r),o&&(l["provenance.image.study"]=o),a(n("mark",l))}).then(function(e){return u.filterBroken(e,"mark")})},Store.prototype.getMarkByIds=function(t,r,o,a,i,c,l,p,s,u){var d=this;return new Promise(function(o,a){var i=[];for(var c in t)i.push.apply(i,e(n("mark",{"provenance.analysis.execution_id":t[c],"provenance.image.slide":r})));o(i)}).then(function(e){return d.filterBroken(e,"mark")})},Store.prototype.getMark=function(e){var t=this;return new Promise(function(t,n){t(r("mark",e))}).then(function(e){return t.filterBroken(e,"mark")})},Store.prototype.addMark=function(e){return this.validation.mark(e)||console.warn(this.validation.mark.errors),new Promise(function(t,n){var r,o,a;e._id=e._id||{$oid:Date.now()},t((r="mark",o=e,(a=(a=JSON.parse(window.localStorage.getItem(r)))||[]).push(o),window.localStorage.setItem(r,JSON.stringify(a)),o))})},Store.prototype.deleteMark=function(e,t){return new Promise(function(t,n){t(function(e,t){console.log(t);var n=JSON.parse(window.localStorage.getItem(e)),r=(n=n||[]).filter(function(e){return e._id.$oid!==t});return window.localStorage.setItem(e,JSON.stringify(r)),console.log(n.length-r.length),{rowsAffected:n.length-r.length}}("mark",e))})},Store.prototype.findHeatmap=function(e,n){var r=this;return new Promise(function(r,o){var a={};e&&(a["provenance.image.slide"]=e),n&&(a["provenance.analysis.execution_id"]=n),r(t("heatmap",a))}).then(function(e){return r.filterBroken(e,"heatmap")})},Store.prototype.getHeatmap=function(e,n){var r=this;return new Promise(function(r,o){var a={};e&&(a["provenance.image.slide"]=e),n&&(a["provenance.analysis.execution_id"]=n),r(t("heatmap",a))}).then(function(e){return r.filterBroken(e,"heatmap")})},Store.prototype.addHeatmap=function(e){return this.validation.heatmap(e)||console.warn(this.validation.heatmap.errors),e._id=e._id||{$oid:Date.now()},new Promise(function(t,n){var r,o;t((r="heatmap",o=e,Store.prototype.db.then(function(e){e.transaction(r,"readwrite").objectStore(r).add(o)}),o))})},Store.prototype.deleteHeatmap=function(e,t){return new Promise(function(t,n){t(function(e,t){return console.warn("Some issues with Deleting a Single Heatmap in LocalStore"),Store.prototype.db.then(function(n){n.transaction(e,"readwrite").objectStore(e).delete(t)}),""}("heatmap",e))})},Store.prototype.clearHeatmaps=function(){return new Promise(function(e,t){var n;e((n="heatmap",Store.prototype.db.then(function(e){e.transaction(n,"readwrite").objectStore(n).clear(n)}),""))})},Store.prototype.export=function(e){return new Promise(function(t,n){t(window.localStorage.getItem(e))})},Store.prototype.import=function(e,t){return new Promise(function(n,r){n(window.localStorage.setItem(e,t))})},Store.prototype.findSlide=function(e,t,n,r){return new Promise(function(e,t){e([{id:new URLSearchParams(document.location.search.substring(1)).get("id")||"local",mpp:"0.001",study:"",specimen:""}])})},Store.prototype.getSlide=function(e){return new Promise(function(e,t){var n=new URLSearchParams(document.location.search.substring(1)),r=n.get("id")||"local";console.log(n),e({id:r,mpp:"0.001",study:"",specimen:""})})},Store.prototype.findTemplate=function(e,t){var r=this,o={};return e&&(o.name=e),t&&(o.type=t),new Promise(function(e,t){e(n("template",o))}).then(function(e){return r.filterBroken(e,"template")})},Store.prototype.getTemplate=function(e){var t=this;return new Promise(function(t,n){t(r("template",e))}).then(function(e){return t.filterBroken(e,"template")})},Store.prototype.DownloadMarksToFile=function(){var e=$D.params.id;e=decodeURIComponent(e);var t={};t["provenance.image.slide"]=e;var n=JSON.parse(window.localStorage.getItem("mark")),r="";n&&(r=JSON.stringify(n.filter(function(e){var n=!0;for(var r in t)n=n&&Object.byString(e,r)==t[r];return n})));var o=document.createElement("a"),a=new Blob([r],{type:"application/json"}),i=URL.createObjectURL(a);o.setAttribute("href",i),o.setAttribute("download","markups.json"),o.style.display="none",document.body.appendChild(o),o.click(),document.body.removeChild(o)},Store.prototype.LoadMarksFromFile=function(){var e=$D.params.id;e=decodeURIComponent(e);var t=document.createElement("input");document.body.appendChild(t),t.setAttribute("type","file"),t.style.display="position: fixed; top: -100em",t.onchange=function(t){var n=t.target,r=new FileReader;r.onload=function(){var t=r.result;try{var n=JSON.parse(t);console.log(n),n.forEach(function(t){t.provenance.image.slide=e}),console.log($VALIDATION.mark);var o=JSON.parse(window.localStorage.getItem("mark"));o=o||[],console.log(o),o=(o=o.concat(n)).filter($VALIDATION.mark),console.log(o),window.localStorage.setItem("mark",JSON.stringify(o)),$VALIDATION.mark.errors?console.error($VALIDATION.mark.errors):window.location.reload()}catch(e){console.error(e)}console.log(t.substring(0,200))},r.readAsText(n.files[0])},t.click(),document.body.removeChild(t)}}Object.defineProperty(exports,"__esModule",{value:!0});var n={_id:"0",type:"object",id:"annotation-form",name:"AnnotSchema",description:"",links:[],additionalProperties:!1,properties:{name:{id:"a0",title:"Identity Name",type:"string",required:!0,description:"note name"},notes:{id:"a1",title:"Notes: ",type:"string",format:"textarea",maxLength:128}}},r=JSON.parse(window.localStorage.getItem("template"));r||((r=[]).push(n),window.localStorage.setItem("template",JSON.stringify(r))),exports.default=t;
},{}],"5g62":[function(require,module,exports) {
"use strict";function e(){console.warn("{imgbox mods enabled}"),CaMic.prototype.default_loadImg=CaMic.prototype.loadImg,CaMic.prototype.loadImg=function(e){var p=this,t=new URLSearchParams(window.location.search).get("id"),i=t;this.slideId=i,this.slideName=i,this.study="",this.specimen="",fetch(t+"/info.json").then(function(e){if(e.status>=400)throw e;return e.json()}).then(function(i){for(var o=Math.ceil(Math.log2(Math.max(i.height,i.width))),a=[],n=0;n<=o;n++)a.push(Math.pow(2,n));var m={"@context":"http://iiif.io/api/image/2/context.json","@id":t,height:i.height,width:i.width,profile:["http://iiif.io/api/image/2/level2.json"],protocol:"http://iiif.io/api/image",tiles:[{scaleFactors:a,width:256}]};p.viewer.open(m),p.mpp_x=i["mpp-x"],p.mpp_y=i["mpp-y"],p.mpp=i.mpp||p.mpp_x||p.mpp_y||1e9,p.mpp_x=i["mpp-x"]||p.mpp,p.mpp_y=i["mpp-y"]||p.mpp,p.viewer.mpp=p.mpp,p.viewer.mpp_x=p.mpp_x,p.viewer.mpp_y=p.mpp_y;var r=p.mpp_x||p.mpp;r&&1e9!=r&&p.createScalebar(p.mpp),new OpenSeadragonImaging.ImagingHelper({viewer:p.viewer}).setMaxZoom(1);var s={_id:"0"};s.name=p.slideName,s.study=p.study,s.specimen=p.specimen,s.mpp=p.mpp,s.mpp_x=p.mpp_x,s.mpp_y=p.mpp_y,s.location=t,s.url=m,e&&"function"==typeof e&&e.call(null,s),Loading.text.textContent="loading slide's tiles..."}).catch(function(e){console.error(e),Loading.text.textContent="ERROR - Slide May be Broken or Unsupported"})}}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=e;
},{}],"lM4v":[function(require,module,exports) {
"use strict";var e=require("./LocalStore.js"),r=t(e),o=require("./ImgBoxMods.js"),s=t(o);function t(e){return e&&e.__esModule?e:{default:e}}(0,r.default)(),(0,s.default)(),console.warn("This setup is intended for imagebox");
},{"./LocalStore.js":"WDG/","./ImgBoxMods.js":"5g62"}]},{},["lM4v"], null)
//# sourceMappingURL=/imgbox_package.map