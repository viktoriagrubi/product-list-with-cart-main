import styles from "./ConfirmationModal.module.css";
import okConfirmed from "../assets/images/icon-order-confirmed.svg";

function ConfirmationModal({ cart, onClose }) {
  const total = cart.reduce((sum, item) => sum + item.quantity * item.price, 0);

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <img src={okConfirmed} alt="accept" />
        <h2 className={styles.title}>Order Confirmed </h2>
        <p className={styles.subtitle}>We home you enjoy your food!</p>

        <ul className={styles.productList}>
          {cart.map((item) => (
            <li key={item.name} className={styles.productItem}>
              <img
                src={item.image.thumbnail}
                alt={item.name}
                className={styles.productImage}
              />
              <div className={styles.productInfo}>
                <h4>{item.name}</h4>
                <p>Quantity: {item.quantity}</p>
                <p>Total: ${(item.quantity * item.price).toFixed(2)}</p>
              </div>
            </li>
          ))}
        </ul>

        <div className={styles.totalRow}>
          <p>Order Total:</p>
          <span>${total.toFixed(2)}</span>
        </div>

        <button onClick={onClose} className={styles.closeBtn}>
          Start New Order
        </button>
      </div>
    </div>
  );
}

export default ConfirmationModal;
