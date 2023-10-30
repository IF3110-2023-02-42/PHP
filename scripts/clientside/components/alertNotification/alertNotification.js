function alertNotification(status, message) {
  const body = document.body;

  const alertElement = document.createElement("div");
  alertElement.className = "alert-notification slide-in";

  const alertImg = document.createElement("img");
  if (status) {
    alertImg.src = "/assets/alert_success.png";
    alertImg.alt = "fail";
  } else {
    alertImg.src = "/assets/alert_fail.png";
    alertImg.alt = "success";
  }
  const alertText = document.createElement("p");
  alertText.innerHTML = message;

  alertElement.appendChild(alertImg);
  alertElement.appendChild(alertText);

  body.appendChild(alertElement);

  setTimeout(() => {
    alertElement.classList.add("slide-out");
    setTimeout(() => {
      alertElement.remove();
    }, 200);
  }, 3000);
}
