import React from "react";
import { useGetProfilesQuery } from "./api/api";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchProfileFailure,
  fetchProfileStart,
  fetchProfileSuccess,
} from "./redux/state/profileSlice";

function Profile() {
  const { data, error, isLoading } = useGetProfilesQuery();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error fetching hotels</p>;
  }

  const handleChange = (x) => {
    try {
      dispatch(fetchProfileStart());
      if (x) {
        dispatch(fetchProfileSuccess(x));
        navigate("/detail");
      }
    } catch (error) {
      dispatch(fetchProfileFailure(error.message));
    }
  };

  return (
    <>
      <div>
        {data &&
          data.map((x) => {
            return (
              <div key={x._id}>
                <div onClick={() => handleChange(x)}>
                  <img src={x.url} alt={x.name} height={90} width={90} />
                </div>

                <div>Title: {x.title}</div>
                <div>Thumbnail: {x.thumbnailUrl}</div>
              </div>
            );
          })}
      </div>
    </>
  );
}

export default Profile;
