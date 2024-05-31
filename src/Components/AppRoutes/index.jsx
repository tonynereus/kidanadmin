import { BrowserRouter, Route, Routes } from "react-router-dom";
import Customers from "../../Pages/Customers";
import Dashboard from "../../Pages/Dashbaord";
import Inventory from "../../Pages/Inventory";
import Orders from "../../Pages/Orders";
import Categories from "../../Pages/Categories";
import ManageSubCategories from "../../Pages/SubCategory";
import SubCategoryItems from "../../Pages/SubItems";
import AddProduct from "../../Pages/NewItem";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />}></Route>
      <Route path="/dashboard/" element={<Dashboard />}></Route>
      <Route path="/inventory" element={<Inventory />}></Route>
      <Route path="/orders" element={<Orders />}></Route>
      <Route path="/customers" element={<Customers />}></Route>
      <Route path="/categories" element={<Categories />}></Route>
      <Route path="/categories/" element={<Categories />}></Route>
      <Route path="/subcat/" element={<ManageSubCategories />}></Route>
      <Route path="/subcat-items/" element={<SubCategoryItems />}></Route>
      <Route path="/add-product" element={<AddProduct />}></Route>
    </Routes>
  );
}
export default AppRoutes;
