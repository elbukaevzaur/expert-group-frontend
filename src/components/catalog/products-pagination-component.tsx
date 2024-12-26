import Image from "next/image";
import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import {Pageable} from "@/lib/models";
import {PRODUCTS_FETCH_REQUESTED, PRODUCTS_SHOW_MORE_FETCH_REQUESTED} from "@/lib/reducers";
import styles from "@/components/catalog/products-pagination-component.module.css"

export default function ProductsPagination() {
    const { allProducts, pageable } = useAppSelector((state) => state.products);
    const dispatch = useAppDispatch();

    const loadProducts = (pageable: Pageable) => {
        dispatch(PRODUCTS_FETCH_REQUESTED(pageable));
    }

    const nextPage = () => {
        const page: Pageable = {
            page: (pageable.page + 1),
            perPage: pageable.perPage
        }
        loadProducts(page)
    }

    const prevPage = () => {
        const page: Pageable = {
            page: (pageable.page - 1),
            perPage: pageable.perPage
        }
        loadProducts(page)
    }

    const selectPage = (selectPage: number) => {
        const page: Pageable = {
            page: selectPage,
            perPage: pageable.perPage
        }
        loadProducts(page)
    }

    const showMore = () => {
        const page: Pageable = {
            page: (pageable.page + 1),
            perPage: pageable.perPage
        }
        dispatch(PRODUCTS_SHOW_MORE_FETCH_REQUESTED(page));
    }

    return (
        <>
        {
            pageable.page < allProducts.totalPages &&
                <button className={styles.more} onClick={showMore}>
                    <h2 className={styles.more_text}>Показать еще</h2>
                </button>
        }
        <div className={styles.buttons}>
            <button className={styles.button_left} onClick={prevPage}>
                <Image src={'/images/Vector_left.png'} alt="Лево" width={9} height={17}/>
            </button>
            {
                Array.from({length: allProducts.totalPages}, (v, i) => {
                    i++;
                    let buttonClass = styles.button_number;
                    let textClass = styles.button_number_text;
                    if (i == 1) {
                        buttonClass += ` ${styles.button_number_first}`;
                    } else if (i == allProducts.totalPages) {
                        buttonClass += ` ${styles.button_number_last}`;
                    }
                    if (i == allProducts.currentPage) {
                        buttonClass += ` ${styles.button_number_active}`;
                        textClass += ` ${styles.button_number_text_active}`;
                    }
                    return <button className={buttonClass} key={i} onClick={() => selectPage(i)}>
                        <h3 className={textClass}>{i}</h3>
                    </button>
                })
            }
            <button className={styles.button_right} onClick={nextPage}>
                <Image src={'/images/Vector_right.png'} alt="Право" width={9} height={17}/>
            </button>
        </div>
        </>
    )
}