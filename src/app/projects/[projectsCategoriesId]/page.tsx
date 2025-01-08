"use client"

import styles from "@/app/projects/[projectsCategoriesId]/projects.module.css"
import Image from "next/image"
import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import {useEffect} from "react";
import {useParams, useRouter} from "next/navigation";

export default function Projects() {
    const { allProjectsCategories } = useAppSelector((state) => state.projectsCategories);
    const dispatch = useAppDispatch();
    const params = useParams();
    const router = useRouter();

    useEffect(() => {
        Number(params.projectsCategoriesId)
    }, [params.projectsCategoriesId]);

    function handleSelectedProjectCategory(id: number) {
        router.push(`/projects/${id}`)
    }

    return (
        <div className={styles.projects}>
            <h2 className={styles.title}>Проекты</h2>
            <div className={styles.filter}>
                {
                    allProjectsCategories.map((item, index) => {
                       return <button
                           key={index}
                           className={`${styles.filter_button} ${item.id.toString() === params.projectsCategoriesId && styles.filter_button_active}`}
                           onClick={() => handleSelectedProjectCategory(item.id)}
                       >
                            {item.name}
                        </button>
                    })
                }
            </div>
            <div className={styles.items}>
                <div className={styles.item}>
                    <Image className={styles.item_image} src={'/images/Project1.png'} alt="Image" width={286} height={201}/>
                    <div className={styles.item_description}>
                        <h2 className={styles.item_title}>Фасадный декор</h2>
                        <p className={styles.item_subtitle}>Грозный, оформление кафе пилястрами</p>
                    </div>
                </div>
                <div className={styles.item}>
                    <Image className={styles.item_image} src={'/images/Project1.png'} alt="Image" width={286} height={201}/>
                    <div className={styles.item_description}>
                        <h2 className={styles.item_title}>Фасадный декор</h2>
                        <p className={styles.item_subtitle}>Грозный, оформление кафе пилястрами</p>
                    </div>
                </div>
                <div className={styles.item}>
                    <Image className={styles.item_image} src={'/images/Project1.png'} alt="Image" width={286} height={201}/>
                    <div className={styles.item_description}>
                        <h2 className={styles.item_title}>Фасадный декор</h2>
                        <p className={styles.item_subtitle}>Грозный, оформление кафе пилястрами</p>
                    </div>
                </div>
                <div className={styles.item}>
                    <Image className={styles.item_image} src={'/images/Project1.png'} alt="Image" width={286} height={201}/>
                    <div className={styles.item_description}>
                        <h2 className={styles.item_title}>Фасадный декор</h2>
                        <p className={styles.item_subtitle}>Грозный, оформление кафе пилястрами</p>
                    </div>
                </div>
                <div className={styles.item}>
                    <Image className={styles.item_image} src={'/images/Project1.png'} alt="Image" width={286} height={201}/>
                    <div className={styles.item_description}>
                        <h2 className={styles.item_title}>Фасадный декор</h2>
                        <p className={styles.item_subtitle}>Грозный, оформление кафе пилястрами</p>
                    </div>
                </div>
                <div className={styles.item}>
                    <Image className={styles.item_image} src={'/images/Project1.png'} alt="Image" width={286} height={201}/>
                    <div className={styles.item_description}>
                        <h2 className={styles.item_title}>Фасадный декор</h2>
                        <p className={styles.item_subtitle}>Грозный, оформление кафе пилястрами</p>
                    </div>
                </div>
                <div className={styles.item}>
                    <Image className={styles.item_image} src={'/images/Project1.png'} alt="Image" width={286} height={201}/>
                    <div className={styles.item_description}>
                        <h2 className={styles.item_title}>Фасадный декор</h2>
                        <p className={styles.item_subtitle}>Грозный, оформление кафе пилястрами</p>
                    </div>
                </div>
                <div className={styles.item}>
                    <Image className={styles.item_image} src={'/images/Project1.png'} alt="Image" width={286} height={201}/>
                    <div className={styles.item_description}>
                        <h2 className={styles.item_title}>Фасадный декор</h2>
                        <p className={styles.item_subtitle}>Грозный, оформление кафе пилястрами</p>
                    </div>
                </div>
            </div>
        </div>
    )
}