const loginFormHandler = async (event) => {
  event.preventDefault();

  const email = document.querySelector("#inputEmail").value.trim();
  const password = document.querySelector("#inputPassword").value.trim();

  if (email && password) {
    const resp = await fetch(`/api/users/login`, {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (resp.ok) {
      document.location.replace("/dashboard");
    } else {
      alert(resp.statusText);
    }
  }
};

document
  .getElementById("login-form")
  .addEventListener("submit", loginFormHandler);

document.getElementById("sign-up-button").addEventListener("click", () => {
  document.location.replace("/create-account");
});
