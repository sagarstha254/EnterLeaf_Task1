import React, { useState } from "react";
import { useGetProfilesQuery } from "./api/api";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchProfileFailure,
  fetchProfileStart,
  fetchProfileSuccess,
} from "./redux/state/profileSlice";

function Profile() {
  const [page, setPage] = useState(1); // Track current page
  const [searchQuery, setSearchQuery] = useState(""); // Track search query
  const [albumFilter, setAlbumFilter] = useState(""); // Track album filter
  const { data, error, isLoading } = useGetProfilesQuery(); // Fetch all profiles
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const itemsPerPage = 10;

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error fetching profiles</p>;
  }

  // Calculate start and end index for current page
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

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

  const handleNextPage = () => {
    setPage(page + 1); // Increment page number
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1); // Decrement page number, ensure it doesn't go below 1
    }
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value); // Update search query state
    setPage(1); // Reset page number when searching
  };

  const handleFilterChange = (event) => {
    setAlbumFilter(event.target.value); // Update album filter state
    setPage(1); // Reset page number when changing filter
  };

  const filteredData = data
    .filter((x) =>
      x.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((x) =>
      albumFilter ? x.albumId.toString() === albumFilter : true
    );

  const albumIds = [...new Set(data.map((x) => x.albumId))]; // Get unique album IDs

  return (
    <>
      <div>
        <input
          type="text"
          placeholder="Search by title..."
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>
      <div>
        <label htmlFor="albumFilter">Filter by Album ID: </label>
        <select id="albumFilter" value={albumFilter} onChange={handleFilterChange}>
          <option value="">All</option>
          {albumIds.map((id) => (
            <option key={id} value={id}>
              {id}
            </option>
          ))}
        </select>
      </div>
      <div>
        {filteredData.slice(startIndex, endIndex).map((x) => {
          return (
            <div key={x._id}>
              <div onClick={() => handleChange(x)}>
                <img src={x.url} alt={x.name} height={90} width={90} />
              </div>
              <div>Album Id: {x.albumId}</div>
              <div>Title: {x.title}</div>

              <div>Thumbnail: {x.thumbnailUrl}</div>
            </div>
          );
        })}
      </div>
      <div>
        <button onClick={handlePrevPage} disabled={page === 1}>
          Previous Page
        </button>
        <button onClick={handleNextPage}>Next Page</button>
      </div>
    </>
  );
}

export default Profile;
