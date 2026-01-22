"use client"

import styles from '@/app/page.module.css';
import { ArrowLeftSvg, ArrowNewSvg } from '@/lib/icon-svg';
import Link from 'next/link';
import Image from 'next/image';
import {Category, OrderItems, PageRequest, PageResponse, Products} from "@/lib/models";
import CategoryListItem from "@/components/catalog/categories/CategoryListItem";
import {ProductsListItemComponent} from "@/components/catalog/products-list-item-component";
import {VideoPreview, VideoShowModal} from "@/app/VideoPlayer";
import {useEffect, useState} from "react";
import {
    getPopularCategories,
    getPopularProducts,
    getPopularProjects,
    getPopularShorts
} from "@/lib/http/popularRequest";
import {ProjectsListResponse} from "@/lib/models/projects";
import {Shorts} from "@/lib/models/shorts";
import {useAppSelector} from "@/lib/hooks";
import SliderComponent from '@/components/slider/slider';

export default function Home() {
    const { orderItems } = useAppSelector((state) => state.basket);
    const { allFavorites } = useAppSelector((state) => state.favorites);
    const [selectedShort, setSelectedShort] = useState<Shorts>({} as Shorts);
    const [isShowVideo, setIsShowVideo] = useState(false);
    const [popularProducts, setPopularProducts] = useState<PageResponse<Products>>({page: 0} as PageResponse<Products>);
    const [popularCategories, setPopularCategories] = useState<PageResponse<Category>>({page: 0} as PageResponse<Category>);
    const [popularProjects, setPopularProjects] = useState<PageResponse<ProjectsListResponse>>({page: 0} as PageResponse<ProjectsListResponse>);
    const [popularShorts, setPopularShorts] = useState<Shorts[]>([]);
    const [windowWidth, setWindowWidth] = useState(0);
  
  useEffect(() => {
    setWindowWidth(window.innerWidth);
    
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const filteredProjects = popularProjects.content?.filter(filter => 
    filter?.defaultImage && 
    popularProjects.content[0]?.defaultImage && 
    filter.defaultImage !== popularProjects.content[0].defaultImage
  ) || [];
  
  // Определяем количество карточек в зависимости от ширины экрана
  const projectsToShow = windowWidth <= 1100 
    ? filteredProjects.slice(0, 2) 
    : filteredProjects.slice(0, 4);

    useEffect(() => {
        loadProducts();
        loadCategories();
        loadProjects();
        loadShorts();
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

    const loadProjects = () => {
        const pageRequestProjects: PageRequest = {
            filters: [],
            orderedColumns: [],
            page: (popularProjects.page + 1)
        }

        getPopularProjects(pageRequestProjects).then((resp) => {
            setPopularProjects({
                ...resp.data,
                content: resp.data.content
            })
        })
    }

    const loadShorts = () => {
        getPopularShorts().then((resp) => {
            setPopularShorts(resp.data)
        })
    }

  return (
    <div className={styles.home}>
        <div className={styles.slider}>
            <SliderComponent/>
        </div>
        <div className={styles.wrapper}>
        <h2 className={styles.title}>Cторисы</h2>
        <div className={styles.videos}>
            {
                popularShorts.map((item, index) => {
                    return <VideoPreview key={index}
                                         posterSrc={item.previewImageName}
                                         title={item.name}
                                         onShowVideo={() => {
                                            setSelectedShort(item);
                                            setIsShowVideo(true);
                                         }}
                    />
                })
            }
        </div>
        
        <h2 className={styles.title}>Наши проекты</h2>
        <Link  href={"/projects"} className={styles.subtitle}>Смотреть все <ArrowNewSvg/></Link>
        {
            popularProjects.content?.length > 0 && popularProjects.content[0] ?
                <div className={styles.projects}>
                    <Link href={`/projects/${popularProjects.content[0]?.projectCategoryId || ''}/details/${popularProjects.content[0]?.id || ''}`} className={styles.item_image}>
                        <Image
                            className={styles.item_image_img}
                            width={597}
                            height={340}
                            src={`${process.env.NEXT_PUBLIC_API_URL || ''}/images/get/product?name=${'large_' + (popularProjects.content[0]?.defaultImage || '')}`}
                            alt={popularProjects.content[0]?.name || ''}
                        />
                        <div className="subcatalog__info">
                            <h3 className={styles.projects__title}>{popularProjects.content[0]?.name || ''}</h3>
                            <h4 className={styles.projects__title}>{popularProjects.content[0]?.address || ''}{popularProjects.content[0]?.category?.name ? `, ${popularProjects.content[0].category.name}` : ''}</h4>
                        </div>
                    </Link>
                    <div className={styles.list_images}>
                        {
                            projectsToShow.map((item, index) => {
                                return <Link href={`/projects/${item?.projectCategoryId || ''}/details/${item?.id || ''}`} key={index} className={`${styles.item_image} ${styles.item_image_small}`}>
                                    <Image
                                       className={styles.list_images_img}
                                       src={`${process.env.NEXT_PUBLIC_API_URL || ''}/images/get/product?name=${'large_' + (item?.defaultImage || '')}`}
                                       alt={item?.name || ''}
                                       width={597}
                                       height={180}
                                    />
                                    {/* <Image layout="responsive" className={styles.list_images_img} src={`${process.env.NEXT_PUBLIC_API_URL}/images/get/product?name=${'small_' + item?.defaultImage}`} alt="test"
                                           width={100} height={100}/> */}
                                    <div className="subcatalog__info">
                                        <h3 className={styles.projects__title_small}>{item?.name || ''}</h3>
                                        <h4 className={styles.projects__title_small}>{item?.address || ''}{item?.category?.name ? `, ${item.category.name}` : ''}</h4>
                                    </div>
                                </Link>
                            })
                        }
                    </div>
                </div>:<div/>
        }

        {
            isShowVideo &&
            <VideoShowModal
                src={`/api/proxy/shorts/video/${selectedShort.fileName}`}
                projectLink={`https://proeg.ru/projects/${selectedShort.project.projectCategoryId}/details/${selectedShort.projectId}`}
                isShow={isShowVideo}
                description={selectedShort.description}
                handleOnClose={() => {
                    setIsShowVideo(false);
                    setSelectedShort({} as Shorts)
                }}
            />
        }
        
        {
            popularCategories.content?.length > 0 &&
            <>
                    <h2 className={styles.title}>Популярные категории</h2>
                    <Link  href={"/catalog"} className={styles.subtitle}>Смотреть все <ArrowNewSvg/></Link>
                    <div className={styles.home_categories}>
                    {
                        popularCategories.content?.slice(0, windowWidth >= 1100 ? 4 : windowWidth >= 700 ? 3 : 2).map((item, index) => {
                            return <CategoryListItem key={index} category={item} customPathname="catalog"/>
                        })
                    }
                </div>
            </>
        }
        {
            popularProducts.content?.length > 0 &&
            <>
              <h2 className={styles.title}>Популярные товары</h2>
                {/* <Link  href={"/projects"} className={styles.subtitle}>Смотреть все <ArrowNewSvg/></Link> */}
              <div className={styles.home__products_list}>
                {
                  popularProducts.content.slice(0, windowWidth >= 1550 ? 5 : windowWidth >= 1250 ? 4 : 3).map((item, index) => {
                    const basketItem = orderItems.find((orderItem: OrderItems) => orderItem.productId === item.id) || null;
                    const isFavorite = allFavorites.hasOwnProperty(item.id);
                    return <ProductsListItemComponent key={index} product={item} basketItem={basketItem} isFavorite={isFavorite} />
                  })
                }
              </div>
                {/* {
                    popularProducts.page < popularProducts.totalPages &&
                    <button onClick={loadProducts} className={styles.home_button}>Показать еще</button>
                } */}
            </>
        }
        </div>
    </div>
  );
}
