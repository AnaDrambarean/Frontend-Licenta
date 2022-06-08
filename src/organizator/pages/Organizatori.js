import React, { useEffect, useState } from "react";

import OrganizatorList from "../components/OrganizatorList";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useHttpClient } from "../../shared/hooks/http-hook";

const Organizatori = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedOrganizatori, setLoadedOrganizatori] = useState();

  useEffect(() => {
    const fetchOrganizatori = async () => {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/organizatori"
        );

        setLoadedOrganizatori(responseData.organizatori);
      } catch (err) {}
    };
    fetchOrganizatori();
  }, [sendRequest]);

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedOrganizatori && (
        <OrganizatoriList items={loadedOrganizatori} />
      )}
    </React.Fragment>
  );
};

export default Organizatori;
