(function () {
  const form = document.getElementById("id-form");
  const input = document.getElementById("id-number");
  const errorMessage = document.getElementById("error-message");

  const normalizeDigits = (value) => value.replace(/\D/g, "").slice(0, 8);

  const isValidId = (value) => /^\d{8}$/.test(value);

  input.addEventListener("input", () => {
    input.value = normalizeDigits(input.value);
    if (errorMessage.textContent) {
      errorMessage.textContent = "";
    }
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const idValue = normalizeDigits(input.value);
    if (!isValidId(idValue)) {
      errorMessage.textContent = "8桁の数字を入力してください。";
      input.focus();
      return;
    }

    window.idCookie.setIdCookie(idValue);
    location.href = "qr.html";
  });

  const savedId = window.idCookie.getIdCookie();
  if (isValidId(savedId)) {
    location.replace("qr.html");
  }
})();
