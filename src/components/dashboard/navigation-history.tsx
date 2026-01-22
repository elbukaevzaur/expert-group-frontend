"use client"

import Link from "next/link";
import Image from "next/image";
import {useParams, usePathname, useRouter} from "next/navigation";
import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import {Fragment, useEffect, useState} from "react";
import {CURRENT_CATEGORY_FETCH_REQUESTED, CURRENT_SUB_CATEGORY_FETCH_REQUESTED} from "@/lib/reducers";
import styles from "@/components/dashboard/navigation-history.module.css"
import {getCategoryBySlug} from "@/lib/http/categoriesRequest";
import {Category, ProductDetailsResponse} from "@/lib/models";
import {getProductDetailsBySlug} from "@/lib/http/productsRequest";

export default function NavigationHistory() {
    const router = useRouter()
    const pathname = usePathname();
    const params = useParams();
    const dispatch = useAppDispatch();
    const [productDetails, setProductDetails] = useState<ProductDetailsResponse>({} as ProductDetailsResponse)
    const [categories, setCategories] = useState<Category[]>([]);





    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (params.categorySlug) {
            if (params && params?.categorySlug[params?.categorySlug?.length - 1].startsWith("product-")) {
                getProductDetailsBySlug(String(params.categorySlug[params.categorySlug?.length - 1].replace("product-", ""))).then((resp) => {
                    setProductDetails(resp.data);
                })
            }else {
                setProductDetails({} as ProductDetailsResponse)
            }
        }
    }, [params]);

    useEffect(() => {
        // A function to fetch all categories in sequence
        const fetchCategoriesSequentially = async () => {
            setLoading(true);
            setError(null);

            const newCategories: Category[] = [];

            // params.categorySlug can be null, check it before running the loop
            if (params.categorySlug && params.categorySlug.length > 0) {
                try {
                    // A for...of loop ensures sequential execution
                    for (const slug of params.categorySlug) {
                        // Using a single API call would be better, but this handles the current structure
                        if (!slug.startsWith("product-")) {
                            const response = await getCategoryBySlug(slug);
                            newCategories.push(response.data);
                        }else {
                            getProductDetailsBySlug(slug.replace("product-", "")).then((resp) => {
                                setProductDetails(resp.data);
                            })
                        }
                    }
                    setCategories(newCategories);
                } catch (err) {
                    console.error("Failed to fetch categories:", err);
                    setError("Failed to load categories. Please try again.");
                    setCategories([]); // Clear state on error
                } finally {
                    setLoading(false);
                }
            } else {
                // If there are no slugs, clear categories and finish loading
                setCategories([]);
                setLoading(false);
            }
        };

        fetchCategoriesSequentially();
    }, [params.categorySlug]);

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
                    } else if (prev_path == 'details') {
                        title = `productDetails`
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


    const getLink = (item: Category)=> {
        let index = categories.indexOf(item)
        let value = ''
        for (;index  > -1;) {
            value = categories[index].slug + '/' + value
            index--
        }
        return value
    }

    return (
        <div className={styles.navigator__wrapper}>
            {/* {
                isBack() &&
                <div className={styles.navigator__back} onClick={router.back}>
                    <button className={styles.navigator__back_button}>
                        <Image src={'/images/Back_button.png'} alt="Назад" width={18} height={14}/>
                    </button>
                    <u className={styles.navigator__back_text}>Назад</u>
                </div>
            } */}
            <h3 className={styles.navigator__back_text}>
                {
                    histories().map((value, index) => {
                        return <Fragment key={index}>
                                {value.title === 'category' && !loading ?
                                    categories?.map((item, indexCategory) => {
                                        return <Fragment
                                            key={indexCategory}
                                        >
                                            <Link
                                                href={`/catalog/${getLink(item)}`}
                                            >
                                                <u
                                                    className={indexCategory != (categories.length - 1) || productDetails.name ? styles.not_active_history_link: styles.active_history_link}
                                                >

                                                    {item.name}
                                                </u>
                                                {indexCategory < (categories.length - 1) && ' / '}
                                            </Link>
                                            {
                                                ((categories.length - 1) == indexCategory && productDetails.name) &&
                                                    <Fragment>
                                                        <span> / </span>
                                                        <u key={index} className={index != (histories().length - 1) ? styles.not_active_history_link: styles.active_history_link}>
                                                            {productDetails.name}
                                                        </u>
                                                    </Fragment>
                                            }
                                        </Fragment>
                                    })
                                    :
                                    <Link href={value.path}>
                                        <u key={index} className={index != (histories().length - 1) ? styles.not_active_history_link: styles.active_history_link}>
                                                {value.title}
                                        </u>
                                        <span> / </span>
                                    </Link>
                                }
                            </Fragment>
                    })
                }
            </h3>
        </div>
    )
}