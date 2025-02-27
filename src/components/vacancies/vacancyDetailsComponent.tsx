"use client"

import styles from "@/app/vacancy/[slug]/job.module.css";
import {useEffect, useState} from "react";
import {getVacancyDetails} from "@/lib/http/vacanciesRequest";
import {VacanciesResponse} from "@/lib/models/vacancies";
import {handleShare} from "@/components/shareButton";
import {ShareSvg} from "@/lib/icon-svg";
import LoadingText from "@/components/loading/loading-text";

interface Props {
    slug: string
}

export default function VacancyDetailsComponent(props: Props) {
    const { slug } = props;
    const [vacancy, setVacancy] = useState<VacanciesResponse>({} as VacanciesResponse);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getVacancyDetails(slug).then((resp) => {
            setVacancy(resp.data);
            setIsLoading(false);
        })
    }, [slug]);

    return (

        <div className={styles.job}>
            {
                !isLoading ?
                    <h1 className={styles.title}>{vacancy.name} {vacancy.address}</h1>
                    :
                    <LoadingText styles={{width: 'auto', maxWidth: 200, marginBottom: 45}}/>
            }
            <p className={styles.paragraph}><span className={styles.span}>EXPERT GROUP</span> – воплощение мастерства и
                надежности в мире архитектуры, дизайна и строительства.Уже более 8 лет компания успешно создает
                уникальные решения для частных и коммерческих объектов, объединяя все этапы работ – от проектирования до
                полной реализации под ключ.</p>
            <p className={styles.paragraph}>
                {vacancy.description}
            </p>
            {/*<button className={styles.button}>Отправить резюме</button>*/}
            <button
                onClick={() => handleShare(`http://expertgroupholding.ru/vacancy/${vacancy.slug}`, `Expert Group: Вакансия ${vacancy.name}`)}
                className={`${styles.item_button} ${styles.item_button_small}`}>Поделиться {
                <ShareSvg/>}</button>
        </div>
    )
}