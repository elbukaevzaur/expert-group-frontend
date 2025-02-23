import styles from './loading-block.module.css';
import {CSSProperties} from "react";

interface Props {
    styles?: CSSProperties
    rowCount: number
}

export default function LoadingTableRow(props: Props) {
    const { rowCount} = props;
    const rows = []
    for (let i = 0; i < rowCount; i++) {
        rows[i] = 1;
    }
    return <div className={styles.loading_table_row} style={props.styles}>
            {
                rows.map((row, i) => (
                    <div key={i} className={styles.loading_table_row_column}></div>
                ))
            }
        </div>
}