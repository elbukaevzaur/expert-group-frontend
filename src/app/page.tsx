"use client"

import styles from '@/app/page.module.css';
import { ArrowLeftSvg } from '@/lib/icon-svg';
import Link from 'next/link';
import Image from 'next/image';
import {Category, PageRequest, PageResponse, Products} from "@/lib/models";
import CategoryListItem from "@/components/catalog/categories/CategoryListItem";
import {ProductsListItemComponent} from "@/components/catalog/products-list-item-component";
import VideoPlayer, {VideoPreview, VideoShowModal} from "@/app/VideoPlayer";
import {useEffect, useState} from "react";
import {getPopularCategories, getPopularProducts} from "@/lib/http/popularRequest";

export default function Home() {
    const [showVideoSource, setShowVideoSource] = useState('');
    const [isShowVideo, setIsShowVideo] = useState(false);
    const [popularProducts, setPopularProducts] = useState<PageResponse<Products>>({page: 0} as PageResponse<Products>);
    const [popularCategories, setPopularCategories] = useState<PageResponse<Category>>({page: 0} as PageResponse<Category>);

  const categories: Category[] = [
    { id: 1, defaultImage: null, name: 'Category 1', slug: 'slug1', productCount: 10},
    { id: 2, defaultImage: null, name: 'Category 2', slug: 'slug1', productCount: 10},
    { id: 3, defaultImage: null, name: 'Category 3', slug: 'slug1', productCount: 10},
    { id: 4, defaultImage: null, name: 'Category 4',slug: 'slug1', productCount: 10},
    { id: 5, defaultImage: null, name: 'Category 5',slug: 'slug1', productCount: 10},
    { id: 6, defaultImage: null, name: 'Category 6',slug: 'slug1', productCount: 10},
  ]

  const products: Products[] = [
    { id: 1, name: 'Product 1', slug: 'slug1', price: 100, currentQuantity: 10, categoryId: 1, parentCategoryId: 2, defaultImage: null},
      { id: 1, name: 'Product 1', slug: 'slug1', price: 100, currentQuantity: 10, categoryId: 1, parentCategoryId: 2, defaultImage: null},
    { id: 2, name: 'Product 2', slug: 'slug1', price: 100, currentQuantity: 10, categoryId: 1, parentCategoryId: 2, defaultImage: null},
    { id: 3, name: 'Product 3', slug: 'slug1', price: 100, currentQuantity: 10, categoryId: 1, parentCategoryId: 2, defaultImage: null},
    { id: 4, name: 'Product 4', slug: 'slug1', price: 100, currentQuantity: 10, categoryId: 1, parentCategoryId: 2, defaultImage: null},
    { id: 5, name: 'Product 5', slug: 'slug1', price: 100, currentQuantity: 10, categoryId: 1, parentCategoryId: 2, defaultImage: null},
    { id: 6, name: 'Product 6', slug: 'slug1', price: 100, currentQuantity: 10, categoryId: 1, parentCategoryId: 2, defaultImage: null},
    { id: 7, name: 'Product 7', slug: 'slug1', price: 100, currentQuantity: 10, categoryId: 1, parentCategoryId: 2, defaultImage: null},
    { id: 8, name: 'Product 8', slug: 'slug1', price: 100, currentQuantity: 10, categoryId: 1, parentCategoryId: 2, defaultImage: null},
    { id: 9, name: 'Product 9', slug: 'slug1', price: 100, currentQuantity: 10, categoryId: 1, parentCategoryId: 2, defaultImage: null},
  ]

    const project = {name: 'Грозный, оформление кафе пилястрами', defaultImage: null, category: 'Фасадный декор', city: 'Грозный'};
  const projects = [
    {name: 'Дизайн интерьера в оттенках бургунди в Краснодарском крае', defaultImage: null, category: 'Фасадный декор', city: 'Грозный'},
    {name: 'Дизайн интерьера в оттенках бургунди в Краснодарском крае', defaultImage: null, category: 'Фасадный декор', city: 'Грозный'},
    {name: 'Дизайн интерьера в оттенках бургунди в Краснодарском крае', defaultImage: null, category: 'Фасадный декор', city: 'Грозный'},
    {name: 'Дизайн интерьера в оттенках бургунди в Краснодарском крае', defaultImage: null, category: 'Фасадный декор', city: 'Грозный'},
  ]

    useEffect(() => {
        loadProducts();
        loadCategories();
    }, []);

  const loadProducts = () => {
      const pageRequestProducts: PageRequest = {
          filters: [],
          orderedColumns: [],
          page: (popularProducts.page + 1)
      }
      getPopularProducts(pageRequestProducts).then((resp) => {
          setPopularProducts({
              ...resp.data,
              content: popularProducts.content?.length > 0 ? [...popularProducts.content, ...resp.data.content] : resp.data.content
          })
      })
  }

  const loadCategories = () => {
      const pageRequestCategories: PageRequest = {
          filters: [],
          orderedColumns: [],
          page: (popularCategories.page + 1)
      }

      getPopularCategories(pageRequestCategories).then((resp) => {
          setPopularCategories({
              ...resp.data,
              content: popularCategories.content?.length > 0 ? [...popularCategories.content, ...resp.data.content] : resp.data.content
          })
      })
  }

  return (
    <div className={styles.home}>
      <div className={styles.projects}>
          <Link href={"/"} className={styles.item_image}>
              <Image className={styles.item_image_img} src={"/images/Project_details.png"} alt="test" width={100} height={100}/>
              <div className={styles.description}>
                  <span className={styles.description_category}>Фасадный декор</span>
                  <span className={styles.description_name}>Грозный, оформление кафе пилястрами</span>
              </div>
          </Link>
          <div className={styles.list_images}>
              {
                  projects.map((item, index) => {
                      return <Link href={"/"} key={index} className={styles.item_image}>
                          <Image className={styles.list_images_img} src={"/images/Project_details.png"} alt="test"
                                 width={100} height={100}/>
                          <div className={styles.description_small}>
                              <span className={styles.description_category_small}>Фасадный декор</span>
                              <span className={styles.description_name_small}>Грозный, оформление кафе пилястрами</span>
                          </div>
                      </Link>
                  })
              }
          </div>
      </div>
        {
            isShowVideo &&
            <VideoShowModal
                src={showVideoSource}
                onClose={() => {
                    setIsShowVideo(false);
                    setShowVideoSource('')
                }}
            />
        }
        <div className={styles.videos} style={{display: 'flex', flexDirection: 'row', gap: 20, marginTop: 20, marginBottom: 40}}>
            <div style={{width: 186}}>
                <VideoPreview onShowVideo={() => {
                    setShowVideoSource('http://localhost:8080/videos/video1.mp4')
                    setIsShowVideo(true);
                }}/>
            </div>
            <div style={{width: 186}}>
                <VideoPreview onShowVideo={() => {
                    setShowVideoSource('http://localhost:8080/videos/video1.mp4')
                    setIsShowVideo(true);
                }}/>
            </div>
            <div style={{width: 186}}>
                <VideoPreview onShowVideo={() => {
                    setShowVideoSource('http://localhost:8080/videos/video1.mp4')
                    setIsShowVideo(true);
                }}/>
            </div>
            <div style={{width: 186}}>
                <VideoPreview onShowVideo={() => {
                    setShowVideoSource('http://localhost:8080/videos/video1.mp4')
                    setIsShowVideo(true);
                }}/>
            </div>
            <div style={{width: 186}}>
                <VideoPreview onShowVideo={() => {
                    setShowVideoSource('http://localhost:8080/videos/video1.mp4')
                    setIsShowVideo(true);
                }}/>
            </div>
            <div style={{width: 186}}>
                <VideoPreview onShowVideo={() => {
                    setShowVideoSource('http://localhost:8080/videos/video1.mp4')
                    setIsShowVideo(true);
                }}/>
            </div>
        </div>
        {
            popularCategories.content?.length > 0 &&
            <>
                <div className={styles.home__wrapper}>
                    <h2 className={styles.home__title}>Популярные категории</h2>
                    <Link href={"/catalog"} className={styles.home__title_link}>
                        <p className={styles.home__title_subtitle}>Весь каталог</p>
                        <ArrowLeftSvg className={styles.home_svg} fill={'#21A038'} width={9} height={16}/>
                    </Link>
                </div>
                <div className={styles.home_categories}>
                    {
                        popularCategories.content?.map((item, index) => {
                            return <CategoryListItem key={index} category={item} />
                        })
                    }
                </div>
            </>
        }
        {
            popularProducts.content?.length > 0 &&
            <>
              <h2 className={styles.home__title}>Популярные товары</h2>
              <div className={styles.home__products_list}>
                {
                  popularProducts.content.map((item, index) => {
                    return <ProductsListItemComponent key={index} product={item} basketItem={null} isFavorite={false} />
                  })
                }
              </div>
                {
                    popularProducts.page < popularProducts.totalPages &&
                    <button onClick={loadProducts} className={styles.home_button}>Показать еще</button>
                }
            </>
        }
      <h2 className={styles.home__title}>Партнеры</h2>
        <div className={styles.home__partners}>
          <Image src={'/images/Home1.png'} alt='Docker' width={282} height={90}/>
          <Image src={'/images/Home2.png'} alt='Grasaro' width={282} height={90}/>
          <Image src={'/images/Home3.png'} alt='Grand Line' width={282} height={90}/>
          <Image src={'/images/Home4.png'} alt='Brayer' width={282} height={90}/>
          <Image src={'/images/Home5.png'} alt='Ariston' width={282} height={90}/>
          <Image src={'/images/Home6.png'} alt='Denzel' width={282} height={90}/>
          <Image src={'/images/Home7.png'} alt='Welte Home' width={282} height={90}/>
          <Image src={'/images/Home8.png'} alt='Arya home' width={282} height={90}/>
        </div>
    </div>
  );
}
