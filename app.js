const STORE='almo_systems_content_v1', CFG='almo_systems_backend_v1';
const DEFAULT={brand:'ALMOHANDIS - SYSTEMS',heroTitle:'من الفكرة إلى مشروع رقمي احترافي',heroDesc:'نصمم ونطور حلولاً رقمية ومشروعات متكاملة تساعدك على إطلاق فكرتك أو تطوير مشروعك القائم بثقة ووضوح.',ownerRole:'Software & Digital Solutions Engineer',ownerImage:'',phone:'01013376681',whatsapp:'96565704145',social:{facebook:'',instagram:'',tiktok:'',whatsapp:'https://wa.me/96565704145',youtube:'',linkedin:''},projects:[{id:'pr1',icon:'◈',name:'ENG. RAMI NABIL',desc:'التصميم والتطوير والحلول الرقمية المخصصة للأفراد والشركات.'},{id:'pr2',icon:'▣',name:'Digital Commerce',desc:'حلول المتاجر والمنصات وتجارب البيع الرقمية.'},{id:'pr3',icon:'⌘',name:'Business Systems',desc:'أنظمة الإدارة والأتمتة وربط العمليات.'}],products:(window.ALMO_SERVICES||[])};
let state=load(),active=0,dragStart=null,dragDelta=0,showcaseTimer=null,backend=null,channel=null,soundOn=false,adminUser=null,adminTab='services',pendingEdit=null;
function clone(x){return JSON.parse(JSON.stringify(x))}function load(){try{let x=JSON.parse(localStorage.getItem(STORE));return x&&Array.isArray(x.products)?{...clone(DEFAULT),...x}:clone(DEFAULT)}catch(e){return clone(DEFAULT)}}state.theme=state.theme||{preset:'aurora',motion:false};
if(['201013376681','01013376681'].includes(String(state.whatsapp||'')))state.whatsapp='96565704145';if(state.social&&/201013376681/.test(state.social.whatsapp||''))state.social.whatsapp='https://wa.me/96565704145';
state.style={titleAnim:'rise',headingColor:'',bodyColor:'',lightingMode:'gold',lightingColor:'#ffd36f',lightingIntensity:100,...(state.style||{})};
state.branding={name:state.brand||'ALMOHANDIS - SYSTEMS',subtitle:'DIGITAL BUSINESS ECOSYSTEM',logoUrl:'',mode:'glass',animation:'sweep',colorA:'#b77b28',colorB:'#0b1628',frameWidth:75,...(state.branding||{})};
try{let savedObj=JSON.parse(localStorage.getItem(STORE)||'{}');if(savedObj.branding){if(savedObj.branding.colorB==='#f4f6fa'||savedObj.branding.colorB==='#e8edf5')savedObj.branding.colorB='#091526';if(savedObj.branding.colorA==='#e7c779')savedObj.branding.colorA='#9a5806';state.branding={...state.branding,...savedObj.branding};}if(savedObj.style)state.style={...state.style,...savedObj.style};if(savedObj.theme)state.theme={...state.theme,...savedObj.theme}}catch(e){}
if(state.theme&&!state.theme.v2&&!state.theme.custom)state.theme={...state.theme,preset:'aurora',v2:true};
function cfg(){try{return JSON.parse(localStorage.getItem(CFG)||'{}')}catch(e){return {}}}function activeCfg(){let local=cfg(),pub=window.ALMO_SUPABASE_CONFIG||{};return pub.url&&pub.key?pub:local}
function esc(v){return String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}function toast(s){let t=document.getElementById('toast');t.textContent=s;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),2400)}function wa(){return 'https://wa.me/'+String(state.whatsapp||'96565704145').replace(/\D/g,'')}
function priceNum(p){let n=String(p||'').replace(/[^0-9.]/g,'');return Number(n)||0}function money(n){return new Intl.NumberFormat('ar-EG',{maximumFractionDigits:0}).format(n)+' ج.م'}
function play(type='tap'){if(!soundOn)return;try{let c=play.ctx||(play.ctx=new(window.AudioContext||window.webkitAudioContext)());let now=c.currentTime;let o=c.createOscillator(),g=c.createGain();o.connect(g);g.connect(c.destination);let f=type==='move'?440:type==='open'?660:type==='success'?880:520;o.type=type==='move'?'sine':'triangle';o.frequency.setValueAtTime(f,now);o.frequency.exponentialRampToValueAtTime(f*(type==='open'?1.65:.72),now+.13);g.gain.setValueAtTime(.0001,now);g.gain.exponentialRampToValueAtTime(.035,now+.018);g.gain.exponentialRampToValueAtTime(.0001,now+.19);o.start(now);o.stop(now+.2)}catch(e){}}
function visibleProducts(){return state.products.filter(p=>p.visible!==false)}function persist(localOnly=false){localStorage.setItem(STORE,JSON.stringify(state));render();if(backend&&!localOnly)syncSave();else if(!backend)toast('حُفظت التغييرات على هذا المتصفح فقط. فعّل الربط السحابي للمزامنة مع العملاء.');}
function renderBrand(override){let b=override||state.branding||{};let frame=document.getElementById('brandFrame'),name=document.getElementById('brandName'),logo=document.getElementById('brandLogo');if(!frame||!name)return;let raw=String(b.name||state.brand||'ALMOHANDIS - SYSTEMS').trim();let parts=raw.split(/\s*-\s*/);let left=parts.shift()||raw,right=parts.join(' - ');name.innerHTML='<span class="a"></span><span class="b"></span>';name.children[0].textContent=left;name.children[1].textContent=right?' - '+right:'';name.style.display=b.mode==='logo'?'none':'flex';frame.style.width=(window.innerWidth<=760?94:Math.max(55,Math.min(95,Number(b.frameWidth)||75)))+'%';frame.style.setProperty('--brand-a',b.colorA||'#e7c779');frame.style.setProperty('--brand-b',b.colorB||'#f4f6fa');frame.className=frame.className.replace(/\s?brand-(3d|sweep|float|pulse|rotate|spin3d|bounce|glow)\b/g,'');if(b.mode==='3d')frame.classList.add('brand-3d');if(b.animation&&b.animation!=='none')frame.classList.add('brand-'+b.animation);let sub=document.getElementById('brandSubtitle');sub.textContent=b.subtitle||'';sub.style.display=b.subtitle?'':'none';if(b.logoUrl){logo.src=b.logoUrl;logo.style.display='block'}else{logo.removeAttribute('src');logo.style.display='none'}}
window.addEventListener('resize',()=>renderBrand());
function render(){applyTheme();renderBrand();document.getElementById('heroTitle').innerHTML=esc(state.heroTitle).replace(/(مشروع رقمي احترافي|تطوير مشروعك القائم)/g,'<span>$1</span>');document.getElementById('heroDesc').textContent=state.heroDesc;document.getElementById('ownerRole').textContent=state.ownerRole;
const ownStrong=document.querySelector('.owner-meta strong');if(ownStrong&&state.ownerName)ownStrong.textContent=state.ownerName;
if(state.texts){
  const sH2=document.querySelector('#services .section-head h2'),sP=document.querySelector('#services .section-head p');
  if(sH2&&state.texts.servicesTitle)sH2.textContent=state.texts.servicesTitle;
  if(sP&&state.texts.servicesDesc)sP.textContent=state.texts.servicesDesc;
  const pH2=document.querySelector('#projects .section-head h2'),pP=document.querySelector('#projects .section-head p');
  if(pH2&&state.texts.projectsTitle)pH2.textContent=state.texts.projectsTitle;
  if(pP&&state.texts.projectsDesc)pP.textContent=state.texts.projectsDesc;
  const bH2=document.querySelector('#builder .section-head h2'),bP=document.querySelector('#builder .section-head p');
  if(bH2&&state.texts.builderTitle)bH2.textContent=state.texts.builderTitle;
  if(bP&&state.texts.builderDesc)bP.textContent=state.texts.builderDesc;
}let im=document.getElementById('ownerPhoto');if(state.ownerImage)im.src=state.ownerImage;document.getElementById('heroContact').href=wa();document.getElementById('footerWhats').href=wa();document.getElementById('year').textContent=new Date().getFullYear();renderSocial();renderCarousel();renderProjects();renderBuilder();}
const socialSvg={facebook:'<path d="M13.5 21v-8h2.7l.4-3.1h-3.1V8c0-.9.3-1.5 1.6-1.5h1.7V3.7c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2H7.3V13h2.8v8z"/>',instagram:'<rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="18" cy="6" r="1.2"/>',tiktok:'<path d="M15 3h3c.2 2 1.3 3.5 3 4v3.1c-2.2-.1-4.2-1.1-6-2.6v7.1a6.2 6.2 0 1 1-6.2-6.2c.4 0 .8 0 1.2.1v3.2a3 3 0 1 0 1.8 2.8V3z"/>',whatsapp:'<path d="M20 11.6a8 8 0 0 1-11.8 7L4 20l1.4-4A8 8 0 1 1 20 11.6ZM8.4 8.1c-.3 0-.6.2-.8.5-.2.3-.7.8-.7 1.8s.7 2 1 2.3c.2.3 1.4 2.2 3.5 3 .4.2.8.3 1 .3.5.1 1 .1 1.4-.1.4-.2 1.2-.5 1.4-1 .2-.5.2-.9.1-1-.1-.1-.3-.2-.6-.3l-1.5-.7c-.2-.1-.4-.1-.5.1l-.7.8c-.1.2-.3.2-.5.1-.3-.1-1.1-.4-1.8-1.1-.6-.5-1-1.2-1.1-1.5-.1-.2 0-.3.1-.4l.4-.5.2-.4c.1-.2 0-.3 0-.5l-.7-1.6c-.2-.4-.4-.4-.6-.4z"/>',youtube:'<path d="M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2 31 31 0 0 0 .5 12a31 31 0 0 0 .5 4.8 3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .5-4.8 31 31 0 0 0-.5-4.8ZM9.7 15.6V8.4l6.2 3.6z"/>',linkedin:'<path d="M5 3a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM3.2 8.5h3.6V21H3.2zM9 8.5h3.4v1.7h.1a3.8 3.8 0 0 1 3.4-1.9c3.6 0 4.3 2.4 4.3 5.5V21h-3.6v-6.4c0-1.5 0-3.4-2.1-3.4s-2.4 1.6-2.4 3.3V21H9z"/>'};
function renderSocial(){let labels={facebook:'Facebook',instagram:'Instagram',tiktok:'TikTok',whatsapp:'WhatsApp',youtube:'YouTube',linkedin:'LinkedIn'};document.getElementById('socialBar').innerHTML=Object.keys(labels).map(k=>state.social[k]?`<a class="social" href="${esc(state.social[k])}" target="_blank" rel="noopener" aria-label="${labels[k]}" title="${labels[k]}"><svg viewBox="0 0 24 24" aria-hidden="true">${socialSvg[k]}</svg></a>`:`<span class="social" style="opacity:.6;cursor:pointer" onclick="toast('أضف الرابط من لوحة المالك')" aria-label="${labels[k]} — أضف الرابط من الإدارة" title="أضف رابط ${labels[k]} من لوحة الإدارة"><svg viewBox="0 0 24 24">${socialSvg[k]}</svg></span>`).join('')}
function artSvg(p,i){const glyphs=[`<path d="M18 5h28v34H18z M24 13h16 M24 20h16 M24 27h10"/><path d="M13 11L8 16v29h28l8-7"/>`,`<path d="M10 15h44l-4 31H14z M8 9h48l-2 6H10z"/><path d="M22 23h20M22 31h14"/>`,`<rect x="19" y="5" width="26" height="46" rx="6"/><path d="M26 11h12M28 44h8"/>`,`<path d="M12 13h40v30H12z M20 21h24M20 29h18M20 37h12"/>`,`<rect x="8" y="12" width="48" height="34" rx="5"/><path d="M8 22h48M18 30h10M18 37h22"/>`,`<circle cx="32" cy="29" r="19"/><path d="M22 29h20M32 19v20M15 12l-5-5M49 12l5-5"/>`,`<path d="M32 6l22 13v25L32 57 10 44V19z"/><path d="M21 27h22M21 35h22"/>`,`<path d="M32 6l7 17 17 7-17 7-7 17-7-17-17-7 17-7z"/>`,`<path d="M13 18h38v28H13z M20 12h24M20 25h24M20 33h16"/>`,`<ellipse cx="32" cy="30" rx="23" ry="12"/><ellipse cx="32" cy="30" rx="11" ry="23"/><circle cx="32" cy="30" r="5"/>`,`<path d="M14 12h36v36H14z M22 21h20M22 29h20M22 37h12"/>`,`<path d="M32 7l20 11v25L32 55 12 43V18z M23 31l6 6 13-14"/>`];let g=glyphs[i%glyphs.length];return `<svg class="service-art" viewBox="0 0 64 64" fill="none" stroke="url(#artGold)" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><defs><linearGradient id="artGold" x1="8" y1="5" x2="57" y2="58"><stop stop-color="#fff4d4"/><stop offset=".42" stop-color="#b98b43"/><stop offset="1" stop-color="#607b98"/></linearGradient><linearGradient id="artFill" x1="10" y1="8" x2="52" y2="55"><stop stop-color="#fff" stop-opacity=".75"/><stop offset="1" stop-color="#b7c7d9" stop-opacity=".18"/></linearGradient></defs><circle cx="32" cy="32" r="27" fill="url(#artFill)" stroke="#c8a45e" stroke-opacity=".45"/>${g}</svg>`}
function layoutCarousel(offset){let ps=visibleProducts();if(!ps.length)return;let n=ps.length;document.querySelectorAll('#carousel .service-card').forEach((el,i)=>{let d=((i-offset)%n+n)%n;if(d>n/2)d-=n;let abs=Math.abs(d),x=d*clampCarouselX(),z=-abs*150,scale=Math.max(.48,1.02-abs*.19)+.14*Math.max(0,1-abs),rot=Math.max(-45,Math.min(45,d*-19)),op=abs>3?0:Math.max(.12,1-abs*.19);el.style.transform=`translateX(calc(-50% + ${x}px)) translateZ(${z}px) rotateY(${rot}deg) scale(${scale})`;el.style.opacity=op;el.style.zIndex=String(30-Math.round(abs));el.style.pointerEvents=abs>2?'none':'auto';el.classList.toggle('active',Math.round(offset)===i&&abs<.5);let p=ps[i];el.querySelector('.index').textContent=`${String(i+1).padStart(2,'0')} / ${String(n).padStart(2,'0')}`;el.querySelector('h3').textContent=svcText(p,'name');el.querySelector('.price').textContent=svcText(p,'price')||TR('حسب الطلب','On request');el.querySelector('.hint').textContent=(Math.round(offset)===i)?TR('اضغط لاستكشاف الخدمة','Tap to explore the service'):TR('اختر هذه الخدمة','Choose this service')});}
function artSvg(p,i){
  const id=String(p.id||'').replace(/[^a-zA-Z0-9_-]/g,'');
  return '<img class="service-art svc-img" src="assets/svc/'+id+'.webp" alt="" loading="lazy" data-arti="'+i+'" data-artid="'+id+'" onerror="this.onerror=null;this.outerHTML=artSvgLegacy({id:this.dataset.artid},Number(this.dataset.arti))">';
}
function renderCarousel(){let ps=visibleProducts();if(!ps.length){document.getElementById('carousel').innerHTML='<p style="text-align:center;color:#66758a">'+TR('لا توجد خدمات منشورة حالياً.','No published services yet.')+'</p>';return}active=((active%ps.length)+ps.length)%ps.length;let c=document.getElementById('carousel');let ids=[...c.querySelectorAll('.service-card')].map(x=>x.dataset.id);if(ids.join('|')!==ps.map(x=>x.id).join('|')){c.innerHTML=ps.map((p,i)=>`<article class="service-card" data-id="${esc(p.id)}" data-index="${i}" tabindex="0" role="button" aria-label="${esc(svcText(p,'name'))}"><span class="index"></span><div class="orb">${artSvg(p,i)}</div><h3></h3><div class="price"></div><div class="hint"></div></article>`).join('');c.querySelectorAll('.service-card').forEach(el=>{el.addEventListener('click',()=>{if(window.__swiped){window.__swiped=false;return}let i=Number(el.dataset.index);if(i!==active)go(i);else openDetail(visibleProducts()[active].id)});el.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();el.click()}})})}
layoutCarousel(active);document.getElementById('dots').innerHTML=ps.map((p,i)=>`<button class="${i===active?'active':''}" data-dot="${i}" aria-label="الخدمة ${i+1}"></button>`).join('');let p=ps[active];document.getElementById('previewName').textContent=svcText(p,'name');document.getElementById('previewDesc').textContent=svcText(p,'desc');document.getElementById('previewPrice').textContent=svcText(p,'price')||TR('حسب الطلب','On request');document.querySelectorAll('[data-dot]').forEach(b=>b.onclick=()=>go(Number(b.dataset.dot)));}
function clampCarouselX(){return Math.min(225,Math.max(112,window.innerWidth*.19))}
function go(i){let n=visibleProducts().length;if(!n)return;active=((i%n)+n)%n;renderCarousel();play('move')}
document.getElementById('prev').onclick=()=>go(active-1);document.getElementById('next').onclick=()=>go(active+1);document.getElementById('openDetails').onclick=()=>{let p=visibleProducts()[active];if(p)openDetail(p.id)};
let shell=document.getElementById('carouselShell'),dragOffset=null,dragRaf=0;
shell.addEventListener('pointerdown',e=>{dragStart=e.clientX;dragDelta=0;dragOffset=null;},{passive:true});
shell.addEventListener('pointermove',e=>{if(dragStart===null)return;dragDelta=e.clientX-dragStart;if(!dragOffset){dragOffset=active;document.getElementById('carousel').classList.add('dragging')}if(!dragRaf)dragRaf=requestAnimationFrame(()=>{dragRaf=0;layoutCarousel(dragOffset+dragDelta/Math.max(80,clampCarouselX()))});},{passive:true});
function endDrag(){if(dragStart===null)return;if(dragRaf){cancelAnimationFrame(dragRaf);dragRaf=0}document.getElementById('carousel').classList.remove('dragging');let moved=0;if(dragOffset!==null){let pos=dragOffset+dragDelta/Math.max(80,clampCarouselX());moved=Math.round(pos)-active}if(Math.abs(dragDelta)>14){window.__swiped=true;setTimeout(()=>window.__swiped=false,350)}if(Math.abs(dragDelta)>14&&moved!==0)go(active+moved);else renderCarousel();dragStart=null;dragDelta=0;dragOffset=null;}
shell.addEventListener('pointerup',endDrag);shell.addEventListener('pointercancel',endDrag);shell.addEventListener('pointerleave',endDrag);
function openDetail(id){let p=state.products.find(x=>x.id===id);if(!p)return;play('open');let page=document.getElementById('detailPage');document.getElementById('detailBody').innerHTML=`<div class="detail-hero"><div class="detail-emblem">${artSvg(p,999)}</div><div><div class="eyebrow">SERVICE OVERVIEW</div><h1>${esc(p.name)}</h1><p>${esc(p.desc)}</p><div class="detail-price">${esc(p.price||'حسب الطلب')}</div><div class="detail-actions"><a class="btn primary" href="${wa()}?text=${encodeURIComponent(TR('مرحباً، أريد الاستفسار عن خدمة: ','Hello, I would like to ask about the service: ')+svcText(p,'name'))}" target="_blank" rel="noopener">اطلب هذه الخدمة</a><button class="btn" onclick="document.getElementById('detailPage').classList.remove('open')">العودة للخدمات</button></div></div></div><div class="detail-columns"><section class="info-panel"><h3>عن الخدمة وطبيعة العمل</h3><p>${esc(p.details||p.desc)}</p><h3 style="margin-top:20px">المزايا وما ستحصل عليه</h3><ul>${(p.features||[]).map(x=>'<li>'+esc(x)+'</li>').join('')}</ul></section><aside class="info-panel"><h3>لماذا قد تكون بداية مناسبة؟</h3><p>يمكن أن تساعدك هذه الخدمة على تحويل فكرة واضحة إلى خطوة عملية، أو تطوير جانب محدد في مشروع قائم. يتم تثبيت نطاق العمل والتكلفة والمدة بعد مراجعة احتياجاتك.</p><div class="feature-chips"><span class="chip">'+TR('نطاق واضح','Clear scope')+'</span><span class="chip">'+TR('تطوير حسب الحاجة','Built around your needs')+'</span><span class="chip">'+TR('قابل للتوسع','Scalable')+'</span></div><h3 style="margin-top:20px">السعر</h3><p class="detail-price">${esc(p.price||'حسب الطلب')}</p><p>السعر المعروض تقديري ويخضع للتأكيد بعد تحديد المتطلبات والمحتوى والتكاملات المطلوبة.</p></aside></div>`;page.classList.add('open');page.setAttribute('aria-hidden','false');history.replaceState(null,'','#service-'+encodeURIComponent(id));page.scrollTop=0;}
document.getElementById('closeDetails').onclick=()=>{document.getElementById('detailPage').classList.remove('open');history.replaceState(null,'',location.pathname+location.search)};
const WORK_ITEMS=[
{name:'MOHANDIS MENU — منيو مطعم مطوّر',desc:'منيو مطعم للموبايل: أقسام وصور للوجبات، اقتراح كومبو، تخصيص الحجم، وسلة طلب تُرسل إلى واتساب.',url:'https://almohandis-systems.github.io/mohandis-menu/',img:'data:image/webp;base64,UklGRvgtAABXRUJQVlA4IOwtAACQywCdASqGASIBPpVGnUqlo6MkplR7YLASiU3d0C3QRlQW6tflR8L0A+SfDL4fqB4tvYOa31iZxv+d61fMO59fmY/a/9xvd0/6H7C++D/FeoV/cf9v6YHsw/3v/af//3Bv2o9O72df7v/2vTM1Un01/lvSr5F/svym8+fMH859y+YtE771/3f969p/9r4H8A713/v/UQhmuC/bz7z/xPTA/E/3n5ae/fiBfz3+1f8/y0vF59Z9gf+hf3D/xfdV9P/+5/7fuq98H17/7fcN/m/9w/7H+B7V37v+1AWCw5O176o10utKWm+Id6w/82dD3N/pNADaOgQr8gZV34YRPchfzM2Ftz6xGYM6Sg9/geWkEi3g23KZSv+N8kmejSjNfrucnmlfFxMhmvNqxGZyPgJHd2heK8hBdwYKS9XW76njvxU/J4JaMd64+Ultu+F798rd1NeJMH8fxbLnjRisLWOK7fyqGSRu2DUZ1HRtuANSCU6CAjAWnBM4nWSlmG7n9XXbusO4/161P8evT9WTFqiaUgd9wCdmlFcg1qGeMKClscSkpW5LIi6qNz+YzBXCJ688TecXcm4ud8JGilndrdU4/cOUICcfsX8aRS7HWXLXrH/qEiKNcUhcD4HPk1siiv/ZxyAWCrolbHg3UqtTgNyTidce9FtAV0GcP5r9FdO+s4WadDVh5F6iY5bD1zQRl2e74vfyD3bpBT7Drk/QCdy3T1m58MKqMkxCd26GrTKftY6nOtOrDvqmmL2c8VF94pZhi/UKflrsEFfph4UO0DZRrdkYGIud5f9d3btf4tyaENw87eZde5EO0/wIiEVFIjlLDKvZC+5DtbcOIu/f6+eMZc613IOVLq9xL4kH+Ehl93CtnxgRnIOxfmkJVeIBt8MeMjbW8Fl0daZbGuR9x18hJjUjAXzBrF3PiHfYNZ6gU2uW1UMx0FrRdqXgc3Wpyxu/Uh8+T7CsA7NXfJMHvT2RwNEBVzZAIate1F+pqdaLP8Ggemdv9WCIFfCoeM8TDB/NLZ6sbf4xEl1ALNm1s9FpW8d9z/igA6iFkF5mksJJ8S6KHnOlocPH5XlQgPXDTi7eNqXf2qbm4XQ6Y9/ZwstVnKgGQn7diQdWSSUA/hDeBdXOSh9jaRWbPeMcuejfyl6MIpMn+2qgKhRPIo45YYwX49LXl7mbKpTtRHqVGPRFDg7Dy4ENoxZfkIK2wS6fYx5ZyP8LUgKdFLBqgmKMjXP0BUmCxgvinZzVgyMiGdAChDalC8kaQzSDtygvrJ20hl3UOWKfX+vFBj9z+nmiK2ZLaSj5LdMnrCMoAEW5bK04a2SHx7d6h8MIS8k1JG+UxKLojHzvah/yAECrJc6od9SE8T5spGr/WBsoQzOyv/kOqxYkGFSxffTrZatO40pPxjy2+4SDsAg18SX/O3cEX8RkQ/lMGTmR9YUdEqGxWEJ7aovvtuX3nscPBkszsl55MSsacXMg5xGUkAAlqGrGq6pkV3OfbmwskwB27eX5TPw/703aEXxUSAwKYw/ADXeUrs0ySpKj5e4eG2XwmV3wYWokaj8fT2QzsBuf4oZI5ltCWmEdfa7zhxQ1XGVgT50BgcPvokmu4voDvLnN5/AVE55aaS2SmLhfAGVpEg2plRWIuNEFd8p5PSShXV2cBjT6ae6a8NYUVdQZI/Uj0aBPvdecc6dPpmMSvYTe849Eu8j0znMzyWCJnfOxVdlJUJRkxeey8UAxCI7syEd0HEVKFGbrxV9hiBpfL+z/gIBBfigMP8qz3sYbY1Ilr+qTh2Mq4KU3nq/RFTYqdUKXPJQWfl8btzxAmHODb4uzyngZeXW8Zsv2tMISIXn0EBVgOiN+vXkdWk3SPwKoSAZKsbJnWjXyF/+c6eBbZ6EBRgrkHM3SgIWI711n0l1LggZeifSdIox7KHqJR9VW/QMtF1OT2OaJrGrxRlpIBn/FdFkswD4aCB34xbcAtyhIc4dmpJRRBZoRN1wLLVNtRt/+qi0Q2f/SiXOGNg1yt+SgEsmlCiOgLm9Ed25A8Z1iVdkPx/WQeUUaBFVw0wLzaN3b2VD/BCpKaa0EV1igI3w78NkHH7ska4fNaRycJNiBdaDSvoeQ7dlw8WS672b78n822/C+9AWU1WH8kNNbZujyiADftFrbq9JMDKcy8ghMeUJz1+FJAwmP3Ly4AAD+8tAVW8CxVm5znH5uxf3WojdnEtPyfVZA4RFZ/ASieKhdPwmrf3lCtbjksFefrZHyL+420JZ/vQoDrJDBkVcDNAKPgo+XMYHadd98WCExFSYKBccXfr3tI02rWmgnsqZrHam22uRGmgixmcmIiuyKCm9Y8iwB6FSxnY8VqmYPwF7eBLp8laCMK/2FfcsFv8d1lAi7ys/Pfu+dmFksalgGeeduYxr9cwpW7l91Y2AvAsUaOIyv4HYdAlr0lmtIsbqIFR0Oyxa93eGCPP0jq0yKs7oYvbV1+TJoNso5KzvBON+EdegwJt843d8S7mws1r4mduRDqJfrBjbnTWHXBnnEU6ygpP1VhPhxZf2ZD9RCvyUdQSJ/Ol4kIDuXHCkmn8lhsYW/Dq01WmwCMx3wV5QQEtqJ3n6YdcVDU66uXqj0mtNMXjCv0B5AQ+GSnzSlT7T6d9/+jlNc9wyULdOWXdDZqyx+/fjTvCmIOan/MhSTNZUCh8NdBD5lYUOFDfuLrE6T80wcRy/MvA5bZrQUcxl0jTkPfHymXYuoLoGsRcT3Ym3i2r5s9hjimLEdtF6XoFZN6eDIm6uTM7CNqExM4BrHWN/YT2XO3s3nfQ2DzzIx+tJvIpLY9OH9Dz3/LuhkYITp//x2xbHzbP1d4YTv/7VxM9hxWy+jmdPhUx55jBF/+aGaaiB5DLj8zCPfXZt0wzGCDP/nsadInJ69yzsad/iXschlItGvujirKVElaW0Rj1SXtCyg8QLDa4JHH4JPzogBt9HB99Cae4jwd8z7XlXxcsr0oEh/UNvLLxkGyj6w+qL7YlKuKCH5aJGKGmq4zQeDd9OQ7emQGD1c9Y52MksBKhbmmZ1sEuzIWRcVPBqHIkhiLqNz3118mkGebYOUKiM+aHeU94q3GzzpZ346CnqKjt88H00vff1J0L/xN/YgJH3DGVPn3RAqfue3yvwHPutAgQXG21NU14o4lildDyv3jjPNeVP9XfSIu4NRduONDmq/AWqFPgczgGsIN7r1rprsPxxXQG8rsNYTfNEAFKtMI5Osras0sXj+Kgw2/kegwImZBdlqp0SAa61j37eN7D5qnoPN8rjkmMrszx0W6YJSet//hDoKnr91aqtenUExlV5Qdcptbjj2esTg4jhHzXtrj3eOYNwWrHjVuOvSS9PZj2Ae4oue/7tgoTrLDYbY9cBkwJ73u1oTd6QzIUFOh9TA6wMLgWw3cnuvmFoODmer8J6rttr3G9Ckse4IbJdD43qtuzYXbJDvHBb+Dv8aU+SGe9d120h24/tKgCZ2pqoN3utowZUY9w3aJHiXbc6WyEJQ87wRfAv9ITWLKQxDKFR6syVv9YMVU7DFnd0A9FibbFPEmw434DoyrUGku+KRRv0C0MXUOt2sXdp8lJrZ5i3+q2ClzLDjATTmLw/axz1rQYKmdC27xpG4Q9nQOGfq3clKStAARB9H2+Mwxag3pua3mOm8E0Djoc5VjtPCza6P62cC0JSOxHMw/UMXzc16WssqaqUHTefFt2+7ocaJWAs9wh1VYLMuP1t7W9CoWzURbiMoPft3d/eq4n1bBkKc+ZwC/2kjjw8zoUW0ytZN8T3T4bDN7UocSyX35ZjFk6VzfwL1yL8Be+YpZ+0Gqz4dXz3Kr6vtNbH50YuMVcJY2uieIfpqpzBszVvoIVva9qy9pqNd+W/i++VCiXP36iH1nJk/NB0K1+fIOhvrdJDyhOt7cgpUWHoxOdK+4Ys0zjYDACRoSTvo/XsHq/taeeL+6KjFjjSVoX6x3BMUirYBc2/S7EaY1uzj4cLuGmI39a2Tm0Q457ir8ce4PqWyips8t3Nm2Una64z1q+cjRLYON512Fc/PlDUK4h9afAvY98BCAKKZku+4/gE56Ur4MEBL2AL17HS5KM0Jjqg4Iv103I33nv3Z/HDZ0z4RMexMAFtdaEq3QvEovsze7Q4xxaLcW0dllq2C1FMq2RCJTvZA2ApnRY1p6AZxano/uPbKh1R/cMNvASE5aQ6QGvjA10vh/njjvNjyAo66PgVmkmKlgdl+ZpwilpukWFGT0gLulmkBRjNERnfk/xCfk5vpeGybJ5KLY12N4TOOqyG/qoNoXyQ/1P7fGs7M/PCLF4yVr97GNWfBvZPXOA/TDMev1ZNnz6rW1eIWygdbjN0TUrW+tk2+zhcevLVUGqA4hEg2Io+O+b9fisqaaUDOeDZvS/yt6hkdcUdnD25UQto/rlKp2tLv4xfYPKyeUeQ3JuuziyBb6Dfq6XVZcOEafKSOEdR80ZFhfFMSlGl5pSil/HUkY1Kl0MckFfz1jezDWFj60n+zoutfwH8EvC4/Ybl1/eESrlnJX0vU43SYa1taQpLlfJCyBqnMatNJjarwZyucC5byNAQmh/fPflCHx3PsbLpPdemla9rLKdNE4R6aKLnb55lEelx2b9+oTs1xCvqXxagsmln8T6GCT3cgO32ltkemLIi4j5v2bAMw+/YB3PvDjMq7dudACFbz2YXO2odxf+yoS0T0TQ6CWCUeGjt91BnrRJ6cLOMVVuEwWYbz9RGcWfjTVqIC1lCpzGii+MlC88pv+gVOe6n27na4tVbNRN/6/9Vp812cWiHaAeAMTuDaXAyAdpuk8FqYeSTekhkXB3OWZ1Qplo7yhgnW+X2j5GYw2Xf3q8OxxQbmhaNWgO2pIOiVGgMXGUcM7GGVQRz/drMbqFpMDFMry0ar1LaFQsT2dboBh0tGm6edHsSQ7ZjjBSHTdajhguhPrl+VKGnuQQgoc2aMurCszHlx6QMW8ssycstJt12ywcGEfaeSlU4Jwh3WEgf5W/LuQYNDebHQjor8y5MUWkQAh/u7sF2TeEGLJ/Krl6oTe2/DldTLMCZEqLUO9Dn/UNsTCSybob80oqR3nUvxwtVfJJ7xX3C100dO9WMCrPjxVBwU9OR99zhZEt7Frogp4fBHOc+++qzQMZFVvuoAR9AhvQWR79FTT5x8ZnGirQH8Wlcmfv/2hrkm0ystrMv2TiA14SjIXoiPpuKAHrl4N/rephSoKAKup7nSI10GsJfKuebP9IhJ66HzKlIDEBUBroNip1MsnTxBLTlXFcqYXwASteiL320STMAfGp459hUhhehCECvMDhC5rvdEfQnpr1lSLzFpWLw1gni/5Ge73Q1RRcN5bq92wjOb6I/VcP1a8JK+3mlJ4E4WXrsOptU9R1UXna6sODSe5pMPETJS8yCL74Fz6rJq9aUwm43k+/bmSolfLSQmgtT+GGZYtspn7n6iJqfPg3NyQSYpYmjz0m73hFKaleI+xbbx6f067lD3bFlkatpM5/2tF8CM68Op+3RxZF8CYW3UB22An8ubp13jfg2K5pfvddZYYREcVQqCJbV9RKziYNL3kDfwMCJGW7LY50AZ4qvJKpt+C0c3ChauQZmmKeUnh8vtAtv2i7+dm4Wl4xE9vosI1Al8QHF5266DOzvtXzDKUVwt/K6k7/nyc84PqixyaocH+DwgLVWviQ3lNxfEQBGUW4wHs296fY09gKM/JQ/99hYFeMfwWSbuIPtWpHk1TA/uJ6g+UYzKP3LO7r3mQOfabMNCOnTk/EKzBCLwj36kfgH+j/E4WOs9ij3rvX/MEaP7tm8HDaXscJFbOyLv6cVc79ypkQmq24M6MWVmduvU6PayvzKRdR6KiUvPKO1lW2+mnae1z0eFXWygWl7zYXTlDgkCGiZS2l/b7RUf0ef9lAqqn9MC/tucubIaczp8838pm3hF+vFa2zkKnv5g3q64MFG8a5tjtZwR0wFRc8K5Gs09H459F0GopPBa4YmkaMv907C49DZ4JaDgV/559petGE5GeOqBtqu4X0/2AMdV1iyeVIz6BbliUFGm3b3bfXv+ToQ6umGd89sXN9tmARdbyx++pjycLdafz8ouwDwxUH0xEmsNmP7nY2yET5bgxbxx6kpiqwha2rtvMRQXQVr7yLnIov68q2nD8tfy6Gh3ntOxgfFJ0wcZ9Y8jrnt7zYjjIldWPj1hpKaTEyuNcK8Dn+1liZQNnFYLBS5Zrc5y3tzMS8wFEpLxuJ216Q2Cgos5MT+q5f14X7yW6kzq89FCxy5hFjL/MAKLIDP+fiKvNneih8s7EMrKmbpyPMiOfkyYYW36aY+02+R3tPZAzSYuthTHaY1Ch9YWCRx7deCEUbTWc24v8Zwca3GiZeKmF8PrzHVs/f/X0h5ix1xpOXEC+JEWsyPZYKq4zrD2npGDtq5zz05Ss+LMGfbSKEQ2W1Byyv8eK08eNVuMTs2V6n80RpAUtN1ZsvP4ua68RifcSEx2BacwYH/jpEf2WzIRmduG6JXsHcFQr48fCAP9ZEpE+Pj6/P8YmDxqDtWt5qE7qbqd1Yt6sbkhtA7QFJhrY2OO6LgJC0z+z47EBoQIA1Kx0SI2IfP37r+PhEklmtGYm5m/qgYgYkN6vzd+v6lTRdu6myvrN/dApCCvdJUalmIkl3Xb1sUqwZcRRiamAgyubOCS9MAOpX+PvvDM9vIYVgr3vX/jv9iDheRk9hqrMAU8sOdK+mdmgUiVHaSiD4i7zWxTRotzcur6kfABuZ7L8nkS1m3P1j12JcvZNSY3wYtH8g7LBDE3L/gUW/w7h3lekDf4Q1wOOMwBgdjKxJJ/d9uKf1vAFmCefUBJeUhi/2II+2N5F98/5xBVMtOeR8FZ2sX+4hpLxW7vzTOgcIvchEHkF8FZEv9+8FwyRf/wektSpfHEqp7dXQWS/uSB7kZgtaBEvGIUhKRklUxY/gKW//7faix71YyzWg0nZSk12xiKn/5LsJU//ISUmbskPKG6ziqDGcGYCcy765a1NnmlsRuuDR/Ru+y24J1t2v0g6hdB6s4G2KiJewRU8nKI9J6BjqR3D0X3+/YciUl1/APDYOHfXycFJAy7yg6g3+psUElDE3u7Cgn+oDJamtSbrhddo7madFlchIH16s0wt954dcJzO34D4m+OwE2lM8lOZvnLws0ck+wWS5I/2ePB6+HMJjLmRp9j6ihdDLFw7NU5G+WGIJvTDN8j7BQmI7XZadvk2MFAvqJxQR4jJUIBFLsEsltKmAN6z/mXYTawBMqOVqdR/ypNTJZLCgKQ7gs7jmAC2QAAAAAAA3zeZ/Tu7IER6gAHf5ShDRa8RUsUxwfl8+Tw3mqPbYT7lPQd4Vm1FgoJ0aRcH5rFOIQARUhWa4NZUD2pwfbUYQO4znDCbPAAr6WRMhXc/0P7DesVjo8qRLbVr91Qa0POFDh/HZt8mQmN6QogLMj7zY2EV5pexbIITfyzR4sfSUVK80K9txDmwE5Qc9ktRTB40/l0N6BgfAp4CbKP+GS4OTVF2XvKgalEchxSCJDB24C9CxLAGzKrk1VyhAhe/e4G/EdO/tTsMqQDJ+A3nsS0HyF78CbD4LgwIbcWOMCqaC9KszYq3S0InRgW4PRrdQ6jRzl2ad/zjJbFmDuGWjT9Uyr45PBrx7DJoltGB5LGnYS4TyvVHCEVdQr8aq26nDG84PKyZN3s6g1Jt7t5AAQkA7cu0UE6kYgUFo4ewW2EU0g+x7uVKMC+nWhcTEdPJyyPQU+lFDLCU9Vg+fxYXEpjbAV2CBGF3xYjdjJ/6OguZL7X7yn5etYeWpTDL5pY3UakYbHBQLiS7abq+IDErwxusi65eI9iTMkaj5+34A9zNoqjMdUG8FDm2JCB3+iw5zRCanyTAWhTxNkFT7Yf4uhNySCmNtYlw36sASClMF2FONNfoA9LgL13BIJryEm/TQ6Nd20FS7YtZlFnMZwzaZNamFvF5JYR9ckDmoYjMv+wI5RTcWoaezNec4Pur7qWOd1IhA3hovz/tpCvl8QTFMqzb/3GeyxiCxJJhrZpPRKst22CzQafp5MQTGDoAt9EbtlYkk7urtWVV1fwcSdPPlgBc+ICrNmW33VYIDHdrSs/Wvli9nmnETh5zQ35IOE+N21Y7WrkC507oIV1LvTa418lBY2789baoIrzGIH5dLGRR1jUdn79yElEkgkyuhMZwKN0d6PD+SIStH33KZ7E5S/R53AodtnRQ3sSb16Ach7Bq/N/0gEZd6ZFCXWg++KqNSszsdIFpU9O52q7bPNViQcV38aRvVtt5+FtFj8xrv9e2xiqeQ93U7fuf4XtLtwJ8XFENzWO/KqIt06v3+jEql8ehBJA1UQNqed/YE/U1xI1BcGkjsJSkjFXs+06khrsZ2y6N/6Aaoe5225bAv4mdWdmI3S08GEhbGZ+gTf+uFKq0kkknRBMWDma2KSPZGy2dJzyyQW85VuPQ1gXASW30ijSSphaB0iS3Y78iNshYgik1s/qbBvxarbDJZejt86uXy/MUBAFO0lkC5pBo0g1MJ64n4IreU/EzNcrppRBdx2hbTgInMu2zcm5TrlSW+UInT61Xs/M9KnIV+6MFfG1846KjpeMogfriQ1tMAStZXC1Py6lDLj6/SPTiu9eTVAlyirqpZqUVv/uyhKCNuV+mqE+UJwwfDq9Bi5duMeK+/nWVxSjfrneykl38/PMi7i6/UXBKAzbFSi32xolcyvVizo5H8D0pdW2bsw0U8znBWzAjjyewy+hJHdvhmmgEG3wTEAgH4/h+dQyj/zzcT/3dUWwyMbh/nKrSK/Y4VoOOeF3BjKwbxGNQbqPb06YzYx3OfmJMoKRl+YyXgpVaHFGudbVuqHvyKmE49LTj+Uc5thnECEaLFjgZncul9xRN6XJL+6w90f5zmDYKZ39qJp7YlfwunWGIKmx1rkB3iA6CA9wCy2CYrZwScPu2TEGUEK+DuzIlHZpNW8ZasxPyQAKweZ7DDjQ4M/qQYJVuE1CjnJU9ad3jGJD9UVKw87ULy0non4VWYfsKR/TR4tCt2ZxU0laelK7Jnlgy4vwV7mMzvkeGO4/wnOweC0FBUtULbkW86jhB42tj3p1TxEoqQKFSLwChY0sPQ9wdrvhgbnDEaz3F0AqPzdXJUzIG4DHMFJsLAPKJCBTYDEJEYDhJzlXmDoLlGA1x3U6+FfhuVXyAm2qfseonvi6faqR2UadASCyc8L8Jm4aZM7zxreBDRsqx9E39x2XIWpavV+39u4603PLVPTwON94Ov32Sf9ucT/2CZ6QyIukJbO9PLL61lX7xl4VcUnHlb+fULLY6EwUWcfHbymRUriWIxEGkNTbRJUJOnNEHj8dGmiqmYeGkf2vSY1pOCXhFvUSCRI/4fG8d+fCyjxdUvbSHdbWR7YhFRyHNh6ahJtbjQZVIEengmqo6eWRSzrggzCEtksxGzaUSUHN4nhxydTizlHGq9U98386GjmNlxdGOAqFHU4XIl98qmpfXXkfeci+CB4YX4fC1d+XwJJ6zU3a0CiedQB6Sod8Mbz0BjP2Fxbf2b55CqxEm9xC5DziT4DE4r01bYVsrd5QqeFU230vsMOSpwn5JyNuvgOpYx0UvxqbnN+0iRF1dhPplk6ICsdCUCb43ZNVjnEdDnL61oK8/3ikI8dsEoARJqLXsVTFpwimyWGOZTmcVO5236MN4EaCJakidNSmQBZ52CHJRtXXUkFlN2c/4rEqmzVXTkI+jRFY9PuNd0UTifwhkYgeoD+g3Anlau6oYCUdmMIBwo21AYYKcgJZGvry/CUb29+Srq4/HWh9ymmbhfkwmP8N+8eoamYBdE4xFezPeniOxRI1Fqy6Dr5ImOVunyvdy1ih62uokQQu72rJd6CNnT6RzP3Ekxd0rbYjxYeUp066ATzoS5dVgVxqwLSDcxHZ9cy2vZiyIXF5E1ljZo05YAlcRtFZcrwko0qEpBZbv014TQHqjnBmSTFiufvyq6jet+CdQNrPCx+NHlvcj88ZxHWuniHnte5Hrmsq2M9eHgctJODab8ez3GE3S7hVJBdtVUG8yxxr+BBYhyCL0JaxZxcGYn/HTCGFCJR5o9mxt/i/AAZExD93p60dwSkEjmuR+uAwro3Tz60sKbd1hO8AYNiIE6Y6W0uB49vIHehgfQOzBpAykz1r3K8wyFd+/amk4sy7tbL5u0EfNSr8RctoPQOF5M/e2rLvWXb4Laxg+SZVXaXTPsGR0zBoN5JprY1Zd7yjMELfKV9zErC3bNaEfsV2s1YEa3rQ7Hp1bsYtcW3dskSrD0drmjBm3lftSsJU3zeJzzEAa0jQ9wxIhnoehWPTDuXRx3dHFO/09dvAojvEmA0ZvStrC0L1iNqozrbmC4ZNsy32eBGdH19LoFY0m/EULwqF/PCvzGX9dL8lCt6UdZ819v63cI7LyjXmJL7NQw1QB2pHzgl3RTk2LNYr+uGu+Wu94kLWiStzx7ngz/xVWR5qmqZyk35ofVGcdw0R8+J5mLMF6hH/vUIopYQs4QRim/bc5RC0h/GMw1kzL/JDTAQs2IDCAEdbhhd36MxRcUJC/fhPBb6otF6poOEHHibC/p7/t2Z3Wq3/AP7HBLRbjmF8vYyI42BoPjujIixTkt3JCwKpA246SV2IVvWoyCvNdvJScG7l9OwSyVg+OIFQb2k6SNag0E+oypyTeN8dvXjufKuLr8cd5KpO8qt5GXTippM2+tB7HqtXEkny4lYMS+WV0/PabWSoaAmBDxEyyqMCWMTILNUq8Q1LwrRFS05ORxfQfbZ98z2s2+UEbhuYNWehv1J5bHaLC/1fyrgFPvWITVnuX+eo2Z8IYWdsdgjZ9FFr4H1lnkWkYZY27WQfXnFW/FExTlI5gfGBySs0+nSp5oiPQup8c+p2A36je7vgGAZlS3kECOnQcGFYAzsTVAW4xIuYDQOc/94MAbJ0oEzMmGtRo7cAEG1q79DPY7ewDfCi97bMxGWMQ9j1qqK4la7oacPLQl6cJsN/cfDhq0AZ7XEzSndjt+TPyIT10DbYK5IZGAn2BVM3DTyw0Q6slQuePgwLxRSjqg6dWV1xR229geeP0Oj0AFiYmeceU1+2DNRejqrESx/dE0vzEvnlzzWNsvg2CLQnkpgnbPXUJuYpOW8KPY/dAwcBFTuoJ7X3MPY6Rpn/AGh/myy+Jk0ih20ujU4+uM/W3qt+vFDU5sdgWCc7HF+Op45VkY/qQmrCi6QPINbR948I7RLlVoDNz1S7D7VSX/nGtzgZ2Xm2V/cQil2+7PtLaAc7FMZoZc8ZExCQrnDYYpp6Xh4ytP1nT+CYNtSxdD6ReqcziJqzYOer0r/wAfx3ketYMAfQnWFtBjxkPQlLzOFCSqZ4/Lhv8KXo4BOYCSU+PWcFtdTLlNuDx+bZ+tE+Gas01Nozjy4jdTR9ZNPM15QTvXDCJVdWB4V4CciZJDxWMq/w1T1NEfbotsLTU6IEqY/+9pr45RNg1pV6SSp7EDNWZ6Y1grivdRmVIjQ7ER/WNZnqQnnUeMjwn/3VSsdkRHeBxW2AvncGvLNyiaSfOhHxtpVP+4Tj9BRKxJEMPxpKuLuqAkkK9eyBbve/5blvBQcjRfbwSIT6felHhd8MdwO7h2AnDyP1Td16xEfBpprldvWLBbCzwBHKiY/pIzx0MQGHgritXbIzhC7QiulMN0iFAiLBcEVL3B0qwOlgrsszbojecQxzKkWjVGSyqk/bDnLu6UTrlTodN9rWrKGlDEwLr7jZeyeC8Pyu0qv50Nb4VbSX7ppVVU+4tDRRxZLZphg5kJY5xwtg/ZjKSwnO5/vEhbs58fVircd/ZOhHpTEkDUmQsRi9tAFMoza4HJy8avfS89+DyNwTrCWmTAlGyYqcvtzIDV6srKMlleTbUHkkO29/Jq4oES/KfCbWS4WrgXbWFK0l3qNJh+dfJS6DhQLFe/pSD/aKa2YunqSg89H+NUcR9ejN/J4hiGuXhyTNbyjIBanpDZ01mespRWeRhd8NdF83aoBxUDWQ2qiPgQY+w8HypDhkw1SL4tbvLhXG+PtQa3d/WgIS8v39321McdyESpGoAXkc6XstALLsqOOW43iY8QIVxPonwul31dmE8Cio+ZmjKJClDLClfILFwU5i7oXG4f1BXMt8V5IhbOnhy5oT73/BsGaqxeW3dRBKrGANH7QxeTGcnCnwbokrgDw9N9/6C0Z7Ddsf88XsUEzCOvzZy/UeAwbXQlfiHsTsSEgfcTBW4oBTsn0eiKrKcPKEmIlBtNOU37JfFEy7iqXp2De3nusu9aGGMlpZIUF14v9t4o+4Pyg7M+pRz8PPoJTZEr00VtNBf3Orc2JwTSqAChAHLDpY8YXZ5uulIdJfLOmGqAXefWdJs93Sq0/Xs/lDdD4S4YmaeIMQsjh9In5liU17h0TieObVbiFT0PxTA0QO2z5od5ifxQmXIR5unbUGr/MWWfeGeoZzJjE2zpMRcdKUAcnjMjQgShGmQBL1RrXPiLwx/dtK8/XCUIDtDjnO5ZtIZ1cS7U0f5xjVl6R+hZ8iZP0q9ph1UPdYZ5VorlRX3zbH34nyEFvA23burS/FANiafiicL4hAsH9SvpoigjUAvIQKFpOdMnvGnY7mt1bMphUP10UzabpkiAx6oj7heGFSpaVmLmttFJdujwTuk0DPXwBsCerkFfCoiJUs3lTTyrBE8ZicB/kY2eaB3oOEDIcokAFSEsb7M+X5vsAoJWuqOuMs/kBmnyYPupfVKG8sqUndHznJxfwzyamirz7LnebqWGVqVnOUDddhHyD51DwPAiGLL9NqYWmtB0DTR+TsQZmlgDyzkuP03LIjCoh9qLsv/1itnwBxWMbUJtJDHmZrjOgDE+M3oaSQ8TUR1YFBaZ3R2HctainsBkJxFxshk3aO3yFTlcjV864NiTk3juYKventwEQiHdqdEgB3xY7Mdo9kg4xOzcy2rDX8oBDfyGW/IXN8hUr1bW7aXigo0i1ttsWwfrb5lA8B9NyI39hdNPRdyjtWxSDjZTTh8Qn8gts33nJhTagqs0NLSrr5tqs9Y6tdcHCJAinAI1NfRaRyNX+KC/7Ja7dHS/K49cLQuVmV5fqjQ40jf+3HQndTmFSNwWdz0TBbb/AamIJ3exPAr9MILOJty5+RQ9GgPNDm5z8SnSxAh+leYKxvOSxc7iCF0yQ09AckWHt6/MjR7fGc2c3sXaAgGnQG8vqfn8wF+V4Plh+wRx760pF7KGueR4HhmsNPXJdWOddZP4/1Xc2YPBDcw6GTNEMVfAVhbvIpHcqrIHeGhfZD71TN5a3Hr4hjvqwiuf4X5ZfoEbhTbHVJ4urhej+hPn5q/zVijL0pFEcoVF3N9N5aA2O/MRULc529FQIv/AVr52hpk8voyW90jcbgaoC66gyzdUn8NrEB/sZo65/TR71KEso+8WROnWWMFlkhw0ameo5LdT+xliO8KmWUBkybIwtYlqPkEN/+WeM+QJKHd1+F08RPXOXYzJ+7FBC7AGLweoZezR/nzZoglBZlxFL/0GEUu1W+EGhYotgNUdIT66ICh/yaMdZFlROqFBSsxuEIIl32nVMHKIptfebxXJ8iIY0RP/Yx2FG8o2qGnJkmHY5/qEWz/07tbCREep7NuOaOJyuqsPFCdL3Fb5IrgPj3mqgYyLKE042sp2OcjxJrOANB2n9GhTpwgeSB14buuK4YIroCCudaZg5l/dCy0sqwfTUeish/TI9tKUEljl8c2F4TGr0JHALTQcs6BTUr6ApSsC1a9Tr5T5lRFtS3oosRKlWICC4QlWqIq7/GfFqItvjm7TNPde1uHLXq4xG77johQC5fBrST46LlMyB/erN0IRqhVyEkSVd+w/Qxke/U0LZl6edFxFtqH1C8eAaDbXpKDSbe68ahGZGQ+FCvFh4LaD4nraAQShowJYL7/ONYMjJsiPt1MPnWo4jkMsRUJ3xoyv2OexYY4Pcu4onzysX9jNIHCW4wpqGia/EDPtk0BdSqbbebqLHXHKMIvIQexzOcbthlwypYPNNDqgeGecGgSsZ+1mrD9rOt/klU/YeAUaU3rD9klu9kWrENgjJ0Uyhkx/PCsVHf5bDGCzeKLWKEsUR4zearY+8r7o6WlDo4O2gSDO+yUKRSFD2+AFdK6i4p6YWsX54m4+81IbrVDXYYWX+B//pW4ERbC4AtyEhfwapTAichpwjiHiAdi/IZlyviW8jAkppFo8jtCSdnoo/t9X35Uz2fze6POQFCq4O6j0C/z7JYbSEHRZGwy2JV7IZGDI07I2d418CxKD50ewcfiSKhSf0bXbxSsNDzmrT8R/jQACrhUy3+t7RlXr8G39VPGcxkFxHtvY1ZtNjytCDcAZym+8mi2j4+eag/JdYX0r6HY7g6WcOj04rzuxQG6R2WJxQk918GR9DIPYqHKnfIYWgg6T6yj95R0PpzjtDidJffjxRebE0AZ/xzIXNbCgiuhNj0mblcvYJ/BhU9n8iXo59+o/0/9H9lGWCsPvdrshcriiwwffeQc1ejQCo7N9T5kUu+iMenbkONU9g9zGteFB+vI/12bH+y67jK5yqdCdT9Y9daJJVKfErSwWWEoXg1H1mXof9EbzuK1aKJk0Rvh3xvI9RZ9hq16GLTcJpQw44MkYYTrx6jFpAKMGKFVczQC4uILmdSSoEgCol9vgbn0/R6eIDmE2NAJU197fh6dXTwC5+E4JJabI+p5K3COZ8IRiz7yQc9TBzGME6FWsKAMiNgVzaSJMVWcCWksm4JuUnK8VBoyNF9qlSI+9d6gUkzbrFZeGIV9Rj+aj0y8lJnqfFD6CpA+POCQYnT1Vuc6mB4g9bwEkLvXC+6HJHRmkxe5C4tlegs2z5/uiTfbqiVMnm+lhPGpyNSpQYOowEx6R5wxPr9W4zAP2Ewp/oTJpVebEQENDnJjHXXpbPxd2mwYz3unxd6heMhlFl4r04yhJpaMYdcb8zFmoUCgoY0obH7hs7wxgf4nqVqpFp5MAmGY7RuJDC8uFZBaWMSu8xZ01YNo2coNe9XhuSoIjdm2BoFZVK35CW/nHuwhy0/T/Xh+cJD918/XyrQ2xRm6tjx6nXDJnSsqPNcDVbbimN20cu2c1UjW8jtud/iAy8H1YW8m9EEM5YR3m4rVBToqos622aOQoZryFFRuFPKifOaDZATA3xMn2WmZgOMfQKxzcU+Jm1Rs+quT6ZEaVVGBGJzxDsPkytrNR7+1pVv0zw0QB294iuOVbiOqLzSc9AR6HUAYqjre0v6asr0AzAIpgCHff0M0TlIwqJEcwKbcjBHLvUOA0nPWtfbu9sF0hY341nPX9lrGYrmhtEMSWw7jGyRyNcFlJcH5SpkKrbW4YmusAm/tzdfWXGbZH4F+AgtmS2P9IT/SFupfxUD17+AdreSO28bCbopsLYiM3gR5V4BYlp4uLoGA2IWSMz6iGpXowqr5ja1tBeB/C1dNcCA3+3iRkIAvEpSchJmozkkdOMzDhZcrjI989ScQ1E0RCLohigj6pT7SZPTPt6hjuCmELr6EiROE5LfFJjFiZcTyPfEJtkSf08sGBgQkBz/335qrDH0oQuLlg9YIKfCHACExFJEG3zVa2iupw+DnpsGAaIY2iAhqU40nuA/+gaRmnYNq2Gj7LyGLVfSQIBui1t9msAAAA=='},
{name:'CRASH OS — منيو مطعم تفاعلي',desc:'منيو مطعم تفاعلي: طلبات وسلة وكود خصم، مع إمكانية تثبيته كتطبيق على الهاتف.',url:'https://almohandis-systems.github.io/Almohandis-menu/',img:'assets/work/crash-menu.webp'},
{name:'LUSTER — متجر منتجات النظافة',desc:'متجر إلكتروني لمنتجات النظافة والعناية المنزلية، مع عروض وباقات وسلة شراء.',url:'https://almohandis-systems.github.io/LUSTER-YASSEN-/',img:'assets/work/luster.webp'},
{name:'منظومة إدارة المطاعم الشاملة',desc:'منصة متكاملة لإدارة المطاعم: منيو، طلبات، كاشير، وتقارير في مكان واحد.',url:'https://almohandis-systems.github.io/crash-os-platform/',img:'assets/work/crash-os.webp'},
{name:'رعاية الفيوم — شبكة خصومات طبية',desc:'دليل معتمد لشبكة أطباء وصيدليات ومعامل وأشعة بالفيوم بخصومات تصل إلى 30%، مع بطاقة عضوية رقمية عائلية حتى 5 أفراد بكود عضوية وباركود وتاريخ صلاحية، حاسبة توفير، حجز سهل، وصفحة «انضم كجهة» لانضمام الجهات الطبية.',url:'https://almohandis-systems.github.io/reaya-fayoum/',img:'assets/work/reaya.webp'}
];
function openWork(i){const w=WORK_ITEMS[i];if(!w)return;play('open');document.getElementById('workTitle').textContent=workText(i,'name');document.getElementById('workOpen').href=w.url;const f=document.getElementById('workFrame');f.src=w.url;document.getElementById('workModal').classList.add('open');document.getElementById('workModal').setAttribute('aria-hidden','false');}
function closeWork(){const m=document.getElementById('workModal');m.classList.remove('open');m.setAttribute('aria-hidden','true');document.getElementById('workFrame').src='about:blank';}
function renderProjects(){document.getElementById('projectCards').innerHTML=WORK_ITEMS.map((w,i)=>`<article class="work-card" tabindex="0" role="button" aria-label="${esc(workText(i,'name'))}" onclick="openWork(${i})" onkeydown="if(event.key==='Enter')openWork(${i})"><div class="work-thumb"><img src="${w.img}" alt="${esc(workText(i,'name'))}" loading="lazy"></div><div class="work-body"><h3>${esc(workText(i,'name'))}</h3><p>${esc(workText(i,'desc'))}</p></div></article>`).join('');const wc=document.getElementById('workClose');if(wc){wc.onclick=closeWork;document.getElementById('workModal').addEventListener('click',e=>{if(e.target.id==='workModal')closeWork()})}}
function renderBuilder(){let ps=visibleProducts();document.getElementById('builderList').innerHTML=ps.map(p=>`<label class="pick"><input type="checkbox" value="${esc(p.id)}" data-pick> <span>${esc(p.icon)} ${esc(p.name)}</span></label>`).join('');document.querySelectorAll('[data-pick]').forEach(x=>x.addEventListener('change',updateEstimate));updateEstimate()}
function chosen(){return [...document.querySelectorAll('[data-pick]:checked')].map(x=>state.products.find(p=>p.id===x.value)).filter(Boolean)}function updateEstimate(){let ps=chosen(),sum=ps.reduce((a,p)=>a+priceNum(p.price),0);document.getElementById('estimateTotal').textContent=ps.some(p=>!priceNum(p.price))?'يحتاج عرضاً مخصصاً':money(sum);document.getElementById('estimateCount').textContent=ps.length+' خدمة مختارة — تقدير أولي غير ملزم';document.getElementById('estimateItems').innerHTML=ps.length?ps.map(p=>`<li>${esc(p.name)} — ${esc(p.price)}</li>`).join(''):'<li>اختر خدمة أو أكثر لبدء تكوين مشروعك.</li>'}
document.getElementById('sendProject').onclick=()=>{let ps=chosen();if(!ps.length){toast('اختر خدمة واحدة على الأقل');return}let msg='أرغب في عرض سعر لمشروع يتضمن:\n'+ps.map(p=>'• '+p.name+' ('+p.price+')').join('\n')+'\nبرجاء التواصل لمناقشة التفاصيل.';window.open(wa()+'?text='+encodeURIComponent(msg),'_blank','noopener')};
// Admin UI: local mode is explicitly labelled; cross-device live sync requires Supabase configuration.
function openAdmin(){document.getElementById('adminOverlay').classList.add('open');renderAdmin()}document.getElementById('adminClose').onclick=()=>document.getElementById('adminOverlay').classList.remove('open');
let ownerTapCount=0,ownerTapTimer=null;const ownerPhoto=document.getElementById('ownerPhoto');ownerPhoto.setAttribute('draggable','false');ownerPhoto.setAttribute('title','');ownerPhoto.addEventListener('click',()=>{ownerTapCount++;clearTimeout(ownerTapTimer);ownerTapTimer=setTimeout(()=>ownerTapCount=0,2600);if(ownerTapCount>=5){ownerTapCount=0;clearTimeout(ownerTapTimer);if(localStorage.getItem('almo_owner_pin_enabled')==='no'){openAdmin();return}document.getElementById('ownerGate').classList.add('open');document.getElementById('ownerGate').setAttribute('aria-hidden','false');document.getElementById('ownerPinInput').value='';document.getElementById('gateError').textContent='';setTimeout(()=>document.getElementById('ownerPinInput').focus(),80)}});function closeGate(){document.getElementById('ownerGate').classList.remove('open');document.getElementById('ownerGate').setAttribute('aria-hidden','true')}document.getElementById('gateClose').onclick=closeGate;document.getElementById('ownerPinSubmit').onclick=()=>{let entered=document.getElementById('ownerPinInput').value;if(entered===(localStorage.getItem('almo_owner_gate_pin')||'0846')){closeGate();openAdmin();play('success')}else{document.getElementById('gateError').textContent='الرمز غير صحيح';document.getElementById('ownerPinInput').value='';play('tap')}};document.getElementById('ownerPinInput').addEventListener('keydown',e=>{if(e.key==='Enter')document.getElementById('ownerPinSubmit').click()});
function backendStatus(){return backend?'متصل بالمزامنة السحابية — التعديلات تنتشر للعملاء فوراً':'وضع محلي — التعديلات تظهر على هذا المتصفح فقط حتى إعداد قاعدة البيانات'}
function renderAdmin(){if(backend&&!adminUser&&adminTab!=='sync')adminTab='sync';let c=document.getElementById('adminContent');let b=cfg();let status=backend?'<div class="status good">● '+backendStatus()+'</div>':'<div class="status warn">● '+backendStatus()+'</div>';let tabs=[['services','الخدمات'],['branding','الاسم والشعار والحركة'],['appearance','الخلفيات والألوان'],['identity','الهوية والتواصل'],['projects','المشروعات'],['security','الأمان والدخول'],['requests','الطلبات'],['referral','الإحالة والخصومات'],['sync','الربط والمزامنة']];c.innerHTML=status+'<div class="admin-tabs">'+tabs.map(t=>`<button class="tab ${adminTab===t[0]?'active':''}" data-tab="${t[0]}">${t[1]}</button>`).join('')+'</div><div id="adminPanel"></div>';document.querySelectorAll('[data-tab]').forEach(x=>x.onclick=()=>{adminTab=x.dataset.tab;renderAdmin()});let p=document.getElementById('adminPanel');if(adminTab==='services')adminServices(p);if(adminTab==='branding')adminBranding(p);if(adminTab==='appearance')adminAppearance(p);if(adminTab==='security')adminSecurity(p);if(adminTab==='identity')adminIdentity(p);if(adminTab==='projects')adminProjects(p);if(adminTab==='requests')adminRequests(p);if(adminTab==='referral')adminReferral(p);if(adminTab==='sync')adminSync(p,b)}
function adminServices(p){p.innerHTML='<div class="admin-actions"><button class="btn primary" id="addService">+ إضافة خدمة</button></div><p class="notice">يمكنك تعديل النصوص والأسعار والمزايا وإخفاء الخدمة أو تغيير ترتيبها. في وضع المزامنة ستظهر التعديلات للعملاء المتصلين فور حفظها.</p>'+state.products.map((x,i)=>`<div class="service-row"><div><strong>${esc(x.icon)} ${esc(x.name)}</strong><small>${esc(x.price)} ${x.visible===false?'• مخفية':''}</small></div><div style="display:flex;gap:5px;flex-wrap:wrap"><button class="mini-btn" data-edit="${x.id}">تعديل</button><button class="mini-btn" data-up="${x.id}">↑</button><button class="mini-btn" data-down="${x.id}">↓</button><button class="mini-btn" data-hide="${x.id}">${x.visible===false?'إظهار':'إخفاء'}</button><button class="mini-btn" data-del="${x.id}">حذف</button></div></div>`).join('');document.getElementById('addService').onclick=()=>editService();p.querySelectorAll('[data-edit]').forEach(b=>b.onclick=()=>editService(b.dataset.edit));p.querySelectorAll('[data-hide]').forEach(b=>b.onclick=()=>{let x=state.products.find(x=>x.id===b.dataset.hide);x.visible=x.visible===false?true:false;persist()});p.querySelectorAll('[data-del]').forEach(b=>b.onclick=()=>{askConfirm('هل تريد حذف الخدمة؟',()=>{state.products=state.products.filter(x=>x.id!==b.dataset.del);active=0;persist()})});p.querySelectorAll('[data-up]').forEach(b=>b.onclick=()=>moveService(b.dataset.up,-1));p.querySelectorAll('[data-down]').forEach(b=>b.onclick=()=>moveService(b.dataset.down,1))}
function moveService(id,d){let i=state.products.findIndex(x=>x.id===id),j=i+d;if(j<0||j>=state.products.length)return;[state.products[i],state.products[j]]=[state.products[j],state.products[i]];persist()}
function editService(id=''){let x=id?state.products.find(p=>p.id===id):{id:'s'+Date.now(),name:'',icon:'✦',price:'حسب الطلب',desc:'',details:'',features:[],visible:true};pendingEdit=x.id;document.getElementById('serviceModalTitle').textContent=id?'تعديل الخدمة':'إضافة خدمة';document.getElementById('serviceId').value=x.id;document.getElementById('sName').value=x.name;document.getElementById('sIcon').value=x.icon;document.getElementById('sPrice').value=x.price;document.getElementById('sDesc').value=x.desc;document.getElementById('sDetails').value=x.details;document.getElementById('sFeatures').value=(x.features||[]).join('\n');document.getElementById('serviceModal').classList.add('open')}
document.getElementById('serviceCancel').onclick=()=>document.getElementById('serviceModal').classList.remove('open');document.getElementById('serviceSave').onclick=()=>{let id=document.getElementById('serviceId').value,x={id,name:document.getElementById('sName').value.trim(),icon:document.getElementById('sIcon').value.trim()||'✦',price:document.getElementById('sPrice').value.trim()||'حسب الطلب',desc:document.getElementById('sDesc').value.trim(),details:document.getElementById('sDetails').value.trim(),features:document.getElementById('sFeatures').value.split('\n').map(s=>s.trim()).filter(Boolean),visible:true};if(!x.name){toast('اكتب اسم الخدمة');return}let i=state.products.findIndex(p=>p.id===id);if(i>=0)state.products[i]={...state.products[i],...x};else state.products.push(x);document.getElementById('serviceModal').classList.remove('open');persist()};
function adminBranding(p){let b=state.branding||{};p.innerHTML=`<div class="status good">تحكم كامل في الاسم والشعار والألوان والحركة. استخدم معاينة ثم احفظ وانشر.</div><div class="admin-grid"><div class="field"><label>اسم العلامة بالكامل — يظهر في سطر واحد</label><input id="brName" maxlength="70" value="${esc(b.name||state.brand)}"></div><div class="field"><label>النص التعريفي أسفل الاسم</label><input id="brSub" maxlength="100" value="${esc(b.subtitle||'')}"></div><div class="field"><label>رفع صورة الشعار من جهازك</label><input id="brLogoFile" type="file" accept="image/png,image/jpeg,image/webp,image/svg+xml"><small>يتم تصغير الصور النقطية تلقائياً قبل الحفظ.</small></div><div class="field"><label>رابط صورة الشعار (اختياري)</label><input id="brLogo" value="${esc(b.logoUrl||'')}" placeholder="رابط صورة HTTPS مباشر"></div><div class="field"><label>عرض الإطار من الشاشة (%)</label><input id="brWidth" type="number" min="55" max="95" value="${Number(b.frameWidth)||75}"></div><div class="field"><label>لون الكلمة الأولى</label><input id="brA" type="color" value="${esc(b.colorA||'#e7c779')}"></div><div class="field"><label>لون الكلمة الثانية</label><input id="brB" type="color" value="${esc(b.colorB||'#f4f6fa')}"></div><div class="field"><label>طريقة عرض الهوية</label><select id="brMode"><option value="2d">نص ثنائي الأبعاد 2D</option><option value="3d">نص ثلاثي الأبعاد 3D</option><option value="logo">الشعار فقط</option></select></div><div class="field"><label>حركة الاسم والشعار</label><select id="brAnim"><option value="none">ثابت بدون حركة</option><option value="sweep">مرور ضوء معدني</option><option value="float">طفو هادئ</option><option value="pulse">نبض ضوئي ناعم</option><option value="rotate">ميل ثلاثي الأبعاد</option></select></div></div><div class="admin-actions"><button class="btn" id="brPreview">معاينة على الموقع</button><button class="btn primary" id="brSave">حفظ ونشر الهوية</button><button class="btn" id="brReset">استعادة القيم الحالية المحفوظة</button></div><p class="notice">ملاحظة: عند اختيار الشعار فقط، يجب إدخال رابط صورة صالح. يفضّل استخدام صورة شفافة PNG أو SVG مستضافة على HTTPS. جميع القيم تحفظ ضمن محتوى الموقع المشترك عند تفعيل المزامنة السحابية.</p>`;document.getElementById('brMode').value=b.mode||'3d';document.getElementById('brAnim').value=b.animation||'sweep';function collect(){return{name:document.getElementById('brName').value.trim()||'ALMOHANDIS - SYSTEMS',subtitle:document.getElementById('brSub').value.trim(),logoUrl:document.getElementById('brLogo').value.trim(),frameWidth:Math.max(55,Math.min(95,Number(document.getElementById('brWidth').value)||75)),colorA:document.getElementById('brA').value,colorB:document.getElementById('brB').value,mode:document.getElementById('brMode').value,animation:document.getElementById('brAnim').value}}document.getElementById('brLogoFile').onchange=async ev=>{let file=ev.target.files&&ev.target.files[0];if(!file)return;if(!file.type.startsWith('image/')){toast('اختر ملف صورة صالحاً');return}try{let data=await new Promise((resolve,reject)=>{let rd=new FileReader();rd.onload=()=>resolve(rd.result);rd.onerror=reject;rd.readAsDataURL(file)});if(file.type==='image/svg+xml'){document.getElementById('brLogo').value=data;toast('تم تحميل الشعار');return}let img=await new Promise((resolve,reject)=>{let im=new Image();im.onload=()=>resolve(im);im.onerror=reject;im.src=data});let c=document.createElement('canvas'),scale=Math.min(1,512/Math.max(img.width,img.height));c.width=Math.round(img.width*scale);c.height=Math.round(img.height*scale);c.getContext('2d').drawImage(img,0,0,c.width,c.height);document.getElementById('brLogo').value=c.toDataURL('image/webp',.82);toast('تم تجهيز الشعار وتحسين حجمه')}catch(e){toast('تعذر قراءة ملف الشعار')}};document.getElementById('brPreview').onclick=()=>{renderBrand(collect());toast('تم تطبيق المعاينة دون نشر')};document.getElementById('brSave').onclick=()=>{let next=collect();if(next.mode==='logo'&&!next.logoUrl){toast('ارفع صورة الشعار أو أدخل رابطها أولاً');return}state.branding=next;state.brand=next.name;persist();toast(backend?'تم حفظ الهوية وإرسالها للمزامنة':'حُفظت محلياً؛ اربط قاعدة البيانات لنشرها للعملاء')};document.getElementById('brReset').onclick=()=>{try{let saved=JSON.parse(localStorage.getItem(STORE)||'{}');state.branding={...state.branding,...(saved.branding||{})};state.brand=state.branding.name||state.brand}catch(e){}renderBrand();renderAdmin();toast('أعيدت الهوية المحفوظة محلياً')}}
function applyTheme(){let t=state.theme||{preset:'pearl'};let map={pearl:'linear-gradient(135deg,#fbfcff 0%,#edf2f8 52%,#f8f5ef 100%)',ice:'linear-gradient(135deg,#f8fcff,#e5f1fb 55%,#f5f9ff)',ivory:'linear-gradient(135deg,#fffdf7,#f3eadb 55%,#fffaf0)',sage:'linear-gradient(135deg,#fbfffd,#e5f1eb 55%,#f8fcf9)',silver:'linear-gradient(135deg,#fff,#e6eaf0 48%,#f8fafc)',blush:'linear-gradient(125deg,#fff8f8,#f4e8ef 50%,#edf3fc)',aurora:'linear-gradient(120deg,#fff7e8,#e7f2f5,#f2eafa,#fff)',sky:'linear-gradient(120deg,#f7fbff,#dcecff,#f9f4e8)'};document.documentElement.style.setProperty('--client-wallpaper',t.custom||map[t.preset]||map.pearl);document.body.classList.toggle('wallpaper-motion',!!t.motion)}
function adminAppearance(p){let t=state.theme||{preset:'pearl'};p.innerHTML=`<div class="status good">هذه الخيارات تخص صفحة العملاء فقط. لوحة المالك تحتفظ بمظهرها الداكن.</div><div class="admin-grid"><div class="field"><label>مجموعة الخلفيات الفاتحة</label><select id="themePreset"><option value="obsidian">أسود زجاجي داكن</option><option value="pearl">لؤلؤي أبيض</option><option value="ice">أزرق جليدي</option><option value="ivory">عاجي دافئ</option><option value="sage">أخضر زجاجي</option><option value="silver">فضي معدني</option><option value="blush">وردي لؤلؤي</option><option value="aurora">تدرج أورورا فاتح</option><option value="sky">سماء صافية</option></select></div><div class="field"><label>لون مخصص للخلفية</label><input id="themeCustom" type="color" value="${esc(t.color||'#f5f7fb')}"><small>يستخدم اللون المخصص عند اختيار خلفية سادة.</small></div><div class="field"><label>نوع الخلفية</label><select id="themeKind"><option value="gradient">تدرج لوني</option><option value="solid">لون سادة مخصص</option></select></div><div class="field"><label>الحركة</label><select id="themeMotion"><option value="off">ثابتة</option><option value="on">حركة تدرج بطيئة</option></select></div></div><div class="admin-actions"><button class="btn" id="themePreview">معاينة</button><button class="btn primary" id="themeSave">حفظ ونشر الخلفية</button></div><p class="notice">يمكنك معاينة الخلفية قبل النشر. لا تتغير ألوان لوحة التحكم.</p>`;document.getElementById('themePreset').value=t.preset||'pearl';document.getElementById('themeMotion').value=t.motion?'on':'off';document.getElementById('themeKind').value=t.kind||'gradient';function collect(){let kind=document.getElementById('themeKind').value,color=document.getElementById('themeCustom').value;return{preset:document.getElementById('themePreset').value,color,kind,custom:kind==='solid'?`linear-gradient(135deg,${color},${color})`:null,motion:document.getElementById('themeMotion').value==='on'}}document.getElementById('themePreview').onclick=()=>{state.theme=collect();applyTheme();toast('معاينة الخلفية فقط — لم يتم النشر')};document.getElementById('themeSave').onclick=()=>{state.theme=collect();persist();toast(backend?'تم نشر الخلفية للعملاء':'حُفظت محلياً فقط؛ يلزم ربط المزامنة للنشر') }}
function adminSecurity(p){p.innerHTML=`<div class="status warn">الضغطات الخمس والرمز بوابة دخول مخفية للواجهة. الحماية الفعلية للتعديل السحابي تعتمد على تسجيل دخول Supabase وصلاحيات المالك.</div><div class="admin-grid"><div class="field"><label>الرمز السري الحالي</label><input value="${esc(localStorage.getItem('almo_owner_gate_pin')||'0846')}" disabled></div><div class="field"><label>رمز سري جديد</label><input id="newAdminPin" type="password" inputmode="numeric" maxlength="12" placeholder="اكتب رمزاً جديداً"></div><div class="field"><label>تأكيد الرمز الجديد</label><input id="confirmAdminPin" type="password" inputmode="numeric" maxlength="12" placeholder="أعد كتابة الرمز"></div><div class="field"><label>حالة طلب الرمز بعد الضغطات الخمس</label><select id="pinEnabled"><option value="yes">مفعّل</option><option value="no">معطّل</option></select></div></div><div class="admin-actions"><button class="btn primary" id="saveSecurity">حفظ إعدادات الدخول</button><button class="btn" id="resetPin">استعادة الرمز الافتراضي 0846</button></div><p class="notice">لا تعرض هذه الإعدادات في صفحة العملاء. عند تعطيل الرمز ستبقى الضغطات الخمس مطلوبة، لكن ستفتح لوحة المالك مباشرة؛ يظل تسجيل الدخول السحابي مطلوباً لإجراء التعديلات المنشورة.</p>`;document.getElementById('pinEnabled').value=localStorage.getItem('almo_owner_pin_enabled')==='no'?'no':'yes';document.getElementById('saveSecurity').onclick=()=>{let n=document.getElementById('newAdminPin').value,c=document.getElementById('confirmAdminPin').value;if(n&&n!==c){toast('تأكيد الرمز غير متطابق');return}if(n&&n.length<4){toast('استخدم 4 خانات على الأقل');return}if(n)localStorage.setItem('almo_owner_gate_pin',n);localStorage.setItem('almo_owner_pin_enabled',document.getElementById('pinEnabled').value);renderAdmin();toast('تم حفظ إعدادات الدخول على هذا الجهاز')};document.getElementById('resetPin').onclick=()=>{askConfirm('استعادة الرمز الافتراضي 0846؟',()=>{localStorage.setItem('almo_owner_gate_pin','0846');localStorage.setItem('almo_owner_pin_enabled','yes');renderAdmin()})}}
function adminIdentity(p){
  const tx=state.texts||{};
  p.innerHTML=`<div class="status good">تحكم كامل في جميع عناوين وفقرات الموقع وبيانات المالك وروابط التواصل.</div><div class="admin-grid"><div class="field"><label>عنوان الصفحة الرئيسي</label><input id="aHeroTitle" value="${esc(state.heroTitle)}"></div><div class="field"><label>الوصف الرئيسي</label><textarea id="aHeroDesc">${esc(state.heroDesc)}</textarea></div><div class="field"><label>اسم المالك</label><input id="aOwnerName" value="${esc(state.ownerName||'ENG. RAMI NABIL')}"></div><div class="field"><label>المسمى أسفل الصورة</label><input id="aRole" value="${esc(state.ownerRole)}"></div><div class="field"><label>عنوان قسم الخدمات</label><input id="aSrvTitle" value="${esc(tx.servicesTitle||'اختر وجهتك الرقمية')}"></div><div class="field"><label>وصف قسم الخدمات</label><input id="aSrvDesc" value="${esc(tx.servicesDesc||'اسحب يميناً أو يساراً، أو استخدم الأسهم. الأيقونة الأمامية هي اختيارك الحالي.')}"></div><div class="field"><label>عنوان قسم المشروعات</label><input id="aPrjTitle" value="${esc(tx.projectsTitle||'منظومة مشروعات متكاملة')}"></div><div class="field"><label>وصف قسم المشروعات</label><input id="aPrjDesc" value="${esc(tx.projectsDesc||'كل مشروع له هويته ومساحته، ويجمعها إطار ALMOHANDIS - SYSTEMS.')}"></div><div class="field"><label>عنوان قسم تكوين المشروع</label><input id="aBldTitle" value="${esc(tx.builderTitle||'كوّن مشروعك خطوة بخطوة')}"></div><div class="field"><label>وصف قسم تكوين المشروع</label><input id="aBldDesc" value="${esc(tx.builderDesc||'اختر الخدمات التي تحتاجها وشاهد تقديراً أولياً لتكلفة البداية.')}"></div><div class="field"><label>رابط صورة المالك (اختياري)</label><input id="aImage" value="${esc(state.ownerImage)}" placeholder="https://..."></div><div class="field"><label>رقم الهاتف</label><input id="aPhone" value="${esc(state.phone)}"></div><div class="field"><label>رقم واتساب مع كود الدولة</label><input id="aWhatsapp" value="${esc(state.whatsapp)}"></div></div><h3 style="font-size:14px;margin-top:22px">روابط التواصل الاجتماعي</h3><div class="admin-grid">${['facebook','instagram','tiktok','whatsapp','youtube','linkedin'].map(k=>`<div class="field"><label>${k}</label><input id="soc_${k}" value="${esc(state.social[k]||'')}" placeholder="https://..."></div>`).join('')}</div><div class="admin-actions"><button class="btn primary" id="saveIdentity">حفظ الهوية والنصوص والتواصل</button></div>`;
  document.getElementById('saveIdentity').onclick=()=>{
    state.heroTitle=document.getElementById('aHeroTitle').value;
    state.heroDesc=document.getElementById('aHeroDesc').value;
    state.ownerName=document.getElementById('aOwnerName').value.trim()||'ENG. RAMI NABIL';
    state.ownerRole=document.getElementById('aRole').value;
    state.texts={
      servicesTitle:document.getElementById('aSrvTitle').value.trim()||'اختر وجهتك الرقمية',
      servicesDesc:document.getElementById('aSrvDesc').value.trim()||'اسحب يميناً أو يساراً، أو استخدم الأسهم. الأيقونة الأمامية هي اختيارك الحالي.',
      projectsTitle:document.getElementById('aPrjTitle').value.trim()||'منظومة مشروعات متكاملة',
      projectsDesc:document.getElementById('aPrjDesc').value.trim()||'كل مشروع له هويته ومساحته، ويجمعها إطار ALMOHANDIS - SYSTEMS.',
      builderTitle:document.getElementById('aBldTitle').value.trim()||'كوّن مشروعك خطوة بخطوة',
      builderDesc:document.getElementById('aBldDesc').value.trim()||'اختر الخدمات التي تحتاجها وشاهد تقديراً أولياً لتكلفة البداية.'
    };
    state.ownerImage=document.getElementById('aImage').value;
    state.phone=document.getElementById('aPhone').value;
    state.whatsapp=document.getElementById('aWhatsapp').value.replace(/\D/g,'');
    ['facebook','instagram','tiktok','whatsapp','youtube','linkedin'].forEach(k=>state.social[k]=document.getElementById('soc_'+k).value.trim());
    persist();
    toast('تم حفظ النصوص والهوية والتواصل');
  };
}
function adminProjects(p){p.innerHTML='<p class="notice">تحرير أسماء المشروعات ووصفها في هذه النسخة متاح من الحقول التالية.</p>'+state.projects.map((x,i)=>`<div class="field" style="margin:12px 0"><label>المشروع ${i+1} — الرمز / الاسم / الوصف</label><div class="admin-grid"><input id="prIcon${i}" value="${esc(x.icon)}"><input id="prName${i}" value="${esc(x.name)}"><textarea id="prDesc${i}" style="grid-column:1/-1">${esc(x.desc)}</textarea></div></div>`).join('')+'<button class="btn primary" id="saveProjects">حفظ المشروعات</button>';document.getElementById('saveProjects').onclick=()=>{state.projects=state.projects.map((x,i)=>({...x,icon:document.getElementById('prIcon'+i).value,name:document.getElementById('prName'+i).value,desc:document.getElementById('prDesc'+i).value}));persist()}}
async function adminRequests(p){p.innerHTML='<p class="notice">طلبات العملاء التي أُرسلت من الموقع بعد تفعيل قاعدة البيانات ستظهر هنا.</p><div id="leadsList">جارٍ تحميل الطلبات...</div>';if(!backend){document.getElementById('leadsList').textContent='فعّل المزامنة السحابية أولاً لاستقبال الطلبات على جميع الأجهزة.';return}let {data,error}=await backend.from('site_leads').select('*').order('created_at',{ascending:false}).limit(100);document.getElementById('leadsList').innerHTML=error?'<div class="status warn">تعذر تحميل الطلبات: '+esc(error.message)+'</div>':(data||[]).map(x=>`<div class="service-row"><div><strong>${esc(x.customer_name||'عميل')} — ${esc(x.phone||'')}</strong><small>${esc(x.message||'')}<br>${new Date(x.created_at).toLocaleString('ar-EG')}</small></div><span class="chip">${esc(x.status||'جديد')}</span></div>`).join('')||'لا توجد طلبات حتى الآن.'}
function adminSync(p,b){p.innerHTML=`<div class="status ${backend?'good':'warn'}">${backend?'المزامنة متصلة. التحديثات تُحفظ في قاعدة البيانات وتصل للأجهزة الأخرى.':'المزامنة غير مفعلة. ملف GitHub Pages وحده لا يشارك بيانات localStorage بين العملاء.'}</div><p class="notice">لتحقيق ظهور تعديلات المالك فوراً لدى جميع العملاء نستخدم Supabase كقاعدة بيانات مشتركة ومزامنة لحظية. أنشئ مشروعاً مجانياً، نفّذ ملف SQL المرفق، ثم أدخل رابط المشروع والمفتاح العام (anon/publishable) هنا. لا تضع Service Role Key في الموقع مطلقاً.</p><div class="admin-grid"><div class="field"><label>Supabase Project URL</label><input id="sbUrl" value="${esc(b.url||'')}" placeholder="https://xxxx.supabase.co"></div><div class="field"><label>Supabase Publishable / anon key</label><input id="sbKey" value="${esc(b.key||'')}" placeholder="eyJ..."></div></div><div class="admin-actions"><button class="btn primary" id="connectSb">حفظ الإعدادات والاتصال</button><button class="btn" id="downloadPublicConfig">تنزيل إعداد config.js للنشر</button><button class="btn" id="disconnectSb">فصل الاتصال</button></div><hr style="border:0;border-top:1px solid #ffffff18;margin:22px 0"><h3 style="font-size:14px">دخول المالك</h3><div class="admin-grid"><div class="field"><label>البريد الإلكتروني</label><input id="ownerEmail" type="email" autocomplete="username"></div><div class="field"><label>كلمة المرور</label><input id="ownerPassword" type="password" autocomplete="current-password"></div></div><div class="admin-actions"><button class="btn primary" id="ownerLogin">تسجيل الدخول</button><button class="btn" id="ownerLogout">تسجيل الخروج</button></div><p class="notice">إنشاء حساب المالك يتم من لوحة Authentication في Supabase، ثم إضافة UUID الخاص بالحساب إلى جدول site_owners وفق ملف الإعداد المرفق. سيمنع نظام الصلاحيات الزوار من تعديل المحتوى.</p>`;document.getElementById('connectSb').onclick=async()=>{let url=document.getElementById('sbUrl').value.trim(),key=document.getElementById('sbKey').value.trim();if(!/^https:\/\/.+\.supabase\.co$/.test(url)||!key){toast('أدخل رابط المشروع والمفتاح العام الصحيح');return}localStorage.setItem(CFG,JSON.stringify({url,key}));await initBackend(true)};document.getElementById('downloadPublicConfig').onclick=()=>{let url=document.getElementById('sbUrl').value.trim(),key=document.getElementById('sbKey').value.trim();if(!url||!key){toast('أدخل بيانات المشروع أولاً');return}let blob=new Blob(['window.ALMO_SUPABASE_CONFIG = '+JSON.stringify({url,key},null,2)+';\n'],{type:'text/javascript'});let a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='config.js';a.click();URL.revokeObjectURL(a.href);toast('ارفع config.js إلى جذر مستودع GitHub')};document.getElementById('disconnectSb').onclick=()=>{if(backend&&channel)backend.removeChannel(channel);channel=null;backend=null;localStorage.removeItem(CFG);toast('تم فصل المزامنة');renderAdmin()};document.getElementById('ownerLogin').onclick=async()=>{if(!backend){toast('اتصل بقاعدة البيانات أولاً');return}let {data,error}=await backend.auth.signInWithPassword({email:document.getElementById('ownerEmail').value,password:document.getElementById('ownerPassword').value});if(error)toast('تعذر تسجيل الدخول: '+error.message);else{adminUser=data.user;let {data:existing,error:readErr}=await backend.from('site_content').select('id').eq('id',1).maybeSingle();if(!readErr&&!existing){let {error:seedErr}=await backend.from('site_content').upsert({id:1,payload:state,updated_by:data.user.id});if(seedErr)toast('تم الدخول لكن تعذر تهيئة المحتوى: '+seedErr.message)}let {data:latest}=await backend.from('site_content').select('payload').eq('id',1).maybeSingle();if(latest?.payload){state={...clone(DEFAULT),...latest.payload};localStorage.setItem(STORE,JSON.stringify(state));render()}toast('تم تسجيل الدخول');renderAdmin()}};document.getElementById('ownerLogout').onclick=async()=>{if(backend)await backend.auth.signOut();adminUser=null;toast('تم تسجيل الخروج');renderAdmin()}}
async function initBackend(showToast=false){let b=activeCfg();if(!b.url||!b.key||!window.supabase)return;try{backend=window.supabase.createClient(b.url,b.key);let {data,error}=await backend.from('site_content').select('payload').eq('id',1).maybeSingle();if(error)throw error;if(data&&data.payload){state={...clone(DEFAULT),...data.payload};localStorage.setItem(STORE,JSON.stringify(state));render()}else if(!data){let {data:u}=await backend.auth.getUser();if(u?.user){let {error:e}=await backend.from('site_content').upsert({id:1,payload:state,updated_by:u.user.id});if(e)throw e}}if(channel)backend.removeChannel(channel);channel=backend.channel('site-content-live').on('postgres_changes',{event:'*',schema:'public',table:'site_content',filter:'id=eq.1'},payload=>{if(payload.new?.payload){state={...clone(DEFAULT),...payload.new.payload};localStorage.setItem(STORE,JSON.stringify(state));render();toast('تم تحديث محتوى الموقع من المالك')}}).subscribe();let {data:session}=await backend.auth.getUser();adminUser=session?.user||null;if(showToast)toast('تم الاتصال بقاعدة البيانات');if(document.getElementById('adminOverlay').classList.contains('open'))renderAdmin()}catch(e){backend=null;if(showToast)toast('فشل الاتصال: '+e.message);console.error(e)}}
let saveTimer=null;async function syncSave(){if(!backend)return;clearTimeout(saveTimer);saveTimer=setTimeout(async()=>{let {data:{user}}=await backend.auth.getUser();if(!user){toast('سجّل دخول المالك قبل نشر التغييرات');return}let {error}=await backend.from('site_content').upsert({id:1,payload:state,updated_by:user.id,updated_at:new Date().toISOString()});if(error)toast('تعذر حفظ السحابة: '+error.message);else toast('تم النشر والمزامنة مع صفحة العملاء')},250)}
// New client request form (WhatsApp handoff) keeps the contact flow simple and transparent.
document.getElementById('soundToggle').onclick=()=>{soundOn=!soundOn;let b=document.getElementById('soundToggle');b.classList.toggle('off',!soundOn);b.textContent=soundOn?'♫':'♪';b.title=soundOn?'إيقاف المؤثرات الصوتية':'تشغيل المؤثرات الصوتية';if(soundOn)play('success')};
let showcase=true;function startShowcase(){clearInterval(showcaseTimer);showcaseTimer=setInterval(()=>{if(!document.hidden&&!document.getElementById('detailPage').classList.contains('open')&&!document.getElementById('adminOverlay').classList.contains('open'))go(active+1)},9000)}['pointerdown','keydown','touchstart'].forEach(ev=>document.addEventListener(ev,()=>{if(showcase){clearInterval(showcaseTimer);setTimeout(startShowcase,12000)}},{passive:true}));

/* ===== Cinematic layer, adaptive theme, interaction fixes ===== */
const THEME_MAP={obsidian:'radial-gradient(ellipse at 50% -15%,rgba(43,75,116,.62),transparent 48%),radial-gradient(ellipse at 8% 42%,rgba(10,104,112,.16),transparent 32%),linear-gradient(145deg,#070b13 0%,#0b1422 52%,#080d17 100%)',pearl:'linear-gradient(135deg,#fbfcff 0%,#edf2f8 52%,#f8f5ef 100%)',ice:'linear-gradient(135deg,#f8fcff,#e5f1fb 55%,#f5f9ff)',ivory:'linear-gradient(135deg,#fffdf7,#f3eadb 55%,#fffaf0)',sage:'linear-gradient(135deg,#fbfffd,#e5f1eb 55%,#f8fcf9)',silver:'linear-gradient(135deg,#fff,#e6eaf0 48%,#f8fafc)',blush:'linear-gradient(125deg,#fff8f8,#f4e8ef 50%,#edf3fc)',aurora:'linear-gradient(120deg,#fff7e8,#e7f2f5,#f2eafa,#fff)',sky:'linear-gradient(120deg,#f7fbff,#dcecff,#f9f4e8)'};
const LIGHT_PRESETS=['pearl','ice','ivory','sage','silver','blush','aurora','sky'];
function hexLum(h){let m=/^#?([0-9a-f]{6})$/i.exec(String(h||''));if(!m)return 0;let n=parseInt(m[1],16);return (0.299*(n>>16&255)+0.587*(n>>8&255)+0.114*(n&255))/255}
function applyTheme(){
  let t=state.theme||{preset:'pearl'};
  let bg=t.custom||THEME_MAP[t.preset]||THEME_MAP.pearl;
  let light=(t.custom&&/^#/.test(t.custom))?hexLum(t.custom)>.6:LIGHT_PRESETS.includes(t.preset);
  document.documentElement.style.setProperty('--client-wallpaper',bg);
  document.documentElement.style.setProperty('background',light?'#f5f7fb':'#070b13','important');document.documentElement.style.colorScheme=light?'light':'dark';
  document.body.classList.toggle('lt',!!light);
  document.body.classList.toggle('wallpaper-motion',!!t.motion);
}
(function cinematic(){
  document.documentElement.classList.add('js');
  const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const cv=document.getElementById('fx'),ctx=cv.getContext('2d');
  const ORBS=[{x:.18,y:.25,r:340,c:'rgba(255,205,110,.13)',sp:.00012,ph:0,d:.6},{x:.86,y:.7,r:380,c:'rgba(70,130,190,.12)',sp:.0001,ph:2,d:-.5},{x:.5,y:.95,r:300,c:'rgba(255,190,80,.09)',sp:.00015,ph:4,d:.3}];
  let W=1,H=1,DPR=1,parts=[],tx=0,ty=0,mx=0,my=0;
  function resize(){
    DPR=Math.min(window.devicePixelRatio||1,2);W=window.innerWidth;H=window.innerHeight;
    cv.width=W*DPR;cv.height=H*DPR;cv.style.width=W+'px';cv.style.height=H+'px';
    ctx.setTransform(DPR,0,0,DPR,0,0);
    parts=Array.from({length:Math.min(110,Math.round(W/16))},()=>({x:Math.random()*W,y:Math.random()*H,z:.25+Math.random()*.75,s:Math.random()*.6+.4}));
  }
  function draw(t){
    ctx.clearRect(0,0,W,H);
    const ox=mx*26,oy=my*18;
    const stObj=(window.state&&window.state.style)||{};
    const lMult=stObj.lightingMode==='off'?0:Math.max(0,Math.min(2.5,(Number(stObj.lightingIntensity ?? 100))/100));
    const rgb=window.__glowRgb||'255,211,111';
    if(lMult>0.01){
      for(const o of ORBS){
        const x=o.x*W+Math.sin(t*o.sp+o.ph)*60+ox*o.d, y=o.y*H+Math.cos(t*o.sp*.8+o.ph)*50+oy*o.d;
        const g=ctx.createRadialGradient(x,y,0,x,y,o.r);
        const alpha=Math.min(0.42,0.15*lMult).toFixed(3);
        g.addColorStop(0,'rgba('+rgb+','+alpha+')');g.addColorStop(1,'rgba(0,0,0,0)');
        ctx.fillStyle=g;ctx.fillRect(x-o.r,y-o.r,o.r*2,o.r*2);
      }
      for(const p of parts){
        if(!reduce){p.y-=.18*p.z;if(p.y<-8){p.y=H+8;p.x=Math.random()*W}}
        const x=p.x+ox*p.z*1.4,y=p.y+oy*p.z*1.4;
        ctx.beginPath();ctx.arc(x,y,p.s*p.z*1.6,0,Math.PI*2);
        ctx.fillStyle='rgba('+rgb+','+(Math.min(0.95,(.18+.55*p.z)*lMult)).toFixed(2)+')';ctx.fill();
      }
    }
  }
  let lastX=9,lastY=9;function loop(t){
    mx+=(tx-mx)*.05;my+=(ty-my)*.05;
    const st=document.documentElement.style;
    if(Math.abs(mx-lastX)>.002||Math.abs(my-lastY)>.002){lastX=mx;lastY=my;st.setProperty('--mx',mx.toFixed(3));st.setProperty('--my',my.toFixed(3));}
    draw(t);
    if(!reduce)requestAnimationFrame(loop);
  }
  window.addEventListener('pointermove',e=>{tx=e.clientX/W*2-1;ty=e.clientY/H*2-1},{passive:true});
  window.addEventListener('resize',resize);
  resize();requestAnimationFrame(loop);
  if(!reduce){
    const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12});
    document.querySelectorAll('.section-head,.features,.projects,.builder,.detail-preview,.hero-copy,.carousel-controls').forEach((el,i)=>{el.classList.add('rv');el.style.transitionDelay=(i%5)*80+'ms';io.observe(el)});
  }
  document.addEventListener('keydown',e=>{
    if(e.key==='Escape'){
      ['detailPage','serviceModal','adminOverlay','ownerGate','workModal'].forEach(id=>document.getElementById(id).classList.remove('open'));closeWork();
      return;
    }
    const tag=(document.activeElement&&document.activeElement.tagName)||'';
    if(/INPUT|TEXTAREA|SELECT/.test(tag))return;
    if(document.getElementById('detailPage').classList.contains('open')||document.getElementById('adminOverlay').classList.contains('open'))return;
    if(e.key==='ArrowLeft')go(active+1);
    if(e.key==='ArrowRight')go(active-1);
  });
})();


/* ===== v2: 3D service medallions keyed by service ===== */
const SVC_ICON={p1:'web',p2:'store',p3:'mobile',p4:'ux',p5:'admin',p6:'erp',p7:'auto',p8:'menu3d',p9:'brand',p10:'db',p11:'maint',p12:'custom'};
const ICON_PATHS={
 web:'<circle r="22"/><ellipse rx="10" ry="22"/><path d="M-22 0H22M-17 -11H17M-17 11H17"/>',
 store:'<path d="M-24 -6H24L20 22H-20Z"/><path d="M-12 -6V-14A12 12 0 0 1 12 -14V-6"/>',
 mobile:'<rect x="-14" y="-24" width="28" height="48" rx="6"/><path d="M-5 16H5"/>',
 ux:'<rect x="-24" y="-20" width="48" height="36" rx="5"/><path d="M-24 -10H24"/><path d="M-2 0L-2 14L3 10L7 19L10 17.5L6 9L12 9Z"/>',
 admin:'<rect x="-24" y="-24" width="48" height="48" rx="7"/><path d="M-12 12V2M0 12V-8M12 12V-3"/>',
 erp:'<circle cx="0" cy="-14" r="6"/><circle cx="-16" cy="10" r="6"/><circle cx="16" cy="10" r="6"/><path d="M-5 -9L-11 5M5 -9L11 5M-10 10H10"/>',
 auto:'<path d="M18 -6A20 20 0 0 0 -16 -12"/><path d="M-18 6A20 20 0 0 0 16 12"/><path d="M-16 -12V-22M-16 -12H-6M16 12V22M16 12H6"/>',
 menu3d:'<path d="M0 -24L21 -12V12L0 24L-21 12V-12Z"/><path d="M0 0L21 -12M0 0V24M0 0L-21 -12"/>',
 brand:'<path d="M0 -24L5 -5L24 0L5 5L0 24L-5 5L-24 0L-5 -5Z"/>',
 db:'<ellipse cx="0" cy="-14" rx="20" ry="7"/><path d="M-20 -14V14A20 7 0 0 0 20 14V-14"/><path d="M-20 0A20 7 0 0 0 20 0"/>',
 maint:'<circle cx="8" cy="-8" r="12"/><path d="M-2 2L-18 18L-22 14L-6 -2"/>',
 custom:'<path d="M0 -24C10 -14 12 0 10 12L0 22L-10 12C-12 0 -10 -14 0 -24Z"/><circle cx="0" cy="-4" r="4"/><path d="M-10 12L-18 20M10 12L18 20"/>'
};
function svcIc(p){const k=(typeof SVC_ICON==='object'&&SVC_ICON[p.id]);const d=k&&ICON_PATHS[k];return d?'<span class="svc-ic"><svg viewBox="-24 -24 48 48" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+d+'</svg></span>':esc(p.icon||'')+' ';}
function artSvgLegacy(p,i){
  const key=SVC_ICON[p.id]||'custom';
  const g=ICON_PATHS[key]||ICON_PATHS.custom;
  const u='sv'+i+String(p.id||'').replace(/[^a-z0-9]/gi,'');
  return '<svg class="service-art" viewBox="0 0 128 128" aria-hidden="true"><defs>'+
    '<linearGradient id="'+u+'t" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff8dc"/><stop offset=".38" stop-color="#ffd36f"/><stop offset=".75" stop-color="#b77b28"/><stop offset="1" stop-color="#6b4512"/></linearGradient>'+
    '<linearGradient id="'+u+'s" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8a5a1a"/><stop offset="1" stop-color="#2e1d07"/></linearGradient>'+
    '<radialGradient id="'+u+'h" cx=".32" cy=".2" r=".65"><stop offset="0" stop-color="#fff" stop-opacity=".9"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>'+
    '</defs>'+
    '<rect x="14" y="22" width="100" height="100" rx="30" fill="url(#'+u+'s)"/>'+
    '<rect x="10" y="10" width="108" height="108" rx="30" fill="url(#'+u+'t)"/>'+
    '<rect x="10" y="10" width="108" height="56" rx="30" fill="url(#'+u+'h)"/>'+
    '<g transform="translate(64 64) scale(1.7)" fill="none" stroke-linecap="round" stroke-linejoin="round">'+
    '<g stroke="#fff" stroke-opacity=".75" stroke-width="3" transform="translate(.8 1.1)">'+g+'</g>'+
    '<g stroke="#0f1d33" stroke-width="3">'+g+'</g></g></svg>';
}


/* ===== v3: service details, Arabic and sales-oriented ===== */
function closeDetail(){
  const page=document.getElementById('detailPage');
  page.classList.remove('open');page.setAttribute('aria-hidden','true');
  try{history.replaceState(null,'',location.pathname+location.search)}catch(e){}
}
document.getElementById('closeDetails').onclick=closeDetail;
function openDetail(id){
  const p=state.products.find(x=>x.id===id);
  if(!p)return;
  play('open');
  const page=document.getElementById('detailPage');
  const feats=svcText(p,'features')||p.features||[];
  const steps=[
    ['1',TR('نفهم هدفك','We understand your goal'),TR('جلسة قصيرة لمعرفة نشاطك وجمهورك والنتيجة التي تريدها من هذه الخدمة.','A short session to learn about your business, audience, and the result you want from this service.')],
    ['2',TR('نحدد النطاق','We define the scope'),TR('نثبت الصفحات أو الوظائف المطلوبة والسعر والمراحل قبل أي تنفيذ، بلا مفاجآت.','We fix the required pages or features, the price, and the phases before any work - no surprises.')],
    ['3',TR('ننفذ ونراجع','We build and review'),TR('نبني الحل خطوة بخطوة، وتراجع معنا كل مرحلة قبل الانتقال للتي بعدها.','We build the solution step by step, and you review each phase with us before moving to the next.')],
    ['4',TR('نسلّم ونرافق','We deliver and stay with you'),TR('تسليم مرتب مع شرح لطريقة التشغيل، ودعم بعد الإطلاق حسب الاتفاق.','A tidy handover with operating instructions, plus post-launch support as agreed.')]
  ];
  const msg=encodeURIComponent(TR('مرحباً، أريد طلب هذه الخدمة: ','Hello, I would like to order this service: ')+svcText(p,'name')+(p.price?' ('+svcText(p,'price')+')':'')+TR('. أرجو التواصل لمناقشة التفاصيل.','. Please contact me to discuss the details.'));
  const link=wa()+'?text='+msg;
  document.getElementById('detailBody').innerHTML=
    '<div class="detail-hero">'+
      '<div class="detail-emblem">'+artSvg(p,state.products.indexOf(p))+'</div>'+
      '<div>'+
        '<div class="eyebrow">'+TR('تفاصيل الخدمة','SERVICE DETAILS')+'</div>'+
        '<h1>'+esc(svcText(p,'name'))+'</h1>'+
        '<p class="detail-lead">'+esc(svcText(p,'desc'))+'</p>'+
        '<div class="detail-price">'+esc(svcText(p,'price')||TR('حسب الطلب','On request'))+'</div>'+
        '<div class="detail-actions">'+
          '<a class="btn primary" href="'+link+'" target="_blank" rel="noopener">'+TR('اطلب هذه الخدمة الآن','Order this service now')+'</a>'+
          '<button class="btn" id="detailBack">'+TR('العودة للخدمات','Back to services')+'</button>'+
        '</div>'+
      '</div>'+
    '</div>'+
    '<div class="detail-columns">'+
      '<section class="info-panel">'+
        '<h3>'+TR('ماذا تقدم لك هذه الخدمة؟','What does this service give you?')+'</h3>'+
        '<p>'+esc(svcText(p,'details')||svcText(p,'desc'))+'</p>'+
        '<h3 style="margin-top:22px">'+TR('المزايا التي ستحصل عليها','Benefits you will receive')+'</h3>'+
        '<ul class="benefit-list">'+feats.map(x=>'<li>'+esc(x)+'</li>').join('')+'</ul>'+
      '</section>'+
      '<aside class="info-panel">'+
        '<h3>'+TR('كيف نعمل معك؟','How we work with you')+'</h3>'+
        '<div class="steps">'+steps.map(s=>'<div class="step"><span class="step-n">'+s[0]+'</span><div><strong>'+s[1]+'</strong><p>'+s[2]+'</p></div></div>').join('')+'</div>'+
        '<h3 style="margin-top:22px">'+TR('لماذا تختارنا؟','Why choose us?')+'</h3>'+
        '<ul class="benefit-list"><li>'+TR('نطاق واضح وسعر معروف قبل البدء','Clear scope and known price before we start')+'</li><li>'+TR('تصميم مخصص لنشاطك وليس قالباً جاهزاً','A design tailored to your business, not a ready-made template')+'</li><li>'+TR('تواصل مباشر معنا عبر واتساب في كل مرحلة','Direct WhatsApp contact with us at every stage')+'</li></ul>'+
        '<div class="feature-chips" style="margin-top:16px"><span class="chip">'+TR('نطاق واضح','Clear scope')+'</span><span class="chip">'+TR('تطوير حسب الحاجة','Built around your needs')+'</span><span class="chip">'+TR('قابل للتوسع','Scalable')+'</span></div>'+
        '<p class="price-note">'+TR('السعر المعروض تقديري، ويُثبَّت بعد مراجعة متطلباتك.','The shown price is an estimate and is finalized after reviewing your requirements.')+'</p>'+
      '</aside>'+
    '</div>'+
    '<div class="detail-cta"><div><strong>'+TR('جاهز تبدأ؟','Ready to start?')+'</strong><span>'+TR('أرسل فكرتك الآن وستحصل على تصور مبدئي وعرض سعر واضح.','Send your idea now and get an initial concept and a clear quote.')+'</span></div>'+
      '<a class="btn primary" href="'+link+'" target="_blank" rel="noopener">'+TR('ابدأ مشروعك عبر واتساب','Start your project on WhatsApp')+'</a></div>';
  document.getElementById('detailBack').onclick=closeDetail;
  page.classList.add('open');
  page.setAttribute('aria-hidden','false');
  page.scrollTop=0;
  try{history.replaceState(null,'','#service-'+encodeURIComponent(id))}catch(e){}
}


/* ===== v4 logic ===== */
const selected=new Set();
function chosen(){return visibleProducts().filter(p=>selected.has(p.id))}
function syncSelected(){
  document.querySelectorAll('.service-card').forEach(c=>{
    const on=selected.has(c.dataset.id);
    c.classList.toggle('selected',on);
    const h=c.querySelector('.hint');
    if(h&&c.classList.contains('active'))h.textContent=on?TR('✓ مختارة — اضغط لاستكشاف الخدمة','✓ Selected - tap to explore the service'):TR('اضغط لاستكشاف الخدمة','Tap to explore the service');
  });
  document.querySelectorAll('[data-tray]').forEach(b=>b.classList.toggle('selected',selected.has(b.dataset.tray)));
}
function updateEstimate(){
  const ps=chosen();
  const custom=ps.some(p=>!priceNum(p.price));
  const sum=ps.reduce((a,p)=>a+priceNum(p.price),0);
  document.getElementById('estimateTotal').textContent=custom?TR('يحتاج عرضاً مخصصاً','Needs a custom quote'):money(sum);
  document.getElementById('estimateCount').textContent=ps.length?ps.length+TR(' خدمة مختارة — تقدير أولي غير ملزم',' service(s) selected - non-binding initial estimate'):TR('لم تختر خدمات بعد','No services selected yet');
  document.getElementById('estimateItems').innerHTML=ps.length?ps.map(p=>'<li>'+esc(svcText(p,'name'))+' - '+esc(svcText(p,'price')||TR('حسب الطلب','On request'))+'</li>').join(''):'<li>'+TR('اضغط على الخدمة في العرض أعلاه لتحديدها وإضافتها لمشروعك.','Tap a service in the showcase above to select it and add it to your project.')+'</li>';
}
function toggleSelect(id){
  if(selected.has(id))selected.delete(id);else selected.add(id);
  play('success');
  updateEstimate();syncSelected();
}
function renderBuilder(){
  const ps=visibleProducts();
  const box=document.getElementById('builderList');
  box.innerHTML=ps.map((p,i)=>'<button type="button" class="tray-item" data-tray="'+esc(p.id)+'"><span class="mini">'+artSvg(p,i+100)+'</span><span class="lbl">'+esc(svcText(p,'name'))+'</span><span class="prc">'+esc(p.price||'حسب الطلب')+'</span></button>').join('');
  box.querySelectorAll('[data-tray]').forEach(b=>b.onclick=()=>toggleSelect(b.dataset.tray));
  updateEstimate();syncSelected();
}
{
  const __rc=renderCarousel;
  renderCarousel=function(){__rc();syncSelected()};
}
function openWhatsApp(url){
  let w=null;
  try{w=window.open(url,'_blank')}catch(e){}
  if(!w)showWaFallback(url);
}
function showWaFallback(url){
  let box=document.getElementById('waFallback');
  if(!box){box=document.createElement('div');box.id='waFallback';box.className='wa-fallback';document.body.appendChild(box)}
  const num=String(state.whatsapp||'').replace(/\D/g,'');
  box.innerHTML='<div class="wa-card"><button class="gate-close" id="waClose" aria-label="إغلاق">×</button><h3>تواصل مع المالك</h3><p>تعذّر فتح واتساب تلقائياً من هذه الصفحة. اضغط "فتح واتساب"، أو اتصل بالرقم مباشرة:</p><a class="btn primary" href="'+url+'" target="_blank" rel="noopener">فتح واتساب</a><a class="btn" href="tel:+'+num+'">اتصال: +'+num+'</a><button class="btn" id="waCopy">نسخ الرقم</button></div>';
  box.classList.add('open');
  document.getElementById('waClose').onclick=()=>box.classList.remove('open');
  document.getElementById('waCopy').onclick=()=>{try{navigator.clipboard.writeText('+'+num);toast(TR('تم نسخ الرقم','Number copied'))}catch(e){toast('+'+num)}};
}

document.getElementById('sendProject').onclick=()=>{
  const ps=chosen();
  if(!ps.length){toast(TR('اختر خدمة واحدة على الأقل من العرض','Choose at least one service from the showcase'));return}
  const msg=TR('أرغب في عرض سعر لمشروع يتضمن:','I would like a quote for a project that includes:')+'\n'+ps.map(p=>'• '+svcText(p,'name')+' ('+(svcText(p,'price')||TR('حسب الطلب','On request'))+')').join('\n')+'\n'+TR('برجاء التواصل لمناقشة التفاصيل.','Please contact me to discuss the details.');
  showWaFallback(wa()+'?text='+encodeURIComponent(msg));
};
/* Appearance: apply theme + text colors + title motion + lighting */
const LIGHT_COLORS={gold:'#ffd36f',neon:'#38bdf8',emerald:'#34d399',royal:'#c084fc',crimson:'#fb7185',white:'#f8fafc'};
function hexToRgbStr(hex){
  const m=/^#?([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i.exec(String(hex||'').trim());
  if(!m)return '255,211,111';
  return parseInt(m[1],16)+','+parseInt(m[2],16)+','+parseInt(m[3],16);
}
function parseRgb(hex){
  const s=String(hex||'').trim().replace(/^#/,'');
  if(/^[0-9a-f]{3}$/i.test(s)){
    return [parseInt(s[0]+s[0],16),parseInt(s[1]+s[1],16),parseInt(s[2]+s[2],16)];
  }
  if(/^[0-9a-f]{6}$/i.test(s)){
    return [parseInt(s.slice(0,2),16),parseInt(s.slice(2,4),16),parseInt(s.slice(4,6),16)];
  }
  return null;
}
function rgbToHex(r,g,b){
  const cl=v=>Math.max(0,Math.min(255,Math.round(v))).toString(16).padStart(2,'0');
  return '#'+cl(r)+cl(g)+cl(b);
}
function mixRgb(c1,c2,w1){
  const w2=1-w1;
  return [c1[0]*w1+c2[0]*w2, c1[1]*w1+c2[1]*w2, c1[2]*w1+c2[2]*w2];
}
function getLumRgb(rgb){
  if(!rgb)return 0.5;
  return (0.299*rgb[0]+0.587*rgb[1]+0.114*rgb[2])/255;
}
function isPageLight(th){
  const t=th||state.theme||{preset:'pearl'};
  if(t.custom&&/^#/.test(t.custom))return hexLum(t.custom)>0.48;
  return LIGHT_PRESETS.includes(t.preset);
}
function smartContrastHex(rawHex, isLightSurface, role){
  const rgb=parseRgb(rawHex);
  if(!rgb){
    if(role==='gold')return isLightSurface?'#9a5806':'#ffd875';
    return isLightSurface?'#091526':'#f8fbff';
  }
  const lum=getLumRgb(rgb);
  const maxC=Math.max(rgb[0],rgb[1],rgb[2]), minC=Math.min(rgb[0],rgb[1],rgb[2]);
  const chroma=(maxC-minC)/255;
  if(isLightSurface){
    // On a light surface, text MUST be dark & bold to have strong 3D contrast
    if(role==='gold'){
      if(lum>0.40)return '#9a5806';
      return rawHex;
    }
    if(lum>0.28){
      if(chroma<0.25)return '#091526';
      const darkened=mixRgb(rgb,[9,21,38],0.28);
      return rgbToHex(darkened[0],darkened[1],darkened[2]);
    }
    return rawHex;
  }else{
    // On a dark surface, text MUST be bright & luminous
    if(role==='gold'){
      if(lum<0.62)return '#ffd875';
      return rawHex;
    }
    if(lum<0.68){
      if(chroma<0.25)return '#f8fbff';
      const brightened=mixRgb(rgb,[255,255,255],0.26);
      return rgbToHex(brightened[0],brightened[1],brightened[2]);
    }
    return rawHex;
  }
}
function build3DShadow(hexColor, isLightSurface, isGold){
  const rgb=parseRgb(hexColor)||[9,21,38];
  if(isLightSurface){
    if(isGold){
      return '0 1px 0 #fffdf5, 0 2px 0 #d4a359, 0 3px 0 #703e03, 0 4px 0 #4a2801, 0 7px 14px rgba(45,25,0,.38)';
    }
    const mid=rgbToHex(rgb[0]*0.6+80,rgb[1]*0.6+90,rgb[2]*0.6+105);
    const deep=rgbToHex(rgb[0]*0.35+20,rgb[1]*0.35+30,rgb[2]*0.35+45);
    return '0 1px 0 #ffffff, 0 2px 0 #cbd5e1, 0 3px 0 '+mid+', 0 4px 0 '+deep+', 0 7px 14px rgba(9,21,38,.38)';
  }else{
    if(isGold){
      return '0 1px 0 #fffbe6, 0 2px 0 #c98e2c, 0 3px 0 #8c5d12, 0 4px 0 #4d3004, 0 8px 18px rgba(0,0,0,.92), 0 0 24px rgba(255,211,111,.45)';
    }
    return '0 1px 0 #ffffff, 0 2px 0 #94a3b8, 0 3px 0 #475569, 0 4px 0 #1e293b, 0 8px 18px rgba(0,0,0,.92), 0 0 20px rgba(255,255,255,.22)';
  }
}
function renderBrand(override){
  const b=override||state.branding||{};
  const frame=document.getElementById('brandFrame'),name=document.getElementById('brandName'),logo=document.getElementById('brandLogo');
  if(!frame||!name)return;
  const light=isPageLight();
  const raw=String(b.name||state.brand||'ALMOHANDIS - SYSTEMS').trim();
  const parts=raw.split(/\s*-\s*/);
  const left=parts.shift()||raw,right=parts.join(' - ');
  name.innerHTML='<span class="a"></span><span class="b"></span>';
  name.children[0].textContent=left;
  name.children[1].textContent=right?'- '+right:'';
  const mode=b.mode||'3d';
  name.style.display=mode==='logo'?'none':'flex';
  const w=Math.max(55,Math.min(95,Number(b.frameWidth)||75));
  frame.style.setProperty('--brand-w',w+'%');
  frame.style.width=(window.innerWidth<=760?94:w)+'%';
  const rawA=b.colorA||'#9a5806';
  const rawB=b.colorB||'#091526';
  const effA=smartContrastHex(rawA, light, 'gold');
  const effB=smartContrastHex(rawB, light, 'ink');
  const shadA=build3DShadow(effA, light, true);
  const shadB=build3DShadow(effB, light, false);
  frame.style.setProperty('--brand-a',effA);
  frame.style.setProperty('--brand-b',effB);
  frame.style.setProperty('--brand-a-eff',effA);
  frame.style.setProperty('--brand-b-eff',effB);
  frame.style.setProperty('--brand-a-shadow',shadA);
  frame.style.setProperty('--brand-b-shadow',shadB);
  if(name.children[0]&&mode!=='glass'){
    name.children[0].style.setProperty('color',effA,'important');
    name.children[0].style.setProperty('-webkit-text-fill-color',effA,'important');
    name.children[0].style.setProperty('text-shadow',(mode!=='2d'&&!document.body.classList.contains('lt'))?shadA:'0 1px 0 #6d3f04,0 2px 0 #54300a,0 3px 0 #3d2206,0 4px 6px rgba(30,18,0,.35)','important');
  }
  if(name.children[1]&&mode!=='glass'){
    name.children[1].style.setProperty('color',effB,'important');
    name.children[1].style.setProperty('-webkit-text-fill-color',effB,'important');
    name.children[1].style.setProperty('text-shadow',(mode!=='2d'&&!document.body.classList.contains('lt'))?shadB:'0 1px 0 #ffffff,0 2px 0 #93a5bd,0 3px 0 #5c6f8c,0 4px 6px rgba(15,28,49,.35)','important');
  }
  frame.className=frame.className.replace(/\s?brand-(2d|3d|sweep|float|pulse|rotate|spin3d|bounce|glow|glass)\b/g,'');
  if(mode==='2d')frame.classList.add('brand-2d');
  else if(mode!=='glass')frame.classList.add('brand-3d');if(mode==='glass')frame.classList.add('brand-glass');
  if(b.animation&&b.animation!=='none')frame.classList.add('brand-'+b.animation);
  const sub=document.getElementById('brandSubtitle');
  if(sub){sub.textContent=b.subtitle||'';sub.style.display=b.subtitle?'':'none';}
  if(b.logoUrl){logo.src=b.logoUrl;logo.style.display='block'}else{logo.removeAttribute('src');logo.style.display='none'}
}
function applyTheme(th,stl){
  const t=th||state.theme||{preset:'pearl'};
  const st=stl||state.style||{};
  window.state=state;
  const bg=t.custom||THEME_MAP[t.preset]||THEME_MAP.pearl;
  const light=isPageLight(t);
  const root=document.documentElement.style;
  root.setProperty('--client-wallpaper',bg);
  root.setProperty('background',light?'#f5f7fb':'#070b13','important');
  root.colorScheme=light?'light':'dark';
  document.body.classList.toggle('lt',!!light);
  const effHead=st.headingColor?smartContrastHex(st.headingColor,light,'ink'):(light?'#091526':'#ffffff');
  const effAccent=light?'#9a5806':'#ffd875';
  const effCardHead=st.headingColor?smartContrastHex(st.headingColor,false,'ink'):'#ffffff';
  root.setProperty('--ink-h',effHead);
  root.setProperty('--ink-accent',effAccent);
  root.setProperty('--card-ink-h',effCardHead);
  root.setProperty('--ink-h-shadow',build3DShadow(effHead,light,false));
  root.setProperty('--ink-accent-shadow',build3DShadow(effAccent,light,true));
  document.body.classList.toggle('has-custom-head',!!st.headingColor);

  const effBody=st.bodyColor?smartContrastHex(st.bodyColor,light,'ink'):(light?'#122238':'#eef4fc');
  const effCardBody=st.bodyColor?smartContrastHex(st.bodyColor,false,'ink'):'#eef4fc';
  root.setProperty('--ink-b',effBody);
  root.setProperty('--card-ink-b',effCardBody);
  root.setProperty('--ink-b-shadow',light?'0 1px 0 #ffffff, 0 2px 4px rgba(9,21,38,.14)':'0 1px 0 #0f172a, 0 2px 6px rgba(0,0,0,.92)');
  document.body.classList.toggle('has-custom-body',!!st.bodyColor);

  const lMode=st.lightingMode||'gold';
  const lColor=lMode==='custom'?(st.lightingColor||'#ffd36f'):(LIGHT_COLORS[lMode]||'#ffd36f');
  const lMult=lMode==='off'?0:Math.max(0,Math.min(2.5,(Number(st.lightingIntensity ?? 100))/100));
  const rgbStr=hexToRgbStr(lColor);
  window.__glowRgb=rgbStr;
  root.setProperty('--glow-color',lColor);
  root.setProperty('--glow-rgb',rgbStr);
  root.setProperty('--glow-mult',String(lMult));
  document.body.classList.toggle('light-off',lMode==='off'||lMult===0);
  document.body.classList.toggle('wallpaper-motion',!!t.motion);
  ['ta-none','ta-rise','ta-shimmer','ta-glow','ta-tilt'].forEach(c=>document.body.classList.remove(c));
  document.body.classList.add('ta-'+(st.titleAnim||'rise'));
  ['ba-none','ba-float','ba-pulse'].forEach(c=>document.body.classList.remove(c));
  document.body.classList.add('ba-'+(st.bodyAnim||'none'));
  renderBrand();
}
function miniSel(id,opts,cur){return '<select id="'+id+'">'+opts.map(o=>'<option value="'+o[0]+'"'+(o[0]===cur?' selected':'')+'>'+o[1]+'</option>').join('')+'</select>'}
function adminAppearance(p){
  const t=state.theme||{preset:'pearl'}, st=state.style||{};
  const isSolid=!!(t.custom&&/^#/.test(t.custom));
  const curPreset=t.preset||'pearl';
  const curTitle=st.titleAnim||'rise';
  const curLightMode=st.lightingMode||'gold';
  const curLightColor=st.lightingColor||(LIGHT_COLORS[curLightMode]||'#ffd36f');
  const curLightInt=st.lightingIntensity ?? 100;
  p.innerHTML='<div class="status good">خلفية الصفحة وألوان النصوص وحركتها والإضاءات. "معاينة" تُظهر التغيير دون حفظ، و"حفظ ونشر" يطبقه على العملاء.</div>'+
  '<div class="admin-grid">'+
    '<div class="field"><label>الخلفية الجاهزة</label><select id="apPreset">'+
      '<option value="obsidian"'+(curPreset==='obsidian'?' selected':'')+'>أسود زجاجي داكن</option>'+
      '<option value="pearl"'+(curPreset==='pearl'?' selected':'')+'>لؤلؤي أبيض</option>'+
      '<option value="ice"'+(curPreset==='ice'?' selected':'')+'>أزرق جليدي</option>'+
      '<option value="ivory"'+(curPreset==='ivory'?' selected':'')+'>عاجي دافئ</option>'+
      '<option value="sage"'+(curPreset==='sage'?' selected':'')+'>أخضر زجاجي</option>'+
      '<option value="silver"'+(curPreset==='silver'?' selected':'')+'>فضي معدني</option>'+
      '<option value="blush"'+(curPreset==='blush'?' selected':'')+'>وردي لؤلؤي</option>'+
      '<option value="aurora"'+(curPreset==='aurora'?' selected':'')+'>تدرج أورورا فاتح</option>'+
      '<option value="sky"'+(curPreset==='sky'?' selected':'')+'>سماء صافية</option>'+
    '</select></div>'+
    '<div class="field"><label>نوع الخلفية</label><select id="apKind">'+
      '<option value="gradient"'+(!isSolid?' selected':'')+'>تدرج جاهز</option>'+
      '<option value="solid"'+(isSolid?' selected':'')+'>لون سادة مخصص</option>'+
    '</select></div>'+
    '<div class="field"><label>اللون المخصص (للخلفية السادة)</label><input id="apColor" type="color" value="'+(isSolid?t.custom:'#f5f7fb')+'"></div>'+
    '<div class="field"><label>حركة الخلفية</label><select id="apMotion">'+
      '<option value="off"'+(!t.motion?' selected':'')+'>ثابتة</option>'+
      '<option value="on"'+(t.motion?' selected':'')+'>تدرج بطيء</option>'+
    '</select></div>'+
    '<div class="field"><label>حركة العناوين الرئيسية</label><select id="apTitle">'+
      '<option value="none"'+(curTitle==='none'?' selected':'')+'>بدون حركة</option>'+
      '<option value="rise"'+(curTitle==='rise'?' selected':'')+'>طفو وصعود ناعم</option>'+
      '<option value="shimmer"'+(curTitle==='shimmer'?' selected':'')+'>لمعة سينمائية 3D</option>'+
      '<option value="glow"'+(curTitle==='glow'?' selected':'')+'>توهج نابض</option>'+
      '<option value="tilt"'+(curTitle==='tilt'?' selected':'')+'>ميلان ثلاثي الأبعاد</option>'+
    '</select></div>'+
    '<div class="field"><label>حركة النصوص والفقرات</label><select id="apBodyAnim">'+
      '<option value="none"'+((st.bodyAnim||'none')==='none'?' selected':'')+'>ثابتة وواضحة</option>'+
      '<option value="float"'+((st.bodyAnim||'none')==='float'?' selected':'')+'>انسياب هادئ</option>'+
      '<option value="pulse"'+((st.bodyAnim||'none')==='pulse'?' selected':'')+'>نبض هادئ</option>'+
    '</select></div>'+
    '<div class="field"><label>نمط الإضاءة والتوهج</label><select id="apLightMode">'+
      '<option value="gold"'+(curLightMode==='gold'?' selected':'')+'>إضاءة ذهبية دافئة</option>'+
      '<option value="neon"'+(curLightMode==='neon'?' selected':'')+'>إضاءة نيون سماوية</option>'+
      '<option value="emerald"'+(curLightMode==='emerald'?' selected':'')+'>إضاءة زمردية</option>'+
      '<option value="royal"'+(curLightMode==='royal'?' selected':'')+'>إضاءة أرجوانية</option>'+
      '<option value="crimson"'+(curLightMode==='crimson'?' selected':'')+'>إضاءة ياقوتية</option>'+
      '<option value="white"'+(curLightMode==='white'?' selected':'')+'>إضاءة بيضاء</option>'+
      '<option value="custom"'+(curLightMode==='custom'?' selected':'')+'>لون إضاءة مخصص</option>'+
      '<option value="off"'+(curLightMode==='off'?' selected':'')+'>إيقاف الإضاءة</option>'+
    '</select></div>'+
    '<div class="field"><label>لون الإضاءة المخصص</label><input id="apLightColor" type="color" value="'+esc(curLightColor)+'"></div>'+
    '<div class="field"><label>شدة الإضاءة (%)</label><input id="apLightIntensity" type="range" min="0" max="200" step="5" value="'+curLightInt+'"></div>'+
    '<div class="field"><label>لون العناوين</label><select id="apHeadMode">'+
      '<option value="auto"'+(!st.headingColor?' selected':'')+'>تلقائي حسب الخلفية</option>'+
      '<option value="custom"'+(st.headingColor?' selected':'')+'>لون محدد</option>'+
    '</select><input id="apHead" type="color" value="'+(st.headingColor||'#0f1c31')+'" style="margin-top:8px"></div>'+
    '<div class="field"><label>لون النصوص</label><select id="apBodyMode">'+
      '<option value="auto"'+(!st.bodyColor?' selected':'')+'>تلقائي حسب الخلفية</option>'+
      '<option value="custom"'+(st.bodyColor?' selected':'')+'>لون محدد</option>'+
    '</select><input id="apBody" type="color" value="'+(st.bodyColor||'#33445c')+'" style="margin-top:8px"></div>'+
  '</div>'+
  '<div class="admin-actions"><button class="btn" id="apPreview">معاينة</button><button class="btn primary" id="apSave">حفظ ونشر</button><button class="btn" id="apReset">إعادة الافتراضي</button></div>';
  const read=()=>{
    const theme={preset:document.getElementById('apPreset').value,motion:document.getElementById('apMotion').value==='on'};
    if(document.getElementById('apKind').value==='solid')theme.custom=document.getElementById('apColor').value;
    const style={
      titleAnim:document.getElementById('apTitle').value,
      bodyAnim:document.getElementById('apBodyAnim')?document.getElementById('apBodyAnim').value:'none',
      headingColor:document.getElementById('apHeadMode').value==='custom'?document.getElementById('apHead').value:'',
      bodyColor:document.getElementById('apBodyMode').value==='custom'?document.getElementById('apBody').value:'',
      lightingMode:document.getElementById('apLightMode').value,
      lightingColor:document.getElementById('apLightColor').value,
      lightingIntensity:Number(document.getElementById('apLightIntensity').value)
    };
    return {theme,style};
  };
  const liveApply=()=>{const r=read();state.theme=r.theme;state.style=r.style;applyTheme(r.theme,r.style);renderBrand();};
  document.getElementById('apColor').addEventListener('input',()=>{document.getElementById('apKind').value='solid';liveApply()});
  document.getElementById('apHead').addEventListener('input',()=>{document.getElementById('apHeadMode').value='custom';liveApply()});
  document.getElementById('apBody').addEventListener('input',()=>{document.getElementById('apBodyMode').value='custom';liveApply()});
  document.getElementById('apLightColor').addEventListener('input',()=>{document.getElementById('apLightMode').value='custom';liveApply()});
  document.getElementById('apLightIntensity').addEventListener('input',liveApply);
  ['apPreset','apKind','apMotion','apTitle','apBodyAnim','apLightMode','apHeadMode','apBodyMode'].forEach(id=>{
    document.getElementById(id).addEventListener('change',()=>{
      if(id==='apPreset')document.getElementById('apKind').value='gradient';
      if(id==='apLightMode'){
        const m=document.getElementById('apLightMode').value;
        if(LIGHT_COLORS[m])document.getElementById('apLightColor').value=LIGHT_COLORS[m];
      }
      liveApply();
    });
  });
  document.getElementById('apPreview').onclick=()=>{liveApply();toast('هذه معاينة فقط، اضغط "حفظ ونشر" لتطبيقها')};
  document.getElementById('apSave').onclick=()=>{const r=read();state.theme=r.theme;state.style=r.style;persist()};
  document.getElementById('apReset').onclick=()=>{askConfirm('إعادة المظهر الافتراضي؟',()=>{state.theme={preset:'pearl',motion:false};if(['201013376681','01013376681'].includes(String(state.whatsapp||'')))state.whatsapp='96565704145';if(state.social&&/201013376681/.test(state.social.whatsapp||''))state.social.whatsapp='https://wa.me/96565704145';
state.style={titleAnim:'rise',headingColor:'',bodyColor:'',lightingMode:'gold',lightingColor:'#ffd36f',lightingIntensity:100};persist();renderAdmin()})};
}
function adminBranding(p){
  const b=state.branding||{};
  const curMode=b.mode||'3d';
  const curAnim=b.animation||'float';
  p.innerHTML='<div class="status good">اسم العلامة وشعارها وحركتها. "معاينة" تعرض التغيير فوراً دون حفظ.</div>'+
  '<div class="admin-grid">'+
    '<div class="field"><label>اسم العلامة (استخدم - للفصل بين الجزأين)</label><input id="brName" maxlength="70" value="'+esc(b.name||state.brand||'')+'"></div>'+
    '<div class="field"><label>النص أسفل الاسم</label><input id="brSub" maxlength="100" value="'+esc(b.subtitle||'')+'"></div>'+
    '<div class="field"><label>رفع صورة الشعار من جهازك</label><input id="brFile" type="file" accept="image/png,image/jpeg,image/webp,image/svg+xml"><small>تُصغَّر الصورة تلقائياً</small></div>'+
    '<div class="field"><label>رابط صورة الشعار (اختياري)</label><input id="brLogo" value="'+esc(b.logoUrl||'')+'" placeholder="https://..."></div>'+
    '<div class="field"><label>عرض الإطار (%)</label><input id="brWidth" type="number" min="55" max="95" value="'+(Number(b.frameWidth)||75)+'"></div>'+
    '<div class="field"><label>لون الكلمة الأولى</label><input id="brA" type="color" value="'+esc(b.colorA||'#b77b28')+'"></div>'+
    '<div class="field"><label>لون الكلمة الثانية</label><input id="brB" type="color" value="'+esc(b.colorB||'#0b1628')+'"></div>'+
    '<div class="field"><label>طريقة العرض</label><select id="brMode">'+
      '<option value="2d"'+(curMode==='2d'?' selected':'')+'>نص مسطح</option>'+
      '<option value="3d"'+(curMode==='3d'?' selected':'')+'>نص ثلاثي الأبعاد</option>'+
      '<option value="glass"'+(curMode==='glass'?' selected':'')+'>هوية زجاجية فاخرة</option>'+
      '<option value="logo"'+(curMode==='logo'?' selected':'')+'>الشعار فقط</option>'+
    '</select></div>'+
    '<div class="field"><label>حركة الشعار والاسم</label><select id="brAnim">'+
      '<option value="none"'+(curAnim==='none'?' selected':'')+'>بدون حركة</option>'+
      '<option value="sweep"'+(curAnim==='sweep'?' selected':'')+'>لمعة تمر على الإطار</option>'+
      '<option value="float"'+(curAnim==='float'?' selected':'')+'>طفو ناعم</option>'+
      '<option value="pulse"'+(curAnim==='pulse'?' selected':'')+'>نبض ضوئي</option>'+
      '<option value="rotate"'+(curAnim==='rotate'?' selected':'')+'>ميلان ثلاثي الأبعاد</option>'+
      '<option value="spin3d"'+(curAnim==='spin3d'?' selected':'')+'>دوران كامل 360°</option>'+
      '<option value="bounce"'+(curAnim==='bounce'?' selected':'')+'>ارتداد لطيف</option>'+
      '<option value="glow"'+(curAnim==='glow'?' selected':'')+'>توهج ذهبي</option>'+
    '</select></div>'+
  '</div>'+
  '<div class="admin-actions"><button class="btn" id="brPreview">معاينة</button><button class="btn primary" id="brSave">حفظ ونشر</button></div>';
  const read=()=>({...(state.branding||{}),
    name:document.getElementById('brName').value.trim()||'ALMOHANDIS - SYSTEMS',
    subtitle:document.getElementById('brSub').value.trim(),
    logoUrl:document.getElementById('brLogo').value.trim(),
    frameWidth:Number(document.getElementById('brWidth').value)||75,
    colorA:document.getElementById('brA').value,
    colorB:document.getElementById('brB').value,
    mode:document.getElementById('brMode').value,
    animation:document.getElementById('brAnim').value});
  ['brName','brSub','brLogo','brWidth','brA','brB','brMode','brAnim'].forEach(id=>{
    const el=document.getElementById(id);
    if(el){el.addEventListener('input',()=>renderBrand(read()));el.addEventListener('change',()=>renderBrand(read()));}
  });
  document.getElementById('brFile').onchange=e=>{
    const f=e.target.files&&e.target.files[0];if(!f)return;
    const r=new FileReader();
    r.onload=()=>{const img=new Image();img.onload=()=>{
      const k=Math.min(1,320/Math.max(img.width,img.height));
      const c=document.createElement('canvas');c.width=Math.round(img.width*k);c.height=Math.round(img.height*k);
      c.getContext('2d').drawImage(img,0,0,c.width,c.height);
      document.getElementById('brLogo').value=c.toDataURL('image/png');
      renderBrand(read());
      toast('تم تحميل الشعار. اضغط معاينة ثم حفظ');
    };img.src=r.result};
    r.readAsDataURL(f);
  };
  document.getElementById('brPreview').onclick=()=>{renderBrand(read());toast('معاينة فقط، اضغط "حفظ ونشر" لتطبيقها')};
  document.getElementById('brSave').onclick=()=>{state.branding=read();state.brand=state.branding.name;persist()};
}


/* ===== v5: details, add-to-project button, visible owner contact ===== */
document.getElementById('addSelect').onclick=()=>{const p=visibleProducts()[active];if(p)toggleSelect(p.id)};
{
  const __ss=syncSelected;
  syncSelected=function(){
    __ss();
    const p=visibleProducts()[active];
    const b=document.getElementById('addSelect');
    if(b&&p)b.textContent=selected.has(p.id)?TR('✓ مضافة لمشروعي — إزالة','✓ Added to my project - remove'):TR('＋ أضف إلى مشروعي','＋ Add to my project');
  };
}
{
  const __od=openDetail;
  openDetail=function(id){
    __od(id);
    const body=document.getElementById('detailBody');
    const p=state.products.find(x=>x.id===id);
    const num=String(state.whatsapp||'').replace(/\D/g,'');
    if(!body||!p||!num)return;
    body.insertAdjacentHTML('beforeend',
      '<div class="detail-cta" style="margin-top:16px"><div><strong>'+TR('أو تواصل مع المالك مباشرة','Or contact the owner directly')+'</strong><span>+'+num+'</span></div>'+
      '<div style="display:flex;gap:8px;flex-wrap:wrap"><a class="btn" href="tel:+'+num+'">'+TR('اتصال','Call')+'</a>'+
      '<a class="btn" href="'+wa()+'?text='+encodeURIComponent(TR('مرحباً، أريد الاستفسار عن خدمة: ','Hello, I would like to ask about the service: ')+svcText(p,'name'))+'" target="_blank" rel="noopener">'+TR('واتساب','WhatsApp')+'</a>'+
      '<button class="btn" id="detailCopy">'+TR('نسخ الرقم','Copy number')+'</button></div></div>');
    document.getElementById('detailCopy').onclick=()=>{try{navigator.clipboard.writeText('+'+num);toast(TR('تم نسخ الرقم','Number copied'))}catch(e){toast('+'+num)}};
  };
}


/* ===== v6 logic: services management that really works ===== */
function askConfirm(msg,onYes){
  let box=document.getElementById('confirmBox');
  if(!box){box=document.createElement('div');box.id='confirmBox';box.className='confirm-back';document.body.appendChild(box)}
  box.innerHTML='<div class="confirm-card"><p>'+esc(msg)+'</p><div class="confirm-actions"><button class="btn primary" id="cfYes">تأكيد</button><button class="btn" id="cfNo">إلغاء</button></div></div>';
  box.classList.add('open');
  document.getElementById('cfYes').onclick=()=>{box.classList.remove('open');onYes()};
  document.getElementById('cfNo').onclick=()=>box.classList.remove('open');
}
function adminServices(p){
  const n=state.products.length;
  p.innerHTML='<div class="admin-actions"><button class="btn primary" id="addService">+ إضافة خدمة</button></div>'+
    '<p class="notice">التعديل والإخفاء والترتيب والحذف تُحفظ فوراً. مع الربط السحابي تصل التعديلات للعملاء مباشرة.</p>'+
    state.products.map((x,i)=>
      '<div class="service-row"><div><strong>'+svcIc(x)+esc(x.name)+'</strong><small>'+esc(x.price)+(x.visible===false?' • مخفية عن العملاء':' • ظاهرة للعملاء')+'</small></div>'+
      '<div class="svc-actions">'+
        '<button class="mini-btn" data-act="edit" data-id="'+esc(x.id)+'">تعديل</button>'+
        '<button class="mini-btn" data-act="up" data-id="'+esc(x.id)+'"'+(i===0?' disabled':'')+'>↑</button>'+
        '<button class="mini-btn" data-act="down" data-id="'+esc(x.id)+'"'+(i===n-1?' disabled':'')+'>↓</button>'+
        '<button class="mini-btn" data-act="hide" data-id="'+esc(x.id)+'">'+(x.visible===false?'إظهار':'إخفاء')+'</button>'+
        '<button class="mini-btn" data-act="del" data-id="'+esc(x.id)+'">حذف</button>'+
      '</div></div>').join('');
  document.getElementById('addService').onclick=()=>editService();
  p.querySelectorAll('[data-act]').forEach(b=>b.onclick=()=>serviceAction(b.dataset.act,b.dataset.id));
}
function serviceAction(act,id){
  const i=state.products.findIndex(x=>x.id===id);
  if(i<0)return;
  if(act==='edit'){editService(id);return}
  if(act==='del'){
    askConfirm('حذف الخدمة "'+state.products[i].name+'" نهائياً؟',()=>{
      state.products.splice(i,1);active=0;persist();renderAdmin();toast('تم حذف الخدمة');
    });
    return;
  }
  if(act==='up'||act==='down'){
    const j=act==='up'?i-1:i+1;
    if(j<0||j>=state.products.length)return;
    [state.products[i],state.products[j]]=[state.products[j],state.products[i]];
    persist();renderAdmin();toast('تم تغيير الترتيب');
    return;
  }
  if(act==='hide'){
    const wasHidden=state.products[i].visible===false;
    state.products[i].visible=wasHidden;
    persist();renderAdmin();toast(wasHidden?'أصبحت الخدمة ظاهرة للعملاء':'أُخفيت الخدمة عن العملاء');
  }
}
function editService(id){
  const x=id?state.products.find(p=>p.id===id):{id:'s'+Date.now(),name:'',icon:'✦',price:'حسب الطلب',desc:'',details:'',features:[],visible:true};
  if(!x)return;
  document.getElementById('serviceModalTitle').textContent=id?'تعديل الخدمة':'إضافة خدمة';
  document.getElementById('serviceId').value=x.id;
  document.getElementById('sName').value=x.name||'';
  document.getElementById('sIcon').value=x.icon||'✦';
  document.getElementById('sPrice').value=x.price||'';
  document.getElementById('sDesc').value=x.desc||'';
  document.getElementById('sDetails').value=x.details||'';
  document.getElementById('sFeatures').value=(x.features||[]).join('\n');
  document.getElementById('serviceModal').classList.add('open');
}
document.getElementById('serviceSave').onclick=()=>{
  const id=document.getElementById('serviceId').value;
  const x={
    id:id,
    name:document.getElementById('sName').value.trim(),
    icon:document.getElementById('sIcon').value.trim()||'✦',
    price:document.getElementById('sPrice').value.trim()||'حسب الطلب',
    desc:document.getElementById('sDesc').value.trim(),
    details:document.getElementById('sDetails').value.trim(),
    features:document.getElementById('sFeatures').value.split('\n').map(s=>s.trim()).filter(Boolean)
  };
  if(!x.name){toast('اكتب اسم الخدمة أولاً');return}
  const i=state.products.findIndex(p=>p.id===id);
  if(i>=0){x.visible=state.products[i].visible!==false;state.products[i]={...state.products[i],...x}}
  else{x.visible=true;state.products.push(x)}
  document.getElementById('serviceModal').classList.remove('open');
  persist();renderAdmin();
  toast('تم حفظ الخدمة');
};


/* ===== v7 logic: share & earn ===== */
function myRefCode(){
  try{
    let c=localStorage.getItem('almo_ref_code');
    if(!c){c='ALM'+Math.random().toString(36).slice(2,7).toUpperCase();localStorage.setItem('almo_ref_code',c)}
    return c;
  }catch(e){
    return window.__fallbackRefCode||(window.__fallbackRefCode='ALM'+Math.random().toString(36).slice(2,7).toUpperCase());
  }
}
function refLink(){const u=new URL(location.href);u.hash='';u.search='?ref='+myRefCode();return u.toString()}
async function refCount(code){
  if(!backend)return 0;
  try{
    const {data,error}=await backend.rpc('referral_count',{p_code:code});
    if(!error&&typeof data==='number')return data;
    const res=await backend.from('referral_events').select('*',{count:'exact',head:true}).eq('code',code).eq('event','visit');
    return res.error?0:(res.count||0);
  }catch(e){return 0}
}
async function trackRefVisit(){
  const r=new URLSearchParams(location.search).get('ref');
  if(!r||!backend)return;
  const key='almo_seen_'+r.toUpperCase();
  if(localStorage.getItem(key))return;
  localStorage.setItem(key,'1');
  try{await backend.from('referral_events').insert({code:r.toUpperCase(),event:'visit'})}catch(e){}
}
async function updateRef(){
  const el=document.getElementById('refText');
  if(!el)return;
  const r=state.referral||{target:5,discount:10};
  const code=myRefCode();
  el.textContent='شارك التطبيق مع '+r.target+' أشخاص واربح خصم '+r.discount+'%';
  document.getElementById('refOrb').textContent=r.discount+'%';
  document.getElementById('refBig').textContent=TR('خصمك '+r.discount+'%','Your discount: '+r.discount+'%');
  const c=await refCount(code);
  const n=c==null?0:c;
  document.getElementById('refProg').textContent=c==null?'فعّل الربط السحابي لتتبع المشاركات':n+' من '+r.target+' أشخاص فتحوا رابطك';
  document.getElementById('refBar').style.width=Math.min(100,n/r.target*100)+'%';
  document.getElementById('refNote').textContent=(c!=null&&n>=r.target)?'أنجزت المطلوب! أرسل كود '+code+' للمالك لتحصل على خصمك.':'كودك الخاص: '+code;
}
document.getElementById('refShare').onclick=()=>shareApp();
{
  const __r=render;
  render=function(){__r();updateRef()};
}
setTimeout(()=>{trackRefVisit();updateRef()},2000);
function adminReferral(p){
  const r=state.referral||{target:5,discount:10};
  p.innerHTML='<div class="status good">حدّد عدد الأشخاص المطلوب مشاركتهم ونسبة الخصم. يُحتسب الشخص عندما يفتح رابط المشاركة.</div>'+
  '<div class="admin-grid"><div class="field"><label>عدد الأشخاص المطلوب</label><input id="rfTarget" type="number" min="1" max="100" value="'+r.target+'"></div>'+
  '<div class="field"><label>نسبة الخصم %</label><input id="rfDisc" type="number" min="1" max="90" value="'+r.discount+'"></div></div>'+
  '<div class="admin-actions"><button class="btn primary" id="rfSave">حفظ ونشر</button></div>'+
  '<h3 style="font-size:14px;margin-top:20px">نشاط الإحالات</h3><div id="rfList">جارٍ التحميل...</div>';
  document.getElementById('rfSave').onclick=()=>{
    const t=Math.max(1,Math.min(100,Number(document.getElementById('rfTarget').value)||5));
    const d=Math.max(1,Math.min(90,Number(document.getElementById('rfDisc').value)||10));
    state.referral={target:t,discount:d};
    persist();renderAdmin();toast('تم حفظ إعدادات الإحالة');
  };
  loadRefList();
}
async function loadRefList(){
  const el=document.getElementById('rfList');
  if(!el)return;
  if(!backend){el.textContent='فعّل الربط السحابي لعرض الإحالات.';return}
  const {data,error}=await backend.from('referral_events').select('code').eq('event','visit').limit(500);
  if(error){el.textContent='تعذر التحميل: '+error.message;return}
  const counts={};(data||[]).forEach(r=>counts[r.code]=(counts[r.code]||0)+1);
  const rows=Object.entries(counts).sort((a,b)=>b[1]-a[1]);
  el.innerHTML=rows.length?rows.map(([c,n])=>'<div class="service-row"><strong>'+esc(c)+'</strong><span class="chip">'+n+' فتح للرابط</span></div>').join(''):'لا توجد إحالات بعد.';
}


/* ===== v8: referral fixes (Direct friend share without Owner popup, genuine visit counter) ===== */
function refBaseUrl(){
  const cfgUrl=(state.referral&&state.referral.siteUrl)||'';
  if(/^https?:\/\//.test(cfgUrl))return cfgUrl;
  if(/^https?:/.test(location.protocol))return location.href.split('?')[0].split('#')[0];
  if(document.referrer&&/^https?:\/\//.test(document.referrer))return document.referrer.split('?')[0].split('#')[0];
  return 'https://almohandis-systems.github.io/';
}
function refLink(){
  const base=refBaseUrl();
  if(!base)return '';
  const u=new URL(base);
  u.hash='';u.search='?ref='+myRefCode();
  return u.toString();
}
async function shareApp(){
  const link='https://is.gd/Almohandis_Systems';
  const code=myRefCode();
  const msg='جرّب منظومة ALMOHANDIS - SYSTEMS لتصميم وتطوير مشروعك الرقمي: '+link+(code?'\nكود الخصم الخاص بك: '+code:'');
  play('success');
  if(navigator.share){
    try{
      await navigator.share({title:state.brand||'ALMOHANDIS - SYSTEMS',text:msg,url:link});
      return;
    }catch(e){
      if(e&&e.name==='AbortError')return;
    }
  }
  // Trigger native WhatsApp URI via hidden iframe so no second browser page/tab opens
  try{
    const ifr=document.createElement('iframe');
    ifr.style.display='none';
    ifr.src='whatsapp://send?text='+encodeURIComponent(msg);
    document.body.appendChild(ifr);
    setTimeout(()=>ifr.remove(),1500);
  }catch(e){}
  try{await navigator.clipboard.writeText(msg)}catch(e){}
  toast('تم تجهيز ونسخ رابط الدعوة لمشاركته مع أصدقائك عبر واتساب');
}
function trackRefVisit(tries){
  tries=tries||0;
  const r=new URLSearchParams(location.search).get('ref');
  if(!r)return;
  const code=r.toUpperCase();
  if(code===myRefCode())return;
  const key='almo_seen_'+code;
  if(localStorage.getItem(key))return;
  if(!backend){ if(tries<40)setTimeout(()=>trackRefVisit(tries+1),1000); return; }
  localStorage.setItem(key,'1');
  backend.from('referral_events').insert({code:code,event:'visit'}).then(res=>{if(res.error)localStorage.removeItem(key)}).catch(()=>localStorage.removeItem(key));
}
setInterval(()=>updateRef(),20000);
function adminReferral(p){
  const r=state.referral||{target:5,discount:10,siteUrl:''};
  p.innerHTML='<div class="status good">حدّد عدد الأشخاص ونسبة الخصم، والرابط المنشور للموقع (مثل رابط GitHub Pages) لتصل الدعوات للأصدقاء.</div>'+
  '<div class="admin-grid">'+
    '<div class="field"><label>عدد الأشخاص المطلوب</label><input id="rfTarget" type="number" min="1" max="100" value="'+r.target+'"></div>'+
    '<div class="field"><label>نسبة الخصم %</label><input id="rfDisc" type="number" min="1" max="90" value="'+r.discount+'"></div>'+
    '<div class="field" style="grid-column:1/-1"><label>رابط الموقع المنشور (يبدأ بـ https://)</label><input id="rfUrl" value="'+esc(r.siteUrl||'')+'" placeholder="https://username.github.io/repo/"></div>'+
  '</div>'+
  '<div class="admin-actions"><button class="btn primary" id="rfSave">حفظ ونشر</button></div>'+
  '<h3 style="font-size:14px;margin-top:20px">نشاط الإحالات</h3><div id="rfList">جارٍ التحميل...</div>';
  document.getElementById('rfSave').onclick=()=>{
    const url=document.getElementById('rfUrl').value.trim();
    if(url&&!/^https?:\/\//.test(url)){toast('الرابط يجب أن يبدأ بـ https://');return}
    const t=Math.max(1,Math.min(100,Number(document.getElementById('rfTarget').value)||5));
    const d=Math.max(1,Math.min(90,Number(document.getElementById('rfDisc').value)||10));
    state.referral={target:t,discount:d,siteUrl:url};
    persist();updateRef();renderAdmin();toast('تم حفظ إعدادات الإحالة');
  };
  loadRefList();
}


/* ===== v9: Genuine referral progress (sent vs remaining) ===== */
async function updateRef(){
  const el=document.getElementById('refText');
  if(!el)return;
  const r=state.referral||{target:5,discount:10};
  const target=Math.max(1,Number(r.target)||5);
  const code=myRefCode();
  el.textContent=TR('شارك التطبيق مع '+target+' أشخاص واربح خصم '+r.discount+'%','Share the app with '+target+' people and earn a '+r.discount+'% discount');
  document.getElementById('refOrb').textContent=r.discount+'%';
  document.getElementById('refBig').textContent=TR('خصمك '+r.discount+'%','Your discount: '+r.discount+'%');
  const prog=document.getElementById('refProg');
  const row=document.getElementById('refBar').parentElement;
  const c=Number(await refCount(code))||0;
  const rem=Math.max(0,target-c);
  row.style.display='';
  prog.textContent=rem===0
    ? TR('أتممت مشاركة '+c+' من '+target+' أشخاص • المتبقي: 0','Completed: '+c+' of '+target+' people opened it • Remaining: 0')
    : TR('شارك رابطك وفتحه: '+c+' من '+target+' أصدقاء • المتبقي للحصول على الخصم: '+rem,'Shared link opened by '+c+' of '+target+' friends • Remaining for the discount: '+rem);
  document.getElementById('refBar').style.width=Math.min(100,c/target*100)+'%';
  document.getElementById('refNote').textContent=(c>=target)?TR('أنجزت المطلوب! أرسل كود '+code+' للمالك لتحصل على خصمك.','Done! Send code '+code+' to the owner to claim your discount.'):TR('كودك الخاص: '+code,'Your code: '+code);
}


/* ===== v10 logic: install the app on every device (Real Native Install Prompt + Self-Contained Icon & Manifest) ===== */
(function(){
  const ib=document.getElementById('installBtn');
  const tip=document.getElementById('iosTip');
  const close=document.getElementById('iosClose');
  const helpModal=document.getElementById('installHelpModal');
  const helpClose=document.getElementById('installHelpClose');
  const helpOk=document.getElementById('installHelpOk');
  const dlPwaBtn=document.getElementById('downloadPwaFilesBtn');
  const ownerPwaBox=document.getElementById('ownerPwaBox');
  const installStepsList=document.getElementById('installStepsList');
  if(!ib)return;

  let swReady=false;
  if('serviceWorker' in navigator && (location.protocol==='https:' || location.hostname==='localhost' || location.hostname==='127.0.0.1')){
    window.addEventListener('load',()=>{
      let refreshing=false;
      navigator.serviceWorker.addEventListener('controllerchange',()=>{if(refreshing)return;refreshing=true;location.reload();});
      navigator.serviceWorker.register('sw.js').then(reg=>{
        swReady=true;
        reg.update();
        setInterval(()=>{reg.update().catch(()=>{});},60000);
        document.addEventListener('visibilitychange',()=>{if(!document.hidden)reg.update().catch(()=>{});});
      }).catch(()=>{swReady=false;});
    });
  }

  const standalone=window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone===true;
  const isIOS=/iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform==='MacIntel' && navigator.maxTouchPoints>1);
  let deferred=window.__deferredInstallPrompt||null;

  if(standalone){ib.hidden=true;return;}

  ib.hidden=false;
  if(deferred)ib.classList.add('ready');

  window.addEventListener('beforeinstallprompt',e=>{
    e.preventDefault();
    deferred=e;
    window.__deferredInstallPrompt=e;
    ib.hidden=false;
    ib.classList.add('ready');
  });

  window.addEventListener('appinstalled',()=>{
    deferred=null;
    window.__deferredInstallPrompt=null;
    ib.hidden=true;
    if(helpModal)helpModal.classList.remove('open');
    toast('تم تثبيت التطبيق على جهازك بنجاح');
  });

  function triggerDownload(filename, content, mime){
    const blob=new Blob([content],{type:mime});
    const url=URL.createObjectURL(blob);
    const a=document.createElement('a');
    a.href=url;
    a.download=filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(()=>{a.remove();URL.revokeObjectURL(url);},800);
  }

  if(dlPwaBtn){
    dlPwaBtn.onclick=()=>{
      const manifestData={"id": "./", "name": "ALMOHANDIS - SYSTEMS | Digital Business Ecosystem", "short_name": "ALMOHANDIS", "description": "ALMOHANDIS - SYSTEMS | حلول رقمية ومشروعات احترافية من الفكرة إلى الإطلاق", "lang": "ar", "dir": "rtl", "start_url": "./", "scope": "./", "display": "standalone", "orientation": "portrait-primary", "background_color": "#080c13", "theme_color": "#e8c779", "icons": [{"src": "assets/icon-192.png", "sizes": "192x192", "type": "image/png", "purpose": "any"}, {"src": "assets/icon-192.png", "sizes": "192x192", "type": "image/png", "purpose": "maskable"}, {"src": "assets/icon-512.png", "sizes": "512x512", "type": "image/png", "purpose": "any"}, {"src": "assets/icon-512.png", "sizes": "512x512", "type": "image/png", "purpose": "maskable"}]};
      const swContent="const CACHE_NAME = 'almohandis-pwa-v3';\nconst OFFLINE_URLS = ['./', './index.html'];\n\nself.addEventListener('install', event => {\n  self.skipWaiting();\n  event.waitUntil(\n    caches.open(CACHE_NAME).then(cache => cache.addAll(OFFLINE_URLS).catch(() => {}))\n  );\n});\n\nself.addEventListener('activate', event => {\n  event.waitUntil(\n    caches.keys().then(keys => Promise.all(\n      keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))\n    )).then(() => self.clients.claim())\n  );\n});\n\nself.addEventListener('fetch', event => {\n  if (event.request.method !== 'GET') return;\n  event.respondWith(\n    fetch(event.request)\n      .then(response => {\n        if (response && response.status === 200 && response.type === 'basic') {\n          const copy = response.clone();\n          caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy)).catch(() => {});\n        }\n        return response;\n      })\n      .catch(() => caches.match(event.request).then(res => res || caches.match('./')))\n  );\n});\n";
      triggerDownload('manifest.json', JSON.stringify(manifestData, null, 2), 'application/manifest+json');
      setTimeout(()=>triggerDownload('sw.js', swContent, 'application/javascript'), 450);
      toast('تم تحميل manifest.json و sw.js بشعارك الأصلي!');
    };
  }

  ib.onclick=async()=>{
    play('open');
    const promptEvent=deferred||window.__deferredInstallPrompt;
    if(promptEvent){
      try{
        promptEvent.prompt();
        const choice=await promptEvent.userChoice;
        if(choice&&choice.outcome==='accepted'){
          ib.hidden=true;
          toast('جاري تثبيت التطبيق...');
        }
      }catch(e){}
      deferred=null;
      window.__deferredInstallPrompt=null;
      return;
    }
    if(isIOS && tip){
      tip.classList.add('open');
      return;
    }
    if(helpModal){
      const isFileProto=location.protocol==='file:'||location.protocol==='content:';
      if(installStepsList){
        if(isFileProto){
          installStepsList.innerHTML='⚠️ <strong>تنبيه هام:</strong> أنت تفتح الملف حالياً من مدير الملفات المحلي (<code>'+esc(location.protocol)+'</code>)، ولا يسمح نظام Android بتثبيت تطبيقات الويب إلا عبر رابط <strong>HTTPS</strong> (مثل <strong>GitHub Pages</strong>).<br><br>✅ بعد رفع الملف على GitHub Pages وفتحه بالرابط، سيعمل هذا الزر فوراً لتثبيت التطبيق بشعارك الأصلي.';
        }else{
          installStepsList.innerHTML='1. افتح قائمة المتصفح العلوية <strong>(⋮)</strong> في Chrome.<br>2. اختر <strong>"إضافة إلى الشاشة الرئيسية"</strong> (Add to Home screen).<br>3. اضغط <strong>"إضافة / تثبيت"</strong> وسيظهر التطبيق بشعاره الرسمي الكامل على شاشتك.';
        }
      }
      if(ownerPwaBox){
        ownerPwaBox.style.display=(swReady && !isFileProto)?'none':'block';
      }
      helpModal.classList.add('open');
      return;
    }
    toast('لتثبيت التطبيق مباشرة: افتح قائمة المتصفح (⋮) واختر "إضافة إلى الشاشة الرئيسية"');
  };

  if(close&&tip){
    close.onclick=()=>tip.classList.remove('open');
    tip.onclick=e=>{if(e.target===tip)tip.classList.remove('open')};
  }
  if(helpClose&&helpModal){
    helpClose.onclick=()=>helpModal.classList.remove('open');
  }
  if(helpOk&&helpModal){
    helpOk.onclick=()=>helpModal.classList.remove('open');
  }
  if(helpModal){
    helpModal.onclick=e=>{if(e.target===helpModal)helpModal.classList.remove('open')};
  }
})();


/* ===== v11 logic: social icons always rendered ===== */
function renderSocial(){
  const labels={facebook:'Facebook',instagram:'Instagram',tiktok:'TikTok',whatsapp:'WhatsApp',youtube:'YouTube',linkedin:'LinkedIn'};
  const bar=document.getElementById('socialBar');
  bar.innerHTML=Object.keys(labels).map(k=>{
    const svg='<svg viewBox="0 0 24 24" aria-hidden="true">'+socialSvg[k]+'</svg>';
    const url=(state.social||{})[k];
    if(url)return '<a class="social soc-3d" href="'+esc(url)+'" target="_blank" rel="noopener" aria-label="'+labels[k]+'" title="'+labels[k]+'">'+svg+'</a>';
    return '<button type="button" class="social soc-3d soc-empty" data-soc="'+k+'" aria-label="'+labels[k]+'" title="أضف رابط '+labels[k]+' من لوحة المالك">'+svg+'</button>';
  }).join('');
  bar.querySelectorAll('[data-soc]').forEach(b=>b.onclick=()=>toast('أضف رابط '+b.dataset.soc+' من لوحة المالك'));
}

render();initBackend();startShowcase();if(location.hash.startsWith('#service-')){let id=decodeURIComponent(location.hash.slice(9));setTimeout(()=>openDetail(id),250)}

// structured project request form -> WhatsApp
(function(){
  const form=document.getElementById('requestForm');if(!form)return;
  const typeSel=document.getElementById('reqType');
  function fillTypes(){const ps=visibleProducts();const cur=typeSel.value;typeSel.innerHTML=ps.map(p=>'<option value="'+esc(p.id)+'">'+esc(svcText(p,'name'))+'</option>').join('');if(cur&&ps.some(p=>p.id===cur))typeSel.value=cur;}
  fillTypes();
  const lt=document.getElementById('langToggle');if(lt)lt.addEventListener('click',()=>setTimeout(fillTypes,60));
  form.addEventListener('submit',function(e){e.preventDefault();
    const name=document.getElementById('reqName').value.trim();
    const topt=typeSel.options[typeSel.selectedIndex];const type=topt?topt.textContent:'';
    const bopt=document.getElementById('reqBudget');const budget=bopt.options[bopt.selectedIndex].textContent;
    const details=document.getElementById('reqDetails').value.trim();
    const en=window.ALMO_I18N&&ALMO_I18N.lang==='en';
    const msg=en?('New project request\nName: '+name+'\nProject type: '+type+'\nBudget: '+budget+'\nDetails: '+(details||'-')):('طلب مشروع جديد\nالاسم: '+name+'\nنوع المشروع: '+type+'\nالميزانية: '+budget+'\nالتفاصيل: '+(details||'-'));
    window.open(wa()+'?text='+encodeURIComponent(msg),'_blank','noopener');
  });
})();

/* c26 runtime auto-contrast (light theme) */
(function(){
  const NB='#0b1220',WH='#ffffff';
  function pr(c){if(!c)return null;const m=c.match(/rgba?\(([^)]+)\)/);if(!m)return null;const p=m[1].split(',').map(parseFloat);if(p.length>3&&p[3]===0)return null;return p;}
  function hx(h){return [parseInt(h.substr(1,2),16),parseInt(h.substr(3,2),16),parseInt(h.substr(5,2),16)];}
  function lum(p){const f=v=>{v/=255;return v<=0.03928?v/12.92:Math.pow((v+0.055)/1.055,2.4)};return 0.2126*f(p[0])+0.7152*f(p[1])+0.0722*f(p[2]);}
  function effBg(el){let e=el;while(e&&e.nodeType===1){const cs=getComputedStyle(e);const p=pr(cs.backgroundColor);if(p)return p;const bi=cs.backgroundImage;if(bi&&bi!=='none'){if(bi.indexOf('url(')>-1)return [10,16,28];const m=bi.match(/#[0-9a-fA-F]{6}|rgba?\([^)]*\)/);if(m){const c=m[0][0]==='#'?hx(m[0]):pr(m[0]);if(c)return c;}return [245,247,251];}e=e.parentElement;}return [245,247,251];}
  function cr(a,b){const x=Math.max(a,b),y=Math.min(a,b);return (x+0.05)/(y+0.05);}
  const LB=lum([11,18,32]),LW=lum([255,255,255]);
  function hasText(el){for(const n of el.childNodes){if(n.nodeType===3&&n.textContent.trim())return true;}return el.children.length===0&&el.textContent.trim().length>0;}
  function fix(){if(!document.body.classList.contains('lt'))return;
    document.querySelectorAll('header,main,footer').forEach(root=>{
      root.querySelectorAll('*').forEach(el=>{
        if(!hasText(el))return;
        const L=lum(effBg(el));
        const col=cr(L,LB)>=cr(L,LW)?NB:WH;
        el.style.setProperty('color',col,'important');
        el.style.setProperty('-webkit-text-fill-color',col,'important');
        el.style.setProperty('text-shadow','none','important');
      });
    });
  }
  window.__autoContrast=fix;
  fix();setTimeout(fix,900);
  new MutationObserver(m=>{for(const r of m){if(r.attributeName==='class'){fix();break;}}}).observe(document.body,{attributes:true,attributeFilter:['class']});
  window.addEventListener('resize',()=>fix());
})();
