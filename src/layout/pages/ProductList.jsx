import axios from "axios";
import { useEffect, useState } from "react";
import { FaTrash, FaPen } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { toast, Bounce } from "react-toastify";

const ProductList = () => {

  const categoryList = ["cloth", "toy", "electronics", "other"];

  const [products, setProducts] = useState([]);

  // search state
  const [search, setSearch] = useState("");

  // category state
  const [selectCat, setSelectCat] = useState("");

  // sorting state
  const [sortPrice, setSortPrice] = useState("");

  const showApi = async () => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/products`);
    setProducts(res.data);
  };

  useEffect(() => {
    showApi();
  }, []);

  const deleteProduct = async (id) => {

    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;

    await axios.delete(`${import.meta.env.VITE_API_URL}/products/${id}`);

    toast.error("Product Deleted Successfully", {
      position: "top-right",
      autoClose: 3000,
      theme: "light",
      transition: Bounce,
    });

    showApi();
  };

  // Search + Category + Sorting
  const filterData = products
    .filter((product) => {
      return product.p_name
        .toUpperCase()
        .includes(search.toUpperCase());
    })
    .filter((product) => {
      return selectCat ? product.p_category.toLowerCase() === selectCat.toLowerCase() : product;
    })
    .sort((a, b) => {

      if (sortPrice === "low") {
        return a.p_price - b.p_price;
      }

      if (sortPrice === "high") {
        return b.p_price - a.p_price;
      }

      return 0;
    });

  return (
    <div className="container mt-5">

      <div className="row mb-3">

        {/* SEARCH */}
        <div className="col-lg-4">
          <input
            type="search"
            onChange={(e) => setSearch(e.target.value)}
            className="form-control"
            placeholder="Search product"
          />
        </div>

        {/* CATEGORY FILTER */}
        <div className="col-lg-4">
          <select
            className="form-select"
            onChange={(e) => setSelectCat(e.target.value)}
          >
            <option value="">All Category</option>

            {categoryList.map((cat, index) => (
              <option key={index} value={cat}>
                {cat}
              </option>
            ))}

          </select>
        </div>

        {/* PRICE SORTING */}
        <div className="col-lg-4">
          <select
            className="form-select"
            onChange={(e) => setSortPrice(e.target.value)}
          >
            <option value="" disabled selected>Sort By Price</option>
            <option value="low">Low to High</option>
            <option value="high">High to Low</option>
          </select>
        </div>

      </div>

      <table className="table table-bordered text-center">

        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Category</th>
            <th>Name</th>
            <th>Price</th>
            <th>Desc</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>

          {filterData.map((p, index) => (
            <tr key={p.id} style={{ backgroundColor: "#aebfba" }}>

              <td>{index + 1}</td>
              <td>{p.p_category}</td>
              <td>{p.p_name}</td>
              <td>{p.p_price}</td>
              <td>{p.p_desc}</td>

              <td>
                <div className="btn-group gap-2">

                  <button
                    onClick={() => deleteProduct(p.id)}
                    className="btn btn-danger"
                  >
                    <FaTrash />
                  </button>

                  <NavLink
                    to={`/updateproduct/${p.id}`}
                    className="btn btn-warning"
                  >
                    <FaPen />
                  </NavLink>

                </div>
              </td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
};

export default ProductList;