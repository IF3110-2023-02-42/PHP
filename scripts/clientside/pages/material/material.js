/* Variable and initialization */
// Format get params.   ?kode_mapel=x&no_modul=y or
//                      ?keyword=word&searchby=coursename,modulename,materialname&filterclass=bool,bool,bool&orderbyclass=asc/desc&orderbyname=asc/desc

let params = window.location.search.substring(1).split("&");
let fromSearchBar = params.length == 5;

let keyword;
let course_id;
let no_modul;
let searchby;
let filterclass;
let orderbyclass;
let orderbyname;
let parentDiv = document.getElementsByClassName("material")[0];

if (fromSearchBar) {
  keyword = params[0].replace("keyword=", "");
  let searchbyArr = params[1].split(",");
  searchby = {
    courseName: searchbyArr[0].replace("searchby=", "") === "true",
    moduleName: searchbyArr[1] === "true",
    materialName: searchbyArr[2] === "true",
  };
  let filterclassArr = params[2].split(",");
  filterclass = {
    10: filterclassArr[0].replace("filterclass=", "") === "true",
    11: filterclassArr[1] === "true",
    12: filterclassArr[2] === "true",
  };
  orderbyclass = params[3].replace("orderbyclass=", "");
  orderbyname = params[4].replace("orderbyname=", "");
  getMaxPagination()
    .then((maxPage) => {
      console.log("maxPage", maxPage);
      if (maxPage.data !== "no_history") {
        generatePagination(maxPage.data, 1, generateMaterialList);
        generateMaterialList(1);
      }
    })
    .catch((err) => {
      console.log("err", err);
    });
} else {
  course_id = params[0].split("=")[1];
  no_modul = params[1].split("=")[1];
}

function loadPage() {
  auth(["user", "admin"], `/pages/home/home.html`);
  generateNavbar();
  generateFooter();
}

/* Functions */
/* Display */
function loadMaterial(materialData) {
  materialData.map((el) =>
    parentDiv.insertAdjacentHTML(
      "beforeend",
      `
      <div class="content" onclick="openMaterial(${el.ID_Material})">
          <div class="contentTitle">
              <h2>${el.judul}</h2>
          </div>
      </div>
      `
    )
  );
}

/* Connections to Server */
function getMaterials() {
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
      if (!fromSearchBar) {
        loadMaterial(materialData);
      }
    }
  };

  if (fromSearchBar) {
    xhttp.open(
      "POST",
      "http://localhost:8000/api/materialapi/getmaterialbysearchbar",
      true
    );
  } else {
    xhttp.open(
      "GET",
      "http://localhost:8000/api/materialapi/getmaterialbymodulenumberandkodemapel?kode_mapel=" +
        course_id +
        " &modulenumber=" +
        no_modul,
      true
    );
  }
  xhttp.setRequestHeader("Accept", "application/json");
  xhttp.withCredentials = true;
  if (fromSearchBar) {
    const data = {
      keyword: keyword,
      courseName: searchby.courseName ? 1 : 0,
      materialName: searchby.materialName ? 1 : 0,
      moduleName: searchby.moduleName ? 1 : 0,
      c10: filterclass[10] ? 1 : 0,
      c11: filterclass[11] ? 1 : 0,
      c12: filterclass[12] ? 1 : 0,
      orderbyclass: orderbyclass,
      orderbyname: orderbyname,
    };
    xhttp.send(JSON.stringify(data));
  } else {
    xhttp.send();
  }
}

/* Redirect */
function openMaterial(ID_Material) {
  window.location.href =
    "../material_view/material_view.html?ID_Material=" + ID_Material;
}

function getMaxPagination() {
  return new Promise((resolve, reject) => {
    const xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
      if (this.readyState == 4) {
        if (this.status == 200) {
          const maxPage = JSON.parse(this.responseText);
          resolve(maxPage);
        } else {
          reject(this.status);
        }
      }
    };

    const data = {
      keyword: keyword,
      courseName: searchby.courseName ? 1 : 0,
      materialName: searchby.materialName ? 1 : 0,
      moduleName: searchby.moduleName ? 1 : 0,
      c10: filterclass[10] ? 1 : 0,
      c11: filterclass[11] ? 1 : 0,
      c12: filterclass[12] ? 1 : 0,
      orderbyclass: orderbyclass,
      orderbyname: orderbyname,
      size: 5,
    };

    xhttp.open(
      "POST",
      "http://localhost:8000/api/materialapi/getmaxpage",
      true
    );
    xhttp.setRequestHeader("Accept", "application/json");
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.withCredentials = true;
    xhttp.send(JSON.stringify(data));
  });
}

function getMaterialPerPage(page) {
  return new Promise((resolve, reject) => {
    const xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
      if (this.readyState == 4) {
        if (this.status == 200) {
          const materialList = JSON.parse(this.responseText);
          resolve(materialList);
        } else {
          reject(this.status);
        }
      }
    };

    const data = {
      keyword: keyword,
      courseName: searchby.courseName ? 1 : 0,
      materialName: searchby.materialName ? 1 : 0,
      moduleName: searchby.moduleName ? 1 : 0,
      c10: filterclass[10] ? 1 : 0,
      c11: filterclass[11] ? 1 : 0,
      c12: filterclass[12] ? 1 : 0,
      orderbyclass: orderbyclass,
      orderbyname: orderbyname,
      size: 5,
      page: page,
    };

    xhttp.open(
      "POST",
      "http://localhost:8000/api/materialapi/getmaterialperpage",
      true
    );
    xhttp.setRequestHeader("Accept", "application/json");
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.withCredentials = true;
    xhttp.send(JSON.stringify(data));
  });
}

function generateMaterialList(page) {
  getMaterialPerPage(page).then((material) => {
    const parentDiv = document.getElementById("material");
    const contentElements = parentDiv.getElementsByClassName("content");

    while (contentElements.length > 0) {
      contentElements[0].parentNode.removeChild(contentElements[0]);
    }

    material.data.map((el) =>
      parentDiv.insertAdjacentHTML(
        "beforeend",
        `
      <div class="content" onclick="openMaterial(${el.ID_Material})">
          <div class="contentTitle">
              <h2>${el.judul_material}</h2>
              <h4>${el.judul_modul}</h4>
              <h5>${el.nama} Kelas ${el.kelas}</h5>
              <p>${el.teks}</p>
          </div>
      </div>
      `
      )
    );
  });
}
/* caller */
window.addEventListener("load", getMaterials);
