// Format get params.   ?kode_mapel=x&module_number=y


let params = window.location.search.substring(1).split('&');
let ID_Material = params[0].split('=')[1];
let parentDiv = document.getElementsByClassName("material")[0];
let exerciseDiv = document.getElementsByClassName("exercisePlaceholder")[0];

function loadPage() {
  // auth(["user", "admin"], `/pages/home/home.html`);
  generateNavbar();
  generateFooter();
}

/* Functions */
/* Display */
function loadMaterial(materialData)
{
    let videoPath = '../../Data/materivideo/';
    let videoMaterial = document.getElementById("videoMaterial");
    let materialText = document.getElementById("materialText");
    console.log(materialData["video"]);
    videoMaterial.src = videoPath+materialData["video"];
    materialText.innerHTML = `<p>${materialData["teks"]}</p>`
}

/* Connections to Server */
function getMaterialById(ID_Material){
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let materialData;
      console.log(this.responseText);
      let serverResponse = JSON.parse(this.responseText);
      if (serverResponse["status"]) {
        materialData = serverResponse["data"];
      } else {
        materialData = null;
      }
      loadMaterial(materialData);
    }
  };
  xhttp.open(
    "GET",
    "http://localhost:8000/api/materialapi/getmaterialbyid?ID_Material=" + ID_Material,
    true
  );
  xhttp.setRequestHeader("Accept", "application/json");
  xhttp.withCredentials = true;
  xhttp.send();
}

function openMaterial(){
  window.location.href= 'http://localhost:8090/exercise/'+ID_Material};

  /* caller */
  window.addEventListener("load", function () {getMaterialById(ID_Material)});