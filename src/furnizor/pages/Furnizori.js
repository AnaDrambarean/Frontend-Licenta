import React, { useEffect, useState } from "react";

import FurnizorList from "../components/FurnizorList";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useHttpClient } from "../../shared/hooks/http-hook";

const Furnizori = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedFurnizori, setLoadedFurnizori] = useState();

  useEffect(() => {
    const fetchFurnizori = async () => {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/furnizori"
        );

        setLoadedFurnizori(responseData.furnizori);
      } catch (err) {}
    };
    fetchFurnizori();
  }, [sendRequest]);

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedFurnizori && (
        <FurnizorList items={loadedFurnizori} />
      )}
    </React.Fragment>
  );
};

export default Furnizori;
