/*var jquijsfileref=document.createElement('script');
jquijsfileref.setAttribute("type","text/javascript");
jquijsfileref.setAttribute("src", "https://ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/jquery-ui.min.js");
document.getElementsByTagName("head")[0].appendChild(jquijsfileref);
*/
$j( "<style>.ttUIAutoComplete .ui-autocomplete {max-height: 200px;	max-width: 690px;	overflow-y: auto;	overflow-x: hidden;	} .ttUIAutoComplete .ui-state-hover {background-color: #ccc;	} #jqUIDialAPIListGenResetLoaderIco, #jqUIDialAPIListGenBackupResetLoaderIco {display: block; width: 48px; height: 48px; position: absolute; top: 95px; right: 35px;} #jqUIDialAPIListGen {width: 560px !important;}  #jqUIDialAPIListGenResetUP, #jqUIDialAPIListGenBackupResetUP {outline: none;} #jqUIDialAPICampSearchAllForm {width: 690px; float: left; clear: left;} #jqUIDialAPICampSearchAllForm input {margin-right: 10px;} #jqUIDialAPICampSearchAllForm label {display: block; float: left; padding-top: 10px; }; #jqUIDialAPICampSearchAllProgressBar .ui-progressbar-value, #jqUIDialAPICampSearchAllProgressBarUpdBackup .ui-progressbar-value {background-color: #CCC;}</style>" ).appendTo("head");

var ttCampSearchStopAjaxLoop = false;

/*
function ttCleanArray(actual){
  var newArray = new Array();
  for(var i = 0; i<actual.length; i++){
      if (actual[i]){
        newArray.push(actual[i]);
    }
  }
  return newArray;
}
*/

//Load jStorage
(function(){function D(){var a="{}";if("userDataBehavior"==k){d.load("jStorage");try{a=d.getAttribute("jStorage")}catch(b){}try{r=d.getAttribute("jStorage_update")}catch(c){}h.jStorage=a}E();x();F()}function u(){var a;clearTimeout(G);G=setTimeout(function(){if("localStorage"==k||"globalStorage"==k)a=h.jStorage_update;else if("userDataBehavior"==k){d.load("jStorage");try{a=d.getAttribute("jStorage_update")}catch(b){}}if(a&&a!=r){r=a;var l=m.parse(m.stringify(c.__jstorage_meta.CRC32)),p;D();p=m.parse(m.stringify(c.__jstorage_meta.CRC32));
var e,z=[],f=[];for(e in l)l.hasOwnProperty(e)&&(p[e]?l[e]!=p[e]&&"2."==String(l[e]).substr(0,2)&&z.push(e):f.push(e));for(e in p)p.hasOwnProperty(e)&&(l[e]||z.push(e));s(z,"updated");s(f,"deleted")}},25)}function s(a,b){a=[].concat(a||[]);if("flushed"==b){a=[];for(var c in g)g.hasOwnProperty(c)&&a.push(c);b="deleted"}c=0;for(var p=a.length;c<p;c++){if(g[a[c]])for(var e=0,d=g[a[c]].length;e<d;e++)g[a[c]][e](a[c],b);if(g["*"])for(e=0,d=g["*"].length;e<d;e++)g["*"][e](a[c],b)}}function v(){var a=(+new Date).toString();
if("localStorage"==k||"globalStorage"==k)try{h.jStorage_update=a}catch(b){k=!1}else"userDataBehavior"==k&&(d.setAttribute("jStorage_update",a),d.save("jStorage"));u()}function E(){if(h.jStorage)try{c=m.parse(String(h.jStorage))}catch(a){h.jStorage="{}"}else h.jStorage="{}";A=h.jStorage?String(h.jStorage).length:0;c.__jstorage_meta||(c.__jstorage_meta={});c.__jstorage_meta.CRC32||(c.__jstorage_meta.CRC32={})}function w(){if(c.__jstorage_meta.PubSub){for(var a=+new Date-2E3,b=0,l=c.__jstorage_meta.PubSub.length;b<
l;b++)if(c.__jstorage_meta.PubSub[b][0]<=a){c.__jstorage_meta.PubSub.splice(b,c.__jstorage_meta.PubSub.length-b);break}c.__jstorage_meta.PubSub.length||delete c.__jstorage_meta.PubSub}try{h.jStorage=m.stringify(c),d&&(d.setAttribute("jStorage",h.jStorage),d.save("jStorage")),A=h.jStorage?String(h.jStorage).length:0}catch(p){}}function q(a){if(!a||"string"!=typeof a&&"number"!=typeof a)throw new TypeError("Key name must be string or numeric");if("__jstorage_meta"==a)throw new TypeError("Reserved key name");
return!0}function x(){var a,b,l,d,e=Infinity,h=!1,f=[];clearTimeout(H);if(c.__jstorage_meta&&"object"==typeof c.__jstorage_meta.TTL){a=+new Date;l=c.__jstorage_meta.TTL;d=c.__jstorage_meta.CRC32;for(b in l)l.hasOwnProperty(b)&&(l[b]<=a?(delete l[b],delete d[b],delete c[b],h=!0,f.push(b)):l[b]<e&&(e=l[b]));Infinity!=e&&(H=setTimeout(x,e-a));h&&(w(),v(),s(f,"deleted"))}}function F(){var a;if(c.__jstorage_meta.PubSub){var b,l=B;for(a=c.__jstorage_meta.PubSub.length-1;0<=a;a--)if(b=c.__jstorage_meta.PubSub[a],
b[0]>B){var l=b[0],d=b[1];b=b[2];if(t[d])for(var e=0,h=t[d].length;e<h;e++)t[d][e](d,m.parse(m.stringify(b)))}B=l}}var y=window.jQuery||window.$||(window.$={}),m={parse:window.JSON&&(window.JSON.parse||window.JSON.decode)||String.prototype.evalJSON&&function(a){return String(a).evalJSON()}||y.parseJSON||y.evalJSON,stringify:Object.toJSON||window.JSON&&(window.JSON.stringify||window.JSON.encode)||y.toJSON};if(!("parse"in m&&"stringify"in m))throw Error("No JSON support found, include //cdnjs.cloudflare.com/ajax/libs/json2/20110223/json2.js to page");
var c={__jstorage_meta:{CRC32:{}}},h={jStorage:"{}"},d=null,A=0,k=!1,g={},G=!1,r=0,t={},B=+new Date,H,C={isXML:function(a){return(a=(a?a.ownerDocument||a:0).documentElement)?"HTML"!==a.nodeName:!1},encode:function(a){if(!this.isXML(a))return!1;try{return(new XMLSerializer).serializeToString(a)}catch(b){try{return a.xml}catch(c){}}return!1},decode:function(a){var b="DOMParser"in window&&(new DOMParser).parseFromString||window.ActiveXObject&&function(a){var b=new ActiveXObject("Microsoft.XMLDOM");b.async=
"false";b.loadXML(a);return b};if(!b)return!1;a=b.call("DOMParser"in window&&new DOMParser||window,a,"text/xml");return this.isXML(a)?a:!1}};y.jStorage={version:"0.4.4",set:function(a,b,d){q(a);d=d||{};if("undefined"==typeof b)return this.deleteKey(a),b;if(C.isXML(b))b={_is_xml:!0,xml:C.encode(b)};else{if("function"==typeof b)return;b&&"object"==typeof b&&(b=m.parse(m.stringify(b)))}c[a]=b;for(var h=c.__jstorage_meta.CRC32,e=m.stringify(b),k=e.length,f=2538058380^k,g=0,n;4<=k;)n=e.charCodeAt(g)&255|
(e.charCodeAt(++g)&255)<<8|(e.charCodeAt(++g)&255)<<16|(e.charCodeAt(++g)&255)<<24,n=1540483477*(n&65535)+((1540483477*(n>>>16)&65535)<<16),n^=n>>>24,n=1540483477*(n&65535)+((1540483477*(n>>>16)&65535)<<16),f=1540483477*(f&65535)+((1540483477*(f>>>16)&65535)<<16)^n,k-=4,++g;switch(k){case 3:f^=(e.charCodeAt(g+2)&255)<<16;case 2:f^=(e.charCodeAt(g+1)&255)<<8;case 1:f^=e.charCodeAt(g)&255,f=1540483477*(f&65535)+((1540483477*(f>>>16)&65535)<<16)}f^=f>>>13;f=1540483477*(f&65535)+((1540483477*(f>>>16)&
65535)<<16);h[a]="2."+((f^f>>>15)>>>0);this.setTTL(a,d.TTL||0);s(a,"updated");return b},get:function(a,b){q(a);return a in c?c[a]&&"object"==typeof c[a]&&c[a]._is_xml?C.decode(c[a].xml):c[a]:"undefined"==typeof b?null:b},deleteKey:function(a){q(a);return a in c?(delete c[a],"object"==typeof c.__jstorage_meta.TTL&&a in c.__jstorage_meta.TTL&&delete c.__jstorage_meta.TTL[a],delete c.__jstorage_meta.CRC32[a],w(),v(),s(a,"deleted"),!0):!1},setTTL:function(a,b){var d=+new Date;q(a);b=Number(b)||0;return a in
c?(c.__jstorage_meta.TTL||(c.__jstorage_meta.TTL={}),0<b?c.__jstorage_meta.TTL[a]=d+b:delete c.__jstorage_meta.TTL[a],w(),x(),v(),!0):!1},getTTL:function(a){var b=+new Date;q(a);return a in c&&c.__jstorage_meta.TTL&&c.__jstorage_meta.TTL[a]?(a=c.__jstorage_meta.TTL[a]-b)||0:0},flush:function(){c={__jstorage_meta:{CRC32:{}}};w();v();s(null,"flushed");return!0},storageObj:function(){function a(){}a.prototype=c;return new a},index:function(){var a=[],b;for(b in c)c.hasOwnProperty(b)&&"__jstorage_meta"!=
b&&a.push(b);return a},storageSize:function(){return A},currentBackend:function(){return k},storageAvailable:function(){return!!k},listenKeyChange:function(a,b){q(a);g[a]||(g[a]=[]);g[a].push(b)},stopListening:function(a,b){q(a);if(g[a])if(b)for(var c=g[a].length-1;0<=c;c--)g[a][c]==b&&g[a].splice(c,1);else delete g[a]},subscribe:function(a,b){a=(a||"").toString();if(!a)throw new TypeError("Channel not defined");t[a]||(t[a]=[]);t[a].push(b)},publish:function(a,b){a=(a||"").toString();if(!a)throw new TypeError("Channel not defined");
c.__jstorage_meta||(c.__jstorage_meta={});c.__jstorage_meta.PubSub||(c.__jstorage_meta.PubSub=[]);c.__jstorage_meta.PubSub.unshift([+new Date,a,b]);w();v()},reInit:function(){D()}};(function(){var a=!1;if("localStorage"in window)try{window.localStorage.setItem("_tmptest","tmpval"),a=!0,window.localStorage.removeItem("_tmptest")}catch(b){}if(a)try{window.localStorage&&(h=window.localStorage,k="localStorage",r=h.jStorage_update)}catch(c){}else if("globalStorage"in window)try{window.globalStorage&&(h=
"localhost"==window.location.hostname?window.globalStorage["localhost.localdomain"]:window.globalStorage[window.location.hostname],k="globalStorage",r=h.jStorage_update)}catch(g){}else if(d=document.createElement("link"),d.addBehavior){d.style.behavior="url(#default#userData)";document.getElementsByTagName("head")[0].appendChild(d);try{d.load("jStorage")}catch(e){d.setAttribute("jStorage","{}"),d.save("jStorage"),d.load("jStorage")}a="{}";try{a=d.getAttribute("jStorage")}catch(m){}try{r=d.getAttribute("jStorage_update")}catch(f){}h.jStorage=
a;k="userDataBehavior"}else{d=null;return}E();x();"localStorage"==k||"globalStorage"==k?"addEventListener"in window?window.addEventListener("storage",u,!1):document.attachEvent("onstorage",u):"userDataBehavior"==k&&setInterval(u,1E3);F();"addEventListener"in window&&window.addEventListener("pageshow",function(a){a.persisted&&u()},!1)})()})();

/* FileSaver.js
 *  A saveAs() FileSaver implementation.
 *  2014-05-27
 *
 *  By Eli Grey, http://eligrey.com
 *  License: X11/MIT
 *    See https://github.com/eligrey/FileSaver.js/blob/master/LICENSE.md
 */

/*global self */
/*jslint bitwise: true, indent: 4, laxbreak: true, laxcomma: true, smarttabs: true, plusplus: true */

/*! @source http://purl.eligrey.com/github/FileSaver.js/blob/master/FileSaver.js */

var saveAs = saveAs
    // IE 10+ (native saveAs)
    || (typeof navigator !== "undefined" &&
        navigator.msSaveOrOpenBlob && navigator.msSaveOrOpenBlob.bind(navigator))
    // Everyone else
    || (function(view) {
        "use strict";
        // IE <10 is explicitly unsupported
        if (typeof navigator !== "undefined" &&
            /MSIE [1-9]\./.test(navigator.userAgent)) {
            return;
        }
        var
            doc = view.document
        // only get URL when necessary in case Blob.js hasn't overridden it yet
            , get_URL = function() {
                return view.URL || view.webkitURL || view;
            }
            , save_link = doc.createElementNS("http://www.w3.org/1999/xhtml", "a")
            , can_use_save_link = !view.externalHost && "download" in save_link
            , click = function(node) {
                var event = doc.createEvent("MouseEvents");
                event.initMouseEvent(
                    "click", true, false, view, 0, 0, 0, 0, 0
                    , false, false, false, false, 0, null
                );
                node.dispatchEvent(event);
            }
            , webkit_req_fs = view.webkitRequestFileSystem
            , req_fs = view.requestFileSystem || webkit_req_fs || view.mozRequestFileSystem
            , throw_outside = function(ex) {
                (view.setImmediate || view.setTimeout)(function() {
                    throw ex;
                }, 0);
            }
            , force_saveable_type = "application/octet-stream"
            , fs_min_size = 0
            , deletion_queue = []
            , process_deletion_queue = function() {
                var i = deletion_queue.length;
                while (i--) {
                    var file = deletion_queue[i];
                    if (typeof file === "string") { // file is an object URL
                        get_URL().revokeObjectURL(file);
                    } else { // file is a File
                        file.remove();
                    }
                }
                deletion_queue.length = 0; // clear queue
            }
            , dispatch = function(filesaver, event_types, event) {
                event_types = [].concat(event_types);
                var i = event_types.length;
                while (i--) {
                    var listener = filesaver["on" + event_types[i]];
                    if (typeof listener === "function") {
                        try {
                            listener.call(filesaver, event || filesaver);
                        } catch (ex) {
                            throw_outside(ex);
                        }
                    }
                }
            }
            , FileSaver = function(blob, name) {
                // First try a.download, then web filesystem, then object URLs
                var
                    filesaver = this
                    , type = blob.type
                    , blob_changed = false
                    , object_url
                    , target_view
                    , get_object_url = function() {
                        var object_url = get_URL().createObjectURL(blob);
                        deletion_queue.push(object_url);
                        return object_url;
                    }
                    , dispatch_all = function() {
                        dispatch(filesaver, "writestart progress write writeend".split(" "));
                    }
                // on any filesys errors revert to saving with object URLs
                    , fs_error = function() {
                        // don't create more object URLs than needed
                        if (blob_changed || !object_url) {
                            object_url = get_object_url(blob);
                        }
                        if (target_view) {
                            target_view.location.href = object_url;
                        } else {
                            window.open(object_url, "_blank");
                        }
                        filesaver.readyState = filesaver.DONE;
                        dispatch_all();
                    }
                    , abortable = function(func) {
                        return function() {
                            if (filesaver.readyState !== filesaver.DONE) {
                                return func.apply(this, arguments);
                            }
                        };
                    }
                    , create_if_not_found = {create: true, exclusive: false}
                    , slice
                    ;
                filesaver.readyState = filesaver.INIT;
                if (!name) {
                    name = "download";
                }
                if (can_use_save_link) {
                    object_url = get_object_url(blob);
                    save_link.href = object_url;
                    save_link.download = name;
                    click(save_link);
                    filesaver.readyState = filesaver.DONE;
                    dispatch_all();
                    return;
                }
                // Object and web filesystem URLs have a problem saving in Google Chrome when
                // viewed in a tab, so I force save with application/octet-stream
                // http://code.google.com/p/chromium/issues/detail?id=91158
                if (view.chrome && type && type !== force_saveable_type) {
                    slice = blob.slice || blob.webkitSlice;
                    blob = slice.call(blob, 0, blob.size, force_saveable_type);
                    blob_changed = true;
                }
                // Since I can't be sure that the guessed media type will trigger a download
                // in WebKit, I append .download to the filename.
                // https://bugs.webkit.org/show_bug.cgi?id=65440
                if (webkit_req_fs && name !== "download") {
                    name += ".download";
                }
                if (type === force_saveable_type || webkit_req_fs) {
                    target_view = view;
                }
                if (!req_fs) {
                    fs_error();
                    return;
                }
                fs_min_size += blob.size;
                req_fs(view.TEMPORARY, fs_min_size, abortable(function(fs) {
                    fs.root.getDirectory("saved", create_if_not_found, abortable(function(dir) {
                        var save = function() {
                            dir.getFile(name, create_if_not_found, abortable(function(file) {
                                file.createWriter(abortable(function(writer) {
                                    writer.onwriteend = function(event) {
                                        target_view.location.href = file.toURL();
                                        deletion_queue.push(file);
                                        filesaver.readyState = filesaver.DONE;
                                        dispatch(filesaver, "writeend", event);
                                    };
                                    writer.onerror = function() {
                                        var error = writer.error;
                                        if (error.code !== error.ABORT_ERR) {
                                            fs_error();
                                        }
                                    };
                                    "writestart progress write abort".split(" ").forEach(function(event) {
                                        writer["on" + event] = filesaver["on" + event];
                                    });
                                    writer.write(blob);
                                    filesaver.abort = function() {
                                        writer.abort();
                                        filesaver.readyState = filesaver.DONE;
                                    };
                                    filesaver.readyState = filesaver.WRITING;
                                }), fs_error);
                            }), fs_error);
                        };
                        dir.getFile(name, {create: false}, abortable(function(file) {
                            // delete file if it already exists
                            file.remove();
                            save();
                        }), abortable(function(ex) {
                            if (ex.code === ex.NOT_FOUND_ERR) {
                                save();
                            } else {
                                fs_error();
                            }
                        }));
                    }), fs_error);
                }), fs_error);
            }
            , FS_proto = FileSaver.prototype
            , saveAs = function(blob, name) {
                return new FileSaver(blob, name);
            }
            ;
        FS_proto.abort = function() {
            var filesaver = this;
            filesaver.readyState = filesaver.DONE;
            dispatch(filesaver, "abort");
        };
        FS_proto.readyState = FS_proto.INIT = 0;
        FS_proto.WRITING = 1;
        FS_proto.DONE = 2;

        FS_proto.error =
            FS_proto.onwritestart =
                FS_proto.onprogress =
                    FS_proto.onwrite =
                        FS_proto.onabort =
                            FS_proto.onerror =
                                FS_proto.onwriteend =
                                    null;

        view.addEventListener("unload", process_deletion_queue, false);
        saveAs.unload = function() {
            process_deletion_queue();
            view.removeEventListener("unload", process_deletion_queue, false);
        };
        return saveAs;
    }(
            typeof self !== "undefined" && self
            || typeof window !== "undefined" && window
            || this.content
    ));
// `self` is undefined in Firefox for Android content script context
// while `this` is nsIContentFrameMessageManager
// with an attribute `content` that corresponds to the window

if (typeof module !== "undefined" && module !== null) {
    module.exports = saveAs;
} else if ((typeof define !== "undefined" && define !== null) && (define.amd != null)) {
    define([], function() {
        return saveAs;
    });
}

/*!

 JSZip - A Javascript class for generating and reading zip files
 <http://stuartk.com/jszip>

 (c) 2009-2014 Stuart Knightley <stuart [at] stuartk.com>
 Dual licenced under the MIT license or GPLv3. See https://raw.github.com/Stuk/jszip/master/LICENSE.markdown.

 JSZip uses the library zlib.js released under the following license :
 zlib.js 2012 - imaya [ https://github.com/imaya/zlib.js ] The MIT License
 */
!function(a){"object"==typeof exports?module.exports=a():"function"==typeof define&&define.amd?define(a):"undefined"!=typeof window?window.JSZip=a():"undefined"!=typeof global?global.JSZip=a():"undefined"!=typeof self&&(self.JSZip=a())}(function(){return function a(b,c,d){function e(g,h){if(!c[g]){if(!b[g]){var i="function"==typeof require&&require;if(!h&&i)return i(g,!0);if(f)return f(g,!0);throw new Error("Cannot find module '"+g+"'")}var j=c[g]={exports:{}};b[g][0].call(j.exports,function(a){var c=b[g][1][a];return e(c?c:a)},j,j.exports,a,b,c,d)}return c[g].exports}for(var f="function"==typeof require&&require,g=0;g<d.length;g++)e(d[g]);return e}({1:[function(a,b,c){"use strict";var d="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";c.encode=function(a){for(var b,c,e,f,g,h,i,j="",k=0;k<a.length;)b=a.charCodeAt(k++),c=a.charCodeAt(k++),e=a.charCodeAt(k++),f=b>>2,g=(3&b)<<4|c>>4,h=(15&c)<<2|e>>6,i=63&e,isNaN(c)?h=i=64:isNaN(e)&&(i=64),j=j+d.charAt(f)+d.charAt(g)+d.charAt(h)+d.charAt(i);return j},c.decode=function(a){var b,c,e,f,g,h,i,j="",k=0;for(a=a.replace(/[^A-Za-z0-9\+\/\=]/g,"");k<a.length;)f=d.indexOf(a.charAt(k++)),g=d.indexOf(a.charAt(k++)),h=d.indexOf(a.charAt(k++)),i=d.indexOf(a.charAt(k++)),b=f<<2|g>>4,c=(15&g)<<4|h>>2,e=(3&h)<<6|i,j+=String.fromCharCode(b),64!=h&&(j+=String.fromCharCode(c)),64!=i&&(j+=String.fromCharCode(e));return j}},{}],2:[function(a,b){"use strict";function c(){this.compressedSize=0,this.uncompressedSize=0,this.crc32=0,this.compressionMethod=null,this.compressedContent=null}c.prototype={getContent:function(){return null},getCompressedContent:function(){return null}},b.exports=c},{}],3:[function(a,b,c){"use strict";c.STORE={magic:"\x00\x00",compress:function(a){return a},uncompress:function(a){return a},compressInputType:null,uncompressInputType:null},c.DEFLATE=a("./flate")},{"./flate":6}],4:[function(a,b){"use strict";function c(){this.data=null,this.length=0,this.index=0}var d=a("./utils");c.prototype={checkOffset:function(a){this.checkIndex(this.index+a)},checkIndex:function(a){if(this.length<a||0>a)throw new Error("End of data reached (data length = "+this.length+", asked index = "+a+"). Corrupted zip ?")},setIndex:function(a){this.checkIndex(a),this.index=a},skip:function(a){this.setIndex(this.index+a)},byteAt:function(){},readInt:function(a){var b,c=0;for(this.checkOffset(a),b=this.index+a-1;b>=this.index;b--)c=(c<<8)+this.byteAt(b);return this.index+=a,c},readString:function(a){return d.transformTo("string",this.readData(a))},readData:function(){},lastIndexOfSignature:function(){},readDate:function(){var a=this.readInt(4);return new Date((a>>25&127)+1980,(a>>21&15)-1,a>>16&31,a>>11&31,a>>5&63,(31&a)<<1)}},b.exports=c},{"./utils":14}],5:[function(a,b,c){"use strict";c.base64=!1,c.binary=!1,c.dir=!1,c.date=null,c.compression=null},{}],6:[function(a,b,c){"use strict";var d="undefined"!=typeof Uint8Array&&"undefined"!=typeof Uint16Array&&"undefined"!=typeof Uint32Array,e=a("zlibjs/bin/rawdeflate.min").Zlib,f=a("zlibjs/bin/rawinflate.min").Zlib;c.uncompressInputType=d?"uint8array":"array",c.compressInputType=d?"uint8array":"array",c.magic="\b\x00",c.compress=function(a){var b=new e.RawDeflate(a);return b.compress()},c.uncompress=function(a){var b=new f.RawInflate(a);return b.decompress()}},{"zlibjs/bin/rawdeflate.min":19,"zlibjs/bin/rawinflate.min":20}],7:[function(a,b){"use strict";function c(a,b){return this instanceof c?(this.files={},this.root="",a&&this.load(a,b),void(this.clone=function(){var a=new c;for(var b in this)"function"!=typeof this[b]&&(a[b]=this[b]);return a})):new c(a,b)}c.prototype=a("./object"),c.prototype.load=a("./load"),c.support=a("./support"),c.defaults=a("./defaults"),c.utils=a("./utils"),c.base64=a("./base64"),c.compressions=a("./compressions"),b.exports=c},{"./base64":1,"./compressions":3,"./defaults":5,"./load":8,"./object":9,"./support":12,"./utils":14}],8:[function(a,b){"use strict";var c=a("./base64"),d=a("./zipEntries");b.exports=function(a,b){var e,f,g,h;for(b=b||{},b.base64&&(a=c.decode(a)),f=new d(a,b),e=f.files,g=0;g<e.length;g++)h=e[g],this.file(h.fileName,h.decompressed,{binary:!0,optimizedBinaryString:!0,date:h.date,dir:h.dir});return this}},{"./base64":1,"./zipEntries":15}],9:[function(a,b){"use strict";var c,d,e=a("./support"),f=a("./utils"),g=a("./signature"),h=a("./defaults"),i=a("./base64"),j=a("./compressions"),k=a("./compressedObject"),l=a("./nodeBuffer");e.uint8array&&"function"==typeof TextEncoder&&"function"==typeof TextDecoder&&(c=new TextEncoder("utf-8"),d=new TextDecoder("utf-8"));var m=function(a){if(a._data instanceof k&&(a._data=a._data.getContent(),a.options.binary=!0,a.options.base64=!1,"uint8array"===f.getTypeOf(a._data))){var b=a._data;a._data=new Uint8Array(b.length),0!==b.length&&a._data.set(b,0)}return a._data},n=function(a){var b=m(a),d=f.getTypeOf(b);if("string"===d){if(!a.options.binary){if(c)return c.encode(b);if(e.nodebuffer)return l(b,"utf-8")}return a.asBinary()}return b},o=function(a){var b=m(this);return null===b||"undefined"==typeof b?"":(this.options.base64&&(b=i.decode(b)),b=a&&this.options.binary?A.utf8decode(b):f.transformTo("string",b),a||this.options.binary||(b=A.utf8encode(b)),b)},p=function(a,b,c){this.name=a,this._data=b,this.options=c};p.prototype={asText:function(){return o.call(this,!0)},asBinary:function(){return o.call(this,!1)},asNodeBuffer:function(){var a=n(this);return f.transformTo("nodebuffer",a)},asUint8Array:function(){var a=n(this);return f.transformTo("uint8array",a)},asArrayBuffer:function(){return this.asUint8Array().buffer}};var q=function(a,b){var c,d="";for(c=0;b>c;c++)d+=String.fromCharCode(255&a),a>>>=8;return d},r=function(){var a,b,c={};for(a=0;a<arguments.length;a++)for(b in arguments[a])arguments[a].hasOwnProperty(b)&&"undefined"==typeof c[b]&&(c[b]=arguments[a][b]);return c},s=function(a){return a=a||{},a.base64!==!0||null!==a.binary&&void 0!==a.binary||(a.binary=!0),a=r(a,h),a.date=a.date||new Date,null!==a.compression&&(a.compression=a.compression.toUpperCase()),a},t=function(a,b,c){var d=u(a),e=f.getTypeOf(b);if(d&&v.call(this,d),c=s(c),c.dir||null===b||"undefined"==typeof b)c.base64=!1,c.binary=!1,b=null;else if("string"===e)c.binary&&!c.base64&&c.optimizedBinaryString!==!0&&(b=f.string2binary(b));else{if(c.base64=!1,c.binary=!0,!(e||b instanceof k))throw new Error("The data of '"+a+"' is in an unsupported format !");"arraybuffer"===e&&(b=f.transformTo("uint8array",b))}var g=new p(a,b,c);return this.files[a]=g,g},u=function(a){"/"==a.slice(-1)&&(a=a.substring(0,a.length-1));var b=a.lastIndexOf("/");return b>0?a.substring(0,b):""},v=function(a){return"/"!=a.slice(-1)&&(a+="/"),this.files[a]||t.call(this,a,null,{dir:!0}),this.files[a]},w=function(a,b){var c,d=new k;return a._data instanceof k?(d.uncompressedSize=a._data.uncompressedSize,d.crc32=a._data.crc32,0===d.uncompressedSize||a.options.dir?(b=j.STORE,d.compressedContent="",d.crc32=0):a._data.compressionMethod===b.magic?d.compressedContent=a._data.getCompressedContent():(c=a._data.getContent(),d.compressedContent=b.compress(f.transformTo(b.compressInputType,c)))):(c=n(a),(!c||0===c.length||a.options.dir)&&(b=j.STORE,c=""),d.uncompressedSize=c.length,d.crc32=this.crc32(c),d.compressedContent=b.compress(f.transformTo(b.compressInputType,c))),d.compressedSize=d.compressedContent.length,d.compressionMethod=b.magic,d},x=function(a,b,c,d){var e,f,h=(c.compressedContent,this.utf8encode(b.name)),i=h!==b.name,j=b.options,k="",l="";e=j.date.getHours(),e<<=6,e|=j.date.getMinutes(),e<<=5,e|=j.date.getSeconds()/2,f=j.date.getFullYear()-1980,f<<=4,f|=j.date.getMonth()+1,f<<=5,f|=j.date.getDate(),i&&(l=q(1,1)+q(this.crc32(h),4)+h,k+="up"+q(l.length,2)+l);var m="";m+="\n\x00",m+=i?"\x00\b":"\x00\x00",m+=c.compressionMethod,m+=q(e,2),m+=q(f,2),m+=q(c.crc32,4),m+=q(c.compressedSize,4),m+=q(c.uncompressedSize,4),m+=q(h.length,2),m+=q(k.length,2);var n=g.LOCAL_FILE_HEADER+m+h+k,o=g.CENTRAL_FILE_HEADER+"\x00"+m+"\x00\x00\x00\x00\x00\x00"+(b.options.dir===!0?"\x00\x00\x00":"\x00\x00\x00\x00")+q(d,4)+h+k;return{fileRecord:n,dirRecord:o,compressedObject:c}},y=function(){this.data=[]};y.prototype={append:function(a){a=f.transformTo("string",a),this.data.push(a)},finalize:function(){return this.data.join("")}};var z=function(a){this.data=new Uint8Array(a),this.index=0};z.prototype={append:function(a){0!==a.length&&(a=f.transformTo("uint8array",a),this.data.set(a,this.index),this.index+=a.length)},finalize:function(){return this.data}};var A={load:function(){throw new Error("Load method is not defined. Is the file jszip-load.js included ?")},filter:function(a){var b,c,d,e,f=[];for(b in this.files)this.files.hasOwnProperty(b)&&(d=this.files[b],e=new p(d.name,d._data,r(d.options)),c=b.slice(this.root.length,b.length),b.slice(0,this.root.length)===this.root&&a(c,e)&&f.push(e));return f},file:function(a,b,c){if(1===arguments.length){if(f.isRegExp(a)){var d=a;return this.filter(function(a,b){return!b.options.dir&&d.test(a)})}return this.filter(function(b,c){return!c.options.dir&&b===a})[0]||null}return a=this.root+a,t.call(this,a,b,c),this},folder:function(a){if(!a)return this;if(f.isRegExp(a))return this.filter(function(b,c){return c.options.dir&&a.test(b)});var b=this.root+a,c=v.call(this,b),d=this.clone();return d.root=c.name,d},remove:function(a){a=this.root+a;var b=this.files[a];if(b||("/"!=a.slice(-1)&&(a+="/"),b=this.files[a]),b)if(b.options.dir)for(var c=this.filter(function(b,c){return c.name.slice(0,a.length)===a}),d=0;d<c.length;d++)delete this.files[c[d].name];else delete this.files[a];return this},generate:function(a){a=r(a||{},{base64:!0,compression:"STORE",type:"base64"}),f.checkSupport(a.type);var b,c,d=[],e=0,h=0;for(var k in this.files)if(this.files.hasOwnProperty(k)){var l=this.files[k],m=l.options.compression||a.compression.toUpperCase(),n=j[m];if(!n)throw new Error(m+" is not a valid compression method !");var o=w.call(this,l,n),p=x.call(this,k,l,o,e);e+=p.fileRecord.length+o.compressedSize,h+=p.dirRecord.length,d.push(p)}var s="";s=g.CENTRAL_DIRECTORY_END+"\x00\x00\x00\x00"+q(d.length,2)+q(d.length,2)+q(h,4)+q(e,4)+"\x00\x00";var t=a.type.toLowerCase();for(b="uint8array"===t||"arraybuffer"===t||"blob"===t||"nodebuffer"===t?new z(e+h+s.length):new y(e+h+s.length),c=0;c<d.length;c++)b.append(d[c].fileRecord),b.append(d[c].compressedObject.compressedContent);for(c=0;c<d.length;c++)b.append(d[c].dirRecord);b.append(s);var u=b.finalize();switch(a.type.toLowerCase()){case"uint8array":case"arraybuffer":case"nodebuffer":return f.transformTo(a.type.toLowerCase(),u);case"blob":return f.arrayBuffer2Blob(f.transformTo("arraybuffer",u));case"base64":return a.base64?i.encode(u):u;default:return u}},crc32:function(a,b){if("undefined"==typeof a||!a.length)return 0;var c="string"!==f.getTypeOf(a),d=[0,1996959894,3993919788,2567524794,124634137,1886057615,3915621685,2657392035,249268274,2044508324,3772115230,2547177864,162941995,2125561021,3887607047,2428444049,498536548,1789927666,4089016648,2227061214,450548861,1843258603,4107580753,2211677639,325883990,1684777152,4251122042,2321926636,335633487,1661365465,4195302755,2366115317,997073096,1281953886,3579855332,2724688242,1006888145,1258607687,3524101629,2768942443,901097722,1119000684,3686517206,2898065728,853044451,1172266101,3705015759,2882616665,651767980,1373503546,3369554304,3218104598,565507253,1454621731,3485111705,3099436303,671266974,1594198024,3322730930,2970347812,795835527,1483230225,3244367275,3060149565,1994146192,31158534,2563907772,4023717930,1907459465,112637215,2680153253,3904427059,2013776290,251722036,2517215374,3775830040,2137656763,141376813,2439277719,3865271297,1802195444,476864866,2238001368,4066508878,1812370925,453092731,2181625025,4111451223,1706088902,314042704,2344532202,4240017532,1658658271,366619977,2362670323,4224994405,1303535960,984961486,2747007092,3569037538,1256170817,1037604311,2765210733,3554079995,1131014506,879679996,2909243462,3663771856,1141124467,855842277,2852801631,3708648649,1342533948,654459306,3188396048,3373015174,1466479909,544179635,3110523913,3462522015,1591671054,702138776,2966460450,3352799412,1504918807,783551873,3082640443,3233442989,3988292384,2596254646,62317068,1957810842,3939845945,2647816111,81470997,1943803523,3814918930,2489596804,225274430,2053790376,3826175755,2466906013,167816743,2097651377,4027552580,2265490386,503444072,1762050814,4150417245,2154129355,426522225,1852507879,4275313526,2312317920,282753626,1742555852,4189708143,2394877945,397917763,1622183637,3604390888,2714866558,953729732,1340076626,3518719985,2797360999,1068828381,1219638859,3624741850,2936675148,906185462,1090812512,3747672003,2825379669,829329135,1181335161,3412177804,3160834842,628085408,1382605366,3423369109,3138078467,570562233,1426400815,3317316542,2998733608,733239954,1555261956,3268935591,3050360625,752459403,1541320221,2607071920,3965973030,1969922972,40735498,2617837225,3943577151,1913087877,83908371,2512341634,3803740692,2075208622,213261112,2463272603,3855990285,2094854071,198958881,2262029012,4057260610,1759359992,534414190,2176718541,4139329115,1873836001,414664567,2282248934,4279200368,1711684554,285281116,2405801727,4167216745,1634467795,376229701,2685067896,3608007406,1308918612,956543938,2808555105,3495958263,1231636301,1047427035,2932959818,3654703836,1088359270,936918e3,2847714899,3736837829,1202900863,817233897,3183342108,3401237130,1404277552,615818150,3134207493,3453421203,1423857449,601450431,3009837614,3294710456,1567103746,711928724,3020668471,3272380065,1510334235,755167117];"undefined"==typeof b&&(b=0);var e=0,g=0,h=0;b=-1^b;for(var i=0,j=a.length;j>i;i++)h=c?a[i]:a.charCodeAt(i),g=255&(b^h),e=d[g],b=b>>>8^e;return-1^b},utf8encode:function(a){if(c){var b=c.encode(a);return f.transformTo("string",b)}if(e.nodebuffer)return f.transformTo("string",l(a,"utf-8"));for(var d=[],g=0,h=0;h<a.length;h++){var i=a.charCodeAt(h);128>i?d[g++]=String.fromCharCode(i):i>127&&2048>i?(d[g++]=String.fromCharCode(i>>6|192),d[g++]=String.fromCharCode(63&i|128)):(d[g++]=String.fromCharCode(i>>12|224),d[g++]=String.fromCharCode(i>>6&63|128),d[g++]=String.fromCharCode(63&i|128))}return d.join("")},utf8decode:function(a){var b=[],c=0,g=f.getTypeOf(a),h="string"!==g,i=0,j=0,k=0,l=0;if(d)return d.decode(f.transformTo("uint8array",a));if(e.nodebuffer)return f.transformTo("nodebuffer",a).toString("utf-8");for(;i<a.length;)j=h?a[i]:a.charCodeAt(i),128>j?(b[c++]=String.fromCharCode(j),i++):j>191&&224>j?(k=h?a[i+1]:a.charCodeAt(i+1),b[c++]=String.fromCharCode((31&j)<<6|63&k),i+=2):(k=h?a[i+1]:a.charCodeAt(i+1),l=h?a[i+2]:a.charCodeAt(i+2),b[c++]=String.fromCharCode((15&j)<<12|(63&k)<<6|63&l),i+=3);return b.join("")}};b.exports=A},{"./base64":1,"./compressedObject":2,"./compressions":3,"./defaults":5,"./nodeBuffer":17,"./signature":10,"./support":12,"./utils":14}],10:[function(a,b,c){"use strict";c.LOCAL_FILE_HEADER="PK",c.CENTRAL_FILE_HEADER="PK",c.CENTRAL_DIRECTORY_END="PK",c.ZIP64_CENTRAL_DIRECTORY_LOCATOR="PK",c.ZIP64_CENTRAL_DIRECTORY_END="PK",c.DATA_DESCRIPTOR="PK\b"},{}],11:[function(a,b){"use strict";function c(a,b){this.data=a,b||(this.data=e.string2binary(this.data)),this.length=this.data.length,this.index=0}var d=a("./dataReader"),e=a("./utils");c.prototype=new d,c.prototype.byteAt=function(a){return this.data.charCodeAt(a)},c.prototype.lastIndexOfSignature=function(a){return this.data.lastIndexOf(a)},c.prototype.readData=function(a){this.checkOffset(a);var b=this.data.slice(this.index,this.index+a);return this.index+=a,b},b.exports=c},{"./dataReader":4,"./utils":14}],12:[function(a,b,c){var d=a("__browserify_process");if(c.base64=!0,c.array=!0,c.string=!0,c.arraybuffer="undefined"!=typeof ArrayBuffer&&"undefined"!=typeof Uint8Array,c.nodebuffer=!d.browser,c.uint8array="undefined"!=typeof Uint8Array,"undefined"==typeof ArrayBuffer)c.blob=!1;else{var e=new ArrayBuffer(0);try{c.blob=0===new Blob([e],{type:"application/zip"}).size}catch(f){try{var g=window.BlobBuilder||window.WebKitBlobBuilder||window.MozBlobBuilder||window.MSBlobBuilder,h=new g;h.append(e),c.blob=0===h.getBlob("application/zip").size}catch(f){c.blob=!1}}}},{__browserify_process:18}],13:[function(a,b){"use strict";function c(a){a&&(this.data=a,this.length=this.data.length,this.index=0)}var d=a("./dataReader");c.prototype=new d,c.prototype.byteAt=function(a){return this.data[a]},c.prototype.lastIndexOfSignature=function(a){for(var b=a.charCodeAt(0),c=a.charCodeAt(1),d=a.charCodeAt(2),e=a.charCodeAt(3),f=this.length-4;f>=0;--f)if(this.data[f]===b&&this.data[f+1]===c&&this.data[f+2]===d&&this.data[f+3]===e)return f;return-1},c.prototype.readData=function(a){this.checkOffset(a);var b=this.data.subarray(this.index,this.index+a);return this.index+=a,b},b.exports=c},{"./dataReader":4}],14:[function(a,b,c){"use strict";function d(a){return a}function e(a,b){for(var c=0;c<a.length;++c)b[c]=255&a.charCodeAt(c);return b}function f(a){var b=65536,d=[],e=a.length,f=c.getTypeOf(a),g=0,h=!0;try{switch(f){case"uint8array":String.fromCharCode.apply(null,new Uint8Array(0));break;case"nodebuffer":String.fromCharCode.apply(null,j(0))}}catch(i){h=!1}if(!h){for(var k="",l=0;l<a.length;l++)k+=String.fromCharCode(a[l]);return k}for(;e>g&&b>1;)try{d.push("array"===f||"nodebuffer"===f?String.fromCharCode.apply(null,a.slice(g,Math.min(g+b,e))):String.fromCharCode.apply(null,a.subarray(g,Math.min(g+b,e)))),g+=b}catch(i){b=Math.floor(b/2)}return d.join("")}function g(a,b){for(var c=0;c<a.length;c++)b[c]=a[c];return b}var h=a("./support"),i=a("./compressions"),j=a("./nodeBuffer");c.string2binary=function(a){for(var b="",c=0;c<a.length;c++)b+=String.fromCharCode(255&a.charCodeAt(c));return b},c.string2Uint8Array=function(a){return c.transformTo("uint8array",a)},c.uint8Array2String=function(a){return c.transformTo("string",a)},c.string2Blob=function(a){var b=c.transformTo("arraybuffer",a);return c.arrayBuffer2Blob(b)},c.arrayBuffer2Blob=function(a){c.checkSupport("blob");try{return new Blob([a],{type:"application/zip"})}catch(b){try{var d=window.BlobBuilder||window.WebKitBlobBuilder||window.MozBlobBuilder||window.MSBlobBuilder,e=new d;return e.append(a),e.getBlob("application/zip")}catch(b){throw new Error("Bug : can't construct the Blob.")}}};var k={};k.string={string:d,array:function(a){return e(a,new Array(a.length))},arraybuffer:function(a){return k.string.uint8array(a).buffer},uint8array:function(a){return e(a,new Uint8Array(a.length))},nodebuffer:function(a){return e(a,j(a.length))}},k.array={string:f,array:d,arraybuffer:function(a){return new Uint8Array(a).buffer},uint8array:function(a){return new Uint8Array(a)},nodebuffer:function(a){return j(a)}},k.arraybuffer={string:function(a){return f(new Uint8Array(a))},array:function(a){return g(new Uint8Array(a),new Array(a.byteLength))},arraybuffer:d,uint8array:function(a){return new Uint8Array(a)},nodebuffer:function(a){return j(new Uint8Array(a))}},k.uint8array={string:f,array:function(a){return g(a,new Array(a.length))},arraybuffer:function(a){return a.buffer},uint8array:d,nodebuffer:function(a){return j(a)}},k.nodebuffer={string:f,array:function(a){return g(a,new Array(a.length))},arraybuffer:function(a){return k.nodebuffer.uint8array(a).buffer},uint8array:function(a){return g(a,new Uint8Array(a.length))},nodebuffer:d},c.transformTo=function(a,b){if(b||(b=""),!a)return b;c.checkSupport(a);var d=c.getTypeOf(b),e=k[d][a](b);return e},c.getTypeOf=function(a){return"string"==typeof a?"string":"[object Array]"===Object.prototype.toString.call(a)?"array":h.nodebuffer&&j.test(a)?"nodebuffer":h.uint8array&&a instanceof Uint8Array?"uint8array":h.arraybuffer&&a instanceof ArrayBuffer?"arraybuffer":void 0},c.checkSupport=function(a){var b=h[a.toLowerCase()];if(!b)throw new Error(a+" is not supported by this browser")},c.MAX_VALUE_16BITS=65535,c.MAX_VALUE_32BITS=-1,c.pretty=function(a){var b,c,d="";for(c=0;c<(a||"").length;c++)b=a.charCodeAt(c),d+="\\x"+(16>b?"0":"")+b.toString(16).toUpperCase();return d},c.findCompression=function(a){for(var b in i)if(i.hasOwnProperty(b)&&i[b].magic===a)return i[b];return null},c.isRegExp=function(a){return"[object RegExp]"===Object.prototype.toString.call(a)}},{"./compressions":3,"./nodeBuffer":17,"./support":12}],15:[function(a,b){"use strict";function c(a,b){this.files=[],this.loadOptions=b,a&&this.load(a)}var d=a("./stringReader"),e=a("./nodeBufferReader"),f=a("./uint8ArrayReader"),g=a("./utils"),h=a("./signature"),i=a("./zipEntry"),j=a("./support");c.prototype={checkSignature:function(a){var b=this.reader.readString(4);if(b!==a)throw new Error("Corrupted zip or bug : unexpected signature ("+g.pretty(b)+", expected "+g.pretty(a)+")")},readBlockEndOfCentral:function(){this.diskNumber=this.reader.readInt(2),this.diskWithCentralDirStart=this.reader.readInt(2),this.centralDirRecordsOnThisDisk=this.reader.readInt(2),this.centralDirRecords=this.reader.readInt(2),this.centralDirSize=this.reader.readInt(4),this.centralDirOffset=this.reader.readInt(4),this.zipCommentLength=this.reader.readInt(2),this.zipComment=this.reader.readString(this.zipCommentLength)},readBlockZip64EndOfCentral:function(){this.zip64EndOfCentralSize=this.reader.readInt(8),this.versionMadeBy=this.reader.readString(2),this.versionNeeded=this.reader.readInt(2),this.diskNumber=this.reader.readInt(4),this.diskWithCentralDirStart=this.reader.readInt(4),this.centralDirRecordsOnThisDisk=this.reader.readInt(8),this.centralDirRecords=this.reader.readInt(8),this.centralDirSize=this.reader.readInt(8),this.centralDirOffset=this.reader.readInt(8),this.zip64ExtensibleData={};for(var a,b,c,d=this.zip64EndOfCentralSize-44,e=0;d>e;)a=this.reader.readInt(2),b=this.reader.readInt(4),c=this.reader.readString(b),this.zip64ExtensibleData[a]={id:a,length:b,value:c}},readBlockZip64EndOfCentralLocator:function(){if(this.diskWithZip64CentralDirStart=this.reader.readInt(4),this.relativeOffsetEndOfZip64CentralDir=this.reader.readInt(8),this.disksCount=this.reader.readInt(4),this.disksCount>1)throw new Error("Multi-volumes zip are not supported")},readLocalFiles:function(){var a,b;for(a=0;a<this.files.length;a++)b=this.files[a],this.reader.setIndex(b.localHeaderOffset),this.checkSignature(h.LOCAL_FILE_HEADER),b.readLocalPart(this.reader),b.handleUTF8()},readCentralDir:function(){var a;for(this.reader.setIndex(this.centralDirOffset);this.reader.readString(4)===h.CENTRAL_FILE_HEADER;)a=new i({zip64:this.zip64},this.loadOptions),a.readCentralPart(this.reader),this.files.push(a)},readEndOfCentral:function(){var a=this.reader.lastIndexOfSignature(h.CENTRAL_DIRECTORY_END);if(-1===a)throw new Error("Corrupted zip : can't find end of central directory");if(this.reader.setIndex(a),this.checkSignature(h.CENTRAL_DIRECTORY_END),this.readBlockEndOfCentral(),this.diskNumber===g.MAX_VALUE_16BITS||this.diskWithCentralDirStart===g.MAX_VALUE_16BITS||this.centralDirRecordsOnThisDisk===g.MAX_VALUE_16BITS||this.centralDirRecords===g.MAX_VALUE_16BITS||this.centralDirSize===g.MAX_VALUE_32BITS||this.centralDirOffset===g.MAX_VALUE_32BITS){if(this.zip64=!0,a=this.reader.lastIndexOfSignature(h.ZIP64_CENTRAL_DIRECTORY_LOCATOR),-1===a)throw new Error("Corrupted zip : can't find the ZIP64 end of central directory locator");this.reader.setIndex(a),this.checkSignature(h.ZIP64_CENTRAL_DIRECTORY_LOCATOR),this.readBlockZip64EndOfCentralLocator(),this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir),this.checkSignature(h.ZIP64_CENTRAL_DIRECTORY_END),this.readBlockZip64EndOfCentral()}},prepareReader:function(a){var b=g.getTypeOf(a);this.reader="string"!==b||j.uint8array?"nodebuffer"===b?new e(a):new f(g.transformTo("uint8array",a)):new d(a,this.loadOptions.optimizedBinaryString)},load:function(a){this.prepareReader(a),this.readEndOfCentral(),this.readCentralDir(),this.readLocalFiles()}},b.exports=c},{"./nodeBufferReader":17,"./signature":10,"./stringReader":11,"./support":12,"./uint8ArrayReader":13,"./utils":14,"./zipEntry":16}],16:[function(a,b){"use strict";function c(a,b){this.options=a,this.loadOptions=b}var d=a("./stringReader"),e=a("./utils"),f=a("./compressedObject"),g=a("./object");c.prototype={isEncrypted:function(){return 1===(1&this.bitFlag)},useUTF8:function(){return 2048===(2048&this.bitFlag)},prepareCompressedContent:function(a,b,c){return function(){var d=a.index;a.setIndex(b);var e=a.readData(c);return a.setIndex(d),e}},prepareContent:function(a,b,c,d,f){return function(){var a=e.transformTo(d.uncompressInputType,this.getCompressedContent()),b=d.uncompress(a);if(b.length!==f)throw new Error("Bug : uncompressed data size mismatch");return b}},readLocalPart:function(a){var b,c;if(a.skip(22),this.fileNameLength=a.readInt(2),c=a.readInt(2),this.fileName=a.readString(this.fileNameLength),a.skip(c),-1==this.compressedSize||-1==this.uncompressedSize)throw new Error("Bug or corrupted zip : didn't get enough informations from the central directory (compressedSize == -1 || uncompressedSize == -1)");if(b=e.findCompression(this.compressionMethod),null===b)throw new Error("Corrupted zip : compression "+e.pretty(this.compressionMethod)+" unknown (inner file : "+this.fileName+")");if(this.decompressed=new f,this.decompressed.compressedSize=this.compressedSize,this.decompressed.uncompressedSize=this.uncompressedSize,this.decompressed.crc32=this.crc32,this.decompressed.compressionMethod=this.compressionMethod,this.decompressed.getCompressedContent=this.prepareCompressedContent(a,a.index,this.compressedSize,b),this.decompressed.getContent=this.prepareContent(a,a.index,this.compressedSize,b,this.uncompressedSize),this.loadOptions.checkCRC32&&(this.decompressed=e.transformTo("string",this.decompressed.getContent()),g.crc32(this.decompressed)!==this.crc32))throw new Error("Corrupted zip : CRC32 mismatch")},readCentralPart:function(a){if(this.versionMadeBy=a.readString(2),this.versionNeeded=a.readInt(2),this.bitFlag=a.readInt(2),this.compressionMethod=a.readString(2),this.date=a.readDate(),this.crc32=a.readInt(4),this.compressedSize=a.readInt(4),this.uncompressedSize=a.readInt(4),this.fileNameLength=a.readInt(2),this.extraFieldsLength=a.readInt(2),this.fileCommentLength=a.readInt(2),this.diskNumberStart=a.readInt(2),this.internalFileAttributes=a.readInt(2),this.externalFileAttributes=a.readInt(4),this.localHeaderOffset=a.readInt(4),this.isEncrypted())throw new Error("Encrypted zip are not supported");this.fileName=a.readString(this.fileNameLength),this.readExtraFields(a),this.parseZIP64ExtraField(a),this.fileComment=a.readString(this.fileCommentLength),this.dir=16&this.externalFileAttributes?!0:!1},parseZIP64ExtraField:function(){if(this.extraFields[1]){var a=new d(this.extraFields[1].value);this.uncompressedSize===e.MAX_VALUE_32BITS&&(this.uncompressedSize=a.readInt(8)),this.compressedSize===e.MAX_VALUE_32BITS&&(this.compressedSize=a.readInt(8)),this.localHeaderOffset===e.MAX_VALUE_32BITS&&(this.localHeaderOffset=a.readInt(8)),this.diskNumberStart===e.MAX_VALUE_32BITS&&(this.diskNumberStart=a.readInt(4))}},readExtraFields:function(a){var b,c,d,e=a.index;for(this.extraFields=this.extraFields||{};a.index<e+this.extraFieldsLength;)b=a.readInt(2),c=a.readInt(2),d=a.readString(c),this.extraFields[b]={id:b,length:c,value:d}},handleUTF8:function(){if(this.useUTF8())this.fileName=g.utf8decode(this.fileName),this.fileComment=g.utf8decode(this.fileComment);else{var a=this.findExtraFieldUnicodePath();null!==a&&(this.fileName=a)}},findExtraFieldUnicodePath:function(){var a=this.extraFields[28789];if(a){var b=new d(a.value);return 1!==b.readInt(1)?null:g.crc32(this.fileName)!==b.readInt(4)?null:g.utf8decode(b.readString(a.length-5))}return null}},b.exports=c},{"./compressedObject":2,"./object":9,"./stringReader":11,"./utils":14}],17:[function(){},{}],18:[function(a,b){var c=b.exports={};c.nextTick=function(){var a="undefined"!=typeof window&&window.setImmediate,b="undefined"!=typeof window&&window.postMessage&&window.addEventListener;if(a)return function(a){return window.setImmediate(a)};if(b){var c=[];return window.addEventListener("message",function(a){var b=a.source;if((b===window||null===b)&&"process-tick"===a.data&&(a.stopPropagation(),c.length>0)){var d=c.shift();d()}},!0),function(a){c.push(a),window.postMessage("process-tick","*")}}return function(a){setTimeout(a,0)}}(),c.title="browser",c.browser=!0,c.env={},c.argv=[],c.binding=function(){throw new Error("process.binding is not supported")},c.cwd=function(){return"/"},c.chdir=function(){throw new Error("process.chdir is not supported")}},{}],19:[function(){/** @license zlib.js 2012 - imaya [ https://github.com/imaya/zlib.js ] The MIT License */
(function(){"use strict";function a(a,b){var c=a.split("."),d=n;!(c[0]in d)&&d.execScript&&d.execScript("var "+c[0]);for(var e;c.length&&(e=c.shift());)c.length||b===l?d=d[e]?d[e]:d[e]={}:d[e]=b}function b(a,b){if(this.index="number"==typeof b?b:0,this.d=0,this.buffer=a instanceof(o?Uint8Array:Array)?a:new(o?Uint8Array:Array)(32768),2*this.buffer.length<=this.index)throw Error("invalid index");this.buffer.length<=this.index&&c(this)}function c(a){var b,c=a.buffer,d=c.length,e=new(o?Uint8Array:Array)(d<<1);if(o)e.set(c);else for(b=0;d>b;++b)e[b]=c[b];return a.buffer=e}function d(a){this.buffer=new(o?Uint16Array:Array)(2*a),this.length=0}function e(a,b){this.e=w,this.f=0,this.input=o&&a instanceof Array?new Uint8Array(a):a,this.c=0,b&&(b.lazy&&(this.f=b.lazy),"number"==typeof b.compressionType&&(this.e=b.compressionType),b.outputBuffer&&(this.b=o&&b.outputBuffer instanceof Array?new Uint8Array(b.outputBuffer):b.outputBuffer),"number"==typeof b.outputIndex&&(this.c=b.outputIndex)),this.b||(this.b=new(o?Uint8Array:Array)(32768))}function f(a,b){this.length=a,this.g=b}function g(a,b){function c(a,b){var c,d=a.g,e=[],f=0;c=z[a.length],e[f++]=65535&c,e[f++]=c>>16&255,e[f++]=c>>24;var g;switch(m){case 1===d:g=[0,d-1,0];break;case 2===d:g=[1,d-2,0];break;case 3===d:g=[2,d-3,0];break;case 4===d:g=[3,d-4,0];break;case 6>=d:g=[4,d-5,1];break;case 8>=d:g=[5,d-7,1];break;case 12>=d:g=[6,d-9,2];break;case 16>=d:g=[7,d-13,2];break;case 24>=d:g=[8,d-17,3];break;case 32>=d:g=[9,d-25,3];break;case 48>=d:g=[10,d-33,4];break;case 64>=d:g=[11,d-49,4];break;case 96>=d:g=[12,d-65,5];break;case 128>=d:g=[13,d-97,5];break;case 192>=d:g=[14,d-129,6];break;case 256>=d:g=[15,d-193,6];break;case 384>=d:g=[16,d-257,7];break;case 512>=d:g=[17,d-385,7];break;case 768>=d:g=[18,d-513,8];break;case 1024>=d:g=[19,d-769,8];break;case 1536>=d:g=[20,d-1025,9];break;case 2048>=d:g=[21,d-1537,9];break;case 3072>=d:g=[22,d-2049,10];break;case 4096>=d:g=[23,d-3073,10];break;case 6144>=d:g=[24,d-4097,11];break;case 8192>=d:g=[25,d-6145,11];break;case 12288>=d:g=[26,d-8193,12];break;case 16384>=d:g=[27,d-12289,12];break;case 24576>=d:g=[28,d-16385,13];break;case 32768>=d:g=[29,d-24577,13];break;default:throw"invalid distance"}c=g,e[f++]=c[0],e[f++]=c[1],e[f++]=c[2];var h,i;for(h=0,i=e.length;i>h;++h)r[s++]=e[h];u[e[0]]++,v[e[3]]++,t=a.length+b-1,n=null}var d,e,f,g,i,j,k,n,p,q={},r=o?new Uint16Array(2*b.length):[],s=0,t=0,u=new(o?Uint32Array:Array)(286),v=new(o?Uint32Array:Array)(30),w=a.f;if(!o){for(f=0;285>=f;)u[f++]=0;for(f=0;29>=f;)v[f++]=0}for(u[256]=1,d=0,e=b.length;e>d;++d){for(f=i=0,g=3;g>f&&d+f!==e;++f)i=i<<8|b[d+f];if(q[i]===l&&(q[i]=[]),j=q[i],!(0<t--)){for(;0<j.length&&32768<d-j[0];)j.shift();if(d+3>=e){for(n&&c(n,-1),f=0,g=e-d;g>f;++f)p=b[d+f],r[s++]=p,++u[p];break}0<j.length?(k=h(b,d,j),n?n.length<k.length?(p=b[d-1],r[s++]=p,++u[p],c(k,0)):c(n,-1):k.length<w?n=k:c(k,0)):n?c(n,-1):(p=b[d],r[s++]=p,++u[p])}j.push(d)}return r[s++]=256,u[256]++,a.j=u,a.i=v,o?r.subarray(0,s):r}function h(a,b,c){var d,e,g,h,i,j,k=0,l=a.length;h=0,j=c.length;a:for(;j>h;h++){if(d=c[j-h-1],g=3,k>3){for(i=k;i>3;i--)if(a[d+i-1]!==a[b+i-1])continue a;g=k}for(;258>g&&l>b+g&&a[d+g]===a[b+g];)++g;if(g>k&&(e=d,k=g),258===g)break}return new f(k,b-e)}function i(a,b){var c,e,f,g,h,i=a.length,k=new d(572),l=new(o?Uint8Array:Array)(i);if(!o)for(g=0;i>g;g++)l[g]=0;for(g=0;i>g;++g)0<a[g]&&k.push(g,a[g]);if(c=Array(k.length/2),e=new(o?Uint32Array:Array)(k.length/2),1===c.length)return l[k.pop().index]=1,l;for(g=0,h=k.length/2;h>g;++g)c[g]=k.pop(),e[g]=c[g].value;for(f=j(e,e.length,b),g=0,h=c.length;h>g;++g)l[c[g].index]=f[g];return l}function j(a,b,c){function d(a){var c=n[a][p[a]];c===b?(d(a+1),d(a+1)):--l[c],++p[a]}var e,f,g,h,i,j=new(o?Uint16Array:Array)(c),k=new(o?Uint8Array:Array)(c),l=new(o?Uint8Array:Array)(b),m=Array(c),n=Array(c),p=Array(c),q=(1<<c)-b,r=1<<c-1;for(j[c-1]=b,f=0;c>f;++f)r>q?k[f]=0:(k[f]=1,q-=r),q<<=1,j[c-2-f]=(j[c-1-f]/2|0)+b;for(j[0]=k[0],m[0]=Array(j[0]),n[0]=Array(j[0]),f=1;c>f;++f)j[f]>2*j[f-1]+k[f]&&(j[f]=2*j[f-1]+k[f]),m[f]=Array(j[f]),n[f]=Array(j[f]);for(e=0;b>e;++e)l[e]=c;for(g=0;g<j[c-1];++g)m[c-1][g]=a[g],n[c-1][g]=g;for(e=0;c>e;++e)p[e]=0;for(1===k[c-1]&&(--l[0],++p[c-1]),f=c-2;f>=0;--f){for(h=e=0,i=p[f+1],g=0;g<j[f];g++)h=m[f+1][i]+m[f+1][i+1],h>a[e]?(m[f][g]=h,n[f][g]=b,i+=2):(m[f][g]=a[e],n[f][g]=e,++e);p[f]=0,1===k[f]&&d(f)}return l}function k(a){var b,c,d,e,f=new(o?Uint16Array:Array)(a.length),g=[],h=[],i=0;for(b=0,c=a.length;c>b;b++)g[a[b]]=(0|g[a[b]])+1;for(b=1,c=16;c>=b;b++)h[b]=i,i+=0|g[b],i<<=1;for(b=0,c=a.length;c>b;b++)for(i=h[a[b]],h[a[b]]+=1,d=f[b]=0,e=a[b];e>d;d++)f[b]=f[b]<<1|1&i,i>>>=1;return f}var l=void 0,m=!0,n=this,o="undefined"!=typeof Uint8Array&&"undefined"!=typeof Uint16Array&&"undefined"!=typeof Uint32Array&&"undefined"!=typeof DataView;b.prototype.a=function(a,b,d){var e,f=this.buffer,g=this.index,h=this.d,i=f[g];if(d&&b>1&&(a=b>8?(u[255&a]<<24|u[a>>>8&255]<<16|u[a>>>16&255]<<8|u[a>>>24&255])>>32-b:u[a]>>8-b),8>b+h)i=i<<b|a,h+=b;else for(e=0;b>e;++e)i=i<<1|a>>b-e-1&1,8===++h&&(h=0,f[g++]=u[i],i=0,g===f.length&&(f=c(this)));f[g]=i,this.buffer=f,this.d=h,this.index=g},b.prototype.finish=function(){var a,b=this.buffer,c=this.index;return 0<this.d&&(b[c]<<=8-this.d,b[c]=u[b[c]],c++),o?a=b.subarray(0,c):(b.length=c,a=b),a};var p,q=new(o?Uint8Array:Array)(256);for(p=0;256>p;++p){for(var r=p,s=r,t=7,r=r>>>1;r;r>>>=1)s<<=1,s|=1&r,--t;q[p]=(s<<t&255)>>>0}var u=q;d.prototype.getParent=function(a){return 2*((a-2)/4|0)},d.prototype.push=function(a,b){var c,d,e,f=this.buffer;for(c=this.length,f[this.length++]=b,f[this.length++]=a;c>0&&(d=this.getParent(c),f[c]>f[d]);)e=f[c],f[c]=f[d],f[d]=e,e=f[c+1],f[c+1]=f[d+1],f[d+1]=e,c=d;return this.length},d.prototype.pop=function(){var a,b,c,d,e,f=this.buffer;for(b=f[0],a=f[1],this.length-=2,f[0]=f[this.length],f[1]=f[this.length+1],e=0;(d=2*e+2,!(d>=this.length))&&(d+2<this.length&&f[d+2]>f[d]&&(d+=2),f[d]>f[e]);)c=f[e],f[e]=f[d],f[d]=c,c=f[e+1],f[e+1]=f[d+1],f[d+1]=c,e=d;return{index:a,value:b,length:this.length}};var v,w=2,x=[];for(v=0;288>v;v++)switch(m){case 143>=v:x.push([v+48,8]);break;case 255>=v:x.push([v-144+400,9]);break;case 279>=v:x.push([v-256+0,7]);break;case 287>=v:x.push([v-280+192,8]);break;default:throw"invalid literal: "+v}e.prototype.h=function(){var a,c,d,e,f=this.input;switch(this.e){case 0:for(d=0,e=f.length;e>d;){c=o?f.subarray(d,d+65535):f.slice(d,d+65535),d+=c.length;var h=c,j=d===e,n=l,p=l,q=l,r=l,s=l,t=this.b,u=this.c;if(o){for(t=new Uint8Array(this.b.buffer);t.length<=u+h.length+5;)t=new Uint8Array(t.length<<1);t.set(this.b)}if(n=j?1:0,t[u++]=0|n,p=h.length,q=~p+65536&65535,t[u++]=255&p,t[u++]=p>>>8&255,t[u++]=255&q,t[u++]=q>>>8&255,o)t.set(h,u),u+=h.length,t=t.subarray(0,u);else{for(r=0,s=h.length;s>r;++r)t[u++]=h[r];t.length=u}this.c=u,this.b=t}break;case 1:var v=new b(o?new Uint8Array(this.b.buffer):this.b,this.c);v.a(1,1,m),v.a(1,2,m);var y,z,A,B=g(this,f);for(y=0,z=B.length;z>y;y++)if(A=B[y],b.prototype.a.apply(v,x[A]),A>256)v.a(B[++y],B[++y],m),v.a(B[++y],5),v.a(B[++y],B[++y],m);else if(256===A)break;this.b=v.finish(),this.c=this.b.length;break;case w:var C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R=new b(o?new Uint8Array(this.b.buffer):this.b,this.c),S=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15],T=Array(19);for(C=w,R.a(1,1,m),R.a(C,2,m),D=g(this,f),H=i(this.j,15),I=k(H),J=i(this.i,7),K=k(J),E=286;E>257&&0===H[E-1];E--);for(F=30;F>1&&0===J[F-1];F--);var U,V,W,X,Y,Z,$=E,_=F,ab=new(o?Uint32Array:Array)($+_),bb=new(o?Uint32Array:Array)(316),cb=new(o?Uint8Array:Array)(19);for(U=V=0;$>U;U++)ab[V++]=H[U];for(U=0;_>U;U++)ab[V++]=J[U];if(!o)for(U=0,X=cb.length;X>U;++U)cb[U]=0;for(U=Y=0,X=ab.length;X>U;U+=V){for(V=1;X>U+V&&ab[U+V]===ab[U];++V);if(W=V,0===ab[U])if(3>W)for(;0<W--;)bb[Y++]=0,cb[0]++;else for(;W>0;)Z=138>W?W:138,Z>W-3&&W>Z&&(Z=W-3),10>=Z?(bb[Y++]=17,bb[Y++]=Z-3,cb[17]++):(bb[Y++]=18,bb[Y++]=Z-11,cb[18]++),W-=Z;else if(bb[Y++]=ab[U],cb[ab[U]]++,W--,3>W)for(;0<W--;)bb[Y++]=ab[U],cb[ab[U]]++;else for(;W>0;)Z=6>W?W:6,Z>W-3&&W>Z&&(Z=W-3),bb[Y++]=16,bb[Y++]=Z-3,cb[16]++,W-=Z}for(a=o?bb.subarray(0,Y):bb.slice(0,Y),L=i(cb,7),P=0;19>P;P++)T[P]=L[S[P]];for(G=19;G>4&&0===T[G-1];G--);for(M=k(L),R.a(E-257,5,m),R.a(F-1,5,m),R.a(G-4,4,m),P=0;G>P;P++)R.a(T[P],3,m);for(P=0,Q=a.length;Q>P;P++)if(N=a[P],R.a(M[N],L[N],m),N>=16){switch(P++,N){case 16:O=2;break;case 17:O=3;break;case 18:O=7;break;default:throw"invalid code: "+N}R.a(a[P],O,m)}var db,eb,fb,gb,hb,ib,jb,kb,lb=[I,H],mb=[K,J];for(hb=lb[0],ib=lb[1],jb=mb[0],kb=mb[1],db=0,eb=D.length;eb>db;++db)if(fb=D[db],R.a(hb[fb],ib[fb],m),fb>256)R.a(D[++db],D[++db],m),gb=D[++db],R.a(jb[gb],kb[gb],m),R.a(D[++db],D[++db],m);else if(256===fb)break;this.b=R.finish(),this.c=this.b.length;break;default:throw"invalid compression type"}return this.b};var y=function(){function a(a){switch(m){case 3===a:return[257,a-3,0];case 4===a:return[258,a-4,0];case 5===a:return[259,a-5,0];case 6===a:return[260,a-6,0];case 7===a:return[261,a-7,0];case 8===a:return[262,a-8,0];case 9===a:return[263,a-9,0];case 10===a:return[264,a-10,0];case 12>=a:return[265,a-11,1];case 14>=a:return[266,a-13,1];case 16>=a:return[267,a-15,1];case 18>=a:return[268,a-17,1];case 22>=a:return[269,a-19,2];case 26>=a:return[270,a-23,2];case 30>=a:return[271,a-27,2];case 34>=a:return[272,a-31,2];case 42>=a:return[273,a-35,3];case 50>=a:return[274,a-43,3];case 58>=a:return[275,a-51,3];case 66>=a:return[276,a-59,3];case 82>=a:return[277,a-67,4];case 98>=a:return[278,a-83,4];case 114>=a:return[279,a-99,4];case 130>=a:return[280,a-115,4];case 162>=a:return[281,a-131,5];case 194>=a:return[282,a-163,5];case 226>=a:return[283,a-195,5];case 257>=a:return[284,a-227,5];case 258===a:return[285,a-258,0];default:throw"invalid length: "+a}}var b,c,d=[];for(b=3;258>=b;b++)c=a(b),d[b]=c[2]<<24|c[1]<<16|c[0];return d}(),z=o?new Uint32Array(y):y;a("Zlib.RawDeflate",e),a("Zlib.RawDeflate.prototype.compress",e.prototype.h);var A,B,C,D,E={NONE:0,FIXED:1,DYNAMIC:w};if(Object.keys)A=Object.keys(E);else for(B in A=[],C=0,E)A[C++]=B;for(C=0,D=A.length;D>C;++C)B=A[C],a("Zlib.RawDeflate.CompressionType."+B,E[B])}).call(this)},{}],20:[function(){/** @license zlib.js 2012 - imaya [ https://github.com/imaya/zlib.js ] The MIT License */
(function(){"use strict";function a(a,b){var c=a.split("."),d=g;!(c[0]in d)&&d.execScript&&d.execScript("var "+c[0]);for(var e;c.length&&(e=c.shift());)c.length||void 0===b?d=d[e]?d[e]:d[e]={}:d[e]=b}function b(a){var b,c,d,e,f,g,i,j,k,l,m=a.length,n=0,o=Number.POSITIVE_INFINITY;for(j=0;m>j;++j)a[j]>n&&(n=a[j]),a[j]<o&&(o=a[j]);for(b=1<<n,c=new(h?Uint32Array:Array)(b),d=1,e=0,f=2;n>=d;){for(j=0;m>j;++j)if(a[j]===d){for(g=0,i=e,k=0;d>k;++k)g=g<<1|1&i,i>>=1;for(l=d<<16|j,k=g;b>k;k+=f)c[k]=l;++e}++d,e<<=1,f<<=1}return[c,n,o]}function c(a,b){switch(this.g=[],this.h=32768,this.c=this.f=this.d=this.k=0,this.input=h?new Uint8Array(a):a,this.l=!1,this.i=j,this.q=!1,(b||!(b={}))&&(b.index&&(this.d=b.index),b.bufferSize&&(this.h=b.bufferSize),b.bufferType&&(this.i=b.bufferType),b.resize&&(this.q=b.resize)),this.i){case i:this.a=32768,this.b=new(h?Uint8Array:Array)(32768+this.h+258);break;case j:this.a=0,this.b=new(h?Uint8Array:Array)(this.h),this.e=this.v,this.m=this.s,this.j=this.t;break;default:throw Error("invalid inflate mode")}}function d(a,b){for(var c,d=a.f,e=a.c,f=a.input,g=a.d,h=f.length;b>e;){if(g>=h)throw Error("input buffer is broken");d|=f[g++]<<e,e+=8}return c=d&(1<<b)-1,a.f=d>>>b,a.c=e-b,a.d=g,c}function e(a,b){for(var c,d,e=a.f,f=a.c,g=a.input,h=a.d,i=g.length,j=b[0],k=b[1];k>f&&!(h>=i);)e|=g[h++]<<f,f+=8;return c=j[e&(1<<k)-1],d=c>>>16,a.f=e>>d,a.c=f-d,a.d=h,65535&c}function f(a){function c(a,b,c){var f,g,h,i=this.p;for(h=0;a>h;)switch(f=e(this,b)){case 16:for(g=3+d(this,2);g--;)c[h++]=i;break;case 17:for(g=3+d(this,3);g--;)c[h++]=0;i=0;break;case 18:for(g=11+d(this,7);g--;)c[h++]=0;i=0;break;default:i=c[h++]=f}return this.p=i,c}var f,g,i,j,k=d(a,5)+257,l=d(a,5)+1,m=d(a,4)+4,o=new(h?Uint8Array:Array)(n.length);for(j=0;m>j;++j)o[n[j]]=d(a,3);if(!h)for(j=m,m=o.length;m>j;++j)o[n[j]]=0;f=b(o),g=new(h?Uint8Array:Array)(k),i=new(h?Uint8Array:Array)(l),a.p=0,a.j(b(c.call(a,k,f,g)),b(c.call(a,l,f,i)))}var g=this,h="undefined"!=typeof Uint8Array&&"undefined"!=typeof Uint16Array&&"undefined"!=typeof Uint32Array&&"undefined"!=typeof DataView,i=0,j=1;c.prototype.u=function(){for(;!this.l;){var a=d(this,3);switch(1&a&&(this.l=!0),a>>>=1){case 0:var b=this.input,c=this.d,e=this.b,g=this.a,k=b.length,l=void 0,m=void 0,n=e.length,o=void 0;if(this.c=this.f=0,c+1>=k)throw Error("invalid uncompressed block header: LEN");if(l=b[c++]|b[c++]<<8,c+1>=k)throw Error("invalid uncompressed block header: NLEN");if(m=b[c++]|b[c++]<<8,l===~m)throw Error("invalid uncompressed block header: length verify");if(c+l>b.length)throw Error("input buffer is broken");switch(this.i){case i:for(;g+l>e.length;){if(o=n-g,l-=o,h)e.set(b.subarray(c,c+o),g),g+=o,c+=o;else for(;o--;)e[g++]=b[c++];this.a=g,e=this.e(),g=this.a}break;case j:for(;g+l>e.length;)e=this.e({o:2});break;default:throw Error("invalid inflate mode")}if(h)e.set(b.subarray(c,c+l),g),g+=l,c+=l;else for(;l--;)e[g++]=b[c++];this.d=c,this.a=g,this.b=e;break;case 1:this.j(z,B);break;case 2:f(this);break;default:throw Error("unknown BTYPE: "+a)}}return this.m()};var k,l,m=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15],n=h?new Uint16Array(m):m,o=[3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,258,258],p=h?new Uint16Array(o):o,q=[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0],r=h?new Uint8Array(q):q,s=[1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577],t=h?new Uint16Array(s):s,u=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13],v=h?new Uint8Array(u):u,w=new(h?Uint8Array:Array)(288);for(k=0,l=w.length;l>k;++k)w[k]=143>=k?8:255>=k?9:279>=k?7:8;var x,y,z=b(w),A=new(h?Uint8Array:Array)(30);for(x=0,y=A.length;y>x;++x)A[x]=5;var B=b(A);c.prototype.j=function(a,b){var c=this.b,f=this.a;this.n=a;for(var g,h,i,j,k=c.length-258;256!==(g=e(this,a));)if(256>g)f>=k&&(this.a=f,c=this.e(),f=this.a),c[f++]=g;else for(h=g-257,j=p[h],0<r[h]&&(j+=d(this,r[h])),g=e(this,b),i=t[g],0<v[g]&&(i+=d(this,v[g])),f>=k&&(this.a=f,c=this.e(),f=this.a);j--;)c[f]=c[f++-i];for(;8<=this.c;)this.c-=8,this.d--;this.a=f},c.prototype.t=function(a,b){var c=this.b,f=this.a;this.n=a;for(var g,h,i,j,k=c.length;256!==(g=e(this,a));)if(256>g)f>=k&&(c=this.e(),k=c.length),c[f++]=g;else for(h=g-257,j=p[h],0<r[h]&&(j+=d(this,r[h])),g=e(this,b),i=t[g],0<v[g]&&(i+=d(this,v[g])),f+j>k&&(c=this.e(),k=c.length);j--;)c[f]=c[f++-i];for(;8<=this.c;)this.c-=8,this.d--;this.a=f},c.prototype.e=function(){var a,b,c=new(h?Uint8Array:Array)(this.a-32768),d=this.a-32768,e=this.b;if(h)c.set(e.subarray(32768,c.length));else for(a=0,b=c.length;b>a;++a)c[a]=e[a+32768];if(this.g.push(c),this.k+=c.length,h)e.set(e.subarray(d,d+32768));else for(a=0;32768>a;++a)e[a]=e[d+a];return this.a=32768,e},c.prototype.v=function(a){var b,c,d,e,f=this.input.length/this.d+1|0,g=this.input,i=this.b;return a&&("number"==typeof a.o&&(f=a.o),"number"==typeof a.r&&(f+=a.r)),2>f?(c=(g.length-this.d)/this.n[2],e=258*(c/2)|0,d=e<i.length?i.length+e:i.length<<1):d=i.length*f,h?(b=new Uint8Array(d),b.set(i)):b=i,this.b=b},c.prototype.m=function(){var a,b,c,d,e,f=0,g=this.b,i=this.g,j=new(h?Uint8Array:Array)(this.k+(this.a-32768));if(0===i.length)return h?this.b.subarray(32768,this.a):this.b.slice(32768,this.a);for(b=0,c=i.length;c>b;++b)for(a=i[b],d=0,e=a.length;e>d;++d)j[f++]=a[d];for(b=32768,c=this.a;c>b;++b)j[f++]=g[b];return this.g=[],this.buffer=j},c.prototype.s=function(){var a,b=this.a;return h?this.q?(a=new Uint8Array(b),a.set(this.b.subarray(0,b))):a=this.b.subarray(0,b):(this.b.length>b&&(this.b.length=b),a=this.b),this.buffer=a},a("Zlib.RawInflate",c),a("Zlib.RawInflate.prototype.decompress",c.prototype.u);var C,D,E,F,G={ADAPTIVE:j,BLOCK:i};if(Object.keys)C=Object.keys(G);else for(D in C=[],E=0,G)C[E++]=D;for(E=0,F=C.length;F>E;++E)D=C[E],a("Zlib.RawInflate.BufferType."+D,G[D])}).call(this)},{}]},{},[7])(7)});


var ttHelperCampaignListStrToArr = $j.jStorage.get("ttHelperCampaignsList");
if ($j("#ttCampList").length==0){
	$j('body').append("<div id='jqUIDialCampList' title='Select Campaings from the list. Type any part of the campaign name. Case insensitive!'><input type='text' title='Campaing List' id='ttCampList' style='width: 690px' /></div>");
}

$j("#jqUIDialCampList").dialog({
  autoOpen: false,
  modal: true,
  width: 'auto',
  buttons: {
	 "Search": function() {
		if (ttHelperCampaignListStrToArr.length>0){
			$j("#jqUIDialAPICampSearchAll").dialog("open");
			$j('button:contains("Cancel search")').hide();
			$j("#jqUIDialCampList").dialog("close");   
		}else{
			alert("Please get an updated Campaigns List, by pressing the 'Update Campaign list' button");
			return false;
		}
	},
	 "Camp. Reports": function() {
		if ($j('#ttCampList').val()!=""){
			ttCurSelCampID = $j('#ttCampList').val().slice( $j('#ttCampList').val().lastIndexOf("[") + 1,  $j('#ttCampList').val().lastIndexOf("]")).replace(/\s/g,"");
			window.location.href=location.protocol+"//"+location.host+"/admin/analytics/reports/campaignDetailedSummary.do?campaignDescriptionId="+ ttCurSelCampID +"&action=show";
			$j("#jqUIDialCampList").dialog("close");
		}else{
			alert("Please select a campaign");
		}
		
	},
	"Camp. Edit": function() {
		if ($j('#ttCampList').val()!=""){
			ttCurSelCampID = $j('#ttCampList').val().slice( $j('#ttCampList').val().lastIndexOf("[") + 1,  $j('#ttCampList').val().lastIndexOf("]")).replace(/\s/g,"");
			window.location.href=location.protocol+"//"+location.host+"/admin/campaign/campaign_edit_forward.jsp?campaignId=" + ttCurSelCampID;
			$j("#jqUIDialCampList").dialog("close");
		}else{
			alert("Please select a campaign");
		}
		
	},
    "Backup": function() {
        $j.jStorage.set("ttHelperCampaignsList","");
        $j("#jqUIDialAPIListGenBackup").dialog("open");
        $j("#jqUIDialCampList").dialog("close");
    },
    "Update Campaign list": function() {
		$j.jStorage.set("ttHelperCampaignsList","");
		$j("#jqUIDialAPIListGen").dialog("open");
		$j("#jqUIDialCampList").dialog("close");
	},
	"Close": function() {
		$j("#jqUIDialCampList").dialog("close");
	}
  },
  open: function(event, ui) {
	$j('#ttCampList').val("");
  }
});

if ($j("#jqUIDialAPICampSearchAll").length==0){
	$j('body').append(
	'<div id="jqUIDialAPICampSearchAll" title="Search Through Campaigns Data (using Adobe\'s API)">'
		+'<div style="margin-top: 10px;">'
			+'<p style="margin-top: 10px;">Specify different filters for the search and then press the "Search campaigns" for API calls to be made to Adobe <br />for each campaign in the (pre-saved locally) campaigns list. It\'s a good idea to <a href="#update" id="jqUIDialAPICampSearchAllUpdate" style="outline: none;">update</a> campaign list first.</p>'
			+'<form id="jqUIDialAPICampSearchAllForm">'
				+'<div style="clear: both; float: left; font-weight: bold; margin-top: 10px;">Simple search (campaign name/id):</div>'
				+'<label for="jqUIDialAPICampSearchAllForm_CampName" class="o" style="clear: both; float: left; font-weight: bold;">Campaign Name: <input type="text" id="jqUIDialAPICampSearchAllForm_CampName" name="jqUIDialAPICampSearchAllForm_CampName" placeholder="" /></label>'
				+'<label for="jqUIDialAPICampSearchAllForm_CampID" class="e"> Campaign ID: <input type="text" id="jqUIDialAPICampSearchAllForm_CampID" name="jqUIDialAPICampSearchAllForm_CampID" placeholder="" /></label>'
				+'<div style="clear: both; float: left; font-weight: bold; margin-top: 10px;">'
					+'<p style="margin-bottom: 10px;"><b>OR</b></p>'
					+'Advanced search (any part of the location/experience/offer name, target value or offer id):'
				+'</div>'
				+'<label for="jqUIDialAPICampSearchAllForm_LocationName" class="o" style="clear: both; float: left; color: #8F00FF; font-weight: bold;">* Location Name: <input type="text" id="jqUIDialAPICampSearchAllForm_LocationName" name="jqUIDialAPICampSearchAllForm_LocationName" placeholder="eg: Global_Mbox" style="margin-left: 17px; width: 170px;" /></label>'
				+'<label for="jqUIDialAPICampSearchAllForm_LocationTargetValue" class="e" style="color: #8F00FF;"> Location Target Value: <input type="text" id="jqUIDialAPICampSearchAllForm_LocationTargetValue" name="jqUIDialAPICampSearchAllForm_LocationTargetValue" placeholder="eg: /P1242557947640" style="margin-left: 16px;"/></label>'
				+'<label for="jqUIDialAPICampSearchAllForm_ExperienceName" class="o" style="clear: both; float: left; color: #4EA200;font-weight: bold;">* Experience Name: <input type="text" id="jqUIDialAPICampSearchAllForm_ExperienceName" name="jqUIDialAPICampSearchAllForm_ExperienceName" placeholder="eg: Experience A" style="width: 170px;" /></label>'
				+'<label for="jqUIDialAPICampSearchAllForm_ExperienceTargetValue" class="e" style="color: #4EA200;"> Experience Target Value: <input type="text" id="jqUIDialAPICampSearchAllForm_ExperienceTargetValue" name="jqUIDialAPICampSearchAllForm_ExperienceTargetValue" placeholder="ttqa value or user-agent" /></label>'
				+'<label for="jqUIDialAPICampSearchAllForm_OfferName" class="o" style="clear: both; float: left; color: #3EA1CB; width: 413px;font-weight: bold;">* Offer Name: <input type="text" id="jqUIDialAPICampSearchAllForm_OfferName" name="jqUIDialAPICampSearchAllForm_OfferName" placeholder="eg: Pers_AccList_Chevron" style="width: 170px; margin-left: 41px;"/></label>'
				+'<label for="jqUIDialAPICampSearchAllForm_OfferID" class="o" style="clear: none; float: left; color: #3EA1CB;">Offer ID: <input type="text" id="jqUIDialAPICampSearchAllForm_OfferID" name="jqUIDialAPICampSearchAllForm_OfferID" placeholder="eg: 24870" style="width: 140px;" /></label>'
				+'<div style="clear: both;margin-top: 20px;float: left;font-weight: bold;border-top: 1px solid #CCC;width: 100%;padding-top: 10px;">Applies to both Simple and Advanced search:</div>'
				+'<input type="checkbox" checked="checked" id="jqUIDialAPICampSearchAllForm_ApprovedOnly" name="jqUIDialAPICampSearchAllForm_ApprovedOnly" style="clear: both; float: left; margin-top: 13px;"/><label for="jqUIDialAPICampSearchAllForm_ApprovedOnly" class="e" style="clear: none; float: left; color: #000; font-weight: bold;">Approved Only <span style="font-size: 9px;">(unselect to search Saved/Unapproved too; note that Deactivated are always excluded)</span></label>'
				+'<div style="height: 1px;border-bottom: 1px solid #CCC;float: left;clear: both;width: 100%;margin-top: 5px;"></div>'				
			+'</form>'
			+'<p style="margin-top: 10px; clear: left; float: left; font-size: 11px;">All coloured lines of filters are <b>independent groups of filters</b>, and the results from each group will be <b>added</b> to the global result. <br />Each matched campaign will be listed only once, and coloured based on the first matching filter.<br /><span style="color: #3EA1CB;">If offer naming conventions have been followed, you can search for DR number, as part of the offer name.</span></p>'
			+'<div id="jqUIDialAPICampSearchAllLoaderIco" style="display: none; float: right; position: relative; top: 40px; right: 0;"><img src="https://t-and-t-tool.googlecode.com/svn/trunk/bs_ajax_loader.gif" /></div>'
			+'<div id="jqUIDialAPICampSearchAllStatus" style="margin-top: 10px; display: none; clear: both; float: left;"></div>'
			+'<div id="jqUIDialAPICampSearchAllProgressBar" style="padding-top: 10px; display: none; float: none; clear: both; width: 690px; height: 20px;"></div>'			
			+'<div id="jqUIDialAPICampSearchAllResultHead" style="margin-top: 20px; margin-bottom: 10px; display: none; font-weight: bold; clear: both; float: left;">Campaigns found (<span class="numb">0</span>) <a href="#" id="ttHidCampAllowEdit">:</a> </div>'			
			+'<div id="jqUIDialAPICampSearchAllResult" style="display: none; overflow: auto; height: 100px; width: 100%;margin-top: 10px; display: none;"></div>'
		+'</div>'
	+'</div>'
	);
	/*
	$j('#jqUIDialAPICampSearchAllForm_CampName').click(function(){$j('#jqUIDialAPICampSearchAllForm_CampID').val("")});
	$j('#jqUIDialAPICampSearchAllForm_CampName').keypress(function(){$j('#jqUIDialAPICampSearchAllForm_CampID').val("")});
	$j('#jqUIDialAPICampSearchAllForm_CampID').click(function(){$j('#jqUIDialAPICampSearchAllForm_CampName').val("")});
	$j('#jqUIDialAPICampSearchAllForm_CampID').keypress(function(){$j('#jqUIDialAPICampSearchAllForm_CampName').val("")});
	*/
	$j('#ttHidCampAllowEdit').click(function(){
		$j('#jqUIDialAPICampSearchAllResult').attr('contenteditable','true');
	});
	
	$j('#jqUIDialAPICampSearchAllUpdate').click(function(){
		$j("#jqUIDialAPICampSearchAll").dialog("close");
		$j("#jqUIDialAPIListGen").dialog("open");
	});
	
	$j("#jqUIDialAPICampSearchAllProgressBar").progressbar({
      value: false
    });
}

$j("#jqUIDialAPICampSearchAll").dialog({
  autoOpen: false,
  modal: true,
  width: 'auto',
  height:'auto',
  position: 'center',
  buttons: {
  "Cancel search": function(){
		ttCampSearchStopAjaxLoop = true;		
		$j('#jqUIDialAPICampSearchAllLoaderIco').hide();
		$j('#jqUIDialAPICampSearchAllStatus').hide();
		$j('#jqUIDialAPICampSearchAllProgressBar').hide();
		if (parseInt($j('#jqUIDialAPICampSearchAllResultHead .numb').text())==0){
			$j('#jqUIDialAPICampSearchAllResult').hide();
		}
	},		   
	"Search campaigns": function() {	
		if ($j.jStorage.get("ttHelperCampaignsListAPIUser") && $j.jStorage.get("ttHelperCampaignsListAPIPass")) {			
			//nothing here
		}else{
			var ttCListAPIUserConf = prompt("No API User has been stored, please provide");
			if (ttCListAPIUserConf){
				$j.jStorage.set("ttHelperCampaignsListAPIUser",ttCListAPIUserConf);
			}
			var ttCListAPIPassConf = prompt("No API Pass has been stored, please provide");
			if (ttCListAPIPassConf){
				$j.jStorage.set("ttHelperCampaignsListAPIPass",ttCListAPIPassConf);
			}
			
		}
		//reset count
		$j('#jqUIDialAPICampSearchAllResultHead .numb').html(0);
		$j('button:contains("Cancel search")').show();

		
		if ($j.jStorage.get("ttHelperCampaignsListAPIUser") && $j.jStorage.get("ttHelperCampaignsListAPIPass") && $j.jStorage.get("ttHelperCampaignsList")) {			

			var ttHelperCampaignListArr=new Array(),
				elmtch="", elmtchCID=0, ajaxArrIdx = 0, elmtchTitle="", elmtchState="", elmtchExtData = {}, elmtchOffTitle="";
			ttHelperCampaignListArr = $j.jStorage.get("ttHelperCampaignsList");
			//Loop through all campaigns
			$j('#jqUIDialAPICampSearchAllResult').html("");
			
			ttHelperCampaignListArr.sort(); //alpha sort
			
			ttCampSearchStopAjaxLoop = false;
			
			//Simple Search
			//loop through locally saved
			if (($j('#jqUIDialAPICampSearchAllForm_CampName').val().toLowerCase()!="") || ($j('#jqUIDialAPICampSearchAllForm_CampID').val().toLowerCase()!="")){ //match on campaign name/id
				$j('#jqUIDialAPICampSearchAllLoaderIco').show();
				$j('#jqUIDialAPICampSearchAllStatus').show();
				
				ttHelperCampaignListArr.each(function(el){
					elmtch = el.match(/\d+/g);
					elmtchCID = parseInt(elmtch[elmtch.length-1]);
					elmtchTitle="", elmtchState="", elmtchExtData = {}, elmtchOffTitle="";
	
					$j('#jqUIDialAPICampSearchAllResultHead').show();
					$j('#jqUIDialAPICampSearchAllResult').show();
					
					
					//Skip if Saved/Unapproved
					if (($j('#jqUIDialAPICampSearchAllForm_ApprovedOnly').is(':checked') && $j.jStorage.get("ttHelperCampaignsListExtData")[elmtchCID] && $j.jStorage.get("ttHelperCampaignsListExtData")[elmtchCID].cmpState=="approved") || !$j('#jqUIDialAPICampSearchAllForm_ApprovedOnly').is(':checked')){
						
						if ($j('#jqUIDialAPICampSearchAllForm_CampName').val().toLowerCase()!="" || $j('#jqUIDialAPICampSearchAllForm_CampID').val().toLowerCase()!=""){
							
							if ($j('#jqUIDialAPICampSearchAllForm_CampName').val().toLowerCase()!="" && el.toLowerCase().indexOf($j('#jqUIDialAPICampSearchAllForm_CampName').val().toLowerCase())!=-1){
								if ($j('#jqUIDialAPICampSearchAllResult').text().indexOf("[ "+elmtchCID+" ]")==-1){
									if($j.jStorage.get("ttHelperCampaignsListExtData")[elmtchCID]){
										elmtchExtData = $j.jStorage.get("ttHelperCampaignsListExtData")[elmtchCID];
										elmtchTitle = "State: " + elmtchExtData.cmpState 
																+ " | Enabled: " + elmtchExtData.cmpEnabled
																+ " | Start Date: " + elmtchExtData.cmpStartDate
																+ " | End Date: " + elmtchExtData.cmpEndDate;
										if (elmtchExtData.cmpState=="approved"){
											elmtchState = "<span style=\"display: inline-block; color: #507609; font-weight: bold;\">[AP]&nbsp;</span>";
										}else if (elmtchExtData.cmpState=="saved"){
											elmtchState = "<span style=\"display: inline-block; color: #E07804; font-weight: bold;\">[SV]&nbsp;</span>";
										}else{
											elmtchState="";
										}
									}
									if($j.jStorage.get("ttHelperCampaignsListExtData")[elmtchCID].cmpOfferNamesString){
										elmtchOffTitle = " <a href=\""+location.protocol+"//"+location.host+"/admin/campaign/campaign_edit_forward.jsp?campaignId=" + elmtchCID+"\" title=\""+$j.jStorage.get("ttHelperCampaignsListExtData")[elmtchCID].cmpOfferNamesString.replace(/#offsep#/g,", \n")+"\" style=\"font-weight: bold; font-size: 11px; color: #E370E1;\">[Offers]</a>";
									}
									
									$j('#jqUIDialAPICampSearchAllResult').append("<a href='"+location.protocol+"//"+location.host+"/admin/campaign/campaign_edit_forward.jsp?campaignId=" + elmtchCID+"' title=\"" + elmtchTitle + "\"  target=\"_new\" style=\"font-weight: bold; font-size: 11px;\" class=\"ttSRLink\">"+elmtchState+el+"</a>" +elmtchOffTitle+ "<br />");
									$j('#jqUIDialAPICampSearchAllResultHead .numb').html(parseInt($j('#jqUIDialAPICampSearchAllResultHead .numb').text())+1);
									
									$j('#jqUIDialAPICampSearchAllResult a.ttSRLink:last').focus();
								}							
							}
							
							if ($j('#jqUIDialAPICampSearchAllForm_CampID').val().toLowerCase()!="" && elmtchCID.toString().indexOf($j('#jqUIDialAPICampSearchAllForm_CampID').val().toLowerCase())!=-1){
								if ($j('#jqUIDialAPICampSearchAllResult').text().indexOf("[ "+elmtchCID+" ]")==-1){
									if($j.jStorage.get("ttHelperCampaignsListExtData")[elmtchCID]){
										elmtchExtData = $j.jStorage.get("ttHelperCampaignsListExtData")[elmtchCID];
										elmtchTitle = "State: " + elmtchExtData.cmpState 
																+ " | Enabled: " + elmtchExtData.cmpEnabled
																+ " | Start Date: " + elmtchExtData.cmpStartDate
																+ " | End Date: " + elmtchExtData.cmpEndDate;
										if (elmtchExtData.cmpState=="approved"){
											elmtchState = "<span style=\"display: inline-block; color: #507609; font-weight: bold;\">[AP]&nbsp;</span>";
										}else if (elmtchExtData.cmpState=="saved"){
											elmtchState = "<span style=\"display: inline-block; color: #E07804; font-weight: bold;\">[SV]&nbsp;</span>";
										}else{
											elmtchState="";
										}
									}
									if($j.jStorage.get("ttHelperCampaignsListExtData")[elmtchCID].cmpOfferNamesString){
	elmtchOffTitle = " <a href=\""+location.protocol+"//"+location.host+"/admin/campaign/campaign_edit_forward.jsp?campaignId=" + elmtchCID+"\" title=\""+$j.jStorage.get("ttHelperCampaignsListExtData")[elmtchCID].cmpOfferNamesString.replace(/#offsep#/g,", \n")+"\" style=\"font-weight: bold; font-size: 11px; color: #E370E1;\">[Offers]</a>";
}
									$j('#jqUIDialAPICampSearchAllResult').append("<a href='"+location.protocol+"//"+location.host+"/admin/campaign/campaign_edit_forward.jsp?campaignId=" + elmtchCID+"' title=\"" + elmtchTitle + "\"  target=\"_new\" style=\"font-size: 11px;\" class=\"ttSRLink\">"+elmtchState+el+"</a>" + "<br />");
									$j('#jqUIDialAPICampSearchAllResultHead .numb').html(parseInt($j('#jqUIDialAPICampSearchAllResultHead .numb').text())+1);
									$j('#jqUIDialAPICampSearchAllResult a.ttSRLink:last').focus();
								}							
							}
							
							
						}
					
					
					}
				
				});
				$j('#jqUIDialAPICampSearchAllLoaderIco').hide();
				$j('#jqUIDialAPICampSearchAllStatus').hide();
				$j('#jqUIDialAPICampSearchAllProgressBar').hide();
				$j('button:contains("Cancel search")').hide();
			
			}else{
				//Reset ttHelperCampaignsListExtData, as it will be filled again by the below API calls
				//$j.jStorage.set("ttHelperCampaignsListExtData",""); // we'll update only in Get campaigns dialog
				
				//Advanced Search
				//ajax get on all from the locally saved					
				function ttHelperCampaignListArrSearch(){
					if (ajaxArrIdx < ttHelperCampaignListArr.length){
						var ttCurCampaign = ttHelperCampaignListArr[ajaxArrIdx++],
							el=ttCurCampaign,
							elmtch = el.match(/\d+/g);
							elmtchCID = parseInt(elmtch[elmtch.length-1]);
							elmtchTitle="", elmtchState="", elmtchExtData = {}, elmtchOffTitle="";
							$j('#jqUIDialAPICampSearchAllResultHead').show();
							$j('#jqUIDialAPICampSearchAllResult').show();

						$j.ajax({
							url: 'https://admin7.testandtarget.omniture.com/admin/api?client=barclaysbankplc&email='+$j.jStorage.get("ttHelperCampaignsListAPIUser")+'&password='+$j.jStorage.get("ttHelperCampaignsListAPIPass")+'&operation=viewCampaign&id='+elmtchCID+'&version=1',
							cache:false,
							//timeout:18000,
							xhrFields: {
								withCredentials: true
							},
							beforeSend: function(){
								if (ttCampSearchStopAjaxLoop==true){return false;}
								$j('#jqUIDialAPICampSearchAllLoaderIco').show();
								$j('#jqUIDialAPICampSearchAllStatus').html('<b>Currently processing: ('+ajaxArrIdx+'/'+ ttHelperCampaignListArr.length+')</b><p style="font-size: 10px; color: #007eb6;">' + el + '</p>').show();
								//Set progress bar
								$j("#jqUIDialAPICampSearchAllProgressBar").progressbar( "option", {
								  value: ajaxArrIdx,
								  max: ttHelperCampaignListArr.length
								});
								$j("#jqUIDialAPICampSearchAllProgressBar").find(".ui-progressbar-value").css({"background": '#3EA1CB'});
								$j("#jqUIDialAPICampSearchAllProgressBar").show();
							},
							success:function(data){
								//handle response
								
								var xmlDoc = data,
								$xml = $j(xmlDoc),
								$cmpID = $xml.find("id:first").text(), //Campaign ID,
								$cmpName = $xml.find("name:first").text(), //Campaign Name
								$cmpState = $xml.find("state:first").text(), //Campaign State
								$cmpEnabled = $xml.find("enabled:first").text(), //Campaign Enabled
								$cmpStartDate = $xml.find("startDate:first").text(), //Campaign startDate
								$cmpEndDate = $xml.find("endDate:first").text(), //Campaign endDate
								$locations = $xml.find("displayLocations location"), //Locations
								$experiences = $xml.find("branches branch"); //Experiences
								$offers = $xml.find("branches branch offers offerManaged"); //Offers
								
								//Check campaign state, and save in local data, so we can have info on saved/approved
								// we'll update only in Get campaigns dialog
								/*
								var ttHelperCampaignsListExtDataArr = $j.jStorage.get("ttHelperCampaignsListExtData"),
									ttHelperCampaignsListExtDataArrVal = {cmpID: $cmpID, cmpName: $cmpName, cmpState: $cmpState, cmpEnabled: $cmpEnabled, cmpStartDate: $cmpStartDate, cmpEndDate: $cmpEndDate};
								if (typeof ttHelperCampaignsListExtDataArr === "undefined" || ttHelperCampaignsListExtDataArr==""){
									ttHelperCampaignsListExtDataArr = new Array;
								}
								ttHelperCampaignsListExtDataArr[parseInt($cmpID)] = ttHelperCampaignsListExtDataArrVal;
								$j.jStorage.set("ttHelperCampaignsListExtData",ttHelperCampaignsListExtDataArr); 
								*/
								
								//Skip if Saved/Unapproved
								if (($j('#jqUIDialAPICampSearchAllForm_ApprovedOnly').is(':checked') && $cmpState == "approved") || !$j('#jqUIDialAPICampSearchAllForm_ApprovedOnly').is(':checked')){
									//Loop through Locations		
									if ($j('#jqUIDialAPICampSearchAllForm_LocationName').val()!="" || $j('#jqUIDialAPICampSearchAllForm_LocationTargetValue').val()!=""){
										$locations.each(function() {
											
											var i = $xml.find("displayLocations location").index(this);
											//Location name match
											if ($j('#jqUIDialAPICampSearchAllForm_LocationName').val()!="" && $j(this).find("targetExpression targetMbox name").text().toLowerCase().indexOf($j('#jqUIDialAPICampSearchAllForm_LocationName').val().toLowerCase())!=-1){ 
												if ($j('#jqUIDialAPICampSearchAllResult').text().indexOf("[ "+ parseInt($cmpID)+" ]")==-1){
													if($j.jStorage.get("ttHelperCampaignsListExtData")[elmtchCID]){
														elmtchExtData = $j.jStorage.get("ttHelperCampaignsListExtData")[elmtchCID];
														elmtchTitle = "State: " + elmtchExtData.cmpState 
																				+ " | Enabled: " + elmtchExtData.cmpEnabled
																				+ " | Start Date: " + elmtchExtData.cmpStartDate
																				+ " | End Date: " + elmtchExtData.cmpEndDate;
														if (elmtchExtData.cmpState=="approved"){
															elmtchState = "<span style=\"display: inline-block; color: #507609; font-weight: bold;\">[AP]&nbsp;</span>";
														}else if (elmtchExtData.cmpState=="saved"){
															elmtchState = "<span style=\"display: inline-block; color: #E07804; font-weight: bold;\">[SV]&nbsp;</span>";
														}else{
															elmtchState="";
														}
													}
													if($j.jStorage.get("ttHelperCampaignsListExtData")[elmtchCID].cmpOfferNamesString){
														elmtchOffTitle = " <a href=\""+location.protocol+"//"+location.host+"/admin/campaign/campaign_edit_forward.jsp?campaignId=" + elmtchCID+"\" title=\""+$j.jStorage.get("ttHelperCampaignsListExtData")[elmtchCID].cmpOfferNamesString.replace(/#offsep#/g,", \n")+"\" style=\"font-weight: bold; font-size: 11px; color: #E370E1;\">[Offers]</a>";
													}

													$j('#jqUIDialAPICampSearchAllResult').append("<a href='"+location.protocol+"//"+location.host+"/admin/campaign/campaign_edit_forward.jsp?campaignId=" + parseInt($cmpID)+"' title=\"" + elmtchTitle + "\"  target=\"_new\" style=\"color: #8F00FF; font-weight: bold; font-size: 11px;\" class=\"ttSRLink\">"+elmtchState+el+"</a>" +elmtchOffTitle+ "<br />");
													$j('#jqUIDialAPICampSearchAllResultHead .numb').html(parseInt($j('#jqUIDialAPICampSearchAllResultHead .numb').text())+1);
													$j('#jqUIDialAPICampSearchAllResult a.ttSRLink:last').focus();
												}
											}
											//Location target value match
											if ($j('#jqUIDialAPICampSearchAllForm_LocationTargetValue').val()!="" && $j(this).find("targetExpression targetParameter values").text().toLowerCase().indexOf($j('#jqUIDialAPICampSearchAllForm_LocationTargetValue').val().toLowerCase())!=-1){ 
												if ($j('#jqUIDialAPICampSearchAllResult').text().indexOf("[ "+ parseInt($cmpID)+" ]")==-1){
													if($j.jStorage.get("ttHelperCampaignsListExtData")[elmtchCID]){
														elmtchExtData = $j.jStorage.get("ttHelperCampaignsListExtData")[elmtchCID];
														elmtchTitle = "State: " + elmtchExtData.cmpState 
																				+ " | Enabled: " + elmtchExtData.cmpEnabled
																				+ " | Start Date: " + elmtchExtData.cmpStartDate
																				+ " | End Date: " + elmtchExtData.cmpEndDate;
														if (elmtchExtData.cmpState=="approved"){
															elmtchState = "<span style=\"display: inline-block; color: #507609; font-weight: bold;\">[AP]&nbsp;</span>";
														}else if (elmtchExtData.cmpState=="saved"){
															elmtchState = "<span style=\"display: inline-block; color: #E07804; font-weight: bold;\">[SV]&nbsp;</span>";
														}else{
															elmtchState="";
														}
													}
													if($j.jStorage.get("ttHelperCampaignsListExtData")[elmtchCID].cmpOfferNamesString){
														elmtchOffTitle = " <a href=\""+location.protocol+"//"+location.host+"/admin/campaign/campaign_edit_forward.jsp?campaignId=" + elmtchCID+"\" title=\""+$j.jStorage.get("ttHelperCampaignsListExtData")[elmtchCID].cmpOfferNamesString.replace(/#offsep#/g,", \n")+"\" style=\"font-weight: bold; font-size: 11px; color: #E370E1;\">[Offers]</a>";
													}
													$j('#jqUIDialAPICampSearchAllResult').append("<a href='"+location.protocol+"//"+location.host+"/admin/campaign/campaign_edit_forward.jsp?campaignId=" + parseInt($cmpID)+"' title=\"" + elmtchTitle + "\"  target=\"_new\" style=\"color: #8F00FF; font-size: 11px;\" class=\"ttSRLink\">"+elmtchState+el+"</a>" +elmtchOffTitle+ "<br />");
													$j('#jqUIDialAPICampSearchAllResultHead .numb').html(parseInt($j('#jqUIDialAPICampSearchAllResultHead .numb').text())+1);
													$j('#jqUIDialAPICampSearchAllResult a.ttSRLink:last').focus();
												}
											}
										});	
									}
									
									//Loop through Experiences
									if ($j('#jqUIDialAPICampSearchAllForm_ExperienceName').val()!="" || $j('#jqUIDialAPICampSearchAllForm_ExperienceTargetValue').val()!=""){
										$experiences.each(function() {							
											var i = $xml.find("branches branch").index(this);
											//Experiences name match
											if ($j('#jqUIDialAPICampSearchAllForm_ExperienceName').val()!="" && $j(this).find("name:first").text().toLowerCase().indexOf($j('#jqUIDialAPICampSearchAllForm_ExperienceName').val().toLowerCase())!=-1){ 
												if ($j('#jqUIDialAPICampSearchAllResult').text().indexOf("[ "+ parseInt($cmpID)+" ]")==-1){
													if($j.jStorage.get("ttHelperCampaignsListExtData")[elmtchCID]){
														elmtchExtData = $j.jStorage.get("ttHelperCampaignsListExtData")[elmtchCID];
														elmtchTitle = "State: " + elmtchExtData.cmpState 
																				+ " | Enabled: " + elmtchExtData.cmpEnabled
																				+ " | Start Date: " + elmtchExtData.cmpStartDate
																				+ " | End Date: " + elmtchExtData.cmpEndDate;
														if (elmtchExtData.cmpState=="approved"){
															elmtchState = "<span style=\"display: inline-block; color: #507609; font-weight: bold;\">[AP]&nbsp;</span>";
														}else if (elmtchExtData.cmpState=="saved"){
															elmtchState = "<span style=\"display: inline-block; color: #E07804; font-weight: bold;\">[SV]&nbsp;</span>";
														}else{
															elmtchState="";
														}
													}
													
													if($j.jStorage.get("ttHelperCampaignsListExtData")[elmtchCID].cmpOfferNamesString){
														elmtchOffTitle = " <a href=\""+location.protocol+"//"+location.host+"/admin/campaign/campaign_edit_forward.jsp?campaignId=" + elmtchCID+"\" title=\""+$j.jStorage.get("ttHelperCampaignsListExtData")[elmtchCID].cmpOfferNamesString.replace(/#offsep#/g,", \n")+"\" style=\"font-weight: bold; font-size: 11px; color: #E370E1;\">[Offers]</a>";
													}

													$j('#jqUIDialAPICampSearchAllResult').append("<a href='"+location.protocol+"//"+location.host+"/admin/campaign/campaign_edit_forward.jsp?campaignId=" + parseInt($cmpID)+"' title=\"" + elmtchTitle + "\"  target=\"_new\" style=\"color: #4EA200; font-weight: bold; font-size: 11px;\" class=\"ttSRLink\">"+elmtchState+el+"</a>" +elmtchOffTitle+ "<br />");
													$j('#jqUIDialAPICampSearchAllResultHead .numb').html(parseInt($j('#jqUIDialAPICampSearchAllResultHead .numb').text())+1);
													$j('#jqUIDialAPICampSearchAllResult a.ttSRLink:last').focus();
												}
											}
											//Experiences target value match
											if ($j('#jqUIDialAPICampSearchAllForm_ExperienceTargetValue').val()!="" && $j(this).find("targetExpression targetParameter values").text().toLowerCase().indexOf($j('#jqUIDialAPICampSearchAllForm_ExperienceTargetValue').val().toLowerCase())!=-1){ 
												if ($j('#jqUIDialAPICampSearchAllResult').text().indexOf("[ "+ parseInt($cmpID)+" ]")==-1){
													if($j.jStorage.get("ttHelperCampaignsListExtData")[elmtchCID]){
														elmtchExtData = $j.jStorage.get("ttHelperCampaignsListExtData")[elmtchCID];
														elmtchTitle = "State: " + elmtchExtData.cmpState 
																				+ " | Enabled: " + elmtchExtData.cmpEnabled
																				+ " | Start Date: " + elmtchExtData.cmpStartDate
																				+ " | End Date: " + elmtchExtData.cmpEndDate;
														if (elmtchExtData.cmpState=="approved"){
															elmtchState = "<span style=\"display: inline-block; color: #507609; font-weight: bold;\">[AP]&nbsp;</span>";
														}else if (elmtchExtData.cmpState=="saved"){
															elmtchState = "<span style=\"display: inline-block; color: #E07804; font-weight: bold;\">[SV]&nbsp;</span>";
														}else{
															elmtchState="";
														}
													}
													
													if($j.jStorage.get("ttHelperCampaignsListExtData")[elmtchCID].cmpOfferNamesString){
														elmtchOffTitle = " <a href=\""+location.protocol+"//"+location.host+"/admin/campaign/campaign_edit_forward.jsp?campaignId=" + elmtchCID+"\" title=\""+$j.jStorage.get("ttHelperCampaignsListExtData")[elmtchCID].cmpOfferNamesString.replace(/#offsep#/g,", \n")+"\" style=\"font-weight: bold; font-size: 11px; color: #E370E1;\">[Offers]</a>";
													}

													$j('#jqUIDialAPICampSearchAllResult').append("<a href='"+location.protocol+"//"+location.host+"/admin/campaign/campaign_edit_forward.jsp?campaignId=" + parseInt($cmpID)+"' title=\"" + elmtchTitle + "\"  target=\"_new\" style=\"color: #4EA200; font-size: 11px;\" class=\"ttSRLink\">"+elmtchState+el+"</a>" +elmtchOffTitle+ "<br />");
													$j('#jqUIDialAPICampSearchAllResultHead .numb').html(parseInt($j('#jqUIDialAPICampSearchAllResultHead .numb').text())+1);
													$j('#jqUIDialAPICampSearchAllResult a.ttSRLink:last').focus();
												}
											}
										});	
									}
									
									//Loop through Offers
									if ($j('#jqUIDialAPICampSearchAllForm_OfferName').val()!="" || $j('#jqUIDialAPICampSearchAllForm_OfferID').val()!="" || $j('#jqUIDialAPICampSearchAllForm_OfferContent').val()!="" ){
										$offers.each(function() {							
											var i = $xml.find("branches branch offers offerManaged").index(this);
											//Offer name match
											if ($j('#jqUIDialAPICampSearchAllForm_OfferName').val()!="" && $j(this).find("name:first").text().toLowerCase().indexOf($j('#jqUIDialAPICampSearchAllForm_OfferName').val().toLowerCase())!=-1){ 
												if ($j('#jqUIDialAPICampSearchAllResult').text().indexOf("[ "+ parseInt($cmpID)+" ]")==-1){
													if($j.jStorage.get("ttHelperCampaignsListExtData")[elmtchCID]){
														elmtchExtData = $j.jStorage.get("ttHelperCampaignsListExtData")[elmtchCID];
														elmtchTitle = "State: " + elmtchExtData.cmpState 
																				+ " | Enabled: " + elmtchExtData.cmpEnabled
																				+ " | Start Date: " + elmtchExtData.cmpStartDate
																				+ " | End Date: " + elmtchExtData.cmpEndDate;
														if (elmtchExtData.cmpState=="approved"){
															elmtchState = "<span style=\"display: inline-block; color: #507609; font-weight: bold;\">[AP]&nbsp;</span>";
														}else if (elmtchExtData.cmpState=="saved"){
															elmtchState = "<span style=\"display: inline-block; color: #E07804; font-weight: bold;\">[SV]&nbsp;</span>";
														}else{
															elmtchState="";
														}
													}
													if($j.jStorage.get("ttHelperCampaignsListExtData")[elmtchCID].cmpOfferNamesString){
														elmtchOffTitle = " <a href=\""+location.protocol+"//"+location.host+"/admin/campaign/campaign_edit_forward.jsp?campaignId=" + elmtchCID+"\" title=\""+$j.jStorage.get("ttHelperCampaignsListExtData")[elmtchCID].cmpOfferNamesString.replace(/#offsep#/g,", \n")+"\" style=\"font-weight: bold; font-size: 11px; color: #E370E1;\">[Offers]</a>";
													}
													$j('#jqUIDialAPICampSearchAllResult').append("<a href='"+location.protocol+"//"+location.host+"/admin/campaign/campaign_edit_forward.jsp?campaignId=" + parseInt($cmpID)+"' title=\"" + elmtchTitle + "\"  target=\"_new\" style=\"color: #3EA1CB; font-weight: bold; font-size: 11px;\" class=\"ttSRLink\">"+elmtchState+el+"</a>" +elmtchOffTitle+ "<br />");
													$j('#jqUIDialAPICampSearchAllResultHead .numb').html(parseInt($j('#jqUIDialAPICampSearchAllResultHead .numb').text())+1);
													$j('#jqUIDialAPICampSearchAllResult a.ttSRLink:last').focus();
												}
											}
											//Offer ID match
											if ($j('#jqUIDialAPICampSearchAllForm_OfferID').val()!="" && $j(this).find("id:first").text().toLowerCase().indexOf($j('#jqUIDialAPICampSearchAllForm_OfferID').val().toLowerCase())!=-1){ 
												if ($j('#jqUIDialAPICampSearchAllResult').text().indexOf("[ "+ parseInt($cmpID)+" ]")==-1){
													if($j.jStorage.get("ttHelperCampaignsListExtData")[elmtchCID]){
														elmtchExtData = $j.jStorage.get("ttHelperCampaignsListExtData")[elmtchCID];
														elmtchTitle = "State: " + elmtchExtData.cmpState 
																				+ " | Enabled: " + elmtchExtData.cmpEnabled
																				+ " | Start Date: " + elmtchExtData.cmpStartDate
																				+ " | End Date: " + elmtchExtData.cmpEndDate;
														if (elmtchExtData.cmpState=="approved"){
															elmtchState = "<span style=\"display: inline-block; color: #507609; font-weight: bold;\">[AP]&nbsp;</span>";
														}else if (elmtchExtData.cmpState=="saved"){
															elmtchState = "<span style=\"display: inline-block; color: #E07804; font-weight: bold;\">[SV]&nbsp;</span>";
														}else{
															elmtchState="";
														}
													}
													if($j.jStorage.get("ttHelperCampaignsListExtData")[elmtchCID].cmpOfferNamesString){
														elmtchOffTitle = " <a href=\""+location.protocol+"//"+location.host+"/admin/campaign/campaign_edit_forward.jsp?campaignId=" + elmtchCID+"\" title=\""+$j.jStorage.get("ttHelperCampaignsListExtData")[elmtchCID].cmpOfferNamesString.replace(/#offsep#/g,", \n")+"\" style=\"font-weight: bold; font-size: 11px; color: #E370E1;\">[Offers]</a>";
													}
													$j('#jqUIDialAPICampSearchAllResult').append("<a href='"+location.protocol+"//"+location.host+"/admin/campaign/campaign_edit_forward.jsp?campaignId=" + parseInt($cmpID)+"' title=\"" + elmtchTitle + "\"  target=\"_new\" style=\"color: #3EA1CB; font-size: 11px;\" class=\"ttSRLink\">"+elmtchState+el+"</a>" +elmtchOffTitle+ "<br />");
													$j('#jqUIDialAPICampSearchAllResultHead .numb').html(parseInt($j('#jqUIDialAPICampSearchAllResultHead .numb').text())+1);
													$j('#jqUIDialAPICampSearchAllResult a.ttSRLink:last').focus();
												}
											}								
										});	
									}
								
								}
	
								//move to next iteration (campaign) from the list
								ttHelperCampaignListArrSearch();
							
							}
						});
					}else{ //last one
						$j('#jqUIDialAPICampSearchAllLoaderIco').hide();
						$j('#jqUIDialAPICampSearchAllStatus').hide();
						$j('#jqUIDialAPICampSearchAllProgressBar').hide();
						if (parseInt($j('#jqUIDialAPICampSearchAllResultHead .numb').text())==0){
							$j('#jqUIDialAPICampSearchAllResult').hide();
						}
						$j('button:contains("Cancel search")').hide();
					}
				
				}
				ttHelperCampaignListArrSearch(); //First run			
			}						
		}
		
		
	},	
	"Close": function() {
	  $j("#jqUIDialAPICampSearchAll").dialog("close");
	  $j("#jqUIDialCampList").dialog("open");
	}
  }
});



if ($j("#jqUIDialAPIListGen").length==0){
	$j('body').append(
	'<div id="jqUIDialAPIListGen" title="Getting Campaign List (using Adobe\'s API)">'
		+'<div style="margin-top: 10px;">'
			+'<p style="margin-top: 10px;">Press "Get campaigns" for API call to be made to Adobe and the campaigns list to be pulled. <br /><br />Once that has been done, this dialog will close automatically, and you can use <br />the updated campaign list.</p>'
			+'<p style="margin-top: 10px; font-size: 10px;">If you have incorrect API user/pass saved, you can reset them using this link: <a href="#resetuserPass" id="jqUIDialAPIListGenResetUP">Reset API user/pass</a>. <br /> Next time you use the "Get campaigns" button, you\'ll be prompted to confirm them again. <br />This would also happen if you haven\'t specified API user/pass yet.</p>'
			+'<div id="jqUIDialAPIListGenResetLoaderIco" style="display: none;"><img src="https://t-and-t-tool.googlecode.com/svn/trunk/bs_ajax_loader.gif" /></div>'
		+'<div id="jqUIDialAPICampSearchAllStatusUpd" style="margin-top: 10px; display: none; clear: both; float: left;"></div>'
		+'<div id="jqUIDialAPICampSearchAllProgressBarUpd" style="padding-top: 10px; display: none; float: none; clear: both; width: 560px; height: 20px;"></div>'			
		/*+'<div id="jqUIDialAPICampSearchAllResultHeadUpd" style="margin-top: 20px; margin-bottom: 10px; display: none; font-weight: bold; clear: both; float: left;">Campaigns found (<span class="numb">0</span>)</div>'*/
		+'<div id="jqUIDialAPICampSearchAllResult" style="overflow: auto; height: 100px; width: 100%;margin-top: 10px; display: none;"></div>'
		+'</div>'
	+'</div>');
	$j('#jqUIDialAPIListGenResetUP').click(function(e){
		e.preventDefault();
		$j.jStorage.set("ttHelperCampaignsListAPIUser","");
		$j.jStorage.set("ttHelperCampaignsListAPIPass","");
		return false;
	});	
	$j("#jqUIDialAPICampSearchAllProgressBarUpd").progressbar({
      value: false
    });
}

$j("#jqUIDialAPIListGen").dialog({
  autoOpen: false,
  modal: true,
  width: 'auto',
  buttons: {			   
	"Get campaigns": function() {	
		if ($j.jStorage.get("ttHelperCampaignsListAPIUser") && $j.jStorage.get("ttHelperCampaignsListAPIPass")) {			
			//nothing here
		}else{
			var ttCListAPIUserConf = prompt("No API User has been stored, please provide");
			if (ttCListAPIUserConf){
				$j.jStorage.set("ttHelperCampaignsListAPIUser",ttCListAPIUserConf);
			}
			var ttCListAPIPassConf = prompt("No API Pass has been stored, please provide");
			if (ttCListAPIPassConf){
				$j.jStorage.set("ttHelperCampaignsListAPIPass",ttCListAPIPassConf);
			}
			
		}
		
		if ($j.jStorage.get("ttHelperCampaignsListAPIUser") && $j.jStorage.get("ttHelperCampaignsListAPIPass")) {			
		$j('#jqUIDialAPIListGenResetLoaderIco').show();
			$j.get( 'https://admin7.testandtarget.omniture.com/admin/api?client=barclaysbankplc&email='+$j.jStorage.get("ttHelperCampaignsListAPIUser")+'&password='+$j.jStorage.get("ttHelperCampaignsListAPIPass")+'&operation=campaignList&state=saved,activated&environment=Production&version=1', function( data ) {
				var ttHelperCampaignList=new Array(),
					ttHelperCampaignListValueToPush = {},
					xmlDoc = data,
					$xml = $j(xmlDoc),
					$campaigns = $xml.find("campaign");
				
				$campaigns.each(function() {
					var i = $xml.find("campaign").index(this);
					ttHelperCampaignListValueToPush = $j(this).find("name").text() + " [ " +  $j(this).find("id").text() + " ]";
				
					ttHelperCampaignList.push(ttHelperCampaignListValueToPush);
				});
				$j.jStorage.set("ttHelperCampaignsList",ttHelperCampaignList);
				
				//Reset ttHelperCampaignsListExtData, as it will be filled again by the below API calls
				$j.jStorage.set("ttHelperCampaignsListExtData","");
				var ttHelperCampaignListArr=new Array(),
					elmtch="", elmtchCID=0, ajaxArrIdxUp = 0, elmtchState="", elmtchExtData = {};
				ttHelperCampaignListArr = $j.jStorage.get("ttHelperCampaignsList");
				
				//ajax get on all from the locally saved					
				function ttHelperCampaignListArrSearchUpd(){
					if (ajaxArrIdxUp < ttHelperCampaignListArr.length){
						var ttCurCampaign = ttHelperCampaignListArr[ajaxArrIdxUp++],
							el=ttCurCampaign,
							elmtch = el.match(/\d+/g);
							elmtchCID = parseInt(elmtch[elmtch.length-1]);
							elmtchTitle="", elmtchState="", elmtchExtData = {};
							/*$j('#jqUIDialAPICampSearchAllResultHeadUpd').show();*/
							$j('#jqUIDialAPICampSearchAllResult').show();
				
						$j.ajax({
							url: 'https://admin7.testandtarget.omniture.com/admin/api?client=barclaysbankplc&email='+$j.jStorage.get("ttHelperCampaignsListAPIUser")+'&password='+$j.jStorage.get("ttHelperCampaignsListAPIPass")+'&operation=viewCampaign&id='+elmtchCID+'&version=1',
							cache:false,
							//timeout:18000,
							xhrFields: {
								withCredentials: true
							},
							beforeSend: function(){
								$j('#jqUIDialAPIListGenResetLoaderIco').show();
								$j('#jqUIDialAPICampSearchAllStatusUpd').html('<b>Currently processing: ('+ajaxArrIdxUp+'/'+ ttHelperCampaignListArr.length+')</b><p style="font-size: 10px; color: #007eb6;">' + el + '</p>').show();
								//Set progress bar
								$j("#jqUIDialAPICampSearchAllProgressBarUpd").progressbar( "option", {
								  value: ajaxArrIdxUp,
								  max: ttHelperCampaignListArr.length
								});
								$j("#jqUIDialAPICampSearchAllProgressBarUpd").find(".ui-progressbar-value").css({"background": '#3EA1CB'});
								$j("#jqUIDialAPICampSearchAllProgressBarUpd").show();
							},
							success:function(data){
								//handle response
								
								var xmlDoc = data,
								$xml = $j(xmlDoc),
								$cmpID = $xml.find("id:first").text(), //Campaign ID,
								$cmpName = $xml.find("name:first").text(), //Campaign Name
								$cmpState = $xml.find("state:first").text(), //Campaign State
								$cmpEnabled = $xml.find("enabled:first").text(), //Campaign Enabled
								$cmpStartDate = $xml.find("startDate:first").text(), //Campaign startDate
								$cmpEndDate = $xml.find("endDate:first").text(), //Campaign endDate
								$cmpOfferNames = $xml.find("offerManaged name"), //Offer Managed Names
								$cmpOfferNamesString = '';
								
								//Get list of offers in the current campaign
								$cmpOfferNames.each(function() {
									$cmpOfferNamesString+=$j(this).text()+'#offsep#'; //comma separated value
								})
								
								//Check campaign state, and save in local data, so we can have info on saved/approved
								var ttHelperCampaignsListExtDataArr = $j.jStorage.get("ttHelperCampaignsListExtData"),
									ttHelperCampaignsListExtDataArrVal = {cmpID: $cmpID, cmpName: $cmpName, cmpState: $cmpState, cmpEnabled: $cmpEnabled, cmpStartDate: $cmpStartDate, cmpEndDate: $cmpEndDate, cmpOfferNamesString: $cmpOfferNamesString.substr(0,$cmpOfferNamesString.length-8)};
								if (typeof ttHelperCampaignsListExtDataArr === "undefined" || ttHelperCampaignsListExtDataArr==""){
									ttHelperCampaignsListExtDataArr = new Array;
								}
								ttHelperCampaignsListExtDataArr[parseInt($cmpID)] = ttHelperCampaignsListExtDataArrVal;
								$j.jStorage.set("ttHelperCampaignsListExtData",ttHelperCampaignsListExtDataArr);
								
								/*$j('#jqUIDialAPICampSearchAllResultHeadUpd .numb').html(parseInt($j('#jqUIDialAPICampSearchAllResultHeadUpd .numb').text())+1);*/
								//move to next iteration (campaign) from the list
								ttHelperCampaignListArrSearchUpd();
							
							}
						});
					}else{ //last one
						$j('#jqUIDialAPIListGenResetLoaderIco').hide();
						$j('#jqUIDialAPICampSearchAllStatusUpd').hide();
						$j('#jqUIDialAPICampSearchAllProgressBarUpd').hide();
						/*if (parseInt($j('#jqUIDialAPICampSearchAllResultHeadUpd .numb').text())==0){
							$j('#jqUIDialAPICampSearchAllResultUpd').hide();
						}*/
						
						
						//$j('#jqUIDialAPIListGenResetLoaderIco').hide();
						$j("#jqUIDialAPIListGen").dialog("close");
						ttHelperCampaignListStrToArr = $j.jStorage.get("ttHelperCampaignsList");
						$j("#ttCampList").autocomplete({
							source: ttHelperCampaignListStrToArr,
						}).data( "autocomplete" )._renderItem = function( ul, item ) {
							var elmtch = item.label.match(/\d+/g),
								elmtchCID = parseInt(elmtch[elmtch.length-1]),
								elmtchTitle="", elmtchState="", elmtchExtData = {};
								
							if($j.jStorage.get("ttHelperCampaignsListExtData")[elmtchCID]){
								elmtchExtData = $j.jStorage.get("ttHelperCampaignsListExtData")[elmtchCID];
								elmtchTitle = "State: " + elmtchExtData.cmpState 
														+ " | Enabled: " + elmtchExtData.cmpEnabled
														+ " | Start Date: " + elmtchExtData.cmpStartDate
														+ " | End Date: " + elmtchExtData.cmpEndDate;
								if (elmtchExtData.cmpState=="approved"){
									elmtchState = "<span style=\"display: inline-block; color: #507609; font-weight: bold;\">[AP]&nbsp;</span>";
								}else if (elmtchExtData.cmpState=="saved"){
									elmtchState = "<span style=\"display: inline-block; color: #E07804; font-weight: bold;\">[SV]&nbsp;</span>";
								}else{
									elmtchState="";
								}
							}
							
							return $j( "<li></li>" ).data("item.autocomplete", item)
							.append( "<a title=\""+elmtchTitle+"\">" + elmtchState + item.label + "</a>")
							.appendTo(ul);
						};
						
						
						$j("#jqUIDialCampList").dialog("open");
					}
				
				}
				ttHelperCampaignListArrSearchUpd(); //First run		
				
			});
		}
	},	
	"Close": function() {
	  $j("#jqUIDialAPIListGen").dialog("close");
	}
  }
});


if ($j("#jqUIDialAPIListGenBackup").length==0){
    $j('body').append(
            '<div id="jqUIDialAPIListGenBackup" title="Getting Campaign List (using Adobe\'s API) for Backup">'
            +'<div style="margin-top: 10px;">'
            +'<p style="margin-top: 10px;">Press "Backup campaigns" for API call to be made to Adobe and the campaigns list to be pulled. <br /><br />Once that has been done, this dialog will close automatically.<br/><br/>Each campaign\'s setup will be saved as XML file, as well as human-readable<br/>  campaign summary in a TXT file.</p>'
            +'<p style="margin-top: 10px; font-size: 10px;">If you have incorrect API user/pass saved, you can reset them using this link: <a href="#resetuserPass" id="jqUIDialAPIListGenBackupResetUP">Reset API user/pass</a>. <br /> Next time you use the "Backup campaigns" button, you\'ll be prompted to confirm them again. <br />This would also happen if you haven\'t specified API user/pass yet.</p>'
            +'<div id="jqUIDialAPIListGenBackupResetLoaderIco" style="display: none;"><img src="https://t-and-t-tool.googlecode.com/svn/trunk/bs_ajax_loader.gif" /></div>'
            +'<div id="jqUIDialAPICampSearchAllStatusUpdBackup" style="margin-top: 10px; display: none; clear: both; float: left;"></div>'
            +'<div id="jqUIDialAPICampSearchAllProgressBarUpdBackup" style="padding-top: 10px; display: none; float: none; clear: both; width: 560px; height: 20px;"></div>'
            /*+'<div id="jqUIDialAPICampSearchAllResultHeadUpd" style="margin-top: 20px; margin-bottom: 10px; display: none; font-weight: bold; clear: both; float: left;">Campaigns found (<span class="numb">0</span>)</div>'*/
            /*+'<div id="jqUIDialAPICampSearchAllResultBackup" style="overflow: auto; height: 100px; width: 100%;margin-top: 10px; display: none;"></div>'*/
            +'</div>'
            +'</div>');
    $j('#jqUIDialAPIListGenBackupResetUP').click(function(e){
        e.preventDefault();
        $j.jStorage.set("ttHelperCampaignsListAPIUser","");
        $j.jStorage.set("ttHelperCampaignsListAPIPass","");
        return false;
    });
    $j("#jqUIDialAPICampSearchAllProgressBarUpdBAckup").progressbar({
        value: false
    });
}

$j("#jqUIDialAPIListGenBackup").dialog({
    autoOpen: false,
    modal: true,
    width: 'auto',
    buttons: {
        "Backup campaigns": function() {
            if ($j.jStorage.get("ttHelperCampaignsListAPIUser") && $j.jStorage.get("ttHelperCampaignsListAPIPass")) {
                //nothing here
            }else{
                var ttCListAPIUserConf = prompt("No API User has been stored, please provide");
                if (ttCListAPIUserConf){
                    $j.jStorage.set("ttHelperCampaignsListAPIUser",ttCListAPIUserConf);
                }
                var ttCListAPIPassConf = prompt("No API Pass has been stored, please provide");
                if (ttCListAPIPassConf){
                    $j.jStorage.set("ttHelperCampaignsListAPIPass",ttCListAPIPassConf);
                }

            }

            if ($j.jStorage.get("ttHelperCampaignsListAPIUser") && $j.jStorage.get("ttHelperCampaignsListAPIPass")) {
                $j('#jqUIDialAPIListGenBackupResetLoaderIco').show();
                $j.get( 'https://admin7.testandtarget.omniture.com/admin/api?client=barclaysbankplc&email='+$j.jStorage.get("ttHelperCampaignsListAPIUser")+'&password='+$j.jStorage.get("ttHelperCampaignsListAPIPass")+'&operation=campaignList&state=saved,activated&environment=Production&version=1', function( data ) {
                    var ttHelperCampaignList=new Array(),
                        ttHelperCampaignListValueToPush = {},
                        xmlDoc = data,
                        $xml = $j(xmlDoc),
                        $campaigns = $xml.find("campaign");

                    $campaigns.each(function() {
                        var i = $xml.find("campaign").index(this);
                        ttHelperCampaignListValueToPush = $j(this).find("name").text() + " [ " +  $j(this).find("id").text() + " ]";

                        ttHelperCampaignList.push(ttHelperCampaignListValueToPush);
                    });
                    $j.jStorage.set("ttHelperCampaignsList",ttHelperCampaignList);

                    //Reset ttHelperCampaignsListExtData, as it will be filled again by the below API calls
                    $j.jStorage.set("ttHelperCampaignsListExtData","");

                    //create zip object
                    var ttCampaignsBackupZip = new JSZip();

                    var ttHelperCampaignListArr=new Array(),
                        elmtch="", elmtchCID=0, ajaxArrIdxUp = 0, elmtchState="", elmtchExtData = {};
                    ttHelperCampaignListArr = $j.jStorage.get("ttHelperCampaignsList");

                    //ajax get on all from the locally saved
                    function ttHelperCampaignListArrSearchUpdBackup(){
                        if (ajaxArrIdxUp < ttHelperCampaignListArr.length){
                            var ttCurCampaign = ttHelperCampaignListArr[ajaxArrIdxUp++],
                                el=ttCurCampaign,
                                elmtch = el.match(/\d+/g);
                            elmtchCID = parseInt(elmtch[elmtch.length-1]);
                            elmtchTitle="", elmtchState="", elmtchExtData = {};
                            /*$j('#jqUIDialAPICampSearchAllResultHeadUpd').show();*/
                            /*$j('#jqUIDialAPICampSearchAllResultBackup').show();*/

                            //debug
                            /*
                            if (elmtchCID != "10480"){
                                //move to next iteration (campaign) from the list
                                ttHelperCampaignListArrSearchUpdBackup();
                                return false;
                            }
                            */



                            $j.ajax({
                                url: 'https://admin7.testandtarget.omniture.com/admin/api?client=barclaysbankplc&email='+$j.jStorage.get("ttHelperCampaignsListAPIUser")+'&password='+$j.jStorage.get("ttHelperCampaignsListAPIPass")+'&operation=viewCampaign&id='+elmtchCID+'&version=6',
                                cache:false,
                                dataType: "xml",
                                //timeout:18000,
                                xhrFields: {
                                    withCredentials: true
                                },
                                beforeSend: function(){
                                    $j('#jqUIDialAPIListGenBackupResetLoaderIco').show();
                                    $j('#jqUIDialAPICampSearchAllStatusUpdBackup').html('<b>Currently processing: ('+ajaxArrIdxUp+'/'+ ttHelperCampaignListArr.length+')</b><p style="font-size: 10px; color: #007eb6;">' + el + '</p>').show();
                                    //Set progress bar
                                    $j("#jqUIDialAPICampSearchAllProgressBarUpdBackup").progressbar( "option", {
                                        value: ajaxArrIdxUp,
                                        max: ttHelperCampaignListArr.length
                                    });

                                    /*

                                    if (ajaxArrIdxUp%401==0){
                                        ttCampaignsBackupZipContent = ttCampaignsBackupZip.generate({compression: "DEFLATE"});
                                        location.href="data:application/zip;base64,"+ttCampaignsBackupZipContent;
                                        //start a new Zip every 500 offers - prevents browser from crashing
                                        ttCampaignsBackupZip = new JSZip();
                                    }
                                    */

                                    $j("#jqUIDialAPICampSearchAllProgressBarUpdBackup").find(".ui-progressbar-value").css({"background": '#3EA1CB'});
                                    $j("#jqUIDialAPICampSearchAllProgressBarUpdBackup").show();
                                },
                                success:function(data){
                                    //handle response

                                    var xmlDoc = data,
                                        $xml = $j(xmlDoc),
                                        $xmlAsText = new XMLSerializer().serializeToString($xml[0]),
                                        $cmpID = $xml.find("id:first").text(), //Campaign ID,
                                        $cmpName = $xml.find("name:first").text(), //Campaign Name
                                        $cmpPrior = $xml.find("priority:first").text(), //Campaign Priority
                                        $cmpState = $xml.find("state:first").text(), //Campaign State
                                        $cmpEnabled = $xml.find("enabled:first").text(), //Campaign Enabled
                                        $cmpStartDate = $xml.find("startDate:first").text(), //Campaign startDate
                                        $cmpEndDate = $xml.find("endDate:first").text(), //Campaign endDate
                                        $cmpOfferNames = $xml.find("offerManaged name"), //Offer Managed Names
                                        $cmpOfferNamesString = '',
                                        $cmpEasyDesc = '',
                                        $cmpLevelTarg = '', $cmpLocations = '', $cmpLocationsArr = new Array(),  $cmpExps = '', $cmpExpsTargetArr = new Array(), $cmpExpsOfferArr = new Array(),
                                        $cmpExpsBrName, $cmpExpsBrID, $cmpExpsBrExpr, $cmpExpsBrOffers, $cmpExpsBrTargExp, $cmpExpsBrOffers, $cmpExpsBrOffersDispLoc, $cmpExpsBrOfferName, $cmpExpsBrOfferID;

                                    $cmpLevelTarg = "\r\n\tPercent included: " + $xml.find("entry:first percentIncluded:first").text()
                                        + "\r\n\tMbox targeted: " + $xml.find("entry:first targetExpression:first targetMbox:first name:first").text();

                                    //Get list of campaign target options in the current campaign
                                    $xml.find("entry:first targetExpression:first targetParameter").each(function(i,a) {
                                        $cmpLevelTarg+="\r\n\tTargeting parameters: \r\n\t\ttype: " + $j(this).find('>type').text() + "\r\n\t\tname: " + $j(this).find('>name').text() + "\r\n\t\tmatch: " + $j(this).find('>matcher').text() + "\r\n\t\tvalue(s): ";
                                        $j(this).find('>values').each(function(ii,aa) {
                                            $j(this).find(">string").each(function(iii,aa) {
                                                $cmpLevelTarg+="\r\n\t\t\t" + $j(this).text();
                                            })
                                        })
                                    })

                                    //Get list of campaign target options in the current campaign
                                    $xml.find("displayLocations:first location targetExpression").each(function(i,a) {
                                        $cmpLocations+="\r\n\r\n\tName: " + $j(this).find('>targetMbox >name').text();
                                        $cmpLocationsArr.push($j(this).find('>targetMbox >name').text());

                                        $j(this).find('>targetParameter').each(function(iiiii,aa) {
                                            $cmpLocations+="\r\n\t\tTargeting parameters: \r\n\t\t\ttype: " + $j(this).find('>type').text() + "\r\n\t\t\tname: " + $j(this).find('>name').text() + "\r\n\t\t\tmatch: " + $j(this).find('>matcher').text() + "\r\n\t\t\tvalue(s): ";

                                            $j(this).find('>values').each(function(ii,aa) {
                                                $j(this).find(">string").each(function(iii,aa) {
                                                    $cmpLocations+="\r\n\t\t\t\t" + $j(this).text();
                                                })
                                            })

                                        })
                                    })


                                    //Get list of campaign experiences
                                    $xml.find("branches:first branch").each(function(i,a) {
                                        $cmpExpsBrName =  $j(this).find(">name").text();
                                        $cmpExpsBrID =  $j(this).find(">id").text();
                                        $cmpExpsBrTargExp = '', $cmpExpsBrOffers='';

                                        $cmpExps+= "\r\n\r\n\tName: " + $cmpExpsBrName + "\r\n\tid: " + $cmpExpsBrID;

                                        //Experience targeting
                                        $j(this).find(">targetExpression >targetParameter").each(function(ii,aa) {
                                            $cmpExpsBrTargExp="\r\n\t\tTargeting parameters: \r\n\t\t\ttype: " + $j(this).find('>type').text() + "\r\n\t\t\tname: " + $j(this).find('>name').text() + "\r\n\t\t\tmatch: " + $j(this).find('>matcher').text() + "\r\n\t\t\tvalue(s): ";
                                            $j(this).find('>values').each(function(iii,aa) {
                                                $j(this).find(">string").each(function(iiii,aa) {
                                                    $cmpExpsBrTargExp+="\r\n\t\t\t\t" + $j(this).text();
                                                })
                                            })
                                            $cmpExpsTargetArr.push($cmpExpsBrTargExp);
                                            $cmpExps+=$cmpExpsBrTargExp;
                                        })

                                        $cmpExps+= "\r\n\t\tOffers: ";

                                        //Experience offers
                                        $j(this).find(">offers").each(function(ii,aa) {
                                            //Experience locations
                                            $j(this).find(">displayLocation").each(function(iii,aa) {
                                                $cmpExpsBrOffersDispLoc = $cmpLocationsArr[(parseInt($j(this).attr("location").replace('/campaign/displayLocations/location[','').replace(']',''))-1)];

                                                if ($j(this).find('>offerManaged').length>0) { /* non default offer */
                                                    $cmpExpsBrOfferName = $j(this).find('>offerManaged >name').text();
                                                    $cmpExpsBrOfferID = $j(this).find('>offerManaged >id').text();
                                                }else if ($j(this).find('>offerDefault').length>0){ /* default offer */
                                                    $cmpExpsBrOfferName = "Default";
                                                    $cmpExpsBrOfferID = "n/a";
                                                }else{ /* don't know */
                                                    $cmpExpsBrOfferName = "n/a";
                                                    $cmpExpsBrOfferID = "n/a";
                                                }

                                                $cmpExps+="\r\n\r\n\t\t\tlocation: " + $cmpExpsBrOffersDispLoc + "\r\n\t\t\tname: " + $cmpExpsBrOfferName + "\r\n\t\t\tid: " + $cmpExpsBrOfferID;

                                            })

                                        })

                                    })

                                    //Campaign Conversions & Segments seem too complicated for now... as there are too many possibilities



                                    $cmpEasyDesc = $cmpEasyDesc
                                        + "Campaign name: " + $cmpName
                                        + "\r\n\r\n"
                                        + "Campaign ID: " + $cmpID
                                        + "\r\n\r\n"
                                        + "Campaign priority: " + $cmpPrior
                                        + "\r\n\r\n"
                                        + "Campaign state: " + $cmpState
                                        + "\r\n\r\n"
                                        + "Campaign enabled: " + $cmpEnabled
                                        + "\r\n\r\n"
                                        + "Campaign start date: " + $cmpStartDate
                                        + "\r\n\r\n"
                                        + "Campaign end date: " + $cmpEndDate
                                        + "\r\n\r\n"
                                        + "Campaign level targeting: " + $cmpLevelTarg
                                        + "\r\n\r\n"
                                        + "Campaign locations: " + $cmpLocations
                                        + "\r\n\r\n"
                                        + "Campaign Experiences: " + $cmpExps
                                        + "\r\n\r\n";


                                    //Check campaign state, and save in local data, so we can have info on saved/approved
                                    var ttHelperCampaignsListExtDataArr = $j.jStorage.get("ttHelperCampaignsListExtData"),
                                        ttHelperCampaignsListExtDataArrVal = {cmpID: $cmpID, cmpName: $cmpName, cmpState: $cmpState, cmpEnabled: $cmpEnabled, cmpStartDate: $cmpStartDate, cmpEndDate: $cmpEndDate, cmpOfferNamesString: $cmpOfferNamesString.substr(0,$cmpOfferNamesString.length-8)};
                                    if (typeof ttHelperCampaignsListExtDataArr === "undefined" || ttHelperCampaignsListExtDataArr==""){
                                        ttHelperCampaignsListExtDataArr = new Array;
                                    }
                                    ttHelperCampaignsListExtDataArr[parseInt($cmpID)] = ttHelperCampaignsListExtDataArrVal;
                                    $j.jStorage.set("ttHelperCampaignsListExtData",ttHelperCampaignsListExtDataArr);

                                    /*$j('#jqUIDialAPICampSearchAllResultHeadUpd .numb').html(parseInt($j('#jqUIDialAPICampSearchAllResultHeadUpd .numb').text())+1);*/


                                    var ttBackupCleanCampaignFileName = $cmpName.replace(/\s+/gi, '-').replace(/[^a-zA-Z0-9\-]/gi, ''); // Replace white space with dash & Strip any special character;

                                    ttCampaignsBackupZip.file(ttBackupCleanCampaignFileName+".xml", $xmlAsText);
                                    ttCampaignsBackupZip.file(ttBackupCleanCampaignFileName+".txt", $cmpEasyDesc);

                                    //move to next iteration (campaign) from the list
                                    ttHelperCampaignListArrSearchUpdBackup();

                                }
                            });
                        }else{ //last one
                            $j('#jqUIDialAPIListGenBackupResetLoaderIco').hide();
                            $j('#jqUIDialAPICampSearchAllStatusUpdBackup').hide();
                            $j('#jqUIDialAPICampSearchAllProgressBarUpdBackup').hide();
                            /*if (parseInt($j('#jqUIDialAPICampSearchAllResultHeadUpd .numb').text())==0){
                             $j('#jqUIDialAPICampSearchAllResultUpd').hide();
                             }*/

                            //var ttCampaignsBackupZipContent = ttCampaignsBackupZip.generate({compression: "DEFLATE"});
                            //location.href="data:application/zip;base64,"+ttCampaignsBackupZipContent;
                            var zipDateSt="", zipDateStYY = new Date().getFullYear(), zipDateStMM = (new Date().getMonth()+1) , zipDateStDD=new Date().getDate();
                            if (zipDateStMM<10){zipDateStMM="0"+zipDateStMM};
                            if (zipDateStDD<10){zipDateStDD="0"+zipDateStDD};
                            zipDateSt = zipDateStYY + zipDateStMM + zipDateStDD;

                            var ttCampaignsBackupZipContent = ttCampaignsBackupZip.generate({compression: "DEFLATE", type: "blob"});
                            saveAs(ttCampaignsBackupZipContent, zipDateSt + "_" + ttHelperCampaignListArr.length + "_CampaignsBackup.zip");


                            //$j('#jqUIDialAPIListGenBackupResetLoaderIco').hide();
                            $j("#jqUIDialAPIListGenBackup").dialog("close");
                            ttHelperCampaignListStrToArr = $j.jStorage.get("ttHelperCampaignsList");
                            $j("#ttCampList").autocomplete({
                                source: ttHelperCampaignListStrToArr,
                            }).data( "autocomplete" )._renderItem = function( ul, item ) {
                                var elmtch = item.label.match(/\d+/g),
                                    elmtchCID = parseInt(elmtch[elmtch.length-1]),
                                    elmtchTitle="", elmtchState="", elmtchExtData = {};

                                if($j.jStorage.get("ttHelperCampaignsListExtData")[elmtchCID]){
                                    elmtchExtData = $j.jStorage.get("ttHelperCampaignsListExtData")[elmtchCID];
                                    elmtchTitle = "State: " + elmtchExtData.cmpState
                                        + " | Enabled: " + elmtchExtData.cmpEnabled
                                        + " | Start Date: " + elmtchExtData.cmpStartDate
                                        + " | End Date: " + elmtchExtData.cmpEndDate;
                                    if (elmtchExtData.cmpState=="approved"){
                                        elmtchState = "<span style=\"display: inline-block; color: #507609; font-weight: bold;\">[AP]&nbsp;</span>";
                                    }else if (elmtchExtData.cmpState=="saved"){
                                        elmtchState = "<span style=\"display: inline-block; color: #E07804; font-weight: bold;\">[SV]&nbsp;</span>";
                                    }else{
                                        elmtchState="";
                                    }
                                }

                                return $j( "<li></li>" ).data("item.autocomplete", item)
                                    .append( "<a title=\""+elmtchTitle+"\">" + elmtchState + item.label + "</a>")
                                    .appendTo(ul);
                            };


                            $j("#jqUIDialCampList").dialog("open");
                        }

                    }
                    ttHelperCampaignListArrSearchUpdBackup(); //First run

                });
            }
        },
        "Close": function() {
            $j("#jqUIDialAPIListGenBackup").dialog("close");
        }
    }
});


if (ttHelperCampaignListStrToArr) {
	ttHelperCampaignListStrToArr.sort();

	$j("#jqUIDialCampList").dialog("open");

}else{
	var ttCListConf = confirm("No campaign list has been stored locally. Do you want to generate local list now?");
	if (ttCListConf){
		$j("#jqUIDialAPIListGen").dialog("open");
	}else{
		//no action
	}
}

//jQuery UI
$j(function() {
	if ($j("body").hasClass("ttUIAutoComplete")!=-1){
		$j("body").addClass("ttUIAutoComplete");
		$j("body").addClass("ttCampaignsListMark");
	}
	$j("#ttCampList").autocomplete({
		source: ttHelperCampaignListStrToArr,
	}).data( "autocomplete" )._renderItem = function( ul, item ) {
		var elmtch = item.label.match(/\d+/g),
			elmtchCID = parseInt(elmtch[elmtch.length-1]),
			elmtchTitle="", elmtchState="", elmtchExtData = {}, elmtchOffTitle="";

		if($j.jStorage.get("ttHelperCampaignsListExtData")[elmtchCID]){
			elmtchExtData = $j.jStorage.get("ttHelperCampaignsListExtData")[elmtchCID];
			elmtchTitle = "State: " + elmtchExtData.cmpState
									+ " | Enabled: " + elmtchExtData.cmpEnabled
									+ " | Start Date: " + elmtchExtData.cmpStartDate
									+ " | End Date: " + elmtchExtData.cmpEndDate;
			if (elmtchExtData.cmpState=="approved"){
				elmtchState = "<span style=\"display: inline-block; color: #507609; font-weight: bold;\">[AP]&nbsp;</span>";
			}else if (elmtchExtData.cmpState=="saved"){
				elmtchState = "<span style=\"display: inline-block; color: #E07804; font-weight: bold;\">[SV]&nbsp;</span>";
			}else{
				elmtchState="";
			}
		}

		if($j.jStorage.get("ttHelperCampaignsListExtData")[elmtchCID].cmpOfferNamesString){
			elmtchOffTitle = " <span title=\""+$j.jStorage.get("ttHelperCampaignsListExtData")[elmtchCID].cmpOfferNamesString.replace(/#offsep#/g,", \n")+"\" style=\"font-weight: bold; font-size: 13px; color: #E370E1;\">[Offers]</span>";
		}

		return $j( "<li></li>" ).data("item.autocomplete", item)
		.append( "<a title=\""+elmtchTitle+"\">" + elmtchState + item.label + elmtchOffTitle + "</a>")
		.appendTo(ul);
	};
});