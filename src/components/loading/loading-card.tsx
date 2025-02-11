import styles from './loading-block.module.css';

export default function LoadingCard() {
    return <div className={styles.loading_card}>
            <div className={styles.loading_title}></div>
            <div className={styles.loading_text}></div>
        </div>
}