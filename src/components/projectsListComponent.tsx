"use client"

import styles from "@/app/projects/[projectsCategoriesId]/projects.module.css"
import Image from "next/image"
import {useAppSelector} from "@/lib/hooks";
import {useEffect, useState} from "react";
import {useParams, useRouter} from "next/navigation";
import {getAllProjects} from "@/lib/http/projectsRequest";
import {ProjectsListResponse} from "@/lib/models/projects";

export default function ProjectsList() {
    const { allProjectsCategories } = useAppSelector((state) => state.projectsCategories);
    const [projects, setProjects] = useState<ProjectsListResponse[]>([]);
    const params = useParams();
    const router = useRouter();

    useEffect(() => {
        if(params.projectsCategoriesId)
            loadProjects(Number(params.projectsCategoriesId));
        else
            loadProjects();
    }, [params.projectsCategoriesId]);

    function handleSelectedProjectCategory(id: number) {
        if (id === undefined)
            router.push(`/projects`)
        else
            router.push(`/projects/${id}`)
    }

    function loadProjects(projectsCategoriesId?: number) {
        getAllProjects(projectsCategoriesId).then((resp) => {
            setProjects(resp.data);
        })
    }

    return (
        <div className={styles.projects}>
            <h2 className={styles.title}>Проекты</h2>
            <div className={styles.filter}>
                <button
                    className={`${styles.filter_button} ${undefined === params.projectsCategoriesId && styles.filter_button_active}`}
                    onClick={() => handleSelectedProjectCategory(undefined)}
                >
                    Все
                </button>
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
                {
                    projects.map((item, index) => {
                        return <div key={index} className={styles.item}>
                            {
                                item.defaultImage === null ?
                                    <Image className={styles.item_image} src={'/images/Project1.png'} alt="Image"
                                           width={286}
                                           height={201}/>
                                    :
                                    <img className={styles.image} width={286} height={201}
                                         src={`${process.env.NEXT_PUBLIC_API_URL}/images/get/product?name=${'small_' + item.defaultImage}`}/>
                            }
                            <div className={styles.item_description}>
                                <h2 className={styles.item_title}>{item.category.name}</h2>
                                <p className={styles.item_subtitle}>{item.address}, {item.name}</p>
                            </div>
                        </div>
                    })
                }
            </div>
        </div>
    )
}