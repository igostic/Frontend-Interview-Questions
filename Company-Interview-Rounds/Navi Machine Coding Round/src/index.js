import "./styles.css";
// repo name(name)/ description(description)/ language(language)-parent/stars(stargazers_count)/ lastupdated(updated_at)
let btn = document.querySelector(".submitbtn");
let ul = document.getElementById("wsx");
let language = new Set();
let resp, username;
btn.addEventListener("click", async () => {
  username = document.querySelector(".search_bar").value;
  resp = await getApi(username);
  resp.forEach((element) => {
    if (element.language && element.language !== "null")
      language.add(element.language);
    let li = document.createElement("li");
    li.className = "card";
    li.innerHTML = `<div>
            <div>
                <a href="https://github.com/${username}/${element.name}">
                    <span class="repo">${element.name}</span>
                </a>
            </div>
            <p>${element.description ? element.description : ""}</p>
            <div class="inner-container">
                <p>${element.language ? element.language : ""}</p>
                <p>
                    <svg aria-label="star" role="img" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true">
                        <path fill-rule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"></path>
                    </svg>
                    ${element.stargazers_count}
                </p>
                <p>${element.updated_at}</p>
            </div>
      </div>`;
    ul.appendChild(li);
  });
  appendLanguages(language);
});
function appendLanguages(language) {
  language = [...language];
  language.forEach((elem) => {
    let option = document.createElement("option");
    option.innerText = elem;
    option.value = elem;
    document.getElementById("dropdown").appendChild(option);
  });
}
function onSelectChange() {
  let lang = document.getElementById("dropdown").value;
  filterOnLanguage(resp, lang);
}
function filterOnLanguage(data, language) {
  data = data.filter((elem) => {
    return elem.language === language;
  });
  ul.innerHTML = "";
  data.forEach((element) => {
    let li = document.createElement("li");
    li.className = "card";
    li.innerHTML = `<div>
            <div>
                <a href="https://github.com/${username}/${element.name}">
                    <span class="repo">${element.name}</span>
                </a>
            </div>
            <p>${element.description ? element.description : ""}</p>
            <div class="inner-container">
                <p>${element.language ? element.language : ""}</p>
                <p>
                    <svg aria-label="star" role="img" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true">
                        <path fill-rule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"></path>
                    </svg>
                    ${element.stargazers_count}
                </p>
                <p>${element.updated_at}</p>
            </div>
      </div>`;
    ul.appendChild(li);
  });
}
function onSelectSort() {
  selectedValue = document.getElementById("dropdown2").value;
  console.log(selectedValue);
  onSort(resp, selectedValue);
}
function onSort(data, selectedValue) {
  console.log("before sort", { data });
  switch (selectedValue) {
    case "0":
      console.log("in first");
      data.sort(function (x, y) {
        return new Date(x.updated_at) - new Date(y.updated_at);
      });
      break;
    case "1":
      console.log("in second");
      data.sort(function (x, y) {
        return x.stargazers_count - y.stargazers_count;
      });
      break;
  }
  console.log(data);
  ul.innerHTML = "";
  data.forEach((element) => {
    let li = document.createElement("li");
    li.className = "card";
    li.innerHTML = `<div>
            <div>
                <a href="https://github.com/${username}/${element.name}">
                    <span class="repo">${element.name}</span>
                </a>
            </div>
            <p>${element.description ? element.description : ""}</p>
            <div class="inner-container">
                <p>${element.language ? element.language : ""}</p>
                <p>
                    <svg aria-label="star" role="img" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true">
                        <path fill-rule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"></path>
                    </svg>
                    ${element.stargazers_count}
                </p>
                <p>${element.updated_at}</p>
            </div>
      </div>`;
    ul.appendChild(li);
  });
}
async function getApi(username) {
  const api_url = `https://api.github.com/users/${username}/repos`;
  var data;
  try {
    let response = await fetch(api_url);
    data = await response.json();
    return data;
  } catch (error) {
    return "try again";
  }
}

//
