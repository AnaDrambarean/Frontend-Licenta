import React, { useState, useContext } from "react";

import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";
import Modal from "../../shared/components/UIElements/Modal";
import Map from "../../shared/components/UIElements/Map";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";
import "./ServiceItem.css";
import {FaPhone} from 'react-icons/fa';

const ServiceItem = (props) => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const auth = useContext(AuthContext);
  const [showMap, setShowMap] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const openMapHandler = () => setShowMap(true);

  const closeMapHandler = () => setShowMap(false);

  const showDeleteWarningHandler = () => {
    setShowConfirmModal(true);
  };

  const cancelDeleteHandler = () => {
    setShowConfirmModal(false);
  };

  const confirmDeleteHandler = async () => {
    setShowConfirmModal(false);
    try {
      await sendRequest(
        `http://localhost:5000/api/services/${props.id}`,
        "DELETE",
        null,
        {
          Authorization: 'Bearer '+ auth.token
        }
      );
      props.onDelete(props.id);
    } catch (err) {}
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />

      <Modal
        show={showMap}
        onCancel={closeMapHandler}
        header={props.address}
        contentClass="service-item__modal-content"
        footerClass="service-item__modal-actions"
        footer={<Button onClick={closeMapHandler}>CLOSE</Button>}
      >
        <div className="map-container">
          <Map center={props.coordinates} zoom={16} />
        </div>
      </Modal>
      <Modal
        show={showConfirmModal}
        onCancel={cancelDeleteHandler}
        header="Sunteți sigur?"
        footerClass="service-item__modal-actions"
        footer={
          <React.Fragment>
            <Button inverse onClick={cancelDeleteHandler}>
              ANULEAZĂ
            </Button>
            <Button danger onClick={confirmDeleteHandler}>
              ȘTERGE
            </Button>
          </React.Fragment>
        }
      >
        <p>
          Doriți să ștergeți acest serviciu? Țineți cont ca această acțiune este
          ireversibilă!
        </p>
      </Modal>
      <li className="service-item">
        <Card className="service-item__content">
          {isLoading && <LoadingSpinner asOverlay />}
          <div className="service-item__image">
            <img src={`http://localhost:5000/${props.image}`} alt={props.title} />
          </div>
          <div className="service-item__info">
            <h2>{props.title}</h2>
           
            <p>{props.description}</p>
            <h2><FaPhone /> {props.contact}</h2>
          </div>
          <div className="service-item__actions">
            <Button inverse onClick={openMapHandler}>
              VEZI PE HARTĂ
            </Button>
            {auth.furnizorId === props.creatorId && (
              <Button to={`/services/${props.id}`}>MODIFICĂ</Button>
            )}
            {auth.furnizorId === props.creatorId  && (
              <Button danger onClick={showDeleteWarningHandler}>
                ȘTERGE
              </Button>
            )}
          </div>
        </Card>
      </li>
    </React.Fragment>
  );
};

export default ServiceItem;
