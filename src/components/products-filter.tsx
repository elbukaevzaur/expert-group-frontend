import Image from "next/image";
import {useState} from "react";
import {useAppDispatch} from "@/lib/hooks";
import {ADD_FILTER} from "@/lib/reducers";

export default function ProductsFilter(){
    return(
        <div className="filter">
            <div className="filter__container">
                <div className="filter__container_wrraper">
                    <FilterComponent
                        title='Цена'
                        fieldName="price"
                    />
                    <FilterComponent
                        title='Производитель'
                        fieldName="price"
                    />
                    <FilterComponent
                        title='Высота'
                        fieldName="price"
                    />
                    <FilterComponent
                        title='Ширина'
                        fieldName="price"
                    />
                    <FilterComponent
                        title='Материал'
                        fieldName="price"
                    />
                    <FilterComponent
                        title='Стиль'
                        fieldName="price"
                    />
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
    title: string
    fieldName: string
}

const FilterComponent = (props: FilterProps) => {
    const [isShow, setIsShow] = useState(false);
    const [valueFrom, setValueFrom] = useState("");
    const [valueTo, setValueTo] = useState("");
    const dispatch = useAppDispatch();

    const handleFilterHover = () => {
        setIsShow(!isShow);
    }

    const handleApplyFilter = () => {
        dispatch(ADD_FILTER({ field: props.fieldName, value: [valueFrom, valueTo] }));
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
                    <input value={valueFrom} onChange={(val) => setValueFrom(val.target.value)} title="От"/>
                </div>
                <div>
                    <input value={valueTo} onChange={(val) => setValueTo(val.target.value)} title="До"/>
                </div>
                <div>
                    <button onClick={handleApplyFilter}>Применить</button>
                </div>
            </div>
        </div>
    )
}
