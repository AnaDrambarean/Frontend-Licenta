import React from "react";
import Card from "../../shared/components/UIElements/Card";
import ServiceItem from "./ServiceItem";
import Button from "../../shared/components/FormElements/Button";

import "./ServiceList.css";

const ServiceList = props => {
  if (props.items.length === 0) {
    return (
      <div className="service-list center">
        <Card>
          <h2>No services found. Maybe create one?</h2>
          <Button to="/services/new">Share Service</Button>
        </Card>
      </div>
    );
  }

  return (
    <ul className="service-list">
      {props.items.map(service => (
        <ServiceItem
          key={service.id}
          id={service.id}
          image={service.image}
          title={service.title}
          description={service.description}
          address={service.address}
          contact={service.contact}
          creatorId={service.creator}
          coordinates={service.location}
          onDelete={props.onDeleteService}
        />
      ))}
    </ul>
  );
};

export default ServiceList;
