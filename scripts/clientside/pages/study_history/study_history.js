courseData = [
  {
    title: "Course 1",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    title: "Course 2",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    title: "Course 3",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
];

function loadPage() {
  auth(["admin", "user"], `/pages/home/home.html`);
  generateNavbar();
  generateFooter();
  getMaxPagination()
    .then((max) => {
      if (max.data !== "no_history") {
        generatePagination(max.data, 1, generateHistoryList);
      }
    })
    .catch((err) => {
      console.log("err", err);
    });
  generateHistoryList(1);
}

function getMaxPagination() {
  return new Promise((resolve, reject) => {
    getSession()
      .then((session) => {
        const xhttp = new XMLHttpRequest();

        xhttp.onreadystatechange = function () {
          if (this.readyState == 4) {
            if (this.status == 200) {
              const maxPage = JSON.parse(this.responseText);
              resolve(maxPage);
            } else {
              reject(this.status);
            }
          }
        };

        const data = {
          ID_Pengguna: session["data"]["ID_Pengguna"],
          size: 5,
        };

        xhttp.open(
          "GET",
          "http://localhost:8000/api/studyhistoryapi/getmaxpage?ID_Pengguna=" +
            data.ID_Pengguna +
            "&size=" +
            data.size,
          true
        );
        xhttp.setRequestHeader("Accept", "application/json");
        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.withCredentials = true;
        xhttp.send();
      })
      .catch((err) => {
        console.log("err", err);
      });
  });
}

function getStudyHistory(page) {
  return new Promise((resolve, reject) => {
    getSession()
      .then((session) => {
        const xhttp = new XMLHttpRequest();

        xhttp.onreadystatechange = function () {
          if (this.readyState == 4) {
            if (this.status == 200) {
              const historyStatus = JSON.parse(this.responseText);
              resolve(historyStatus);
            } else {
              reject(this.status);
            }
          }
        };

        const data = {
          ID_Pengguna: session["data"]["ID_Pengguna"],
          page: page,
          size: 5,
        };

        xhttp.open(
          "GET",
          "http://localhost:8000/api/studyhistoryapi/getuserhistory?ID_Pengguna=" +
            data.ID_Pengguna +
            "&page=" +
            data.page +
            "&size=" +
            data.size,
          true
        );
        xhttp.setRequestHeader("Accept", "application/json");
        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.withCredentials = true;
        xhttp.send();
      })
      .catch((err) => {
        console.log("err", err);
      });
  });
}

function generateHistoryList(page) {
  getStudyHistory(page)
    .then((history) => {
      const parentDiv = document.getElementById("studyHistoryCt");
      if (history.data === "no_history") {
        const p = document.createElement("p");
        p.innerHTML = "No history found";
        parentDiv.appendChild(p);
      } else {
        while (parentDiv.hasChildNodes()) {
          parentDiv.removeChild(parentDiv.firstChild);
        }

        console.log("history.data", history.data);
        history.data.map((el) => getMaterial(parentDiv, el["ID_Material"]));
      }
    })
    .catch((err) => {
      console.log("err", err);
    });
}

function getMaterial(parent, material_id) {
  const xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4) {
      if (this.status == 200) {
        const material = JSON.parse(this.responseText);
        generateHistory(parent, material.data);
      } else {
        console.log(this.status);
      }
    }
  };

  xhttp.open(
    "GET",
    "http://localhost:8000/api/materialapi/getmaterialbyid?ID_Material=" +
      material_id,
    true
  );

  xhttp.setRequestHeader("Accept", "application/json");
  xhttp.setRequestHeader("Content-Type", "application/json");
  xhttp.withCredentials = true;
  xhttp.send();
}

function getMapel() {
  const xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4) {
      if (this.status == 200) {
        const material = JSON.parse(this.responseText);
        generateHistory(parent, material.data);
      } else {
        console.log(this.status);
      }
    }
  };

  xhttp.open(
    "GET",
    "http://localhost:8000/api/materialapi/getmaterialbyid?ID_Material=" +
      material_id,
    true
  );

  xhttp.setRequestHeader("Accept", "application/json");
  xhttp.setRequestHeader("Content-Type", "application/json");
  xhttp.withCredentials = true;
  xhttp.send();
}

function generateHistory(parent, material) {
  parent.insertAdjacentHTML(
    "beforeend",
    `
  <a href="" class="studyHistory-link">
      <div class="studyHistory">
          <img
          src="../../../../assets/module-profile.png"
          alt="module profile icon"
          id="module-profile"
          />
          <div class="content">
              <h2>${material.judul}</h2>
              <h4>Mapel / Kelas</h4>
              <p>${material.teks}</p>
          </div>
      </div>
  </a>`
  );
}
