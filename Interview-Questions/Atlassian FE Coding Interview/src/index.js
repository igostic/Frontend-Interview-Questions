import "./styles.css";
import { fetchData } from "./data.js";

var dt = new Date();
document.getElementById("datetime").innerHTML = dt.toLocaleString();

var data = fetchData();

data = data.then((value) => {
  var data = value;
  var html = "<ul>";
  var i;
  for (i = 0; i < data.length; i++) {
    var current = data[i];

    if ("children" in current) {
      var j;
      html += "<li>▼" + current["name"] + "</li>";
      html += "<ul>";
      var lower_current = current["children"];
      for (j = 0; j < lower_current.length; j++) {
        var lower_current_child = lower_current[j];
        if ("children" in lower_current_child) {
          var lower = lower_current_child["children"];
          var k;

          html += "<li>▼" + lower_current_child["name"] + "</li>";
          html += "<ul>";
          for (k = 0; k < lower.length; k++) {
            html += "<li>•" + lower[k]["name"] + "</li>";
          }
          html += "</ul>";
        } else {
          html += "<li>•" + data[j]["name"] + "</li>";
        }
      }
      html += "</ul>";
    } else {
      html += "<li>•" + current["name"] + "</li>";
    }
  }

  html += "</ul>";
  console.log(html);
  document.getElementById("tree").innerHTML = html;
});

console.log(data);
