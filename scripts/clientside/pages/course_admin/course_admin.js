let course_id = window.location.search.substring(1).split("=")[1];
let parentDiv = document.getElementsByClassName("course")[0];
let addCourseForm = document.getElementsByClassName("addCourseForm")[0];
let addCourseButton = document.getElementById("addCourseButton");

function loadCourse(courseData) {
  courseData.map((el) =>
    parentDiv.insertAdjacentHTML(
      "beforeend",
      `
      <div class="content">
          <img 
          src="../../../../assets/course_logo.jpg" 
          alt="course profile icon"
          id="course-profile"
          />
          <div class="contentText">
              <h2>${el.nama} kelas ${el.kelas}</h2>
              <p>${el.deskripsi}</p>
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

// function loadCourse(courseData) {
//   console.log("parentDiv:", parentDiv);
//   courseData.map((el) =>
//     parentDiv.insertAdjacentHTML(
//       "beforeend",
//       `
//       <div class="content" onclick="openCourse('${el.kode_mapel}', '${el.nama} kelas ${el.kelas}' )">
//           <img 
//           src="../../../../assets/course_logo.jpg" 
//           alt="course profile icon"
//           id="course-profile"
//           />
//           <div class="contentText">
//               <h2>${el.nama} kelas ${el.kelas}</h2>
//               <p>${el.deskripsi}</p>
//           </div>
//       </div>
//       `
//     )
//   );
// }

function loadAddCourseForm() {
  addCourseForm.style.display = "flex";

  // When form appear, add event listener to submit the new course
  let saveAddCourseButton = document.getElementsByClassName("saveButton")[0];

  // Add variable for input
  let courseCodeInput = document.getElementById("courseCode");
  let courseClassInput = document.getElementById("courseClass");
  let courseTitleInput = document.getElementById("courseTitle");
  let courseDescriptionInput = document.getElementById("courseDescription");

  saveAddCourseButton.addEventListener("click", function () {
    addCourse(
      courseCodeInput.value,
      courseClassInput.value,
      courseTitleInput.value,
      courseDescriptionInput.value
    );
  });
}

/* Connections to Server */
function getCourses() {
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let courseData;
      console.log(this.responseText);
      let serverResponse = JSON.parse(this.responseText);
      if (serverResponse["status"]) {
        courseData = serverResponse["data"];
      } else {
        courseData = null;
      }
      loadCourse(courseData);
    }
  };
  xhttp.open(
    "GET",
    "http://localhost:8000/api/courseapi/getallcourse",
    true
  );
  xhttp.setRequestHeader("Accept", "application/json");
  xhttp.withCredentials = true;
  xhttp.send();
}

function addCourse(kode_mapel, kelas, nama, deskripsi) {
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      console.log(this.responseText);
      let serverResponse = JSON.parse(this.responseText);
      if (serverResponse["status"]) {
        if (window.confirm("Course sucessfully Added")) {
          window.location.reload();
        } else {
          window.location.reload();
        }
      } else {
        alert("Failed to add course");
      }
    }
  };

  let data = {
    kode_mapel: kode_mapel,
    kelas: kelas,
    nama: nama,
    deskripsi: deskripsi,
  };

  xhttp.open("POST", "http://localhost:8000/api/courseapi/addcourse", true);
  xhttp.setRequestHeader("Accept", "application/json");
  xhttp.setRequestHeader("Content-Type", "application/json");
  xhttp.withCredentials = true;
  xhttp.send(JSON.stringify(data));
}

function deleteCourse(kode_mapel) {
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      console.log(this.responseText);
      let serverResponse = JSON.parse(this.responseText);
      if (serverResponse["status"]) {
        if (window.confirm("Course sucessfully deleted")) {
          window.location.reload();
        } else {
          window.location.reload();
        }
      } else {
        alert("Failed to delete course");
      }
    }
  };

  let data = {
    kode_mapel: kode_mapel,
  };
  xhttp.open("POST", "http://localhost:8000/api/moduleapi/deletecourse", true);
  xhttp.setRequestHeader("Accept", "application/json");
  xhttp.setRequestHeader("Content-Type", "application/json");
  xhttp.withCredentials = true;
  xhttp.send(JSON.stringify(data));
}

/* Redirect */
function editCourse(no_course) {
  window.location.href =
    "../material_admin/material_admin.html?kode_mapel=" + no_course;
}

/* Redirect */
function openCourse(kode_mapel, nama_mapel){
  window.location.href= '../module/module.html?kode_mapel='+kode_mapel+" &nama_mapel=" + nama_mapel;
}

/* caller */
window.addEventListener("load", getCourses);
addCourseButton.addEventListener("click", loadAddCourseForm);

function loadPage() {
  auth(["admin"], `/pages/home/home.html`);
  generateNavbar();
  generateFooter();
}
