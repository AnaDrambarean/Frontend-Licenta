import React, { useState, useContext } from "react";

import Card from "../../shared/components/UIElements/Card";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ImageUpload from "../../shared/components/FormElements/ImageUpload";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import { AuthOContext } from "../../shared/context/authO-context";
import "./Auth.css";

const Auth = () => {
  const auth = useContext(AuthContext);
  const authO = useContext(AuthOContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [isLoginMode2, setIsLoginMode2] = useState(false);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );
  
 
  const titluForm = (login, organizator) => {
    if (login) {
      return <Button>LOGIN</Button>;
    } else if (organizator) {
      return <Button>Organizator</Button>;
    } else {
      return <Button> Furnizor</Button>;
    }
  };
  const testb = (login, organizator) => {
    if (login) {
      return (
        <Button type="submit" disabled={!formState.isValid}>
          LOGIN
        </Button>
      );
    } else if (organizator) {
      return (
        <Button type="submit" disabled={!formState.isValid}>
          Signup Organizator
        </Button>
      );
    } else {
      return (
        <Button type="submit" disabled={!formState.isValid}>
          Signup Furnizor
        </Button>
      );
    }
  };

  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
          image: undefined,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: "",
            isValid: false,
          },
          image: {
            value: null,
            isValid: false,
          },
        },
        false
      );
    }
    setIsLoginMode((prevMode) => !prevMode);
  };
  
  const switchModeHandler2 = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: "",
            isValid: false,
          },
        },
        false
      );
    }
    setIsLoginMode((prevMode) => !prevMode);
    setIsLoginMode2((prevMode) => !prevMode);
  };
  const authSubmitHandler = async (event) => {
    event.preventDefault();

    if (isLoginMode) {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/furnizori/login",
          "POST",
          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
          {
            "Content-Type": "application/json",
          }
        );
        // console.log(responseData.role);
        if (responseData.role === "furnizor") {
          auth.login(responseData.furnizorId, responseData.token);
        } else {
          authO.login(responseData.organizatorId, responseData.token);
        }
      } catch (err) {}
    } else if (!isLoginMode && !isLoginMode2) {
      try {
        const formData = new FormData();
        formData.append("email", formState.inputs.email.value);
        formData.append("name", formState.inputs.name.value);
        formData.append("password", formState.inputs.password.value);
        formData.append("image", formState.inputs.image.value);
        const responseData = await sendRequest(
          "http://localhost:5000/api/furnizori/signup",
          "POST",
          formData
        );

        auth.login(responseData.furnizorId, responseData.token);
      } catch (err) {}
    } else {
      try {
        const formData = new FormData();
        formData.append("email", formState.inputs.email.value);
        formData.append("name", formState.inputs.name.value);
        formData.append("password", formState.inputs.password.value);
        const responseData = await sendRequest(
          "http://localhost:5000/api/organizatori/signup",
          "POST",
          formData
        );

        authO.login(responseData.organizatorId, responseData.token);
      } catch (err) {}
    }
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Card className="authentication">
        {titluForm(isLoginMode, isLoginMode2)}
        {isLoading && <LoadingSpinner asOverlay />}
        <h2>Login Required</h2>
        <hr />
        <form onSubmit={authSubmitHandler}>
          {!isLoginMode && (
            <Input
              element="input"
              id="name"
              type="text"
              label="Nume"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Vă rugăm introduceți un nume valid."
              onInput={inputHandler}
            />
          )}
          {!isLoginMode && !isLoginMode2 && (
            <ImageUpload
              id="image"
              onInput={inputHandler}
              center={true}
              errorText="Vă rugăm să adăugați o imagine."
            />
          )}

          <Input
            element="input"
            id="email"
            type="email"
            label="E-Mail"
            validators={[VALIDATOR_EMAIL()]}
            errorText="Vă rugăm introduceți o adresă de email validă."
            onInput={inputHandler}
          />
          <Input
            element="input"
            id="password"
            type="password"
            label="Password"
            validators={[VALIDATOR_MINLENGTH(8)]}
            errorText="Vă rugăm introduceți o parolă validă, cel puțin 8 caractere."
            onInput={inputHandler}
          />
          {/* <Button type="submit" disabled={!formState.isValid}>
            {isLoginMode ? "LOGIN" : "SIGNUP"} 
            if(isLoginMode) 
          </Button>  */}
          {testb(isLoginMode, isLoginMode2)}
        </form>
        <Button inverse onClick={switchModeHandler}>
          SWITCH TO {isLoginMode ? "SIGNUP Furnizor" : "LOGIN"}
        </Button>
        <Button inverse onClick={switchModeHandler2}>
          SWITCH TO SIGNUP Organizator
        </Button>
      </Card>
    </React.Fragment>
  );
};

export default Auth;
