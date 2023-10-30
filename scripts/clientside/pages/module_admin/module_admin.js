/* Variable and initialization */
let course_id = window.location.search.substring(1).split('=')[1];
let parentDiv = document.getElementsByClassName("module")[0];
let addModuleForm = document.getElementsByClassName("addModuleForm")[0];
let addModuleButton = document.getElementById("addModuleButton");

function loadPage() {
  auth(["admin"], `/pages/home/home.html`);
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
      <div class="content">
          <div class="contentTitle">
              <h2>${el.judul}</h2>
          </div>
  
          <div class="adminButtons">
              <button id="edit" onclick="editModule(${el.no_modul})">
                  <h3>Edit</h3>
              </button>
              <button id="delete" onclick="deleteModule(${el.no_modul})">
                  <h3>Delete</h3>
              </button>
          </div>
          </div>
          `
          )
    );
}
        
function loadAddModuleForm(){
  if (addModuleForm.style.display=="none"){
    addModuleForm.style.display = "flex";
    // When form appear, add event listener to submit the new module
    let saveAddModuleButton = document.getElementsByClassName("saveButton")[0];
    
    // Add variable for input
    let kodeMapelInput = document.getElementById("moduleKodeMapel");
    let moduleNumberInput = document.getElementById("moduleNumber");
    let moduleTitleInput = document.getElementById("moduleTitle");
    let moduleDescriptionInput = document.getElementById("moduleDescription");
    
    saveAddModuleButton.addEventListener("click", function(){addModule(kodeMapelInput.value, moduleNumberInput.value,  moduleTitleInput.value, 
      moduleDescriptionInput.value)});
  } else {
    addModuleForm.style.display="none"
  }    
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

function addModule(kode_mapel, no_modul, judul, deskripsi) {
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      console.log(this.responseText);
      let serverResponse = JSON.parse(this.responseText);
      if (serverResponse["status"]) {
        if (window.confirm("Module sucessfully Added")) {
          window.location.reload();
        } else {
          window.location.reload();
        }
      } else {
        alert("failed to add module");
      }
    }
  };

  let data = {
    kode_mapel: kode_mapel,
    no_modul: no_modul,
    judul: judul,
    deskripsi: deskripsi,
  };

  xhttp.open("POST", "http://localhost:8000/api/moduleapi/addmodule", true);
  xhttp.setRequestHeader("Accept", "application/json");
  xhttp.setRequestHeader("Content-Type", "application/json");
  xhttp.withCredentials = true;
  xhttp.send(JSON.stringify(data));
}

function deleteModule(no_modul) {
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      console.log(this.responseText);
      let serverResponse = JSON.parse(this.responseText);
      if (serverResponse["status"]) {
        if (window.confirm("Module sucessfully deleted")) {
          window.location.reload();
        } else {
          window.location.reload();
        }
      } else {
        alert("failed to delete module");
      }
    }
  };

  let data = {
    no_modul: no_modul,
  };
  xhttp.open("POST", "http://localhost:8000/api/moduleapi/deletemodule", true);
  xhttp.setRequestHeader("Accept", "application/json");
  xhttp.setRequestHeader("Content-Type", "application/json");
  xhttp.withCredentials = true;
  xhttp.send(JSON.stringify(data));
}

/* Redirect */
function editModule(no_modul){
  window.location.href= '../material_admin/material_admin.html?kode_mapel='+course_id+" &module_number=" + no_modul};

/* caller */
/* caller */
window.addEventListener("load", getModules);
addModuleButton.addEventListener("click", loadAddModuleForm);
