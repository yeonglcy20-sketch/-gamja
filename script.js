
const picker=document.getElementById("imagePicker");
const img=document.getElementById("userImage");
const ph=document.getElementById("imagePlaceholder");
const btn=document.getElementById("downloadBtn");

picker.addEventListener("change",e=>{
  const f=e.target.files?.[0]; if(!f) return;
  const r=new FileReader();
  r.onload=()=>{img.src=r.result;img.classList.remove("hidden");ph.style.display="none";};
  r.readAsDataURL(f);
});

btn.addEventListener("click",async()=>{
  const canvas=await html2canvas(document.getElementById("capture"),{width:1920,height:1080});
  const a=document.createElement("a");
  a.download="schedule.jpg";
  a.href=canvas.toDataURL("image/jpeg",0.95);
  a.click();
});
