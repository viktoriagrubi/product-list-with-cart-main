import { useState } from "react";
import products from "./data/loadProducts";
import ProductCard from "./components/ProductCard";
import Cart from "./components/Cart";
import ConfirmationModal from "./components/ConfirmationModal";
import styles from "./App.module.css";

function App() {
  const [cart, setCart] = useState([]);
  const [confirmed, setConfirmed] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleProductQuantityChange = (product, isAdd) => {
    const existing = cart.find((item) => item.name === product.name);

    if (!existing && isAdd) {
      setCart([...cart, { ...product, quantity: 1 }]);
      return;
    }

    if (existing) {
      if (!isAdd && existing.quantity === 1) {
        setCart(cart.filter((item) => item.name !== product.name));
      } else {
        const updatedCart = cart.map((item) =>
          item.name === product.name
            ? {
                ...item,
                quantity: isAdd ? item.quantity + 1 : item.quantity - 1,
              }
            : item
        );
        setCart(updatedCart);
      }
    }
  };

  const handleRemove = (product) => {
    const updateCart = cart.filter((cI) => cI.name !== product.name);
    setCart(updateCart);
  };

  const handleReset = () => {
    setCart([]);
    setConfirmed(false);
  };

  const handleConfirm = () => {
    setConfirmed(true);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    handleReset();
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Desserts</h1>
      <div className={styles.layout}>
        <div className={styles.grid}>
          {products.map((product) => (
            <ProductCard
              key={product.name}
              product={product}
              quantity={
                cart.find((cI) => cI.name === product.name)?.quantity || 0
              }
              onAdd={handleProductQuantityChange}
            />
          ))}
        </div>
        <Cart
          cart={cart}
          onRemove={handleRemove}
          onReset={handleReset}
          onConfirm={handleConfirm}
          confirmed={confirmed}
        />
      </div>

      {showModal && (
        <ConfirmationModal cart={cart} onClose={handleModalClose} />
      )}
    </div>
  );
}

export default App;
