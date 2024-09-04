import RestaurantForm from "../components/RestaurantForm";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddRestaurantPage = () => {
  const navigate = useNavigate();

  const handleAddRestaurant = async (restaurant) => {
    try {
      await axios.post("/api/restaurants", restaurant);
      navigate("/");
    } catch (error) {
      console.error("Error adding restaurant:", error);
    }
  };

  return (
    <div>
      <RestaurantForm onSubmit={handleAddRestaurant} />
    </div>
  );
};

export default AddRestaurantPage;
