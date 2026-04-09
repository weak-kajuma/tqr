(function () {
  const COOKIE_NAME = "savedIdNumber";

  function setIdCookie(idValue) {
    const maxAge = 60 * 60 * 24 * 365; // 1 year
    document.cookie = `${COOKIE_NAME}=${encodeURIComponent(idValue)}; max-age=${maxAge}; path=/; SameSite=Lax`;
  }

  function getIdCookie() {
    const pairs = document.cookie ? document.cookie.split("; ") : [];
    for (const pair of pairs) {
      const [key, ...rest] = pair.split("=");
      if (key === COOKIE_NAME) {
        return decodeURIComponent(rest.join("="));
      }
    }
    return "";
  }

  function clearIdCookie() {
    document.cookie = `${COOKIE_NAME}=; max-age=0; path=/; SameSite=Lax`;
  }

  window.idCookie = {
    setIdCookie,
    getIdCookie,
    clearIdCookie,
  };
})();
