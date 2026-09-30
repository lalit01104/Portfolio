const nav=document.querySelector('.nav');
document.querySelector('.menu').addEventListener('click',()=>nav.classList.toggle('open'));
document.querySelectorAll('.navlinks a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));

const filters=document.querySelectorAll('.filter');
const projects=document.querySelectorAll('.project');
filters.forEach(btn=>btn.addEventListener('click',()=>{
  filters.forEach(b=>b.classList.remove('active')); btn.classList.add('active');
  const f=btn.dataset.filter;
  projects.forEach(p=>p.style.display=(f==='all'||p.dataset.category===f)?'block':'none');
}));

const modal=document.getElementById('projectModal');
const modalTitle=document.getElementById('modalTitle');
const modalDesc=document.getElementById('modalDesc');
const modalMedia=document.getElementById('modalMedia');
document.querySelectorAll('.project').forEach(p=>{
  p.querySelector('.view-btn').addEventListener('click',()=>{
    modalTitle.textContent=p.dataset.title;
    modalDesc.textContent=p.dataset.desc;
    const path=p.dataset.video || '';
    modalMedia.className='modal-media';
    modalMedia.innerHTML=path ? `<video controls autoplay playsinline style="width:100%;height:100%;object-fit:contain;background:#080808"><source src="${path}" type="video/mp4">Your browser does not support HTML5 video.</video>` : '';
    modal.classList.add('show'); modal.setAttribute('aria-hidden','false');
  });
});
document.querySelector('.close').addEventListener('click',closeModal);
modal.addEventListener('click',e=>{if(e.target===modal)closeModal()});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal()});
function closeModal(){const v=modalMedia.querySelector('video');if(v)v.pause();modal.classList.remove('show');modal.setAttribute('aria-hidden','true')}
document.getElementById('contactForm').addEventListener('submit',e=>{
  e.preventDefault();
  const status=document.getElementById('formStatus');
  status.textContent='Sending…';
  const data=new FormData(e.target);
  data.append('access_key','4ea87a05-d9e4-4131-a358-a4e276b8d384');
  fetch('https://api.web3forms.com/submit',{
    method:'POST',
    body:data,
    headers:{Accept:'application/json'}
  }).then(r=>{
    if(r.ok){ e.target.reset(); status.textContent='✓ Message sent! I\'ll get back to you soon.'; }
    else { status.textContent='Something went wrong. Email me directly at lalitpatil1104@gmail.com'; }
  }).catch(()=>{ status.textContent='Something went wrong. Email me directly at lalitpatil1104@gmail.com'; });
});
