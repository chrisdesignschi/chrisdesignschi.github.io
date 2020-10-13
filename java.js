function openTab(tabName) {

	var i;
	var x = document.getElementsByClassName("tab");
	for (i = 0; i < x.length; i++) {
	x[i].style.display = "none";	
	}
	document.getElementById(tabName).style.display = "inline-grid";	
	}

	/* this sets the container */

function menuOpen(x) {

	var x = document.getElementById("box");
	x.classList.toggle("bouncehouse");

	var x = document.getElementById("box");

	x.classList.toggle("magneto");

	var x = document.getElementById("activator");
	x.classList.toggle("change");


}

// function boxBounce() {
// 		ar element, name, arr;
// 		element = document.getElementById("box");
// 		name = "boxbounce";
// 		arr = element.className.split(" ");
// 	if (arr.indexOf(name) == -1) {
// 		element.className += " " + name;
// 	}
// 	else {
// 		element.className -= " " + name;
// 	}
// }

/* box bounce */


/* night switch content */

const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
const currentTheme = localStorage.getItem('theme');

if (currentTheme) {
	document.documentElement.setAttribute('data-theme', currentTheme);
	
	if (currentTheme === 'dark') {
		toggleSwitch.checked = true;
	}
}

function switchTheme(e) {
	if (e.target.checked) {
		document.documentElement.setAttribute('data-theme', 'dark');
		localStorage.setItem('theme', 'dark');
	}
	else {		document.documentElement.setAttribute('data-theme', 'light');
			localStorage.setItem('theme', 'light');
	}	
}

toggleSwitch.addEventListener('change', switchTheme, false);

/** **/

function copyFunction() {
  var copyText = document.getElementById("copyInput");
  copyText.select();
  copyText.setSelectionRange(0, 99999);
  document.execCommand("copy");
  
  var tooltip = document.getElementById("tooltiptext2");
  tooltip.innerHTML = "Copied link!";
}