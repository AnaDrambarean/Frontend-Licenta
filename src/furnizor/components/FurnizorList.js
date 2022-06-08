import React from "react";

import FurnizorItem from "./FurnizorItem";
import Card from "../../shared/components/UIElements/Card";
import "./FurnizorList.css";

const FurnizorList = (props) => {
  if (props.items.length === 0) {
    return (
      <div className="center">
        <Card>
          <h2>No furnizori found.</h2>
        </Card>
      </div>
    );
  }

  return (
    <ul className="furnizor-list">
      {props.items.map((furnizor) => (
        <FurnizorItem
          key={furnizor.id}
          id={furnizor.id}
          image={furnizor.image}
          name={furnizor.name}
          serviceCount={furnizor.services.length}
        />
      ))}
    </ul>
  );
};

export default FurnizorList;
