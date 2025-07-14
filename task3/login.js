const validate = () => {
  const cIDElement = document.getElementById("cID");
  const passwordElement = document.getElementById("password");
  const cID = cIDElement.value.trim();
  const password = passwordElement.value;
  if (cID === "") {
    const cIDMessageElement = document.getElementById("cIDMessage");
    cIDMessageElement.textContent = "Enter customer ID";
    return;
  }
  if (password !== "password") {
    const passwordMessageElement = document.getElementById("passwordMessage");
    passwordMessageElement.textContent = "Enter correct password";
    return;
  }
  localStorage.setItem("cID", cID);
  window.location.href = "index.html";
};

document.addEventListener("keypress", (event) => {
  if (event.key === "Enter") validate();
});
