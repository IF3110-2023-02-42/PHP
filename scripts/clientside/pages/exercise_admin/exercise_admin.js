/* Variable and initialization */
let id_material = window.location.search.substring(1).split('=')[1];
let parentDiv = document.getElementsByClassName("questionPlaceholder")[0];
let addQuestionForm = document.getElementsByClassName("addQuestionForm")[0];
let addQuestionButton = document.getElementById("addQuestionButton");

function loadPage() {
  auth(["admin"], `/pages/home/home.html`);
  generateNavbar();
  generateFooter();
}

function getSoal() {
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let questionsData;
      console.log(this.responseText);
      let serverResponse = JSON.parse(this.responseText);
      if (serverResponse["status"]) {
        questionsData = serverResponse["data"];
      } else {
        questionsData = null;
      }
      loadSoal(questionsData);
    }
  };
  xhttp.open(
    "GET",
    "http://localhost:8000/api/soalapi/getsoalbyidmaterial?id_material=" +
      id_material,
    true
  );
  xhttp.setRequestHeader("Accept", "application/json");
  xhttp.withCredentials = true;
  xhttp.send();
}

function getJawabanSalah(id_soal){
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var wrongAnswerData;
      console.log(this.responseText);
      let serverResponse = JSON.parse(this.responseText);
      if (serverResponse["status"]) {
        wrongAnswerData = serverResponse["data"];
      } else {
        wrongAnswerData = null;
      }
    }
  };
  xhttp.open(
    "GET",
    "http://localhost:8000/api/jawabansalahapi/getjawabansalahbyidsoal?id_soal=" +
      id_soal,
    true
  );
  xhttp.setRequestHeader("Accept", "application/json");
  xhttp.withCredentials = true;
  xhttp.send();
  return wrongAnswerData;
}

function loadSoal(questionsData) {
  questionsData.map((el) =>
    wrongAns = getJawabanSalah(el.id_soal),
    parentDiv.insertAdjacentHTML(
      "beforeend",
      `
      <div class="exercise">
        <p>
          ${el.question}
        </p>

      <input type="radio" id=${el.correct_answer[0]} name=${el.question} value=${el.correct_answer[0]} />
          <label for=${el.correct_answer[0]}>${el.correct_answer[0]}</label><br />
      <input type="radio" id=${wrongAns[0]} name=${el.question} value=${wrongAns[0]} />
          <label for=${wrongAns[0]}>${wrongAns[0]}</label><br />
        <input type="radio" id=${wrongAns[1]} name=${el.question} value=${wrongAns[1]} />
          <label for=${wrongAns[1]}>${el.wrong_answer[1]}</label><br />
        <input type="radio" id=${wrongAns[2]} name=${el.question} value=${wrongAns[2]} />
          <label for=${wrongAns[2]}>${wrongAns[2]}</label><br />

      </div>
      `
)
    );
}

function loadAddSoal(){
  console.log("clicked.")
  if (addQuestionForm.style.display=="none"){
    addQuestionForm.style.display = "flex";
    let saveAddQuestionButton = document.getElementsByClassName("saveButton")[0];
    
    // Add variable for input
    let idSoalInput = document.getElementById("id_soal");
    let nomorInput = document.getElementById("nomor");
    let soalInput = document.getElementById("soal");
    let jawabanBenarInput = document.getElementById("jawaban_benar");
    let jawabanSalah1Input = document.getElementById("jawaban_salah1");
    let jawabanSalah2Input = document.getElementById("jawaban_salah2");
    let jawabanSalah3Input = document.getElementById("jawaban_salah3");
    
    saveAddQuestionButton.addEventListener("click", function(){addSoal(idSoalInput.value, id_material, nomorInput.value, soalInput.value, jawabanBenarInput.value, jawabanSalah1Input.value, jawabanSalah2Input.value, jawabanSalah3Input.value)});
  } else {
    addQuestionForm.style.display="none"
  }    
}

function addSoal(id_soal, id_material, nomor, pertanyaan, jawaban_benar, jawaban_salah1, jawaban_salah2, jawaban_salah3) {
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      console.log(this.responseText);
      let serverResponse = JSON.parse(this.responseText);
      if (serverResponse["status"]) {
        if (window.confirm("Question sucessfully Added")) {
          window.location.reload();
        } else {
          window.location.reload();
        }
      } else {
        alert("Failed to add question");
      }
    }
  };

  let dataSoal = {
    ID_Soal: id_soal,
    ID_Material: id_material,
    nomor: nomor,
    pertanyaan: pertanyaan,
    jawaban: jawaban_benar,
  };

  xhttp.open("POST", "http://localhost:8000/api/soalapi/addsoal", true);
  xhttp.setRequestHeader("Accept", "application/json");
  xhttp.setRequestHeader("Content-Type", "application/json");
  xhttp.withCredentials = true;
  xhttp.send(JSON.stringify(dataSoal));

  let dataJawabanSalah = {
    ID_Soal: id_soal,
    jawaban_salah1: jawaban_salah1,
    jawaban_salah2: jawaban_salah2,
    jawaban_salah3: jawaban_salah3,
  };

  xhttp.open("POST", "http://localhost:8000/api/jawabansalahapi/addjawabansalah", true);
  xhttp.setRequestHeader("Accept", "application/json");
  xhttp.setRequestHeader("Content-Type", "application/json");
  xhttp.withCredentials = true;
  xhttp.send(JSON.stringify(dataJawabanSalah));
}

window.addEventListener("load", getSoal);
addQuestionButton.addEventListener("click", loadAddSoal);