import styles from "./loading-block.module.css";

export default function LoadingImage() {
  return (
    <div className={styles.loader_container}>
      <div className={styles.loader}></div>
    </div>
  );
}
