// JPG 저장 (1920x1080)
const btn = document.getElementById("downloadBtn");
btn.addEventListener("click", async () => {
  const target = document.getElementById("capture");
  btn.disabled = true;
  btn.textContent = "저장 중...";

  try{
    const canvas = await html2canvas(target, {
      width: 1920,
      height: 1080,
      scale: 1,
      backgroundColor: null,
      useCORS: true
    });

    const link = document.createElement("a");
    link.download = "감자수베지_스케줄_1920x1080.jpg";
    link.href = canvas.toDataURL("image/jpeg", 0.95);
    link.click();
  } finally {
    btn.disabled = false;
    btn.textContent = "JPG 저장";
  }
});
