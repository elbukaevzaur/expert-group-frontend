import styles from './loading-block.module.css';
import {CSSProperties} from "react";

interface Props {
    styles?: CSSProperties
}

export default function LoadingCard(props: Props) {
    return <div className={styles.loading_card} style={props.styles}>
            <div className={styles.loading_title}></div>
            <div className={styles.loading_text}></div>
        </div>
}