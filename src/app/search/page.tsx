import { SearchSvg } from '@/lib/icon-svg'
import styles from './search.module.css'
import {Category, OrderItems, PageRequest, PageResponse, Products} from "@/lib/models";

export default function SearchPage() {
    return (
        <div className={styles.page}>
            <h2 className={styles.title}>Поиск-Карниз</h2>
            <div  className={styles.wrapper}>
                <div className={styles.search}>
                    <input type="search"  className={styles.search__input} placeholder='Карниз' />
                    <SearchSvg width={24} height={24} color='rgba(39, 35, 35, 1)'/>
                </div>
                {/* <ProductsFilter/> */}
            </div>
            <div className={styles.grid}>
            </div>
            </div>
    )
}