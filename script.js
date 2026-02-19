const imagePicker=document.getElementById("imagePicker");
const userImage=document.getElementById("userImage");
const placeholder=document.getElementById("imagePlaceholder");
const clearBtn=document.getElementById("clearImageBtn");
const saveBtn=document.getElementById("saveEditsBtn");
const downloadBtn=document.getElementById("downloadBtn");

function setUserImage(dataUrl){
  if(!dataUrl){
    userImage.src="";
    userImage.classList.add("hidden");
    placeholder.classList.remove("hidden");
    localStorage.removeItem("potato_user_image");
    return;
  }
  userImage.src=dataUrl;
  userImage.classList.remove("hidden");
  placeholder.classList.add("hidden");
  localStorage.setItem("potato_user_image", dataUrl);
}

const savedImg=localStorage.getItem("potato_user_image");
if(savedImg) setUserImage(savedImg);

imagePicker.addEventListener("change",(e)=>{
  const file=e.target.files?.[0];
  if(!file) return;
  const reader=new FileReader();
  reader.onload=()=>setUserImage(String(reader.result));
  reader.readAsDataURL(file);
  imagePicker.value="";
});

clearBtn.addEventListener("click",()=>setUserImage(null));

function readSchedule(){
  const rows=[...document.querySelectorAll("#schedule-body tr")];
  return rows.map(r=>{
    const day=r.querySelector("td.day")?.textContent?.trim() ?? "";
    const tds=r.querySelectorAll("td");
    const time=tds[1]?.textContent?.trim() ?? "";
    const content=tds[2]?.textContent?.trim() ?? "";
    return {day,time,content};
  });
}
function applySchedule(data){
  if(!Array.isArray(data)) return;
  const rows=[...document.querySelectorAll("#schedule-body tr")];
  const byDay=new Map(data.map(x=>[x.day,x]));
  for(const r of rows){
    const day=r.querySelector("td.day")?.textContent?.trim();
    const item=byDay.get(day);
    if(!item) continue;
    const tds=r.querySelectorAll("td");
    if(tds[1]) tds[1].textContent=item.time ?? "";
    if(tds[2]) tds[2].textContent=item.content ?? "";
  }
}
function saveEdits(){
  const quote=document.getElementById("quote")?.textContent ?? "";
  localStorage.setItem("potato_quote", quote);
  localStorage.setItem("potato_schedule", JSON.stringify(readSchedule()));
  saveBtn.textContent="저장됨 ✅";
  setTimeout(()=>saveBtn.textContent="수정내용 저장",1200);
}
function restoreEdits(){
  const q=localStorage.getItem("potato_quote");
  if(q){
    const el=document.getElementById("quote");
    if(el) el.textContent=q;
  }
  const s=localStorage.getItem("potato_schedule");
  if(s){
    try{ applySchedule(JSON.parse(s)); }catch(_){}
  }
}
restoreEdits();
saveBtn.addEventListener("click", saveEdits);

downloadBtn.addEventListener("click", async ()=>{
  const target=document.getElementById("capture");
  downloadBtn.disabled=true;
  downloadBtn.textContent="저장 중...";
  try{
    const canvas=await html2canvas(target,{width:1920,height:1080,scale:1,backgroundColor:null,useCORS:true});
    const a=document.createElement("a");
    a.download="감자수베지_스케줄_1920x1080.jpg";
    a.href=canvas.toDataURL("image/jpeg",0.95);
    a.click();
    document.body.classList.remove("exporting");
  } finally {
    downloadBtn.disabled=false;
    downloadBtn.textContent="JPG 저장";
  }
});
