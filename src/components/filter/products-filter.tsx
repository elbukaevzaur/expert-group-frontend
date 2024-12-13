import Image from "next/image";
import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import {REMOVE_ALL_FILTER, REMOVE_FILTER, SORTED} from "@/lib/reducers";
import {FilterProperty, OrderedPageRequest} from "@/lib/models";
import Link from "next/link";
import {FilterComponent} from "@/components/filter/filter-item-component";

export default function ProductsFilter(){
    const { filters, pageRequest } = useAppSelector((state) => state.products);
    const dispatch = useAppDispatch();
    const { subCategories } = useAppSelector((state) => state.categories);

    const getTitleByField = (field: string): string => {
        let title = '';
        switch (field){
            case 'price':
                title = 'Цена';
                break
            case 'width':
                title = 'Ширина';
                break
            case 'height':
                title = 'Высота';
                break
            case 'length':
                title = 'Длина';
                break
            case 'thickness':
                title = 'Толщина';
                break
            case 'outerDiameter':
                title = 'Внешний диаметр';
                break
            case 'material':
                title = 'Материал';
                break
        }
        return title;
    }

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
                subCategories.length > 0 && <div className="subcatalog">
                    {
                        subCategories.map((value, index) => {
                            return <Link href={`/catalog/${value.id}`} key={index} className="subcatalog__item">
                                <div className="subcatalog__info">
                                    <h3 className="subcatalog__title">{value.name}</h3>
                                    <h4 className="subcatalog__subtitle">{value.productCount} товара</h4>
                                </div>
                                <Image className="subcatalog__image" src={'/images/subcatalog__2.png'}
                                       alt="Карнизы потолочные" layout="fill" objectFit="contain"/>
                            </Link>
                        })
                    }
                </div>
            }
            <div className="filter">
                <div className="filter__container">
                    <div className="filter__container_wrraper">
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
                    <div className="filter__wrraper products__sorted">
                        <h3 className="filter__text">Сортировка</h3>
                        <button className="filter_button">
                        </button>
                        <div className="sorted-container">
                            <button className="sorted-container_botton" onClick={() => handleApplySorted(
                                {
                                    columnName: 'price',
                                    orderDirection: 'ASC'
                                }
                            )}>По возрастанию цены</button>
                            <button className="sorted-container_botton" onClick={() => handleApplySorted(
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
                <div className="filter__info_wrraper">
                    {
                        pageRequest.filters.filter(f => f.field !== 'categoryId').map((value, index) => {
                            return <div key={index} className="filter__info">
                                <div className="filter__info_text">{value.field}: {
                                    value.operator == 'LESS_GREATER' ? `От ${value.value[0]} до ${value.value[1]}` : value.value.join(', ')
                                }</div>
                                <button onClick={() => handleRemoveFilter(value)} className="filter_button_list">
                                    <Image src={'/images/Delete_button.png'} alt="Удалить" width={16} height={16}/>
                                </button>
                            </div>
                        })
                    }
                    <div className="filter__info filter__info_delete">
                        <div className="filter__info_text">Очистить всё</div>
                        <button onClick={handleRemoveAllFilter} className="filter_button_list">
                            <Image src={'/images/Delete_button_grey.png'} alt="Удалить" width={16} height={16}/>
                        </button>
                    </div>
                </div>
            }
        </div>
        </div>
    )
}