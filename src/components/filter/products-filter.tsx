import Image from "next/image";
import {useAppDispatch} from "@/lib/hooks";
import {FilterProperty, FiltersResponse, OrderedPageRequest, PageRequest, PageResponse, Products} from "@/lib/models";
import {FilterComponent} from "@/components/filter/filter-item-component";
import {getTitleByField} from "@/lib/consts";
import styles from "@/components/filter/filter.module.css"
import {useEffect, useState} from "react";
import {getAllFilters} from "@/lib/http/filtersRequest";

interface Props {
    categoryId: string | string[] | undefined,
    productsPageResponse: PageResponse<Products>,
    pageRequest: PageRequest
    updateFilter: (filter: FilterProperty) => void,
    updateSort: (filter: OrderedPageRequest) => void,
    updatePerPage: (perPage: number) => void,
    handleRemoveFilter: (filter: FilterProperty) => void,
    onRemoveAllFilter: () => void
}

export default function ProductsFilter(props: Props){
    const [filters, setFilters] = useState<FiltersResponse[]>([]);
    const {pageRequest} = props;

    useEffect(() => {
        getAllFilters(Number(props.categoryId)).then((resp) => {
            setFilters(resp.data);
        })
    }, []);

    const handleApplySorted = (sort: OrderedPageRequest) => {
        props.updateSort(sort);
    }

    const handleApplyPerPage = (perPage: number) => {
        props.updatePerPage(perPage);
    }

    const handleRemoveFilter = (filter: FilterProperty) => {
        props.handleRemoveFilter(filter);
    }

    const handleRemoveAllFilter = () => {
        props.onRemoveAllFilter();
    }

    const perPageValues = [10, 20, 30, 40, 50, 100]

    const orderedColumnsValues: {title: string, columnName: string, orderDirection: string}[] = [
        {
            title: 'По возрастанию цены',
            columnName: 'price',
            orderDirection: 'ASC'
        },
        {
            title: 'По убыванию цены',
            columnName: 'price',
            orderDirection: 'DESC'
        }
    ]

    const handleUpdateFilter = (filter: FilterProperty) => {
        props.updateFilter(filter);
    }

    return(
        <div>
            <div className={styles.filter}>
                <div className={styles.filter__container}>
                    <div className={styles.filter__container_wrraper}>
                        {
                            filters.map((value, index) => {
                                return <FilterComponent
                                    key={index}
                                    title={getTitleByField(value.fieldName)}
                                    filter={value}
                                    applyFilterValues={pageRequest.filters.find(f => f.field == value.fieldName)?.value}
                                    onChangeFilter={handleUpdateFilter}
                                />
                            })
                        }
                    </div>
                    <div className={`${styles.filter__wrraper} ${styles.products__sorted}`}>
                        <h3 className={styles.filter__text}>Показать {props.productsPageResponse.perPage}</h3>
                        <button className={styles.filter_button}>
                        </button>
                        <div className={styles.sorted_container}>
                            {
                                perPageValues.map((value, index) => {
                                    return <button
                                        key={index}
                                        className={`${styles.sorted_container_botton} ${value === props.productsPageResponse.perPage && styles.sorted_container_botton_active}`}
                                        onClick={() => handleApplyPerPage(value)}
                                    >
                                        {value}
                                    </button>
                                })
                            }
                        </div>
                    </div>
                    <div className={`${styles.filter__wrraper} ${styles.products__sorted}`}>
                        <h3 className={styles.filter__text}>
                            Сортировка
                        </h3>
                        <button className={styles.filter_button}>
                        </button>
                        <div className={styles.sorted_container}>
                            {
                                orderedColumnsValues.map((item, index) => {
                                    return <button
                                        key={index}
                                        className={styles.sorted_container_botton}
                                        onClick={() => handleApplySorted(item)}
                                    >
                                        {item.title}
                                    </button>
                                })
                            }
                        </div>
                    </div>
                </div>
                {
                    pageRequest.filters.filter(f => f.field !== 'categoryId').length > 0 &&
                    <div className={styles.filter__info_wrraper}>
                        {
                            pageRequest.filters.filter(f => f.field !== 'categoryId').map((value, index) => {
                                return <div key={index} className={styles.filter__info}>
                                    <div className={styles.filter__info_text}>{value.field}: {
                                        value.operator == 'LESS_GREATER' ? `От ${value.value[0]} до ${value.value[1]}` : value.value.join(', ')
                                    }</div>
                                    <button onClick={() => handleRemoveFilter(value)}
                                            className={styles.filter_button_list}>
                                        <Image src={'/images/Delete_button.png'} alt="Удалить" width={16} height={16}/>
                                    </button>
                                </div>
                            })
                        }
                        <div className={`${styles.filter__info} ${styles.filter__info_delete}`}>
                        <div className={styles.filter__info_text}>Очистить всё</div>
                        <button onClick={handleRemoveAllFilter} className={styles.filter_button_list}>
                            <Image src={'/images/Delete_button_grey.png'} alt="Удалить" width={16} height={16}/>
                        </button>
                    </div>
                </div>
            }
        </div>
        </div>
    )
}