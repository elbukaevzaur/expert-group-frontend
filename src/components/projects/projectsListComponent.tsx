"use client"

import styles from "@/app/projects/[projectsCategoriesId]/projects.module.css"
import Image from "next/image"
import {useAppSelector} from "@/lib/hooks";
import React, {useEffect, useState} from "react";
import {useParams, useRouter} from "next/navigation";
import {getAllProjects} from "@/lib/http/projectsRequest";
import {ProjectsListResponse} from "@/lib/models/projects";
import Link from "next/link";
import ListNotContent from "@/components/ListNotContent";

interface Props {
    projectsCategoriesId: string | string[] | undefined,
}

export default function ProjectsList(props: Props) {
    const { allProjectsCategories } = useAppSelector((state) => state.projectsCategories);
    const [projects, setProjects] = useState<ProjectsListResponse[]>([]);
    const router = useRouter();

    useEffect(() => {
        if(props.projectsCategoriesId)
            loadProjects(Number(props.projectsCategoriesId));
        else
            loadProjects();
    }, [props.projectsCategoriesId]);

    function handleSelectedProjectCategory(id?: number) {
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
                    className={`${styles.filter_button} ${undefined === props.projectsCategoriesId && styles.filter_button_active}`}
                    onClick={() => handleSelectedProjectCategory(undefined)}
                >
                    Все
                </button>
                {
                    allProjectsCategories.map((item, index) => {
                        return <button
                            key={index}
                            className={`${styles.filter_button} ${item.id.toString() === props.projectsCategoriesId && styles.filter_button_active}`}
                            onClick={() => handleSelectedProjectCategory(item.id)}
                        >
                            {item.name}
                        </button>
                    })
                }
            </div>
            {
                projects.length == 0 ?
                    <div style={{marginTop: 20}}>
                        <ListNotContent text="Список проектов пуст"/>
                    </div>
                    :
                    <div className={styles.items}>
                        {
                            projects.map((item, index) => {
                                return <Link href={`/projects/${item.projectCategoryId}/details/${item.id}`} key={index}
                                             className={styles.item}>
                                    {
                                        item.defaultImage === null ?
                                            <Image className={styles.item_image} src={'/images/Project1.png'}
                                                   alt="Image"
                                                   width={286}
                                                   height={201}/>
                                            :
                                            <img 
                                                className={styles.item_image} 
                                                width={286} 
                                                height={201}
                                                src={`${process.env.NEXT_PUBLIC_API_URL}/images/get/product?name=${'small_' + item.defaultImage}`}
                                                alt={item.name}
                                            />
                                    }
                                    <div className={styles.item_description}>
                                        <h2 className={styles.item_title}>{item.category.name}</h2>
                                        <p className={styles.item_subtitle}>{item.address}, {item.name}</p>
                                    </div>
                                </Link>
                            })
                        }
                    </div>
            }
        </div>
    )
}