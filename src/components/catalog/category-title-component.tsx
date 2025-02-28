import styles from "@/components/catalog/category-title-component.module.css"
import {Category} from "@/lib/models";

interface Props {
    category: Category
}
export default function CategoryTitle(props: Props) {
    const { category } = props;

    return <div className={styles.products__info_wrapper}>
        <h1 className={styles.products__title}>
            {
                category.name
            }
        </h1>
        <div className={styles.products__info}>
            <h3 className={styles.products__info_text}>
                {
                    category.productCount
                }
            </h3>
        </div>
    </div>
}