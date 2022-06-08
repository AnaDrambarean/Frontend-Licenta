import React from "react";
import Card from "../../shared/components/UIElements/Card";
import EventItem from "./EventItem";
import Button from "../../shared/components/FormElements/Button";

import "../../services/components/ServiceList.css";

const EventList = (props) => {
  if (props.items.length === 0) {
    return (
      <div className="service-list center">
        <Card>
          <h2>No events found. Maybe create one?</h2>
          <Button to="/events/new">Share Event</Button>
        </Card>
      </div>
    );
  }

  return (
    <ul className="service-list">
      {props.items.map((event) => (
        <EventItem
          key={event.id}
          id={event.id}
          //   image={event.image}
          title={event.title}
          eventType={event.eventType}
          date={event.date}
          creatorId={event.creator}
          onDelete={props.onDeleteEvent}
        />
      ))}
    </ul>
  );
};

export default EventList;
