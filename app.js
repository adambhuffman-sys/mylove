(function(){
"use strict";
var P=window.PROJECTS,TOTAL=350,app=document.getElementById("app");
var bar=document.getElementById("bar"),back=document.getElementById("back"),barR=document.getElementById("barR"),
    prog=document.getElementById("progress"),fill=document.getElementById("progressFill"),
    themeMeta=document.querySelector('meta[name="theme-color"]'),BASE_THEME="#FBF6EE";
var KEY="pegs.v1",state={checks:{},steps:{},math:[]};
try{var s=JSON.parse(localStorage.getItem(KEY));if(s&&typeof s==="object")state=Object.assign(state,s)}catch(e){}
function save(){try{localStorage.setItem(KEY,JSON.stringify(state))}catch(e){}}
function $(sel,el){return(el||document).querySelector(sel)}
function $$(sel,el){return Array.prototype.slice.call((el||document).querySelectorAll(sel))}
function esc(t){return String(t).replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
var CHECK='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>';
var ARROW='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
function lv(n){return'<span class="lv" aria-hidden="true">'+[1,2,3].map(function(i){return'<i class="'+(i<=n?"on":"")+'"></i>'}).join("")+"</span>"}
function done(p){return(state.steps[p.id]||[]).length}
var COLORS=["magenta","orange","yellow","green","sky","royal","purple","pink","red"];

/* ---------- home ---------- */
var homeScroll=0;
function home(){
  var sw=["magenta","orange","yellow","green","sky","royal","purple","white","red","pink"].map(function(c){return'<i style="background:var(--c-'+c+')"></i>'}).join("");
  var cards=P.map(function(p){
    var pct=Math.round(done(p)/p.steps.length*100);
    return'<a class="card" href="#/p/'+p.id+'" style="--tint:'+p.tint+';--accent:'+p.accent+'" aria-label="'+esc(p.title)+', '+p.levelLabel+', '+p.time+'">'+
      '<div class="ph"><img src="'+p.card+'" width="800" height="800" alt="'+esc(p.imgs[0].alt)+'" loading="lazy" decoding="async"></div>'+
      '<div class="tx"><div class="row1"><span class="num">'+p.n+'</span>'+(pct?'<div class="ring" style="--p:'+pct+'" aria-label="'+pct+'% done"><span>'+pct+'</span></div>':"")+"</div>"+
      "<h2>"+esc(p.title)+"</h2><p>"+esc(p.hook)+"</p>"+
      '<div class="chips"><span class="chip">'+lv(p.level)+p.levelLabel+'</span><span class="chip">'+p.time+'</span><span class="chip">~'+p.pins+' pegs</span></div>'+
      '<span class="go" aria-hidden="true">'+ARROW+"</span></div></a>"}).join("");
  var tg=P.map(function(p){return'<button class="tg" data-id="'+p.id+'" aria-pressed="false" style="--c:'+p.accent+'"><span class="sw">'+CHECK.replace('width="18" height="18"','width="14" height="14"')+'</span><span class="nm">'+esc(p.title)+'</span><span class="ct">'+p.pins+"</span></button>"}).join("");
  app.innerHTML='<div class="view"><section class="hero"><div class="eyebrow">Mini wooden pegs, a lot of them</div><h1>Six things to make with <em>350</em> tiny pegs.</h1><p>Pick one, or stack a few. Every idea has mockups, a supplies list, and a full how-to.</p><div class="mosaic" aria-label="Concept mockups of finished projects"><img src="img/photos/wreath-1.webp" width="864" height="1080" alt="Mockup of a rainbow peg wreath on a white door" fetchpriority="high" decoding="async"><img src="img/photos/card-mosaic-2.webp" width="800" height="800" alt="Mockup of a sunset panel made from pegs" decoding="async"><img src="img/photos/card-pots-1.webp" width="800" height="800" alt="Mockup of herb pots wearing a crown of pegs" decoding="async"></div><div class="swatches" aria-hidden="true">'+sw+"</div></section>"+
    '<section class="list" aria-label="Project ideas">'+cards+"</section>"+
    '<section class="math" aria-labelledby="mh"><h2 id="mh">Pin math</h2><p>Tap projects to see how far 350 goes.</p><div class="bar350" id="b350" role="img" aria-label="Pegs used"></div><div class="readout"><strong id="used">0</strong><span id="left">350 left</span></div><div class="toggles">'+tg+'</div><div class="presets"><button class="pre" data-pre="a">Weekend combo</button><button class="pre" data-pre="b">Go big</button><button class="pre ghost" data-pre="x">Clear</button></div></section>'+
    '<p class="fine">Peg counts are estimates for pegs about 1⅜ in long and a little over ¼ in wide. Do a quick dry-lay first and adjust.</p></div>';
  function paint(){
    var used=0,html="";
    state.math=state.math.filter(function(id){return P.some(function(p){return p.id===id})});
    state.math.forEach(function(id){var p=P.filter(function(q){return q.id===id})[0];used+=p.pins;html+='<b style="flex:'+p.pins+' 1 0;background:'+p.accent+'" title="'+esc(p.title)+'"></b>'});
    var b=$("#b350");b.innerHTML=html+(used<TOTAL?'<b style="flex:'+(TOTAL-used)+' 1 0;background:transparent;border:0"></b>':"");
    b.classList.toggle("over",used>TOTAL);
    $("#used").textContent=used+" / "+TOTAL;
    var l=$("#left");l.className=used>TOTAL?"warn":"";l.textContent=used>TOTAL?"Over by "+(used-TOTAL)+". Skip one.":(TOTAL-used)+" left";
    b.setAttribute("aria-label",used+" of "+TOTAL+" pegs used");
    $$(".tg").forEach(function(t){t.setAttribute("aria-pressed",state.math.indexOf(t.dataset.id)>-1)});save()}
  $$(".tg").forEach(function(t){t.onclick=function(){var i=state.math.indexOf(t.dataset.id);i>-1?state.math.splice(i,1):state.math.push(t.dataset.id);paint()}});
  $$(".pre").forEach(function(b){b.onclick=function(){state.math=b.dataset.pre==="a"?["memory-line","confetti-frame","peg-wreath"]:b.dataset.pre==="b"?["gradient-mosaic","sunburst-mirror"]:[];paint()}});
  paint();
}

/* ---------- project ---------- */
function project(p,idx){
  var next=P[(idx+1)%P.length];
  var chk=state.checks[p.id]=state.checks[p.id]||[],sd=state.steps[p.id]=state.steps[p.id]||[];
  var slides=p.imgs.map(function(m,i){return'<figure class="slide" id="sl'+i+'"><div class="im" style="aspect-ratio:'+m.ratio+'"><span class="tag '+m.kind+'">'+(m.kind==="photo"?"Concept mockup":"Diagram")+'</span><img src="'+m.src+'" width="'+(m.ratio==="4 / 3"?1000:864)+'" height="'+(m.ratio==="4 / 3"?750:1080)+'" alt="'+esc(m.alt)+'" '+(i?'loading="lazy" ':'fetchpriority="high" ')+'decoding="async"></div><figcaption>'+esc(m.cap)+"</figcaption></figure>"}).join("");
  var pager=p.imgs.length>1?'<div class="pager" role="group" aria-label="Mockups">'+p.imgs.map(function(m,i){return'<button aria-label="Mockup '+(i+1)+' of '+p.imgs.length+'"'+(i?"":' aria-current="true"')+"><i></i></button>"}).join("")+"</div>":"";
  var sup=p.supplies.map(function(t,i){return'<li><button class="chk" role="checkbox" aria-checked="'+(chk.indexOf(i)>-1)+'" data-i="'+i+'"><span class="box">'+CHECK+'</span><span class="lb">'+esc(t)+"</span></button></li>"}).join("");
  var steps=p.steps.map(function(s,i){return'<li class="step" data-i="'+i+'"><button aria-pressed="false"><span class="sn"><span>'+(i+1)+"</span>"+CHECK.replace('width="18" height="18"','width="22" height="22"')+'</span><h3>'+esc(s.t)+'</h3></button><div class="bd"><p>'+esc(s.b)+"</p>"+(s.tip?'<div class="tip"><b>'+s.tip[0]+"</b>"+esc(s.tip[1])+"</div>":"")+"</div></li>"}).join("");
  app.innerHTML='<div class="view" style="--accent:'+p.accent+";--tint:"+p.tint+'">'+
    '<div class="slides" id="slides" tabindex="0" aria-label="Mockups, swipe sideways">'+slides+"</div>"+pager+
    '<div class="phead"><span class="num">IDEA '+p.n+" / 0"+P.length+"</span><h1>"+esc(p.title)+"</h1><p>"+esc(p.hook)+"</p>"+
    '<div class="facts"><div class="fact"><small>Difficulty</small><b>'+lv(p.level)+p.levelLabel+'</b></div><div class="fact"><small>Time</small><b>'+p.time+'</b></div><div class="fact"><small>Pegs</small><b>~'+p.pins+'</b></div><div class="fact"><small>Budget</small><b>'+p.budget+'</b></div></div>'+
    '<div class="share"><div class="t"><span>Uses <b>'+Math.round(p.pins/TOTAL*100)+'%</b> of your 350</span><b>'+(TOTAL-p.pins)+' left over</b></div><div class="b"><i style="width:'+Math.min(100,p.pins/TOTAL*100)+'%"></i></div></div></div>'+
    '<section class="sec" aria-labelledby="sh"><h2 id="sh">You\'ll need <small id="sc"></small></h2><p>Tap to check things off as you gather them.</p><ul class="checks">'+sup+"</ul></section>"+
    '<section class="sec" aria-labelledby="hh"><h2 id="hh">How to <small id="stc"></small></h2><p>Tap a step when it\'s done. Your progress is saved on this phone.</p><ol class="steps">'+steps+'</ol></section>'+
    '<div class="fin" id="fin"><h3>That\'s a wrap.</h3><p>Step back and admire it.</p><a class="btn" href="#/p/'+next.id+'">Next: '+esc(next.title)+"</a></div>"+
    '<div class="next"><a href="#/p/'+next.id+'" style="--ntint:'+next.tint+'"><img src="'+next.card+'" alt="" width="84" height="84" loading="lazy"><span><small>Next idea</small><b>'+esc(next.title)+'</b></span><span class="arr" aria-hidden="true">'+ARROW+"</span></a></div>"+
    '<div class="foot"><a class="btn line" href="#/">All ideas</a><button class="btn line" id="reset">Reset checklist</button></div></div>';
  /* carousel */
  var sl=$("#slides"),dots=$$(".pager button");
  function cur(){var w=$(".slide",sl);if(!w)return 0;var step=w.getBoundingClientRect().width+10;return Math.max(0,Math.min(p.imgs.length-1,Math.round(sl.scrollLeft/step)))}
  var raf;sl.addEventListener("scroll",function(){cancelAnimationFrame(raf);raf=requestAnimationFrame(function(){var c=cur();dots.forEach(function(d,i){i===c?d.setAttribute("aria-current","true"):d.removeAttribute("aria-current")})})},{passive:true});
  dots.forEach(function(d,i){d.onclick=function(){var t=$("#sl"+i);sl.scrollTo({left:t.offsetLeft-(sl.clientWidth-t.offsetWidth)/2,behavior:"smooth"})}});
  /* supplies */
  function cnt(){$("#sc").textContent=chk.length+" / "+p.supplies.length}
  $$(".chk").forEach(function(b){b.onclick=function(){var i=+b.dataset.i,k=chk.indexOf(i);k>-1?chk.splice(k,1):chk.push(i);b.setAttribute("aria-checked",k===-1);cnt();save()}});
  /* steps */
  function paintSteps(){
    var first=-1;
    $$(".step").forEach(function(el){var i=+el.dataset.i,d=sd.indexOf(i)>-1;el.classList.toggle("done",d);$("button",el).setAttribute("aria-pressed",d);if(!d&&first<0)first=i});
    $$(".step").forEach(function(el){el.classList.toggle("current",+el.dataset.i===first)});
    $("#stc").textContent=sd.length+" / "+p.steps.length;
    $("#fin").classList.toggle("show",sd.length===p.steps.length);
    barR.textContent=sd.length?sd.length+"/"+p.steps.length+" steps":"";
    fill.style.width=(sd.length/p.steps.length*100)+"%";prog.hidden=false;
  }
  $$(".step>button").forEach(function(b){b.onclick=function(){var el=b.parentNode,i=+el.dataset.i,k=sd.indexOf(i);k>-1?sd.splice(k,1):sd.push(i);paintSteps();save();
    if(k===-1){var n=$$(".step")[i+1];if(n&&!matchMedia("(prefers-reduced-motion: reduce)").matches){var r=n.getBoundingClientRect();if(r.top>window.innerHeight*.7||r.top<60)window.scrollBy({top:r.top-120,behavior:"smooth"})}}}});
  $("#reset").onclick=function(){if(confirm("Clear all checked items and steps for this project?")){chk.length=0;sd.length=0;$$(".chk").forEach(function(b){b.setAttribute("aria-checked","false")});cnt();paintSteps();save()}};
  cnt();paintSteps();
  themeMeta.setAttribute("content",p.tint);
}

/* ---------- router ---------- */
var inProject=false;
function route(){
  var h=location.hash,m=h.match(/^#\/p\/([\w-]+)/);
  if(!inProject)homeScroll=window.scrollY;
  var idx=m?P.map(function(p){return p.id}).indexOf(m[1]):-1;
  themeMeta.setAttribute("content",BASE_THEME);barR.textContent="";prog.hidden=true;fill.style.width="0";
  if(idx>-1){inProject=true;back.hidden=false;project(P[idx],idx);document.title=P[idx].title+" · 350 Pegs";window.scrollTo(0,0)}
  else{var was=inProject;inProject=false;back.hidden=true;home();document.title="350 Pegs: six things to make";window.scrollTo(0,was?homeScroll:0)}
}
window.addEventListener("hashchange",route);
route();
})();
