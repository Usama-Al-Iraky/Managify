import React from "react";
import { Table } from "react-bootstrap";

export const DataForm = ({ productsList, theadItems, classs }) => {
  const classss = {
    classOne: `tabel-div ${classs}`,
  };

  return (
    <div className={classss.classOne}>
      <Table>
        <thead>
          <tr>
            {theadItems?.map((i, index) => (
              <th key={index}>{i}</th>
            ))}
          </tr>
        </thead>
        <tbody>{productsList}</tbody>
      </Table>
    </div>
  );
};
