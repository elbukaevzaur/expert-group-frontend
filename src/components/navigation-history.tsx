"use client"

import Link from "next/link";
import Image from "next/image";
import {useParams, usePathname, useRouter} from "next/navigation";
import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import {useEffect} from "react";
import {CURRENT_CATEGORY_FETCH_REQUESTED, CURRENT_SUB_CATEGORY_FETCH_REQUESTED} from "@/lib/reducers";

export default function NavigationHistory() {
    const router = useRouter()
    const pathname = usePathname();
    const params = useParams();
    const dispatch = useAppDispatch();
    const { currentCategory, currentSubCategory } = useAppSelector((state) => state.categories);

    useEffect(() => {
        if (params.categoryId !== null && params.categoryId !== undefined) {
            loadCurrentCategory(params.categoryId)
        }
    }, [params.categoryId]);

    useEffect(() => {
        if (params.subCategoryId !== null && params.subCategoryId !== undefined){
            loadCurrentSubCategory(params.subCategoryId)
        }
    }, [params.subCategoryId]);

    const loadCurrentCategory = (categoryId: string | string[] | undefined) => {
        dispatch(CURRENT_CATEGORY_FETCH_REQUESTED(categoryId));
    }

    const loadCurrentSubCategory = (categoryId: string | string[] | undefined) => {
        dispatch(CURRENT_SUB_CATEGORY_FETCH_REQUESTED(categoryId));
    }

    const isBack = (): boolean => {
        if (pathname.split("/").length > 2)
            return true;
        return false;
    }

    const historyes = (): { path: string; title: string }[] => {
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
                default:
                    if (prev_path === 'catalog'){
                        title = `category`
                        prev_path = 'category'
                    } else if (prev_path == 'category') {
                        title = `subCategory`
                    } else if (prev_path == 'details') {
                        title = `Продукт ${value}`
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
        <div className="navigator__wrapper">
            {
                isBack() &&
                <div className="navigator__back" onClick={router.back}>
                    <button className="navigator__back_button">
                        <Image src={'/images/Back_button.png'} alt="Назад" width={18} height={14}/>
                    </button>
                    <u className="navigator__back_text">Назад</u>
                </div>
            }
            <h3 className="navigator__back_text">
                {
                    historyes().map((value, index) => {
                        return <Link key={index} href={value.path}>
                            <u className={index != (historyes().length - 1) ? 'not_active_history_link': 'active_history_link'}>
                                {value.title === 'category'?currentCategory?.name : value.title === 'subCategory' ? currentSubCategory?.name : value.title}
                            </u>
                            {
                                index < (historyes().length - 1) &&
                                <span> / </span>
                            }
                        </Link>
                    })
                }
            </h3>
        </div>
    )
}