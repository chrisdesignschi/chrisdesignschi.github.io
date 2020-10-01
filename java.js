function openTab(tabName) {

	var i;
	var x = document.getElementsByClassName("tab");
	for (i = 0; i < x.length; i++) {
	x[i].style.display = "none";	
	}
	document.getElementById(tabName).style.display = "inline-grid";	
	}

function menuOpen(x) {

	var x = document.getElementById("box");
	if (x.style.top === "0px") {
	x.style.top = "-300px";
	} else {
	x.style.top = "0px";
	}

	var x = document.getElementById("overlay");
	if (x.style.opacity === "0.7") {
	x.style.opacity = "0";
	} else {
	x.style.opacity = "0.7";
	}

	var x = document.getElementById("overlay");
	if (x.style.visibility === "visible") {
	x.style.visibility = "hidden";
	} else {
	x.style.visibility = "visible";
	}

	var x = document.getElementById("activator");
	x.classList.toggle("change");

}

/* danger zone */

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