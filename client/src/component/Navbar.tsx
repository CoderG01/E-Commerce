import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AiFillHeart, AiOutlineShoppingCart } from "react-icons/Ai";
import { selectCartProduct } from "../store/slices/CartProductSlice";
import { selectLikedProduct } from "../store/slices/LikedProductSlice";

const Navbar = () => {
  // redux
  let likedProduct = useSelector(selectLikedProduct);
  let cartProduct = useSelector(selectCartProduct);

  const [menuVisible, setMenuVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  // const handleSearch = () => {
  //   const query = searchQuery.toLowerCase();
  //   // const filtered = products.filter(
  //   //   (product: ProductProps) =>
  //   //     product.title.toLowerCase().includes(query) ||
  //   //     product.description.toLowerCase().includes(query)
  //   // );
  //   // setFilteredProducts(filtered);
  // };

  useEffect(() => {
    // getProducts();
  }, []);

  return (
    <React.Fragment>
      <>
        <nav className="bg-gray-100 fixed top-0 w-full z-50">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex justify-between">
              <div className="flex space-x-4">
                <div className="flex items-center">
                  <div
                    className="flex items-center py-5 px-2 text-gray-700 hover:text-gray-900 cursor-pointer"
                    onClick={() => navigate("/")}
                  >
                    <svg
                      className="h-6 w-6 mr-1 text-blue-400"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                      />
                    </svg>
                    <span className="font-bold">Shopify</span>
                  </div>
                </div>
                <div className="hidden md:flex items-center space-x-1">
                  <input
                    type="text"
                    name="text"
                    id="textSearch"
                    className="w-full border-[1px] py-2 px-2 border-blue-400 rounded-md text-gray-600 font-bold textSearch text-sm"
                    placeholder="Search for products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <button>Search</button>
                  {/* <Link to="/cart">
                    <a
                      href="#"
                      className="py-5 px-3 text-gray-700 hover:text-gray-900"
                    >
                      Cart
                    </a>
                  </Link> */}
                  {/* <a
                    href="#"
                    className="py-5 px-3 text-gray-700 hover:text-gray-900"
                  >
                    Pricing
                  </a> */}
                </div>
              </div>
              <div className="hidden md:flex items-center space-x-1">
                <Link
                  to="/"
                  className="py-5 px-3 text-gray-700 hover:text-gray-900"
                >
                  Home
                </Link>
                <Link
                  to="/liked"
                  className="relative py-5 px-2 text-gray-700 hover:text-gray-900"
                  style={{ margin: "10px" }}
                >
                  {likedProduct.length > 0 ? (
                    <span className="w-[20px] h-[20px] bg-red-600 text-white absolute top-3 -right-2 rounded-full flex items-center justify-center">
                      {likedProduct.length}
                    </span>
                  ) : (
                    ""
                  )}
                  <AiFillHeart className="text-[24px]" />
                </Link>
                <Link
                  to="/cart"
                  className="relative py-5 px-3 text-gray-700 hover:text-gray-900 ms-10"
                >
                  {cartProduct.length > 0 ? (
                    <span className="w-[20px] h-[20px] bg-red-600 text-white absolute top-3 -right-2 rounded-full flex items-center justify-center">
                      {cartProduct.length}
                    </span>
                  ) : (
                    ""
                  )}
                  <AiOutlineShoppingCart className="text-[24px]" />
                </Link>
              </div>
              <div className="md:hidden flex items-center">
                <button className="mobile-menu-button" onClick={toggleMenu}>
                  <svg
                    className="w-6 h-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div
            className={`mobile-menu ${
              menuVisible ? "block" : "hidden"
            } md:hidden`}
          >
            <Link to="/" className="block py-2 px-4 text-sm hover:bg-gray-200">
              Home
            </Link>
            <Link
              to="cart"
              className="block py-2 px-4 text-sm hover:bg-gray-200"
            >
              Cart
            </Link>
          </div>
        </nav>
      </>
    </React.Fragment>
  );
};

export default Navbar;
