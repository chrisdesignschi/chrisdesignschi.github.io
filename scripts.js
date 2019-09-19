		// When the user scrolls the page, execute myFunction 
window.onscroll = function() {myFunction()};


// Get the header
var header = document.getElementById("nav");

x = document.getElementById("pf-cont").style;   
x2 = document.getElementById("pf-cont-2").style; 
x3 = document.getElementById("pf-cont-3").style;  

sx1 = document.getElementById("sec-cont1").style;   
sx2 = document.getElementById("sec-cont2").style; 
sx3 = document.getElementById("sec-cont3").style;    
sx4 = document.getElementById("sec-cont4").style;    
sx5 = document.getElementById("sec-cont5").style;    
sx6 = document.getElementById("sec-cont6").style;    


// Get the offset position of the navbar
var sticky = header.offsetTop;

// Add the sticky class to the header when you reach its scroll position. Remove "sticky" when you leave the scroll position
	function myFunction() {
		if (window.pageYOffset > sticky) {
		header.classList.add("sticky");
		}
		else {
		header.classList.remove("sticky");
		}
}

  function appear(divid){ 
    if(x.display == 'none' || x.display == ''){
    	x.display = 'block';
    }
    /* disappear */
	if(x.display == 'block' || x2.display == ''){
		x2.display = 'none';
	}
	if(x.display == 'block' || x3.display == ''){
		x3.display = 'none';
	}

	if(x.display == 'block' || sx1.display == ''){
		sx1.display = 'none';
	}
	if(x.display == 'block' || sx2.display == ''){
		sx2.display = 'none';
	}
	if(x.display == 'block' || sx3.display == ''){
		sx3.display = 'none';
	}
	if(x.display == 'block' || sx4.display == ''){
		sx4.display = 'none';
	}
	if(x.display == 'block' || sx5.display == ''){
		sx5.display = 'none';
	}
	if(x.display == 'block' || sx6.display == ''){
		sx6.display = 'none';
	}
  }

  function appear2(divid){ 
    if(x2.display == 'none' || x2.display == ''){
    	x2.display = 'block';
    }
    /* disappear */
	if(x2.display == 'block' || x.display == ''){
		x.display = 'none';
	}
	if(x2.display == 'block' || x3.display == ''){
		x3.display = 'none';
	}  

	if(x2.display == 'block' || sx1.display == ''){
	sx1.display = 'none';
	}
	if(x2.display == 'block' || sx2.display == ''){
		sx2.display = 'none';
	}
	if(x2.display == 'block' || sx3.display == ''){
		sx3.display = 'none';
	}
	if(x2.display == 'block' || sx4.display == ''){
		sx4.display = 'none';
	}
	if(x2.display == 'block' || sx5.display == ''){
		sx5.display = 'none';
	}
	if(x2.display == 'block' || sx6.display == ''){
		sx6.display = 'none';
	}
  }

  function appear3(divid){ 
    if(x3.display == 'none' || x3.display == ''){
    	x3.display = 'block';
    }
        /* disappear */
	if(x3.display == 'block' || x.display == ''){
		x.display = 'none';
	}
	if(x3.display == 'block' || x2.display == ''){
		x2.display = 'none';
	}

	if(x3.display == 'block' || sx1.display == ''){
		sx1.display = 'none';
	}
	if(x3.display == 'block' || sx2.display == ''){
		sx2.display = 'none';
	}
	if(x3.display == 'block' || sx3.display == ''){
		sx3.display = 'none';
	}
	if(x3.display == 'block' || sx4.display == ''){
		sx4.display = 'none';
	}
	if(x3.display == 'block' || sx5.display == ''){
		sx5.display = 'none';
	}
	if(x3.display == 'block' || sx6.display == ''){
		sx6.display = 'none';
	}
  }


function disappear(divid){
	x.display = 'none';
	window.location.hash = '#main-anchor';
}
function disappear2(divid){
	x2.display = 'none';
	window.location.hash = '#main-anchor';
}
function disappear3(divid){
	x3.display = 'none';
	window.location.hash = '#main-anchor';
}

/** 6 pf pieces below **/

function sec1(divid){ 
	if(sx1.display == 'none' || sx1.display == ''){
    sx1.display = 'block';
    }

    /* disappear */
	if(sx1.display == 'block' || sx2.display == ''){
		sx2.display = 'none';
	}
	if(sx1.display == 'block' || sx3.display == ''){
		sx3.display = 'none';
	}
	if(sx1.display == 'block' || sx4.display == ''){
		sx4.display = 'none';
	}
	if(sx1.display == 'block' || sx5.display == ''){
		sx5.display = 'none';
	}
	if(sx1.display == 'block' || sx6.display == ''){
		sx6.display = 'none';
	}

	if(sx1.display == 'block' || x.display == ''){
		x.display = 'none';
	}
	if(sx1.display == 'block' || x2.display == ''){
		x2.display = 'none';
	}
	if(sx1.display == 'block' || x3.display == ''){
		x3.display = 'none';
	}
}

function sec2(divid){ 
	if(sx2.display == 'none' || sx2.display == ''){
    sx2.display = 'block';
    }

    /* disappear */
	if(sx2.display == 'block' || sx1.display == ''){
		sx1.display = 'none';
	}
	if(sx2.display == 'block' || sx3.display == ''){
		sx3.display = 'none';
	}
	if(sx2.display == 'block' || sx4.display == ''){
		sx4.display = 'none';
	}
	if(sx2.display == 'block' || sx5.display == ''){
		sx5.display = 'none';
	}
	if(sx2.display == 'block' || sx6.display == ''){
		sx6.display = 'none';
	}

	if(sx2.display == 'block' || x.display == ''){
		x.display = 'none';
	}
	if(sx2.display == 'block' || x2.display == ''){
		x2.display = 'none';
	}
	if(sx2.display == 'block' || x3.display == ''){
		x3.display = 'none';
	}
}

function sec3(divid){ 
	if(sx3.display == 'none' || sx3.display == ''){
    sx3.display = 'block';
    }

    /* disappear */
	if(sx3.display == 'block' || sx1.display == ''){
		sx1.display = 'none';
	}
	if(sx3.display == 'block' || sx2.display == ''){
		sx2.display = 'none';
	}
	if(sx3.display == 'block' || sx4.display == ''){
		sx4.display = 'none';
	}
	if(sx3.display == 'block' || sx5.display == ''){
		sx5.display = 'none';
	}
	if(sx3.display == 'block' || sx6.display == ''){
		sx6.display = 'none';
	}

	if(sx3.display == 'block' || x.display == ''){
		x.display = 'none';
	}
	if(sx3.display == 'block' || x2.display == ''){
		x2.display = 'none';
	}
	if(sx3.display == 'block' || x3.display == ''){
		x3.display = 'none';
	}
}

function sec4(divid){ 
	if(sx4.display == 'none' || sx4.display == ''){
    sx4.display = 'block';
    }

    /* disappear */
	if(sx4.display == 'block' || sx1.display == ''){
		sx1.display = 'none';
	}
	if(sx4.display == 'block' || sx3.display == ''){
		sx3.display = 'none';
	}
	if(sx4.display == 'block' || sx2.display == ''){
		sx2.display = 'none';
	}
	if(sx4.display == 'block' || sx5.display == ''){
		sx5.display = 'none';
	}
	if(sx4.display == 'block' || sx6.display == ''){
		sx6.display = 'none';
	}

	if(sx4.display == 'block' || x.display == ''){
		x.display = 'none';
	}
	if(sx4.display == 'block' || x2.display == ''){
		x2.display = 'none';
	}
	if(sx4.display == 'block' || x3.display == ''){
		x3.display = 'none';
	}
}

function sec5(divid){ 
	if(sx5.display == 'none' || sx5.display == ''){
    sx5.display = 'block';
    }

    /* disappear */
	if(sx5.display == 'block' || sx1.display == ''){
		sx1.display = 'none';
	}
	if(sx5.display == 'block' || sx3.display == ''){
		sx3.display = 'none';
	}
	if(sx5.display == 'block' || sx4.display == ''){
		sx4.display = 'none';
	}
	if(sx5.display == 'block' || sx2.display == ''){
		sx2.display = 'none';
	}
	if(sx5.display == 'block' || sx6.display == ''){
		sx6.display = 'none';
	}

	if(sx5.display == 'block' || x.display == ''){
		x.display = 'none';
	}
	if(sx5.display == 'block' || x2.display == ''){
		x2.display = 'none';
	}
	if(sx5.display == 'block' || x3.display == ''){
		x3.display = 'none';
	}
}

function sec6(divid){ 
	if(sx6.display == 'none' || sx6.display == ''){
    sx6.display = 'block';
    }

    /* disappear */
	if(sx6.display == 'block' || sx1.display == ''){
		sx1.display = 'none';
	}
	if(sx6.display == 'block' || sx3.display == ''){
		sx3.display = 'none';
	}
	if(sx6.display == 'block' || sx4.display == ''){
		sx4.display = 'none';
	}
	if(sx6.display == 'block' || sx5.display == ''){
		sx5.display = 'none';
	}
	if(sx6.display == 'block' || sx2.display == ''){
		sx2.display = 'none';
	}

	if(sx6.display == 'block' || x.display == ''){
		x.display = 'none';
	}
	if(sx6.display == 'block' || x2.display == ''){
		x2.display = 'none';
	}
	if(sx6.display == 'block' || x3.display == ''){
		x3.display = 'none';
	}
}

function secd1(divid){
	sx1.display = 'none';
	window.location.hash = '#goup0';
}

function secd2(divid){
	sx2.display = 'none';
	window.location.hash = '#goup0';
}

function secd3(divid){
	sx3.display = 'none';
	window.location.hash = '#goup0';
}

function secd4(divid){
	sx4.display = 'none';
	window.location.hash = '#goup1';
}

function secd5(divid){
	sx5.display = 'none';
	window.location.hash = '#goup1';
}

function secd6(divid){
	sx6.display = 'none';
	window.location.hash = '#goup1';
}

(function() {
	scrollTo();
})();

function scrollTo() {
	var links = document.getElementsByTagName('a');
	for (var i = 0; i < links.length; i++) {
		var link = links[i];
		if ((link.href && link.href.indexOf('#') != -1) && ((link.pathname == location.pathname) || ('/' + link.pathname == location.pathname)) && (link.search == location.search)) {
			link.onclick = scrollAnchors;
		}
	}
}

function scrollAnchors(e, respond = null) {
	const distanceToTop = el => Math.floor(el.getBoundingClientRect().top);
	e.preventDefault();
	var targetID = (respond) ? respond.getAttribute('href') : this.getAttribute('href');
	const targetAnchor = document.querySelector(targetID);
	if (!targetAnchor) return;
	const originalTop = distanceToTop(targetAnchor);
	window.scrollBy({ top: originalTop, left: 0, behavior: 'smooth' });
	const checkIfDone = setInterval(function() {
		const atBottom = window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 2;
		if (distanceToTop(targetAnchor) === 0 || atBottom) {
			targetAnchor.tabIndex = '-1';
			targetAnchor.focus();
			window.history.pushState('', '', targetID);
			clearInterval(checkIfDone);
		}
	}, 100);
}


/* navbar stuff here */

function openNav(evt, navName) {
  var i, x, tablinks;
  x = document.getElementsByClassName("navtab");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablink");
  for (i = 0; i < x.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" w3-red", "");
  }
  document.getElementById(navName).style.display = "block";
  evt.currentTarget.className += " w3-red";
}