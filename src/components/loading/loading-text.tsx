import styles from './loading-block.module.css';
import {CSSProperties} from "react";

interface Props {
    styles?: CSSProperties
}

export default function LoadingText(props: Props) {
    return <div style={props.styles} className={styles.loading_text_block}></div>
}