import { useForm } from "react-hook-form";
import "../RestaurantForm.css";

const RestaurantForm = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const submitForm = (data) => {
    console.log("Submitted Data: ", data);
    onSubmit(data);
    reset();
  };

  return (
    <form className="restaurant-form" onSubmit={handleSubmit(submitForm)}>
      <h2>Add a New Restaurant</h2>
      <div>
        <label>Name:</label>
        <input
          type="text"
          {...register("name", { required: "Name is required" })}
        />
        {errors.name && <p className="error">{errors.name.message}</p>}
      </div>
      <div>
        <label>Description:</label>
        <textarea
          {...register("description", { required: "Description is required" })}
        />
        {errors.description && (
          <p className="error">{errors.description.message}</p>
        )}
      </div>
      <div>
        <label>Location:</label>
        <input
          type="text"
          {...register("location", { required: "Location is required" })}
        />
        {errors.location && <p className="error">{errors.location.message}</p>}
      </div>
      <div>
        <label>Cuisine Type:</label>
        <input type="text" {...register("cuisineType")} />
      </div>
      <div>
        <label>Contact:</label>
        <input
          type="text"
          {...register("contactInfo", { required: "Contact is required" })}
        />
        {errors.contactInfo && (
          <p className="error">{errors.contactInfo.message}</p>
        )}
      </div>
      <button type="submit">Add Restaurant</button>
    </form>
  );
};

export default RestaurantForm;
