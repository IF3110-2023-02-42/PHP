// Format get params.   ?kode_mapel=x&module_number=y


let params = window.location.search.substring(1).split('&');
let ID_Material = params[0].split('=')[1];
let parentDiv = document.getElementsByClassName("material")[0];
let exerciseDiv = document.getElementsByClassName("exercisePlaceholder")[0];

function loadPage() {
  auth(["user", "admin"], `/pages/home/home.html`);
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

function loadExercise(exerciseData)
{
  console.log("test: ");
  console.log(exerciseData[0]);
  exerciseDiv.insertAdjacentHTML(
    "beforeend",
    `
    <div class="exercise" onclick="openMaterial()">
                      <img 
                      src="../../../../assets/module-profile.png" 
                      alt="exercise profile icon"
                      id="exercise-profile"
                      />
                  
                      <div class="exerciseContent">
                          <div class="exerciseTitle">
                              <h3>${exerciseData[0]["judul"]}</h3>
                          </div>
                          <p>${exerciseData[0]["deskripsi"]}</p>
                      </div>
    `
  )
}

function getExercise(ID_Material){
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      console.log(this.responseText);
      let serverResponse = JSON.parse(this.responseText);
      if (serverResponse["status"]) {
        exerciseData = serverResponse["data"];
      } else {
        exerciseData = null;
      }
      loadExercise(exerciseData);
    }
  };
  xhttp.open(
    "GET",
    "http://localhost:8000/api/exerciseapi/getexercisebymaterialid?id_material=" + ID_Material,
    true
  );
  xhttp.setRequestHeader("Accept", "application/json");
  xhttp.withCredentials = true;
  xhttp.send();
}

function openMaterial(){
  window.location.href= '../exercise/exercise.html?id_material='+ID_Material};

  /* caller */
  window.addEventListener("load", function () {getMaterialById(ID_Material), getExercise(ID_Material)});