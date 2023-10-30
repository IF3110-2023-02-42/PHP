let id_material = window.location.search.substring(1).split('=+')[1];
let parentDiv = document.getElementsByClassName("exercisePlaceholder")[0];

function loadPage() {
  auth(["admin", "user"], `/pages/home/home.html`);
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
  let data = {
    ID_Material: id_material,
  };
  console.log("data: ", data);
  xhttp.open(
    "POST",
    "http://localhost:8000/api/soalapi/getsoalbyidmaterial?id_material=" +
      id_material,
    true
  );
  xhttp.setRequestHeader("Accept", "application/json");
  xhttp.setRequestHeader("Content-Type", "application/json");
  xhttp.withCredentials = true;
  xhttp.send(JSON.stringify(data));
}

function getJawabanSalah(id_soal){
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let wrongAnswerData;
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
  let data = {
    ID_Soal: id_soal,
  };
  xhttp.setRequestHeader("Accept", "application/json");
  xhttp.setRequestHeader("Content-Type", "application/json");
  xhttp.withCredentials = true;
  xhttp.send(JSON.stringify(data));
  return wrongAnswerData;
}

function loadSoal(questionsData) {
  console.log(questionsData);
  questionsData.map((el) =>
    // console.log(getJawabanSalah(el.ID_Soal)),
    parentDiv.insertAdjacentHTML(
      "beforeend",
      `
      <div class="exercise">
        <p>
          ${el.pertanyaan}
        </p>

      <input type="radio" id=${el.jawaban_benar} name=${el.pertanyaan} value=${el.jawaban_benar} />
          <label for=${el.jawaban_benar}>${el.jawaban_benar}</label><br />


      </div>
      `
    )
    );
}

/* <input type="radio" id=${wrongAns[0]} name=${el.pertanyaan} value=${wrongAns[0]} />
  <label for=${wrongAns[0]}>${wrongAns[0]}</label><br />
<input type="radio" id=${wrongAns[1]} name=${el.pertanyaan} value=${wrongAns[1]} />
  <label for=${wrongAns[1]}>${el.wrong_answer[1]}</label><br />
<input type="radio" id=${wrongAns[2]} name=${el.pertanyaan} value=${wrongAns[2]} />
  <label for=${wrongAns[2]}>${wrongAns[2]}</label><br /> */

window.addEventListener("load", getSoal);