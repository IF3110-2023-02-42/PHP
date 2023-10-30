/* Variabel and Initialization */ 
const course_element = document.getElementsByClassName("courseContents")[0];
const course_pagination_element = document.getElementById("coursePagination");
const exercise_element = document.getElementsByClassName("exerciseContents")[0];
const exercise_pagination_element =
  document.getElementById("exercisePagination");

let current_course_page = 1;
let current_exercise_page = 1;
let rows = 3;

function loadPage() {
  generateNavbar();
  generateFooter();
}

/* Course */
// Setting up the pagination such as number of page
function SetupCoursePagination(
  current_page,
  wrapper,
  page_count
) {
  wrapper.innerHTML = "";

  for (let i = 1; i < page_count + 1; i++) {
    let btn = CoursePaginationButton(current_page, i);
    wrapper.appendChild(btn);
  }
}

// Generate page button
function CoursePaginationButton(current_page, page) {
  let button = document.createElement("button");
  button.innerText = page;

  if (current_page == page) button.classList.add("activeCourse");
  
  button.addEventListener("click", function () {
    current_page = page;
    getCoursePage(current_page,rows);
    
    let current_btn = document.querySelector(
      ".pagenumbers button.activeCourse"
      );
    current_btn.classList.remove("activeCourse");

    button.classList.add("activeCourse");
  });

  return button;
}

/* Exercise */
// Setting up the pagination such as number of page
function SetupExercisePagination(
  current_page,
  wrapper,
  page_count
  ) {
  wrapper.innerHTML = "";
  for (let i = 1; i < page_count + 1; i++) {
    let btn = ExercisePaginationButton(current_page, i);
    wrapper.appendChild(btn);
  }
}

function ExercisePaginationButton(current_page, page) {
  let button = document.createElement("button");
  button.innerText = page;

  if (current_page == page) button.classList.add("activeExercise");
  
  button.addEventListener("click", function () {
    current_page = page;
    getExercisePage(current_page,rows);

    let current_btn = document.querySelector(
      ".pagenumbers button.activeExercise"
    );
    current_btn.classList.remove("activeExercise");

    button.classList.add("activeExercise");
  });
  
  return button;
}

/* Display Page */
function DisplayItem(paginatedItems,wrapper,  page) {
  wrapper.innerHTML = "";
  page--;

  for (let i = 0; i < paginatedItems.length; i++) {
    let item = paginatedItems[i];
    item["image"] = "course_logo.jpg";

    let item_element = document.createElement("div");
    item_element.addEventListener("click", function(){openCourse(item["kode_mapel"], item["nama"] + " kelas " + item["kelas"])});
    item_element.classList.add("courseContent");
    item_element.innerHTML =
      ' <img src="../../assets/' +
      item["image"] +
      '"' +
      'alt="course logo">' +
      '<div class="courseText">' +
      "<h3>" +
      item["nama"] + " kelas " + item["kelas"]+
      "</h3>" +
      "<p>" +
      item["deskripsi"] +
      "</p>" +
      "</div>";

    wrapper.appendChild(item_element);
  }
}

function loadCoursePage(coursePageData){
  DisplayItem(coursePageData, course_element, current_course_page);
}

function loadExercisePage(exercisePageData){
  DisplayItem(exercisePageData,exercise_element, current_exercise_page);
}

function loadCoursePagination(numberOfCourse){
  let page_count = Math.ceil(numberOfCourse/rows);
  SetupCoursePagination(current_course_page, course_pagination_element, page_count)
}

function loadExercisePagination(numberOfExercise){
  let page_count = Math.ceil(numberOfExercise/rows);
  SetupExercisePagination(current_exercise_page, exercise_pagination_element, page_count)
}


/* Server Connection */

// load specific page for course data from server 
function getCoursePage(pageNumber, rows_per_page)
{
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let coursePageData;
      console.log(this.responseText);
      let coursePageResponse = JSON.parse(this.responseText);
      if (coursePageResponse["status"]) {
        coursePageData = coursePageResponse["data"];
      } else {
        coursePageData = null;
      }
      loadCoursePage(coursePageData);
    }
  };
  xhttp.open(
    "GET",
    "http://localhost:8000/api/courseapi/getpage?page=" + pageNumber + "&rows_per_page=" + rows_per_page,
    true
  );
  xhttp.setRequestHeader("Accept", "application/json");
  xhttp.withCredentials = true;
  xhttp.send();
}

// load specific page for exercise data from server 
function getExercisePage(pageNumber, rows_per_page)
{
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let exercisePageData;
      console.log(this.responseText);
      let exercisePageResponse = JSON.parse(this.responseText);
      if (exercisePageResponse["status"]) {
        exercisePageData = exercisePageResponse["data"];
      } else {
        exercisePageData = null;
      }
      loadExercisePage(exercisePageData);
    }
  };
  xhttp.open(
    "GET",
    "http://localhost:8000/api/exerciseapi/getpage?page=" + pageNumber + "&rows_per_page=" + rows_per_page,
    true
  );
  xhttp.setRequestHeader("Accept", "application/json");
  xhttp.withCredentials = true;
  xhttp.send();
}

function getCoursePagination(){
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let numberOfCourse;
      console.log(this.responseText);
      let serverResponse = JSON.parse(this.responseText);
      if (serverResponse["status"]) {
        numberOfCourse = serverResponse["data"];
      } else {
        numberOfCourse = 0;
      }
      loadCoursePagination(numberOfCourse["numberOfCourse"]);
    }
  };
  xhttp.open(
    "GET",
    "http://localhost:8000/api/courseapi/getnumberofcourse",
    true
  );
  xhttp.setRequestHeader("Accept", "application/json");
  xhttp.withCredentials = true;
  xhttp.send();
}

function getExercisePagination(){
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let numberOfExercise;
      console.log(this.responseText);
      let serverResponse = JSON.parse(this.responseText);
      if (serverResponse["status"]) {
        numberOfExercise = serverResponse["data"];
      } else {
        numberOfExercise = 0;
      }
      loadExercisePagination(numberOfExercise["numberOfExercise"]);
    }
  };
  xhttp.open(
    "GET",
    "http://localhost:8000/api/exerciseapi/getnumberofexercise",
    true
  );
  xhttp.setRequestHeader("Accept", "application/json");
  xhttp.withCredentials = true;
  xhttp.send();  
}

/* Redirect */
function openCourse(kode_mapel, nama_mapel){
  window.location.href= '../module/module.html?kode_mapel='+kode_mapel+" &nama_mapel=" + nama_mapel;
}
  
  /* Main Function */
function loadHomePage(){
    getCoursePage(current_course_page,3);
    getCoursePagination();
    getExercisePage(current_exercise_page,3);
    getExercisePagination();
}
window.addEventListener("load", loadHomePage)