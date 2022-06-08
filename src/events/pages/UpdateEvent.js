import React, { useEffect, useState, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import {
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthOContext } from "../../shared/context/authO-context";
import "../../services/pages/ServiceForm.css";

const UpdateEvent = () => {
  const authO = useContext(AuthOContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedEvent, setLoadedEvent] = useState();
  const eventId = useParams().eventId;
  const history = useHistory();

  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      }
    },
    false
  );

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/events/${eventId}`
        );
        setLoadedEvent(responseData.event);
        setFormData(
          {
            title: {
              value: responseData.event.title,
              isValid: true,
            }
          },
          true
        );
      } catch (err) {}
    };
    fetchEvent();
  }, [sendRequest, eventId, setFormData]);

  const eventUpdateSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      await sendRequest(
        `http://localhost:5000/api/events/${eventId}`,
        "PATCH",
        JSON.stringify({
          title: formState.inputs.title.value,
        }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + authO.tokenO,
        }
      );
      history.push("/" + authO.organizatorId + "/events");
    } catch (err) {}
  };

  if (isLoading) {
    return (
      <div className="center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!loadedEvent && !error) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find event!</h2>
        </Card>
      </div>
    );
  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {!isLoading && loadedEvent && (
        <form className="service-form" onSubmit={eventUpdateSubmitHandler}>
          <Input
            id="title"
            element="input"
            type="text"
            label="Titlu"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Vă rugăm introduceți un titlu valid!"
            onInput={inputHandler}
            initialValue={loadedEvent.title}
            initialValid={true}
          />
          <Button type="submit" disabled={!formState.isValid}>
            ACTUALIZARE EVENIMENT
          </Button>
        </form>
      )}
    </React.Fragment>
  );
};
export default UpdateEvent;
