import { useState, useEffect } from "react";
import styles from "./ProductCard.module.css";

function ProductCard({
  product,
  onAdd,
  resetFlag,
  resetProducts,
  clearResetProduct,
}) {
  const [quantity, setQuantity] = useState(0);

  const handleAdd = () => {
    setQuantity((q) => q + 1);
    onAdd(product);
  };

  const handleRemove = () => {
    if (quantity > 0) {
      setQuantity((q) => q - 1);
      onAdd({ ...product, quantity: -1 });
    }
  };

  useEffect(() => {
    if (resetFlag) {
      setQuantity(0);
    }
  }, [resetFlag]);

  useEffect(() => {
    if (resetProducts.includes(product.name)) {
      setQuantity(0);
      clearResetProduct(product.name);
    }
  }, [resetProducts, product.name, clearResetProduct]);

  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <img
          src={product.image.thumbnail}
          alt={product.name}
          className={styles.image}
        />
        <div className={styles.controls}>
          {quantity === 0 ? (
            <button onClick={handleAdd} className={styles.addBtn}>
              Add to Cart
            </button>
          ) : (
            <div className={styles.stepper}>
              <button onClick={handleRemove}>−</button>
              <span>{quantity}</span>
              <button onClick={handleAdd}>+</button>
            </div>
          )}
        </div>
      </div>

      <div className={styles.info}>
        <div>
          <h5 className={styles.category}>{product.category}</h5>
        </div>
        <h3 className={styles.title}>{product.name}</h3>
        <p className={styles.price}>${product.price.toFixed(2)}</p>
      </div>
    </div>
  );
}

export default ProductCard;
