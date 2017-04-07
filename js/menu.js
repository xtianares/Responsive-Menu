// Source: https://gist.github.com/k-gun/c2ea7c49edf7b757fe9561ba37cb19ca
// .classList() Polyfill for older browser - IE9 again...
!function(){function t(t){this.element=t}var e=function(t){return RegExp("(^| )"+t+"( |$)")},n=function(t,e,n){for(var i=0;i<t.length;i++)e.call(n,t[i])}
t.prototype={add:function(){n(arguments,function(t){this.contains(t)||(this.element.className+=" "+t)},this)},remove:function(){n(arguments,function(t){this.element.className=this.element.className.replace(e(t),"")},this)},toggle:function(t){return this.contains(t)?(this.remove(t),!1):(this.add(t),!0)},contains:function(t){return e(t).test(this.element.className)},replace:function(t,e){this.remove(t),this.add(e)}},"classList"in Element.prototype||Object.defineProperty(Element.prototype,"classList",{get:function(){return new t(this)}}),window.DOMTokenList&&null==DOMTokenList.prototype.replace&&(DOMTokenList.prototype.replace=t.prototype.replace)}()

// .closest() Polyfill for browsers that supports document.querySelectorAll() - IE9 again...
if (window.Element && !Element.prototype.closest) {
    Element.prototype.closest =
    function(s) {
        var matches = (this.document || this.ownerDocument).querySelectorAll(s),
            i,
            el = this;
        do {
            i = matches.length;
            while (--i >= 0 && matches.item(i) !== el) {};
        } while ((i < 0) && (el = el.parentElement));
        return el;
    };
}

// for active menu highlighting
(function(){
	var a = document.getElementById('nav').getElementsByTagName("a");
	if (window.location.href.substr(location.href.length - 1, 1) == '/') {
		var loc = window.location.href + 'index.aspx';
	} else {
		var loc = window.location.href;
	}
	for(var i=0; i < a.length; i++) {
		if (a[i].href == loc) {
			a[i].className += ' is-active';
		}
	}
})();

document.getElementById('nav').querySelector('ul').insertAdjacentHTML("beforebegin", "<span id='menutoggle' class='test'><span>Menu</span></span>");
var menutoggle = document.getElementById("menutoggle");
var activeClass = "is-active"

menutoggle.onclick = function(event) {
	menutoggle.classList.toggle(activeClass);
	//menutoggle.nextSibling.classList.toggle(activeClass);
	var el = document.querySelectorAll("#nav span.submenu, #nav ul.submenu");
	var i; for (i = 0; i < el.length; i++) {
		el[i].classList.remove(activeClass);
	}
	event.preventDefault();
};

var forEach = function (array, callback, scope) {
	for (var i = 0; i < array.length; i++) {
		callback.call(scope, i, array[i]); // passes back stuff we need from the array
	}
};
forEach(document.querySelectorAll("#nav span.submenu"), function (index, value) {
	value.addEventListener('click', function() {
        if ( menutoggle.offsetWidth > 0 && menutoggle.offsetHeight > 0 ) { // if the #menutoggle is visible
    		value.classList.toggle(activeClass);
        }
	})
});

function hideMenu() {
	var el = document.querySelectorAll("#menutoggle, #menutoggle + ul, #nav span.submenu, #nav ul.submenu");
	var i; for (i = 0; i < el.length; i++) {
		el[i].classList.remove(activeClass);
	}
}

document.addEventListener('click', function(e) {
	if ( menutoggle.offsetWidth > 0 && menutoggle.offsetHeight > 0 ) { // if the #menutoggle is visible
		var e=e? e : window.event;
	    var event_element=e.target? e.target : e.srcElement;
		if (!event_element.closest("#nav")){
			//console.log(event_element.closest("#nav"));
			if (menutoggle.classList.contains(activeClass)) {
				hideMenu();
			}
		}
	}
}, false);

/*
window.addEventListener("resize", function () {
    //if ( menutoggle.offsetWidth > 0 && menutoggle.offsetHeight > 0 ) { // if the #menutoggle is visible
	//	hideMenu();
	//}
    if ( menutoggle.offsetWidth <= 0 && menutoggle.offsetHeight <=  0 ) { // if the #menutoggle is hidden
		hideMenu();
	}
}, false);
*/

var resizeTimer;
window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
        if ( menutoggle.offsetWidth <= 0 && menutoggle.offsetHeight <=  0 ) { // if the #menutoggle is hidden
    		hideMenu();
    	}
    }, 250);
}, false);


// Dropdown Select Toggle
forEach(document.querySelectorAll(".dropdown_list span.dropdown"), function (index, value) {
	value.addEventListener('click', function() {
        //console.log(value.classList);
        if ( !value.classList.contains(activeClass) ) {
            var el = document.querySelectorAll(".dropdown_list span.dropdown");
            var i; for (i = 0; i < el.length; i++) {
                el[i].classList.remove(activeClass);
            }
            value.classList.toggle(activeClass);
        } else
        if ( value.classList.contains(activeClass) ) {
            value.classList.remove(activeClass);
        }
	})
});
document.addEventListener('click', function(e) {
	// Dropdown Select Toggle
	var el = document.querySelectorAll(".dropdown_list span.dropdown")
	var e=e? e : window.event;
    var event_element=e.target? e.target : e.srcElement;
	if (!event_element.closest(".dropdown_list")){
		//console.log(event_element.closest(".dropdown_list"));
		var i; for (i = 0; i < el.length; i++) {
			el[i].classList.remove(activeClass);
		}
	}
}, false);
