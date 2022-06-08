import React from "react";
import Avatar from "../../shared/components/UIElements/Avatar";
import "./FurnizorItem.css";
import Card from "../../shared/components/UIElements/Card";
import { Link } from "react-router-dom";

const FurnizorItem = props => {
  return (
    <li className="furnizor-item">
      <Card className="furnizor-item__content">
        <Link to={`/${props.id}/services`}>
          <div className="furnizor-item__image">
            <Avatar image={`http://localhost:5000/${props.image}`} alt={props.name} />
          </div>
          <div className="furnizor-item__info">
            <h2>{props.name}</h2>
            <h3>
              {props.serviceCount} {props.serviceCount === 1 ? 'Serviciu' : 'Servicii'}
            </h3>
          </div>
        </Link>
      </Card>
    </li>
  );
};

export default FurnizorItem;

