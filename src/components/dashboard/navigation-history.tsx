"use client"

import Link from "next/link";
import Image from "next/image";
import {useParams, usePathname, useRouter} from "next/navigation";
import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import {useEffect, useState} from "react";
import {CURRENT_CATEGORY_FETCH_REQUESTED, CURRENT_SUB_CATEGORY_FETCH_REQUESTED} from "@/lib/reducers";
import styles from "@/components/dashboard/navigation-history.module.css"
import {getCategoryBySlug} from "@/lib/http/categoriesRequest";
import {Category} from "@/lib/models";

export default function NavigationHistory() {
    const router = useRouter()
    const pathname = usePathname();
    const params = useParams();
    const dispatch = useAppDispatch();
    const [category, setCategory] = useState<Category>({} as Category);
    const [subCategory, setSubCategory] = useState<Category>({} as Category);

    useEffect(() => {
        if (params.categorySlug !== null && params.categorySlug !== undefined) {
            loadCurrentCategory(String(params.categorySlug))
        }
    }, [params.categorySlug]);

    useEffect(() => {
        if (params.subCategorySlug !== null && params.subCategorySlug !== undefined){
            loadCurrentSubCategory(String(params.subCategorySlug))
        }
    }, [params.subCategorySlug]);

    const loadCurrentCategory = (slug: string) => {
        getCategoryBySlug(slug).then((resp) => {
            setCategory(resp.data);
        })
    }

    const loadCurrentSubCategory = (slug: string) => {
        getCategoryBySlug(slug).then((resp) => {
            setSubCategory(resp.data);
        })
    }

    const isBack = (): boolean => {
        return pathname.split("/").length > 2;
    }

    const histories = (): { path: string; title: string }[] => {
        const parts = pathname.split("/").filter(Boolean);
        if (parts.length !== 0 && parts[0].length > 1){
            parts.unshift('')
        }
        let prev_path = '';
        return parts.reduce((acc, value, index) => {
            let title = value;
            let isAdd = true;
            switch (value) {
                case '':
                    title = 'Главная';
                    break;
                case 'basket':
                    prev_path = value;
                    title = 'Корзина';
                    break;
                case 'catalog':
                    prev_path = value;
                    title = 'Каталог';
                    break;
                case 'details':
                    prev_path = value;
                    isAdd = false;
                    break;
                case 'lk':
                    title = 'Личный кабинет'
                    break;
                case 'buy':
                    title = 'Оформление заказа'
                    break;
                default:
                    if (prev_path === 'catalog'){
                        title = `category`
                        prev_path = 'category'
                    } else if (prev_path == 'category') {
                        title = `subCategory`
                    } else if (prev_path == 'details') {
                        title = `${value}`
                    } else {
                        isAdd = false
                    }
                    break;
            }
            if (isAdd){
                if (parts.length > 1 && index === 0){
                    acc.push({ path: `/`, title });
                }else {
                    const fullPath = parts.slice(0, index + 1).join("/");
                    acc.push({ path: `${fullPath}`, title });
                }
            }
            return acc;
        }, [] as { path: string; title: string }[]);
    };

    return (
        <div className={styles.navigator__wrapper}>
            {
                isBack() &&
                <div className={styles.navigator__back} onClick={router.back}>
                    <button className={styles.navigator__back_button}>
                        <Image src={'/images/Back_button.png'} alt="Назад" width={18} height={14}/>
                    </button>
                    <u className={styles.navigator__back_text}>Назад</u>
                </div>
            }
            <h3 className={styles.navigator__back_text}>
                {
                    histories().map((value, index) => {
                        return <Link key={index} href={value.path}>
                            <u className={index != (histories().length - 1) ? styles.not_active_history_link: styles.active_history_link}>
                                {value.title === 'category'?category?.name : value.title === 'subCategory' ? subCategory?.name : value.title}
                            </u>
                            {
                                index < (histories().length - 1) &&
                                <span> / </span>
                            }
                        </Link>
                    })
                }
            </h3>
        </div>
    )
}