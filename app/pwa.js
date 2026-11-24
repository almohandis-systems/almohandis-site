window.__deferredInstallPrompt=null;window.__pwaIcon192="assets/icon-192.png";window.__pwaIcon512="assets/icon-512.png";
window.addEventListener("beforeinstallprompt",function(e){e.preventDefault();window.__deferredInstallPrompt=e;var b=document.getElementById("installBtn");if(b){b.hidden=false;b.classList.add("ready");}});
(function setupSelfContainedPWA(){
  var startUrl=location.href.split("#")[0];
  var scopeUrl=startUrl.substring(0,startUrl.lastIndexOf("/")+1)||startUrl;
  var inlineManifest={
    id:scopeUrl,
    name:"ALMOHANDIS - SYSTEMS | Digital Business Ecosystem",
    short_name:"ALMOHANDIS",
    description:"ALMOHANDIS - SYSTEMS | حلول رقمية ومشروعات احترافية من الفكرة إلى الإطلاق",
    lang:"ar",
    dir:"rtl",
    start_url:startUrl,
    scope:scopeUrl,
    display:"standalone",
    orientation:"portrait-primary",
    background_color:"#080c13",
    theme_color:"#e8c779",
    icons:[
      {src:window.__pwaIcon192,sizes:"192x192",type:"image/png",purpose:"any"},
      {src:window.__pwaIcon192,sizes:"192x192",type:"image/png",purpose:"maskable"},
      {src:window.__pwaIcon512,sizes:"512x512",type:"image/png",purpose:"any"},
      {src:window.__pwaIcon512,sizes:"512x512",type:"image/png",purpose:"maskable"}
    ]
  };
  window.__inlineManifestObj=inlineManifest;
  /* The site now ships a real manifest.json; no runtime blob swap needed. */
})();
/* ===== الربط السحابي (ضع هنا مرة واحدة بيانات مشروع Supabase) =====
   url: رابط المشروع مثل https://xxxx.supabase.co
   key: المفتاح العام publishable/anon فقط، ولا تضع أبداً service_role
   عند ملء الحقلين تتزامن تعديلات المالك مع كل العملاء على هواتفهم. */
window.ALMO_SUPABASE_CONFIG={url:"",key:""};
