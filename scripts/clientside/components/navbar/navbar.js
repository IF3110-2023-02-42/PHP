const BASE_PROFILE_PICTURE_PATH = "/Data/profilePicture/";

function generateNavbar() {
  getSession()
    .then((session) => {
      if (session["status"]) {
        generateNavbarByRoles(
          session["data"]["role"],
          session["data"]["profile_pict"],
          session["data"]["nama_depan"]
        );
      } else {
        generateNavbarByRoles("unregistered", null, null);
      }
    })
    .catch((error) => {
      console.log("error", error);
    });
}

function generateNavbarByRoles(role, profile_pict, nama_depan) {
  // getlinks
  const links = getLinksByRole(role);

  // find the header
  const header = document.getElementById("header");

  if (role !== "unregistered") {
    // searchbox
    const searchBox = document.createElement("section");
    searchBox.classList.add("searchBox");

    // searchButton
    const searchButton = document.createElement("button");
    searchButton.classList.add("searchButton");
    const searchButtonImg = document.createElement("img");
    searchButtonImg.src = "/assets/Lup.png";
    searchButtonImg.alt = "Lup icon";
    searchButton.appendChild(searchButtonImg);
    searchButton.addEventListener("click", function () {
      searchWithParams();
    });

    // searchInput
    const searchInput = document.createElement("input");
    searchInput.type = "text";
    searchInput.classList.add("searchInput");
    searchInput.placeholder = "What do you want to learn?";
    searchInput.id = "nav-searchInput";

    // searchFilter
    const searchFilter = document.createElement("button");
    searchFilter.classList.add("searchFilter");
    const searchFilterImg = document.createElement("img");
    searchFilterImg.src = "/assets/Filter.png";
    searchFilterImg.alt = "Filter icon";
    searchFilter.appendChild(searchFilterImg);
    searchFilter.addEventListener("click", function () {
      createFilterBox();
    });

    // Append elements to searchBox
    searchBox.appendChild(searchButton);
    searchBox.appendChild(searchInput);
    searchBox.appendChild(searchFilter);

    header.appendChild(searchBox);
  }

  // features
  const features = document.createElement("section");
  features.classList.add("features");

  // route list
  const routeList = document.createElement("div");
  routeList.classList.add("routeList");

  links.forEach((link) => {
    const a = document.createElement("a");
    a.href = link.href;
    a.textContent = link.text;
    routeList.appendChild(a);
  });

  features.appendChild(routeList);

  if (role === "unregistered") {
    const loginButton = document.createElement("button");
    loginButton.classList.add("loginButton");
    loginButton.innerHTML = "Login";
    loginButton.addEventListener("click", function () {
      window.location = "http://localhost:8080/pages/login/login.html";
    });
    features.appendChild(loginButton);
  } else {
    // profileButton
    const profileButton = document.createElement("button");
    profileButton.classList.add("profileButton");
    profileButton.addEventListener("click", function () {
      showPopup(role, profile_pict, nama_depan);
    });

    const profileIcon = document.createElement("img");
    profileIcon.src = BASE_PROFILE_PICTURE_PATH + profile_pict;
    profileIcon.alt = "profile picture";
    profileIcon.id = "profileIconNavbar";
    profileIcon.onerror = function () {
      setDefaultImg("profileIconNavbar");
    };

    profileButton.appendChild(profileIcon);
    features.appendChild(profileButton);
  }
  header.appendChild(features);
}

function showPopup(role, profile_pict, nama_depan) {
  const navPopup = document.getElementById("navPopup");
  const header = document.getElementById("header");

  if (navPopup !== null) {
    header.removeChild(navPopup);
  } else {
    const navPopup = document.createElement("section");
    navPopup.classList.add("navPopup");
    navPopup.id = "navPopup";

    const profileCt = document.createElement("div");
    profileCt.classList.add("profileCt");

    const profileIcon = document.createElement("img");
    profileIcon.src = BASE_PROFILE_PICTURE_PATH + profile_pict;
    profileIcon.alt = "profile picture";
    profileIcon.id = "profileIconPopup";
    profileIcon.onerror = function () {
      setDefaultImg("profileIconPopup");
    };

    const nameCt = document.createElement("div");
    nameCt.classList.add("nameCt");

    const nameLink = document.createElement("a");
    nameLink.textContent = nama_depan;

    const roleLink = document.createElement("a");
    roleLink.classList.add("role");
    if (role === "admin") {
      roleLink.textContent = "Admin";
    } else {
      roleLink.textContent = "Student";
    }

    const logoutButton = document.createElement("button");
    logoutButton.classList.add("logoutButton");
    logoutButton.textContent = "Logout";
    logoutButton.addEventListener("click", function () {
      logout();
    });

    nameCt.appendChild(nameLink);
    nameCt.appendChild(roleLink);
    nameCt.appendChild(logoutButton);

    profileCt.appendChild(profileIcon);
    profileCt.appendChild(nameCt);

    const divider = document.createElement("div");
    divider.classList.add("divider");

    const routeCt = document.createElement("div");
    routeCt.classList.add("routeCt");

    const navbarRoute = document.createElement("div");
    navbarRoute.classList.add("navbarRoute");

    const navbarRouteLinks = getLinksByRole(role);
    navbarRouteLinks.forEach((link) => {
      const a = document.createElement("a");
      a.href = link.href;
      a.textContent = link.text;
      navbarRoute.appendChild(a);
    });

    const userRoute = document.createElement("div");
    userRoute.classList.add("userRoute");

    const userRouteLinks = [
      { href: "../profile/profile.html", text: "Profile" },
      { href: "../study_history/study_history.html", text: "Study History" },
      { href: "../courses/course.html", text: "Help" },
    ];
    userRouteLinks.forEach((link) => {
      const a = document.createElement("a");
      a.href = link.href;
      a.textContent = link.text;
      userRoute.appendChild(a);
    });

    routeCt.appendChild(navbarRoute);
    routeCt.appendChild(userRoute);

    navPopup.appendChild(profileCt);
    navPopup.appendChild(divider);
    navPopup.appendChild(routeCt);

    header.appendChild(navPopup);
  }
}

function getLinksByRole(role) {
  if (role === "admin") {
    return [
      { href: "../home/home.html", text: "Home" },
      { href: "../about_us/about_us.html", text: "About" },
      { href: "../course_admin/course_admin.html", text: "Course" },
      { href: "../exercises/exercises.html", text: "Exercise" },
    ];
  } else if (role === "user") {
    return [
      { href: "../home/home.html", text: "Home" },
      { href: "../about_us/about_us.html", text: "About" },
      { href: "../courses/course.html", text: "Course" },
      { href: "../exercises/exercises.html", text: "Exercise" },
    ];
  } else {
    return [
      { href: "../home/home.html", text: "Home" },
      { href: "../about_us/about_us.html", text: "About" },
    ];
  }
}

function setDefaultImg(imgId) {
  const img = document.getElementById(imgId);
  img.src = BASE_PROFILE_PICTURE_PATH + "default.jpg";
  img.alt = "Default Image";
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

function logout() {
  const xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4) {
      if (this.status == 200) {
        location.reload();
      }
    }
  };

  xhttp.open("GET", "http://localhost:8000/api/auth/logout", true);
  xhttp.setRequestHeader("Accept", "application/json");
  xhttp.setRequestHeader("Content-Type", "application/json");
  xhttp.withCredentials = true;
  xhttp.send();
}

function createFilterBox() {
  const headerElement = document.getElementById("header");
  const filterBoxExists = !!headerElement.querySelector("#filterBox");

  if (filterBoxExists) {
    const filterBox = document.getElementById("filterBox");
    headerElement.removeChild(filterBox);
  } else {
    headerElement.insertAdjacentHTML(
      `afterbegin`,
      `<section class="filterBox" id="filterBox">
      <section class="filter-search">
        <a>Search by</a>
        <div class="filterListCt">
          <div class="filter-inputCt">
            <label>Course Name</label>
            <div>
              <input type="checkbox" id="course-name" />
            </div>
          </div>
          <div class="filter-inputCt">
            <label>Module Name</label>
            <div>
              <input type="checkbox" id="module-name" />
            </div>
          </div>
        </div>
        <div class="filter-inputCt">
          <label>Material Name</label>
          <div>
            <input type="checkbox" id="material-name" />
          </div>
        </div>
      </section>
      <section class="filter-filter">
        <a>Filter</a>
        <div class="filterListCt">
          <div class="filter-inputCt">
            <label>Class</label>
            <div class="filter-option">
              <input type="checkbox" value="10" id="kelas-10" />10
              <input type="checkbox" value="11" id="kelas-11" />11
              <input type="checkbox" value="12" id="kelas-12" />12
            </div>
          </div>
        </div>
      </section>
      <section class="filter-order">
        <a>Order by</a>
        <div class="filterListCt">
          <div class="filter-inputCt">
            <label>Class level</label>
            <div class="filter-option">
              <input type="radio" name="class-level" value="asc" checked />
              Ascending
              <input type="radio" name="class-level" value="desc" />
              Descending
            </div>
          </div>
          <div class="filter-inputCt">
            <label>Name</label>
            <div class="filter-option">
              <input type="radio" name="name-order" value="asc" checked />
              Ascending
              <input type="radio" name="name-order" value="desc" />
              Descending
            </div>
          </div>
        </div>
      </section>
    </section>`
    );
  }
}

function searchWithParams() {
  const headerElement = document.getElementById("header");
  const filterBoxExists = !!headerElement.querySelector("#filterBox");

  const data = {
    searchInput: document.getElementById("nav-searchInput").value,
    searchByCourseName: false,
    searchByModuleName: false,
    searchByMaterialName: true,
    filterClass10: true,
    filterClass11: true,
    filterClass12: true,
    sortByClass: "asc",
    sortByName: "asc",
  };

  if (filterBoxExists) {
    data.searchByCourseName = document.getElementById("course-name").checked;
    data.searchByModuleName = document.getElementById("module-name").checked;
    data.searchByMaterialName =
      document.getElementById("material-name").checked;
    data.filterClass10 = document.getElementById("kelas-10").checked;
    data.filterClass11 = document.getElementById("kelas-11").checked;
    data.filterClass12 = document.getElementById("kelas-12").checked;
    data.sortByClass = getRadioButtonValue("class-level");
    data.sortByName = getRadioButtonValue("name-order");
  }
  if (data.searchInput == "" || data.searchInput == undefined) {
    data.searchInput = "a";
  }

  window.location = dataToURI(data);
}

function getRadioButtonValue(name) {
  const radios = document.getElementsByName(name);

  for (const radio of radios) {
    if (radio.checked) {
      return radio.value;
    }
  }
}

function dataToURI(data) {
  return (
    `http://localhost:8080/pages/material/material.html?keyword=` +
    data.searchInput +
    `&searchby=` +
    data.searchByCourseName +
    `,` +
    data.searchByModuleName +
    `,` +
    data.searchByMaterialName +
    `&filterclass=` +
    data.filterClass10 +
    `,` +
    data.filterClass11 +
    `,` +
    data.filterClass12 +
    `&orderbyclass=` +
    data.sortByClass +
    `&orderbyname=` +
    data.sortByName
  );
}
