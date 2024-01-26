// Assuming you have data for your accordion items
const accordionData = [
  { header: "SECTION 1", content: "This is the content of section 1." },
  { header: "SECTION 2", content: "This is the content of section 2." },
  { header: "SECTION 3", content: "This is the content of section 3." }
];

const accordionContainer = document.getElementById("accordion");

accordionData.forEach((item, index) => {
  const accordionItem = document.createElement("div");
  accordionItem.className = "accordion-item";

  const accordionHeader = document.createElement("div");
  accordionHeader.className = "accordion-header";
  accordionHeader.innerText = item.header;

  const accordionContent = document.createElement("div");
  accordionContent.className = "accordion-content";
  accordionContent.innerHTML = `<p>${item.content}</p>`;

  accordionItem.appendChild(accordionHeader);
  accordionItem.appendChild(accordionContent);
  accordionContainer.appendChild(accordionItem);

  accordionHeader.addEventListener("click", () => {
    accordionContent.classList.toggle("active");

    if (accordionContent.classList.contains("active")) {
      console.log(accordionContent.scrollHeight);
      accordionContent.style.maxHeight = accordionContent.scrollHeight + "px";
    } else {
      accordionContent.style.maxHeight = "0";
    }

    // Close other accordion items
    for (let i = 0; i < accordionData.length; i++) {
      if (i !== index) {
        const otherAccordionContent = accordionContainer.children[
          i
        ].querySelector(".accordion-content");
        otherAccordionContent.classList.remove("active");
        otherAccordionContent.style.maxHeight = "0";
      }
    }
  });
});
