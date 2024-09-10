import { useEffect, useState } from "react";
import RestaurantItem from "./RestaurantItem";
import axios from "axios";
import "../RestaurantList.css";

axios.defaults.baseURL = "https://foodie-light-server.vercel.app/";

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingRestaurant, setEditingRestaurant] = useState(null);
  const [updatedRestaurant, setUpdatedRestaurant] = useState({
    name: "",
    description: "",
    location: "",
    cuisineType: "",
    contactInfo: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 18;

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await axios.get("/api/restaurants");
        setRestaurants(response.data);
      } catch (error) {
        console.error("Error fetching restaurants:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRestaurants();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/restaurants/${id}`);
      setRestaurants(restaurants.filter((restaurant) => restaurant.id !== id));
    } catch (error) {
      console.error("Error deleting restaurant:", error);
    }
  };

  const handleEdit = (restaurant) => {
    setEditingRestaurant(restaurant);
    setUpdatedRestaurant({
      name: restaurant.name,
      description: restaurant.description,
      location: restaurant.location,
      cuisineType: restaurant.cuisineType,
      contactInfo: restaurant.contactInfo,
    });
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        `/api/restaurants/${editingRestaurant.id}`,
        updatedRestaurant
      );
      setRestaurants((prevRestaurants) =>
        prevRestaurants.map((restaurant) =>
          restaurant.id === editingRestaurant.id ? response.data : restaurant
        )
      );
      setEditingRestaurant(null);
    } catch (error) {
      console.error("Error updating restaurant:", error);
    }
  };

  const totalPages = Math.ceil(restaurants.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = restaurants.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="app-container">
      <div className="restaurant-list">
        {editingRestaurant ? (
          <div className="edit-form">
            <h3>Edit Restaurant</h3>
            <input
              type="text"
              value={updatedRestaurant.name}
              onChange={(e) =>
                setUpdatedRestaurant({
                  ...updatedRestaurant,
                  name: e.target.value,
                })
              }
              placeholder="Name"
            />
            <input
              type="text"
              value={updatedRestaurant.description}
              onChange={(e) =>
                setUpdatedRestaurant({
                  ...updatedRestaurant,
                  description: e.target.value,
                })
              }
              placeholder="Description"
            />
            <input
              type="text"
              value={updatedRestaurant.location}
              onChange={(e) =>
                setUpdatedRestaurant({
                  ...updatedRestaurant,
                  location: e.target.value,
                })
              }
              placeholder="Location"
            />
            <input
              type="text"
              value={updatedRestaurant.cuisineType}
              onChange={(e) =>
                setUpdatedRestaurant({
                  ...updatedRestaurant,
                  cuisineType: e.target.value,
                })
              }
              placeholder="Cuisine Type"
            />
            <input
              type="text"
              value={updatedRestaurant.contactInfo}
              onChange={(e) =>
                setUpdatedRestaurant({
                  ...updatedRestaurant,
                  contactInfo: e.target.value,
                })
              }
              placeholder="Contact"
            />
            <button onClick={handleUpdate}>Update</button>
            <button onClick={() => setEditingRestaurant(null)}>Cancel</button>
          </div>
        ) : (
          currentItems.map((restaurant) => (
            <RestaurantItem
              key={restaurant.id}
              restaurant={restaurant}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          ))
        )}
      </div>

      {!editingRestaurant && (
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={currentPage === index + 1 ? "active" : ""}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default RestaurantList;
