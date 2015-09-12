// ==UserScript==
// @name       Rody WaiGua Programming
// @version    20150613
// @include    http://*.ctb988.com/*  
// @include    http://*.ctb988.net/*  
// @copyright  2014+, CH3CHO <luotingkk@163.com>
// @grant      none
// ==/UserScript==

Array.prototype.contains = function(item){
    return RegExp(item).test(this);
};

if(!Array.indexOf){
    Array.prototype.indexOf = function(obj){              
        for(var i=0; i<this.length; i++){
            if(this[i]==obj){
                return i;
            }
        }
        return -1;
    }
}

Array.prototype.contains = function(obj) {
   var i = this.length;
   while (i--) {
       if (this[i] === obj) {
            return true;
       }
    }
    return false;
}


/* Zepto v1.1.3 - zepto event ajax form ie - zeptojs.com/license */
var Zepto=function(){function L(t){return null==t?String(t):j[T.call(t)]||"object"}function Z(t){return"function"==L(t)}function $(t){return null!=t&&t==t.window}function _(t){return null!=t&&t.nodeType==t.DOCUMENT_NODE}function D(t){return"object"==L(t)}function R(t){return D(t)&&!$(t)&&Object.getPrototypeOf(t)==Object.prototype}function M(t){return"number"==typeof t.length}function k(t){return s.call(t,function(t){return null!=t})}function z(t){return t.length>0?n.fn.concat.apply([],t):t}function F(t){return t.replace(/::/g,"/").replace(/([A-Z]+)([A-Z][a-z])/g,"$1_$2").replace(/([a-z\d])([A-Z])/g,"$1_$2").replace(/_/g,"-").toLowerCase()}function q(t){return t in f?f[t]:f[t]=new RegExp("(^|\\s)"+t+"(\\s|$)")}function H(t,e){return"number"!=typeof e||c[F(t)]?e:e+"px"}function I(t){var e,n;return u[t]||(e=a.createElement(t),a.body.appendChild(e),n=getComputedStyle(e,"").getPropertyValue("display"),e.parentNode.removeChild(e),"none"==n&&(n="block"),u[t]=n),u[t]}function V(t){return"children"in t?o.call(t.children):n.map(t.childNodes,function(t){return 1==t.nodeType?t:void 0})}function U(n,i,r){for(e in i)r&&(R(i[e])||A(i[e]))?(R(i[e])&&!R(n[e])&&(n[e]={}),A(i[e])&&!A(n[e])&&(n[e]=[]),U(n[e],i[e],r)):i[e]!==t&&(n[e]=i[e])}function B(t,e){return null==e?n(t):n(t).filter(e)}function J(t,e,n,i){return Z(e)?e.call(t,n,i):e}function X(t,e,n){null==n?t.removeAttribute(e):t.setAttribute(e,n)}function W(e,n){var i=e.className,r=i&&i.baseVal!==t;return n===t?r?i.baseVal:i:void(r?i.baseVal=n:e.className=n)}function Y(t){var e;try{return t?"true"==t||("false"==t?!1:"null"==t?null:/^0/.test(t)||isNaN(e=Number(t))?/^[\[\{]/.test(t)?n.parseJSON(t):t:e):t}catch(i){return t}}function G(t,e){e(t);for(var n in t.childNodes)G(t.childNodes[n],e)}var t,e,n,i,C,N,r=[],o=r.slice,s=r.filter,a=window.document,u={},f={},c={"column-count":1,columns:1,"font-weight":1,"line-height":1,opacity:1,"z-index":1,zoom:1},l=/^\s*<(\w+|!)[^>]*>/,h=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,p=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,d=/^(?:body|html)$/i,m=/([A-Z])/g,g=["val","css","html","text","data","width","height","offset"],v=["after","prepend","before","append"],y=a.createElement("table"),x=a.createElement("tr"),b={tr:a.createElement("tbody"),tbody:y,thead:y,tfoot:y,td:x,th:x,"*":a.createElement("div")},w=/complete|loaded|interactive/,E=/^[\w-]*$/,j={},T=j.toString,S={},O=a.createElement("div"),P={tabindex:"tabIndex",readonly:"readOnly","for":"htmlFor","class":"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",frameborder:"frameBorder",contenteditable:"contentEditable"},A=Array.isArray||function(t){return t instanceof Array};return S.matches=function(t,e){if(!e||!t||1!==t.nodeType)return!1;var n=t.webkitMatchesSelector||t.mozMatchesSelector||t.oMatchesSelector||t.matchesSelector;if(n)return n.call(t,e);var i,r=t.parentNode,o=!r;return o&&(r=O).appendChild(t),i=~S.qsa(r,e).indexOf(t),o&&O.removeChild(t),i},C=function(t){return t.replace(/-+(.)?/g,function(t,e){return e?e.toUpperCase():""})},N=function(t){return s.call(t,function(e,n){return t.indexOf(e)==n})},S.fragment=function(e,i,r){var s,u,f;return h.test(e)&&(s=n(a.createElement(RegExp.$1))),s||(e.replace&&(e=e.replace(p,"<$1></$2>")),i===t&&(i=l.test(e)&&RegExp.$1),i in b||(i="*"),f=b[i],f.innerHTML=""+e,s=n.each(o.call(f.childNodes),function(){f.removeChild(this)})),R(r)&&(u=n(s),n.each(r,function(t,e){g.indexOf(t)>-1?u[t](e):u.attr(t,e)})),s},S.Z=function(t,e){return t=t||[],t.__proto__=n.fn,t.selector=e||"",t},S.isZ=function(t){return t instanceof S.Z},S.init=function(e,i){var r;if(!e)return S.Z();if("string"==typeof e)if(e=e.trim(),"<"==e[0]&&l.test(e))r=S.fragment(e,RegExp.$1,i),e=null;else{if(i!==t)return n(i).find(e);r=S.qsa(a,e)}else{if(Z(e))return n(a).ready(e);if(S.isZ(e))return e;if(A(e))r=k(e);else if(D(e))r=[e],e=null;else if(l.test(e))r=S.fragment(e.trim(),RegExp.$1,i),e=null;else{if(i!==t)return n(i).find(e);r=S.qsa(a,e)}}return S.Z(r,e)},n=function(t,e){return S.init(t,e)},n.extend=function(t){var e,n=o.call(arguments,1);return"boolean"==typeof t&&(e=t,t=n.shift()),n.forEach(function(n){U(t,n,e)}),t},S.qsa=function(t,e){var n,i="#"==e[0],r=!i&&"."==e[0],s=i||r?e.slice(1):e,a=E.test(s);return _(t)&&a&&i?(n=t.getElementById(s))?[n]:[]:1!==t.nodeType&&9!==t.nodeType?[]:o.call(a&&!i?r?t.getElementsByClassName(s):t.getElementsByTagName(e):t.querySelectorAll(e))},n.contains=function(t,e){return t!==e&&t.contains(e)},n.type=L,n.isFunction=Z,n.isWindow=$,n.isArray=A,n.isPlainObject=R,n.isEmptyObject=function(t){var e;for(e in t)return!1;return!0},n.inArray=function(t,e,n){return r.indexOf.call(e,t,n)},n.camelCase=C,n.trim=function(t){return null==t?"":String.prototype.trim.call(t)},n.uuid=0,n.support={},n.expr={},n.map=function(t,e){var n,r,o,i=[];if(M(t))for(r=0;r<t.length;r++)n=e(t[r],r),null!=n&&i.push(n);else for(o in t)n=e(t[o],o),null!=n&&i.push(n);return z(i)},n.each=function(t,e){var n,i;if(M(t)){for(n=0;n<t.length;n++)if(e.call(t[n],n,t[n])===!1)return t}else for(i in t)if(e.call(t[i],i,t[i])===!1)return t;return t},n.grep=function(t,e){return s.call(t,e)},window.JSON&&(n.parseJSON=JSON.parse),n.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(t,e){j["[object "+e+"]"]=e.toLowerCase()}),n.fn={forEach:r.forEach,reduce:r.reduce,push:r.push,sort:r.sort,indexOf:r.indexOf,concat:r.concat,map:function(t){return n(n.map(this,function(e,n){return t.call(e,n,e)}))},slice:function(){return n(o.apply(this,arguments))},ready:function(t){return w.test(a.readyState)&&a.body?t(n):a.addEventListener("DOMContentLoaded",function(){t(n)},!1),this},get:function(e){return e===t?o.call(this):this[e>=0?e:e+this.length]},toArray:function(){return this.get()},size:function(){return this.length},remove:function(){return this.each(function(){null!=this.parentNode&&this.parentNode.removeChild(this)})},each:function(t){return r.every.call(this,function(e,n){return t.call(e,n,e)!==!1}),this},filter:function(t){return Z(t)?this.not(this.not(t)):n(s.call(this,function(e){return S.matches(e,t)}))},add:function(t,e){return n(N(this.concat(n(t,e))))},is:function(t){return this.length>0&&S.matches(this[0],t)},not:function(e){var i=[];if(Z(e)&&e.call!==t)this.each(function(t){e.call(this,t)||i.push(this)});else{var r="string"==typeof e?this.filter(e):M(e)&&Z(e.item)?o.call(e):n(e);this.forEach(function(t){r.indexOf(t)<0&&i.push(t)})}return n(i)},has:function(t){return this.filter(function(){return D(t)?n.contains(this,t):n(this).find(t).size()})},eq:function(t){return-1===t?this.slice(t):this.slice(t,+t+1)},first:function(){var t=this[0];return t&&!D(t)?t:n(t)},last:function(){var t=this[this.length-1];return t&&!D(t)?t:n(t)},find:function(t){var e,i=this;return e="object"==typeof t?n(t).filter(function(){var t=this;return r.some.call(i,function(e){return n.contains(e,t)})}):1==this.length?n(S.qsa(this[0],t)):this.map(function(){return S.qsa(this,t)})},closest:function(t,e){var i=this[0],r=!1;for("object"==typeof t&&(r=n(t));i&&!(r?r.indexOf(i)>=0:S.matches(i,t));)i=i!==e&&!_(i)&&i.parentNode;return n(i)},parents:function(t){for(var e=[],i=this;i.length>0;)i=n.map(i,function(t){return(t=t.parentNode)&&!_(t)&&e.indexOf(t)<0?(e.push(t),t):void 0});return B(e,t)},parent:function(t){return B(N(this.pluck("parentNode")),t)},children:function(t){return B(this.map(function(){return V(this)}),t)},contents:function(){return this.map(function(){return o.call(this.childNodes)})},siblings:function(t){return B(this.map(function(t,e){return s.call(V(e.parentNode),function(t){return t!==e})}),t)},empty:function(){return this.each(function(){this.innerHTML=""})},pluck:function(t){return n.map(this,function(e){return e[t]})},show:function(){return this.each(function(){"none"==this.style.display&&(this.style.display=""),"none"==getComputedStyle(this,"").getPropertyValue("display")&&(this.style.display=I(this.nodeName))})},replaceWith:function(t){return this.before(t).remove()},wrap:function(t){var e=Z(t);if(this[0]&&!e)var i=n(t).get(0),r=i.parentNode||this.length>1;return this.each(function(o){n(this).wrapAll(e?t.call(this,o):r?i.cloneNode(!0):i)})},wrapAll:function(t){if(this[0]){n(this[0]).before(t=n(t));for(var e;(e=t.children()).length;)t=e.first();n(t).append(this)}return this},wrapInner:function(t){var e=Z(t);return this.each(function(i){var r=n(this),o=r.contents(),s=e?t.call(this,i):t;o.length?o.wrapAll(s):r.append(s)})},unwrap:function(){return this.parent().each(function(){n(this).replaceWith(n(this).children())}),this},clone:function(){return this.map(function(){return this.cloneNode(!0)})},hide:function(){return this.css("display","none")},toggle:function(e){return this.each(function(){var i=n(this);(e===t?"none"==i.css("display"):e)?i.show():i.hide()})},prev:function(t){return n(this.pluck("previousElementSibling")).filter(t||"*")},next:function(t){return n(this.pluck("nextElementSibling")).filter(t||"*")},html:function(t){return 0===arguments.length?this.length>0?this[0].innerHTML:null:this.each(function(e){var i=this.innerHTML;n(this).empty().append(J(this,t,e,i))})},text:function(e){return 0===arguments.length?this.length>0?this[0].textContent:null:this.each(function(){this.textContent=e===t?"":""+e})},attr:function(n,i){var r;return"string"==typeof n&&i===t?0==this.length||1!==this[0].nodeType?t:"value"==n&&"INPUT"==this[0].nodeName?this.val():!(r=this[0].getAttribute(n))&&n in this[0]?this[0][n]:r:this.each(function(t){if(1===this.nodeType)if(D(n))for(e in n)X(this,e,n[e]);else X(this,n,J(this,i,t,this.getAttribute(n)))})},removeAttr:function(t){return this.each(function(){1===this.nodeType&&X(this,t)})},prop:function(e,n){return e=P[e]||e,n===t?this[0]&&this[0][e]:this.each(function(t){this[e]=J(this,n,t,this[e])})},data:function(e,n){var i=this.attr("data-"+e.replace(m,"-$1").toLowerCase(),n);return null!==i?Y(i):t},val:function(t){return 0===arguments.length?this[0]&&(this[0].multiple?n(this[0]).find("option").filter(function(){return this.selected}).pluck("value"):this[0].value):this.each(function(e){this.value=J(this,t,e,this.value)})},offset:function(t){if(t)return this.each(function(e){var i=n(this),r=J(this,t,e,i.offset()),o=i.offsetParent().offset(),s={top:r.top-o.top,left:r.left-o.left};"static"==i.css("position")&&(s.position="relative"),i.css(s)});if(0==this.length)return null;var e=this[0].getBoundingClientRect();return{left:e.left+window.pageXOffset,top:e.top+window.pageYOffset,width:Math.round(e.width),height:Math.round(e.height)}},css:function(t,i){if(arguments.length<2){var r=this[0],o=getComputedStyle(r,"");if(!r)return;if("string"==typeof t)return r.style[C(t)]||o.getPropertyValue(t);if(A(t)){var s={};return n.each(A(t)?t:[t],function(t,e){s[e]=r.style[C(e)]||o.getPropertyValue(e)}),s}}var a="";if("string"==L(t))i||0===i?a=F(t)+":"+H(t,i):this.each(function(){this.style.removeProperty(F(t))});else for(e in t)t[e]||0===t[e]?a+=F(e)+":"+H(e,t[e])+";":this.each(function(){this.style.removeProperty(F(e))});return this.each(function(){this.style.cssText+=";"+a})},index:function(t){return t?this.indexOf(n(t)[0]):this.parent().children().indexOf(this[0])},hasClass:function(t){return t?r.some.call(this,function(t){return this.test(W(t))},q(t)):!1},addClass:function(t){return t?this.each(function(e){i=[];var r=W(this),o=J(this,t,e,r);o.split(/\s+/g).forEach(function(t){n(this).hasClass(t)||i.push(t)},this),i.length&&W(this,r+(r?" ":"")+i.join(" "))}):this},removeClass:function(e){return this.each(function(n){return e===t?W(this,""):(i=W(this),J(this,e,n,i).split(/\s+/g).forEach(function(t){i=i.replace(q(t)," ")}),void W(this,i.trim()))})},toggleClass:function(e,i){return e?this.each(function(r){var o=n(this),s=J(this,e,r,W(this));s.split(/\s+/g).forEach(function(e){(i===t?!o.hasClass(e):i)?o.addClass(e):o.removeClass(e)})}):this},scrollTop:function(e){if(this.length){var n="scrollTop"in this[0];return e===t?n?this[0].scrollTop:this[0].pageYOffset:this.each(n?function(){this.scrollTop=e}:function(){this.scrollTo(this.scrollX,e)})}},scrollLeft:function(e){if(this.length){var n="scrollLeft"in this[0];return e===t?n?this[0].scrollLeft:this[0].pageXOffset:this.each(n?function(){this.scrollLeft=e}:function(){this.scrollTo(e,this.scrollY)})}},position:function(){if(this.length){var t=this[0],e=this.offsetParent(),i=this.offset(),r=d.test(e[0].nodeName)?{top:0,left:0}:e.offset();return i.top-=parseFloat(n(t).css("margin-top"))||0,i.left-=parseFloat(n(t).css("margin-left"))||0,r.top+=parseFloat(n(e[0]).css("border-top-width"))||0,r.left+=parseFloat(n(e[0]).css("border-left-width"))||0,{top:i.top-r.top,left:i.left-r.left}}},offsetParent:function(){return this.map(function(){for(var t=this.offsetParent||a.body;t&&!d.test(t.nodeName)&&"static"==n(t).css("position");)t=t.offsetParent;return t})}},n.fn.detach=n.fn.remove,["width","height"].forEach(function(e){var i=e.replace(/./,function(t){return t[0].toUpperCase()});n.fn[e]=function(r){var o,s=this[0];return r===t?$(s)?s["inner"+i]:_(s)?s.documentElement["scroll"+i]:(o=this.offset())&&o[e]:this.each(function(t){s=n(this),s.css(e,J(this,r,t,s[e]()))})}}),v.forEach(function(t,e){var i=e%2;n.fn[t]=function(){var t,o,r=n.map(arguments,function(e){return t=L(e),"object"==t||"array"==t||null==e?e:S.fragment(e)}),s=this.length>1;return r.length<1?this:this.each(function(t,a){o=i?a:a.parentNode,a=0==e?a.nextSibling:1==e?a.firstChild:2==e?a:null,r.forEach(function(t){if(s)t=t.cloneNode(!0);else if(!o)return n(t).remove();G(o.insertBefore(t,a),function(t){null==t.nodeName||"SCRIPT"!==t.nodeName.toUpperCase()||t.type&&"text/javascript"!==t.type||t.src||window.eval.call(window,t.innerHTML)})})})},n.fn[i?t+"To":"insert"+(e?"Before":"After")]=function(e){return n(e)[t](this),this}}),S.Z.prototype=n.fn,S.uniq=N,S.deserializeValue=Y,n.zepto=S,n}();window.Zepto=Zepto,void 0===window.$&&(window.$=Zepto),function(t){function l(t){return t._zid||(t._zid=e++)}function h(t,e,n,i){if(e=p(e),e.ns)var r=d(e.ns);return(s[l(t)]||[]).filter(function(t){return!(!t||e.e&&t.e!=e.e||e.ns&&!r.test(t.ns)||n&&l(t.fn)!==l(n)||i&&t.sel!=i)})}function p(t){var e=(""+t).split(".");return{e:e[0],ns:e.slice(1).sort().join(" ")}}function d(t){return new RegExp("(?:^| )"+t.replace(" "," .* ?")+"(?: |$)")}function m(t,e){return t.del&&!u&&t.e in f||!!e}function g(t){return c[t]||u&&f[t]||t}function v(e,i,r,o,a,u,f){var h=l(e),d=s[h]||(s[h]=[]);i.split(/\s/).forEach(function(i){if("ready"==i)return t(document).ready(r);var s=p(i);s.fn=r,s.sel=a,s.e in c&&(r=function(e){var n=e.relatedTarget;return!n||n!==this&&!t.contains(this,n)?s.fn.apply(this,arguments):void 0}),s.del=u;var l=u||r;s.proxy=function(t){if(t=j(t),!t.isImmediatePropagationStopped()){t.data=o;var i=l.apply(e,t._args==n?[t]:[t].concat(t._args));return i===!1&&(t.preventDefault(),t.stopPropagation()),i}},s.i=d.length,d.push(s),"addEventListener"in e&&e.addEventListener(g(s.e),s.proxy,m(s,f))})}function y(t,e,n,i,r){var o=l(t);(e||"").split(/\s/).forEach(function(e){h(t,e,n,i).forEach(function(e){delete s[o][e.i],"removeEventListener"in t&&t.removeEventListener(g(e.e),e.proxy,m(e,r))})})}function j(e,i){return(i||!e.isDefaultPrevented)&&(i||(i=e),t.each(E,function(t,n){var r=i[t];e[t]=function(){return this[n]=x,r&&r.apply(i,arguments)},e[n]=b}),(i.defaultPrevented!==n?i.defaultPrevented:"returnValue"in i?i.returnValue===!1:i.getPreventDefault&&i.getPreventDefault())&&(e.isDefaultPrevented=x)),e}function T(t){var e,i={originalEvent:t};for(e in t)w.test(e)||t[e]===n||(i[e]=t[e]);return j(i,t)}var n,e=1,i=Array.prototype.slice,r=t.isFunction,o=function(t){return"string"==typeof t},s={},a={},u="onfocusin"in window,f={focus:"focusin",blur:"focusout"},c={mouseenter:"mouseover",mouseleave:"mouseout"};a.click=a.mousedown=a.mouseup=a.mousemove="MouseEvents",t.event={add:v,remove:y},t.proxy=function(e,n){if(r(e)){var i=function(){return e.apply(n,arguments)};return i._zid=l(e),i}if(o(n))return t.proxy(e[n],e);throw new TypeError("expected function")},t.fn.bind=function(t,e,n){return this.on(t,e,n)},t.fn.unbind=function(t,e){return this.off(t,e)},t.fn.one=function(t,e,n,i){return this.on(t,e,n,i,1)};var x=function(){return!0},b=function(){return!1},w=/^([A-Z]|returnValue$|layer[XY]$)/,E={preventDefault:"isDefaultPrevented",stopImmediatePropagation:"isImmediatePropagationStopped",stopPropagation:"isPropagationStopped"};t.fn.delegate=function(t,e,n){return this.on(e,t,n)},t.fn.undelegate=function(t,e,n){return this.off(e,t,n)},t.fn.live=function(e,n){return t(document.body).delegate(this.selector,e,n),this},t.fn.die=function(e,n){return t(document.body).undelegate(this.selector,e,n),this},t.fn.on=function(e,s,a,u,f){var c,l,h=this;return e&&!o(e)?(t.each(e,function(t,e){h.on(t,s,a,e,f)}),h):(o(s)||r(u)||u===!1||(u=a,a=s,s=n),(r(a)||a===!1)&&(u=a,a=n),u===!1&&(u=b),h.each(function(n,r){f&&(c=function(t){return y(r,t.type,u),u.apply(this,arguments)}),s&&(l=function(e){var n,o=t(e.target).closest(s,r).get(0);return o&&o!==r?(n=t.extend(T(e),{currentTarget:o,liveFired:r}),(c||u).apply(o,[n].concat(i.call(arguments,1)))):void 0}),v(r,e,u,a,s,l||c)}))},t.fn.off=function(e,i,s){var a=this;return e&&!o(e)?(t.each(e,function(t,e){a.off(t,i,e)}),a):(o(i)||r(s)||s===!1||(s=i,i=n),s===!1&&(s=b),a.each(function(){y(this,e,s,i)}))},t.fn.trigger=function(e,n){return e=o(e)||t.isPlainObject(e)?t.Event(e):j(e),e._args=n,this.each(function(){"dispatchEvent"in this?this.dispatchEvent(e):t(this).triggerHandler(e,n)})},t.fn.triggerHandler=function(e,n){var i,r;return this.each(function(s,a){i=T(o(e)?t.Event(e):e),i._args=n,i.target=a,t.each(h(a,e.type||e),function(t,e){return r=e.proxy(i),i.isImmediatePropagationStopped()?!1:void 0})}),r},"focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select keydown keypress keyup error".split(" ").forEach(function(e){t.fn[e]=function(t){return t?this.bind(e,t):this.trigger(e)}}),["focus","blur"].forEach(function(e){t.fn[e]=function(t){return t?this.bind(e,t):this.each(function(){try{this[e]()}catch(t){}}),this}}),t.Event=function(t,e){o(t)||(e=t,t=e.type);var n=document.createEvent(a[t]||"Events"),i=!0;if(e)for(var r in e)"bubbles"==r?i=!!e[r]:n[r]=e[r];return n.initEvent(t,i,!0),j(n)}}(Zepto),function(t){function l(e,n,i){var r=t.Event(n);return t(e).trigger(r,i),!r.isDefaultPrevented()}function h(t,e,i,r){return t.global?l(e||n,i,r):void 0}function p(e){e.global&&0===t.active++&&h(e,null,"ajaxStart")}function d(e){e.global&&!--t.active&&h(e,null,"ajaxStop")}function m(t,e){var n=e.context;return e.beforeSend.call(n,t,e)===!1||h(e,n,"ajaxBeforeSend",[t,e])===!1?!1:void h(e,n,"ajaxSend",[t,e])}function g(t,e,n,i){var r=n.context,o="success";n.success.call(r,t,o,e),i&&i.resolveWith(r,[t,o,e]),h(n,r,"ajaxSuccess",[e,n,t]),y(o,e,n)}function v(t,e,n,i,r){var o=i.context;i.error.call(o,n,e,t),r&&r.rejectWith(o,[n,e,t]),h(i,o,"ajaxError",[n,i,t||e]),y(e,n,i)}function y(t,e,n){var i=n.context;n.complete.call(i,e,t),h(n,i,"ajaxComplete",[e,n]),d(n)}function x(){}function b(t){return t&&(t=t.split(";",2)[0]),t&&(t==f?"html":t==u?"json":s.test(t)?"script":a.test(t)&&"xml")||"text"}function w(t,e){return""==e?t:(t+"&"+e).replace(/[&?]{1,2}/,"?")}function E(e){e.processData&&e.data&&"string"!=t.type(e.data)&&(e.data=t.param(e.data,e.traditional)),!e.data||e.type&&"GET"!=e.type.toUpperCase()||(e.url=w(e.url,e.data),e.data=void 0)}function j(e,n,i,r){return t.isFunction(n)&&(r=i,i=n,n=void 0),t.isFunction(i)||(r=i,i=void 0),{url:e,data:n,success:i,dataType:r}}function S(e,n,i,r){var o,s=t.isArray(n),a=t.isPlainObject(n);t.each(n,function(n,u){o=t.type(u),r&&(n=i?r:r+"["+(a||"object"==o||"array"==o?n:"")+"]"),!r&&s?e.add(u.name,u.value):"array"==o||!i&&"object"==o?S(e,u,i,n):e.add(n,u)})}var i,r,e=0,n=window.document,o=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,s=/^(?:text|application)\/javascript/i,a=/^(?:text|application)\/xml/i,u="application/json",f="text/html",c=/^\s*$/;t.active=0,t.ajaxJSONP=function(i,r){if(!("type"in i))return t.ajax(i);var f,h,o=i.jsonpCallback,s=(t.isFunction(o)?o():o)||"jsonp"+ ++e,a=n.createElement("script"),u=window[s],c=function(e){t(a).triggerHandler("error",e||"abort")},l={abort:c};return r&&r.promise(l),t(a).on("load error",function(e,n){clearTimeout(h),t(a).off().remove(),"error"!=e.type&&f?g(f[0],l,i,r):v(null,n||"error",l,i,r),window[s]=u,f&&t.isFunction(u)&&u(f[0]),u=f=void 0}),m(l,i)===!1?(c("abort"),l):(window[s]=function(){f=arguments},a.src=i.url.replace(/\?(.+)=\?/,"?$1="+s),n.head.appendChild(a),i.timeout>0&&(h=setTimeout(function(){c("timeout")},i.timeout)),l)},t.ajaxSettings={type:"GET",beforeSend:x,success:x,error:x,complete:x,context:null,global:!0,xhr:function(){return new window.XMLHttpRequest},accepts:{script:"text/javascript, application/javascript, application/x-javascript",json:u,xml:"application/xml, text/xml",html:f,text:"text/plain"},crossDomain:!1,timeout:0,processData:!0,cache:!0},t.ajax=function(e){var n=t.extend({},e||{}),o=t.Deferred&&t.Deferred();for(i in t.ajaxSettings)void 0===n[i]&&(n[i]=t.ajaxSettings[i]);p(n),n.crossDomain||(n.crossDomain=/^([\w-]+:)?\/\/([^\/]+)/.test(n.url)&&RegExp.$2!=window.location.host),n.url||(n.url=window.location.toString()),E(n),n.cache===!1&&(n.url=w(n.url,"_="+Date.now()));var s=n.dataType,a=/\?.+=\?/.test(n.url);if("jsonp"==s||a)return a||(n.url=w(n.url,n.jsonp?n.jsonp+"=?":n.jsonp===!1?"":"callback=?")),t.ajaxJSONP(n,o);var j,u=n.accepts[s],f={},l=function(t,e){f[t.toLowerCase()]=[t,e]},h=/^([\w-]+:)\/\//.test(n.url)?RegExp.$1:window.location.protocol,d=n.xhr(),y=d.setRequestHeader;if(o&&o.promise(d),n.crossDomain||l("X-Requested-With","XMLHttpRequest"),l("Accept",u||"*/*"),(u=n.mimeType||u)&&(u.indexOf(",")>-1&&(u=u.split(",",2)[0]),d.overrideMimeType&&d.overrideMimeType(u)),(n.contentType||n.contentType!==!1&&n.data&&"GET"!=n.type.toUpperCase())&&l("Content-Type",n.contentType||"application/x-www-form-urlencoded"),n.headers)for(r in n.headers)l(r,n.headers[r]);if(d.setRequestHeader=l,d.onreadystatechange=function(){if(4==d.readyState){d.onreadystatechange=x,clearTimeout(j);var e,i=!1;if(d.status>=200&&d.status<300||304==d.status||0==d.status&&"file:"==h){s=s||b(n.mimeType||d.getResponseHeader("content-type")),e=d.responseText;try{"script"==s?(1,eval)(e):"xml"==s?e=d.responseXML:"json"==s&&(e=c.test(e)?null:t.parseJSON(e))}catch(r){i=r}i?v(i,"parsererror",d,n,o):g(e,d,n,o)}else v(d.statusText||null,d.status?"error":"abort",d,n,o)}},m(d,n)===!1)return d.abort(),v(null,"abort",d,n,o),d;if(n.xhrFields)for(r in n.xhrFields)d[r]=n.xhrFields[r];var T="async"in n?n.async:!0;d.open(n.type,n.url,T,n.username,n.password);for(r in f)y.apply(d,f[r]);return n.timeout>0&&(j=setTimeout(function(){d.onreadystatechange=x,d.abort(),v(null,"timeout",d,n,o)},n.timeout)),d.send(n.data?n.data:null),d},t.get=function(){return t.ajax(j.apply(null,arguments))},t.post=function(){var e=j.apply(null,arguments);return e.type="POST",t.ajax(e)},t.getJSON=function(){var e=j.apply(null,arguments);return e.dataType="json",t.ajax(e)},t.fn.load=function(e,n,i){if(!this.length)return this;var a,r=this,s=e.split(/\s/),u=j(e,n,i),f=u.success;return s.length>1&&(u.url=s[0],a=s[1]),u.success=function(e){r.html(a?t("<div>").html(e.replace(o,"")).find(a):e),f&&f.apply(r,arguments)},t.ajax(u),this};var T=encodeURIComponent;t.param=function(t,e){var n=[];return n.add=function(t,e){this.push(T(t)+"="+T(e))},S(n,t,e),n.join("&").replace(/%20/g,"+")}}(Zepto),function(t){t.fn.serializeArray=function(){var n,e=[];return t([].slice.call(this.get(0).elements)).each(function(){n=t(this);var i=n.attr("type");"fieldset"!=this.nodeName.toLowerCase()&&!this.disabled&&"submit"!=i&&"reset"!=i&&"button"!=i&&("radio"!=i&&"checkbox"!=i||this.checked)&&e.push({name:n.attr("name"),value:n.val()})}),e},t.fn.serialize=function(){var t=[];return this.serializeArray().forEach(function(e){t.push(encodeURIComponent(e.name)+"="+encodeURIComponent(e.value))}),t.join("&")},t.fn.submit=function(e){if(e)this.bind("submit",e);else if(this.length){var n=t.Event("submit");this.eq(0).trigger(n),n.isDefaultPrevented()||this.get(0).submit()}return this}}(Zepto),function(t){"__proto__"in{}||t.extend(t.zepto,{Z:function(e,n){return e=e||[],t.extend(e,t.fn),e.selector=n||"",e.__Z=!0,e},isZ:function(e){return"array"===t.type(e)&&"__Z"in e}});try{getComputedStyle(void 0)}catch(e){var n=getComputedStyle;window.getComputedStyle=function(t){try{return n(t)}catch(e){return null}}}}(Zepto);

ContentScript={
	txn_mode_check_item:new Array('WPB','WPE','WB','WE','PB','PE','FCB','FCE','PFTB','PFTE','QB','QE','QPB','QPE','DEmr','DBmr'),  
	Hadtxn_mode_check_item:new Array('WPB','WPE','WB','WE','PB','PE','FCB','FCE','PFTB','PFTE','QB','QE','QPB','QPE'), 
	WPTypeCheck_Item : new Array('WPB','WPE','WB','WE','PB','PE'), 
	urlX: "http://"+window.location.host,
	needAjaxCount:[],
	timerCheckCJCount:null, 
	timerCheckGJCount:null,
	StaticAllData:[],
	AlertMsg:"请输入密码",
	AlertPassToLater:"软件过期",
	PassError:"密码错误",
	StaticOldAllData:[],
	SinglePath:false,
	StaticCountShowData:[],
	StaticOldCountShowData:[],
	HelloKitty:"81dc9bdb52d04dc20036dbd8313ed055",
	HelloKittyTime:["212112eece862ca4a3da112f217288fb","519edc8db508d1c088f793f2c3647e6f"],
	DaoQiTime:"2015-08-31",
	PageConfig:{
		Discount:80,
		LimitStart:$("#LimitStart").val(),
		LimitEnd:$("#LimitEnd").val(),
		Percent: 1,
		EatBetType:$("input[name='EatBetType']:checked").val(),
		KW:$("#KongWei").val(),
		LimitWhere1:$("#LimitWhere1").val(),
		LimitWhere2:$("#LimitWhere2").val(),
		EatDiscount:$("#EatDiscount").val(),
		BetDiscount:$("#EatDiscount").val()
	},
	showCountWithWhere:function(){
		ContentScript.StaticOldCountShowData = ContentScript.StaticCountShowData;
		ContentScript.StaticCountShowData = ContentScript.GetAllHadTransactionData();
		if(JSON.stringify(ContentScript.StaticOldCountShowData) != JSON.stringify(ContentScript.StaticCountShowData)){
			ContentScript.showCountPageEatAndBet();
		}			
	},
	getQPPLData:function(x,y){
		try{
			var len =0;
			if(parseInt(x)>7 && parseInt(y)>8){
				len = 13*(y-8)+(x-7);
			}else{
				len = 13*(x-1)+(y-1);
			}
			var result = $($("#frmTOTE2").find("td")[len-1]).text();
			if(result=="" || result == "SCR" || isNaN(result)){
				return 0;
			}
			return parseFloat(result);
		}catch(e){
			return 0;
		}
	},
	getQPLData:function(x,y){
		try{
			var len =0;
			if(parseInt(x)>7 && parseInt(y)>8){
				len = 13*(y-8)+(x-7);
			}else{
				len = 13*(x-1)+(y-1);
			}
			var result = $($("#frmTOTE").find("td")[len-1]).text();
			if(result=="" || result == "SCR" || isNaN(result)){
				return 0;
			}
			return parseFloat(result);
		}catch(e){
			return 0;
		}
	},
	getWPPLDataList:function(){
		var result = {};
		$($("#tttbl td").find(".style22")).each(function(index){
			var item = {};
			item.pl1 = parseFloat($(this).parent().prev().text());
			item.pl2 = parseFloat($(this).parent().next().text());
			item.cc =  $(this).text();
			result.push(item);
		});
		return result;
	},
	setLimitAndDiscount:function(){
		var withType = $("input[name='orderType']:checked").val();
		if("WP" == withType){
			$("#LimitStart")val(300);
			$("#LimitEnd")val(0);
		}
		if("QP" == withType){
			$("#LimitStart")val(400);
			$("#LimitEnd")val(400);
		}
		if("Q" == withType){
			$("#LimitStart")val(700);
			$("#LimitEnd")val(700);
		}
	},
	showCountPageEatAndBet:function(){
			var CheckType = [];
			var withType = $("input[name='orderType']:checked").val();
			var eat =0;
			var bet =0;
			var betIds =[];
			var eatIds =[];
			if("WP" == withType){
				CheckType = ['WPB','WPE','WB','WE','PB','PE']
			}
			if("QP" == withType){
				CheckType = ['FCB','FCE','PFTB','PFTE','QB','QE','QPB','QPE'] 
			}
			if("Q" == withType){
				CheckType = ['FCB','FCE','QB','QE']
			}
			
			$(ContentScript.StaticCountShowData).each(function(i){
				if(CheckType.contains($(this)[0].type)){
					if($(this)[0].type.indexOf("B")>=0 && !betIds.contains($(this)[0].id)){
						bet++;
						betIds.push($(this)[0].id);
					}
					if($(this)[0].type.indexOf("E")>=0 && !eatIds.contains($(this)[0].id)){
						eat++;
						eatIds.push($(this)[0].id);
					}
				}
			})
			$("#eatCount").text(eat);
			$("#betCount").text(bet);
		
	},
	GetAllEatTransactionData:function(){
		var result = [] ;
		var allData = ContentScript.GetAllTransactionData();
		$(allData).each(function(i){
			if($(this)[0].type.indexOf("E")>=0){
				result.push($(this)[0]);
			} 
		});
		return result;
	},
	GetAllBetTransactionData:function(){
		var result = [] ;
		var allData = ContentScript.GetAllTransactionData();
		$(allData).each(function(i){
			if($(this)[0].type.indexOf("B")>=0){
				result.push($(this)[0]);
			}
		});
		return result;
	},
	GetAllDBmrTransactionData:function(){
		var result = [] ;
		var allData = ContentScript.GetAllTransactionData();
		$(allData).each(function(i){
			if($(this)[0].type.indexOf("DBmr")>=0){
				var item = $(this)[0];
				if($(this)[0].t.indexOf("/")>0){
					item.type = "WPB";
				}
				if($(this)[0].fb.indexOf("-")>0){
					item.type = "QB";
				}
				result.push(item);
			}
		});
		return result;
	},
	GetAllDEmrTransactionData:function(){
		var result = [] ;
		var allData = ContentScript.GetAllTransactionData();
		$(allData).each(function(i){
			if($(this)[0].type.indexOf("DEmr")>=0){
				var item = $(this)[0];
				if($(this)[0].t.indexOf("/")>0){
					item.type = "WPE";
				}
				if($(this)[0].fb.indexOf("-")>0){
					item.type = "QE";
				}
				result.push(item);
			}
		});
		return result;
	},
	Request:function(paras){ 
        var url = location.href; 
        var paraString = url.substring(url.indexOf("?")+1,url.length).split("&"); 
        var paraObj = {} 
        for (i=0; j=paraString[i]; i++){ 
        	paraObj[j.substring(0,j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=")+1,j.length); 
        } 
        var returnValue = paraObj[paras.toLowerCase()]; 
        if(typeof(returnValue)=="undefined"){ 
        	return ""; 
        }else{ 
        	return returnValue; 
        } 
    },
	GetSignInInfo:function(){
			var url= window.location.href;
			var siteType = ""
			if(url.indexOf("ctb988.com")>=0){
				siteType = "com";
			}else{
				siteType = "net"
			}
			var urlValue = window.location.pathname;
			var paramList = window.location.search.split("?")[1];
			var RaceType = $("input[name='race_type']").val();
			var RaceDate = $("input[name='race_date']").val();
			var Sml = "s";
			var loginuser = $.trim($("#username").text());
			var result = {"id":siteType+urlValue+RaceType+RaceDate+loginuser,"url":urlValue,"loginuser":loginuser,"RaceType":RaceType,"RaceDate":RaceDate,"Sml":Sml,"SiteType":siteType};
			return result;
	},
	onInit:function(){
		var host =window.location.href;
		if(host.indexOf("playerhk.jsp")>=0 || host.indexOf("Q.jsp")>=0){
			ContentScript.allOnitEvent();
		}
	},
	PrecentChangeEvent:function(){
		$("#Percent").bind("change",function(){
			if($("#Percent").val() == 1 || $("#Percent").val()=="1" ){
				$("#btnBanlance").show();
			}else{
				$("#btnBanlance").hide();
			}
			ContentScript.PageConfig.Percent =$("#Percent").val();
		});
	},
	ComputeSubmitData:function(){
		var eatBetType = ContentScript.PageConfig.EatBetType;
		if(eatBetType == "Eat"){
			var eatData = ContentScript.GetAllEatTransactionData();
		}
		if(eatBetType == "Bet"){
			var betData = ContentScript.GetAllBetTransactionData();
		}
	}
	,allOnitEvent:function(){
		//创建用户界面
						ContentScript.CreateHtmlElement();
						//绑定拖拽事件
						ContentScript.HtmlAddDragEvent();
						$("#daoqitime").text(ContentScript.DaoQiTime);
						
						$("input[name='orderType']").bind("click",function(){
							setLimitAndDiscount();
						});
						$("input[name='EatBetType']").bind("click",function(){
							
						});
						//开始
						$("#btnStart").bind("click",function(){
							
						});
						//结束
						$("#btnEnd").bind("click",function(){
							
						});
	},
	getNeedWithOrderList:function(){
		var withType = $("input[name='orderType']:checked").val();
		var returnBetList = [];
		var returnEatList = [];
		var returnList = [];
		var CheckType = [];
		if(withType.length>0){
			if("WP" == withType){
				CheckType = ['WPB','WPE','WB','WE','PB','PE']
			}
			if("QP" == withType){
				CheckType = ['FCB','FCE','PFTB','PFTE','QB','QE','QPB','QPE'] 
			}
			if("Q" == withType){
				CheckType = ['FCB','FCE','QB','QE']
			}
			
			var allList = ContentScript.GetAllTransactionData();
			var notCommitBetList=[];
			var returnEatList=[];
			
			if("WP" == withType){
				var WPBList =[];
				var WPEList =[];
				var WBList =[];
				var WEList =[];
				var PBList =[];
				var PEList =[];
				$(allList).each(function(index){
					var temp = $(this)[0];
					if($(this)[0].type =="DBmr"){
						//matches rdfb fb x y t 2 4 5 5 78 0/16
						if(parseInt($(this)[0].fb) >0 && parseInt($(this)[0].x)>0){
						   temp.type= "WPB";
						   temp.id = temp.matches + temp.rdfb;
						   temp.fb = parseInt(temp.fb)*(-1);
						   temp.x =  parseInt(temp.x)*(-1);
						   WPBList.push(temp);
						}
						if(parseInt($(this)[0].fb) == 0 && parseInt($(this)[0].x)>0){
						   temp.type= "PB";
						   temp.id = temp.matches + temp.rdfb;
						   temp.fb = parseInt(temp.fb)*(-1);
						   temp.x =  parseInt(temp.x)*(-1);
						   PBList.push(temp);
						}
						if(parseInt($(this)[0].fb) > 0 && parseInt($(this)[0].x) == 0){
							temp.type= "WB";
							temp.id = temp.matches + temp.rdfb;
							temp.fb = parseInt(temp.fb)*(-1);
						   	temp.x =  parseInt(temp.x)*(-1);
						    WBList.push(temp);
						}
					}else{
						if(CheckType.contains($(this)[0].type)){
							var temp = $(this)[0];
							//matches rdfb fb x y t 2 4 5 5 78 0/16
							switch($(this)[0].type){
								case "WPB": {
									temp.id = temp.matches + temp.rdfb;
									temp.fb = parseInt(temp.fb)*(-1);
							   		temp.x =  parseInt(temp.x)*(-1);
									WPBList.push(temp);
									break;
								}
								case "WPE": {
									temp.id = temp.matches + temp.rdfb;
									temp.fb = parseInt(temp.fb)*(1)* parseInt($("#Percent").val());
							   		temp.x =  parseInt(temp.x)*(1)*parseInt($("#Percent").val());
									WPEList.push(temp);
									break;
								}
								case "WB": {
									temp.id = temp.matches + temp.rdfb;
									temp.fb = parseInt(temp.fb)*(-1);
							   		temp.x =  parseInt(temp.x)*(-1);
									WBList.push(temp);
									break;
								}
								case "WE": {
									temp.id = temp.matches + temp.rdfb;
									temp.fb = parseInt(temp.fb)*(1)*parseInt($("#Percent").val());
							   		temp.x =  parseInt(temp.x)*(1)*parseInt($("#Percent").val());
									WEList.push(temp);
									break;
								}
								case "PE": {
									temp.id = temp.matches + temp.rdfb;
									temp.fb = parseInt(temp.fb)*(1)*parseInt($("#Percent").val());
							   		temp.x =  parseInt(temp.x)*(1)*parseInt($("#Percent").val());
									PEList.push(temp);
									break;
								}
								case "PB": {
									temp.id = temp.matches + temp.rdfb;
									temp.fb = parseInt(temp.fb)*(-1);
							   		temp.x =  parseInt(temp.x)*(-1);
									PBList.push(temp);
									break;
									
								}
							}
						}
					}
				});
				  
				var NoRepeatWPBList = [];
				var NoRepeatWBList = [];
				var NoRepeatPBList = [];
				$(WPBList).each(function(index){
					var itw = $(this)[0];
					var hadCount = false;
					$(NoRepeatWPBList).each(function(i){
						if(itw.id==$(this)[0].id){
							$(this)[0].x = parseInt($(this)[0].x)*parseInt($("#Percent").val()) + parseInt(itw.x);
							$(this)[0].fb = parseInt($(this)[0].fb)*parseInt($("#Percent").val()) + parseInt(itw.fb);
							hadCount = true;
						}
					});
					if(!hadCount){
						NoRepeatWPBList.push(WPBList[index]);
					}
				});
				$(PBList).each(function(index){
					var itw = $(this)[0];
					var hadCount = false;
					$(NoRepeatPBList).each(function(i){
						if(itw.id==$(this)[0].id){
							$(this)[0].x = parseInt($(this)[0].x)*parseInt($("#Percent").val()) + parseInt(itw.x);
							$(this)[0].fb = parseInt($(this)[0].fb)*parseInt($("#Percent").val()) + parseInt(itw.fb);
							hadCount = true;
						}
					});
					if(!hadCount){
						NoRepeatPBList.push(PBList[index]);
					}
				});
				$(WBList).each(function(index){
					var itw = $(this)[0];
					var hadCount = false;
					$(NoRepeatWBList).each(function(i){
						if(itw.id==$(this)[0].id){
							$(this)[0].x = parseInt($(this)[0].x)*parseInt($("#Percent").val()) + parseInt(itw.x);
							$(this)[0].fb = parseInt($(this)[0].fb)*parseInt($("#Percent").val()) + parseInt(itw.fb);
							hadCount = true;
						}
					});
					if(!hadCount){
						NoRepeatWBList.push(WBList[index]);
					}
				});
				
				var wpeListid =[];
				var notWPERepterList = [];
				var notWERepterList = [];
				var notPERepterList = []; 
				
				$(WPEList).each(function(index){
					var it = $(this)[0];
					var hadCount = false;
					$(notWPERepterList).each(function(i){
						if(it.id==$(this)[0].id){
							$(this)[0].x = parseInt($(this)[0].x)*parseInt($("#Percent").val()) + parseInt(it.x);
							$(this)[0].fb = parseInt($(this)[0].fb)*parseInt($("#Percent").val()) + parseInt(it.fb);
							hadCount = true;
						}
					});
					if(!hadCount){
						notWPERepterList.push(WPEList[index]);
					}
				});
				
				$(PEList).each(function(index){
					var its = $(this)[0];
					var hadCount = false;
					$(notPERepterList).each(function(i){
						if(its.id==$(this)[0].id){
							$(this)[0].x = parseInt($(this)[0].x)*parseInt($("#Percent").val()) + parseInt(its.x);
							$(this)[0].fb = parseInt($(this)[0].fb)*parseInt($("#Percent").val()) + parseInt(its.fb);
							hadCount = true;
						}
					});
					if(!hadCount){
						notPERepterList.push(PEList[index]);
					}
				});
				
				$(WEList).each(function(index){
					var itw = $(this)[0];
					var hadCount = false;
					$(notWERepterList).each(function(i){
						if(itw.id==$(this)[0].id){
							$(this)[0].x = parseInt($(this)[0].x)*parseInt($("#Percent").val()) + parseInt(itw.x);
							$(this)[0].fb = parseInt($(this)[0].fb)*parseInt($("#Percent").val()) + parseInt(itw.fb);
							hadCount = true;
						}
					});
					if(!hadCount){
						notWERepterList.push(WEList[index]);
					}
				});
				
				$(notWPERepterList).each(function(index){
					var temp = $(this)[0];
					$(NoRepeatWPBList).each(function(i){
						if(temp.id == $(this)[0].id){
							temp.fb = parseInt(temp.fb)  + parseInt($(this)[0].fb);
							temp.x =  parseInt(temp.x)  +  parseInt($(this)[0].x);
						}
					});
					if(temp.fb>0 && temp.x>0){
						returnList.push(temp);
					}
				});
				$(notWERepterList).each(function(index){
					var temp = $(this)[0];
					$(NoRepeatWBList).each(function(i){
						if(temp.id == $(this)[0].id){
							temp.fb = parseInt(temp.fb)  + parseInt($(this)[0].fb);
							temp.x =  parseInt(temp.x)  +  parseInt($(this)[0].x);
						}
					});
					if(temp.fb>0 && temp.x==0){
						returnList.push(temp);
					}
				});
				
				$(notPERepterList).each(function(index){
					var temp = $(this)[0];
					$(NoRepeatPBList).each(function(i){
						if(temp.id == $(this)[0].id){
							temp.fb = parseInt(temp.fb)  + parseInt($(this)[0].fb);
							temp.x =  parseInt(temp.x)  +  parseInt($(this)[0].x);
						}
					});
					if(temp.fb==0 && temp.x>0){
						returnList.push(temp);
					}
				});
				
				$(returnList).each(function(index){
					$(this)[0].type = $(this)[0].type.replace("E","B");
				});
				
				return returnList;
				
			}else{
				$(allList).each(function(index){
					if(CheckType.contains($(this)[0].type)){
						if($(this)[0].type !="DEmr" && $(this)[0].type !="DBmr"){
							if($(this)[0].type.indexOf("E")>=0){
								var it = $(this)[0];
								it.x = parseInt(it.x)*parseInt($("#Percent").val())
								var hadCount = false;
								$(returnEatList).each(function(i){
									if(it.id==$(this)[0].id){
										$(this)[0].x = parseInt($(this)[0].x) + parseInt(it.x);
										hadCount = true;
									}
								});
								if(!hadCount){
									returnEatList.push(it);
								}
							}
							if($(this)[0].type.indexOf("B")>=0){
								var it = $(this)[0];
								var hadCount = false;
								$(returnEatList).each(function(i){
									if(it.id==$(this)[0].id){
										$(this)[0].x = parseInt($(this)[0].x)+ parseInt(it.x)*(-1);
										hadCount = true;
									}
								});
								if(!hadCount){
									allList[index].x = parseInt(allList[index].x)*(-1);
									returnEatList.push(allList[index]);
								}
							}	
						}
					}
					if($(this)[0].type =="DBmr"){
						var it = $(this)[0];
						var hadCount = false;
						$(notCommitBetList).each(function(i){
							if(it.id==$(this)[0].id){
								$(this)[0].x = parseInt($(this)[0].x) + parseInt(it.x);
								hadCount = true;
							}
						});
						if(!hadCount){
							notCommitBetList.push(allList[index]);
						}
					}
				});
			
				$(returnEatList).each(function(i){
					var item = $(this)[0];
					$(notCommitBetList).each(function(){
						if(item.id==$(this)[0].id){
							returnEatList[i].x = item.x-$(this)[0].x
						}
					});
				});
			
				$(returnEatList).each(function(i){
					var item = $(this)[0];
					if(item.x>0){
						returnList.push(item);
					}
				});
			}			
			
			$(returnList).each(function(index){
				$(this)[0].type = $(this)[0].type.replace("E","B");
			});
			return returnList;
		}else{
			return [];
		}
	},
	getNeedPingCangOrderListByMatches:function(match){
		var withType = $("input[name='orderType']:checked").val();
		var returnBetList = [];
		var returnEatList = [];
		var returnList = [];
		var CheckType = [];
		if(withType.length>0){
			if("WP" == withType){
				CheckType = ['WPB','WPE','WB','WE','PB','PE']
			}
			if("QP" == withType){
				CheckType = ['FCB','FCE','PFTB','PFTE','QB','QE','QPB','QPE'] 
			}
			if("Q" == withType){
				CheckType = ['FCB','FCE','QB','QE']
			}
			
			var allList = ContentScript.GetAllHadTransactionDataByMatches(match);
			
			if("WP" == withType){
				var WPBList =[];
				var WPEList =[];
				var WBList =[];
				var WEList =[];
				var PBList =[];
				var PEList =[];
				$(allList).each(function(index){
					var temp = $(this)[0];
					if($(this)[0].type =="DBmr"){
						//matches rdfb fb x y t 2 4 5 5 78 0/16
						if(parseInt($(this)[0].fb) >0 && parseInt($(this)[0].x)>0){
						   temp.type= "WPB";
						   temp.id = temp.matches + temp.rdfb;
						   temp.fb = parseInt(temp.fb)*(-1);
						   temp.x =  parseInt(temp.x)*(-1);
						   WPBList.push(temp);
						}
						if(parseInt($(this)[0].fb) == 0 && parseInt($(this)[0].x)>0){
						   temp.type= "PB";
						   temp.id = temp.matches + temp.rdfb;
						   temp.fb = parseInt(temp.fb)*(-1);
						   temp.x =  parseInt(temp.x)*(-1);
						   PBList.push(temp);
						}
						if(parseInt($(this)[0].fb) > 0 && parseInt($(this)[0].x) == 0){
							temp.type= "WB";
							temp.id = temp.matches + temp.rdfb;
							temp.fb = parseInt(temp.fb)*(-1);
						   	temp.x =  parseInt(temp.x)*(-1);
						    WBList.push(temp);
						}
					}else{
						if(CheckType.contains($(this)[0].type)){
							var temp = $(this)[0];
							//matches rdfb fb x y t 2 4 5 5 78 0/16
							switch($(this)[0].type){
								case "WPB": {
									temp.id = temp.matches + temp.rdfb;
									temp.fb = parseInt(temp.fb)*(-1);
							   		temp.x =  parseInt(temp.x)*(-1);
									WPBList.push(temp);
									break;
								}
								case "WPE": {
									temp.id = temp.matches + temp.rdfb;
									temp.fb = parseInt(temp.fb)*(1)* parseInt($("#Percent").val());
							   		temp.x =  parseInt(temp.x)*(1)*parseInt($("#Percent").val());
									WPEList.push(temp);
									break;
								}
								case "WB": {
									temp.id = temp.matches + temp.rdfb;
									temp.fb = parseInt(temp.fb)*(-1);
							   		temp.x =  parseInt(temp.x)*(-1);
									WBList.push(temp);
									break;
								}
								case "WE": {
									temp.id = temp.matches + temp.rdfb;
									temp.fb = parseInt(temp.fb)*(1)*parseInt($("#Percent").val());
							   		temp.x =  parseInt(temp.x)*(1)*parseInt($("#Percent").val());
									WEList.push(temp);
									break;
								}
								case "PE": {
									temp.id = temp.matches + temp.rdfb;
									temp.fb = parseInt(temp.fb)*(1)*parseInt($("#Percent").val());
							   		temp.x =  parseInt(temp.x)*(1)*parseInt($("#Percent").val());
									PEList.push(temp);
									break;
								}
								case "PB": {
									temp.id = temp.matches + temp.rdfb;
									temp.fb = parseInt(temp.fb)*(-1);
							   		temp.x =  parseInt(temp.x)*(-1);
									PBList.push(temp);
									break;
									
								}
							}
						}
					}
				});
				  
				var NoRepeatWPBList = [];
				var NoRepeatWBList = [];
				var NoRepeatPBList = [];
				$(WPBList).each(function(index){
					var itw = $(this)[0];
					var hadCount = false;
					$(NoRepeatWPBList).each(function(i){
						if(itw.id==$(this)[0].id){
							$(this)[0].x = parseInt($(this)[0].x)*parseInt($("#Percent").val()) + parseInt(itw.x);
							$(this)[0].fb = parseInt($(this)[0].fb)*parseInt($("#Percent").val()) + parseInt(itw.fb);
							hadCount = true;
						}
					});
					if(!hadCount){
						NoRepeatWPBList.push(WPBList[index]);
					}
				});
				$(PBList).each(function(index){
					var itw = $(this)[0];
					var hadCount = false;
					$(NoRepeatPBList).each(function(i){
						if(itw.id==$(this)[0].id){
							$(this)[0].x = parseInt($(this)[0].x)*parseInt($("#Percent").val()) + parseInt(itw.x);
							$(this)[0].fb = parseInt($(this)[0].fb)*parseInt($("#Percent").val()) + parseInt(itw.fb);
							hadCount = true;
						}
					});
					if(!hadCount){
						NoRepeatPBList.push(PBList[index]);
					}
				});
				$(WBList).each(function(index){
					var itw = $(this)[0];
					var hadCount = false;
					$(NoRepeatWBList).each(function(i){
						if(itw.id==$(this)[0].id){
							$(this)[0].x = parseInt($(this)[0].x)*parseInt($("#Percent").val()) + parseInt(itw.x);
							$(this)[0].fb = parseInt($(this)[0].fb)*parseInt($("#Percent").val()) + parseInt(itw.fb);
							hadCount = true;
						}
					});
					if(!hadCount){
						NoRepeatWBList.push(WBList[index]);
					}
				});
				
				var wpeListid =[];
				var notWPERepterList = [];
				var notWERepterList = [];
				var notPERepterList = []; 
				
				$(WPEList).each(function(index){
					var it = $(this)[0];
					var hadCount = false;
					$(notWPERepterList).each(function(i){
						if(it.id==$(this)[0].id){
							$(this)[0].x = parseInt($(this)[0].x)*parseInt($("#Percent").val()) + parseInt(it.x);
							$(this)[0].fb = parseInt($(this)[0].fb)*parseInt($("#Percent").val()) + parseInt(it.fb);
							hadCount = true;
						}
					});
					if(!hadCount){
						notWPERepterList.push(WPEList[index]);
					}
				});
				
				$(PEList).each(function(index){
					var its = $(this)[0];
					var hadCount = false;
					$(notPERepterList).each(function(i){
						if(its.id==$(this)[0].id){
							$(this)[0].x = parseInt($(this)[0].x)*parseInt($("#Percent").val()) + parseInt(its.x);
							$(this)[0].fb = parseInt($(this)[0].fb)*parseInt($("#Percent").val()) + parseInt(its.fb);
							hadCount = true;
						}
					});
					if(!hadCount){
						notPERepterList.push(PEList[index]);
					}
				});
				
				$(WEList).each(function(index){
					var itw = $(this)[0];
					var hadCount = false;
					$(notWERepterList).each(function(i){
						if(itw.id==$(this)[0].id){
							$(this)[0].x = parseInt($(this)[0].x)*parseInt($("#Percent").val()) + parseInt(itw.x);
							$(this)[0].fb = parseInt($(this)[0].fb)*parseInt($("#Percent").val()) + parseInt(itw.fb);
							hadCount = true;
						}
					});
					if(!hadCount){
						notWERepterList.push(WEList[index]);
					}
				});
				
				$(notWPERepterList).each(function(index){
					var temp = $(this)[0];
					$(NoRepeatWPBList).each(function(i){
						if(temp.id == $(this)[0].id){
							temp.fb = parseInt(temp.fb)  + parseInt($(this)[0].fb);
							temp.x =  parseInt(temp.x)  +  parseInt($(this)[0].x);
						}
					});
					if(temp.fb>0 && temp.x>0){
						returnList.push(temp);
					}
				});
				$(notWERepterList).each(function(index){
					var temp = $(this)[0];
					$(NoRepeatWBList).each(function(i){
						if(temp.id == $(this)[0].id){
							temp.fb = parseInt(temp.fb)  + parseInt($(this)[0].fb);
							temp.x =  parseInt(temp.x)  +  parseInt($(this)[0].x);
						}
					});
					if(temp.fb>0 && temp.x==0){
						returnList.push(temp);
					}
				});
				
				$(notPERepterList).each(function(index){
					var temp = $(this)[0];
					$(NoRepeatPBList).each(function(i){
						if(temp.id == $(this)[0].id){
							temp.fb = parseInt(temp.fb)  + parseInt($(this)[0].fb);
							temp.x =  parseInt(temp.x)  +  parseInt($(this)[0].x);
						}
					});
					if(temp.fb==0 && temp.x>0){
						returnList.push(temp);
					}
				});
				
				$(returnList).each(function(index){
					$(this)[0].type = $(this)[0].type.replace("E","B");
				});
				
				return returnList;
				
			}else{
				var returnEatList=[];
				$(allList).each(function(index){
					if(CheckType.contains($(this)[0].type)){
						if($(this)[0].type !="DEmr" && $(this)[0].type !="DBmr"){
							if($(this)[0].type.indexOf("E")>=0){
								var it = $(this)[0];
								var hadCount = false;
								$(returnEatList).each(function(i){
									if(it.id==$(this)[0].id){
										$(this)[0].x = parseInt($(this)[0].x) + parseInt(it.x);
										hadCount = true;
									}
								});
								if(!hadCount){
									allList[index].x = parseInt(allList[index].x);
									returnEatList.push(allList[index]);
								}
							}
							if($(this)[0].type.indexOf("B")>=0){
								var it = $(this)[0];
								var hadCount = false;
								$(returnEatList).each(function(i){
									if(it.id==$(this)[0].id){
										$(this)[0].x = parseInt($(this)[0].x) + ( parseInt(it.x)*(-1) );
										hadCount = true;
									}
								});
								if(!hadCount){
									allList[index].x = parseInt(allList[index].x)*(-1);
									returnEatList.push(allList[index]);
								}
							}	
						}
					}
					
				});
				
				$(returnEatList).each(function(i){
					var item = $(this)[0];
					if(item.x>0){
						returnList.push(item);
					}
				})
				
				$(returnList).each(function(index){
					$(this)[0].type = $(this)[0].type.replace("E","B");
				});
				return returnList;
			}
		}else{
			return [];
		}
	},
	checkPingCangHouDataValidation:function(){
		$(window.frames["frmTRANS"].document).find("tbody[id^='DBmr'] tr").each(function(index){
			if($($(this).find(".del_ch").parent().parent()).find("td").eq(4).text()!="100"){
				return false;
			}
		});
		return true;
	},
	getNeedPingCangOrderList:function(){
		var withType = $("input[name='orderType']:checked").val();
		var returnBetList = [];
		var returnEatList = [];
		var returnList = [];
		var CheckType = [];
		if(withType.length>0){
			if("WP" == withType){
				CheckType = ['WPB','WPE','WB','WE','PB','PE']
			}
			if("QP" == withType){
				CheckType = ['FCB','FCE','PFTB','PFTE','QB','QE','QPB','QPE'] 
			}
			if("Q" == withType){
				CheckType = ['FCB','FCE','QB','QE']
			}
			
			var allList = ContentScript.GetAllHadTransactionData();
			
			if("WP" == withType){
				var WPBList =[];
				var WPEList =[];
				var WBList =[];
				var WEList =[];
				var PBList =[];
				var PEList =[];
				$(allList).each(function(index){
					var temp = $(this)[0];
					if($(this)[0].type =="DBmr"){
						//matches rdfb fb x y t 2 4 5 5 78 0/16
						if(parseInt($(this)[0].fb) >0 && parseInt($(this)[0].x)>0){
						   temp.type= "WPB";
						   temp.id = temp.matches + temp.rdfb;
						   temp.fb = parseInt(temp.fb)*(-1);
						   temp.x =  parseInt(temp.x)*(-1);
						   WPBList.push(temp);
						}
						if(parseInt($(this)[0].fb) == 0 && parseInt($(this)[0].x)>0){
						   temp.type= "PB";
						   temp.id = temp.matches + temp.rdfb;
						   temp.fb = parseInt(temp.fb)*(-1);
						   temp.x =  parseInt(temp.x)*(-1);
						   PBList.push(temp);
						}
						if(parseInt($(this)[0].fb) > 0 && parseInt($(this)[0].x) == 0){
							temp.type= "WB";
							temp.id = temp.matches + temp.rdfb;
							temp.fb = parseInt(temp.fb)*(-1);
						   	temp.x =  parseInt(temp.x)*(-1);
						    WBList.push(temp);
						}
					}else{
						if(CheckType.contains($(this)[0].type)){
							var temp = $(this)[0];
							//matches rdfb fb x y t 2 4 5 5 78 0/16
							switch($(this)[0].type){
								case "WPB": {
									temp.id = temp.matches + temp.rdfb;
									temp.fb = parseInt(temp.fb)*(-1);
							   		temp.x =  parseInt(temp.x)*(-1);
									WPBList.push(temp);
									break;
								}
								case "WPE": {
									temp.id = temp.matches + temp.rdfb;
									temp.fb = parseInt(temp.fb)*(1)* parseInt($("#Percent").val());
							   		temp.x =  parseInt(temp.x)*(1)*parseInt($("#Percent").val());
									WPEList.push(temp);
									break;
								}
								case "WB": {
									temp.id = temp.matches + temp.rdfb;
									temp.fb = parseInt(temp.fb)*(-1);
							   		temp.x =  parseInt(temp.x)*(-1);
									WBList.push(temp);
									break;
								}
								case "WE": {
									temp.id = temp.matches + temp.rdfb;
									temp.fb = parseInt(temp.fb)*(1)*parseInt($("#Percent").val());
							   		temp.x =  parseInt(temp.x)*(1)*parseInt($("#Percent").val());
									WEList.push(temp);
									break;
								}
								case "PE": {
									temp.id = temp.matches + temp.rdfb;
									temp.fb = parseInt(temp.fb)*(1)*parseInt($("#Percent").val());
							   		temp.x =  parseInt(temp.x)*(1)*parseInt($("#Percent").val());
									PEList.push(temp);
									break;
								}
								case "PB": {
									temp.id = temp.matches + temp.rdfb;
									temp.fb = parseInt(temp.fb)*(-1);
							   		temp.x =  parseInt(temp.x)*(-1);
									PBList.push(temp);
									break;
									
								}
							}
						}
					}
				});
				  
				var NoRepeatWPBList = [];
				var NoRepeatWBList = [];
				var NoRepeatPBList = [];
				$(WPBList).each(function(index){
					var itw = $(this)[0];
					var hadCount = false;
					$(NoRepeatWPBList).each(function(i){
						if(itw.id==$(this)[0].id){
							$(this)[0].x = parseInt($(this)[0].x)*parseInt($("#Percent").val()) + parseInt(itw.x);
							$(this)[0].fb = parseInt($(this)[0].fb)*parseInt($("#Percent").val()) + parseInt(itw.fb);
							hadCount = true;
						}
					});
					if(!hadCount){
						NoRepeatWPBList.push(WPBList[index]);
					}
				});
				$(PBList).each(function(index){
					var itw = $(this)[0];
					var hadCount = false;
					$(NoRepeatPBList).each(function(i){
						if(itw.id==$(this)[0].id){
							$(this)[0].x = parseInt($(this)[0].x)*parseInt($("#Percent").val()) + parseInt(itw.x);
							$(this)[0].fb = parseInt($(this)[0].fb)*parseInt($("#Percent").val()) + parseInt(itw.fb);
							hadCount = true;
						}
					});
					if(!hadCount){
						NoRepeatPBList.push(PBList[index]);
					}
				});
				$(WBList).each(function(index){
					var itw = $(this)[0];
					var hadCount = false;
					$(NoRepeatWBList).each(function(i){
						if(itw.id==$(this)[0].id){
							$(this)[0].x = parseInt($(this)[0].x)*parseInt($("#Percent").val()) + parseInt(itw.x);
							$(this)[0].fb = parseInt($(this)[0].fb)*parseInt($("#Percent").val()) + parseInt(itw.fb);
							hadCount = true;
						}
					});
					if(!hadCount){
						NoRepeatWBList.push(WBList[index]);
					}
				});
				
				var wpeListid =[];
				var notWPERepterList = [];
				var notWERepterList = [];
				var notPERepterList = []; 
				
				$(WPEList).each(function(index){
					var it = $(this)[0];
					var hadCount = false;
					$(notWPERepterList).each(function(i){
						if(it.id==$(this)[0].id){
							$(this)[0].x = parseInt($(this)[0].x)*parseInt($("#Percent").val()) + parseInt(it.x);
							$(this)[0].fb = parseInt($(this)[0].fb)*parseInt($("#Percent").val()) + parseInt(it.fb);
							hadCount = true;
						}
					});
					if(!hadCount){
						notWPERepterList.push(WPEList[index]);
					}
				});
				
				$(PEList).each(function(index){
					var its = $(this)[0];
					var hadCount = false;
					$(notPERepterList).each(function(i){
						if(its.id==$(this)[0].id){
							$(this)[0].x = parseInt($(this)[0].x)*parseInt($("#Percent").val()) + parseInt(its.x);
							$(this)[0].fb = parseInt($(this)[0].fb)*parseInt($("#Percent").val()) + parseInt(its.fb);
							hadCount = true;
						}
					});
					if(!hadCount){
						notPERepterList.push(PEList[index]);
					}
				});
				
				$(WEList).each(function(index){
					var itw = $(this)[0];
					var hadCount = false;
					$(notWERepterList).each(function(i){
						if(itw.id==$(this)[0].id){
							$(this)[0].x = parseInt($(this)[0].x)*parseInt($("#Percent").val()) + parseInt(itw.x);
							$(this)[0].fb = parseInt($(this)[0].fb)*parseInt($("#Percent").val()) + parseInt(itw.fb);
							hadCount = true;
						}
					});
					if(!hadCount){
						notWERepterList.push(WEList[index]);
					}
				});
				
				$(notWPERepterList).each(function(index){
					var temp = $(this)[0];
					$(NoRepeatWPBList).each(function(i){
						if(temp.id == $(this)[0].id){
							temp.fb = parseInt(temp.fb)  + parseInt($(this)[0].fb);
							temp.x =  parseInt(temp.x)  +  parseInt($(this)[0].x);
						}
					});
					if(temp.fb>0 && temp.x>0){
						returnList.push(temp);
					}
				});
				$(notWERepterList).each(function(index){
					var temp = $(this)[0];
					$(NoRepeatWBList).each(function(i){
						if(temp.id == $(this)[0].id){
							temp.fb = parseInt(temp.fb)  + parseInt($(this)[0].fb);
							temp.x =  parseInt(temp.x)  +  parseInt($(this)[0].x);
						}
					});
					if(temp.fb>0 && temp.x==0){
						returnList.push(temp);
					}
				});
				
				$(notPERepterList).each(function(index){
					var temp = $(this)[0];
					$(NoRepeatPBList).each(function(i){
						if(temp.id == $(this)[0].id){
							temp.fb = parseInt(temp.fb)  + parseInt($(this)[0].fb);
							temp.x =  parseInt(temp.x)  +  parseInt($(this)[0].x);
						}
					});
					if(temp.fb==0 && temp.x>0){
						returnList.push(temp);
					}
				});
				
				$(returnList).each(function(index){
					$(this)[0].type = $(this)[0].type.replace("E","B");
				});
				
				return returnList;
				
			}else{
				var returnEatList=[];
				$(allList).each(function(index){
					if(CheckType.contains($(this)[0].type)){
						if($(this)[0].type !="DEmr" && $(this)[0].type !="DBmr"){
							if($(this)[0].type.indexOf("E")>=0){
								var it = $(this)[0];
								var hadCount = false;
								$(returnEatList).each(function(i){
									if(it.id==$(this)[0].id){
										$(this)[0].x = parseInt($(this)[0].x) + parseInt(it.x);
										hadCount = true;
									}
								});
								if(!hadCount){
									allList[index].x = parseInt(allList[index].x);
									returnEatList.push(allList[index]);
								}
							}
							if($(this)[0].type.indexOf("B")>=0){
								var it = $(this)[0];
								var hadCount = false;
								$(returnEatList).each(function(i){
									if(it.id==$(this)[0].id){
										$(this)[0].x = parseInt($(this)[0].x) + ( parseInt(it.x)*(-1) );
										hadCount = true;
									}
								});
								if(!hadCount){
									allList[index].x = parseInt(allList[index].x)*(-1);
									returnEatList.push(allList[index]);
								}
							}	
						}
					}
					
				});
				
				$(returnEatList).each(function(i){
					var item = $(this)[0];
					if(item.x>0){
						returnList.push(item);
					}
				})
				
				$(returnList).each(function(index){
					$(this)[0].type = $(this)[0].type.replace("E","B");
				});
				return returnList;
			}
		}else{
			return [];
		}
	},
	ticketByFloat:function(item,type){
		var result = 0;
		if(type=="Q"){
			result = item;
		}else{
			if(item==0){
				result = 0;
			}else{
				if(item%5 !=0){
					result = item + (5 - item%5);
				}else{
					result = item;
				}
			}
		}
		return result
	},
	withOrderOnInit:function(pushData,isBalance){
		//真实的跟单操作
		$(pushData).each(function(i){
			var item = $(this)[0];
			if(true){
				var signInfo = ContentScript.GetSignInInfo();
				if(['FCB','FCE','PFTB','PFTE','QB','QE','QPB','QPE'].contains(item.type)){
							var postData = {};
							postData.task = "betBox";
							postData.combo =0;
							postData.Tix =  ContentScript.ticketByFloat(parseInt(item.x),"Q");
							postData.Race = parseInt(item.matches);
							var hourse1,hourse2;
							//如果含有括号特殊处理一下
							if(item.fb.indexOf("(")<0){
								hourse1 = item.fb.split("-")[0];
								hourse2 = item.fb.split("-")[1];
								postData.fctype = 0;
							}else{
								hourse1 = item.fb.replace(/\(/g,"").replace(/\)/g,"").split("-")[0];
								hourse2 = item.fb.replace(/\(/g,"").replace(/\)/g,"").split("-")[1];
								postData.fctype = 1;
							}
							postData.Hs1 = hourse1;
							postData.Hs2 = hourse2;
							postData.Hs3 = "";
							postData.Hs4 = "";
							postData.Hs5 = "";
							postData.Hs6 = "";
							postData.Hs7 = "";
							postData.Hs8 = "";
							//postData.fctype = 0;
							postData.Q = "Q";
							if(item.type.indexOf("E")>=0){
								postData.type = "EAT";
							}else{
								postData.type = "BET";
							}
							
							if(isBalance){
								postData.amount = 100;
							}else{
								postData.amount = ContentScript.PageConfig.Discount;
							}
							postData.fclmt = ContentScript.PageConfig.LimitStart;
								
							postData.overflow = "1";
							//postData.amount = "100";
							postData.race_type = signInfo.RaceType;
							postData.race_date = signInfo.RaceDate;
							postData.show = parseInt(item.matches);
							postData.rd = Math.random();
							
							console.log(postData);
							///forecast?task=betBox&combo=0&Tix=2&Race=6&Hs1=1&Hs2=2&Hs3=&Hs4=&Hs5=&Hs6=&Hs7=&Hs8=&fctype=0&Q=Q&type=EAT&overflow=1&amount=90&fclmt=700&race_type=330E&race_date=12-04-2015&show=6&rd=0.05655713961459696
							$.ajax({
							              type: "get",
							              url: ContentScript.urlX +"/forecast",
							              data: postData,
							              success: function (msg) {
							              	console.log(msg);
							              },
							              error:function(e){
							              	console.log(e);
							              }
							});
						} 
				if(['WPB','WPE','WB','WE','PB','PE'].contains($(this)[0].type)){
					
							var postURL = "";
							var postData = {};
							postData.t = "frm";
							postData.race = item.matches;
							postData.horse = item.rdfb;
							//var Proportion = parseInt(ContentScript.PageConfig.Percent);
							postData.win = ContentScript.ticketByFloat(parseInt(item.fb),"WP");
							postData.place = ContentScript.ticketByFloat(parseInt(item.x),"WP");
							
							var postURL ="";
							postURL ="/bets";
							
							if(isBalance){
								postData.amount = 99;
							}else{
								postData.amount = ContentScript.PageConfig.Discount;
							}
							
							postData.l_win = ContentScript.PageConfig.LimitStart;
							postData.l_place = ContentScript.PageConfig.LimitEnd;
							postData.race_type = signInfo.RaceType;
							postData.race_date = signInfo.RaceDate;
							postData.show = parseInt(item.matches);
							
							if(parseInt(postData.win)>0 && parseInt(postData.place)>0){
								postData.wptck=1;
							}else{
								postData.wptck=0;
							} 
							if(parseInt(postData.win)>0 && parseInt(postData.place)==0){
								postData.wtck=1;
								postData.l_place = "0";
							}
							if(parseInt(postData.win)==0 && parseInt(postData.place)>0){
								postData.ptck=1;
								postData.l_win = "0";
							}
							
							postData.post = "1";
							postData.rd = Math.random();
							console.log(postData);
							$.ajax({
							              type: "get",
							              url: ContentScript.urlX + postURL,
							              data: postData,
							              success: function (msg) {
							              	console.log(msg);
							              },
							              error:function(e){
							              	console.log(e);
							              }
							});
					}
			}
		});
	},
	GetAllTransactionData:function(){
		var result = [];
		
		$(ContentScript.txn_mode_check_item).each(function(i){
			var type = ContentScript.txn_mode_check_item[i];
			$(window.frames["frmTRANS"].document).find("tbody[id^='"+type+"'] tr").each(function(){
				var temp = "";
				$(this).find("td").each(function(item){
					temp += $(this).text()+"$";
				})
				if(temp.length>0){
					var tempArray = temp.split("$");
					var id = tempArray[0]+tempArray[1]+tempArray[2]; 
					item={"id":id,"type":type,"matches":tempArray[0],"rdfb":tempArray[1],"fb":tempArray[2],"x":tempArray[3],"y":tempArray[4],"t":tempArray[5]}
					result.push(item);
				}
			});
		});
		
		return result;
	},
	GetAllHadTransactionData:function(){
		var result = [];
		$(ContentScript.Hadtxn_mode_check_item).each(function(i){
			var type = ContentScript.txn_mode_check_item[i];
			$(window.frames["frmTRANS"].document).find("tbody[id^='"+type+"'] tr").each(function(){
				var temp = "";
				$(this).find("td").each(function(item){
					temp += $(this).text()+"$";
				})
				if(temp.length>0){
					var tempArray = temp.split("$");
					var id = tempArray[0]+tempArray[1]+tempArray[2];
					item={"id":id,"type":type,"matches":tempArray[0],"rdfb":tempArray[1],"fb":tempArray[2],"x":tempArray[3],"y":tempArray[4],"t":tempArray[5]}
					result.push(item);
				}
			});
		});
		
		return result;
	},
	
	CreateHtmlElement:function(){
		var htmlList = '<div id="drag" style="background:white;width: 330px; height: 180px; position: absolute; border: solid 1px #ccc; float: right; z-index: 100;right: 0;top: 0;min-height: 180px;overflow-y: auto;max-height: 600px;">';
        htmlList += '<h3 style="color: #fff; background: none repeat scroll 0 0 rgba(16, 90, 31, 0.7); color: #FFFFFF; height: 30px; line-height: 30px; margin: 0;">当前账户:'+$.trim($("#username").text())+' &nbsp; 到期时间<span id="daoqitime"></span></h3>';
        htmlList +='<table style="width:100%">';
        htmlList +='<tr style="line-height: 30px;"><td colspan="2">';
        htmlList +='<input type= "radio" name="orderType"  value="Q" checked="checked" id="QType"/>Q';
        htmlList +='<input type= "radio" name="orderType"  value="WP" id="WPType"/>WP';
        htmlList +='<input type= "radio" name="orderType"  value="QP" id="QPType"/>QP';
        htmlList +='</td></tr>';
        htmlList +='<tr style="line-height: 30px;" ><td colspan="2">';
        htmlList +='孔位:<input id="KongWei" type="number" step="10" style="width: 40px;" size="4" value="" />'
		htmlList +='过滤条件:<input id="LimitWhere1" type="number" step="10" style="width: 40px;" size="4" value="" />'
		htmlList +='至<input id="LimitWhere2" type="number" step="10" style="width: 40px;" size="4" value="" />'
		htmlList +='</td>'; 
        htmlList +='</tr>'; 
        htmlList +='<tr style="line-height: 30px;"><td colspan="2">';
        htmlList +='估计票数:<input id="GJCount" type="number" step="10" style="width: 40px;" size="4" value="" />';
        htmlList +='成交票数:<input id="CJCount" type="number" step="10" style="width: 40px;" size="4" value="" />';
        htmlList +='</td>'; 
        htmlList +='</tr>'; 
        htmlList +='<tr style="line-height: 30px;"><td colspan="2">';
        htmlList +='<input type= "radio" name="EatBetType"  value="Eat" checked="checked" id="EatType"/>吃折头:<input id="EatDiscount" type="number" step="10" style="width: 40px;" size="4" value="" />';
        htmlList +='<input type= "radio" name="EatBetType"  value="Bet" checked="checked" id="BetType"/>赌折头:<input id="BetDiscount" type="number" step="10" style="width: 40px;" size="4" value="" />';
        htmlList +='</td>'; 
        htmlList +='</tr>'; 
         htmlList +='<tr style="line-height: 30px;"><td colspan="2">';
        htmlList +='极限:<input id="LimitStart" type="number" step="10" style="width: 40px;" size="4" value="" />';
        htmlList +='/<input id="LimitEnd" type="number" step="10" style="width: 40px;" size="4" value="" />';
        htmlList +='</td>'; 
        htmlList +='</tr>'; 
        htmlList +='<tr style="line-height: 40px;"><td style="text-align:left;font-size:18px">';
       	htmlList +='</td><td style="text-align:right">';
        htmlList +='<input type="button" id="btnStart" value="开始" />';
        htmlList +='<input type="button" id="btnEnd" value="停止" />';
        htmlList +='</td></tr>';
        htmlList +='</table>';
        htmlList += '</div>';
        
        $("body").append(htmlList);
	},
	EatButtonEvent:function(){
		var yellowList = $(window.frames["frmTRANS"].document).find("tbody[id^='DEmr'] tr");
		if(yellowList !=null && yellowList!=undefined && yellowList.length>0){
						$(window.frames["frmTRANS"].document).find("tbody[id^='DEmr'] tr").each(function(index){
								var obj = $($(this).find(".del2_ch").parent().parent()).attr("onclick").replace(/mr\(\'/g,"").replace(/\'\)/g,"");
								PostHelp.AjaxDeleteData(obj);
								$($(this).find(".del2_ch").parent().parent()).hide();
						});
						
		}
	},
	BetButtonEvent:function(){
		var greenList = $(window.frames["frmTRANS"].document).find("tbody[id^='DBmr'] tr");
		if(greenList!=null && greenList!=undefined && greenList.length>0 ){
				$(window.frames["frmTRANS"].document).find("tbody[id^='DBmr'] tr").each(function(index){
						var obj = $($(this).find(".del_ch").parent().parent()).attr("onclick").replace(/mr\(\'/g,"").replace(/\'\)/g,"");
						PostHelp.AjaxDeleteData(obj);
						$($(this).find(".del_ch").parent().parent()).hide();
				});
				
		}
	},
	EatButtonEventByMatches:function(match){
		var yellowList = $(window.frames["frmTRANS"].document).find("tbody[id^='DEmr'] tr");
		if(yellowList !=null && yellowList!=undefined && yellowList.length>0){
						$(window.frames["frmTRANS"].document).find("tbody[id^='DEmr'] tr").each(function(index){
								var obj = $($(this).find(".del2_ch").parent().parent()).attr("onclick").replace(/mr\(\'/g,"").replace(/\'\)/g,"");
								var li=obj.split(",");
								var race=li[5];
								if(match==race){
									PostHelp.AjaxDeleteData(obj);
									$($(this).find(".del2_ch").first().parent().parent()).hide();
								}
						});
						
		}
	},
	BetButtonEventByMatches:function(match){
		var greenList = $(window.frames["frmTRANS"].document).find("tbody[id^='DBmr'] tr");
		if(greenList!=null && greenList!=undefined && greenList.length>0 ){
				$(window.frames["frmTRANS"].document).find("tbody[id^='DBmr'] tr").each(function(index){
						var obj = $($(this).find(".del_ch").parent().parent()).attr("onclick").replace(/mr\(\'/g,"").replace(/\'\)/g,"");
						var li=obj.split(",");
						var race=li[5];
						if(match==race){
							PostHelp.AjaxDeleteData(obj);
							$($(this).find(".del_ch").first().parent().parent()).hide();
						}
				});
		}
	},
	HtmlAddDragEvent:function(){
			var _move = false; //移动标记  
            var _x, _y; //鼠标离控件左上角的相对位置  
            $("#drag").click(function () {
                //alert("click");//点击（松开后触发）  
            }).mousedown(function (e) {
                _move = true;
                _x = e.pageX - parseInt($("#drag").css("left"));
                _y = e.pageY - parseInt($("#drag").css("top"));
            });
            $(document).mousemove(function (e) {
                if (_move) {
                    var x = e.pageX - _x; //移动时根据鼠标位置计算控件左上角的绝对位置  
                    var y = e.pageY - _y;
                    $("#drag").css({ top: y, left: x }); //控件新位置  
                }
            }).mouseup(function () {
                _move = false;
            });
	}
}

PostHelp={
	urlX: "http://"+window.location.host,
	fcfrm1 :  $("#fcfrm1"),
	fcfrm2 :  $("#fcfrm2"),
	chkKBBet:function(f){
		f = PostHelp.fcfrm1;
		if(f.find("input[name='fctype']").val()  == "0"){
			PostHelp.chkKB1(f);
		} else if(f.find("input[name='fctype']").val() == "1"){
			PostHelp.chkKB3(f);
		}
	},
    chkKBEat:function(f){
		f = PostHelp.fcfrm2;
		if(f.find("input[name='fctype']").val()  == "0"){
			PostHelp.chkKB2(f);
		} else if(f.find("input[name='fctype']").val() == "1"){
			PostHelp.chkKB4(f);
		}
	},
    chkKB1:function(f){
		f=PostHelp.fcfrm1;
		var combo;
		var hssA = "";
		if(f.find("input[name='Hss']")!=null && f.find("input[name='Hss']")!= undefined
		   && f.find("input[name='Hss']").val() != undefined
		){
			hssA = f.find("input[name='Hss']").val();
		}
		if(hssA.indexOf('>')>-1) {
			combo=1;
		} else {
			combo=0;
		}
		if(true){
			//f.Order.disabled = true;
			var hss = "";
			if(f.find("input[name='Hss']")!=null && f.find("input[name='Hss']")!= undefined
			   && f.find("input[name='Hss']").val() != undefined	
			){
				if(f.find("input[name='Hss']").val().length>0){
					hss = f.find("input[name='Hss']").val().replace(/\+/g,'_');
				}
			}
			if(hss=="")
			{
				hss=  f.find("input[name='Hs1']").val()+"_"+ f.find("input[name='Hs2']").val();
			}
			PostHelp.postData(PostHelp.urlX+'/forecast?task=betBox&combo='+combo+'&Tix=' + f.find("input[name='Tix']").val() + '&Race=' + f.find("input[name='Race']").val()+ '&Hss=' + hss + '&fctype=' + f.find("input[name='fctype']").val() + '&Q=' + f.find("input[name='Q']").val() + '&type=' + f.find("input[name='type']").val() + '&overflow=' + f.find("input[name='overflow']").val() + '&amount=' + f.find("input[name='amount']").val() + '&fclmt=' + f.find("input[name='fclmt']").val()  + '&race_type=' +  f.find("input[name='race_type']").val() + '&race_date=' + f.find("input[name='race_date']").val() );
		}
	},
    chkKB2:function(f){
		f=PostHelp.fcfrm2;
		var combo=f.find("input[name='banker2']").val();
		if(true){
			//f.Order.disabled = true;
			//PostHelp.postData(PostHelp.urlX+'/forecast?task=betBox&combo='+combo+'&Tix=' + f.Tix.value + '&Race=' + f.Race.value + '&Hss=' + f.Hss.value.replace(/\+/g,'_')+'&fctype=' + f.fctype.value + '&Q=' + f.Q.value + '&type=' + f.type.value+ '&overflow=' + f.overflow.value + '&amount=' + f.amount.value + '&fclmt=' + f.fclmt.value  + '&race_type=' + f.race_type.value + '&race_date=' + f.race_date.value );
			//f.Order.disabled = true;
			var hss = "";
			if(f.find("input[name='Hss']")){
				if(f.find("input[name='Hss']").val().length>0){
					hss = f.find("input[name='Hss']").val().replace(/\+/g,'_');
				}
			}	
			if(hss=="")
			{
				hss= f.find("input[name='Hs1']").val()+"_"+ f.find("input[name='Hs2']").val();
			}
			PostHelp.postData(PostHelp.urlX+'/forecast?task=betBox&combo='+combo+'&Tix=' + f.find("input[name='Tix']").val() + '&Race=' + f.find("input[name='Race']").val()+ '&Hss=' + hss + '&fctype=' + f.find("input[name='fctype']").val() + '&Q=' + f.find("input[name='Q']").val() + '&type=' + f.find("input[name='type']").val() + '&overflow=' + f.find("input[name='overflow']").val() + '&amount=' + f.find("input[name='amount']").val() + '&fclmt=' + f.find("input[name='fclmt']").val()  + '&race_type=' +  f.find("input[name='race_type']").val() + '&race_date=' + f.find("input[name='race_date']").val() );
		
		}
	},
    chkKB3:function(f){
		f=PostHelp.fcfrm1;
		var combo;
		var hssA = "";
		if(f.find("input[name='Hss']") !=null && f.find("input[name='Hss']") != undefined
			&& f.find("input[name='Hss']").val() != undefined
		){
			hssA = f.find("input[name='Hss']").val()
		}
		if(hssA.indexOf('>')>-1) {
			combo=1;
		} else {
			combo=0;
		}
		if(true){
			//f.Order.disabled = true;
			//PostHelp.postData(PostHelp.urlX+'/forecast?task=betBox&combo='+combo+'&Tix=' + f.Tix.value + '&Race=' + f.Race.value + '&Hss=' + f.Hss.value.replace(/\+/g,'_')+'&fctype=' + f.fctype.value + '&Q=' + f.Q.value + '&type=' + f.type.value+ '&overflow=' + f.overflow.value + '&amount=' + f.amount.value + '&fclmt=' + f.fclmt.value  + '&race_type=' + f.race_type.value + '&race_date=' + f.race_date.value );
			var hss = "";
			if(f.find("input[name='Hss']")!=null && f.find("input[name='Hss']")!= undefined
			   && f.find("input[name='Hss']").val() != undefined
			){
				if(f.find("input[name='Hss']").val()!=""){
					hss = f.find("input[name='Hss']").val().replace(/\+/g,'_');
				}
			}			
			if(hss=="")
			{
				hss=  f.find("input[name='Hs1']").val()+"_"+ f.find("input[name='Hs2']").val();
			}
			PostHelp.postData(PostHelp.urlX+'/forecast?task=betBox&combo='+combo+'&Tix=' + f.find("input[name='Tix']").val() + '&Race=' + f.find("input[name='Race']").val()+ '&Hss=' + hss + '&fctype=' + f.find("input[name='fctype']").val() + '&Q=' + f.find("input[name='Q']").val() + '&type=' + f.find("input[name='type']").val() + '&overflow=' + f.find("input[name='overflow']").val() + '&amount=' + f.find("input[name='amount']").val() + '&fclmt=' + f.find("input[name='fclmt']").val()  + '&race_type=' +  f.find("input[name='race_type']").val() + '&race_date=' + f.find("input[name='race_date']").val() );
		
		}
	},
	chkKB4:function(f){
		f=PostHelp.fcfrm2;
		var combo= f.find("input[name='banker2']").val();
		if(true){
			f.Order.disabled = true;
			//PostHelp.postData(PostHelp.urlX+'/forecast?task=betBox&combo='+combo+'&Tix=' + f.Tix.value + '&Race=' + f.Race.value + '&Hss=' + f.Hss.value.replace(/\+/g,'_')+'&fctype=' + f.fctype.value + '&Q=' + f.Q.value + '&type=' + f.type.value+ '&overflow=' + f.overflow.value + '&amount=' + f.amount.value + '&fclmt=' + f.fclmt.value  + '&race_type=' + f.race_type.value + '&race_date=' + f.race_date.value );
			var hss = "";
			if(f.find("input[name='Hss']")!=null && f.find("input[name='Hss']")!= undefined){
				if(f.find("input[name='Hss']").val()!=""){
					hss = f.find("input[name='Hss']").val().replace(/\+/g,'_');
				}
			}		
			if(hss=="")
			{
				hss = f.find("input[name='Hs1']").val()+"_"+ f.find("input[name='Hs2']").val();
			}
			PostHelp.postData(PostHelp.urlX+'/forecast?task=betBox&combo='+combo+'&Tix=' + f.find("input[name='Tix']").val() + '&Race=' + f.find("input[name='Race']").val()+ '&Hss=' + hss + '&fctype=' + f.find("input[name='fctype']").val() + '&Q=' + f.find("input[name='Q']").val() + '&type=' + f.find("input[name='type']").val() + '&overflow=' + f.find("input[name='overflow']").val() + '&amount=' + f.find("input[name='amount']").val() + '&fclmt=' + f.find("input[name='fclmt']").val()  + '&race_type=' +  f.find("input[name='race_type']").val() + '&race_date=' + f.find("input[name='race_date']").val() );
		}
	},
	chkActBet:function(f){
		f = PostHelp.fcfrm1;
		var combo;
		var check = f.find("input[name='banker1'] :checked");
		if(check) {
			combo=1;
		} else {
			combo=0;
		}
		if(true){
			//f.Order.disabled = true;
			PostHelp.postData(PostHelp.urlX+'/forecast?task=betBox&combo='+combo+'&Tix=' + 
			f.find("input[name='Tix']").val() + '&Race=' + 
			f.find("input[name='Race']").val() + '&Hs1=' + 
			f.find("input[name='Hs1']").val() + '&Hs2=' + 
			f.find("input[name='Hs2']").val()  + '&Hs3=' + 
			f.find("input[name='Hs3']").val() + '&Hs4=' + 
			f.find("input[name='Hs4']").val() + '&Hs5=' + 
			f.find("input[name='Hs5']").val()  + '&Hs6=' + 
			f.find("input[name='Hs6']").val() + '&Hs7=' + 
			f.find("input[name='Hs7']").val() + '&Hs8=' + 
			f.find("input[name='Hs8']").val() +'&fctype=' + 
			f.find("input[name='fctype']").val()  + '&Q=' + 
			f.find("input[name='Q']").val() + '&type=' + 
			f.find("input[name='type']").val() + '&overflow=' + 
			f.find("input[name='overflow']").val() + '&amount=' + 
			f.find("input[name='amount']").val() + '&fclmt=' + 
			f.find("input[name='fclmt']").val()  + '&race_type=' + 
			f.find("input[name='race_type']").val()  + '&race_date=' + 
			f.find("input[name='race_date']").val()  );	
		}
	},
	chkActEat:function(f){
		f = PostHelp.fcfrm2;
		var combo= f.find("input[name='banker2']").val();
		if(true){
			//f.Order.disabled = true;
			PostHelp.postData(PostHelp.urlX+'/forecast?task=betBox&combo='+combo+'&Tix=' + 
			f.find("input[name='Tix']").val() + '&Race=' + 
			f.find("input[name='Race']").val() + '&Hs1=' + 
			f.find("input[name='Hs1']").val() + '&Hs2=' + 
			f.find("input[name='Hs2']").val()  + '&Hs3=' + 
			f.find("input[name='Hs3']").val() + '&Hs4=' + 
			f.find("input[name='Hs4']").val() + '&Hs5=' + 
			f.find("input[name='Hs5']").val()  + '&Hs6=' + 
			f.find("input[name='Hs6']").val() + '&Hs7=' + 
			f.find("input[name='Hs7']").val() + '&Hs8=' + 
			f.find("input[name='Hs8']").val() +'&fctype=' + 
			f.find("input[name='fctype']").val()  + '&Q=' + 
			f.find("input[name='Q']").val() + '&type=' + 
			f.find("input[name='type']").val() + '&overflow=' + 
			f.find("input[name='overflow']").val() + '&amount=' + 
			f.find("input[name='amount']").val() + '&fclmt=' + 
			f.find("input[name='fclmt']").val()  + '&race_type=' + 
			f.find("input[name='race_type']").val()  + '&race_date=' + 
			f.find("input[name='race_date']").val()  );
		}
	},
	postData:function(url){
		var view1 = $("#view1");
		if(view1) {
				var y = $("#view1").val();
				var postion = url  + "&show="+y+ "&rd=" + Math.random();
				var postionArray = postion.split("?");
				var postUrl = postionArray[0];
				var dataUrl = postionArray[1];
				var dataArray = dataUrl.split('&');
				var postString ='{';
				for(var i=0;i< dataArray.length;i++){
					var itemArray = dataArray[i].split('=');
					postString +='"'+itemArray[0]+'": "'+itemArray[1]+'",';
				}
				postString = postString.substr(0,postString.length-1);
				postString+='}';
				var dataJson = $.parseJSON(postString);
				$.ajax(
				{
		             type: "GET",
		             url: postUrl,		             
		             data: dataJson,
		             dataType: "text",
		             success: function(da)
		             {
		             },
		             error:function (da, status, e){   
	   				 }
	     		});
		}
	},
	PostDeleteData:function(info){
		var id,x,type,date,race_type,race
		var li=info.split(",");
		id=li[0];x=li[1];type=li[2];date=li[3];race_type=li[4];race=li[5];
		document.getElementById('boxFcBET').style.display = "none";
		document.getElementById('boxFcEAT').style.display = "none";
		document.getElementById('boxPfcBET').style.display = "none";
		document.getElementById('boxPfcEAT').style.display = "none";
		PostHelp.postData(PostHelp.urlX + '/transactions?type=del&bid='+id+'&x='+x+'&betType='+type+'&race_date='+date+'&race_type='+race_type+'&q=q&race='+race);
	},
	AjaxDeleteData:function(info){
		var id,x,type,date,race_type,race
		var li=info.split(",");
		var y = 0;
		try{
			y = view1.options[view1.selectedIndex].value;
		}catch(e){
			y = $(".dd-selected-value").val();
		}
		
		id=li[0];x=li[1];type=li[2];date=li[3];race_type=li[4];race=li[5];
		$.ajax(
				{
		             type: "GET",
		             url: PostHelp.urlX +"/transactions",		             
		             data: {
		             	"type":"del",
		             	"bid":id,
		             	"x":x,
		             	"betType":type,
		             	"race_date":date,
		             	"race_type":race_type,
		             	"q":"q",
						"race":race,
						"show":y,
						"rd":Math.random()
		             },
		             dataType: "text",
		             success: function(da)
		             {
		             },
		             error:function (da, status, e){   
	   				 }   
	   				 
	     });
	}
}

MD5Helper={
hexcase:0,  
b64pad:"",
chrsz:8,  
hex_md5:function(s){ return MD5Helper.binl2hex(MD5Helper.core_md5(MD5Helper.str2binl(s), s.length * MD5Helper.chrsz));},
b64_md5:function(s){ return MD5Helper.binl2b64(MD5Helper.core_md5(MD5Helper.str2binl(s), s.length * MD5Helper.chrsz));},
str_md5:function(s){ return MD5Helper.binl2str(MD5Helper.core_md5(MD5Helper.str2binl(s), s.length * MD5Helper.chrsz));},
hex_hmac_md5:function(key, data) { return MD5Helper.binl2hex(MD5Helper.core_hmac_md5(key, data)); },
b64_hmac_md5:function(key, data) { return MD5Helper.binl2b64(MD5Helper.core_hmac_md5(key, data)); },
str_hmac_md5:function(key, data) { return MD5Helper.binl2str(MD5Helper.core_hmac_md5(key, data)); },
core_md5:function(x, len)
{
  x[len >> 5] |= 0x80 << ((len) % 32);
  x[(((len + 64) >>> 9) << 4) + 14] = len;

  var a =  1732584193;
  var b = -271733879;
  var c = -1732584194;
  var d =  271733878;

  for(var i = 0; i < x.length; i += 16)
  {
    var olda = a;
    var oldb = b;
    var oldc = c;
    var oldd = d;

    a = MD5Helper.md5_ff(a, b, c, d, x[i+ 0], 7 , -680876936);
    d = MD5Helper.md5_ff(d, a, b, c, x[i+ 1], 12, -389564586);
    c = MD5Helper.md5_ff(c, d, a, b, x[i+ 2], 17,  606105819);
    b = MD5Helper.md5_ff(b, c, d, a, x[i+ 3], 22, -1044525330);
    a = MD5Helper.md5_ff(a, b, c, d, x[i+ 4], 7 , -176418897);
    d = MD5Helper.md5_ff(d, a, b, c, x[i+ 5], 12,  1200080426);
    c = MD5Helper.md5_ff(c, d, a, b, x[i+ 6], 17, -1473231341);
    b = MD5Helper.md5_ff(b, c, d, a, x[i+ 7], 22, -45705983);
    a = MD5Helper.md5_ff(a, b, c, d, x[i+ 8], 7 ,  1770035416);
    d = MD5Helper.md5_ff(d, a, b, c, x[i+ 9], 12, -1958414417);
    c = MD5Helper.md5_ff(c, d, a, b, x[i+10], 17, -42063);
    b = MD5Helper.md5_ff(b, c, d, a, x[i+11], 22, -1990404162);
    a = MD5Helper.md5_ff(a, b, c, d, x[i+12], 7 ,  1804603682);
    d = MD5Helper.md5_ff(d, a, b, c, x[i+13], 12, -40341101);
    c = MD5Helper.md5_ff(c, d, a, b, x[i+14], 17, -1502002290);
    b = MD5Helper.md5_ff(b, c, d, a, x[i+15], 22,  1236535329);

    a = MD5Helper.md5_gg(a, b, c, d, x[i+ 1], 5 , -165796510);
    d = MD5Helper.md5_gg(d, a, b, c, x[i+ 6], 9 , -1069501632);
    c = MD5Helper.md5_gg(c, d, a, b, x[i+11], 14,  643717713);
    b = MD5Helper.md5_gg(b, c, d, a, x[i+ 0], 20, -373897302);
    a = MD5Helper.md5_gg(a, b, c, d, x[i+ 5], 5 , -701558691);
    d = MD5Helper.md5_gg(d, a, b, c, x[i+10], 9 ,  38016083);
    c = MD5Helper.md5_gg(c, d, a, b, x[i+15], 14, -660478335);
    b = MD5Helper.md5_gg(b, c, d, a, x[i+ 4], 20, -405537848);
    a = MD5Helper.md5_gg(a, b, c, d, x[i+ 9], 5 ,  568446438);
    d = MD5Helper.md5_gg(d, a, b, c, x[i+14], 9 , -1019803690);
    c = MD5Helper.md5_gg(c, d, a, b, x[i+ 3], 14, -187363961);
    b = MD5Helper.md5_gg(b, c, d, a, x[i+ 8], 20,  1163531501);
    a = MD5Helper.md5_gg(a, b, c, d, x[i+13], 5 , -1444681467);
    d = MD5Helper.md5_gg(d, a, b, c, x[i+ 2], 9 , -51403784);
    c = MD5Helper.md5_gg(c, d, a, b, x[i+ 7], 14,  1735328473);
    b = MD5Helper.md5_gg(b, c, d, a, x[i+12], 20, -1926607734);

    a = MD5Helper.md5_hh(a, b, c, d, x[i+ 5], 4 , -378558);
    d = MD5Helper.md5_hh(d, a, b, c, x[i+ 8], 11, -2022574463);
    c = MD5Helper.md5_hh(c, d, a, b, x[i+11], 16,  1839030562);
    b = MD5Helper.md5_hh(b, c, d, a, x[i+14], 23, -35309556);
    a = MD5Helper.md5_hh(a, b, c, d, x[i+ 1], 4 , -1530992060);
    d = MD5Helper.md5_hh(d, a, b, c, x[i+ 4], 11,  1272893353);
    c = MD5Helper.md5_hh(c, d, a, b, x[i+ 7], 16, -155497632);
    b = MD5Helper.md5_hh(b, c, d, a, x[i+10], 23, -1094730640);
    a = MD5Helper.md5_hh(a, b, c, d, x[i+13], 4 ,  681279174);
    d = MD5Helper.md5_hh(d, a, b, c, x[i+ 0], 11, -358537222);
    c = MD5Helper.md5_hh(c, d, a, b, x[i+ 3], 16, -722521979);
    b = MD5Helper.md5_hh(b, c, d, a, x[i+ 6], 23,  76029189);
    a = MD5Helper.md5_hh(a, b, c, d, x[i+ 9], 4 , -640364487);
    d = MD5Helper.md5_hh(d, a, b, c, x[i+12], 11, -421815835);
    c = MD5Helper.md5_hh(c, d, a, b, x[i+15], 16,  530742520);
    b = MD5Helper.md5_hh(b, c, d, a, x[i+ 2], 23, -995338651);

    a = MD5Helper.md5_ii(a, b, c, d, x[i+ 0], 6 , -198630844);
    d = MD5Helper.md5_ii(d, a, b, c, x[i+ 7], 10,  1126891415);
    c = MD5Helper.md5_ii(c, d, a, b, x[i+14], 15, -1416354905);
    b = MD5Helper.md5_ii(b, c, d, a, x[i+ 5], 21, -57434055);
    a = MD5Helper.md5_ii(a, b, c, d, x[i+12], 6 ,  1700485571);
    d = MD5Helper.md5_ii(d, a, b, c, x[i+ 3], 10, -1894986606);
    c = MD5Helper.md5_ii(c, d, a, b, x[i+10], 15, -1051523);
    b = MD5Helper.md5_ii(b, c, d, a, x[i+ 1], 21, -2054922799);
    a = MD5Helper.md5_ii(a, b, c, d, x[i+ 8], 6 ,  1873313359);
    d = MD5Helper.md5_ii(d, a, b, c, x[i+15], 10, -30611744);
    c = MD5Helper.md5_ii(c, d, a, b, x[i+ 6], 15, -1560198380);
    b = MD5Helper.md5_ii(b, c, d, a, x[i+13], 21,  1309151649);
    a = MD5Helper.md5_ii(a, b, c, d, x[i+ 4], 6 , -145523070);
    d = MD5Helper.md5_ii(d, a, b, c, x[i+11], 10, -1120210379);
    c = MD5Helper.md5_ii(c, d, a, b, x[i+ 2], 15,  718787259);
    b = MD5Helper.md5_ii(b, c, d, a, x[i+ 9], 21, -343485551);

    a = MD5Helper.safe_add(a, olda);
    b = MD5Helper.safe_add(b, oldb);
    c = MD5Helper.safe_add(c, oldc);
    d = MD5Helper.safe_add(d, oldd);
  }
  return Array(a, b, c, d);

},
md5_cmn:function(q, a, b, x, s, t)
{
  return MD5Helper.safe_add(MD5Helper.bit_rol(MD5Helper.safe_add(MD5Helper.safe_add(a, q), MD5Helper.safe_add(x, t)), s),b);
},
md5_ff:function(a, b, c, d, x, s, t)
{
  return MD5Helper.md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
},
md5_gg:function(a, b, c, d, x, s, t)
{
  return MD5Helper.md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
},
md5_hh:function(a, b, c, d, x, s, t)
{
  return MD5Helper.md5_cmn(b ^ c ^ d, a, b, x, s, t);
},
md5_ii:function(a, b, c, d, x, s, t)
{
  return MD5Helper.md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
},
core_hmac_md5:function(key, data)
{
  var bkey = MD5Helper.str2binl(key);
  if(bkey.length > 16) bkey = MD5Helper.core_md5(bkey, key.length * MD5Helper.chrsz);

  var ipad = Array(16), opad = Array(16);
  for(var i = 0; i < 16; i++)
  {
    ipad[i] = bkey[i] ^ 0x36363636;
    opad[i] = bkey[i] ^ 0x5C5C5C5C;
  }

  var hash = MD5Helper.core_md5(ipad.concat(MD5Helper.str2binl(data)), 512 + data.length * MD5Helper.chrsz);
  return MD5Helper.core_md5(opad.concat(hash), 512 + 128);
},
safe_add:function(x, y)
{
  var lsw = (x & 0xFFFF) + (y & 0xFFFF);
  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return (msw << 16) | (lsw & 0xFFFF);
},
bit_rol:function(num, cnt)
{
  return (num << cnt) | (num >>> (32 - cnt));
},
str2binl:function(str)
{
  var bin = Array();
  var mask = (1 << MD5Helper.chrsz) - 1;
  for(var i = 0; i < str.length * MD5Helper.chrsz; i += MD5Helper.chrsz)
    bin[i>>5] |= (str.charCodeAt(i / MD5Helper.chrsz) & mask) << (i%32);
  return bin;
},
binl2str:function(bin){
  var str = "";
  var mask = (1 << MD5Helper.chrsz) - 1;
  for(var i = 0; i < bin.length * 32; i += MD5Helper.chrsz)
    str += String.fromCharCode((bin[i>>5] >>> (i % 32)) & mask);
  return str;
},
binl2hex:function(binarray){
	  var hex_tab = MD5Helper.hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
	  var str = "";
	  for(var i = 0; i < binarray.length * 4; i++)
	  {
	    str += hex_tab.charAt((binarray[i>>2] >> ((i%4)*8+4)) & 0xF) +
	           hex_tab.charAt((binarray[i>>2] >> ((i%4)*8  )) & 0xF);
	  }
	  return str;
},
binl2b64:function(binarray){
	  var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
	  var str = "";
	  for(var i = 0; i < binarray.length * 4; i += 3)
	  {
	    var triplet = (((binarray[i   >> 2] >> 8 * ( i   %4)) & 0xFF) << 16)
	                | (((binarray[i+1 >> 2] >> 8 * ((i+1)%4)) & 0xFF) << 8 )
	                |  ((binarray[i+2 >> 2] >> 8 * ((i+2)%4)) & 0xFF);
	    for(var j = 0; j < 4; j++)
	    {
	      if(i * 8 + j * 6 > binarray.length * 32) str += MD5Helper.b64pad;
	      else str += tab.charAt((triplet >> 6*(3-j)) & 0x3F);
	    }
	  }
	  return str;
	}
}

var host =window.location.href;
if(host.indexOf("playerhk.jsp")>=0 || host.indexOf("Q.jsp")>=0){
	ContentScript.onInit();
}
