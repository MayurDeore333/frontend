import React, { useEffect, useState } from "react";
import { SpinnerImg } from "../../loader/Loader";
// import "./productList.scss";
  import { FaEdit, FaTrashAlt } from "react-icons/fa";
  import { AiOutlineEye } from "react-icons/ai";
import Search from "../../search/Search";
  import { useDispatch, useSelector } from "react-redux";
import { FILTER_PRODUCTS, selectFilteredPoducts } from "../../../redux/features/product/filterSlice";
  import ReactPaginate from "react-paginate";
  import { confirmAlert } from "react-confirm-alert";
  import "react-confirm-alert/src/react-confirm-alert.css";
import { deleteProduct, getProducts } from "../../../redux/features/product/productSlice";
import { Link } from "react-router-dom";


 
const ProductList = ({ products, isLoading }) => {
   const [search, setSearch] = useState("");
 const filteredProducts = useSelector(selectFilteredPoducts);

   const dispatch = useDispatch();

  const shortenText = (text, n) => {
    if (text.length > n) {
      const shortenedText = text.substring(0, n).concat("...");
      return shortenedText;
    }
    return text;
  };
  const lowstockStatus = (lowstock,quantity) => {
    if ( quantity == lowstock  ) {
      return <span className=" bg-danger text-white ml-1 p-2 mb-2"><b>lowstock  </b></span>;
    }
    return null;
   
  };

  const delProduct = async (id) => {
    console.log(id);
    await dispatch(deleteProduct(id));
    await dispatch(getProducts());
  };

  const confirmDelete = (id) => {
    confirmAlert({
      title: "Delete an Item",
      message: "Are you sure you want to delete this item.",
      buttons: [
        {
          label: "Delete",
          onClick: () => delProduct(id),
        },
        {
          label: "Cancel",
          onClick: () => alert('Click No')
        },
      ],
    });
  };

    // Begin Pagination
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 5;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;

    setCurrentItems(filteredProducts.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(filteredProducts.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, filteredProducts]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filteredProducts.length;
    setItemOffset(newOffset);
  };
    // End Pagination

  useEffect(() => {
    dispatch(FILTER_PRODUCTS({ products, search }));
  }, [products, search, dispatch]);

  return (
    <div className="product-list">
      <hr />
      <div className="table">
        
            
          <span>
            <Search
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </span>
        

        {isLoading && <SpinnerImg />}

        <div className="table">
          {!isLoading && products.length === 0 ? (
            <p>-- No item found, please add an item...</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Sl. No.</th>
                  <th>Item Name</th>
                  <th>Category</th>
                  <th>Sales Price</th>
                  <th>Purchase Price</th>
                  <th>Stock Qty</th>
                  <th>Stock Value</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {currentItems.map((product, index) => {
                  const { _id, name, category, price, price2, quantity, lowstock } = product;
                  return (
                    <tr key={_id}>
                      <td>{index + 1}</td>
                      <td>{shortenText(name, 16)} {lowstockStatus(lowstock, quantity)}</td>
                      <td>{category}</td>
                      <td>
                        {"₹"}
                        {price}
                      </td>
                      <td>
                        {"₹"}
                        {price2}
                      </td>
                      <td>{quantity}</td>
                      <td>
                        {"₹"}
                        {price * quantity}
                      </td>
                      <td className="icons">
                        <span>
                          <Link to={`/product-detail/${_id}`}>
                            <AiOutlineEye size={18} color={"purple"} />
                          </Link>
                        </span>
                        <span>
                          <Link to={`/edit-product/${_id}`}>
                            <FaEdit size={18} color={"green"} />
                          </Link>
                        </span>
                        <span>
                          <Link to={`/addSale-form/${_id}`}>
                            <FaEdit size={18} color={"green"} />
                          </Link>
                        </span>
                        <span>
                          <Link to={`/product-Sale/${_id}`}>
                            <FaEdit size={18} color={"green"} />
                          </Link>
                        </span>
                        <span>
                          <FaTrashAlt
                            size={18} 
                            color={"red"}
                            onClick={() => confirmDelete(_id)}
                          />
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
        <ReactPaginate
          breakLabel="..."
          nextLabel="Next"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          pageCount={pageCount}
          previousLabel="Prev"
          renderOnZeroPageCount={null}
          containerClassName="pagination"
          pageLinkClassName="page-num"
          previousLinkClassName="page-num"
          nextLinkClassName="page-num"
          activeLinkClassName="activePage"
        />
      </div>
    </div>
  );
};

export default ProductList;
