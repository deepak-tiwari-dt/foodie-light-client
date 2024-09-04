import "../RestaurantItem.css";

const RestaurantItem = ({ restaurant, onDelete, onEdit }) => {
  return (
    <div className="restaurant-item">
      <img
        src={restaurant.image}
        alt={restaurant.name}
        className="restaurant-image"
      />
      <h2>{restaurant.name}</h2>
      <p>{restaurant.description}</p>
      <p>
        <strong>Location:</strong> {restaurant.location}
      </p>
      <p className="cuisine">
        <strong>Cuisine Type:</strong> {restaurant.cuisineType}
      </p>
      <p>
        <strong>Contact:</strong> {restaurant.contactInfo}
      </p>
      <button className="delete-button" onClick={() => onDelete(restaurant.id)}>
        Delete
      </button>
      <button className="edit-button" onClick={() => onEdit(restaurant)}>
        Edit
      </button>
    </div>
  );
};

export default RestaurantItem;
