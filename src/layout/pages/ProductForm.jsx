import axios from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast, Bounce } from "react-toastify";

const ProductForm = () => {

  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();

  const { productId } = useParams();

  async function showApi() {

    if (productId) {

      const res = await axios.get(`${import.meta.env.VITE_API_URL}/products/${productId}`);

      reset(res.data);
    }
  }

  useEffect(() => {
    showApi();
  }, []);

  const saveProduct = async (data) => {

    if (productId == null) {

      await axios.post(`${import.meta.env.VITE_API_URL}/products`, data);

      toast.success("Product Added Successfully", {
        position: "top-right",
        autoClose: 3000,
        theme: "light",
        transition: Bounce,
      });

    } else {

      await axios.put(`${import.meta.env.VITE_API_URL}/products/${productId}`, data);

      toast.success("Product Updated Successfully", {
        position: "top-right",
        autoClose: 3000,
        theme: "light",
        transition: Bounce,
      });

    }

    reset();
    navigate("/product-list");
  };

  return (
    <div className="container mt-5">

      <div className="col-lg-6 mx-auto p-5 shadow rounded">

        <h3 className="text-center mb-4">
          {productId ? "Update Product" : "Add Product"}
        </h3>

        <form onSubmit={handleSubmit(saveProduct)}>

          <div className="mt-3">
            <select className="form-select" {...register("p_category")}>
              <option value="">-- select category --</option>
              <option value="cloth">Cloth</option>
              <option value="toy">Toy</option>
              <option value="electronics">Electronics</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="mt-3">
            <input
              type="text"
              placeholder="Product Name"
              className="form-control"
              {...register("p_name")}
            />
          </div>

          <div className="mt-3">
            <input
              type="text"
              placeholder="Product Price"
              className="form-control"
              {...register("p_price")}
            />
          </div>

          <div className="mt-3">
            <input
              type="text"
              placeholder="Description"
              className="form-control"
              {...register("p_desc")}
            />
          </div>

          {
            productId == null
              ?
              <button className="btn btn-success w-100 mt-4">
                Submit
              </button>
              :
              <button className="btn btn-warning w-100 mt-4">
                Update
              </button>
          }

        </form>

      </div>

    </div>
  );
};

export default ProductForm;