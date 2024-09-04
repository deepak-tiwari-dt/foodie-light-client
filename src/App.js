import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RestaurantListPage from "./pages/RestaurantListPage";
import AddRestaurantPage from "./pages/AddRestaurantPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RestaurantListPage />} />
        <Route path="/add-restaurant" element={<AddRestaurantPage />} />
      </Routes>
    </Router>
  );
};

export default App;
