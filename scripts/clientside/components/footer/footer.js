function generateFooter() {
  const footer = document.createElement("footer");
  footer.id = "footer";

  // head
  const head = document.createElement("div");
  head.classList = "head";

  const h2 = document.createElement("h2");
  h2.textContent = "Contact Us";

  head.appendChild(h2);

  // contacts
  const contacts = document.createElement("div");
  contacts.classList = "contacts";

  const contactInfo = [
    {
      iconSrc: "/assets/fbicon.png",
      altText: "facebook icon",
      text: "studyDojo",
    },
    {
      iconSrc: "/assets/waicon.png",
      altText: "whatsapp icon",
      text: "+6289587123114",
    },
    {
      iconSrc: "/assets/igicon.png",
      altText: "instagram icon",
      text: "study.Dojo",
    },
    {
      iconSrc: "/assets/yticon.png",
      altText: "youtube icon",
      text: "Dojo Study",
    },
    {
      iconSrc: "/assets/locicon.png",
      altText: "location icon",
      text: "Jl. Ganesa no. 10 Bandung",
    },
  ];

  contactInfo.forEach((info) => {
    const contact = document.createElement("div");
    contact.classList = "contact";

    const img = document.createElement("img");
    img.src = info.iconSrc;
    img.alt = info.altText;

    const p = document.createElement("p");
    p.textContent = info.text;

    contact.appendChild(img);
    contact.appendChild(p);

    contacts.appendChild(contact);
  });

  // Append head and contacts to footer
  footer.appendChild(head);
  footer.appendChild(contacts);

  // Insert footer to the document body
  document.body.appendChild(footer);
}
