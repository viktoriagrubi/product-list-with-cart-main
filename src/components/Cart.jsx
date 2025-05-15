import styles from "./Cart.module.css";
import emptyCartImage from "../assets/images/illustration-empty-cart.svg";

function Cart({ cart, onRemove, onConfirm, confirmed }) {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <aside className={styles.cart}>
      <h2 className={styles.heading}>
        Your Cart <span className={styles.count}>({totalItems})</span>
      </h2>

      {cart.length === 0 ? (
        <div className={styles.empty}>
          <img
            src={emptyCartImage}
            alt="Empty cart"
            className={styles.emptyImage}
          />
          <p className={styles.emptyText}>Your added items will appear here</p>
        </div>
      ) : (
        <>
          <ul className={styles.list}>
            {cart.map((item) => (
              <li key={item.name} className={styles.item}>
                <div className={styles.itemInfo}>
                  <strong>{item.name}</strong>
                  <div className={styles.priceLine}>
                    <span className={styles.quantity}>{item.quantity}x</span>
                    <span className={styles.unit}>
                      @ ${item.price.toFixed(2)}
                    </span>
                    <span className={styles.total}>
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
                <button
                  className={styles.removeBtn}
                  onClick={() => onRemove(item)}
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>

          <div className={styles.totalRow}>
            <span>Order Total</span>
            <strong>${total.toFixed(2)}</strong>
          </div>

          <div className={styles.deliveryNote}>
            <span role="img" aria-label="leaf">
              🌿
            </span>{" "}
            This is a <strong>carbon-neutral</strong> delivery
          </div>

          <button className={styles.confirm} onClick={onConfirm}>
            Confirm Order
          </button>

          {confirmed && (
            <div className={styles.confirmation}>✅ Order Confirmed!</div>
          )}
        </>
      )}
    </aside>
  );
}

export default Cart;
