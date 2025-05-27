import styles from "./ProductCard.module.css";

function ProductCard({ product, onAdd, quantity }) {
  const handleAdd = () => {
    onAdd(product, true);
  };

  const handleRemove = () => {
    onAdd(product, false);
  };

  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <img
          src={product.image.desktop}
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
