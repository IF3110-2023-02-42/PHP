/* Variable and initialization */
// Format get params.   ?kode_mapel=x&nama_mapel=y

let params = window.location.search.substring(1).split('&');
let course_id = params[0].split('=')[1];
let course_name = params[1].split('=')[1].replace(/%20/g, " ");
let parentDiv = document.getElementsByClassName("module")[0];

function loadPage() {
  auth(["user", "admin"], `/pages/home/home.html`);
  generateNavbar();
  generateFooter();
}

/* Functions */
/* Display */
function loadModule(moduleData) {
  moduleData.map((el) =>
    parentDiv.insertAdjacentHTML(
      "beforeend",
      `
      <div class="content" onclick="openModule(${el.no_modul})">
          <div class="contentTitle">
              <h2>${course_name} : ${el.judul}</h2>
          </div>
      </div>
      `
    )
  );
}

/* Connections to Server */
function getModules() {
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let moduleData;
      console.log(this.responseText);
      let serverResponse = JSON.parse(this.responseText);
      if (serverResponse["status"]) {
        moduleData = serverResponse["data"];
      } else {
        moduleData = null;
      }
      loadModule(moduleData);
    }
  };
  xhttp.open(
    "GET",
    "http://localhost:8000/api/moduleapi/getmodulebykodemapel?kode_mapel=" +
      course_id,
    true
  );
  xhttp.setRequestHeader("Accept", "application/json");
  xhttp.withCredentials = true;
  xhttp.send();
}

/* Redirect */
function openModule(no_modul){
  window.location.href= '../material/material.html?kode_mapel='+course_id+" &module_number=" + no_modul};

/* caller */
window.addEventListener("load", getModules);
