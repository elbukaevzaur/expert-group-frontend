import Image from "next/image";

export default function ProductsFilter(){
    return(
        <div className="filter">
            <div className="filter__container">
                <div className="filter__container_wrraper">
                    <div className="filter__wrraper">
                        <h3 className="filter__text">Цена</h3>
                        <button className="filter_button">
                        <Image src={'/images/Vector_green.png'} alt="Стрелка" width={12} height={7}/>
                        </button>
                    </div>
                    <div className="filter__wrraper">
                        <h3 className="filter__text">Производитель</h3>
                        <button className="filter_button">
                        <Image src={'/images/Vector_green.png'} alt="Стрелка" width={12} height={7}/>
                        </button>
                    </div>
                    <div className="filter__wrraper">
                        <h3 className="filter__text">Высота</h3>
                        <button className="filter_button">
                        <Image src={'/images/Vector_green.png'} alt="Стрелка" width={12} height={7}/>
                        </button>
                    </div>
                    <div className="filter__wrraper">
                        <h3 className="filter__text">Ширина</h3>
                        <button className="filter_button">
                        <Image src={'/images/Vector_green.png'} alt="Стрелка" width={12} height={7}/>
                        </button>
                    </div>
                    <div className="filter__wrraper">
                        <h3 className="filter__text">Материал</h3>
                        <button className="filter_button">
                        <Image src={'/images/Vector_green.png'} alt="Стрелка" width={12} height={7}/>
                        </button>
                    </div>
                    <div className="filter__wrraper">
                        <h3 className="filter__text">Стиль</h3>
                        <button className="filter_button">
                        <Image src={'/images/Vector_green.png'} alt="Стрелка" width={12} height={7}/>
                        </button>
                    </div>
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