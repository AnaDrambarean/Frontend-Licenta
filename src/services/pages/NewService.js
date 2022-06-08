import React, { useContext } from "react";
import { useHistory } from "react-router-dom";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ImageUpload from "../../shared/components/FormElements/ImageUpload";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
  VALIDATOR_FILE,
} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import "./ServiceForm.css";

const NewService = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
      address: {
        value: "",
        isValid: false,
      },
      contact:{
        value:"",
        isValid: false,
      },
      image: {
        value: null,
        isValid: false,
      },
    },
    false
  );

  const history = useHistory();

  const serviceSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", formState.inputs.title.value);
      formData.append("description", formState.inputs.description.value);
      formData.append("address", formState.inputs.address.value);
      formData.append("contact", formState.inputs.contact.value);
      formData.append("image", formState.inputs.image.value);
      await sendRequest(
        "http://localhost:5000/api/services",
        "POST",
        formData,
        {
          Authorization: "Bearer " + auth.token,
        }
        
      );
      history.push("/");
    } catch (err) {}
  };
  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <form className="service-form" onSubmit={serviceSubmitHandler}>
        {isLoading && <LoadingSpinner asOverlay />}
        <Input
          id="title"
          element="input"
          type="text"
          label="Title"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Vă rugăm să introduceți un titlu valid"
          onInput={inputHandler}
        />
        <Input
          id="description"
          element="textarea"
          label="Description"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Vă rugăm să introduceți o descriere validă (cel puțin 5 caractere)."
          onInput={inputHandler}
        />
        <Input
          id="address"
          element="input"
          label="Address"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Vă rugăm să introduceți o adresă validă"
          onInput={inputHandler}
        />
        <Input
          id="contact"
          element="input"
          label="Nr.Telefon"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Vă rugăm să un număr de telefon valid"
          onInput={inputHandler}
        />
        <ImageUpload
          id="image"
          center="true"
          validators={[VALIDATOR_FILE()]}
          // errorText="Vă rugăm să adăugați o imagine."
          onInput={inputHandler}
        />
        <Button type="submit" disabled={!formState.isValid}>
          ADD SERVICE
        </Button>
      </form>
    </React.Fragment>
  );
};

export default NewService;
