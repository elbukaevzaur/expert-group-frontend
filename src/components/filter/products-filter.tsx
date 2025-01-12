import Image from "next/image";
import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import {REMOVE_ALL_FILTER, REMOVE_FILTER, SORTED, SUB_CATEGORIES_FETCH_REQUESTED} from "@/lib/reducers";
import {FilterProperty, OrderedPageRequest} from "@/lib/models";
import Link from "next/link";
import {FilterComponent} from "@/components/filter/filter-item-component";
import {getTitleByField} from "@/lib/consts";
import {useParams, usePathname} from "next/navigation";
import {useEffect, useState} from "react";
import styles from "@/components/filter/filter.module.css"

export default function ProductsFilter(){
    const { filters, pageRequest } = useAppSelector((state) => state.products);
    const dispatch = useAppDispatch();
    const { subCategories } = useAppSelector((state) => state.categories);
    const pathname = usePathname();
    const params = useParams();
    const [isShowSubCategories, setIsShowSubCategories] = useState(false);

    useEffect(() => {
        if (params.subCategoryId === null || params.subCategoryId === undefined){
            setIsShowSubCategories(true)
        }else {
            setIsShowSubCategories(false)
        }
    }, [params.subCategoryId]);

    useEffect(() => {
        if (params.categoryId !== undefined || params.categoryId !== null){
            dispatch(SUB_CATEGORIES_FETCH_REQUESTED(params.categoryId))
        }
    }, [params.categoryId]);

    const handleApplySorted = (sort: OrderedPageRequest) => {
        dispatch(SORTED(sort));
    }

    const handleRemoveFilter = (filter: FilterProperty) => {
        dispatch(REMOVE_FILTER(filter))
    }

    const handleRemoveAllFilter = () => {
        dispatch(REMOVE_ALL_FILTER())
    }

    return(
        <div>
            {
                isShowSubCategories &&
                subCategories.length > 0 && <div className="subcatalog">
                    {
                        subCategories.map((value, index) => {
                            return <Link href={`${pathname}/${value.id}`} key={index} className="subcatalog__item">
                                <div className="subcatalog__info">
                                    <h3 className="subcatalog__title">{value.name}</h3>
                                    <h4 className="subcatalog__subtitle">{value.productCount} товара</h4>
                                </div>
                                {
                                    value.defaultImage == null ?
                                        <Image className="subcatalog__image" src={'/images/Subcatalog__2.png'}
                                               alt="Карнизы потолочные"
                                               layout="fill" objectFit="contain"/>
                                        :
                                        <img className="subcatalog__image"
                                             src={`${process.env.NEXT_PUBLIC_API_URL}/images/get/product?name=${'small_' + value.defaultImage}`} />
                                }
                            </Link>
                        })
                    }
                </div>
            }
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
                                />
                            })
                        }
                    </div>
                    <div className={`${styles.filter__wrraper} ${styles.products__sorted}`}>
                        <h3 className={styles.filter__text}>Сортировка</h3>
                        <button className={styles.filter_button}>
                        </button>
                        <div className={styles.sorted_container}>
                            <button className={styles.sorted_container_botton} onClick={() => handleApplySorted(
                                {
                                    columnName: 'price',
                                    orderDirection: 'ASC'
                                }
                            )}>По возрастанию цены</button>
                            <button className={styles.sorted_container_botton} onClick={() => handleApplySorted(
                                {
                                    columnName: 'price',
                                    orderDirection: 'DESC'
                                }
                            )}>По убыванию цены</button>
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
                                <button onClick={() => handleRemoveFilter(value)} className={styles.filter_button_list}>
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