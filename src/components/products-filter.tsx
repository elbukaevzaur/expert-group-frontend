import Image from "next/image";
import {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import {ADD_FILTER, REMOVE_ALL_FILTER, REMOVE_FILTER, SORTED} from "@/lib/reducers";
import {FilterProperty, OrderedPageRequest} from "@/lib/models";
import Link from "next/link";

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
                                    fieldName={value.fieldName}
                                    value={value.value}
                                />
                            })
                        }
                    </div>
                    <div className="filter__wrraper">
                        <h3 className="filter__text">Больше фильтров</h3>
                        <button className="filter_button">
                        <Image src={'/images/Vector_green.png'} alt="Стрелка" width={12} height={7}/>
                        </button>
                    </div>
                    <div className="filter__wrraper products__sorted">
                        <h3 className="filter__text">Сортировка</h3>
                        <button className="filter_button">
                        <Image src={'/images/Vector_green.png'} alt="Стрелка" width={12} height={7}/>
                        </button>
                        <div className="sorted-container">
                            <button onClick={() => handleApplySorted(
                                {
                                    columnName: 'price',
                                    orderDirection: 'ASC'
                                }
                            )}>По возрастанию цены</button>
                            <button onClick={() => handleApplySorted(
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
                                    value.value.length > 1 ? `От ${value.value[0]} до ${value.value[1]}` : value.value[0]
                                }</div>
                                <button onClick={() => handleRemoveFilter(value)} className="filter_button">
                                    <Image src={'/images/Delete_button.png'} alt="Удалить" width={16} height={16}/>
                                </button>
                            </div>
                        })
                    }
                    <div className="filter__info filter__info_delete">
                        <div className="filter__info_text">Очистить всё</div>
                        <button onClick={handleRemoveAllFilter} className="filter_button">
                            <Image src={'/images/Delete_button_grey.png'} alt="Удалить" width={16} height={16}/>
                        </button>
                    </div>
                </div>
            }
        </div>
        </div>
    )
}

interface FilterProps {
    title: string,
    fieldName: string,
    value: number[],
}

const FilterComponent = (props: FilterProps) => {
    const [isShow, setIsShow] = useState(false);
    const [valueFrom, setValueFrom] = useState('');
    const [valueTo, setValueTo] = useState('');
    const dispatch = useAppDispatch();

    const handleFilterHover = () => {
        setIsShow(!isShow);
    }

    const handleApplyFilter = () => {
        dispatch(ADD_FILTER({field: props.fieldName, value: [valueFrom, valueTo]}));
    }

    useEffect(() => {
        // setValueFrom(props.value[0]?.toString())
        // setValueTo(props.value[1]?.toString())
    }, [props.value]);

    const onChangeValueFrom = (val: string) => {
        // if (Number(val) >= props.value[0] && Number(val) <= props.value[1]) {
        setValueFrom(val);
        // }
    }

    return (
        <div
            onMouseEnter={handleFilterHover}
            onMouseLeave={handleFilterHover}
            className="filter__wrraper"
        >
            <h3 className="filter__text">{props.title}</h3>
            <button className="filter_button">
                <Image src={'/images/Vector_green.png'} alt="Стрелка" width={12} height={7}/>
            </button>
            <div
                style={{
                    position: 'absolute',
                    zIndex: 999,
                    display: isShow ? 'block' : 'none',
                    flexDirection: 'column'
                }}
            >
                <div>
                    <input min={props.value[0]} max={props.value[1]} placeholder={props.value[0]?.toString()} value={valueFrom} onChange={(val) => onChangeValueFrom(val.target.value)} title="От"/>
                </div>
                <div>
                    <input min={props.value[0]} max={props.value[1]} placeholder={props.value[1]?.toString()} value={valueTo} onChange={(val) => setValueTo(val.target.value)} title="До"/>
                </div>
                <div>
                    <button onClick={handleApplyFilter}>Применить</button>
                </div>
            </div>
        </div>
    )
}
