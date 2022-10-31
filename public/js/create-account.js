const createAcctFormHandler = async (event) => {
  event.preventDefault();

  const first_name = document.getElementById("createFirstName").value.trim();
  const last_name = document.getElementById("createLastName").value.trim();
  const email = document.getElementById("createEmail").value.trim();
  const password = document.getElementById("createPassword").value.true();

  if (first_name && last_name && email && password) {
    const resp = await fetch(`/api/users/create-account`, {
      method: "POST",
      body: JSON.stringify({ first_name, last_name, email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (resp.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("Failed to sign up");
    }
  }
};

document
  .getElementById("signup-form")
  .addEventListener("submit", createAcctFormHandler);
