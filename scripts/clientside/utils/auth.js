function auth(roles, redirect) {
  getSession()
    .then((session) => {
      let role;
      if (session["status"]) {
        role = session["data"]["role"];
      } else {
        role = "unregistered";
      }

      if (!roles.includes(role)) {
        window.location = "http://localhost:8080" + redirect;
      }
    })
    .catch((error) => {
      console.log("error", error);
    });
}

function getSession() {
  return new Promise((resolve, reject) => {
    const xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
      if (this.readyState == 4) {
        if (this.status == 200) {
          const session = JSON.parse(this.responseText);
          resolve(session);
        } else {
          reject(this.status);
        }
      }
    };

    xhttp.open("GET", "http://localhost:8000/api/auth/info", true);
    xhttp.setRequestHeader("Accept", "application/json");
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.withCredentials = true;
    xhttp.send();
  });
}
