const $=id=>document.getElementById(id);
const types={
 lspd:{label:'POLICÍA LSPD',dept:'LOS SANTOS POLICE',color:'#d84b91',symbol:'✦',ranks:['Cadete','Oficial I','Oficial II','Sargento','Teniente','Capitán','Jefe de policía']},
 bcso:{label:'SHERIFF BCSO',dept:'BLAINE COUNTY SHERIFF',color:'#c69b55',symbol:'★',ranks:['Deputy Trainee','Deputy','Senior Deputy','Sergeant','Lieutenant','Sheriff']},
 fbi:{label:'FEDERAL BUREAU',dept:'VICE CITY FIELD OFFICE',color:'#5b9bd5',symbol:'⬡',ranks:['Agente en prácticas','Agente especial','Agente senior','Supervisor','Director adjunto']},
 detective:{label:'INVESTIGACIONES',dept:'MAJOR CRIME DIVISION',color:'#b9a4d8',symbol:'⌕',ranks:['Detective I','Detective II','Detective senior','Inspector','Jefe de unidad']},
 traffic:{label:'POLICÍA DE TRÁFICO',dept:'HIGHWAY PATROL',color:'#e2b84d',symbol:'↗',ranks:['Agente vial','Oficial de tráfico','Supervisor vial','Jefe de patrulla']},
 criminal:{label:'ARCHIVO CRIMINAL',dept:'VICE CITY ROLEPLAY',color:'#c45c65',symbol:'◈',ranks:['Sospechoso','Asociado','Miembro','Veterano','Líder']},
 shoplifter:{label:'INCIDENTE / COMERCIO',dept:'RETAIL INCIDENT FILE',color:'#cf865a',symbol:'▣',ranks:['Sospechoso','Reincidente','Bajo investigación']},
 robber:{label:'EXPEDIENTE DE ATRACO',dept:'CRIMINAL ROLEPLAY FILE',color:'#d65c5c',symbol:'◆',ranks:['Implicado','Sospechoso principal','Buscado en la historia']},
 fugitive:{label:'ALERTA DE FICCIÓN',dept:'VICE CITY ROLEPLAY',color:'#e26b57',symbol:'⚑',ranks:['En búsqueda','Alerta local','Caso prioritario']},
 civilian:{label:'IDENTIDAD CIVIL',dept:'VICE CITY RESIDENT',color:'#66b7b4',symbol:'◎',ranks:['Residente','Visitante','Propietario','Profesional']},
 medic:{label:'SERVICIOS MÉDICOS',dept:'VICE CITY EMS',color:'#5bc8a2',symbol:'✚',ranks:['Paramédico','Técnico EMT','Enfermero/a','Médico','Jefe médico']},
 mechanic:{label:'SERVICIO MECÁNICO',dept:'VICE CITY CUSTOMS',color:'#d49c55',symbol:'⚙',ranks:['Aprendiz','Mecánico','Especialista','Jefe de taller']},
 vip:{label:'PASE ESPECIAL',dept:'VICE CITY CLUB',color:'#d8b75f',symbol:'✧',ranks:['Silver','Gold','Platinum','Diamond','Founder']}
};
let current='lspd',photoImg=null,bgImg=null,photoURL=null,collection=[];try{collection=JSON.parse(localStorage.getItem('vicepassCollection')||'[]');if(!Array.isArray(collection))collection=[];}catch(e){collection=[];}
const canvas=$('cardCanvas'),ctx=canvas.getContext('2d');
function fillSelect(){const t=types[current];$('rank').innerHTML=t.ranks.map((r,i)=>`<option value="${r}">${r}</option>`).join('');$('department').value=t.dept;$('accent').value=t.color;draw();}
function rounded(c,x,y,w,h,r){c.beginPath();c.roundRect(x,y,w,h,r);c.fill();}
function fitImage(c,img,x,y,w,h){const scale=Math.max(w/img.width,h/img.height),sw=w/scale,sh=h/scale,sx=(img.width-sw)/2,sy=(img.height-sh)/2;c.drawImage(img,sx,sy,sw,sh,x,y,w,h);}
function draw(){
 const c=ctx,W=1100,H=700,t=types[current],accent=$('accent').value||t.color;
 c.clearRect(0,0,W,H);
 let grad=c.createLinearGradient(0,0,W,H);grad.addColorStop(0,'#20202d');grad.addColorStop(.55,'#141521');grad.addColorStop(1,'#10121b');c.fillStyle=grad;rounded(c,0,0,W,H,32);
 if(bgImg){c.save();c.globalAlpha=.18;fitImage(c,bgImg,0,0,W,H);c.restore();}
 c.save();c.globalAlpha=.13;c.fillStyle=accent;c.beginPath();c.arc(980,60,290,0,Math.PI*2);c.fill();c.restore();
 c.fillStyle=accent;rounded(c,0,0,16,H,7);c.fillStyle='#ffffff0a';c.fillRect(30,28,W-60,2);
 c.fillStyle=accent;c.font='800 26px Manrope, Arial';c.fillText('VICE',48,72);c.fillStyle='#fff';c.fillText('PASS',111,72);
 c.fillStyle='#a6a6b7';c.font='500 14px monospace';c.fillText('IDENTITY & ROLEPLAY DIVISION',48,101);
 c.textAlign='right';c.fillStyle=accent;c.font='700 17px monospace';c.fillText('VC / '+current.toUpperCase(),W-48,70);c.textAlign='left';
 c.strokeStyle=accent+'88';c.lineWidth=2;c.beginPath();c.moveTo(48,125);c.lineTo(W-48,125);c.stroke();
 // photo frame
 c.fillStyle='#0b0c13';rounded(c,48,160,300,390,18);c.save();c.beginPath();c.roundRect(58,170,280,370,12);c.clip();
 if(photoImg)fitImage(c,photoImg,58,170,280,370);else{let p=c.createLinearGradient(58,170,338,540);p.addColorStop(0,'#373747');p.addColorStop(1,'#191b29');c.fillStyle=p;c.fillRect(58,170,280,370);c.fillStyle='#ffffff1a';c.font='180px Arial';c.textAlign='center';c.fillText('?',198,425);c.textAlign='left';}
 c.restore();c.strokeStyle=accent;c.lineWidth=3;c.beginPath();c.roundRect(58,170,280,370,12);c.stroke();
 c.fillStyle='#ffffff';c.font='700 13px monospace';c.fillText('SUBJECT PHOTO',58,580);
 // details
 c.fillStyle='#9999ab';c.font='600 13px monospace';c.fillText('FULL NAME',390,190);
 c.fillStyle='#fff';c.font='800 42px Manrope, Arial';let name=$('name').value||'NOMBRE DEL PERSONAJE';c.fillText(name.toUpperCase().slice(0,22),390,245);
 c.fillStyle=accent;c.fillRect(390,265,100,5);
 c.fillStyle='#9999ab';c.font='600 13px monospace';c.fillText('CLASSIFICATION / ROLE',390,315);
 c.fillStyle='#fff';c.font='800 25px Manrope, Arial';c.fillText(t.label,390,353);
 c.fillStyle='#9999ab';c.font='600 13px monospace';c.fillText('RANK / STATUS',390,405);
 c.fillStyle='#f1eaf2';c.font='600 21px Manrope, Arial';c.fillText($('rank').value||t.ranks[0],390,438);
 c.fillStyle='#9999ab';c.font='600 13px monospace';c.fillText('DEPARTMENT',390,486);
 c.fillStyle='#d8d6e2';c.font='600 16px Manrope, Arial';c.fillText(($('department').value||t.dept).toUpperCase().slice(0,34),390,515);
 // serial + bottom info
 c.fillStyle='#9999ab';c.font='600 12px monospace';c.fillText('IDENTITY NUMBER',390,565);
 c.fillStyle='#fff';c.font='700 22px monospace';c.fillText(($('number').value||'VC-00000').toUpperCase(),390,594);
 c.fillStyle='#9999ab';c.font='600 11px monospace';c.fillText('ISSUED  '+($('issued').value||'—'),390,635);
 c.fillText('EXPIRES  '+($('expiry').value||'—'),660,635);
 // seal
 c.strokeStyle=accent;c.lineWidth=4;c.beginPath();c.arc(930,480,82,0,Math.PI*2);c.stroke();c.lineWidth=1;c.beginPath();c.arc(930,480,72,0,Math.PI*2);c.stroke();
 c.textAlign='center';c.fillStyle=accent;c.font='54px Arial';c.fillText(t.symbol,930,475);c.fillStyle='#e8e4ef';c.font='700 11px monospace';c.fillText('VICE CITY',930,502);c.fillStyle='#9c9bab';c.font='9px monospace';c.fillText('ROLEPLAY SEAL',930,521);c.textAlign='left';
 c.fillStyle=accent;c.fillRect(48,654,W-96,2);
 c.fillStyle='#f1b8d4';c.font='800 13px monospace';c.fillText('FICTIONAL ROLEPLAY  ·  NOT AN OFFICIAL ID',48,680);
 c.textAlign='right';c.fillStyle='#858598';c.font='11px monospace';c.fillText(($('notes').value||'VICEPASS IDENTITY').toUpperCase().slice(0,44),W-48,680);c.textAlign='left';
}
function setType(type){current=type;document.querySelectorAll('.type-option').forEach(b=>b.classList.toggle('selected',b.dataset.type===type));fillSelect();}
document.querySelectorAll('.type-option').forEach(b=>b.addEventListener('click',()=>setType(b.dataset.type)));
['name','number','rank','department','issued','expiry','notes','accent'].forEach(id=>$(id).addEventListener('input',draw));
$('style').addEventListener('change',()=>{const v=$('style').value;const col={classic:types[current].color,neon:'#a95cff',tactical:'#789b87',sunset:'#e58c58'}[v];$('accent').value=col;draw();});
$('background').addEventListener('input',()=>loadBg(Number($('background').value)));
function loadBg(n){const img=new Image();img.onload=()=>{bgImg=img;draw()};img.src=`assets/backgrounds/vice-city-${String(n).padStart(2,'0')}.webp`;}
$('photo').addEventListener('change',e=>{const f=e.target.files[0];if(!f)return;if(!f.type.startsWith('image/'))return alert('Selecciona una imagen válida.');if(photoURL)URL.revokeObjectURL(photoURL);photoURL=URL.createObjectURL(f);const im=new Image();im.onload=()=>{photoImg=im;$('photoMini').style.backgroundImage=`url("${photoURL}")`;$('photoMini').textContent='';draw()};im.src=photoURL;});
$('removePhoto').onclick=()=>{photoImg=null;if(photoURL)URL.revokeObjectURL(photoURL);photoURL=null;$('photoMini').style.backgroundImage='';$('photoMini').textContent='👤';$('photo').value='';draw()};
function download(){draw();try{const a=document.createElement('a');a.download=`VICEPASS-${($('name').value||'ROLEPLAY').replace(/[^a-z0-9_-]/gi,'_')}.png`;a.href=canvas.toDataURL('image/png');a.click();}catch(err){alert('No se pudo exportar la imagen. Prueba con otra fotografía o vuelve a cargar la página.');console.error(err);}}
$('downloadBtn').onclick=download;$('downloadTop').onclick=download;$('toolDownload').onclick=download;
function randomize(){const first=['Alex','Jordan','Taylor','Riley','Casey','Morgan','Dylan','Avery','Cameron','Jamie'];const last=['Morgan','Reed','Bennett','Cruz','Hayes','Parker','Brooks','Rivera','Cole','Foster'];$('name').value=first[Math.random()*first.length|0]+' '+last[Math.random()*last.length|0];$('number').value='VC-'+String(10000+(Math.random()*89999|0));$('rank').selectedIndex=Math.random()*types[current].ranks.length|0;$('notes').value='VICE CITY ROLEPLAY';draw();}
$('randomBtn').onclick=randomize;$('toolRandom').onclick=()=>{randomize();showPage('studio')};
function snapshot(){return {type:current,name:$('name').value,number:$('number').value,rank:$('rank').value,department:$('department').value,issued:$('issued').value,expiry:$('expiry').value,notes:$('notes').value,accent:$('accent').value,background:$('background').value};}
function save(){draw();try{const data=snapshot();data.id=Date.now();data.preview=canvas.toDataURL('image/jpeg',0.76);collection.unshift(data);collection=collection.slice(0,24);localStorage.setItem('vicepassCollection',JSON.stringify(collection));renderCollection();alert('Diseño guardado en tu colección local.');}catch(err){alert('El almacenamiento del navegador está lleno. Elimina algunos diseños de la colección y vuelve a intentarlo.');console.error(err);}}
$('toolSave').onclick=save;$('saveBtn').onclick=save;
function renderCollection(){const root=$('savedGrid');root.innerHTML='';if(!collection.length){root.innerHTML='<div class="empty">Todavía no has guardado ningún diseño.<br>Vuelve al Carnet Studio y pulsa “Guardar en colección”.</div>';return;}collection.forEach(item=>{const card=document.createElement('article');card.className='saved-item';const img=document.createElement('img');img.src=item.preview;img.style.width='100%';img.style.borderRadius='7px';const h=document.createElement('h3');h.textContent=item.name;const p=document.createElement('p');p.textContent=(types[item.type]?.label||'DISEÑO ROLEPLAY')+' · '+item.number;const load=document.createElement('button');load.className='btn ghost tiny';load.textContent='Cargar';load.onclick=()=>{current=item.type;setType(item.type);Object.keys(item).forEach(k=>{if($(k)&&!['preview','id'].includes(k))$(k).value=item[k]});loadBg(Number(item.background)||5);showPage('studio');};const del=document.createElement('button');del.className='btn ghost tiny';del.textContent='Eliminar';del.onclick=()=>{collection=collection.filter(x=>x.id!==item.id);localStorage.setItem('vicepassCollection',JSON.stringify(collection));renderCollection()};card.append(img,h,p,load,del);root.append(card);});}
$('clearCollection').onclick=()=>{if(confirm('¿Vaciar toda la colección guardada?')){collection=[];localStorage.removeItem('vicepassCollection');renderCollection();}};
function showPage(id){document.querySelectorAll('.page').forEach(p=>p.classList.toggle('active',p.id===id));document.querySelectorAll('.nav').forEach(b=>b.classList.toggle('active',b.dataset.page===id));const titles={studio:'Carnet Studio',collection:'Tu colección',news:'Vice City News',toolbox:'Caja de herramientas'};$('pageTitle').innerHTML=titles[id]+' '+(id==='studio'?'<span class="live-pill">● LIVE EDITOR</span>':'');if(id==='collection')renderCollection();window.scrollTo({top:0,behavior:'smooth'});}
document.querySelectorAll('.nav').forEach(b=>b.onclick=()=>showPage(b.dataset.page));$('newCard').onclick=()=>showPage('studio');
$('generateBtn').onclick=()=>{draw();$('cardCanvas').scrollIntoView({behavior:'smooth',block:'center'});};
$('resetBtn').onclick=()=>{if(!confirm('¿Restablecer el formulario?'))return;['name','number','department','notes'].forEach((id,i)=>$(id).value=['Alex Morgan','VC-08421',types[current].dept,'DIVISIÓN DE PATRULLA'][i]);$('issued').value='';$('expiry').value='';$('rank').selectedIndex=0;$('background').value=5;$('style').value='classic';$('accent').value=types[current].color;$('removePhoto').click();loadBg(5);draw();};
document.addEventListener('keydown',e=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='s'){e.preventDefault();save()}if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='e'){e.preventDefault();download()}if(e.key.toLowerCase()==='r'&&!['INPUT','TEXTAREA','SELECT'].includes(document.activeElement.tagName))randomize();});
$('issued').value=new Date().toISOString().slice(0,10);const exp=new Date();exp.setFullYear(exp.getFullYear()+1);$('expiry').value=exp.toISOString().slice(0,10);
fillSelect();loadBg(5);renderCollection();
