let parentDiv = document.getElementsByClassName("bookmarkHolder")[0];
const bookmarkData = [
    {
        judul: "judul1"
    },
    {
        judul: "judul2"
    },
]

function loadPage() {
    auth(["admin", "user"], `/pages/home/home.html`);
    generateNavbar();
    generateFooter();
    getSession()
        .then((session) =>{
            let xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    console.log("response:",this.responseText);
                    let serverResponse = JSON.parse(this.responseText);
                    if (serverResponse["status"]) {
                        bookmarkData = serverResponse["data"];
                    } else {
                        bookmarkData = null;
                    }
                    loadBookmark(bookmarkData);
                }
            };
            let ID_Pengguna = session["data"]["ID_Pengguna"];
            let data = {
                ID_Pengguna: ID_Pengguna,
            };
            console.log(ID_Pengguna);
            xhttp.open("POST", "http://localhost:8000/api/soap/findbookmarkbyid", true);
            xhttp.setRequestHeader("Accept", "application/json");
            xhttp.setRequestHeader("Content-Type", "application/json");
            xhttp.withCredentials = true;
            xhttp.send(JSON.stringify(data));
        })
        .catch((err) => {
            console.log("err:", err);
        });
}

function loadBookmark(data){
    data.map((el) => 
        parentDiv.insertAdjacentHTML("beforeend",
        `
        <div class="bookmark">
        <h3>${el.judul}</h3>
        <button>
            <h4>Delete</h4>
        </button>
        </div>
        `
        )
    );
}