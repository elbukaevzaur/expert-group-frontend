"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { CHANGE_FAVORITES_REQUEST } from "@/lib/reducers";
import Link from "next/link";
import { OrderItems, ProductDetailsResponse } from "@/lib/models";
import { LikeSvg } from "@/lib/icon-svg";
import styles from "./product-details-component.module.css";
import {
  AddToCartButton,
  CartItemQuantityDetails,
} from "@/components/basket/basket-actions";
import {
  getModelsForProduct,
  getProductDetailsBySlug,
} from "@/lib/http/productsRequest";
import { HexagonModelSection } from "@/components/catalog/hexagon-model-section";
import { getUnitTypeTitle } from "@/lib/consts";
import { ArrowLeftSvg } from "@/lib/icon-svg";
import LoadingImage from "../loading/loading-image";
import dynamic from "next/dynamic";
const TiptapViewerNoSSR = dynamic(
  () => import("../../components/TiptapViewer"),
  { ssr: false },
);

interface Params {
  slug: string;
}

export default function ProductDetailsComponent(params: Params) {
  const { isAuth } = useAppSelector((state) => state.auth);
  const { orderItems } = useAppSelector((state) => state.basket);
  const [basketItem, setBasketItem] = useState<OrderItems>({} as OrderItems);
  const { allFavorites } = useAppSelector((state) => state.favorites);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const [details, setDetails] = useState<ProductDetailsResponse>(
    {} as ProductDetailsResponse,
  );
  const dispatch = useAppDispatch();
  const [models, setModels] = useState<
    { id: number; name: string; type: string }[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAllText, setIsAllText] = useState(false);

  useEffect(() => {
    fetchData();
  }, [params.slug]);

  const fetchData = async () => {
    getProductDetailsBySlug(params.slug).then((resp) => {
      setDetails(resp.data);
      fetchModels(resp.data.id);
    });
  };

  const showText = () => {
    setIsAllText(!isAllText);
  };

  const fetchModels = (productId: string) => {
    getModelsForProduct(productId).then((resp) => {
      setModels(resp.data);
    });
  };

  useEffect(() => {
    if (details !== null) {
      const item = orderItems.find((f) => f.productId == details.id);
      if (item !== undefined) setBasketItem(item);
      else setBasketItem({} as OrderItems);
    }
  }, [orderItems, details]);

  const handleChangeFavorite = () => {
    const request = {
      productId: details?.id,
    };
    dispatch(CHANGE_FAVORITES_REQUEST(request));
  };

  useEffect(() => {
    if (details?.defaultImage !== null && details?.defaultImage !== undefined) {
      const index = details?.images
        .map((m) => m.imagePath)
        .indexOf(details.defaultImage);
      setSelectedImageIndex(index);
    } else if (details?.images !== null && details?.images !== undefined) {
      setSelectedImageIndex(0);
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
    if (selectedImageIndex < details?.images.length - 1) {
      setIsLoading(true);
      setSelectedImageIndex(selectedImageIndex + 1);
    }
  }

  const renderPriceBlock = (
    detailsProp: typeof details,
    basketItemProp: typeof basketItem,
    handleFavoriteProp: () => void,
  ) => (
    <div className={styles.price_buy}>
      <div className={styles.price_buy_wrraper}>
        <div className={styles.price_buy_title}>
          {detailsProp?.price} &#8381;
          {detailsProp?.unitType &&
            "/" + getUnitTypeTitle(detailsProp?.unitType)}
        </div>
      </div>
      <div className={styles.price_info}>
        <h2
          className={`${styles.price_info_text} ${styles.price_info_text_weight}`}
        >
          Доставим ваш товар:
        </h2>
        <h2 className={styles.price_info_text}>
          По Москве – 500 руб. (1-2 дня)
        </h2>
        <h2 className={styles.price_info_text}>БЕСПЛАТНО – от 5000 руб.</h2>
        <h2 className={styles.price_info_text}>
          По России (Спросить у менеджера)
        </h2>
      </div>
      <div className={`${styles.price_buy_wrraper} ${styles.price_buy_margin}`}>
        {(detailsProp?.currentQuantity > 0 ||
          detailsProp?.allowOrderWithoutStock) &&
        basketItemProp?.quantity > 0 ? (
          <CartItemQuantityDetails
            productId={detailsProp.id}
            orderItem={basketItemProp}
            productQuantity={detailsProp.currentQuantity}
            allowOrderWithoutStock={detailsProp.allowOrderWithoutStock}
          />
        ) : (
          <AddToCartButton
            productId={detailsProp.id}
            orderItem={basketItemProp}
            productQuantity={detailsProp.currentQuantity}
            allowOrderWithoutStock={detailsProp.allowOrderWithoutStock}
          />
        )}
      </div>
      <button
        onClick={handleFavoriteProp}
        className={`${styles.price_button} ${styles.price_button_color}`}
      >
        {allFavorites.hasOwnProperty(detailsProp?.id || 0)
          ? "В избранном"
          : "В избранное"}
        <LikeSvg
          width={24}
          height={22}
          fill={
            allFavorites.hasOwnProperty(detailsProp?.id || 0)
              ? "#21A038"
              : "none"
          }
        />
      </button>
    </div>
  );

  return (
    <section className={styles.details}>
      <div className={styles.info}>
        <div className={styles.container}>
          <div className={styles.content}>
            {/* <div className=""> */}
            <div className={styles.image_wrapper}>
              {isLoading && <LoadingImage />}
              {details?.defaultImage ? (
                <Image
                  className={`${styles.image_details} ${details.draftImage ? styles.image_details_padding : ""}`}
                  src={`${process.env.NEXT_PUBLIC_API_URL}/images/get/product?name=${"large_" + details?.images[selectedImageIndex]?.imagePath}`}
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
              ) : (
                ""
              )}
              {selectedImageIndex > 0 && (
                <div
                  style={{ cursor: "pointer" }}
                  onClick={handleShowPrevImage}
                >
                  <ArrowLeftSvg
                    className={styles.image_left}
                    width={13}
                    height={22}
                  />
                </div>
              )}
              {selectedImageIndex < details?.images?.length - 1 && (
                <div
                  style={{ cursor: "pointer" }}
                  onClick={handleShowNextImage}
                >
                  <ArrowLeftSvg
                    className={styles.image_right}
                    width={13}
                    height={22}
                  />
                </div>
              )}
              <div className={styles.mini}>
                {details?.images?.map((item, index) => {
                  return (
                    <div
                      key={index}
                      onClick={() => handleImageChange(index)}
                      className={styles.selected_image}
                    >
                      <Image
                        className={`${styles.mini_image} ${selectedImageIndex === index && styles.mini_image_active}`}
                        width={50}
                        height={50}
                        src={`${process.env.NEXT_PUBLIC_API_URL}/images/get/product?name=${"thumbnail_" + item?.imagePath}`}
                        alt="img"
                      />
                    </div>
                  );
                })}
              </div>
            </div>
            {details.draftImage && (
              <div
                className={`${styles.description_container} ${styles.description_container_desct}`}
              >
                <h3 className={styles.product_text_title}>Описание</h3>
                <TiptapViewerNoSSR content={details?.description} />
              </div>
            )}
          </div>
          {/* </div> */}
          <div className={`${styles.price} ${styles.price_mobil}`}>
            {renderPriceBlock(details, basketItem, handleChangeFavorite)}
          </div>
          <div className={styles.description}>
            <h1 className={styles.title}>{details?.name}</h1>
            <div className={styles.description}>
              <h3 className={`${styles.description_text}`}>Характеристики</h3>
              {details?.material && (
                <div className={styles.buy_contain}>
                  <h4 className={styles.buy_subtitle}>Материал</h4>
                  <span className={styles.dots}>
                    ..........................................................................................................
                  </span>
                  <h4 className={styles.buy_subtitle}>
                    {details?.material?.name}
                  </h4>
                </div>
              )}
              {details?.height > 0 && (
                <div className={styles.buy_contain}>
                  <h4 className={styles.buy_subtitle}>Высота</h4>
                  <span className={styles.dots}>
                    ..........................................................................................................
                  </span>
                  <h4 className={styles.buy_subtitle}>{details?.height} мм</h4>
                </div>
              )}
              {details?.width > 0 && (
                <div className={styles.buy_contain}>
                  <h4 className={styles.buy_subtitle}>Ширина</h4>
                  <span className={styles.dots}>
                    ..........................................................................................................
                  </span>
                  <h4 className={styles.buy_subtitle}>{details?.width} мм</h4>
                </div>
              )}
              {details?.length > 0 && (
                <div className={styles.buy_contain}>
                  <h4 className={styles.buy_subtitle}>Длина</h4>
                  <span className={styles.dots}>
                    ..........................................................................................................
                  </span>
                  <h4 className={styles.buy_subtitle}>
                    {details?.length}{" "}
                    {details?.lengthTo > 0 && "-" + details?.lengthTo} мм
                  </h4>
                </div>
              )}
              {details?.thickness > 0 && (
                <div className={styles.buy_contain}>
                  <h4 className={styles.buy_subtitle}>Толщина</h4>
                  <span className={styles.dots}>
                    ..........................................................................................................
                  </span>
                  <h4 className={styles.buy_subtitle}>
                    {details?.thickness} мм
                  </h4>
                </div>
              )}
              {details?.outerDiameter > 0 && (
                <div className={styles.buy_contain}>
                  <h4 className={styles.buy_subtitle}>Внешний диаметр</h4>
                  <span className={styles.dots}>
                    ..........................................................................................................
                  </span>
                  <h4 className={styles.buy_subtitle}>
                    {details?.outerDiameter} мм
                  </h4>
                </div>
              )}
            </div>
            {details.draftImage ? (
              <Image
                className={styles.description_image}
                width={130}
                height={178}
                src={`${process.env.NEXT_PUBLIC_API_URL}/images/get/product?name=${"thumbnail_" + details.draftImage}`}
                alt="Характеристики"
              />
            ) : (
              <div className={styles.description_container}>
                <div
                  className={`${styles.description_wrapper} ${isAllText && styles.description_show}`}
                >
                  <h3 className={styles.product_text_title}>Описание</h3>
                  <TiptapViewerNoSSR content={details?.description} />
                </div>
                <button
                  onClick={showText}
                  className={styles.description_button}
                >
                  {isAllText ? "Свернуть" : "Читать полностью"}
                </button>
              </div>
            )}

            {models.length > 0 && (
              <HexagonModelSection
                title="3D модели для скачивания"
                files={models}
              />
            )}
          </div>
          {details.draftImage && (
            <div
              className={`${styles.description_container} ${styles.description_container_mobil}`}
            >
              <h3 className={styles.product_text_title}>Описание</h3>
              <TiptapViewerNoSSR content={details?.description} />
            </div>
          )}
        </div>
        <div className={`${styles.price} ${styles.price_desk}`}>
          {renderPriceBlock(details, basketItem, handleChangeFavorite)}
        </div>
        {/* <div className={styles.price}>
                    <div className={styles.price_buy}>
                        <div className={styles.price_buy_wrraper}>
                            <div className={styles.price_buy_title}>{details?.price} &#8381;{details?.unitType && '/' + getUnitTypeTitle(details?.unitType)}</div>
                        </div>
                        <div className={styles.price_info}>
                        <h2 className={`${styles.price_info_text} ${styles.price_info_text_weight}`}>Доставим ваш
                            товар:</h2>
                        <h2 className={styles.price_info_text}>По Москве – 500 руб. (1-2 дня)</h2>
                        <h2 className={styles.price_info_text}>БЕСПЛАТНО – от 5000 руб.</h2>
                        <h2 className={styles.price_info_text}>По России (Спросить у менеджеров)</h2>
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
                        </div>
                        <button onClick={handleChangeFavorite} className={`${styles.price_button} ${styles.price_button_color}`}>
                            {allFavorites.hasOwnProperty(details?.id || 0)? 'В избранном' : 'В избранное'}                            
                            <LikeSvg width={24} height={22}
                                             fill={allFavorites.hasOwnProperty(details?.id || 0) ? '#21A038' : 'none'}/>
                        </button>
                    </div>
                    
                </div> */}
      </div>
    </section>
  );
}
