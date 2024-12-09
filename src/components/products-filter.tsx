import Image from "next/image";
import {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import {ADD_FILTER} from "@/lib/reducers";

export default function ProductsFilter(){
    const { filters } = useAppSelector((state) => state.products);


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

    return(
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
                    <div className="filter__wrraper">
                        <h3 className="filter__text">Сортировка</h3>
                        <button className="filter_button">
                        <Image src={'/images/Vector_green.png'} alt="Стрелка" width={12} height={7}/>
                        </button>
                    </div>
            </div>
            <div className="filter__info_wrraper">
            <div className="filter__info">
                <div className="filter__info_text">Цена: От 100 до 1000</div> 
                <button className="filter_button">
                <Image src={'/images/Delete_button.png'} alt="Удалить" width={16} height={16}/>
                </button>
            </div>
            <div className="filter__info filter__info_delete">
                <div className="filter__info_text">Очистить всё</div> 
                <button className="filter_button">
                <Image src={'/images/Delete_button_grey.png'} alt="Удалить" width={16} height={16}/>
                </button>
            </div>
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
        dispatch(ADD_FILTER({ field: props.fieldName, value: [valueFrom, valueTo] }));
    }

    useEffect(() => {
        setValueFrom(props.value[0]?.toString())
        setValueTo(props.value[1]?.toString())
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
                    <input min={props.value[0]} max={props.value[1]} value={valueFrom} onChange={(val) => onChangeValueFrom(val.target.value)} title="От"/>
                </div>
                <div>
                    <input min={props.value[0]} max={props.value[1]} value={valueTo} onChange={(val) => setValueTo(val.target.value)} title="До"/>
                </div>
                <div>
                    <button onClick={handleApplyFilter}>Применить</button>
                </div>
            </div>
        </div>
    )
}
