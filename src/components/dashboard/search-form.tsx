import styles from "@/components/dashboard/dashboard.module.css";
import Link from "next/link";
import Image from "next/image";
import {getProductsFullTextSearch} from "@/lib/http/productsRequest";
import React, {useState, useEffect, useCallback} from "react";
import {CloseSvg, SearchSvg} from "@/lib/icon-svg";
import {motion} from "framer-motion";
import {useSearchParams, useRouter, usePathname} from "next/navigation";

interface SearchProducts {
    id: string
    name: string
    description: string
    slug: string
    price: number
    defaultImage: string
    currentQuantity: number
    allowOrderWithoutStock: boolean
    category: {
        id: number
        name: string
        slug: string
        parentId: number
        parentSlug: string
    }
}

interface SearchResult {
    totalHits: number,
    products: SearchProducts[]
}

export default function SearchForm() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    const query = searchParams.get('query') || "";
    const [searchText, setSearchText] = useState(query);
    const [searchResult, setSearchResult] = useState<SearchResult>({totalHits: 0, products: []});
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const [isFocusedMobile, setIsFocusedMobile] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setSearchText(query);
    }, [query]);

    const handleFullTextSearch = useCallback((text: string) => {
        if (!text.trim() || pathname === '/search') {
            setSearchResult({totalHits: 0, products: []});
            return;
        }
        setIsLoading(true);
        getProductsFullTextSearch(text, 0, 5).then((resp) => {
            setSearchResult(resp.data);
        }).finally(() => {
            setIsLoading(false);
        });
    }, [pathname]);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (pathname === '/search') {
                if (searchText !== query) {
                    router.push(searchText ? `/search?query=${encodeURIComponent(searchText)}` : '/search', { scroll: false });
                }
            } else {
                if (searchText) {
                    handleFullTextSearch(searchText);
                } else {
                    setSearchResult({totalHits: 0, products: []});
                }
            }
        }, 300);

        return () => clearTimeout(timer);
    }, [searchText, handleFullTextSearch, pathname, router, query]);

    const handleSelectProduct = (item: SearchProducts) => {
        setSearchText("");
        setIsShowMobileSearch(false);
    }

    const getProductUrl = (item: SearchProducts) => {
        const categoryPath = item.category.parentSlug 
            ? `${item.category.parentSlug}/${item.category.slug}`
            : item.category.slug;
        return `/catalog/${categoryPath}/product-${item.slug}`;
    }

    const [isShowMobileSearch, setIsShowMobileSearch] = useState(false)

    const isShowSearchResult = (): boolean => {
        return !!(isFocused && searchText.length > 0 && pathname !== '/search');
    }

    const isShowMobileSearchResult = (): boolean => {
        return !!(isFocusedMobile && searchText.length > 0 && pathname !== '/search');
    }

    return<>
        <div className={styles.search}>
            {/* <div className={styles.search__icon_mob} onClick={() => setIsShowMobileSearch(true)}>
                <SearchSvg />
            </div> */}
            <motion.div
                initial={{display: "none", translateY: -53}}
                animate={{display: isShowMobileSearch ? 'initial' : 'none', translateY: isShowMobileSearch ? 0 : -53}}
                className={styles.mobile_search_container}
                transition={{duration: 0.3}}
            >
                {/* <div style={{position: 'relative'}}>
                    <input
                        value={searchText}
                        onChange={(event) => {
                            handleFullTextSearch(event.currentTarget.value)
                        }}
                        type="search"
                        className={styles.search_input_mobile}
                        placeholder="Поиск"
                        onFocus={() => setIsFocusedMobile(true)}
                        onBlur={() => setTimeout(() => setIsFocusedMobile(false), 200)} // Даем время на клик

                    />
                    <div
                        className={styles.mobile_search_close}
                        onClick={() => {
                            setIsShowMobileSearch(false)
                            setSearchText("")
                        }}
                    >
                        <CloseSvg/>
                    </div>
                </div> */}
                <motion.div
                    initial={{display: 'none', opacity: 0}}
                    animate={{
                        display: isShowMobileSearchResult() ? 'initial' : 'none',
                        opacity: isShowMobileSearchResult() ? 1 : 0
                    }}
                    className={styles.suggestions_list}
                    style={{marginTop: 0}}
                >
                    <div className={styles.suggestions_list_container}>
                        {isLoading && <div className={styles.loading_text}>Загрузка...</div>}
                        {!isLoading && searchResult.products.length === 0 && (
                            <div className={styles.no_results}>Ничего не найдено</div>
                        )}
                        {searchResult.products.map((item, index) => {
                            return <Link
                                href={getProductUrl(item)}
                                key={index}
                                className={styles.suggestion_item}
                                onClick={() => handleSelectProduct(item)}
                            >
                                <div className={styles.suggestion_item_image_container}>
                                    <Image className={styles.suggestion_item_image}
                                           src={item.defaultImage ? `${process.env.NEXT_PUBLIC_API_URL}/images/get/product?name=small_${item.defaultImage}` : '/images/Subcatalog__2.png'}
                                           layout="fill" objectFit="contain" alt="search image"/>
                                </div>
                                <div style={{width: 10}}/>
                                <div className={styles.suggestion_text_container}>
                                    <div className={styles.suggestion_name_price}>
                                        <HighlightText text={item.name} query={searchText}/>
                                        {item.price && <span className={styles.suggestion_price}>{item.price} ₽</span>}
                                    </div>
                                    <div className={styles.suggestion_category}>
                                        <HighlightText fontSize={12} text={item.category.name} query={searchText}/>
                                    </div>
                                </div>
                            </Link>
                        })}
                    </div>
                    {searchResult.totalHits > 0 && (
                        <Link href={`/search?query=${searchText}`} className={styles.search__button_stick_link}>
                            <button className={styles.search__button_stick}>Все результаты ({searchResult.totalHits})</button>
                        </Link>
                    )}
                </motion.div>
            </motion.div>
            <input
                value={searchText}
                onChange={(event) => setSearchText(event.target.value)}
                type="search"
                className={styles.search_input}
                placeholder="Поиск товаров"
                onFocus={() => setIsFocused(true)}
                onBlur={() => setTimeout(() => setIsFocused(false), 200)} // Даем время на клик

            />
            {searchText && (
                <div
                    className={styles.search_clear}
                    onClick={() => {
                        setSearchText("");
                        setSearchResult({totalHits: 0, products: []});
                        if (pathname === '/search') {
                            router.push('/search');
                        }
                    }}
                >
                    <CloseSvg width={18} height={18} color="#888" />
                </div>
            )}
            <Link href={`/search?query=${searchText}`} className={styles.search__button}>
                <SearchSvg color='#fff' width='24' height='24' />Найти</Link>
            <motion.div
                initial={{display: 'none', opacity: 0}}
                animate={{display: isShowSearchResult() ? 'initial' : 'none', opacity: isShowSearchResult() ? 1 : 0}}
                className={styles.suggestions_list}
            >
                <div className={styles.suggestions_list_container}>
                    {isLoading && <div className={styles.loading_text}>Загрузка...</div>}
                    {!isLoading && searchResult.products.length === 0 && (
                        <div className={styles.no_results}>Ничего не найдено</div>
                    )}
                    {searchResult.products.map((item, index) => {
                        return <Link
                            href={getProductUrl(item)}
                            key={index}
                            className={styles.suggestion_item}
                            onClick={() => handleSelectProduct(item)}
                        >
                            <div className={styles.suggestion_item_image_container}>
                                <Image className={styles.suggestion_item_image}
                                       src={item.defaultImage ? `${process.env.NEXT_PUBLIC_API_URL}/images/get/product?name=small_${item.defaultImage}` : '/images/Subcatalog__2.png'}
                                       layout="fill" objectFit="contain" alt="search image"/>
                            </div>
                            <div style={{width: 10}}/>
                            <div className={styles.suggestion_text_container}>
                                <div className={styles.suggestion_name_price}>
                                    <HighlightText text={item.name} query={searchText}/>
                                    {item.price && <span className={styles.suggestion_price}>{item.price} ₽</span>}
                                </div>
                                <div className={styles.suggestion_category}>
                                    <HighlightText fontSize={12} text={item.category.name} query={searchText}/>
                                </div>
                            </div>
                        </Link>
                    })}
                </div>
                {searchResult.totalHits > 0 && (
                    <Link href={`/search?query=${searchText}`} className={styles.search__button_stick_link}>
                        <button className={styles.search__button_stick}>Все результаты ({searchResult.totalHits})</button>
                    </Link>
                )}
            </motion.div>
        </div>
    </>
}

interface HighlightTextProps {
    text: string;
    query: string;
    fontSize?: number;
}

const HighlightText: React.FC<HighlightTextProps> = ({text, query, fontSize = 15}) => {
    if (!query) return <span style={{fontSize: fontSize}}>{text}</span>;

    const regex = new RegExp(`(${query})`, "gi");
    const parts = text.split(regex);

    return (
        <span style={{fontSize: fontSize}}>
      {parts.map((part, index) =>
          part.toLowerCase() === query.toLowerCase() ? <span style={{fontWeight: 'bold'}} key={index}>{part}</span> : part
      )}
    </span>
    );
};