import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getProducts, updateProduct } from "../redux/features/product/productSlice";
import { ComponentToPrint } from "../components/ComponentToPrint";
import useRedirectLoggedOutUser from "../customHook/useRedirectLoggedOutUser";
import { selectIsLoggedIn } from "../redux/features/auth/authSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { SpinnerImg } from "../components/loader/Loader";
import { useReactToPrint } from 'react-to-print';

const Sales = () => {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();
  const [cart, setCart] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  const toastOptions = {
    autoClose: 400,
    pauseOnHover: true,
  };

  const isLoggedIn = useSelector(selectIsLoggedIn);

  const addProductToCart = async(product) =>{

      let addingProduct = {
        ...product,
        'quantity': 1,
        'totalAmount': product.price,
      }
      setCart([...cart, addingProduct]);
      toast(`Added ${product.name} to cart`, toastOptions)

    const formData = new FormData();

    formData.append("quantity", product.quantity-1);

    const id = product._id;

    await dispatch(updateProduct({id , formData }));
    await dispatch(getProducts());

  }

  const componentRef = useRef();

  const handleReactToPrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handlePrint = () => {
    handleReactToPrint();
  }

  const { products, isLoading, isError, message } = useSelector(
    (state) => state.product
  );
  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getProducts());
    }

    if (isError) {
      console.log(message);
    }
  }, [isLoggedIn, isError, message, dispatch]);

  useEffect(() => {
    let newTotalAmount = 0;
    cart.forEach((icart) => {
      newTotalAmount = newTotalAmount + parseInt(icart.totalAmount);
    });
    setTotalAmount(newTotalAmount);
  }, [cart]);

  return (
    <>

      {isLoading && <SpinnerImg />}
      <div className='row'>
        <div className='col-lg-8'>
          {isLoading ? 'Loading' : <div className='row'>
              {products.map((product, key) =>
                <div key={key} className='col-lg-4 mb-4'>
                  <div className='pos-item px-3 text-center border' onClick={() => addProductToCart(product)}>
                      <p>{product.name}</p>
                      <img src={product.image.filePath} className="img-fluid" alt={product.name} />
                      <p>₹{product.price}</p>
                  </div>

                </div>
              )}
            </div>}

        </div>
        <div className='col-lg-4'>
              <div style={{display: "none"}}>
                <ComponentToPrint cart={cart} totalAmount={totalAmount} ref={componentRef}/>
              </div>
              <div className='table-responsive bg-dark'>
                <table className='table table-responsive table-dark table-hover'>
                  <thead>
                    <tr>
                      <td>#</td>
                      <td>Name</td>
                      <td>Price</td>
                      <td>Qty</td>
                      <td>Total</td>
                      <td>Action</td>
                    </tr>
                  </thead>
                  <tbody>
                    { cart ? cart.map((cartProduct, key) => <tr key={key}>
                      <td>{cartProduct.id}</td>
                      <td>{cartProduct.name}</td>
                      <td>{cartProduct.price}</td>
                      <td>{cartProduct.quantity}</td>
                      <td>{cartProduct.totalAmount}</td>

                    </tr>)

                    : 'No Item in Cart'}
                  </tbody>
                </table>
                <h2 className='px-2 text-white'>Total Amount:₹{totalAmount}</h2>
              </div>

              <div className='mt-3'>
                { totalAmount !== 0 ? <div>
                  <button className='btn btn-primary' onClick={handlePrint}>
                    Pay Now
                  </button>

                </div> : 'Please add a product to the cart'

                }
              </div>

        </div>
      </div>

    </>
  );
};

export default Sales;

// import React, { useEffect, useRef, useState } from "react";
// import {
//   getProducts,
//   updateProduct,
// } from "../redux/features/product/productSlice";
// import useRedirectLoggedOutUser from "../customHook/useRedirectLoggedOutUser";
// import { selectIsLoggedIn } from "../redux/features/auth/authSlice";
// import { useDispatch } from "react-redux";
// import { useSelector } from "react-redux";
// import { SpinnerImg } from "../components/loader/Loader";


// const Sales = ({product}) => {
//   useRedirectLoggedOutUser("/login");

//   const    cartItems  = useSelector((state) => state.rootReducer);
//   const dispatch = useDispatch();
//   //update cart handler
//   const handleAddTOCart = () => {
//     dispatch({
//       type: "ADD_TO_CART",
//       payload: { ...product, quantity: 1 },
//     });
//   };

//   const isLoggedIn = useSelector(selectIsLoggedIn);

//   const componentRef = useRef();

//   const { products, isLoading, isError, message } = useSelector(
//     (state) => state.product
//   );
//   useEffect(() => {
//     if (isLoggedIn === true) {
//       dispatch(getProducts());
//     }

//     if (isError) {
//       console.log(message);
//     }
//   }, [isLoggedIn, isError, message, dispatch]);
//   useEffect(() => {
//     localStorage.setItem("cartItems", JSON.stringify(cartItems));
//   }, [cartItems]);

//   return (
//     <>
//       {isLoading && <SpinnerImg />}

//       <div>
//        <p>{cartItems.length}</p>
//        <button type="button" className="btn btn-primary">cart</button></div>
//       <div className="row">
//         <div className="col-lg-8">
//           {isLoading ? (
//             "Loading"
//           ) : (
//             <div className="row">
//               {products.map((product, key) => (
//                 <div key={key} className="col-lg-4 mb-4">
//                   <div className="pos-item px-3 text-center border" onClick={() => handleAddTOCart()}>
//                     <p>{product.name}</p>
//                     <img
//                       src={product.image.filePath}
//                       className="img-fluid"
//                       alt={product.name}
//                     />
//                     <p>₹{product.price}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default Sales;