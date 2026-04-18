
import HallsCard from "../../components/HallsCard/HallsCard";
import React, { useContext } from "react";
import HallsContext from "../../contexts/HallsContext";

const HallsPage = () => {
  const { hallsData, loading, error } = useContext(HallsContext);

  return (
    <>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          {hallsData.map((hall) => {
            return <HallsCard key={hall.hall_id} hallDetails={hall} />;
          })}
        </>
      )}

    </>
  );
};

export default HallsPage;
