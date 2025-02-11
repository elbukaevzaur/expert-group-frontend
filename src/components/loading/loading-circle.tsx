import styles from './loading-block.module.css';
import {CSSProperties} from "react";

interface Props {
    styles?: CSSProperties
}

export default function LoadingCircle(props: Props) {
    return <div style={props.styles} className={styles.loading_circle}></div>
}