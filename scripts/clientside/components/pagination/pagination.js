function generatePagination(maxPage, currentPage, callback) {
  const paginationCt = document.getElementById("paginationCt");

  const paginationList = document.createElement("div");
  paginationList.classList.add("paginationList");

  const prevButton = document.createElement("button");
  prevButton.classList.add("navigationPaginationButton");
  prevButton.id = "prevButton";
  prevButton.addEventListener("click", function () {
    prevPage(callback);
  });

  const prevButtonImg = document.createElement("img");
  prevButtonImg.src = "/assets/button-previous.png";
  prevButtonImg.alt = "prev button";

  prevButton.appendChild(prevButtonImg);

  const nextButton = document.createElement("button");
  nextButton.classList.add("navigationPaginationButton");
  nextButton.id = "nextButton";
  nextButton.addEventListener("click", function () {
    nextPage(callback, maxPage);
  });

  const nextButtonImg = document.createElement("img");
  nextButtonImg.src = "/assets/button-next.png";
  nextButtonImg.alt = "next button";

  nextButton.appendChild(nextButtonImg);

  for (let i = 1; i <= maxPage; i++) {
    const pageButton = document.createElement("button");
    pageButton.classList.add("paginationButton");
    pageButton.id = `page-${i}`;
    pageButton.textContent = i;
    if (i === currentPage) {
      pageButton.classList.add("currentPage");
    }

    pageButton.addEventListener("click", function () {
      changePage(callback, i, maxPage);
    });
    paginationList.appendChild(pageButton);
  }

  paginationCt.appendChild(prevButton);
  paginationCt.appendChild(paginationList);
  paginationCt.appendChild(nextButton);
}

function prevPage(callback) {
  const currentPage = document.getElementsByClassName("currentPage")[0];
  if (parseInt(currentPage.innerHTML) === 1) {
    alertNotification(false, "End of data");
  } else {
    currentPage.classList.remove("currentPage");
    const prevPage = parseInt(currentPage.innerHTML) - 1;
    const newCP = document.getElementById("page-" + prevPage);
    newCP.classList.add("currentPage");
    callback(prevPage);
  }
}

function nextPage(callback, max) {
  const currentPage = document.getElementsByClassName("currentPage")[0];
  if (parseInt(currentPage.innerHTML) === max) {
    alertNotification(false, "End of data");
  } else {
    currentPage.classList.remove("currentPage");
    const nextPage = parseInt(currentPage.innerHTML) + 1;
    const newCP = document.getElementById("page-" + nextPage);
    newCP.classList.add("currentPage");
    callback(nextPage);
  }
}

function changePage(callback, destinationPage, max) {
  const currentPage = document.getElementsByClassName("currentPage")[0];
  if (destinationPage > max || destinationPage < 1) {
    alertNotification(false, "End of data");
  } else {
    currentPage.classList.remove("currentPage");
    const newCP = document.getElementById("page-" + destinationPage);
    newCP.classList.add("currentPage");
    callback(destinationPage);
  }
}
