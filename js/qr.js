(function () {
  const idValueElement = document.getElementById("id-value");
  const qrBox = document.getElementById("qr-box");
  const qrStage = document.getElementById("qr-stage");
  const clearIdButton = document.getElementById("clear-id");

  const savedId = window.idCookie.getIdCookie();
  if (!/^\d{8}$/.test(savedId)) {
    location.replace("index.html");
    return;
  }

  idValueElement.textContent = savedId;

  new QRCode(qrBox, {
    text: savedId,
    width: 280,
    height: 280,
    correctLevel: QRCode.CorrectLevel.M,
  });

  let scale = 1;
  const minScale = 0.6;
  const maxScale = 6;

  const activePointers = new Map();
  let pinchStartDistance = null;
  let pinchStartScale = 1;

  const clamp = (value) => Math.min(maxScale, Math.max(minScale, value));
  const distance = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);

  const applyScale = () => {
    qrBox.style.transform = `scale(${scale})`;
  };

  qrStage.addEventListener("pointerdown", (event) => {
    qrStage.setPointerCapture(event.pointerId);
    activePointers.set(event.pointerId, { x: event.clientX, y: event.clientY });

    if (activePointers.size === 2) {
      const [p1, p2] = [...activePointers.values()];
      pinchStartDistance = distance(p1, p2);
      pinchStartScale = scale;
    }
  });

  qrStage.addEventListener("pointermove", (event) => {
    if (!activePointers.has(event.pointerId)) {
      return;
    }

    activePointers.set(event.pointerId, { x: event.clientX, y: event.clientY });

    if (activePointers.size === 2 && pinchStartDistance) {
      const [p1, p2] = [...activePointers.values()];
      const currentDistance = distance(p1, p2);
      const zoomRatio = currentDistance / pinchStartDistance;
      scale = clamp(pinchStartScale * zoomRatio);
      applyScale();
    }
  });

  const endPointer = (event) => {
    activePointers.delete(event.pointerId);
    if (activePointers.size < 2) {
      pinchStartDistance = null;
    }
  };

  qrStage.addEventListener("pointerup", endPointer);
  qrStage.addEventListener("pointercancel", endPointer);

  clearIdButton.addEventListener("click", () => {
    window.idCookie.clearIdCookie();
    location.href = "index.html";
  });

  applyScale();
})();
