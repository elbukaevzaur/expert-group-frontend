import {FilterProperty, FiltersResponse} from "@/lib/models";
import {useState} from "react";
import {useAppDispatch} from "@/lib/hooks";
import {ADD_FILTER} from "@/lib/reducers";
import styles from "@/components/filter/filter.module.css"

interface FilterProps {
    title: string,
    applyFilterValues: string[] | undefined,
    filter: FiltersResponse,
    onChangeFilter: (filter: FilterProperty) => void
}

export const FilterComponent = (props: FilterProps) => {
    const [isShow, setIsShow] = useState(false);
    const [valueFrom, setValueFrom] = useState('');
    const [valueTo, setValueTo] = useState('');
    const [valueValid, setValueValid] = useState(true);
    const dispatch = useAppDispatch();

    const handleFilterHover = () => {
        setIsShow(!isShow);
    }

    const handleApplyFilter = () => {
        // dispatch(ADD_FILTER({field: props.filter.fieldName, value: [valueFrom, valueTo], operator: props.filter.operator}));
        props.onChangeFilter({field: props.filter.fieldName, value: [valueFrom, valueTo], operator: props.filter.operator})
    }

    const handleApplyInFilter = (val: number) => {
        if (props.applyFilterValues === undefined){
            // dispatch(ADD_FILTER({field: props.filter.fieldName, value: [val.toString()], operator: props.filter.operator}));
            props.onChangeFilter({field: props.filter.fieldName, value: [val.toString()], operator: props.filter.operator})
        }else if (props.applyFilterValues.indexOf(val.toString()) == -1){
            const fil = [...props.applyFilterValues, val.toString()]
            // dispatch(ADD_FILTER({field: props.filter.fieldName, value: fil, operator: props.filter.operator}));
            props.onChangeFilter({field: props.filter.fieldName, value: fil, operator: props.filter.operator})
        }else {
            // dispatch(ADD_FILTER({field: props.filter.fieldName, value: props.applyFilterValues.filter(f => f !== val.toString()), operator: props.filter.operator}));
            props.onChangeFilter({field: props.filter.fieldName, value: props.applyFilterValues.filter(f => f !== val.toString()), operator: props.filter.operator})
        }
    }

    const onChangeValueFrom = (val: string) => {
        setValueFrom(val);
        validate(val);
    }

    const onChangeValueTo = (val: string) => {
        setValueTo(val);
        validate(val);
    }

    const validate = (val: string) => {
        if (val !== ''){
            const value = Number(val);
            if (value < props.filter.range.min || value > props.filter.range.max) {
                setValueValid(false)
                return;
            }
        }
        setValueValid(true)
    };

    return (
        <div style={{position:'relative'}}
             onMouseEnter={handleFilterHover}
             onMouseLeave={handleFilterHover}
             className={styles.filter__wrraper}
        >
            <h3 className={styles.filter__text}>{props.title}</h3>
            <button className={styles.filter_button}>
            </button>
            <div className={`${styles.filter_button_dropdown} ${styles.filter_button_dropdown_srollbar} ${!valueValid && 'validate_error'}`}
                 style={{
                     position: 'absolute',
                     zIndex: 999,
                     display: isShow ? 'block' : 'none',
                     flexDirection: 'column'
                 }}
            >
                {/*<div className="filter_button_dropdown_range">*/}
                {/*    <input className="filter_button_dropdown_range_input" type="range" />*/}
                {/*</div>*/}

                {
                    props.filter.operator === 'LESS_GREATER' ?
                        <>
                            <div className={styles.filter_button_dropdown_container}>
                                <div>
                                    <h3 className={styles.filter_button_dropdown_text}>Мин. цена</h3>
                                    <input className={styles.filter_button_dropdown_input}
                                           min={props.filter.range.min}
                                           max={props.filter.range.max}
                                           placeholder={props.filter.range.min?.toString()}
                                           value={valueFrom}
                                           onChange={(val) => onChangeValueFrom(val.target.value)}
                                           title="От"
                                    />
                                </div>
                                <div className={styles.filter_button_dropdown_line}></div>
                                <div>
                                    <h3 className={styles.filter_button_dropdown_text}>Макс. цена</h3>
                                    <input className={styles.filter_button_dropdown_input}
                                           min={props.filter.range.min}
                                           max={props.filter.range.max} placeholder={props.filter.range.max?.toString()}
                                           value={valueTo}
                                           onChange={(val) => onChangeValueTo(val.target.value)}
                                           title="До"
                                    />
                                </div>
                            </div>
                            <div>
                                <button className={styles.filter_button_dropdown_botton}
                                        onClick={handleApplyFilter}>Применить
                                </button>
                            </div>
                        </> :
                        props.filter.value.map((item) => {
                            return <div key={item.id} className={styles.filter_button_dropdown_content}>
                                <div className={styles.filter_title_container}>
                                    <div className={styles.filter_button_dropdown_wrapper}>
                                        <input
                                            checked={props.applyFilterValues !== undefined && props.applyFilterValues.includes(item.id.toString())}
                                            onChange={() => handleApplyInFilter(item.id)}
                                            className={styles.filter_button_dropdown_checkbox} type="checkbox" name=""
                                            id={`checkbox-${item.id}`}/>
                                        <label htmlFor={`checkbox-${item.id}`}
                                               className={styles.custom_checkbox}></label>
                                    </div>
                                    <h3 className={styles.filter_button_dropdown_checkbox_text}>{item.name}</h3>
                                </div>
                                <h4 className={styles.filter_button_dropdown_checkbox_quantity}>{item.countResults}</h4>
                            </div>
                        })
                }
            </div>
        </div>
    )
}
