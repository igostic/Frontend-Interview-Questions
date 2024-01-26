const images = [
  {
      image_url: "https://img.freepik.com/free-photo/young-female-jacket-shorts-presenting-comparing-something-looking-confident-front-view_176474-37521.jpg?w=1800&t=st=1693037944~exp=1693038544~hmac=97e967909706f9b73b4b47d521acf54806f4b9b3efab6196bc8a69f07efff554",
      caption: "Image 1"
  },
  {
      image_url: "https://img.freepik.com/free-photo/girl-grey-shirt-showing-something-her-hand_144627-51099.jpg?t=st=1693037931~exp=1693038531~hmac=63713e5a5cf2d23f53ca82b9996ad224ac6e92d0275a53b6debbe6523d7df020",
      caption: "Image 2"
  },
  {
      image_url: "https://img.freepik.com/free-photo/young-lady-shirt-jacket-making-scales-gesture-looking-cheerful-front-view_176474-85195.jpg?t=st=1693037931~exp=1693038531~hmac=2f83b6689538e4056912c96f448163e9ef10998f48f671b7e50279f81611fbe6",
      caption: "Image 3"
  },
  {
      image_url: "https://img.freepik.com/free-photo/girl-wide-opening-hands-giving-explanation-high-quality-photo_144627-60466.jpg?w=1800&t=st=1693038021~exp=1693038621~hmac=d4520cd86b2aea3e5dda765ede05bb53d70e18a574756d0f41a6806fe325d26d",
      caption: "Image 4"
  }
];

  const slideShowContainer = document.getElementById("slideShowContainer");
  const circleContainer = document.getElementById("circleContainer");

  let active = 0;

  const onNext = () => {
      if (active < images.length - 1) {
          active++;
      } else {
          active = 0;
      }
      render();
  };

  const onPrev = () => {
      if (active > 0) {
          active--;
      } else {
          active = images.length - 1;
      }
      render();
  };

  const render = () => {
      slideShowContainer.innerHTML = "";
      circleContainer.innerHTML = "";

      images.forEach((image, index) => {
          const slide = document.createElement("div");
          slide.className = `slide ${index === active ? "active" : ""}`;
          slide.innerHTML = `
              <img src="${image.image_url}" alt="${image.caption}" />
              <span>${image.caption}</span>
          `;
          slideShowContainer.appendChild(slide);

          const circle = document.createElement("div");
          circle.className = `dot ${index === active ? "active" : ""}`;
          circle.addEventListener("click", () => setActive(index));
          circleContainer.appendChild(circle);
      });

      const prevButton = document.createElement("div");
      prevButton.className = "navigation prev";
      prevButton.innerText = "❮";
      prevButton.addEventListener("click", onPrev);
      slideShowContainer.appendChild(prevButton);

      const nextButton = document.createElement("div");
      nextButton.className = "navigation next";
      nextButton.innerText = "❯";
      nextButton.addEventListener("click", onNext);
      slideShowContainer.appendChild(nextButton);
  };

  const setActive = (index) => {
      active = index;
      render();
  };

  render();
  setInterval(onNext, 3000);
