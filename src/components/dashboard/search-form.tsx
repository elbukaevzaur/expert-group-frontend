import styles from "@/components/dashboard/dashboard.module.css";
import Link from "next/link";
import Image from "next/image";
import {getProductsFullTextSearch} from "@/lib/http/productsRequest";
import React, {useState} from "react";
import {CloseSvg, SearchSvg} from "@/lib/icon-svg";
import {motion} from "framer-motion";

interface SearchProducts {
    id: string,
    name: string,
    description: string,
    category: {
        id: number,
        name: string,
        parentId: number
    }
}

interface SearchResult {
    totalHits: number,
    products: SearchProducts[]
}

export default function SearchForm() {
    const [searchText, setSearchText] = useState("");
    const [searchResult, setSearchResult] = useState<SearchResult>({totalHits: 0, products: []});
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const [isFocusedMobile, setIsFocusedMobile] = useState<boolean>(false);

    function handleFullTextSearch(text: string) {
        setSearchText(text)
        getProductsFullTextSearch(text).then((resp) => {
            console.log(resp.data)
            setSearchResult(resp.data);
        })
    }

    function handleSelectProduct(name: string) {
        setSearchText("")
        setIsShowMobileSearch(false)
    }

    const [isShowMobileSearch, setIsShowMobileSearch] = useState(false)

    const isShowSearchResult = (): boolean => {
        return !!(isFocused && searchText.length > 0 && searchResult.totalHits);
    }

    const isShowMobileSearchResult = (): boolean => {
        return !!(isFocusedMobile && searchText.length > 0 && searchResult.totalHits);
    }

    return<>
        <div className={styles.search}>
            <div onClick={() => setIsShowMobileSearch(true)}>
                <SearchSvg className={styles.search__icon}/>
            </div>
            <motion.div
                initial={{display: "none", translateY: -53}}
                animate={{display: isShowMobileSearch ? 'initial' : 'none', translateY: isShowMobileSearch ? 0 : -53}}
                className={styles.mobile_search_container}
                transition={{duration: 0.3}}
            >
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
                        {/*<span>Total results: {searchResult.totalHits}</span>*/}
                        {searchResult.products.map((item, index) => {
                            return <Link
                                href={`/catalog/${item.category.parentId}/${item.category.id}/details/${item.id}`}
                                key={index}
                                className={styles.suggestion_item}
                                onClick={() => handleSelectProduct(item.name)}
                            >
                                <div className={styles.suggestion_item_image_container}>
                                    <Image className={styles.suggestion_item_image}
                                           src={'/images/subcatalog__2.png'}
                                           layout="fill" objectFit="contain" alt="search image"/>
                                </div>
                                <div style={{width: 10}}/>
                                <div className={styles.suggestion_text_container}>
                                    <HighlightText text={`${item.name}`} query={searchText}/>
                                    <HighlightText fontSize={13} text={`${item.description}`} query={searchText}/>
                                    <HighlightText fontSize={13} text={`${item.category.name}`} query={searchText}/>
                                </div>
                            </Link>
                        })}
                    </div>
                    <button className={styles.search__button_stick}>Все результаты</button>
                </motion.div>
            </motion.div>
            <input
                value={searchText}
                onChange={(event) => {
                    handleFullTextSearch(event.currentTarget.value)
                }}
                type="search"
                className={styles.search_input}
                placeholder="Поиск"
                onFocus={() => setIsFocused(true)}
                onBlur={() => setTimeout(() => setIsFocused(false), 200)} // Даем время на клик

            />
            <motion.div
                initial={{display: 'none', opacity: 0}}
                animate={{display: isShowSearchResult() ? 'initial' : 'none', opacity: isShowSearchResult() ? 1 : 0}}
                className={styles.suggestions_list}
            >
                <div className={styles.suggestions_list_container}>
                    {/*<span>Total results: {searchResult.totalHits}</span>*/}
                    {searchResult.products.map((item, index) => {
                        return <Link
                            href={`/catalog/${item.category.parentId}/${item.category.id}/details/${item.id}`}
                            key={index}
                            className={styles.suggestion_item}
                            onClick={() => handleSelectProduct(item.name)}
                        >
                            <div className={styles.suggestion_item_image_container}>
                                <Image className={styles.suggestion_item_image}
                                       src={'/images/subcatalog__2.png'}
                                       layout="fill" objectFit="contain" alt="search image"/>
                            </div>
                            <div style={{width: 10}}/>
                            <div className={styles.suggestion_text_container}>
                                <HighlightText text={`${item.name}`} query={searchText}/>
                                <HighlightText fontSize={13} text={`${item.description}`} query={searchText}/>
                                <HighlightText fontSize={13} text={`${item.category.name}`} query={searchText}/>
                            </div>
                        </Link>
                    })}
                </div>
                <button className={styles.search__button_stick}>Все результаты</button>
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