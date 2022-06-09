import React, { useContext } from "react";
import { useHistory } from "react-router-dom";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
// import DatePicker from "../../shared/components/FormElements/DatePicker";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { VALIDATOR_REQUIRE } from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthOContext } from "../../shared/context/authO-context";
import "./EventForm.css";

const NewEvent = () => {
  const authO = useContext(AuthOContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [formState, inputHandler] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      eventType: {
        value: "",
        isValid: false,
      },
      date: {
        value: "",
        isValid: true,
      },
    },
    false
  );

  const history = useHistory();

  const eventSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", formState.inputs.title.value);
      formData.append("eventType", formState.inputs.eventType.value);
      formData.append("date", formState.inputs.date.value);
      console.log(formState.inputs.date);
      await sendRequest("http://localhost:5000/api/events", "POST", formData, {
        Authorization: "Bearer " + authO.token,
      });
      console.log(formData.date);
      history.push("/");
    } catch (err) {}
  };
  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <form className="event-form" onSubmit={eventSubmitHandler}>
        {isLoading && <LoadingSpinner asOverlay />}
        <Input
          id="title"
          element="input"
          type="text"
          label="Titlu"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Vă rugăm să introduceți un titlu valid"
          onInput={inputHandler}
        />
        <Input
          id="eventType"
          element="input" //aici vreau un dropdownlist
          type="text"
          label="Tipul evenimentului"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Vă rugăm să selectați tipul evenimentului."
          onInput={inputHandler}
        />
        {/* <DatePicker 
          id="date"
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          dateFormat="dd/MM/yyyy"
          minDate={new Date()}
          isClearable
          showYearDropdown
          scrollableYearDropdown
          placeholderText="Selectați data în care va avea loc evenimentul"
          onInput={inputHandler}
        /> */}
        <Input
          id="date"
          element="input"
          type="date"
          label="Data Evenimentului" //un calendar de unde se poate selecta
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Vă rugăm să selectați o dată validă"
          onInput={inputHandler}
        />
        <Button type="submit" disabled={!formState.isValid}>
          ADD EVENT
        </Button>
      </form>
    </React.Fragment>
  );
};

export default NewEvent;
