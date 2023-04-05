// import SalesForm from "../components/sales/SalesForm";
// import Saless from "../components/salesForm/Saless";
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
    // check if the adding product exist
    // let findProductInCart = await cart.find(i=>{
    //   return i.id === product.id
    // });

    // if(findProductInCart){
    //   let newCart = [];
    //   let newItem;

    //   cart.forEach(cartItem => {
    //     if(cartItem.id === product.id){
    //       newItem = {
    //         ...cartItem,
    //         quantity: cartItem.quantity + 1,
    //         totalAmount: cartItem.price * (cartItem.quantity + 1)
    //       }
    //       newCart.push(newItem);
    //     }else{
    //       newCart.push(cartItem);
    //     }
    //   });

    //   setCart(newCart);
    //   toast(`Added ${newItem.name} to cart`,toastOptions)

    // }else{
      let addingProduct = {
        ...product,
        'quantity': 1,
        'totalAmount': product.price,
      }
      setCart([...cart, addingProduct]);
      toast(`Added ${product.name} to cart`, toastOptions)

    // }
    const formData = new FormData();
    // formData.append("name", product?.name);
    // formData.append("category", product?.category);
    formData.append("quantity", product.quantity-1);
    // formData.append("lowstock", product?.lowstock);
    // formData.append("price", product?.price);
    // formData.append("price2", product?.price2);
    // formData.append("description", description);
    // if (productImage) {
    //   formData.append("image", productImage);
    // }

     
    const id = product._id;

    await dispatch(updateProduct({id , formData }));
    await dispatch(getProducts());
    // await dispatch(getProducts());
    // navigate("/dashboard");




  }
  
  // const removeProduct = async(product) =>{
  //   const newCart =cart.filter(cartItem => cartItem.id !== product.id);
  //   setCart(newCart);
  // }

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
      {/* <SalesForm/> */}
      {/* <Saless/> */}
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
                      {/* <td>
                        <button className='btn btn-danger btn-sm' onClick={() => removeProduct(cartProduct)}>Remove</button>
                      </td> */}

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