"use client"

import styles from '@/app/vacancy/vacancy.module.css'
import { ShareSvg } from '@/lib/icon-svg'
import Link from 'next/link'
import {useEffect, useState} from "react";
import {getAllVacancies} from "@/lib/http/vacanciesRequest";
import {VacanciesResponse} from "@/lib/models/vacancies";
import {handleShare} from "@/components/shareButton";
import LoadingCard from "@/components/loading/loading-card";
import ListNotContent from "@/components/ListNotContent";

export default function Vacancy() {
    const [vacancies, setVacancies] = useState<VacanciesResponse[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getAllVacancies().then((resp) => {
            setVacancies(resp.data);
            setIsLoading(false)
        })
    }, []);

    function formatPhoneNumber(number: string) {
        const digits = number.toString().replace(/\D/g, ""); // Убираем все нечисловые символы
        return `+7 (${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 8)}-${digits.slice(8)}`;
    }


    return (
        <div className={styles.vacancy}>
            <h1 className={styles.title}>Вакансия</h1>
            <div className={styles.items}>
                {
                    !isLoading ?
                        vacancies.length > 0 ? vacancies.map((item, index) => {
                        return <div key={index} className={styles.item}>
                            <h3 className={styles.item_title}>{item.name}</h3>
                            <p className={styles.item_info}>{item.description}</p>
                            <h4 className={styles.item_number}>Для связи <a href={`tel:+7${item.phoneNumber}`}
                                                                            className={styles.item_phone}>{formatPhoneNumber(item.phoneNumber)}</a></h4>
                            <div className={styles.item_container}>
                                <Link href={`/vacancy/${item.slug}`}>
                                    <button className={styles.item_button}>Смотреть вакансию</button>
                                </Link>
                                <button onClick={() => handleShare(`http://expertgroupholding.ru/vacancy/${item.slug}`, `Expert Group: Вакансия ${item.name}`)} className={`${styles.item_button} ${styles.item_button_small}`}>Поделиться {
                                    <ShareSvg/>}</button>
                            </div>
                        </div>
                    }): <ListNotContent text="Список вакансий пуст"/>
                        :
                        <>
                            <LoadingCard styles={{width: 'auto', maxWidth: 592}}/>
                            <LoadingCard styles={{width: 'auto', maxWidth: 592}}/>
                            <LoadingCard styles={{width: 'auto', maxWidth: 592}}/>
                        </>
                }
            </div>
        </div>
    )
}