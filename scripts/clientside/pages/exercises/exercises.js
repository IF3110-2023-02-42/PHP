let parentDiv = document.getElementsByClassName("exercisesPlaceholder")[0];

function getExercises() {
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let exerciseData;
      console.log(this.responseText);
      let serverResponse = JSON.parse(this.responseText);
      if (serverResponse["status"]) {
        exerciseData = serverResponse["data"];
      } else {
        exerciseData = null;
      }
      loadExercises(exerciseData);
    }
  };
  xhttp.open(
    "GET",
    "http://localhost:8000/api/exerciseapi/getallexercise",
    true
  );
  xhttp.setRequestHeader("Accept", "application/json");
  xhttp.withCredentials = true;
  xhttp.send();
}

function loadExercises(exerciseData) {
  exerciseData.map((el) =>
    parentDiv.insertAdjacentHTML(
      "beforeend",
      `
      <a href="../exercise/exercise.html?id_material=+${el.ID_Material}" class="exercise-link">
        <div class="exercise">
            <img 
            src="../../../../assets/module-profile.png" 
            alt="module profile icon"
            id="module-profile"
            />
            <div class="content">
                <h2>${el.judul}</h2>
                <p>${el.deskripsi}</p>
            </div>
        </div>
    </a>
      `
    )
  );
}

function loadPage() {
  auth(["admin", "user"], `/pages/home/home.html`);
  generateNavbar();
  generateFooter();
}

/* caller */
window.addEventListener("load", getExercises);