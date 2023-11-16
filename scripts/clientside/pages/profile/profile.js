// const
const DEFAULT_PROFILE_PICT_PATH = BASE_PROFILE_PICTURE_PATH + "default.jpg";

/* Profile form */
let inputFile = document.getElementById("profilePhotoFile");
let profileImage = document.getElementById("profileImage");
let profileFirstName = document.getElementById("profileFirstName");
let profileLastName = document.getElementById("profileLastName");
let profileUsername = document.getElementById("profileUsername");
let profileEmail = document.getElementById("profileEmail");
let profilePassword = document.getElementById("profilePassword");
let saveChangesButton = document.querySelector(".saveButton .button");

let ID_Pengguna = 0;

profileImage.onerror = function () {
  setDefaultImg("profileImage");
};

function loadPage() {
  auth(["admin", "user"], `/pages/home/home.html`);
  generateNavbar();
  generateFooter();
  getSession()
    .then((session) => {
      loadProfile(session["data"]);
      if (session["data"]["role"] === "admin") {
        generateStudyDojoExtended(
          true,
          "accepted",
          session["data"]["ID_Pengguna"]
        );
      } else {
        getVerificationStatus(session["data"]["ID_Pengguna"]).then((res) => {
          generateStudyDojoExtended(
            false,
            res.data,
            session["data"]["ID_Pengguna"]
          );
        });
      }
    })
    .catch((err) => {
      console.log("err", err);
    });
}

function loadFile(event) {
  profileImage.src = BASE_PROFILE_PICTURE_PATH + event.target.files[0]["name"];
  console.log("nama file", event.target.files[0]);
}

function loadProfile(profileData) {
  profileImage.src = BASE_PROFILE_PICTURE_PATH + profileData["profile_pict"];
  profileFirstName.value = profileData["nama_depan"];
  profileLastName.value = profileData["nama_belakang"];
  profileUsername.value = profileData["username"];
  profileEmail.value = profileData["email"];
  profilePassword.value = "";
  ID_Pengguna = profileData["ID_Pengguna"];
}

function editProfile() {
  const data = {
    ID_Pengguna: ID_Pengguna,
    nama_depan: profileFirstName.value,
    nama_belakang: profileLastName.value,
    email: profileEmail.value,
    password: profilePassword.value,
    profile_pict: profileImage.src.match(/\/([^\/?#]+)$/)[1],
    username: profileUsername.value,
  };

  if (!checkEmail(data.email)) {
    alertNotification(false, "Email not valid");
  } else if (data.password == "") {
    alertNotification(false, "Password cannot be blank");
  } else {
    editProfileToBackend(data);
  }
}

function editProfileToBackend(data) {
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const res = JSON.parse(this.responseText);
      if (res.status && res.data) {
        alertNotification(true, "Changes saved successfully");
      } else if (res.data === "username_registered") {
        alertNotification(false, "Username already exists");
      } else if (res.data === "email_registered") {
        alertNotification(false, "Email already exists");
      } else {
        alertNotification(false, "Unknown error");
      }
    }
  };

  xhttp.open("POST", "http://localhost:8000/api/userapi/editprofile", true);
  xhttp.setRequestHeader("Accept", "application/json");
  xhttp.setRequestHeader("Content-Type", "application/json");
  xhttp.withCredentials = true;
  xhttp.send(JSON.stringify(data));
}

function checkEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function generateStudyDojoExtended(isAdmin, verificationStatus, ID_Pengguna) {
  var mainContainer = document.getElementById("discussionPageContainer");
  let innerHTMLContainer;
  if (isAdmin) {
    innerHTMLContainer = `
    <h3>Studydojo Extended!</h3>
      <section class="saveButton">
        <button class="button" id="openPageSPA">Open page</button>
      </section>
`;
  } else if (verificationStatus !== "notfound") {
    innerHTMLContainer =
      `
    <h3>Studydojo Extended!</h3>
      <section class="saveButton">
        <button class="button" id="openPageSPA">Open page</button>
        <h5>Verification status : <span>` +
      verificationStatus +
      `</span></h5>
      </section>
`;
  } else {
    innerHTMLContainer = `
        <h3>Studydojo Extended!</h3>
          <section class="saveButton">
            <button class="button"  id="openPageSPA">Open page</button>
            <button class="button"  id="requestVerification">Request verification</button>
            <h5>Verification status : <span>not requested</span></h5>
          </section>
    `;
  }
  mainContainer.innerHTML = innerHTMLContainer;
  var openPageSPA = document.getElementById("openPageSPA");
  openPageSPA.addEventListener("click", () => {
    window.open("http://localhost:8090/", "_blank");
  });
  var requestVerificationComponent = document.getElementById(
    "requestVerification"
  );
  requestVerificationComponent.addEventListener("click", () => {
    requestVerification(ID_Pengguna)
      .then((res) => {
        alertNotification(false, res.data);
        window.open(
          "http://localhost:8080/pages/profile/profile.html",
          "_blank"
        );
      })
      .catch((err) => {
        console.log("err", err);
      });
  });
}

function getVerificationStatus(ID_Pengguna) {
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

    xhttp.open(
      "GET",
      "http://localhost:8000/api/soap/checkstatus?ID_Pengguna=" + ID_Pengguna,
      true
    );
    xhttp.setRequestHeader("Accept", "application/json");
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.withCredentials = true;
    xhttp.send();
  });
}

function requestVerification(ID_Pengguna) {
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

    const data = {
      ID_Pengguna,
    };

    xhttp.open("POST", "http://localhost:8000/api/soap/addrequest", true);
    xhttp.setRequestHeader("Accept", "application/json");
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.withCredentials = true;
    xhttp.send(JSON.stringify(data));
  });
}

inputFile.addEventListener("change", loadFile);
saveChangesButton.addEventListener("click", editProfile);

// Untuk update profile, profile picture yang lama akan dihapus dari storage
