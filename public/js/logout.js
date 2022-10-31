const logout = async () => {
  const resp = await fetch("/api/users/logout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  if (resp.ok) {
    document.location.replace("/login");
  } else {
    alert(resp.statusText);
  }
};

document.querySelector("#logout-link").addEventListener("click", logout);
