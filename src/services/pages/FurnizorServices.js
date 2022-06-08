import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import ServiceList from "../components/ServiceList";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useHttpClient } from "../../shared/hooks/http-hook";

const FurnizorService = () => {
  const [loadedServices, setLoadedServices] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const furnizorId = useParams().furnizorId;

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/services/furnizor/${furnizorId}`
        );
        setLoadedServices(responseData.services);
      } catch (err) {}
    };
    fetchServices();
  }, [sendRequest, furnizorId]);
  const serviceDeletedHandler = (deletedServiceId) => {
    setLoadedServices((prevServices) =>
      prevServices.filter((service) => service.id !== deletedServiceId)
    );
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedServices && (
        <ServiceList
          items={loadedServices}
          onDeleteService={serviceDeletedHandler}
        />
      )}
    </React.Fragment>
  );
};

export default FurnizorService;
