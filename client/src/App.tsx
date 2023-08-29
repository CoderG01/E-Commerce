import "./App.css";
import { Routes, Route } from "react-router-dom";
import Layout from "./component/Layout";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import "react-toastify/dist/ReactToastify.css";
import LikedProduct from "./pages/LikedProduct";
import { Succes } from "./component/Succes";
import { Cancel } from "./component/Cancel";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="cart" element={<Cart />} />
          <Route path="liked" element={<LikedProduct />} />
          <Route path="success" element={<Succes />} />
          <Route path="cancel" element={<Cancel />} />
        </Route>
      </Routes>
      {/* <Product /> */}
    </>
  );
}

export default App;
