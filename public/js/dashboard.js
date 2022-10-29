const newFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector("#post-title").value.trim();
  const content = document.querySelector("#post-content").value.trim();

  if (title && content) {
    const resp = await fetch(`/api/posts`, {
      method: "POST",
      body: JSON.stringify({ title, content }),
      headers: { "Content-Type": "application/json" },
    });

    if (resp.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("Failed to create post");
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute("data-id")) {
    const id = event.target.getAttribute("data-id");

    const resp = await fetch(`/api/posts/${id}`, {
      method: "DELETE",
    });

    if (resp.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("Failed to delete project");
    }
  }
};

document
  .querySelector(".new-post-form")
  .addEventListener("submit", newFormHandler);

document
  .querySelector(".post-list")
  .addEventListener("submit", delButtonHandler);
