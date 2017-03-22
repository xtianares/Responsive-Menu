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
			a[i].className='active';
		}
	}
})();
// Toggle menu for mobile devices using jQuery //
$("#nav > ul, #nav div > ul").before("<span id='menutoggle'><span>Menu</span></span>");
$(document).ready(function() {
    $("#menutoggle").click(function(event) {
        $(this).toggleClass("active");
        $(this).next("ul").stop().slideToggle(150);
        $("#nav span.submenu, #nav ul.submenu").removeClass("active");
        event.preventDefault();
    });
    $("#nav span.submenu").click(function(event) {
        if ($("#menutoggle").is(":visible")) {
            $(this).toggleClass("active");
            $(this).next("ul").slideToggle(150).toggleClass("active");
        }
        /*
        if ($("html").hasClass("touch") && $("#menutoggle").is(":hidden")) {
            if (!$(this).hasClass("active")) {
                $("#nav span.submenu").removeClass("active hover").next("ul.drop").removeClass("active");
                $(this).addClass("active hover").next("ul.drop").addClass("active");
            } else
            if ($(this).hasClass("active")) {
                $(this).removeClass("active hover").next("ul.drop").removeClass("active");
            }
        }
        */
        event.preventDefault();
    });
    /*
    if ($("html").hasClass("touch")) {
        $(window).bind("orientationchange", function() {
            if ($("#menutoggle, #nav span.submenu, #nav ul.submenu").hasClass("active")) {
                $("#nav ul").slideUp(100);
            }
            $("#menutoggle, #nav span.submenu, #nav ul.submenu").removeClass("active hover");
        });
    }
    */
    var wWidth = $(window).width();
    $(window).resize(function() {
        if (wWidth != $(window).width()) {
            if ($("#menutoggle, #nav span.submenu, #nav ul.submenu").hasClass("active")) {
                $("#nav ul.submenu").slideUp(100);
            }
            if (!$("#menutoggle").is(":hidden")) {
                $("#nav ul").slideUp(100);
                $("#nav ul").focus().blur()
            }
            $("#menutoggle, #nav span.submenu, #nav ul.submenu").removeClass("active hover");
        }
    });
    $(document).click(function(event) {
        if (!$(event.target).closest("#menutoggle, #nav ul").length) {
            if ($("#menutoggle, #nav span.submenu, #nav ul.submenu").hasClass("active")) {
                if ($("#menutoggle").hasClass("active")) {
                    $("#nav ul").slideUp(150);
                }
                $("#nav ul.submenu").slideUp(150);
            }
            $("#menutoggle, #nav span.submenu, #nav ul.submenu").removeClass("active hover");
        }
    });
    // Dropdown Select
    $("ul.dropdown li ul.drop").css({ display: "none", left: "-999em;" });
    $("ul.dropdown span.dropdown").click(function() {
        if ($(this).next("ul.drop").is(":hidden")) {
            $("ul.dropdown span.dropdown").removeClass("active").next("ul.drop").slideUp(100);
            $(this).toggleClass("active").next("ul.drop").slideDown(100).css({ display: "block", left: "0" });
        } else
        if ($(this).next("ul.drop").is(":visible")) {
            $(this).removeClass("active").next("ul.drop").slideUp(100).css({ left: "-999em;" });
        }
        //return false;
    });
    $(document).click(function(event) {
        if (!$(event.target).closest("ul.dropdown span.dropdown").length) {
            $("ul.dropdown ul.drop").slideUp(100);
            $("ul.dropdown span.dropdown").removeClass("active");
        }
    });
});


// reference code for clicks and events
// IE: attachEvent, Firefox & Chrome: addEventListener
/*
function _addEventListener(evt, element, fn) {
  if (window.addEventListener) {element.addEventListener(evt, fn, false);}
  else {element.attachEvent('on'+evt, fn);}
}

function _getParentElement(element, id) {
  // sometimes mouse event return the child element of actual element we need, so we need to check parent element
  // Chrome and Firefox use parentNode, while Opera uses offsetParent
  while(element.parentNode) {
    if( element.id == id ) {return element;}
    element = element.parentNode;
  }
  while(element.offsetParent) {
    if( element.id == id ) {return element;}
    element = element.offsetParent;
  }
  return null;
}

function onDiv1Click(evt) {
  if(!evt) {evt = window.event;}
  var target = evt.target || evt.srcElement;
  document.getElementById("info").innerHTML = target.id + " clicked";
  if (target.id != 'div1') {
    var ediv1 = _getParentElement(target, 'div1');
    document.getElementById("info").innerHTML += '<br />' + ediv1.id + ' element was gotten';
  }
}

function addevt() {
  _addEventListener('click', document.getElementById("div1"), onDiv1Click);
  document.getElementById("info").innerHTML = "only div1 onclick event registered";
}
*/

// check what element was clicked
/*
function whatever(e){
    var e=e? e : window.event;
    var event_element=e.target? e.target : e.srcElement;
    alert(event_element.tagName);
}
document.onclick=whatever;
*/
