function openTab(tabName) {

	var i, x, tablinks;
	var x = document.getElementsByClassName("tab");
	for (i = 0; i < x.length; i++) {
	x[i].style.display = "none";
	}
	document.getElementById(tabName).style.display = "inline-grid";
}

function omae1(moName) {

	var i, x, y, highlights;
	var x = document.getElementsByClassName("navitems");
	for (i = 0; i < x.length; i++) {
	x[i].style.color = "var(--font-color)";
	document.getElementById("1").style.color = "var(--accent-2)";

}}

function omae2(moName) {

	var i, x, y, highlights;
	var x = document.getElementsByClassName("navitems");
	for (i = 0; i < x.length; i++) {
	x[i].style.color = "var(--font-color)";
	document.getElementById("2").style.color = "var(--accent-2)";

}}

function omae3(moName) {

	var i, x, y, highlights;
	var x = document.getElementsByClassName("navitems");
	for (i = 0; i < x.length; i++) {
	x[i].style.color = "var(--font-color)";
	document.getElementById("3").style.color = "var(--accent-2)";

}}

function omae4(moName) {

	var i, x, y, highlights;
	var x = document.getElementsByClassName("navitems");
	for (i = 0; i < x.length; i++) {
	x[i].style.color = "var(--font-color)";
	document.getElementById("4").style.color = "var(--accent-2)";

}}

	/* this sets the container */

function menuOpen(x) {

	var x = document.getElementById("box");
	x.classList.toggle("bouncehouse");

	var x = document.getElementById("activator");
	x.classList.toggle("change");

	var x = document.getElementById("box");
	x.classList.toggle("magneto");

}


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