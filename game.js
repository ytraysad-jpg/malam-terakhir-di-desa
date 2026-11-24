(()=>{
const W=40,H=26,VW=320,VH=180;
const cv=document.getElementById('c'),X=cv.getContext('2d');X.imageSmoothingEnabled=false;
let s=7;const rnd=()=>(s=s*16807%2147483647)/2147483647,ri=n=>Math.random()*n|0;
const m=new Uint8Array(W*H),SOL=new Set([2,4,5,6,7,8,10,11,12,13,14,15]);
const tile=(x,y)=>x<0||y<0||x>=W||y>=H?4:m[y*W+x];
const R=(x,y,w,h,t)=>{for(let j=y;j<y+h;j++)for(let i=x;i<x+w;i++)m[j*W+i]=t};
const house=(x,y,w,h)=>{R(x,y,w,h,2);R(x+1,y+1,w-2,h-2,3)};
const O=[];
function build(){
 s=7;O.length=0;R(0,0,W,H,0);
 R(0,12,W,2,1);R(19,8,2,12,1);R(18,18,12,2,1);R(11,6,2,6,1);R(30,9,1,3,1);R(6,14,1,2,1);
 R(0,0,W,1,4);R(0,H-1,W,1,4);R(0,0,1,H,4);R(W-1,0,1,H,4);R(0,12,1,2,1);
 house(14,2,12,6);R(19,7,2,1,9);house(3,16,8,7);m[16*W+6]=8;house(27,2,9,7);m[8*W+30]=9;
 m[5*W+11]=5;R(29,15,10,9,7);R(30,16,8,7,0);R(29,18,1,2,1);m[19*W+34]=11;
 [[31,17],[33,17],[36,17],[31,21],[36,21],[33,21],[36,19],[31,19]].forEach(([x,y])=>m[y*W+x]=6);
 const T=(x,y,t,o)=>{m[y*W+x]=t;if(o)O.push({x,y,...o})};
 T(16,3,15,{t:'sign',l:'Baca papan'});T(21,4,13,{t:'kemenyan',l:'Ambil'});T(24,3,12,{t:'hide',l:'Sembunyi'});
 T(8,18,13,{t:'kembang',l:'Ambil'});T(5,18,13,{t:'surat',l:'Baca surat'});T(9,21,12,{t:'hide',l:'Sembunyi'});
 T(33,4,14,{t:'peti',l:'Peti terkunci'});T(28,3,12,{t:'hide',l:'Sembunyi'});
 O.push({x:11,y:5,t:'well',l:'Periksa timba'},{x:6,y:16,t:'door',l:'Pintu'},{x:34,y:19,t:'altar',l:'Altar'},{x:31,y:21,t:'foto',l:'Periksa nisan'});
 T(1,15,6,{t:'egg',l:'Periksa batu'});T(1,9,14,{t:'egg2',l:'Buka kotak'});T(4,21,12,{t:'egg3',l:'Periksa lemari tua'});
 [[16,10],[23,10],[8,10],[9,8],[14,15],[24,15],[36,11],[13,22]].forEach(([x,y])=>T(x,y,10,{t:'hide',l:'Sembunyi'}));
 for(let n=0;n<260;n++){const x=1+(rnd()*(W-2)|0),y=1+(rnd()*(H-2)|0);let ok=1;
  for(let j=-1;j<=1;j++)for(let i=-1;i<=1;i++)if(tile(x+i,y+j))ok=0;
  if(ok&&!(x<5&&y>9&&y<16))m[y*W+x]=4}
}
const WC=document.createElement('canvas');WC.width=W*16;WC.height=H*16;const WX=WC.getContext('2d');
function paint(c,x,y){const t=tile(x,y),f=(o,a,b,w,h)=>{c.fillStyle=o;c.fillRect(x*16+a,y*16+b,w,h)},
 spk=(a,n)=>{for(let i=0;i<n;i++)f(a[rnd()*a.length|0],rnd()*16|0,rnd()*16|0,1,1)};
 if(t==1||t==8||t==9){f('#4a3a26',0,0,16,16);spk(['#3b2e1e','#5a4830','#2e2417'],20)}
 else if(t==3||(t>=12&&t<=15)){f('#6b4a2c',0,0,16,16);for(let i=3;i<16;i+=4)f('#54391f',0,i,16,1)}
 else if(t==2){f('#2e1a0e',0,0,16,16);f('#5a3a22',0,0,16,13);for(let i=0;i<16;i+=4)f('#46291a',i,0,1,13);f('#7a5232',0,0,16,2)}
 else{f('#1f3a22',0,0,16,16);spk(['#163018','#2a4a2a','#2f5230'],16)}
 if(t==4){f('#10301a',2,0,12,16);f('#10301a',0,2,16,12);f('#0b2012',3,9,10,5);f('#1d4a28',4,3,4,2);f('#1d4a28',9,6,3,2)}
 if(t==5){f('#777',1,1,14,14);f('#555',3,3,10,10);f('#12304a',4,4,8,8);f('#2a5a7a',5,5,3,2)}
 if(t==6){f('#111a12',3,12,10,2);f('#8b8b8f',4,3,8,10);f('#a8a8ac',4,3,8,2);f('#555',7,5,2,6);f('#555',5,7,6,2)}
 if(t==7){f('#6a4a2a',0,4,16,2);f('#6a4a2a',0,10,16,2);f('#7a5a38',1,1,3,14);f('#7a5a38',12,1,3,14)}
 if(t==8){f('#4a2a14',2,0,12,16);f('#2e180c',2,0,12,2);f('#cc3333',10,8,3,3)}
 if(t==9)f('#2a1608',0,0,3,16);
 if(t==10){f('#1a4a22',1,3,14,11);f('#256a30',3,2,8,5);f('#12331a',2,10,12,3)}
 if(t==11){f('#8a8a8a',1,3,14,10);f('#aaa',1,3,14,2);f('#333',3,6,3,3);f('#333',10,6,3,3);f('#ffd',4,1,1,3);f('#ffd',11,1,1,3)}
 if(t==12){f('#3a2010',1,0,14,16);f('#5a3418',2,1,12,6);f('#c9a35a',7,9,2,2)}
 if(t==13){f('#8a5a30',1,2,14,12);f('#a87a48',1,2,14,2)}
 if(t==14){f('#5a3418',1,4,14,9);f('#c9a35a',1,7,14,1);f('#ffd84a',7,6,2,3)}
 if(t==15){f('#8a6a40',2,1,12,9);f('#cfc29a',3,2,10,7);f('#555',4,4,6,1);f('#555',4,6,5,1)}
}
const paintAll=()=>{for(let y=0;y<H;y++)for(let x=0;x<W;x++)paint(WX,x,y)};
const PAL={k:'#0a0a12',h:'#1a1410',s:'#d9a066',b:'#3a4a8a',n:'#5a3a22',w:'#e8e4d8',g:'#8a8a8a',r:'#e03030',d:'#4a2e1c',v:'#2a1a44'};
const SPR={
p:["....hhhh....","...hhhhhh...","...hssssh...","...ssksks...","..bbbbbbbb..",".sbbbbbbbbs.",".sbbbbbbbbs.","..bbbbbbbb..","..nnnnnnnn..","..nnn..nnn..","..nnn..nnn..","..kkk..kkk.."],
K:["...kkkkkk...","..kkkkkkkk..","..kkwwwwkk..","..kkwrwrkk..","..kkwwwwkk..",".kkwwwwwwkk.",".kwwwwwwwwk.",".kwwwwwwwwk.","kkwwwwwwwwkk","kwwwwwwwwwwk",".wwwwwwwwww.",".w.ww..ww.w."],
P:["....gwwg....","...wwwwww...","..wwkkkkww..","..wwkrkrww..","..wwkkkkww..","..wwwwwwww..","..wwgwwgww..","..wwwwwwww..","..wwgwwgww..","..wwwwwwww..","...wwwwww...","....gwwg...."],
G:["..kkkkkkkk..",".kddddddddk.","kddeddddeddk","kddddddddddk","kddwwwwwwddk","kkddddddddkk","kddddddddddk","kddddddddddk","kdddkddkdddk","kddk....kddk","kdd......ddk","kkk......kkk"],
S:["....vvvv....","...vvvvvv...","..vvwvvwvv..","...vvvvvv...","..vvvvvvvv..",".vvvvvvvvvv.",".vvvvvvvvvv.",".vvvvvvvvvv.","..vvvvvvvv..","..vvv..vvv..","..vvv..vvv..","..vv....vv.."]};
PAL.e='#e03030';const SP={};
for(const k in SPR){const c=document.createElement('canvas');c.width=c.height=12;const g=c.getContext('2d');
 SPR[k].forEach((r,y)=>[...r].forEach((ch,x)=>{if(ch!='.'){g.fillStyle=PAL[ch];g.fillRect(x,y,1,1)}}));SP[k]=c}
/* ---------- AUDIO ---------- */
let AC,MG,DG,NB,mute=0,gi=3;
function ainit(){if(AC)return;try{AC=new(window.AudioContext||window.webkitAudioContext)()}catch(e){return}
 MG=AC.createGain();MG.gain.value=.8;MG.connect(AC.destination);
 const n=AC.sampleRate*2;NB=AC.createBuffer(1,n,AC.sampleRate);const d=NB.getChannelData(0);for(let i=0;i<n;i++)d[i]=Math.random()*2-1;
 const ws=AC.createBufferSource();ws.buffer=NB;ws.loop=true;const bp=AC.createBiquadFilter();bp.type='bandpass';bp.frequency.value=450;bp.Q.value=.9;
 const wg=AC.createGain();wg.gain.value=.14;ws.connect(bp);bp.connect(wg);wg.connect(MG);ws.start();
 const lf=AC.createOscillator(),lg=AC.createGain();lf.frequency.value=.1;lg.gain.value=220;lf.connect(lg);lg.connect(bp.frequency);lf.start();
 const dr=AC.createOscillator(),lp=AC.createBiquadFilter();dr.type='sawtooth';dr.frequency.value=46;lp.type='lowpass';lp.frequency.value=140;
 DG=AC.createGain();DG.gain.value=0;dr.connect(lp);lp.connect(DG);DG.connect(MG);dr.start();
 setInterval(()=>{if(fear>.4)return;const k=3+ri(3);for(let i=0;i<k;i++)tone(4200+ri(300),.04,.012,i*.07)},1100);
 setInterval(()=>{if(Math.random()<.45){gi=Math.max(0,Math.min(9,gi+ri(3)-1));const f=220*Math.pow(2,gi*.2)*(1-fear*.08);tone(f,2.2,.035);tone(f*2.76,1.2,.012)}
  if(Math.random()<.04){tone(73,5,.08);tone(146,3.5,.03)}},650)}
function tone(f,d,v,dl=0,ty='sine',f2){if(!AC)return;const t=AC.currentTime+dl,o=AC.createOscillator(),g=AC.createGain();o.type=ty;o.frequency.setValueAtTime(f,t);
 if(f2)o.frequency.exponentialRampToValueAtTime(f2,t+d);g.gain.setValueAtTime(v,t);g.gain.exponentialRampToValueAtTime(.0001,t+d);o.connect(g);g.connect(MG);o.start(t);o.stop(t+d+.05)}
function nz(d,v,fq){if(!AC)return;const t=AC.currentTime,b=AC.createBufferSource(),f=AC.createBiquadFilter(),g=AC.createGain();b.buffer=NB;f.type='lowpass';f.frequency.value=fq;
 g.gain.setValueAtTime(v,t);g.gain.exponentialRampToValueAtTime(.0001,t+d);b.connect(f);f.connect(g);g.connect(MG);b.start(t,Math.random());b.stop(t+d)}
const laugh=()=>{for(let i=0;i<4;i++)tone(700+i*60,.18,.05,i*.2,'sawtooth',1100+i*80)},
 pickup=()=>{tone(880,.3,.06);tone(1320,.4,.05,.1)},
 heart=()=>{tone(55,.14,.3);tone(48,.14,.25,.16)};
/* ---------- STATE ---------- */
let st='title',dl=null,ed=null,sc=null,T=0,px,py,hid,hx,hy,stam,san,fear,inv,got,tired,gateCd,E,SH,buf,pr,walk;
const K={},key=(...c)=>c.some(x=>K[x]);
const mkE=(k,n,sp,ch,vr,gh,wp)=>{wp=wp.map(a=>[a[0]*16+8,a[1]*16+8]);return{k,n,sp,ch,vr,gh,wp,wi:0,x:wp[0][0],y:wp[0][1],mode:0,tm:0,lx:0,ly:0,stuck:0,find:0,d:999,cd:0,on:0,gr:0}};
const INTRO=["Jawa, 1998. Di kamar kosmu, sepucuk surat tiba dengan tulisan tangan Ibu yang gemetar.","“Le, pulanglah malam ini. Jangan lewat hutan. Jangan menjawab kalau ada yang memanggil namamu. — Ibu”","Kau tiba di gerbang desa saat bulan menggantung. Tak ada lampu minyak. Tak ada suara manusia. Hanya jangkrik.","Desa ini sunyi. Untuk saat ini. Jelajahi dengan tenang dan ikuti misi di pojok kiri atas.","Makhluk-makhluk itu baru terbangun satu per satu saat kau menyentuh rahasia desa. Bila ada yang mengejar, sembunyilah di semak atau lemari."];
const ED={
pergi:["PERGI TANPA MENOLEH",["Kau berlari melewati gerbang tanpa berpaling.","Fajar menyingkap jalan setapak yang kosong. Desa itu hilang dari peta mana pun.","Setiap Jumat Kliwon, sepucuk surat tiba dengan tulisan Ibu yang gemetar. Kau tak pernah berani membukanya."]],
tangkap:["MENGHILANG",["Dingin menjalar ke tengkukmu, lalu gelap.","Esok paginya, tak ada yang ingat namamu.","Di desa itu kini ada satu rumah lagi yang berpenghuni."]],
gila:["KEHILANGAN AKAL",["Suara-suara itu terlalu banyak. Kau berhenti membedakan nyata dan bayangan.","Warga kota menemukanmu berjalan berputar di jalan desa, memanggil ‘Ibu’ pada pohon-pohon."]],
fajar:["FAJAR DI DESA KOSONG",["Asap dupa menyatu dengan embun. Satu per satu, rumah kembali bercahaya.","Penduduk muncul di jalan, bingung, memeluk keluarga masing-masing.","Hanya Ibu yang tak kembali. Ia tersenyum dari balik kabut, lalu pergi.","Kutukan terputus, tetapi harganya terlalu mahal."]],
pengganti:["PENJAGA DESA",["Kau melangkah ke lingkaran altar dan sosok itu lenyap, puas.","Pagi tiba. Ibu dan seluruh warga kembali, tak ingat apa pun.","Namun kau tak bisa lagi melewati gerbang. Kini kau penjaga desa, menunggu seseorang pulang membawa surat."]],
lingkaran:["LINGKARAN TERPUTUS",["Kau mengangkat foto itu. Sosok tanpa wajah terdiam; perlahan wajahnya terbentuk: Bapak, yang hilang sejak kau kecil.","“Akulah yang menanam kutukan itu, agar kalian tak mati kelaparan.”","Keris itu retak sendiri. Fajar menyingkap seluruh desa, dan Ibu menggenggam tanganmu.","Untuk pertama kalinya, tak ada lagi yang lenyap."]]};
const EN=Object.keys(ED).length;
function reset(){build();paintAll();Q={};TO=null;px=40;py=208;hid=0;stam=100;san=100;fear=0;inv={};got={};tired=0;buf='';T=0;gateCd=0;pr=0;walk=0;
 E=[mkE('K','Kuntilanak',.5,1.15,75,1,[[11,9],[11,7],[8,9],[14,10],[11,11]]),mkE('P','Pocong',.32,.95,65,0,[[19,10],[19,15],[24,13],[19,5],[16,5],[22,5]]),mkE('G','Genderuwo',.45,1.05,62,0,[[30,11],[36,13],[30,6],[26,14]])];
 SH={vis:0,t:1800,x:0,y:0}}
function blocked(x,y,hw=4,hh=3){for(const[a,b]of[[-hw,-hh],[hw,-hh],[-hw,hh],[hw,hh]])if(SOL.has(tile((x+a)/16|0,(y+b)/16|0)))return 1;return 0}
function los(a,b,c,d){const n=Math.hypot(c-a,d-b)/6|0;for(let i=1;i<n;i++){const t=i/n;if(SOL.has(tile((a+(c-a)*t)/16|0,(b+(d-b)*t)/16|0)))return 0}return 1}
function say(l,cb){dl={l:Array.isArray(l)?l:[l],i:0,c:0,cb};st='dlg'}
function ask(q,o,cb){dl={q,o,cb,c:0};st='ask'}
function adv(){const L=dl.l[dl.i];if(dl.c<L.length){dl.c=L.length;return}if(++dl.i>=dl.l.length){st='play';const cb=dl.cb;dl.cb=0;cb&&cb()}}
function end(id,who){st='end';const[t,l]=ED[id];ed={t,l:[...l],i:0,c:0,done:0};if(who)ed.l.unshift(who+' menemukanmu.');
 try{const f=JSON.parse(localStorage.getItem('mtd')||'[]');if(!f.includes(id)){f.push(id);localStorage.setItem('mtd',JSON.stringify(f))}}catch(e){}
 if(DG)DG.gain.value=0}
const found=()=>{try{return JSON.parse(localStorage.getItem('mtd')||'[]').length}catch(e){return 0}};
function caught(e){if(st!='play')return;st='scare';sc={e,t:0};nz(1,.5,3000);tone(60,1,.3,0,'sawtooth',30)}
function near(){let b=null,bd=22;for(const o of O){const d=Math.hypot(o.x*16+8-px,o.y*16+8-py);if(d<bd){bd=d;b=o}}return b}
const cnt=()=>(inv.kembang?1:0)+(inv.kemenyan?1:0)+(inv.keris?1:0);
function obj(){if(!got.kunci)return'Cari kunci rumah Ibu.';if(!got.surat)return'Masuk ke rumah Ibu dan cari Ibu.';
 return cnt()<3?`Kumpulkan sesajen (${cnt()}/3): kembang, kemenyan, keris.`:'Letakkan sesajen di altar makam (tenggara).'}
function act(){if(hid){hid=0;px=hx;py=hy;return}const o=near();if(o)handle(o)}
function take(k,txt){got[k]=inv[k]=1;pickup();say(txt)}
function handle(o){const t=o.t;
 if(t=='egg')return egg();if(t=='egg2')return egg2();if(t=='egg3')return egg3();
 if(t=='hide'){hid=1;hx=px;hy=py;px=o.x*16+8;py=o.y*16+8;return}
 if(t=='sign')return got.sign=1,say(["Papan pengumuman desa. Tulisannya hampir pudar:","“Peti milik Pak Lurah dikunci. Sandinya empat – tujuh – satu. Jangan sebut pada siapa pun, apalagi malam Jumat.”"]);
 if(t=='kemenyan')return got.kemenyan?say("Meja kosong. Hanya debu dan abu dupa."):take('kemenyan',"Segumpal kemenyan di atas meja balai. Kau mengambilnya.");
 if(t=='kembang')return got.kembang?say("Dipan itu kosong."):take('kembang',"Kembang tujuh rupa, masih segar di dipan. Seolah baru dipetik. Kau mengambilnya.");
 if(t=='surat'){got.surat=1;wake(1,'Pocong mulai berkeliaran...');return say(["Surat Ibu di atas dipan, tintanya masih basah:","“Le, desa ini dikutuk sejak Pak Lurah menanam kepala kerbau di bawah balai. Satu per satu kami dibawa.”","“Kumpulkan kembang, kemenyan, dan keris Pak Lurah. Letakkan di altar makam sebelum fajar.”","“Jangan bicara pada yang tak berwajah. Foto kita kusimpan di bawah nisan Eyang, sudut kiri-bawah makam.”"])}
 if(t=='well'){if(got.kunci)return say("Timba tua itu berayun pelan, meski tak ada angin.");got.kunci=inv.kunci=1;pickup();
  return say(["Timba tua bergoyang sendiri. Sebuah kunci berkarat menggantung di talinya.","Kau mengambilnya, dan dari dalam sumur terdengar tawa perempuan."],()=>{wake(0,'Kuntilanak terbangun... waspadalah!');laugh()})}
 if(t=='door'){if(m[16*W+6]!=8)return;if(inv.kunci){m[16*W+6]=9;paint(WX,6,16);tone(120,.5,.1,0,'sawtooth',80);return say("Kunci berkarat itu pas. Pintu berderit terbuka.")}
  return say("Pintu rumah Ibu terkunci rapat. Kuncinya pasti ada di suatu tempat di desa ini.")}
 if(t=='peti'){if(got.keris)return say("Peti itu sudah kosong.");wake(2,'Genderuwo menjaga rumah ini...');st='code';buf='';return}
 if(t=='foto')return got.foto?say("Nisan Eyang. Tak ada apa-apa lagi."):(got.foto=inv.foto=1,pickup(),say(["Nisan Eyang. Ada sesuatu terselip di bawahnya.","Foto keluarga: Ibu, dirimu waktu kecil, dan seorang pria yang wajahnya digosok hingga hilang."]));
 if(t=='altar'){if(cnt()<3)return say(["Sebuah altar batu dengan tiga cekungan kosong.","Kau merasa harus meletakkan kembang, kemenyan, dan keris di sini."]);
  SH.vis=9999;SH.x=34*16+8;SH.y=17*16+8;nz(1.5,.2,500);
  return say(["Kau menata kembang, kemenyan, dan keris di altar. Asap putih naik. Jangkrik berhenti serentak.","Dari balik nisan, sosok tanpa wajah melangkah mendekat.","“Sudah lama aku menunggu seseorang dari darah ini. Kutukan hanya bisa diputus dengan satu cara.”"],()=>{
   const o=["Segel kutukan (relakan Ibu)","Gantikan mereka sebagai penjaga desa"];if(inv.foto)o.push("Tunjukkan foto keluarga");
   ask("Apa pilihanmu?",o,i=>end(['fajar','pengganti','lingkaran'][i]))})}
}
function submit(){if(buf=='471'){got.keris=inv.keris=1;st='play';pickup();say("Klik. Peti terbuka. Di dalamnya ada sebilah keris tua berbalut kain putih. Dinginnya menusuk telapak tanganmu.")}
 else{st='play';say("Sandinya salah. Bunyi peti bergema ke seluruh desa...",()=>{const g=E[2];g.mode=2;g.lx=px;g.ly=py;g.tm=0});nz(.5,.3,500)}buf=''}
/* ---------- UPDATE ---------- */
let fr=0;
function eUpd(e){
 if(!e.on)return;const d=Math.hypot(px-e.x,py-e.y);e.d=d;if(e.cd>0)e.cd--;if(e.gr>0)e.gr--;
 const g0=!(e.gr>0),see=g0&&!hid&&d<e.vr&&(e.gh||los(e.x,e.y,px,py)),hear=g0&&!hid&&pr&&d<95;
 if(see||hear){if(e.mode!=1&&e.cd<=0){e.cd=300;if(e.k=='K')laugh();else nz(.5,.3,300)}e.mode=1;e.lx=px;e.ly=py;e.tm=0}
 let tx,ty,sp=0;
 if(e.mode==1){if(hid&&d>12){e.mode=2;e.tm=0}else{if(!(see||hear)){if(++e.tm>220){e.mode=2;e.tm=0}}tx=(see||hear)?px:e.lx;ty=(see||hear)?py:e.ly;sp=e.ch}}
 if(e.mode==2){tx=e.lx;ty=e.ly;sp=e.sp*1.2;if(Math.hypot(tx-e.x,ty-e.y)<6){sp=0;if(++e.tm>180)e.mode=0}}
 if(e.mode==0){const w=e.wp[e.wi];tx=w[0];ty=w[1];sp=e.sp;if(Math.hypot(tx-e.x,ty-e.y)<6)e.wi=(e.wi+1)%e.wp.length}
 if(e.k=='P')sp*=Math.max(.05,Math.sin(T/10)*1.8);
 if(sp){const a=Math.atan2(ty-e.y,tx-e.x),nx=e.x+Math.cos(a)*sp,ny=e.y+Math.sin(a)*sp;let mv=0;
  if(e.gh||!blocked(nx,e.y,5,4)){e.x=nx;mv=1}if(e.gh||!blocked(e.x,ny,5,4)){e.y=ny;mv=1}
  e.stuck=mv?0:e.stuck+1;if(e.stuck>80){e.stuck=0;if(e.mode==0)e.wi=(e.wi+1)%e.wp.length;else if(e.mode==2)e.mode=0}}
 if(hid){if(d<14){if(++e.find>150)caught(e)}else e.find=0}else if(d<9&&!(e.gr>0))caught(e);
 if((!hid||d<30)&&d<110&&(e.mode==1||see))fr=Math.max(fr,1-d/110)}
function upd(){T++;
 if((st=='dlg'||st=='ask')&&dl){const L=st=='dlg'?dl.l[dl.i]:dl.q;if(dl.c<L.length)dl.c+=1.3}
 if(st=='end'&&ed){const L=ed.l[ed.i];if(ed.c<L.length)ed.c+=1.3}
 if(st=='jump'){if(++JT>110){st='play';got.egg3=1;say(['...Ternyata hanya hantu iseng yang ingin menyapa.','“Hehe. Easter egg terakhir. Napasmu sekarang tak akan habis.”'],()=>toast('Napas tak terbatas! Easter egg #3','#80e0a0'))}return}
 if(st=='scare'){if(++sc.t>80)end('tangkap',sc.e.n);return}if(inv&&st!='end'&&st!='title'){qUpd();if(TO&&--TO.n<=0)TO=null}
 if(st!='play')return;
 let mx=(key('KeyD','ArrowRight')?1:0)-(key('KeyA','ArrowLeft')?1:0),my=(key('KeyS','ArrowDown')?1:0)-(key('KeyW','ArrowUp')?1:0);
 walk=(mx||my)&&!hid;let run=0;
 if(walk){const l=Math.hypot(mx,my);mx/=l;my/=l;run=key('ShiftLeft','ShiftRight')&&!tired&&stam>0;const sp=run?1.45:.75;
  if(!blocked(px+mx*sp,py))px+=mx*sp;if(!blocked(px,py+my*sp))py+=my*sp;
  if(run&&!got.egg3){stam-=.35;if(stam<=0)tired=1}
  if(T%(run?12:20)==0)tone(65+ri(25),.05,.05,0,'triangle')}
 if(!run){stam=Math.min(100,stam+.2);if(tired&&stam>30)tired=0}
 pr=run;
 if(gateCd>0)gateCd--;
 if(px<10&&gateCd<=0){gateCd=9999;ask("Tinggalkan desa ini sekarang?",["Ya, pergi","Tidak, tetap tinggal"],i=>{if(i==0)end('pergi');else{px=30;gateCd=60}})}
 fr=0;E.forEach(eUpd);if(st!='play')return;
 if(!SH.vis){if(got.kunci&&--SH.t<=0){const a=Math.random()*6.28,r=55+ri(25),x=px+Math.cos(a)*r,y=py+Math.sin(a)*r;
   if(!blocked(x,y,5,4)){SH.x=x;SH.y=y;SH.vis=260;SH.t=1400+ri(1500);nz(1.2,.15,600);tone(180,1.5,.04,0,'sine',90)}else SH.t=1}}
 else if(SH.vis<9000){SH.vis--;const d=Math.hypot(px-SH.x,py-SH.y);
  if(d>12){const a=Math.atan2(py-SH.y,px-SH.x);SH.x+=Math.cos(a)*.25;SH.y+=Math.sin(a)*.25}else{san-=18;SH.vis=0;nz(.6,.4,2000)}
  if(d<90){san-=.1;fr=Math.max(fr,.5*(1-d/90))}}
 fear+=(fr-fear)*.06;
 if(fr>.02)san-=fr*.12;else san=Math.min(100,san+(tile(px/16|0,py/16|0)==3?.05:.02));
 if(DG)DG.gain.value=fear*.14;
 if(fear>.25&&T%Math.max(25,70-fear*50|0)==0)heart();
 if(san<=0)end('gila')}
/* ---------- DRAW ---------- */
const LC=document.createElement('canvas');LC.width=VW;LC.height=VH;const LX=LC.getContext('2d');
const PS=5,TCV=document.getElementById('tx'),TXC=TCV.getContext('2d');TCV.width=VW*PS;TCV.height=VH*PS;
const FF='VT323,Courier,monospace';
function tf(){const m=/(\d+)px/.exec(X.font),z=(m?+m[1]:8)*1.4*PS;TXC.font=z+'px '+FF;return z}
const tx=(s,x,y,c='#ddd')=>{tf();TXC.textAlign=X.textAlign;TXC.globalAlpha=X.globalAlpha;TXC.lineJoin='round';TXC.lineWidth=PS*1.2;TXC.strokeStyle='#000';TXC.strokeText(s,x*PS,y*PS);TXC.fillStyle=c;TXC.fillText(s,x*PS,y*PS);TXC.globalAlpha=1};
function wrap(t,w){tf();const o=[];let c='';for(const wd of t.split(' ')){if(TXC.measureText(c+wd).width/PS>w){o.push(c.trim());c=wd+' '}else c+=wd+' '}o.push(c.trim());return o}
function typed(t,c,x,y,w,col){let n=c|0;for(const l of wrap(t,w)){tx(l.slice(0,Math.max(0,n)),x,y,col);n-=l.length+1;y+=10}return y}
function panel(h){X.fillStyle='rgba(8,6,12,.93)';X.fillRect(8,VH-h-8,VW-16,h);X.strokeStyle='#8a6a40';X.strokeRect(8.5,VH-h-7.5,VW-17,h-1)}
function drawE(e,cx,cy){const w=e.k=='G'?16:12;let x=Math.round(e.x-w/2-cx),y=Math.round(e.y-w+2-cy);
 X.fillStyle='rgba(0,0,0,.45)';X.fillRect(x+1,Math.round(e.y-1-cy),w-2,3);
 if(e.k=='K'){y-=4+Math.round(Math.sin(T/14)*2);X.globalAlpha=.88}
 if(e.k=='P')y-=Math.max(0,Math.round(Math.sin(T/10)*4));
 X.drawImage(SP[e.k],x,y,w,w);X.globalAlpha=1;e.sx=x;e.sy=y}
const GL={well:['kunci','#ffd84a'],kemenyan:['kemenyan','#c8b890'],kembang:['kembang','#e86aa0'],surat:['surat','#fff']};
function draw(){TXC.clearRect(0,0,TCV.width,TCV.height);X.fillStyle='#000';X.fillRect(0,0,VW,VH);X.textAlign='left';
 if(st=='title')return title();if(st=='end')return endScr();if(st=='scare')return scareScr();if(st=='jump')return jumpScr();
 const cx=Math.max(0,Math.min(W*16-VW,Math.round(px-VW/2))),cy=Math.max(0,Math.min(H*16-VH,Math.round(py-VH/2)));
 X.drawImage(WC,-cx,-cy);
 O.forEach(o=>{const g=GL[o.t];if(g&&!got[g[0]]){X.fillStyle=g[1];X.globalAlpha=.6+Math.sin(T/10)*.3;X.fillRect(o.x*16+6-cx,o.y*16+3-cy,4,4);X.globalAlpha=1}});
 E.forEach(e=>e.on&&drawE(e,cx,cy));
 if(SH.vis&&Math.random()>.2){X.globalAlpha=.85;X.drawImage(SP.S,Math.round(SH.x-6-cx),Math.round(SH.y-10-cy));X.globalAlpha=1}
 if(!hid)X.drawImage(SP.p,Math.round(px-6-cx),Math.round(py-10-cy+(walk&&T%20<10?-1:0)));
 const sx=px-cx,sy=py-cy;let Rr=(hid?26:58-(100-san)*.2)+Math.sin(T/7)*1.5+(got.egg2?14:0);if(san<35&&Math.random()<.08)Rr-=18;
 LX.globalCompositeOperation='source-over';LX.fillStyle='rgba(3,5,14,.95)';LX.fillRect(0,0,VW,VH);LX.globalCompositeOperation='destination-out';
 let g=LX.createRadialGradient(sx,sy,4,sx,sy,Rr);g.addColorStop(0,'rgba(0,0,0,1)');g.addColorStop(.6,'rgba(0,0,0,.7)');g.addColorStop(1,'rgba(0,0,0,0)');LX.fillStyle=g;LX.fillRect(0,0,VW,VH);
 X.drawImage(LC,0,0);
 X.globalCompositeOperation='lighter';g=X.createRadialGradient(sx,sy,2,sx,sy,Rr);g.addColorStop(0,'rgba(255,150,50,.12)');g.addColorStop(1,'rgba(255,150,50,0)');X.fillStyle=g;X.fillRect(0,0,VW,VH);X.globalCompositeOperation='source-over';
 E.forEach(e=>{if(e.on&&(e.mode==1||e.d<85)){X.fillStyle='#ff2222';const[a,b,y]=e.k=='G'?[4,11,3]:[5,7,3];X.fillRect(e.sx+a,e.sy+y,1,1);X.fillRect(e.sx+b,e.sy+y,1,1)}});
 if(SH.vis){X.fillStyle='#fff';const x=Math.round(SH.x-cx),y=Math.round(SH.y-10-cy);X.fillRect(x-2,y+2,1,1);X.fillRect(x+1,y+2,1,1)}
 if(san<35){X.fillStyle='rgba(255,255,255,.35)';for(let i=0;i<(40-san);i++)X.fillRect(ri(VW),ri(VH),1,1)}
 X.font='8px monospace';
 [['kunci','#ffd84a'],['kembang','#e86aa0'],['kemenyan','#c8b890'],['keris','#9ab'],['foto','#8ac']].forEach(([n,c],i)=>{X.fillStyle='rgba(0,0,0,.6)';X.fillRect(4+i*14,4,12,12);X.strokeStyle=inv[n]?c:'#333';X.strokeRect(4.5+i*14,4.5,11,11);if(inv[n]){X.fillStyle=c;X.fillRect(7+i*14,7,6,6)}});
 {const c=curCh();tx('MISI · '+c[0],4,26,'#ffd84a');c[1].forEach((s,i)=>tx((Q[s[0]]?'[x] ':'[ ] ')+s[0],4,36+i*9,Q[s[0]]?'#6a8':'#ddd'))}if(TO){X.textAlign='center';X.globalAlpha=Math.min(1,TO.n/30);tx(TO.s,160,116,TO.c);X.globalAlpha=1;X.textAlign='left'}tx('JIWA',VW-112,10,'#b080d0');X.fillStyle='#000a';X.fillRect(VW-84,4,80,6);X.fillStyle=san>35?'#9a40c0':'#d02060';X.fillRect(VW-83,5,78*Math.max(0,san)/100,4);
 tx('NAPAS',VW-112,19,'#80c0a0');X.fillStyle='#000a';X.fillRect(VW-84,13,80,6);X.fillStyle=tired?'#c06030':'#40a080';X.fillRect(VW-83,14,78*stam/100,4);
 if(st=='play'){const o=near();X.textAlign='center';
  if(hid)tx(`[${EK()}] Keluar dari persembunyian`,VW/2,VH-18,'#fff');else if(o)tx(`[${EK()}] `+o.l,VW/2,VH-18,'#fff');X.textAlign='left'}
 if(st=='photo')photo();if(st=='dlg'){panel(48);const L=dl.l[dl.i];typed(L,dl.c,16,VH-44,288);if(dl.c>=L.length&&T%40<25)tx('▼',VW-22,VH-14,'#c9b88a')}
 if(st=='ask'){panel(56);let y=typed(dl.q,dl.c,16,VH-52,288,'#fff');dl.oy=y;dl.o.forEach((o,i)=>{tx(`${i+1}) ${o}`,16,y,'#ffd84a');y+=10})}
 if(st=='code'){X.fillStyle='rgba(8,6,12,.95)';const q=TOUCH?10:80,qc=q+80;X.fillRect(q,50,160,80);X.strokeStyle='#8a6a40';X.strokeRect(q+.5,50.5,159,79);X.textAlign='center';
  tx('PETI PAK LURAH',qc,66,'#c9b88a');X.font='bold 18px monospace';tx((buf+'___').slice(0,3).split('').join(' '),qc,96,'#ffd84a');
  X.font='8px monospace';tx(TOUCH?'Ketuk angka, lalu OK':'3 angka, ENTER=buka ESC=batal',qc,120);X.textAlign='left'}}
function title(){let g=X.createLinearGradient(0,0,0,VH);g.addColorStop(0,'#05060f');g.addColorStop(1,'#1a1224');X.fillStyle=g;X.fillRect(0,0,VW,VH);
 X.fillStyle='#d8d2b0';X.beginPath();X.arc(256,38,14,0,6.3);X.fill();X.fillStyle='#090b17';X.beginPath();X.arc(262,34,12,0,6.3);X.fill();
 X.fillStyle='#050509';X.fillRect(0,140,VW,40);for(let i=0;i<5;i++){const x=20+i*62;X.fillRect(x,122,34,18);X.beginPath();X.moveTo(x-6,122);X.lineTo(x+17,106);X.lineTo(x+40,122);X.fill()}
 if(T%90<80){X.fillStyle='#ffb040';X.fillRect(20+2*62+14,128,5,6)}
 X.textAlign='center';X.font='bold 18px monospace';const tc2=T%97<4?'#601010':'#d83a3a';tx('MALAM TERAKHIR',160,44,tc2);tx('DI DESA',160,64,tc2);
 X.font='8px monospace';tx('Jawa, 1998',160,76,'#aaa');X.fillStyle=hov?'#9a1e1e':'#4a1010';X.fillRect(100,86,120,20);X.strokeStyle=hov?'#ff6a6a':'#d83a3a';X.strokeRect(100.5,86.5,119,19);X.font='bold 10px monospace';tx('▶ MULAI',160,100,'#fff');X.font='8px monospace';if(!TOUCH&&T%60<40)tx('atau tekan ENTER',160,118,'#999');
 tx(TOUCH?'D-pad: jalan   LARI: lari   AKSI: interaksi / lanjut':'WASD / Panah: jalan   SHIFT: lari   E: interaksi   M: bisu',160,152,'#999');tx('Gunakan headphone. Jaga jiwamu tetap waras.',160,162,'#777');tx(`Ending ditemukan: ${found()}/${EN}`,160,172,'#c9b88a');T++}
function endScr(){X.fillStyle='#000';X.fillRect(0,0,VW,VH);X.textAlign='center';X.font='bold 12px monospace';tx(ed.t,160,22,'#c83030');X.textAlign='left';X.font='8px monospace';
 let y=40;for(let i=0;i<=ed.i;i++){y=typed(ed.l[i],i<ed.i?999:ed.c,16,y,288,i<ed.i?'#888':'#ddd')+3}
 X.textAlign='center';if(ed.done)tx(`TAMAT  ·  Ending ${found()}/${EN} ditemukan  ·  [${TOUCH?'Ketuk':'R'}] Menu`,160,VH-8,'#c9b88a');else if(T%60<40)tx(TOUCH?'ketuk untuk lanjut':'[E] lanjut',160,VH-8,'#777');X.textAlign='left'}
function scareScr(){X.fillStyle=T%4<2?'#300':'#000';X.fillRect(0,0,VW,VH);const z=100+sc.t*1.6,j=(Math.random()-.5)*8;X.drawImage(SP[sc.e.k],VW/2-z/2+j,VH/2-z/2+j,z,z);
 X.fillStyle='rgba(255,255,255,.5)';for(let i=0;i<80;i++)X.fillRect(ri(VW),ri(VH),1,1)}
/* ---------- INPUT ---------- */
addEventListener('keydown',e=>{const c=e.code;if(c.startsWith('Arrow')||c=='Space')e.preventDefault();K[c]=1;
 if(c=='KeyM'){mute=!mute;if(MG)MG.gain.value=mute?0:.8;return}
 if(st=='title'){if(c=='Enter'||c=='Space')startGame();return}
 if(e.repeat)return;const A=c=='KeyE'||c=='Space'||c=='Enter';
 if(st=='dlg'&&A)adv();
 else if(st=='ask'&&/^Digit\d$/.test(c)){const i=+c[5]-1;if(i>=0&&i<dl.o.length){st='play';dl.cb(i)}}
 else if(st=='code'){if(/^Digit\d$/.test(c)&&buf.length<3)buf+=c[5];else if(c=='Backspace')buf=buf.slice(0,-1);else if(c=='Escape')st='play';else if(c=='Enter')submit()}
 else if(st=='photo'&&(A||c=='Escape')){if(PT>30)closePhoto()}
 else if(st=='play'&&A)act();
 else if(st=='end'&&ed){if(A){const L=ed.l[ed.i];if(ed.c<L.length)ed.c=L.length;else if(ed.i<ed.l.length-1){ed.i++;ed.c=0}else ed.done=1}else if(c=='KeyR'&&ed.done)st='title'}});
addEventListener('keyup',e=>K[e.code]=0);addEventListener('blur',()=>{for(const k in K)K[k]=0});
function land(){try{const el=document.documentElement;Promise.resolve(el.requestFullscreen&&el.requestFullscreen()).then(()=>screen.orientation&&screen.orientation.lock&&screen.orientation.lock('landscape')).catch(()=>{})}catch(e){}}
function startGame(){land();ainit();AC&&AC.resume();reset();say(INTRO);toast('Misi baru: Bab 1 · Pulang')}
let JT=0,PC3=null;
const PH3=new Image();PH3.onload=()=>{const c=document.createElement('canvas');c.width=36;c.height=48;c.getContext('2d').drawImage(PH3,0,0,36,48);PC3=c};PH3.src='assets/egg3.png';
function egg3(){if(got.egg3)return say('Lemari tua itu kosong... kali ini.');
 say(['Lemari tua itu berderit pelan. Di dalamnya gelap gulita.','Ada sesuatu yang menatap balik...'],()=>{st='jump';JT=0;nz(1.2,.6,4000);tone(90,1.2,.3,0,'sawtooth',40);tone(1200,.5,.1,0,'square',300)})}
function jumpScr(){X.fillStyle=JT%6<3?'#200':'#000';X.fillRect(0,0,VW,VH);const z=JT<12?60+JT*10:180,j=JT>12?(Math.random()-.5)*8:0;
 if(PC3){const w=z*.75;X.drawImage(PC3,VW/2-w/2+j,VH/2-z/2+j,w,z)}
 if(JT>12&&JT%10<5){X.fillStyle='rgba(255,0,0,.25)';X.fillRect(0,0,VW,VH)}
 X.fillStyle='rgba(255,255,255,.4)';for(let i=0;i<70;i++)X.fillRect(ri(VW),ri(VH),1,1)}
let PT=0,PC=null,PC2=null,PV=0;
const PH2=new Image();PH2.onload=()=>{const c=document.createElement('canvas');c.width=30;c.height=40;c.getContext('2d').drawImage(PH2,0,0,30,40);PC2=c};PH2.src='assets/egg2.jpg';
function egg2(){if(got.egg2)return say('Kotak kayu itu kosong sekarang. Tapi cahayanya masih terasa hangat.');
 got.egg2=1;say(['Sebuah kotak kayu kecil terselip di sudut dekat gerbang. Di dalamnya ada selembar foto.','Seseorang berkacamata tersenyum tipis, memakai topi oranye yang lucu. Anehnya, lenteramu terasa lebih hangat.'],()=>{st='photo';PT=0;PV=1;tone(659,.6,.05);tone(784,.6,.04,.15);tone(988,.9,.04,.3)})}
const PH=new Image();PH.onload=()=>{const c=document.createElement('canvas');c.width=36;c.height=48;c.getContext('2d').drawImage(PH,0,0,36,48);PC=c};PH.src='assets/egg1.jpg';
if(document.fonts)document.fonts.load('20px VT323');
function closePhoto(){st='play';toast(PV?'Lentera lebih terang! Easter egg #2':'Jiwa pulih. Easter egg ditemukan!','#80e0a0')}
function egg(){if(got.egg)return say('Batu nisan kecil ini hanya menyimpan bekas pelukan hangat. Tak ada apa-apa lagi.');
 got.egg=1;say(['Sebuah batu nisan kecil tanpa nama, tersembunyi dekat gerbang. Di bawahnya terselip selembar foto lusuh.','Dua orang saling merangkul di bawah pohon. Wajah salah satunya tertutup tangan.'],()=>{st='photo';PT=0;PV=0;san=100;tone(523,.6,.05);tone(659,.6,.04,.15);tone(784,.9,.04,.3)})}
function photo(){PT++;X.fillStyle='rgba(0,0,0,.9)';X.fillRect(0,0,VW,VH);
 X.save();X.translate(160,80);X.rotate(-.03);X.translate(-160,-80);
 X.fillStyle='#e8e2d0';X.fillRect(105,8,110,140);X.fillStyle='#111';X.fillRect(111,14,98,122);
 const P=PV?PC2:PC;if(P){X.drawImage(P,115,16,90,120);X.fillStyle='rgba(190,150,90,.25)';X.fillRect(115,16,90,120);X.fillStyle='rgba(0,0,0,.2)';for(let i=0;i<120;i+=2)X.fillRect(115,16+i,90,1)}
 X.restore();X.textAlign='center';X.font='8px monospace';tx(PV?'Tersenyum di tengah gelap':'Kenangan yang tak ikut hilang',160,164,'#e8d9b0');tx(TOUCH?'ketuk untuk menutup':'[E] tutup',160,174,'#999');X.textAlign='left'}
let Q={},TO=null;
const CH=[
 ['Bab 1: Pulang',[['Baca papan di Balai Desa',()=>got.sign],['Ambil kunci di sumur',()=>got.kunci],['Masuk rumah Ibu, baca surat',()=>got.surat]]],
 ['Bab 2: Sesajen',[['Kembang (rumah Ibu)',()=>inv.kembang],['Kemenyan (Balai Desa)',()=>inv.kemenyan],['Keris (peti Pak Lurah)',()=>inv.keris]]],
 ['Bab 3: Ritual',[['Letakkan sesajen di altar makam',()=>0],['(Opsional) Foto di nisan Eyang',()=>inv.foto,1]]]];
const toast=(s,c)=>{TO={s,n:240,c:c||'#ffd84a'}};
function wake(i,msg){const e=E[i];if(e.on)return;e.on=1;e.gr=480;e.cd=300;if(msg)toast(msg,'#ff6a6a')}
const curCh=()=>CH.find(c=>c[1].some(s=>!s[2]&&!s[1]()))||CH[2];
function qUpd(){CH.forEach(c=>{c[1].forEach(s=>{if(!Q[s[0]]&&s[1]()){Q[s[0]]=1;tone(660,.2,.05);tone(990,.3,.05,.12);toast('✔ '+s[0])}});
 if(c!=CH[2]&&!Q[c[0]]&&c[1].every(s=>s[2]||Q[s[0]])){Q[c[0]]=1;toast(c[0]+' selesai!','#80e0a0')}})}
let TOUCH=matchMedia('(pointer:coarse)').matches||'ontouchstart' in window;
if(TOUCH)document.body.classList.add('touch');
addEventListener('touchstart',()=>{TOUCH=true;document.body.classList.add('touch')},{once:true,passive:true});
const EK=()=>TOUCH?'AKSI':'E';
const tc=document.createElement('div');tc.id='t';document.getElementById('w').appendChild(tc);tc.addEventListener('contextmenu',e=>e.preventDefault());
const dp=document.createElement('div'),kp=document.createElement('div');kp.id='kp';dp.style.display='none';tc.append(dp,kp);
const fire=(c,d)=>dispatchEvent(new KeyboardEvent(d?'keydown':'keyup',{code:c}));
function mkb(par,txt,x,y,c,cls){const b=document.createElement('div');b.className='b '+(cls||'');b.textContent=txt;b.style.left=x+'%';b.style.bottom=y+'%';
 const dn=e=>{e.preventDefault();b.setPointerCapture(e.pointerId);b.classList.add('on');fire(c,1)},up=()=>{b.classList.remove('on');fire(c,0)};
 b.addEventListener('pointerdown',dn);b.addEventListener('pointerup',up);b.addEventListener('pointercancel',up);par.appendChild(b)}
const js=document.createElement('div'),jk=document.createElement('div');js.id='js';jk.id='jk';js.appendChild(jk);dp.appendChild(js);
function jmove(e){const r=js.getBoundingClientRect(),R=r.width/2;let dx=e.clientX-(r.left+R),dy=e.clientY-(r.top+R);const l=Math.hypot(dx,dy);if(l>R){dx*=R/l;dy*=R/l}jk.style.transform=`translate(${dx}px,${dy}px)`;const t=R*.3;K.KeyA=dx<-t;K.KeyD=dx>t;K.KeyW=dy<-t;K.KeyS=dy>t}
const jend=()=>{jk.style.transform='';K.KeyA=K.KeyD=K.KeyW=K.KeyS=0};
js.addEventListener('pointerdown',e=>{e.preventDefault();js.setPointerCapture(e.pointerId);jmove(e)});
js.addEventListener('pointermove',e=>{if(js.hasPointerCapture(e.pointerId))jmove(e)});
js.addEventListener('pointerup',jend);js.addEventListener('pointercancel',jend);
mkb(dp,'AKSI',84,26,'KeyE','big');mkb(dp,'LARI',69,6,'ShiftLeft','big');
[...'123456789','⌫','0','OK','BATAL'].forEach(t=>{const b=document.createElement('div');b.className='b';b.textContent=t;if(t=='BATAL')b.style.gridColumn='1/4';
 const c=t=='⌫'?'Backspace':t=='OK'?'Enter':t=='BATAL'?'Escape':'Digit'+t;
 b.addEventListener('pointerdown',e=>{e.preventDefault();fire(c,1);fire(c,0)});kp.appendChild(b)});
function ui(){if(!TOUCH)return;dp.style.display=st=='play'?'block':'none';if(st!='play')jend();kp.style.display=st=='code'?'grid':'none'}
document.getElementById('rot').addEventListener('pointerdown',land);
let hov=0;const onBtn=e=>{const r=cv.getBoundingClientRect(),x=(e.clientX-r.left)*VW/r.width,y=(e.clientY-r.top)*VH/r.height;return x>=100&&x<=220&&y>=86&&y<=106};
cv.addEventListener('pointermove',e=>{hov=st=='title'&&onBtn(e)});
cv.addEventListener('pointerdown',e=>{if(st=='title'){if(onBtn(e))startGame();return}
 if(st=='dlg')adv();else if(st=='photo'){if(PT>30)closePhoto()}
 else if(st=='ask'){const r=cv.getBoundingClientRect(),y=(e.clientY-r.top)*VH/r.height;if(y>VH-64){const i=Math.max(0,Math.min(dl.o.length-1,Math.floor((y-(dl.oy-8))/10)));st='play';dl.cb(i)}}
 else if(st=='end'&&ed){if(ed.done)st='title';else{const L=ed.l[ed.i];if(ed.c<L.length)ed.c=L.length;else if(ed.i<ed.l.length-1){ed.i++;ed.c=0}else ed.done=1}}});
let last=0,acc=0;function loop(t){const d=Math.min(100,t-last);last=t;acc+=d;while(acc>=16.67){upd();acc-=16.67}draw();ui();requestAnimationFrame(loop)}
requestAnimationFrame(loop);
})();
