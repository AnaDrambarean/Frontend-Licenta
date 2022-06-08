import React, { useEffect, useState, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import "./ServiceForm.css";

const UpdateService = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedService, setLoadedService] = useState();
  const serviceId = useParams().serviceId;
  const history = useHistory();

  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  useEffect(() => {
    const fetchService = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/services/${serviceId}`
        );
        setLoadedService(responseData.service);
        setFormData(
          {
            title: {
              value: responseData.service.title,
              isValid: true,
            },
            description: {
              value: responseData.service.description,
              isValid: true,
            },
          },
          true
        );
      } catch (err) {}
    };
    fetchService();
  }, [sendRequest, serviceId, setFormData]);

  const serviceUpdateSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      await sendRequest(
        `http://localhost:5000/api/services/${serviceId}`,
        "PATCH",
        JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
        }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token,
        }
      );
      history.push("/" + auth.furnizorId + "/services");
    } catch (err) {}
  };

  if (isLoading) {
    return (
      <div className="center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!loadedService && !error) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find service!</h2>
        </Card>
      </div>
    );
  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {!isLoading && loadedService && (
        <form className="service-form" onSubmit={serviceUpdateSubmitHandler}>
          <Input
            id="title"
            element="input"
            type="text"
            label="Titlu"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Vă rugăm introduceți un titlu valid!"
            onInput={inputHandler}
            initialValue={loadedService.title}
            initialValid={true}
          />
          <Input
            id="description"
            element="textarea"
            label="Descriere"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Vă rugăm să introduceți o descriere validaă (min. 5 caractere)."
            onInput={inputHandler}
            initialValue={loadedService.description}
            initialValid={true}
          />
          <Button type="submit" disabled={!formState.isValid}>
            ACTUALIZARE SERVICE
          </Button>
        </form>
      )}
    </React.Fragment>
  );
};
export default UpdateService;
