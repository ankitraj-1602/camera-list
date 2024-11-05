import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";

// Assets
import brandLogo from "../src/assets/BrandLogo.svg";
import searchIcon from "../src/assets/SearchIcon.svg";
import locationIcon from "../src/assets/LocationIcon.svg";
import statusIcon from "../src/assets/StatusIcon.svg";

// Components
import Filter from "./components/Filter";
import Table from "./components/Table";
import Pagination from "./components/Pagination";
import Spinner from "./components/Spinner";
import NoDataFound from "./components/NoDataFound";

const App = () => {
  const [cameras, setCameras] = useState([]);
  const [uniqueLocations, setUniqueLocations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  // Pagination state
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Filter states
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const token = "4ApVMIn5sTxeW7GQ5VWeWiy";

  // ** Filtering Logic **
  const filteredCameras = useMemo(() => {
    return cameras.filter((camera) => {
      const matchesLocation = selectedLocation ? camera.location === selectedLocation : true;
      const matchesStatus = selectedStatus ? camera.status === selectedStatus : true;
      const matchesSearchTerm = searchTerm
        ? camera.name.toLowerCase().includes(searchTerm.toLowerCase())
        : true;
      return matchesLocation && matchesStatus && matchesSearchTerm;
    });
  }, [cameras, selectedLocation, selectedStatus, searchTerm]);

  const totalPages = Math.ceil(filteredCameras.length / itemsPerPage);

  const startItem = (page - 1) * itemsPerPage + 1;
  const endItem = Math.min(page * itemsPerPage, filteredCameras.length);

  // Paginate after filtering
  const paginatedCameras = useMemo(() => {
    return filteredCameras.slice(
      (page - 1) * itemsPerPage,
      page * itemsPerPage
    );
  }, [filteredCameras, page, itemsPerPage]);

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setPage(1); // Reset to first page when items per page changes
  };

  // Handle pagination controls
  const goToFirstPage = () => setPage(1);
  const goToPreviousPage = () => page > 1 && setPage(page - 1);
  const goToNextPage = () => page < totalPages && setPage(page + 1);
  const goToLastPage = () => setPage(totalPages);

  // Function to get unique locations
  const fetchUniqueLocations = (cameraList) => {
    const locations = [...new Set(cameraList.map(camera => camera.location))];
    setUniqueLocations(locations);
  };

  const fetchCameras = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        "https://api-app-staging.wobot.ai/app/v1/fetch/cameras",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = response.data.data;
      setCameras(data);
      fetchUniqueLocations(data);
    } catch (error) {
      setFetchError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCameras();
  }, []);

  // Function to change camera status
  const changeCameraStatus = async (id, status) => {
    try {
      await axios.put('https://api-app-staging.wobot.ai/app/v1/update/camera/status', {
        id: id,
        status: status,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCameras(prevCameras =>
        prevCameras.map(camera =>
          camera.id === id ? { ...camera, status } : camera
        )
      );
    } catch (error) {
      setFetchError(error.message);
    }
  };

  // Handle delete
  const handleCameraDelete = (id) => {
    const updatedCamerasList = cameras.filter((camera) => camera._id !== id);
    setCameras(updatedCamerasList);
  };

  // Reset Filters
  const resetFilters = () => {
    setSelectedLocation("");
    setSelectedStatus("");
    setSearchTerm("");
  };

  return (
    <div className="App">
      {/* Logo Container */}
      <div className="brand-logo-container">
        <img src={brandLogo} alt="Brand Logo" />
      </div>

      {/* Header Container */}
      <div className="header">
        <div className="header-title">
          <h6 className="header-title-top">Cameras</h6>
          <h6 className="header-title-bottom">Manage your cameras here.</h6>
        </div>
        <div className="search-box-container">
          <input 
            className="search-box" 
            placeholder="Search" 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
          />
          <img src={searchIcon} alt="Search Icon" className="search-icon" />
        </div>
      </div>

      {/* Filter Container */}
      <div className="filters">
        <Filter
          icon={locationIcon}
          value={selectedLocation}
          options={uniqueLocations}
          onChange={(e) => setSelectedLocation(e.target.value)}
          placeholder="Location"
        />
        <Filter
          icon={statusIcon}
          value={selectedStatus}
          options={["Active", "Inactive"]}
          onChange={(e) => setSelectedStatus(e.target.value)}
          placeholder="Status"
        />
      </div>

      {/* Table */}
      <div className="table-container">
        {isLoading ? <Spinner /> : filteredCameras.length === 0 ? (
          <>
            <NoDataFound message="No cameras found for the applied filters." />
            <div className="reset-button" onClick={resetFilters}>
              Reset
            </div>
          </>
        ) : <Table
          data={paginatedCameras}
          onDelete={handleCameraDelete}
          onStatusChange={changeCameraStatus}
        />}
      </div>

      {/* Table Pagination */}
      {paginatedCameras.length > 0 && (
        <div className="table-pagination">
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            startRow={startItem}
            endRow={endItem}
            totalItems={filteredCameras.length}
            rowsPerPage={itemsPerPage}
            handleFirstPage={goToFirstPage}
            handlePreviousPage={goToPreviousPage}
            handleNextPage={goToNextPage}
            handleLastPage={goToLastPage}
            handleRowsPerPageChange={handleItemsPerPageChange}
          />
        </div>
      )}
    </div>
  );
}

export default App;
