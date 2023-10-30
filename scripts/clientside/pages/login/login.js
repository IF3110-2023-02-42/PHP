function login(event) {
  event.preventDefault();
  const xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const res = JSON.parse(this.responseText);
      if (res.status) {
        alertNotification(true, "Login successful");
        setTimeout(() => {
          window.location = "http://localhost:8080/pages/home/home.html";
        }, 1000);
      } else if (res.data === "account_not_found") {
        alertNotification(false, "Account not found");
      } else if (res.data === "wrong_password") {
        alertNotification(false, "Wrong password");
      } else if (res.data === "already_login") {
        alertNotification(false, "Already login");
      } else {
        alertNotification(false, "Unknown error");
        console.log("res", res);
      }
    }
  };

  let data = {
    username: document.getElementById("username").value,
    password: document.getElementById("password").value,
  };
  xhttp.open("POST", "http://localhost:8000/api/auth/login", true);
  xhttp.setRequestHeader("Accept", "application/json");
  xhttp.setRequestHeader("Content-Type", "application/json");
  xhttp.withCredentials = true;
  xhttp.send(JSON.stringify(data));
}
