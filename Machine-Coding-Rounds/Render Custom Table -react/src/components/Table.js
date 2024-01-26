// TableComponent.js
import React from "react";

import useFetch from "../customHooks/useFetch";

function Table({ endPoint, fields }) {
  const data = useFetch(endPoint);

  return (
    <div className="container">
      <table className="table-data">
        <thead>
          <tr>
            {fields.map((field, index) => (
              <th key={index}>{field}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              {fields.map((field, fIndex) => (
                <td key={fIndex}>{item[field]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
