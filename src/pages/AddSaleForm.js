// import React, { useState } from 'react';
// // import axios from 'axios';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate, useParams } from 'react-router-dom';
// import { addSale, getProduct, selectIsLoading } from '../redux/features/product/productSlice';
// import { useEffect } from 'react';
// // import loader from '../components/loader/Loader';

// const AddSaleForm = () => {
//   const [formData, setFormData] = useState({
//     date: '',
//     quantitySold: '',
//     profit: ''
//   });

//   const { id } = useParams();

//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const isLoading = useSelector(selectIsLoading);
//   useEffect(() => {
//     dispatch(getProduct(id));
//   }, [dispatch, id]);

//   const { date, quantitySold, profit } = formData;

//   const onChange = e =>
//     setFormData({ ...formData, [e.target.name]: e.target.value });

//   const onSubmit = async e => {
//     e.preventDefault();

//     // const newSale = {
//     //   date,
//     //   quantitySold,
//     //   profit
//     // };
//  console.log(...formData);
//  await dispatch(addSale({ id, formData }));
//  navigate("/dashboard");
//     // try {
//     //   await axios.patch(`/products/${id}/sales`, newSale);
//     //   // Redirect to the product detail page
//     // //   window.location.href = `/products/${productId}`;
//     // } catch (err) {
//     //   console.error(err);
//     // }
//   };

//   return (
//     <>
//     {isLoading && <p>Loading....</p>}
//     <form onSubmit={onSubmit}>
//       <div>
//         <label>Date</label>
//         <input
//           type="number"
//           name="date"
//           value={date}
//           onChange={onChange}
//           required
//         />
//       </div>
//       <div>
//         <label>Quantity Sold</label>
//         <input
//           type="number"
//           name="quantitySold"
//           value={quantitySold}
//           onChange={onChange}
//           required
//         />
//       </div>
//       <div>
//         <label>Profit</label>
//         <input
//           type="number"
//           name="profit"
//           value={profit}
//           onChange={onChange}
//           required
//         />
//       </div>
     
//       <button type="submit">Add Sale</button>
//     </form>
//     </>
//   );
// };

// export default AddSaleForm;

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { addSale, getProduct, selectIsLoading } from '../redux/features/product/productSlice';
import { useEffect } from 'react';

const AddSaleForm = () => {
  const [formData, setFormData] = useState({
    date: '',
    quantitySold: '',
    profit: ''
  });
  const isLoading = useSelector(selectIsLoading);
  const { id } = useParams();
 
  const dispatch = useDispatch();
 const navigate = useNavigate();
 useEffect(() => {
      dispatch(getProduct(id));
    }, [dispatch, id]);
  const { date, quantitySold, profit } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();

    const newSale = {
      date,
      quantitySold,
      profit
    };
console.log(id,newSale);
    await dispatch(addSale({id,newSale }));
    navigate("/items");
    // try {
    //   await axios.post(`/products/${id}/sales`, newSale);
    //   navigate("/dashboard");
    //   // Redirect to the product detail page
    //   // window.location.href = `/products/${productId}`;
    // } catch (err) {
    //   console.error(err);
    // }
  };

  return (
    <>
     {isLoading && <p>Loading..</p>}
     <form onSubmit={onSubmit}>
       <div>
         <label>Date</label>
         <input
           type="date"
           name="date"
           value={date}
           onChange={onChange}
           required
         />
      </div>
      <div>
        <label>Quantity Sold</label>
        <input
          type="number"
          name="quantitySold"
          value={quantitySold}
          onChange={onChange}
          required
        />
      </div>
      <div>
        <label>Profit</label>
        <input
          type="number"
          name="profit"
          value={profit}
          onChange={onChange}
          required
        />
      </div>
     
      <button type="submit">Add Sale</button>
    </form>
    </>
  );
};

export default AddSaleForm;