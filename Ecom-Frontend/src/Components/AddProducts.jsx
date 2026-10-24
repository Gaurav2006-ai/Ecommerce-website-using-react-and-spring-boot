import { useState } from "react";
import API from "./Axios";

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    brand: "",
    Description: "",
    price: "",
    category: "",
    quantity: "",
    relaeaseDate: "",
    available: false,
  });
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProduct({ ...product, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (image) {
      formData.append("imgFile", image);
    }
    const productPayload = {
     ...product,
      price: product.price === "" ? null : Number(product.price),
      quantity: product.quantity === "" ? null : Number(product.quantity),
      relaeaseDate: product.relaeaseDate
        ? product.relaeaseDate.split("-").reverse().join("-")
        : null,
    };
    formData.append(
      "product",
      new Blob([JSON.stringify(productPayload)], { type: "application/json" })
    );

    API.post("/product", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(() => alert("Product added successfully"))
      .catch((err) => {
        console.error(err);
        alert("Could not add product");
      });
  };

  return (
    <div className="container">
      <form className="row g-3 pt-5" onSubmit={handleSubmit}>
        <div className="col-md-6">
          <label className="form-label"><h6>Name</h6></label>
          <input type="text" className="form-control" name="name" value={product.name} onChange={handleChange} />
        </div>
        <div className="col-md-6">
          <label className="form-label"><h6>Brand</h6></label>
          <input type="text" className="form-control" name="brand" value={product.brand} onChange={handleChange} />
        </div>
        <div className="col-12">
          <label className="form-label"><h6>Description</h6></label>
          <input type="text" className="form-control" name="Description" value={product.Description} onChange={handleChange} />
        </div>
        <div className="col-5">
          <label className="form-label"><h6>Price</h6></label>
          <input type="number" className="form-control" name="price" value={product.price} onChange={handleChange} />
        </div>
        <div className="col-md-6">
          <label className="form-label"><h6>Category</h6></label>
          <select className="form-select" name="category" value={product.category} onChange={handleChange}>
            <option value="">Select category</option>
            <option value="Laptop">Laptop</option>
            <option value="Headphone">Headphone</option>
            <option value="Mobile">Mobile</option>
            <option value="Electronics">Electronics</option>
            <option value="Toys">Toys</option>
            <option value="Fashion">Fashion</option>
          </select>
        </div>
        <div className="col-md-4">
          <label className="form-label"><h6>Stock Quantity</h6></label>
          <input type="number" className="form-control" name="quantity" value={product.quantity} onChange={handleChange} />
        </div>
        <div className="col-md-4">
          <label className="form-label"><h6>Release Date</h6></label>
          <input type="date" className="form-control" name="relaeaseDate" value={product.relaeaseDate} onChange={handleChange} />
        </div>
        <div className="col-md-4">
          <label className="form-label"><h6>Image</h6></label>
          <input type="file" className="form-control" onChange={(e) => setImage(e.target.files[0])} />
        </div>
        <div className="col-12">
          <div className="form-check">
            <input className="form-check-input" type="checkbox" name="available" checked={product.available} onChange={handleChange} />
            <label className="form-check-label">Product Available</label>
          </div>
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-primary">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;