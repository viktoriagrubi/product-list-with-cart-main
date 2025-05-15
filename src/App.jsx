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
  const [resetFlag, setResetFlag] = useState(false);
  const [resetProducts, setResetProducts] = useState([]);

  const handleAdd = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.name === product.name);
      const isRemoval = product.quantity === -1;

      if (existing) {
        if (isRemoval) {
          if (existing.quantity === 1) {
            setResetProducts((r) => [...r, product.name]);
            return prev.filter((item) => item.name !== product.name);
          }
          return prev.map((item) =>
            item.name === product.name
              ? { ...item, quantity: item.quantity - 1 }
              : item
          );
        } else {
          return prev.map((item) =>
            item.name === product.name
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        }
      }

      return isRemoval ? prev : [...prev, { ...product, quantity: 1 }];
    });
  };

  const handleRemove = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.name === product.name);
      if (!existing) return prev;
      if (existing.quantity === 1) {
        setResetProducts((r) => [...r, product.name]);
        return prev.filter((item) => item.name !== product.name);
      }
      return prev.map((item) =>
        item.name === product.name
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
    });
  };

  const handleReset = () => {
    setCart([]);
    setConfirmed(false);
    setResetFlag(true);
    setResetProducts(products.map((p) => p.name));
    setTimeout(() => {
      setResetFlag(false);
      setResetProducts([]);
    }, 100);
  };

  const handleConfirm = () => {
    setConfirmed(true);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    handleReset();
  };

  const clearResetProduct = (productName) => {
    setResetProducts((prev) => prev.filter((name) => name !== productName));
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
              onAdd={handleAdd}
              resetFlag={resetFlag}
              resetProducts={resetProducts}
              clearResetProduct={clearResetProduct}
            />
          ))}
        </div>
        <Cart
          cart={cart}
          onAdd={handleAdd}
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
