import { Link } from "react-router-dom";
import RestaurantList from "../components/RestaurantList";
import "../RestaurantListPage.css";

const RestaurantListPage = () => {
  return (
    <div className="restaurant-list-page">
      <h2 className="restaurants">Restaurants</h2>
      <Link to="/add-restaurant" className="add-restaurant-button">
        Add Restaurant
      </Link>
      <RestaurantList />
    </div>
  );
};

export default RestaurantListPage;
