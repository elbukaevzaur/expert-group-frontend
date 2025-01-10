"use client"

import styles from '@/app/projects/[projectsCategoriesId]/details/[projectId]/details.module.css'
import Image from 'next/image'
import React, {useEffect, useState} from "react";
import {useParams} from "next/navigation";
import {getProjectDetails} from "@/lib/http/projectsRequest";
import {ProjectsDetailsResponse} from "@/lib/models/projects";

export default function ProjectDetails() {
    const params = useParams();
    const [project, setProject] = useState<ProjectsDetailsResponse>(null);
    const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);

    useEffect(() => {
        loadProjectDetails(Number(params.projectId))
    }, [params.projectId]);

    function loadProjectDetails(projectId: number) {
        getProjectDetails(projectId).then((resp) => {
            setProject(resp.data)
        })
    }

    useEffect(() => {
        if (project?.defaultImage !== null && project?.defaultImage !== undefined) {
            // const index = project?.images?.map(m => m.imagePath).indexOf(project.defaultImage);
            // setSelectedImageIndex(index)
        } else if (project?.images !== null && project?.images !== undefined){
            setSelectedImageIndex(0)
        }
    }, [project?.defaultImage]);

    function handleShowPrevImage() {
        if (selectedImageIndex > 0) {
            setSelectedImageIndex(selectedImageIndex - 1);
        }
    }

    function handleShowNextImage() {
        if (selectedImageIndex < (project?.images.length - 1)) {
            setSelectedImageIndex(selectedImageIndex + 1);
        }
    }

    return (
        <div className={styles.details}>
            <h2 className={styles.title}>{project?.name}</h2>
            <div className={styles.description}>
                {
                    project?.defaultImage === null ?
                        <Image
                            className={styles.description_image}
                            width={720}
                            height={479}
                            src={'/images/Project_details.png'}
                            alt='image'
                        />
                        :
                        <img
                            className={styles.description_image}
                            width={720}
                            height={479}
                            src={`${process.env.NEXT_PUBLIC_API_URL}/images/get/product?name=${'small_' + project?.defaultImage}`}
                            alt='image'
                        />
                }
                <div className={styles.description_container}>
                    <p className={styles.description_paragraph}>{project?.description}</p>
{/*                    <p className={styles.description_paragraph}>«Заказчики проекта, супружеская пара с уже взрослыми детьми, которые давно мечтали о собственном доме. Хозяева не знали точно, каким именно они представляют свой будущий интерьер, но они определенно не хотели излишней роскоши. Предложенный нами элегантный и лаконичный проект, пришелся по душе нашим героям, буквально, с первого референса», — рассказывает дизайнер Елена Тундас.</p>
                    <div className={styles.description_wrapper}>
                        <button className={`${styles.description_button} ${styles.description_button_green}`}>Заказать проект</button>
                        <button className={styles.description_button}>Написать сообщение</button>
                    </div>*/}
                </div>
            </div>
{/*            <div className={styles.paragraph}>
                <p className={`${styles.paragraph_text} ${styles.paragraph_text_margin}`}>«Планировку дома сильно менять не пришлось — она вполне устраивала заказчиков. Cупруги только попросили отгородить кухню-гостиную от приватной зоны с тремя спальнями, что мы сделали с помощью стеклянной перегородки с дверью в черном металле».</p>
                <p className={styles.paragraph_text}>Хозяйка любит принимать гостей и устраивать домашние вечеринки с музыкой и танцами. Чтобы подчеркнуть жизнерадостную и гостеприимную атмосферу дома, было решено привнести в интерьер яркие акценты в оттенках бургунди. «Так в гостиной появилась акцентная стена фактурой природного камня, собравшая всю красную палитру. С ней перекликается цвет фасадов кухни, расположившейся за деревянной перегородкой. Таким образом нам удалось сохранить целостность пространства».</p>
                <p className={styles.paragraph_text}>Третья спальня получилась брутальной. Можно легко догадаться, что ее хозяин — молодой мужчина. «Старший сын редко приезжает к родителям, поэтому комната чаще служит гостевой. Здесь нам нужно было организовать хранение большого количества спортивных наград. Мы решили сделать черную фактурную стену, переходящую в полки с подсветкой, на которых и расположились трофеи».</p>
                <p className={`${styles.paragraph_text} ${styles.paragraph_text_margin}`}>«В ванной комнате успешно получилось вписать постирочную зону, которая спрятана в шкафу. За дверцами шкафа удалось разместить стиральную и сушильную машину, корзину для белья, полки для хранения принадлежностей».</p>
                <p className={styles.paragraph_text}>Авторы проекта: дизайнер Елена Тундас, т. +7 (918) 279-38-17, elena_tundas</p>
                <p className={styles.paragraph_text}>Фото Алексей Шмуль</p>
                <p className={styles.paragraph_text}>Стиль Мария Шапошникова</p>
            </div>*/}
            <div className={styles.photo}>
                <h3 className={styles.photo_title}>Фотогалерея</h3>
                <div className={styles.photo_wrapper}>
                    {
                        selectedImageIndex !== null ?
                            <img className={styles.photo_image} width={1089} height={1089}
                                 src={`${process.env.NEXT_PUBLIC_API_URL}/images/get/product?name=${'medium_' + project?.images[selectedImageIndex]?.imagePath}`}/>
                            :
                            <Image className={styles.photo_image} src={'/images/Detalis_image.png'} alt="Фото"
                                   width={1089} height={1089}/>
                    }
                    {
                        selectedImageIndex > 0 &&
                        <button className={styles.photo_button_left} onClick={handleShowPrevImage}>
                            <Image src={'/images/Vector_left_img.png'} alt="Влево" width={25} height={41}/>
                        </button>
                    }
                    {
                        selectedImageIndex < (project?.images?.length - 1) &&
                        <button className={styles.photo_button_right} onClick={handleShowNextImage}>
                            <Image src={'/images/Vector_right_img.png'} alt="Влево" width={25} height={41}/>
                        </button>
                    }
                    <div className={styles.swipe}>
                        {
                            project?.images?.map((item, index) => {
                               return <button onClick={() => setSelectedImageIndex(index)} style={{border: 'none', cursor: 'pointer'}} key={index} className={`${styles.swipe_circle} ${index === selectedImageIndex && styles.swipe_circle_active}`}></button>
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}