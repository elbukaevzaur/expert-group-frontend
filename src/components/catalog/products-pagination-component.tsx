import Image from "next/image";
import {Pageable, PageRequest, PageResponse, Products} from "@/lib/models";
import styles from "@/components/catalog/products-pagination-component.module.css";

interface Props {
    productsPageResponse: PageResponse<Products>,
    onUpdatePageable: (pageable: Pageable) => void,
    onUpdateShowMorePageable: (pageable: Pageable) => void,
    pageRequest: PageRequest
}

export default function ProductsPagination(props: Props) {
    const {onUpdatePageable, onUpdateShowMorePageable} = props;

    const nextPage = () => {
        const page: Pageable = {
            page: (props.pageRequest.page + 1),
            perPage: props.pageRequest.perPage
        }
        onUpdatePageable(page);
    }

    const prevPage = () => {
        const page: Pageable = {
            page: (props.pageRequest.page - 1),
            perPage: props.pageRequest.perPage
        }
        onUpdatePageable(page);
    }

    const selectPage = (selectPage: number) => {
        const page: Pageable = {
            page: selectPage,
            perPage: props.pageRequest.perPage
        }
        onUpdatePageable(page);
    }

    const showMore = () => {
        const page: Pageable = {
            page: (props.pageRequest.page + 1),
            perPage: props.pageRequest.perPage
        }
        onUpdateShowMorePageable(page)
    }

    const createPageButtons = () => {
        const totalPages = props.productsPageResponse.totalPages;
        const currentPage = props.productsPageResponse.page;
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
            {props.pageRequest.page < props.productsPageResponse.totalPages && (
                <button className={styles.more} onClick={showMore}>
                    <h2 className={styles.more_text}>Показать еще</h2>
                </button>
            )}
            <div className={styles.buttons}>
                <button className={styles.button_left} onClick={prevPage} disabled={props.pageRequest.page === 1}>
                    <Image src={'/images/Vector_left.png'} alt="Лево" width={9} height={17} />
                </button>
                {createPageButtons()}
                <button className={styles.button_right} onClick={nextPage} disabled={props.pageRequest.page === props.productsPageResponse.totalPages}>
                    <Image src={'/images/Vector_right.png'} alt="Право" width={9} height={17} />
                </button>
            </div>
        </>
    );
}
