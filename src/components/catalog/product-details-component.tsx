"use client"

import Image from "next/image";
import React, {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import {
    CHANGE_FAVORITES_REQUEST
} from "@/lib/reducers";
import Link from "next/link";
import {OrderItems, ProductDetailsResponse} from "@/lib/models";
import {LikeSvg} from "@/lib/icon-svg";
import styles from "./product-details-component.module.css"
import {AddToCartButton, CartItemQuantityDetails} from "@/components/basket/basket-actions";
import {getModelsForProduct, getProductDetailsBySlug} from "@/lib/http/productsRequest";
import {HexagonModelSection} from "@/components/catalog/hexagon-model-section";
import {getUnitTypeTitle} from "@/lib/consts";
import { ArrowLeftSvg } from "@/lib/icon-svg";
import LoadingImage from "../loading/loading-image";
import dynamic from 'next/dynamic';
const TiptapViewerNoSSR = dynamic(
    () => import('../../components/TiptapViewer'),
    { ssr: false }
);

interface Params {
    slug: string
}

export default function ProductDetailsComponent(params: Params) {
    const { isAuth } = useAppSelector((state) => state.auth);
    const { orderItems } = useAppSelector((state) => state.basket);
    const [basketItem, setBasketItem] = useState<OrderItems>({} as OrderItems);
    const { allFavorites } = useAppSelector((state) => state.favorites);
    const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
    const [details, setDetails] = useState<ProductDetailsResponse>({} as ProductDetailsResponse);
    const dispatch = useAppDispatch();
    const [models, setModels] = useState<{id: number, name: string, type: string}[]>([]);
      const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
         fetchData();
    }, [params.slug]);

    const fetchData = async () => {
        getProductDetailsBySlug(params.slug).then((resp) => {
            setDetails(resp.data);
            fetchModels(resp.data.id)
        })
    }

    const fetchModels = (productId: string) => {
        getModelsForProduct(productId).then((resp) => {
            setModels(resp.data)
        })
    }

    useEffect(() => {
        if (details !== null){
            const item = orderItems.find(f => f.productId == details.id);
            if (item !== undefined)
                setBasketItem(item);
            else
                setBasketItem({} as OrderItems);
        }
    }, [orderItems, details]);

    const handleChangeFavorite = () => {
        const request = {
            productId: details?.id
        }
        dispatch(CHANGE_FAVORITES_REQUEST(request))
    }

    useEffect(() => {
        if (details?.defaultImage !== null && details?.defaultImage !== undefined) {
            const index = details?.images.map(m => m.imagePath).indexOf(details.defaultImage);
            setSelectedImageIndex(index)
        } else if (details?.images !== null && details?.images !== undefined){
            setSelectedImageIndex(0)
        }
    }, [details?.defaultImage]);

    const handleImageChange = (index: number) => {
    if (index !== selectedImageIndex) {
      setIsLoading(true);
      setSelectedImageIndex(index);
    }
  };

    function handleShowPrevImage() {
        if (selectedImageIndex > 0) {
            setIsLoading(true);
            setSelectedImageIndex(selectedImageIndex - 1);
        }
    }

    function handleShowNextImage() {
        if (selectedImageIndex < (details?.images.length - 1)) {
            setIsLoading(true);
            setSelectedImageIndex(selectedImageIndex + 1);
        }
    }

    return (
        <section className={styles.details}>
            <h1 className={styles.title}>{details?.name}</h1>
            <div className={styles.info}>
                <div className={styles.container}>
                    <div className={styles.image_wrapper}>
                        {isLoading && <LoadingImage/>}
                        {
                            details?.defaultImage ?
                                <Image
                                    className={styles.image_details}
                                    src={`${process.env.NEXT_PUBLIC_API_URL}/images/get/product?name=${'large_' + details?.images[selectedImageIndex]?.imagePath}`}
                                    alt={details?.name}
                                    width={532}
                                    height={394}
                                    onLoadingComplete={() => {
                                        setIsLoading(false);
                                    }}
                                    onError={() => {
                                      setIsLoading(false);
                                    }}
                                />
                                :
                                ''
                        }
                                               {
                            selectedImageIndex > 0 &&
                            <div style={{cursor: 'pointer'}} onClick={handleShowPrevImage}>
                                <ArrowLeftSvg className={styles.image_left} width={13} height={22}/>
                            </div>
                        }
                        {
                            selectedImageIndex < (details?.images?.length - 1) &&
                            <div style={{cursor: 'pointer'}} onClick={handleShowNextImage}>
                                <ArrowLeftSvg className={styles.image_right} width={13} height={22}/>
                            </div>
                        }
                        {/* {
                            selectedImageIndex !== null && details?.images?.length > 0 ?
                                <img
                                    className={styles.image_details}
                                    src={`${process.env.NEXT_PUBLIC_API_URL}/images/get/product?name=${'large_' + details?.images[selectedImageIndex]?.imagePath}`}
                                    alt={details?.name}
                                />
                                :
                                <Image className={styles.image} src={'/images/image_detalis.png'} alt="Карниз"
                                       width={532} height={394}/>

                        } */}
                        <div className={styles.mini}>
                            {
                                details?.images?.map((item, index) => {
                                    return <div
                                        key={index}
                                        onClick={() => handleImageChange(index)}
                                        className={styles.selected_image}
                                    >
                                        <Image
                                        className={`${styles.mini_image} ${selectedImageIndex === index && styles.mini_image_active}`}
                                        width={50}
                                        height={50}
                                        src={`${process.env.NEXT_PUBLIC_API_URL}/images/get/product?name=${'thumbnail_' + item?.imagePath}`}
                                        alt="img"
                                        />
                                    </div>
                                })

                            }
                        </div>
                    </div>
                    <div className={styles.wrapper}>
                        {
                            (details?.modelLink !== undefined && details?.modelLink !== null && details?.modelLink !== '') ?
                                <Link href={details?.modelLink} className={styles.button_show} target={"_blank"}>
                                    <h3 className={styles.button_show_text}>Посмотреть в 3D</h3>
                                </Link>
                                :
                                <div/>
                        }
                        {
                            isAuth &&
                            <button onClick={handleChangeFavorite}
                                    className={`${styles.button_like} ${!allFavorites.hasOwnProperty(details?.id || 0) && styles.button_not_like}`}>
                                <LikeSvg width={24} height={22}
                                         fill={allFavorites.hasOwnProperty(details?.id || 0) ? '#21A038' : 'white'}
                                         stroke={allFavorites.hasOwnProperty(details?.id || 0) ? 'white' : '#21A038'}
                                />
                                <h3 className={`${styles.button_like_text} ${!allFavorites.hasOwnProperty(details?.id || 0) && styles.button_not_like_text}`}>В
                                    ИЗБРАННОЕ</h3>
                            </button>
                        }
                    </div>
                    <div className={styles.description_container}>
                        <h3 className={styles.product_text_title}>Описание</h3>
                        <TiptapViewerNoSSR content={details?.description} />
                    </div>
                </div>
                <div className={styles.description}>
                    <div>
                        <h3 className={`${styles.description_text} ${styles.description_margin}`}>Характеристики</h3>
                        {
                            details?.material &&
                            <h3 className={styles.description_text}>Материал: {details?.material?.name}</h3>
                        }
                        {
                            details?.height > 0 &&
                            <h3 className={styles.description_text}>Высота, мм: {details?.height}</h3>
                        }
                        {
                            details?.width > 0 &&
                            <h3 className={styles.description_text}>Ширина, мм: {details?.width}</h3>
                        }
                        {
                            details?.length > 0 &&
                            <h3 className={styles.description_text}>Длина, мм: {details?.length} {details?.lengthTo > 0 && '-'+details?.lengthTo}</h3>
                        }
                        {
                            details?.thickness > 0 &&
                            <h3 className={styles.description_text}>Толщина, мм: {details?.thickness}</h3>
                        }
                        {
                            details?.outerDiameter > 0 &&
                            <h3 className={styles.description_text}>Внешний диаметр, мм: {details?.outerDiameter}</h3>
                        }
                    </div>
                    {
                        details.draftImage &&
                        <Image
                            className={styles.description_image}
                            width={130}
                            height={178}
                            src={`${process.env.NEXT_PUBLIC_API_URL}/images/get/product?name=${'thumbnail_' + details.draftImage}`}
                            alt="Характеристики"
                        />
                    }
                </div>
                <div className={styles.price}>
                    <div className={styles.price_buy}>
                        <div className={styles.price_buy_wrraper}>
                            <div className={styles.price_buy_title}>{details?.price} &#8381;{details?.unitType && '/' + getUnitTypeTitle(details?.unitType)}</div>
                            {
                                isAuth &&
                                <button onClick={handleChangeFavorite} className={styles.price_buy_like}>
                                    <LikeSvg width={24} height={22}
                                             fill={allFavorites.hasOwnProperty(details?.id || 0) ? '#21A038' : 'none'}/>
                                </button>
                            }
                        </div>
                        <div className={`${styles.price_buy_wrraper} ${styles.price_buy_margin}`}>
                            {
                                (details?.currentQuantity > 0 || details?.allowOrderWithoutStock) && basketItem?.quantity > 0 ?
                                    <CartItemQuantityDetails productId={details.id} orderItem={basketItem}
                                                             productQuantity={details.currentQuantity}
                                                             allowOrderWithoutStock={details.allowOrderWithoutStock}/>
                                    :
                                    <AddToCartButton productId={details.id} orderItem={basketItem}
                                                     productQuantity={details.currentQuantity}
                                                     allowOrderWithoutStock={details.allowOrderWithoutStock}/>
                            }
                            <div style={{textAlign: 'right'}}>
                                <h2 className={styles.price_buy_subtitle}>
                                    {details?.currentQuantity != undefined && details?.currentQuantity > 0 
                                        ? `Есть в наличии: ${details?.currentQuantity}` 
                                        : details?.allowOrderWithoutStock 
                                            ? '' 
                                            : 'Нет в наличии'}
                                </h2>
                            </div>
                        </div>
                        {
                            basketItem?.quantity > 0 &&
                            <Link href={'/basket'} className={styles.price_button}>
                                <Image src={'/images/Basket_white.png'} alt="Корзина" width={26} height={26}/>
                                <h3 className={styles.price_button_text}>Перейти в корзину</h3>
                            </Link>
                        }
                        {/*                        <button className= {`${styles.price_button} ${styles.price_button_color}`}>
                            <h3 className={`${styles.price_button_text} ${styles.price_button_text_color}`}>Купить в 1
                                клик</h3>
                        </button>*/}
                    </div>
                    <div className={styles.price_info}>
                        <h2 className={`${styles.price_info_text} ${styles.price_info_text_weight}`}>Доставим ваш
                            товар:</h2>
                        <h2 className={styles.price_info_text}>По Москве – 500 руб. (1-2 дня)</h2>
                        <h2 className={styles.price_info_text}>БЕСПЛАТНО – от 5000 руб.</h2>
                        <h2 className={styles.price_info_text}>По России (уточняйте у наших менеджеров)</h2>
                    </div>
                </div>
            </div>

            {
                models.length > 0 &&
                <HexagonModelSection title="3D модели для скачивания" files={models}/>
            }

            {/*<div className={styles.navigator}>
                <button className={styles.navigator_button}>
                    <h3 className={styles.navigator_text}>НАЛИЧИЕ</h3>
                </button>
                <button className={styles.navigator_button}>
                    <h3 className={styles.navigator_text}>ОТЗЫВЫ</h3>
                </button>
                <button className={styles.navigator_button}>
                    <h3 className={styles.navigator_text}>КАК КУПИТЬ</h3>
                </button>
                <button className={styles.navigator_button}>
                    <h3 className={styles.navigator_text}>ОПЛАТА</h3>
                </button>
                <button className={`${styles.navigator_button} ${styles.navigator_button_active}`}>
                    <h3 className={`${styles.navigator_text} ${styles.navigator_text_active}`}>ГАЛЕРЕЯ</h3>
                </button>
                <button className={styles.navigator_button}>
                    <h3 className={styles.navigator_text}>ДОСТАВКА</h3>
                </button>
                <button className={`${styles.navigator_button} ${styles.navigator_button_width}`}>
                    <h3 className={styles.navigator_text}>ОБМЕН И ВОЗВРАТ</h3>
                </button>
            </div>
            <div className={styles.show}>
                <div className={styles.show_wrapper}>
                <Image className={styles.show_image} src={'/images/Detalis_image.png'} alt="Фото" width={1214} height={584}/>
                <button className={styles.show_button_left}>
                    <Image src={'/images/Vector_left_img.png'} alt="Влево" width={25} height={41}/>
                </button>
                <button className={styles.show_button_right}>
                <Image src={'/images/Vector_right_img.png'} alt="Влево" width={25} height={41}/>
                </button>
                </div>
                <div className={styles.swipe}>
                    <div className={styles.swipe_circle}></div>
                    <div className={styles.swipe_circle}></div>
                    <div className={styles.swipe_circle}></div>
                    <div className={`${styles.swipe_circle} ${styles.swipe_circle_active}`}></div>
                    <div className={styles.swipe_circle}></div>
                    <div className={styles.swipe_circle}></div>
                </div>
            </div>*/}
        </section>
    )
}
