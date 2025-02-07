import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { Pageable } from "@/lib/models";
import { PRODUCTS_FETCH_REQUESTED, PRODUCTS_SHOW_MORE_FETCH_REQUESTED } from "@/lib/reducers";
import styles from "@/components/catalog/products-pagination-component.module.css";

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
        loadProducts(page);
    }

    const prevPage = () => {
        const page: Pageable = {
            page: (pageable.page - 1),
            perPage: pageable.perPage
        }
        loadProducts(page);
    }

    const selectPage = (selectPage: number) => {
        const page: Pageable = {
            page: selectPage,
            perPage: pageable.perPage
        }
        loadProducts(page);
    }

    const showMore = () => {
        const page: Pageable = {
            page: (pageable.page + 1),
            perPage: pageable.perPage
        }
        dispatch(PRODUCTS_SHOW_MORE_FETCH_REQUESTED(page));
    }

    const createPageButtons = () => {
        const totalPages = allProducts.totalPages;
        const currentPage = allProducts.currentPage;
        const visiblePages = 3;

        let pages = [];

        pages.push(1);
        if (currentPage > visiblePages + 2) {
            pages.push("...");
        }

        for (let i = Math.max(currentPage - visiblePages, 2); i <= Math.min(currentPage + visiblePages, totalPages - 1); i++) {
            pages.push(i);
        }

        if (currentPage < totalPages - visiblePages - 1) {
            pages.push("...");
        }
        pages.push(totalPages);

        return pages.map((page, index) => (
            <button
                key={index}
                className={`${styles.button_number} ${page === currentPage ? styles.button_number_active : ""}`}
                onClick={() => typeof page === "number" && selectPage(page)}
                disabled={page === "..."}
            >
                <h3 className={`${styles.button_number_text} ${page === currentPage ? styles.button_number_text_active : ""}`}>
                    {page}
                </h3>
            </button>
        ));
    }

    return (
        <>
            {pageable.page < allProducts.totalPages && (
                <button className={styles.more} onClick={showMore}>
                    <h2 className={styles.more_text}>Показать еще</h2>
                </button>
            )}
            <div className={styles.buttons}>
                <button className={styles.button_left} onClick={prevPage} disabled={pageable.page === 1}>
                    <Image src={'/images/Vector_left.png'} alt="Лево" width={9} height={17} />
                </button>
                {createPageButtons()}
                <button className={styles.button_right} onClick={nextPage} disabled={pageable.page === allProducts.totalPages}>
                    <Image src={'/images/Vector_right.png'} alt="Право" width={9} height={17} />
                </button>
            </div>
        </>
    );
}
