import { useState, useEffect } from "react";
import "./styles.css";
const URL = "https://reqres.in/api/users";
export default function App() {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    fetch(URL)
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data.data);
        const sortedData = data.data.sort((a, b) =>
          a.first_name.localeCompare(b.first_name),
        );
        setTableData(sortedData);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        {tableData.map((item, idx) => (
          <tr key={item.first_name + idx}>
            <td>{`${item.first_name} ${item.last_name}`}</td>
            <td>{item.email}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
