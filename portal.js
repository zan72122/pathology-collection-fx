/* 演出ポータル: 共通トリガー（全機器共通、モノクロ） */
(function(){
var B=location.pathname.replace(/[^/]*$/,'');
// ルート絶対パス('/x.glb')を各機器のサブパスへ写す
function fix(u){return (typeof u==='string'&&u[0]==='/'&&u[1]!=='/'&&u.indexOf(B)!==0)?B+u.slice(1):u}
var of=window.fetch;window.fetch=function(i,o){if(typeof i==='string')i=fix(i);else if(i&&i.url&&i.url.indexOf(location.origin+'/')===0&&new URL(i.url).pathname.indexOf(B)!==0){i=new Request(location.origin+fix(new URL(i.url).pathname),i)}return of.call(this,i,o)};
var xo=XMLHttpRequest.prototype.open;XMLHttpRequest.prototype.open=function(m,u){var a=[].slice.call(arguments);if(typeof u==='string'){if(u.indexOf(location.origin+'/')===0){var p=u.slice(location.origin.length);a[1]=location.origin+fix(p)}else a[1]=fix(u)}return xo.apply(this,a)};
// AudioContext を集め、最初のタッチで再開（iOS）
var ACs=[],AC=window.AudioContext||window.webkitAudioContext;
if(AC){var W=function(){var c=new (Function.prototype.bind.apply(AC,[null].concat([].slice.call(arguments))))();ACs.push(c);return c};W.prototype=AC.prototype;window.AudioContext=W;if(window.webkitAudioContext)window.webkitAudioContext=W}
function unlock(){ACs.forEach(function(c){if(c.state!=='running')c.resume()})}
['pointerdown','touchend','click','keydown'].forEach(function(e){addEventListener(e,unlock,true)});
var q=new URLSearchParams(location.search),FX=window.__FX_NAME__,inFx=q.has('fx');
var css='.fxp{position:fixed;z-index:2147483000;-webkit-tap-highlight-color:transparent;touch-action:manipulation;user-select:none;-webkit-user-select:none}'+
'#fxorb{right:max(18px,env(safe-area-inset-right));bottom:max(18px,env(safe-area-inset-bottom));width:64px;height:64px;border-radius:50%;border:0;padding:0;background:radial-gradient(circle,#fff 0 9px,#fff0 10px),radial-gradient(circle,#0000 0 21px,#fffc 22px 24px,#0000 25px),#000a;box-shadow:0 0 18px #fff8,inset 0 0 12px #fff4;cursor:pointer}'+
'#fxorb:before,#fxorb:after{content:"";position:absolute;inset:0;border-radius:50%;border:2px solid #fff;animation:fxr 2.4s ease-out infinite;pointer-events:none}#fxorb:after{animation-delay:1.2s}'+
'@keyframes fxr{0%{transform:scale(.55);opacity:.9}100%{transform:scale(1.9);opacity:0}}'+
'#fxorb:active{transform:scale(.9)}'+
'#fxveil{inset:0;pointer-events:none;background:radial-gradient(circle at var(--x) var(--y),#0000 0,#0000 var(--r),#fff calc(var(--r) + 2px),#000 calc(var(--r) + 40px));opacity:0;transition:opacity .2s}'+
'#fxring{pointer-events:none;border:2px solid #fff;border-radius:50%;width:10px;height:10px;opacity:0}'+
'#fxx{left:max(14px,env(safe-area-inset-left));top:max(14px,env(safe-area-inset-top));width:40px;height:40px;border-radius:50%;border:1px solid #fff6;background:#0008;color:#fff;font:20px/38px sans-serif;text-align:center;padding:0;cursor:pointer}'+
'#fxsnd{left:max(64px,calc(env(safe-area-inset-left) + 60px));top:max(14px,env(safe-area-inset-top));width:40px;height:40px;border-radius:50%;border:1px solid #fff6;background:#0008;color:#fff;font:18px/38px sans-serif;padding:0;animation:fxb 1.2s ease-in-out infinite}@keyframes fxb{50%{box-shadow:0 0 0 8px #fff3}}'+
'#fxin{inset:0;background:#fff;pointer-events:none;transition:opacity 1.2s}';
var st=document.createElement('style');st.textContent=css;(document.head||document.documentElement).appendChild(st);
function sfxDive(){try{var c=new AC();ACs.push(c);c.resume();var t=c.currentTime,o=c.createOscillator(),g=c.createGain();o.type='sawtooth';o.frequency.setValueAtTime(70,t);o.frequency.exponentialRampToValueAtTime(900,t+1.1);g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(.25,t+.9);g.gain.exponentialRampToValueAtTime(.0001,t+1.3);var f=c.createBiquadFilter();f.frequency.setValueAtTime(300,t);f.frequency.exponentialRampToValueAtTime(6000,t+1.1);o.connect(f).connect(g).connect(c.destination);o.start(t);o.stop(t+1.4);
var n=c.createBuffer(1,c.sampleRate*1.3,c.sampleRate),d=n.getChannelData(0);for(var i=0;i<d.length;i++)d[i]=(Math.random()*2-1)*Math.pow(i/d.length,2);var s=c.createBufferSource(),ng=c.createGain(),bp=c.createBiquadFilter();bp.type='bandpass';bp.frequency.setValueAtTime(400,t);bp.frequency.exponentialRampToValueAtTime(5000,t+1.2);ng.gain.value=.35;s.buffer=n;s.connect(bp).connect(ng).connect(c.destination);s.start(t);
var p=c.createOscillator(),pg=c.createGain();p.frequency.value=1320;pg.gain.setValueAtTime(.0001,t);pg.gain.setValueAtTime(.2,t+.02);pg.gain.exponentialRampToValueAtTime(.0001,t+.35);p.connect(pg).connect(c.destination);p.start(t);p.stop(t+.4)}catch(e){}}
function go(){var u=new URL(location.href);u.searchParams.set('fx',FX);u.searchParams.delete('fxT');location.href=u.toString()}
function back(){var u=new URL(location.href);u.searchParams.delete('fx');u.searchParams.delete('fxT');location.href=u.toString()}
function mount(){
 if(!inFx){if(!FX)return;var b=document.createElement('button');b.id='fxorb';b.className='fxp';b.setAttribute('aria-label','演出');document.body.appendChild(b);
  b.addEventListener('click',function(e){e.stopPropagation();if(b.dataset.on)return;b.dataset.on=1;unlock();sfxDive();var r=b.getBoundingClientRect(),x=r.left+r.width/2,y=r.top+r.height/2;
   var v=document.createElement('div');v.id='fxveil';v.className='fxp';document.body.appendChild(v);v.style.setProperty('--x',x+'px');v.style.setProperty('--y',y+'px');
   var cv=document.querySelector('canvas');if(cv){cv.style.transition='transform 1.2s cubic-bezier(.6,0,.9,.4),filter 1.2s';cv.style.transformOrigin=x+'px '+y+'px'}
   setTimeout(go,2600);var t0=performance.now(),M=Math.hypot(innerWidth,innerHeight);(function f(){var k=Math.min(1,(performance.now()-t0)/1200);v.style.opacity=1;v.style.setProperty('--r',(M*(1-k)*(1-k))+'px');if(cv){cv.style.transform='scale('+(1+k*k*5)+') rotate('+(k*k*25)+'deg)';cv.style.filter='blur('+(k*6)+'px) brightness('+(1+k*2)+')'}if(k<1)requestAnimationFrame(f);else{v.style.background='#fff';setTimeout(go,60)}})();
   for(var i=0;i<4;i++)(function(i){setTimeout(function(){var g=document.createElement('div');g.id='fxring';g.className='fxp';g.style.left=x-5+'px';g.style.top=y-5+'px';document.body.appendChild(g);g.animate([{transform:'scale(1)',opacity:1},{transform:'scale('+M/4+')',opacity:0}],{duration:700,easing:'ease-in'})},i*220)})(i)});
 }else{var w=document.createElement('div');w.id='fxin';w.className='fxp';document.documentElement.appendChild(w);setTimeout(function(){w.style.opacity=0},50);setTimeout(function(){w.remove()},1400);
  var x=document.createElement('button');x.id='fxx';x.className='fxp';x.textContent='✕';x.setAttribute('aria-label','戻る');x.addEventListener('click',function(e){e.stopPropagation();back()});var H=document.documentElement;H.appendChild(x);setInterval(function(){if(!x.isConnected)H.appendChild(x)},500);
  var s=document.createElement('button');s.id='fxsnd';s.className='fxp';s.textContent='♪';s.style.display='none';s.addEventListener('click',function(e){e.stopPropagation();unlock();s.remove()});H.appendChild(s);
  setInterval(function(){if(!s.isConnected)return;var need=ACs.some(function(c){return c.state!=='running'});s.style.display=need?'':'none';if(!need&&ACs.length&&ACs.every(function(c){return c.state==='running'}))s.remove()},700);
 }}
if(document.body)mount();else addEventListener('DOMContentLoaded',mount);
})();
