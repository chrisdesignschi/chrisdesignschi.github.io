/*
  CZ App Navigator v1.0
  
  Drop-in universal navigation for chriszhu.com apps.
  
  USAGE:
  Add before </body> in any page:
    <script src="/shared/cz-nav.js" data-current="APP_ID"></script>
  
  APP IDs: portfolio, gratitude, menu, todo, muaytracker
  
  TO ADD A NEW APP:
  Add an entry to the APPS array below:
    { id: "myapp", name: "My App", desc: "Short description", icon: "ICON_NAME", href: "https://chriszhu.com/myapp/" }
  
  Available icons: briefcase, heart, utensils, check, flame, grid
  To add a custom icon, add an SVG path string to the ICONS object.
  
  PROMPT FOR VIBECODING:
  Include this in your prompt when building new apps:
  "Add the CZ universal nav widget to index.html. Before </body>, add:
   <script src='/shared/cz-nav.js' data-current='NEW_APP_ID'></script>"
*/

(function() {
  var APPS = [
    { id: "portfolio", name: "Portfolio", desc: "Design work", icon: "briefcase", href: "https://chriszhu.com" },
    { id: "gratitude", name: "Gratitude", desc: "Daily journal", icon: "heart", href: "https://chriszhu.com/gratitude/" },
    { id: "menu", name: "Menu", desc: "Tinder for my fridge", icon: "utensils", href: "https://chriszhu.com/menu/" },
    { id: "todo", name: "To Do", desc: "Task tracker", icon: "check", href: "https://chriszhu.com/todo/" },
    { id: "muaytracker", name: "Muay Tracker", desc: "Building fight IQ", icon: "flame", href: "https://chriszhu.com/muaytracker/" },
  ];

  var ICONS = {
    briefcase: '<path d="M20 7H4a1 1 0 00-1 1v10a1 1 0 001 1h16a1 1 0 001-1V8a1 1 0 00-1-1z" stroke="currentColor" stroke-width="1.5" fill="none"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" stroke="currentColor" stroke-width="1.5" fill="none"/>',
    heart: '<path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 000-7.78z" stroke="currentColor" stroke-width="1.5" fill="none"/>',
    utensils: '<path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 002-2V2M7 2v20M21 15V2l-4 4-4-4v13a4 4 0 004 4h0a4 4 0 004-4z" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
    check: '<path d="M22 11.08V12a10 10 0 11-5.93-9.14" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round"/><path d="M22 4L12 14.01l-3-3" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
    flame: '<path d="M12 22c4.97 0 8-3.03 8-8 0-2.52-2.04-5.65-4-7.5-.78-.74-2.22.1-2 1.17.38 1.84-.5 3.33-2 3.33-2.15 0-3.5-1.85-3-4 .36-1.55-.74-2.78-2-2-2.43 1.5-3 3.76-3 7 0 4.97 3.03 8 8 8z" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
    grid: '<rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" stroke-width="1.5" fill="none"/><rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" stroke-width="1.5" fill="none"/><rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" stroke-width="1.5" fill="none"/><rect x="14" y="14" width="7" height="7" rx="1" stroke="currentColor" stroke-width="1.5" fill="none"/>',
  };

  var scriptTag = document.currentScript || document.querySelector('script[data-current]');
  var currentId = scriptTag ? scriptTag.getAttribute('data-current') : '';

  if (!document.querySelector('link[href*="Newsreader"]')) {
    var f = document.createElement('link'); f.rel = 'stylesheet';
    f.href = 'https://fonts.googleapis.com/css2?family=Newsreader:wght@400;500;600&display=swap';
    document.head.appendChild(f);
  }
  if (!document.querySelector('link[href*="geist"]')) {
    var g = document.createElement('link'); g.rel = 'stylesheet';
    g.href = 'https://cdn.jsdelivr.net/npm/geist@1.2.0/dist/fonts/geist-sans/style.min.css';
    document.head.appendChild(g);
  }

  var style = document.createElement('style');
  style.textContent = '#cz-nav-root{position:fixed;bottom:80px;right:16px;z-index:9999;font-family:"Geist","Inter",-apple-system,sans-serif}@media(min-width:768px){#cz-nav-root{bottom:20px;right:20px}}#cz-nav-btn{width:40px;height:40px;border-radius:12px;border:1px solid #2a2a2a;background:#141414;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:border-color .15s,transform .15s;padding:0;outline:none}#cz-nav-btn:hover{border-color:#5046e5}#cz-nav-btn:active{transform:scale(.95)}#cz-nav-btn svg{color:#999;transition:color .15s}#cz-nav-btn:hover svg{color:#fff}#cz-nav-btn.open{border-color:#5046e5;background:#1a1a1a}#cz-nav-btn.open svg{color:#fff}#cz-nav-dropdown{position:absolute;bottom:48px;right:0;width:260px;background:#141414;border:1px solid #2a2a2a;border-radius:14px;padding:8px;opacity:0;transform:translateY(8px) scale(.96);pointer-events:none;transition:opacity .2s ease,transform .2s ease}#cz-nav-dropdown.open{opacity:1;transform:translateY(0) scale(1);pointer-events:auto}.cz-nav-item{display:flex;align-items:center;gap:12px;padding:10px 12px;border-radius:10px;text-decoration:none;transition:background .1s;cursor:pointer}.cz-nav-item:hover{background:#1f1f1f}.cz-nav-item.active{background:#1a1a2a}.cz-nav-item-icon{width:36px;height:36px;border-radius:10px;background:#1a1a1a;border:1px solid #2a2a2a;display:flex;align-items:center;justify-content:center;flex-shrink:0}.cz-nav-item.active .cz-nav-item-icon{background:#1e1a3a;border-color:#3d3489}.cz-nav-item-icon svg{width:16px;height:16px;color:#666}.cz-nav-item.active .cz-nav-item-icon svg{color:#afa9ec}.cz-nav-item-text{flex:1;min-width:0}.cz-nav-item-name{font-family:"Newsreader",Georgia,serif;font-size:14px;font-weight:500;color:#ccc;line-height:1.2}.cz-nav-item.active .cz-nav-item-name{color:#fff}.cz-nav-item-desc{font-size:11px;color:#555;margin-top:1px;line-height:1.2}.cz-nav-divider{height:1px;background:#1f1f1f;margin:4px 12px}';
  document.head.appendChild(style);

  var nav = document.createElement('div');
  nav.id = 'cz-nav-root';

  var btnHtml = '<button id="cz-nav-btn" aria-label="App navigation"><svg width="18" height="18" viewBox="0 0 24 24" fill="none">' + ICONS.grid + '</svg></button>';
  var dropHtml = '<div id="cz-nav-dropdown">';

  APPS.forEach(function(app) {
    var isActive = app.id === currentId;
    dropHtml += '<a class="cz-nav-item' + (isActive ? ' active' : '') + '" href="' + app.href + '">';
    dropHtml += '<div class="cz-nav-item-icon"><svg viewBox="0 0 24 24" fill="none">' + ICONS[app.icon] + '</svg></div>';
    dropHtml += '<div class="cz-nav-item-text">';
    dropHtml += '<div class="cz-nav-item-name">' + app.name + '</div>';
    dropHtml += '<div class="cz-nav-item-desc">' + app.desc + '</div>';
    dropHtml += '</div>';
    if (isActive) dropHtml += '<div style="width:6px;height:6px;border-radius:3px;background:#5046e5;flex-shrink:0"></div>';
    dropHtml += '</a>';
  });

  dropHtml += '</div>';
  nav.innerHTML = btnHtml + dropHtml;
  document.body.appendChild(nav);

  var dropdown = document.getElementById('cz-nav-dropdown');
  var btn = document.getElementById('cz-nav-btn');
  var isOpen = false;

  btn.addEventListener('click', function(e) {
    e.stopPropagation();
    isOpen = !isOpen;
    dropdown.classList.toggle('open', isOpen);
    btn.classList.toggle('open', isOpen);
  });
  document.addEventListener('click', function() {
    if (isOpen) { isOpen = false; dropdown.classList.remove('open'); btn.classList.remove('open'); }
  });
  dropdown.addEventListener('click', function(e) { e.stopPropagation(); });
})();
