function openTab(tabName) {

	var i, x, tablinks;
	var x = document.getElementsByClassName("tab");
	for (i = 0; i < x.length; i++) {
	x[i].style.display = "none";
	}
	document.getElementById(tabName).style.display = "grid";
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
	x.classList.toggle("magneto");

	var x = document.getElementById("activator");
	x.classList.toggle("change");

}


/* night switch content */

const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
const toggleLocal = document.querySelector('.theme-switch input[type="checkbox"]');
const currentTheme = localStorage.getItem('theme');

if (currentTheme) {
	document.documentElement.setAttribute('data-theme', currentTheme);
	
	if (currentTheme === 'dark') {
		toggleSwitch.checked = true;
	}
}
/** this one above just makes the checkbox indicate **/

function switchTheme(e) {
	if (e.target.checked) {
		document.documentElement.setAttribute('data-theme', 'dark');
		localStorage.setItem('theme', 'dark');
	}
	else {		document.documentElement.setAttribute('data-theme', 'light');
		localStorage.setItem('theme', 'light');
	}	
}

function localTheme(e) {
	var today = new Date().getHours();
	if (today >= 7 && today <= 19) {
		document.documentElement.setAttribute('data-theme', 'light');
		localStorage.setItem('theme', 'light');
	}
	else {		document.documentElement.setAttribute('data-theme', 'dark');
		localStorage.setItem('theme', 'dark');
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

/* cont css begins */

function openArray(evt, arrayName) {
  var i, arraycontent, arraylinks;
  arraycontent = document.getElementsByClassName("arraycontent");
  for (i = 0; i < arraycontent.length; i++) {
    arraycontent[i].style.display = "none";
  }
  arraylinks = document.getElementsByClassName("arraylinks");
  for (i = 0; i < arraylinks.length; i++) {
    arraylinks[i].className = arraylinks[i].className.replace(" active", "");
  }
  document.getElementById(arrayName).style.display = "block";
  evt.currentTarget.className += " active";
}

function changeImg(img) {
	img.src = img.src.replace('png', 'gif');
}

function revertImg(img) {
	img.src = img.src.replace('gif', 'png');
}

/** **/