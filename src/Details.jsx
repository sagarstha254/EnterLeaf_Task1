import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Details = () => {
  const navigate = useNavigate();
  const { currentProfile } = useSelector((state) => state.profile);

  console.log(currentProfile, "prof");
  return (
    <div>
      <button onClick={() => navigate("/")}>Go Back</button>
      <div>
        {currentProfile ? (
          <div>
            <div>
              <h2>Title: {currentProfile.title} </h2>
            </div>
            <img
              src={currentProfile.url}
              alt={currentProfile.name}
              height={700}
              width={1500}
            />
          </div>
        ) : (
          <div>Loading ...</div>
        )}
      </div>
    </div>
  );
};

export default Details;
