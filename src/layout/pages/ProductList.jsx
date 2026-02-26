import axios from "axios";
import { useEffect, useState } from "react";
import { FaTrash, FaPen } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { toast, Bounce } from "react-toastify";

const ProductList = () => {

  const [products, setProducts] = useState([]);

  const showApi = async () => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/products`);
    setProducts(res.data);
  };

  useEffect(() => {
    showApi();
  }, [])

  const deleteProduct = async (id) => {

    const confirmDelete = window.confirm("Are you sure you want to delete this product?");

    if (!confirmDelete) {
      return;
    }

    await axios.delete(`${import.meta.env.VITE_API_URL}/products/${id}`);

    toast.error("Product Deleted Successfully", {
      position: "top-right",
      autoClose: 3000,
      theme: "light",
      transition: Bounce,
    })

    showApi();
  };

  return (
    <div className="container mt-5">

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

          {products.map((p, index) => (
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