import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

export const ProductCard = (props) => {
  const navigate = useNavigate();
  const [token] = useState(sessionStorage.getItem("token"));

  const onToast = () => {
    toast.success('Added to cart!', {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const handleClick = (id) => {
    navigate(`/product/${id}`);
  };

  const handleCart = async () => {
    if (!token) {
      navigate("/login");
      return;
    }

    const res = await fetch("http://localhost:9090/cart/addproduct", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token,
      },
      body: JSON.stringify({
        productId: props.id,
        quantity: 1,
      }),
    });

    if (res.status === 200) {
      onToast();
      // const data = await res.json(); // If you need to use the data, uncomment this line
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      <li>
        <div className="product-card">
          <figure className="card-banner">
            {props.img ? (
              <img
                src={`data:image/${props.imgFormat};base64,${props.img}`}
                width={189}
                height={189}
                loading="lazy"
                alt={props.name}
              />
            ) : (
              <div className="no-image-placeholder">
                {/* You can style this div or add any placeholder content */}
                Fresh one
              </div>
            )}
            <div className="btn-wrapper">
              <button className="product-btn" aria-label="Add to Wishlist">
                <ion-icon name="heart-outline" />
                <div className="tooltip">Add to Wishlist</div>
              </button>
              <button
                className="product-btn"
                onClick={() => handleClick(props.id)}
                aria-label="Quick View"
              >
                <ion-icon name="eye-outline" />
                <div className="tooltip">Quick View</div>
              </button>
            </div>
          </figure>
          <div className="rating-wrapper">
            <ion-icon name="star" />
            <ion-icon name="star" />
            <ion-icon name="star" />
            <ion-icon name="star" />
            <ion-icon name="star" />
          </div>
          <h3 className="h4 card-title">
            <a href={`/product/${props.id}`}>{props.name}</a>
          </h3>
          <div className="price-wrapper">
            <del className="del">Rs {props.price + 100}</del>
            <data className="price" value={props.price}>
              Rs {props.price}
            </data>
          </div>
          <button className="btn btn-primary" onClick={handleCart}>
            Add to Cart
          </button>
        </div>
      </li>
    </>
  );
};
