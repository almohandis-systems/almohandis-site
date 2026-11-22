/* ALMOHANDIS - SYSTEMS: English content layer (i18n). Arabic stays the source of truth in services.js/app.js.
   Loaded before app.js. Exposes window.ALMO_EN = {svc, work, detail, ...} consumed by T()/svcText() helpers. */
window.ALMO_EN={
svc:{
 p1:{name:'Website Design & Development',desc:'Business and company websites and fast, responsive landing pages that reflect your brand.',price:'From EGP 3,500',details:'We design a professional website that is responsive on phones and desktops, with a clear structure and a user experience that helps visitors understand your services and reach you. The work covers defining the pages, building the interface, tuning the layout across screen sizes, and preparing the deployment files according to the project scope.',features:['Responsive design for all screens','Pages tailored to your business','Improved user experience and easy browsing','Basic search-engine optimization','Deployment preparation and domain hookup as agreed']},
 p2:{name:'E-Commerce Stores',desc:'A well-organized store to showcase products, manage orders, and offer a smooth buying experience.',price:'From EGP 6,500',details:'Building an online storefront that includes product categories, product detail pages, a cart, and a checkout flow. Payment gateway, shipping, and inventory management are set up according to the platform, country, and actual requirements.',features:['Categories and product pages','Cart and checkout flow','Responsive design','Policy and contact pages setup','Ready for payment and shipping integration where available']},
 p3:{name:'Mobile Applications',desc:'Android and iOS apps with a modern user experience within a clear scope.',price:'From EGP 15,000',details:'We start by defining the app idea, audience, and core functions, then plan the user experience, design the screens, develop the features, and test. The final cost depends on the number of screens, integrations, and the nature of the app.',features:['Requirements analysis and scoping','UI and UX design','Core feature development','Pre-delivery testing','A future development roadmap']},
 p4:{name:'UI / UX Design',desc:'Clear, attractive interfaces and a user experience that makes reaching the goal easy.',price:'From EGP 2,000',details:'User experience design starts with understanding the audience and the core tasks, then organizing the usage flow and creating prototypes and a coherent visual system that can be handed to the development team.',features:['User journey analysis','Page and flow structuring','Interactive prototypes','Color, type, and component system','Well-organized handoff files']},
 p5:{name:'Management & Business Systems',desc:'Dashboards to organize operations and data and track performance.',price:'From EGP 10,000',details:'Developing a management system that fits your actual workflow, bringing data, tasks, and reports together in an organized interface. Modules and permissions are defined according to your organization\u2019s needs.',features:['Central dashboard','User and permission management','Custom forms and workflows','Reports and tracking indicators','Room to add modules later']},
 p6:{name:'CRM & ERP Systems',desc:'Customers, sales, inventory, and operations organized in one system.',price:'From EGP 25,000',details:'Analyzing your business processes and connecting the right modules such as customers, sales, purchasing, inventory, resources, and reports. Pricing depends on the number of modules, integrations, and data migration.',features:['Customer data management','Sales and pipeline tracking','Inventory and operations control','Operational reports','Permissions and activity log']},
 p7:{name:'Automation & Integration',desc:'Cut repetitive work and connect your tools and services for smoother operations.',price:'From EGP 4,000',details:'Analyzing the repetitive tasks inside your project and designing workflows that connect forms, spreadsheets, CRMs, notifications, and digital services. Automation limits and data sources are defined before implementation.',features:['Workflow analysis','Systems and services integration','Repetitive task automation','Automatic notifications and updates','Documented operating procedure']},
 p8:{name:'Digital Menus & 3D Experiences',desc:'Interactive menus for sections, services, and products with a standout viewing experience.',price:'From EGP 2,500',details:'Designing a digital menu with sections, products, prices, and photos, plus an interactive 3D experience and content management according to the agreed technical setup.',features:['Interactive sections and items','Price and description management','Responsive design and QR codes','Detail page for each item','Optional order integration per scope']},
 p9:{name:'Visual Identity',desc:'A consistent identity that reflects your project\u2019s personality and unifies its presence.',price:'From EGP 1,500',details:'Building a visual system suited to your business that covers the logo, colors, typography, and usage rules, with clear delivery files for digital and print use according to the package.',features:['Logo design or refinement','Color palette and typography','Identity usage guidelines','Core brand applications','Suitable delivery files']},
 p10:{name:'Databases & APIs',desc:'Structured data architecture and integrations between your systems and services.',price:'From EGP 3,000',details:'Designing the data structure, relationships, permissions, and the interfaces connecting your systems, with attention to security, maintainability, and scale.',features:['Data schema design','Relationships and indexing','Documented APIs','Permission configuration','Integration testing']},
 p11:{name:'Maintenance & Development',desc:'Performance improvements, bug fixes, and new features.',price:'From EGP 500',details:'Reviewing the project and setting priorities, then implementing fixes, updates, and improvements based on work hours or an agreed scope, with a clear statement of what support covers.',features:['Technical project audit','Fixing identified bugs','Speed and compatibility improvements','Feature updates and development','A report of completed changes']},
 p12:{name:'Custom Software Solutions',desc:'Turning your own idea into a digital product designed around your needs.',price:'On request',details:'If your idea does not fit a ready-made service, we start with a session to understand the problem, the users, and the required functions, then define the scope, phase plan, cost, and estimated timeline.',features:['Idea analysis session','Scope and priority definition','Initial solution concept','Technical and financial proposal','Phased, scalable implementation']}
},
work:[
 {name:'MOHANDIS MENU — An Upgraded Restaurant Menu',desc:'A mobile restaurant menu: sections and dish photos, combo suggestions, size customization, and an order cart sent to WhatsApp.'},
 {name:'CRASH OS — Interactive Restaurant Menu',desc:'An interactive restaurant menu: orders, cart, discount code, and installable as a phone app.'},
 {name:'LUSTER — Cleaning Products Store',desc:'An online store for cleaning and home-care products, with offers, bundles, and a shopping cart.'},
 {name:'Complete Restaurant Management Suite',desc:'An integrated restaurant platform: menu, orders, cashier, and reports in one place.'},
 {name:'Reaya Fayoum — Medical Discount Network',desc:'A medical services site with discounts on checkups and tests, and easy booking.'}
],
ui:{
  detailEyebrow:'SERVICE DETAILS',orderNow:'Order this service now',backToServices:'Back to services',
  whatYouGet:'What does this service give you?',benefits:'Benefits you will receive',howWeWork:'How we work with you',
  whyUs:'Why choose us?',why1:'Clear scope and known price before we start',why2:'A design tailored to your business, not a ready-made template',why3:'Direct WhatsApp contact with us at every stage',
  chip1:'Clear scope',chip2:'Built around your needs',chip3:'Scalable',priceNote:'The shown price is an estimate and is finalized after reviewing your requirements.',
  readyTitle:'Ready to start?',readySub:'Send your idea now and get an initial concept and a clear quote.',startWhats:'Start your project on WhatsApp',
  waMessage:'Hello, I would like to order this service: ',waTail:'. Please contact me to discuss the details.',
  defaultPrice:'On request'
}
};
/* English translations for index.html static strings. Wire with data-i18n="key" attributes;
   applyLang() sets textContent from this dict when lang=en, restores Arabic defaults when lang=ar. */
window.ALMO_EN_STATIC={
 navServices:'Services',navProjects:'Projects',navBuilder:'Build your project',navAbout:'About the system',
 heroKicker:'EXPLORE OUR CAPABILITIES',heroTitle:'Choose your digital destination',
 heroHint:'Swipe right or left, or use the arrows. The front icon is your current pick.',
 cardHint:'Swipe to browse • Tap a service to select it • Explore for details',
 cardExplore:'Explore the service and details',cardAdd:'+ Add to my project',
 aboutTitle1:'From idea to a',aboutTitle2:'professional digital project',
 aboutDesc:'We design and build digital solutions and complete projects that help you launch your idea or grow your existing business with confidence and clarity.',
 installApp:'Install the app',discoverServices:'Explore services',discussWhats:'Discuss your project on WhatsApp',
 workTitle:'Our work in the real world',workSub:'Real projects running right now — open any project and see the work yourself.',
 workBadge:'▶ Video with sound',workLive:'Live preview',
 builderTitle:'Build your project step by step',builderSub:'Pick the services you need and see an initial estimate of the starting cost.',
 estimateTitle:'Estimated cost of selected services',estimateEmpty:'No services selected yet',estimateEmptySub:'Pick one or more services to start shaping your project.',
 requestQuote:'Request a quote for your project',
 refTitle:'Share and earn a discount',refShare:'Share the app on WhatsApp',
 whyTitle:'An experience that starts with clarity and ends with real value',
 why1t:'Solutions designed for your needs',why1d:'We start by understanding the idea and the nature of the business, then choose the right solution instead of offering one template for everyone.',
 why2t:'Clear scope and cost',why2d:'Service details, components, and a price estimate appear before you send the request, with the option to ask for a custom quote.',
 why3t:'Built to grow',why3d:'We build the experience around your project\u2019s current needs with room to add phases and services later.',
 contactTitle:'Contact us',
 footer:'ALMOHANDIS - SYSTEMS. All rights reserved.',
 detailBackTop:'Back to services ×',
 installIosT:'Install the app on iPhone',
 tagline:'Your idea becomes a company. We build it into an app.',
 reqTitle:'Request Your Project',reqSub:'Fill in the form and your request reaches us directly on WhatsApp.',
 reqName:'Full name',reqType:'Project type',reqBudget:'Approximate budget',
 reqB0:'Not specified',reqB1:'Under EGP 5,000',reqB2:'EGP 5,000 - 15,000',reqB3:'EGP 15,000 - 50,000',reqB4:'Over EGP 50,000',
 reqDetails:'Idea details',reqSend:'Send request via WhatsApp',installIos1:'1. Tap the share button at the bottom of Safari.',installIos2:'2. Choose "Add to Home Screen".',installIos3:'3. Tap "Add" at the top right.',
 installTitle:'📲 Install the ALMOHANDIS app',installLead:'To install the app with its official icon directly on your home screen:'
};
/* ===== i18n runtime ===== */
window.ALMO_I18N={lang:(function(){try{return localStorage.getItem('almo_lang')||'ar'}catch(e){return 'ar'}})()};
window.TR=function(ar,en){return (window.ALMO_I18N&&ALMO_I18N.lang==='en')?en:ar};
window.T=function(k){return (window.ALMO_EN&&ALMO_EN.ui&&ALMO_EN.ui[k])||''};
window.svcText=function(p,f){const e=window.ALMO_EN&&ALMO_EN.svc&&ALMO_EN.svc[p.id];return (ALMO_I18N.lang==='en'&&e&&e[f])?e[f]:p[f]};
window.workText=function(i,f){const e=window.ALMO_EN&&ALMO_EN.work&&ALMO_EN.work[i];return (ALMO_I18N.lang==='en'&&e&&e[f])?e[f]:(window.WORK_ITEMS&&WORK_ITEMS[i]?WORK_ITEMS[i][f]:'')};
const I18N_MAP=[
 ['navServices','الخدمات'],['navProjects','المشروعات'],['navBuilder','ابنِ مشروعك'],['navAbout','عن المنظومة'],
 ['heroKicker','EXPLORE OUR CAPABILITIES'],['heroTitle','اختر وجهتك الرقمية'],
 ['heroHint','اسحب يميناً أو يساراً، أو استخدم الأسهم. الأيقونة الأمامية هي اختيارك الحالي.'],
 ['cardHint','اسحب للتنقل • اضغط على الخدمة لتحديدها • استكشف للتفاصيل'],
 ['cardExplore','استكشف الخدمة والتفاصيل'],['cardAdd','＋ أضف إلى مشروعي'],
 ['aboutTitle1','من الفكرة إلى'],['aboutTitle2','مشروع رقمي احترافي'],
 ['aboutDesc','نصمم ونطور حلولاً رقمية ومشروعات متكاملة تساعدك على إطلاق فكرتك أو تطوير مشروعك القائم بثقة ووضوح.'],
 ['installApp','📲 تثبيت التطبيق'],['discoverServices','اكتشف الخدمات'],['discussWhats','ناقش مشروعك عبر واتساب'],
 ['workTitle','أعمالنا على أرض الواقع'],['workSub','مشروعات حقيقية تعمل الآن — افتح أي مشروع وشاهد الشغل بنفسك.'],
 ['workBadge','▶ فيديو بالصوت'],
 ['builderTitle','كوّن مشروعك خطوة بخطوة'],['builderSub','اختر الخدمات التي تحتاجها وشاهد تقديراً أولياً لتكلفة البداية.'],
 ['estimateTitle','التكلفة التقديرية للخدمات المختارة'],
 ['requestQuote','اطلب عرضاً لمشروعك'],
 ['refTitle','شارك واربح خصماً'],['refShare','شارك التطبيق عبر واتساب'],
 ['whyTitle','تجربة تبدأ بالوضوح وتنتهي بقيمة حقيقية'],
 ['why1t','حلول مصممة لاحتياجك'],['why1d','نبدأ بفهم الفكرة وطبيعة النشاط ثم نحدد الحل المناسب بدلاً من تقديم قالب واحد للجميع.'],
 ['why2t','وضوح النطاق والتكلفة'],['why2d','تفاصيل الخدمة ومكوناتها وتقدير السعر تظهر قبل إرسال الطلب، مع إمكانية طلب عرض مخصص.'],
 ['why3t','قابلية التطوير والتوسع'],['why3d','نبني التجربة مع مراعاة احتياجات المشروع الحالية وإمكانية إضافة مراحل وخدمات لاحقاً.'],
 ['contactTitle','تواصل معنا'],['footer','ALMOHANDIS - SYSTEMS. جميع الحقوق محفوظة.'],
 ['detailBackTop','رجوع إلى الخدمات ×'],
 ['installIosT','تثبيت التطبيق على iPhone'],
 ['tagline','فكرتك تبقى شركة. نبنيها لك تطبيق.'],
 ['reqTitle','اطلب مشروعك'],['reqSub','املأ النموذج وسيصل طلبك مباشرة عبر واتساب.'],
 ['reqName','الاسم الكامل'],['reqType','نوع المشروع'],['reqBudget','الميزانية التقريبية'],
 ['reqB0','غير محددة'],['reqB1','أقل من 5000 جنيه'],['reqB2','5000 - 15000 جنيه'],['reqB3','15000 - 50000 جنيه'],['reqB4','أكثر من 50000 جنيه'],
 ['reqDetails','تفاصيل الفكرة'],['reqSend','إرسال الطلب عبر واتساب']
];
const I18N_ORIG=new WeakMap();
function i18nSwap(toEn){
  const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT,null);
  const nodes=[];let n;while(n=walker.nextNode())nodes.push(n);
  nodes.forEach(function(node){
    const cur=node.nodeValue,trim=cur.trim();if(!trim)return;
    if(toEn){
      for(let i=0;i<I18N_MAP.length;i++){
        if(I18N_MAP[i][1]===trim){I18N_ORIG.set(node,cur);node.nodeValue=cur.replace(trim,ALMO_EN_STATIC[I18N_MAP[i][0]]||trim);return}
      }
    }else{
      const orig=I18N_ORIG.get(node);if(orig!==undefined){node.nodeValue=orig;I18N_ORIG.delete(node)}
    }
  });
}
window.applyLang=function(){
  const en=ALMO_I18N.lang==='en';
  document.documentElement.lang=en?'en':'ar';
  document.documentElement.dir=en?'ltr':'rtl';
  i18nSwap(en);
  try{if(typeof renderCarousel==='function')renderCarousel()}catch(e){}
  try{if(typeof renderBuilder==='function')renderBuilder()}catch(e){}
  try{if(typeof renderProjects==='function')renderProjects()}catch(e){}
  try{if(typeof updateEstimate==='function')updateEstimate()}catch(e){}
  try{const dp=document.getElementById('detailPage');if(dp&&dp.classList.contains('open')){const h=(location.hash||'');if(h.indexOf('#service-')===0)openDetail(decodeURIComponent(h.slice(9)))}}catch(e){}
  const b=document.getElementById('langToggle');if(b)b.textContent=en?'العربية':'English';
};
window.toggleLang=function(){ALMO_I18N.lang=ALMO_I18N.lang==='en'?'ar':'en';try{localStorage.setItem('almo_lang',ALMO_I18N.lang)}catch(e){}applyLang()};
window.addEventListener('load',function(){if(ALMO_I18N.lang==='en')applyLang();const b=document.getElementById('langToggle');if(b)b.textContent=ALMO_I18N.lang==='en'?'العربية':'English'});
