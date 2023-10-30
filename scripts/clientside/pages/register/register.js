function register(event) {
  event.preventDefault();
  const data = {
    nama_depan: document.getElementById("nama_depan").value,
    nama_belakang: document.getElementById("nama_belakang").value,
    username: document.getElementById("username").value,
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
    confirm_password: document.getElementById("confirm_password").value,
  };

  if (!checkField(data)) {
    alertNotification(false, "Incomplete form");
  } else if (!checkEmail(data.email)) {
    alertNotification(false, "Email not valid");
  } else if (!checkPassword(data.password, data.confirm_password)) {
    alertNotification(false, "Password doesn't match");
  } else {
    registerUserToBackend(event);
  }
}

function registerUserToBackend(event) {
  event.preventDefault();

  const xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const res = JSON.parse(this.responseText);
      if (res.status) {
        alertNotification(true, "Account registered successfully");
        setTimeout(() => {
          window.location = "http://localhost:8080/pages/login/login.html";
        }, 1000);
      } else if (res.data === "username_registered") {
        alertNotification(false, "Username already taken");
      } else if (res.data === "email_registered") {
        alertNotification(false, "Email already taken");
      } else {
        alertNotification(false, "Unknown error");
      }
    }
  };

  const data = {
    nama_depan: document.getElementById("nama_depan").value,
    nama_belakang: document.getElementById("nama_belakang").value,
    username: document.getElementById("username").value,
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
  };

  xhttp.open("POST", "http://localhost:8000/api/registerapi/register", true);
  xhttp.setRequestHeader("Accept", "application/json");
  xhttp.setRequestHeader("Content-Type", "application/json");
  xhttp.withCredentials = true;
  xhttp.send(JSON.stringify(data));
}

function checkPassword(password, confirm) {
  return password === confirm && password !== "";
}

function checkField(data) {
  if (
    data.nama_depan === "" ||
    data.nama_belakang === "" ||
    data.username === "" ||
    data.email === "" ||
    data.password === "" ||
    data.confirm_password === ""
  ) {
    return false;
  }
  return true;
}

function checkEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
