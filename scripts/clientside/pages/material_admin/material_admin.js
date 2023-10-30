// Format get params.   ?kode_mapel=x&module_number=y


let params = window.location.search.substring(1).split('&');
let course_id = params[0].split('=')[1];
let module_number = params[1].split('=')[1];
let parentDiv = document.getElementsByClassName("material")[0];
let addMaterialForm = document.getElementsByClassName("addMaterialForm")[0];
let addMaterialButton = document.getElementById("addMaterialButton");

function loadPage() {
  auth(["admin"], `/pages/home/home.html`);
  generateNavbar();
  generateFooter();
}

/* Functions */
/* Display */
function loadMaterials(materialData){
    materialData.map((el) =>
      parentDiv.insertAdjacentHTML(
        "beforeend",
        `
        <div class="content" id="material${el.ID_Material}">
            <div class="contentTitle">
                <h2>${el.judul}</h2>
            </div>
    
            <div class="adminButtons">
                <button id="edit" onclick="getMaterialById(${el.ID_Material})">
                    <h3>Edit</h3>
                </button>
                <button id="delete" onclick="deleteMaterial(${el.ID_Material})">
                    <h3>Delete</h3>
                </button>
            </div>
        </div>
            `
        )
    );
  }

function loadAddMaterialForm(){
    if (addMaterialForm.style.display=="none"){
      addMaterialForm.style.display = "flex";
      // When form appear, add event listener to submit the new module
      let saveAddMaterialButton = document.getElementsByClassName("saveButton")[0];
      let kodeMapelInput = document.getElementById("materialKodeMapel");
      let moduleNumberInput = document.getElementById("moduleNumber");
      let materialTitleInput = document.getElementById("materialTitle");
      let videoInput = document.getElementById("videoInput");
      let teksInput = document.getElementById("teksInput");
      // Add variable for input
      console.log("masuk");



      saveAddMaterialButton.addEventListener("click", function(){
        addMaterial(kodeMapelInput.value,moduleNumberInput.value,materialTitleInput.value, videoInput.files[0]['name'], teksInput.value);
      });
    } else {
      addMaterialForm.style.display="none"
    }    
}

function loadEditMaterialForm(materialData)
{
    let videoPath = '../../Data/materivideo/';
    let materialParent = document.getElementById(`material${materialData['ID_Material']}`);
    console.log(materialData["teks"]);
    materialParent.insertAdjacentHTML("afterend",
    `
    <div class="editMaterialForm">
      <div class="editVideoContainer">
        <div class="editVideoTitle">
            <h3>Edit video</h3>
        </div>
        <div class="editVideo">
            <div class="video" id="video${materialData["ID_Material"]}">
                <video src="${videoPath}${materialData['video']}"
                controls="true"
                ></video>
            </div>
        
            <div class="videoModification">
                <div class="videoSelector">
                    <label for="videoInput">Choose a video</label>
                    <input type="file" id="videoInput" class="videoInput${materialData["ID_Material"]}" accept="video/*">
                </div>
                <div class="editVideoButtons">
                    <button onclick="uploadVideo(${materialData["ID_Material"]})">
                        <h3>Upload</h3>
                    </button>
                    <button id="delete" onclick="deleteVideo(${materialData["ID_Material"]})">
                        <h3>Delete</h3>  
                    </button>
                </div>
            </div>
        
        </div>
      </div>
        
      <div class="editTextContainer">
        <div class="editTextTitle">
            <h3>Edit material text</h3>
        </div>
        <div class="editText">
            <textarea name="text material" id="teksInput${materialData["ID_Material"]}">
              ${materialData["teks"]}
            </textarea>
            <div class="editTextButtons">
        
            </div>  
        </div>
      </div>
        
      <div class="editExerciseContainer">
        <div class="editExerciseTitle">
            <h3>Edit exercise</h3>
        </div>
        <div class="exercise">
            <img 
            src="../../../../assets/module-profile.png" 
            alt="exercise profile icon"
            id="exercise-profile"
            />
        
            <div class="exerciseContent">
                <div class="exerciseTitle">
                    <h3>Exercise 1</h3>
                </div>
                <p>lorem</p>
                <div class="exerciseButtons">   
                    <button>
                        <h3>Edit</h3>
                    </button>
                    <button id="delete">
                        <h3>Delete</h3>
                    </button>
                </div>
            </div>
        </div>
      </div>
      <div class="saveChangeButton" id="saveChangeButton">
        <button class="button" type="submit"><h3>Save Changes</h3></button>
      </div>
    </div>
    `);  
    let saveChangeButton = document.getElementsByClassName("saveChangeButton")[0];
    let teksInput = document.getElementById(`teksInput${materialData["ID_Material"]}`);


    saveChangeButton.addEventListener("click", function(){editMaterial(materialData["ID_Material"], materialData["kode_mapel"], materialData["no_modul"],
    materialData["judul"], document.getElementById(`video${materialData["ID_Material"]}`).firstElementChild.src.match(/\/([^\/?#]+)$/)[1] , teksInput.value.trim()
    )}
    );
    
}


function uploadVideo(ID_Material) {
  // Get the file input element
  const input = document.getElementsByClassName(`videoInput${ID_Material}`)[0];
  
  // Check if a file has been selected
  if (input.files.length === 0) {
    alert("Please select a video file.");
    return;
  }
  
  // Get the selected file
  const videoFile = input.files[0]["name"];
  
  // You can now work with the selected videoFile
  // For example, you can send it to a server for processing or display it in an HTML video element.
  
  // Display the selected video (example)
  displayVideo(videoFile, ID_Material);
}

function deleteVideo(ID_Material) {
  // Get the file input element
  const input = document.getElementsByClassName(`videoInput${ID_Material}`)[0];
  
  // Empty the file
  const videoFile = "";
  
  // You can now work with the selected videoFile
  // For example, you can send it to a server for processing or display it in an HTML video element.
  
  // Display the selected video (example)
  displayVideo(videoFile, ID_Material);
}

function displayVideo(file, ID_Material) {
  let videoPath = '../../Data/materivideo/';
  const videoContainer = document.getElementById(`video${ID_Material}`);
  videoContainer.innerHTML='';
  const video = document.createElement("video");
  video.controls = true;
  video.src = videoPath+file;
  console.log(video);
  videoContainer.appendChild(video);
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
      loadEditMaterialForm(materialData);
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



function getMaterials(){
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
        loadMaterials(materialData);
      }
    };
    xhttp.open(
      "GET",
      "http://localhost:8000/api/materialapi/getmaterialbymodulenumberandkodemapel?kode_mapel=" + course_id +" &modulenumber=" + module_number,
      true
    );
    xhttp.setRequestHeader("Accept", "application/json");
    xhttp.withCredentials = true;
    xhttp.send();
  }
  
  function addMaterial(kode_mapel, no_modul, judul, video, teks){
    console.log(video);
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        console.log(this.responseText);
        let serverResponse = JSON.parse(this.responseText);
        if(serverResponse['status']){
          if(window.confirm("Material sucessfully Added")){
              window.location.reload();
          }else{
              window.location.reload();
          }
        }
        else{
            alert("failed to add material");
        }
      }
    };
  
    let data = {
      kode_mapel: kode_mapel,
      no_modul: no_modul,
      judul: judul,
      video: video,
      teks: teks
    };
  
    xhttp.open("POST", "http://localhost:8000/api/materialapi/addmaterial", true);
    xhttp.setRequestHeader("Accept", "application/json");
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.withCredentials = true;
    xhttp.send(JSON.stringify(data));
  }
  
  
  
  function deleteMaterial(ID_Material){
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        console.log(this.responseText);
        let serverResponse = JSON.parse(this.responseText);
        if(serverResponse['status']){
          if(window.confirm("Material sucessfully deleted")){
              window.location.reload();
          }else{
              window.location.reload();
          }
        }
        else{
          alert("failed to delete material");
        }
      }
    };
  
    let data = {
      ID_Material:ID_Material
    };
    xhttp.open("POST", "http://localhost:8000/api/materialapi/deletematerial", true);
    xhttp.setRequestHeader("Accept", "application/json");
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.withCredentials = true;
    xhttp.send(JSON.stringify(data));
    
  }
  

function editMaterial(ID_Material, kode_mapel, no_modul, judul, video, teks){
  console.log(video);
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      console.log(this.responseText);
      let serverResponse = JSON.parse(this.responseText);
      if(serverResponse['status']){
        if(window.confirm("Material sucessfully Edited")){
            window.location.reload();
        }else{
            window.location.reload();
        }
      }
      else{
          alert("failed to edit material");
      }
    }
  };

  let data = {
    ID_Material: ID_Material,
    kode_mapel: kode_mapel,
    no_modul: no_modul,
    judul: judul,
    video: video,
    teks: teks
  };

  xhttp.open("POST", "http://localhost:8000/api/materialapi/editmaterial", true);
  xhttp.setRequestHeader("Accept", "application/json");
  xhttp.setRequestHeader("Content-Type", "application/json");
  xhttp.withCredentials = true;
  xhttp.send(JSON.stringify(data));
}

  
  
  /* caller */
  window.addEventListener("load", getMaterials);
  addMaterialButton.addEventListener("click", loadAddMaterialForm); 