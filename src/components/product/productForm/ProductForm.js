import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { RiImageAddLine } from "react-icons/ri";
import Card from "../../card/Card";

// import { AnimatePresence, motion } from "framer-motion";

const ProductForm = ({
  product,
  productImage,
  imagePreview,
  description,
  setDescription,
  handleInputChange,
  handleImageChange,
  saveProduct,
}) => {
  return (
    <div className="addProduct">
      <form onSubmit={saveProduct}>
        <div className="header_title">
          <h4>
            <b>Add Item</b>
          </h4>
          <div className="cursor-pointer">
            <svg
              width="16"
              height="16"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {" "}
              <a href="/items">
                <path
                  d="M13 1L1 13M1 1L13 13"
                  stroke="#737373"
                  stroke-width="1.66667"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </a>
            </svg>
          </div>
        </div>

        <div className="container border " style={{ height: "225px" }}>
          <label>
            <small>
              {" "}
              <b>Item Image</b>{" "}
            </small>
          </label>
          <p
            className="container mt-0 border rounded"
            style={{ color: "dark", backgroundColor: "#F5F5F5" }}
          >
            <small>Supported Formats: jpg, jpeg, png</small>
          </p>
          <div className="container">
            <input
              type="file"
              name="image"
              onChange={(e) => handleImageChange(e)}
            />
          </div>
          {imagePreview != null ? (
            <div className="image-preview">
              <img
                className="container mt-3 border"
                src={imagePreview}
                alt="product"
              />
            </div>
          ) : (
            <p className="container">No image set this poduct.</p>
          )}
        </div>

        <div className="container">
          <label>
            <small>
              {" "}
              <b>Item Name </b>
            </small>
          </label>{" "}
          <br />
          <div className="form-outline">
            <input
              type="text"
              id="form12"
              className="form-control"
              name="name"
              placeholder="Enter Item name here.."
              value={product?.name}
              onChange={handleInputChange}
            />
          </div>
          <label>
            <small>
              {" "}
              <b>Item Category</b>
            </small>
          </label>{" "}
          <br />
          <div className="form-outline">
            <input
              type="text"
              id="form12"
              className="form-control"
              name="category"
              placeholder="Enter category of the item.."
              value={product?.category}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-row">
            <div className="form-group ml-3 col-md-5">
              <label>
                <small>
                  {" "}
                  <b>Sale Price</b>
                </small>
              </label>{" "}
              <br />
              <input
                type="text"
                className="form-control"
                placeholder="₹ Enter Price"
                name="price"
                value={product?.price}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group ml-3 col-md-5">
              <label>
                <small>
                  {" "}
                  <b>Purchase Price</b>
                </small>
              </label>{" "}
              <br />
              <input
                type="text"
                className="form-control"
                placeholder="₹ Enter Price"
                name="price2"
                value={product?.price2}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group ml-3 col-md-5">
              <label>
                <small>
                  {" "}
                  <b>Opening Stock</b>
                </small>
              </label>{" "}
              <br />
              <div className="form-outline">
                <input
                  type="number"
                  id="typeNumber"
                  className="form-control"
                  name="quantity"
                  placeholder="Enter count"
                  value={product?.quantity}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="form-group ml-3 col-md-5">
              <label>
                <small>
                  {" "}
                  <b>Low Stock</b>
                </small>
              </label>{" "}
              <br />
              <div className="form-outline">
                <input
                  type="number"
                  id="typeNumber"
                  className="form-control"
                  name="lowstock"
                  placeholder="Enter Low stock count"
                  value={product?.lowstock}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
          <label>
            <small>
              {" "}
              <b>Item Description</b>
            </small>
          </label>{" "}
          <br />
          <div className="container" style={{ width: "500px" }}>
            <ReactQuill
              theme="snow"
              value={description}
              onChange={setDescription}
              modules={ProductForm.modules}
              formats={ProductForm.formats}
            />
          </div>
        </div>
        <div className="container mt-3 mb-2">
          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: "500px", height: "35px" }}
          >
            ADD Item
          </button>
        </div>
      </form>
    </div>
  );
};

ProductForm.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ align: [] }],
    [{ color: [] }, { background: [] }],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["clean"],
  ],
};
ProductForm.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "color",
  "background",
  "list",
  "bullet",
  "indent",
  "link",
  "video",
  "image",
  "code-block",
  "align",
];

export default ProductForm;
