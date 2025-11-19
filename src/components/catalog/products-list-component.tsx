'use client'

import ProductsFilter from "@/components/filter/products-filter";
import { useAppSelector } from "@/lib/hooks";
import { ProductsListItemComponent } from "@/components/catalog/products-list-item-component";
import {useEffect, useState} from "react";
import {Category, OrderItems, PageRequest, PageResponse, Products} from "@/lib/models";
import CategoryTitle from "@/components/catalog/category-title-component";
import ProductsPagination from "@/components/catalog/products-pagination-component";
import ListNotContent from "@/components/ListNotContent";
import styles from "./products-list-component.module.css"
import SubCategoriesListComponent from "@/components/catalog/sub-categories-list-component";
import {getAll} from "@/lib/http/productsRequest";
import {getCategoryBySlug, getAll as getAllCategories} from "@/lib/http/categoriesRequest";

interface Props {
    slug: string,
}

export default function ProductsListComponent(props: Props) {
    const { orderItems } = useAppSelector((state) => state.basket);
    const { allFavorites } = useAppSelector((state) => state.favorites);
    const [pageRequest, setPageRequest] = useState<PageRequest>({ filters: [], orderedColumns: [], page: 1 });
    const [productsPageResponse, setProductsPageResponse] = useState<PageResponse<Products>>({
        totalPages: 0,
        page: 0,
        perPage: 0,
        content: [],
        orderedColumns: []
    });
    const [isShowMore, setIsShowMore] = useState(false);
    const [category, setCategory] = useState<Category>({} as Category)
    const [hasSubCategories, setHasSubCategories] = useState(false);
    const [subCategoryIds, setSubCategoryIds] = useState<number[]>([]);

    useEffect(() => {
        loadCategory();
    }, [props.slug])

    const loadCategory = () => {
        // Сбрасываем состояние при загрузке новой категории
        setIsShowMore(false);
        setProductsPageResponse({
            totalPages: 0,
            page: 0,
            perPage: 0,
            content: [],
            orderedColumns: []
        });
        
        getCategoryBySlug(props.slug).then((resp) => {
            setCategory(resp.data)
            // Проверяем наличие подкатегорий
            getAllCategories(resp.data.id).then((subCategoriesResp) => {
                if (subCategoriesResp.data && subCategoriesResp.data.length > 0) {
                    setHasSubCategories(true);
                    const ids = subCategoriesResp.data.map((cat: Category) => cat.id);
                    setSubCategoryIds(ids);
                    // Загружаем популярные товары из подкатегорий
                    const popularProductsRequest: PageRequest = {
                        filters: [
                            { field: 'categoryId', value: ids.map((id: number) => String(id)), operator: 'IN' },
                            { field: 'isPopular', value: ['true'], operator: 'EQUAL' }
                        ],
                        orderedColumns: [{ columnName: 'popularityScore', orderDirection: 'DESC' }],
                        page: 1
                    };
                    setPageRequest(popularProductsRequest);
                } else {
                    setHasSubCategories(false);
                    setSubCategoryIds([]);
                    // Загружаем обычные товары из категории
                    setPageRequest({
                        filters: [{ field: 'categoryId', value: [String(resp.data.id)], operator: 'EQUAL' }],
                        orderedColumns: [],
                        page: 1
                    });
                }
            }).catch(() => {
                // Если ошибка при загрузке подкатегорий, показываем обычные товары
                setHasSubCategories(false);
                setSubCategoryIds([]);
                setPageRequest({
                    filters: [{ field: 'categoryId', value: [String(resp.data.id)], operator: 'EQUAL' }],
                    orderedColumns: [],
                    page: 1
                });
            });
        })
    }

    useEffect(() => {
        if (pageRequest.filters.length > 0){
            getAll(pageRequest).then((resp) => {
                if (!isShowMore){
                    setProductsPageResponse(resp.data);
                }else {
                    // Показать еще
                    setProductsPageResponse({
                        content: [...productsPageResponse.content, ...resp.data.content],
                        page: resp.data.currentPage,
                        perPage: productsPageResponse.perPage,
                        totalPages: productsPageResponse.totalPages,
                        orderedColumns: productsPageResponse.orderedColumns
                    })
                }
            });
        }
    }, [pageRequest]);

    function findBasketItemByProductId(productId: number): OrderItems | null{
        const index = orderItems.map(m => m.productId).indexOf(productId);
        if (index === -1){
            return null;
        }
        return orderItems[index]
    }

    return (
        <div className="products">
            <CategoryTitle category={category}/>
            <SubCategoriesListComponent parentCategoryId={category.id}/>
            {
                category.id !== undefined &&
                <>
                    {
                        !hasSubCategories &&
                        <ProductsFilter
                            categoryId={category.id.toString()}
                            productsPageResponse={productsPageResponse}
                            pageRequest={pageRequest}
                        updateFilter={(filter) => {

                            const index = pageRequest.filters.map(m => m.field).indexOf(filter.field);
                            if (index !== -1){
                                if (filter.operator === 'IN'){
                                    if (pageRequest.filters[index].value.length == 1 && pageRequest.filters[index].value
                                        .filter(f => filter.value.indexOf(f) !== -1).length === 0){
                                        setPageRequest({...pageRequest, filters: pageRequest.filters.filter(f => f.field !== filter.field)})

                                    }else {
                                        let filters = pageRequest.filters;
                                        filters[index].value = filter.value;
                                        setPageRequest({...pageRequest, filters: filters})
                                    }
                                }else {
                                    let filters = pageRequest.filters;
                                    filters[index].value = filter.value;
                                    setPageRequest({...pageRequest, filters: filters})
                                }
                            } else
                                setPageRequest({...pageRequest, filters: [...pageRequest.filters, filter]})
                        }}
                        updateSort={(sort) => {
                            setPageRequest({...pageRequest, orderedColumns: [sort]});
                        }}
                        updatePerPage={(perPage) => {
                            setPageRequest({...pageRequest, perPage: perPage});
                        }}
                        handleRemoveFilter={(filter) => {
                            const index = pageRequest.filters.map(m => m.field).indexOf(filter.field);
                            const filters = pageRequest.filters;
                            filters.splice(index, 1);
                            setPageRequest({...pageRequest, filters: filters})
                        }}
                        onRemoveAllFilter={() => {
                            // Восстанавливаем фильтр по категории
                            setPageRequest({...pageRequest, filters: pageRequest.filters.filter(f => f.field === 'categoryId')})
                        }}
                    />
                    }
                    <div className={styles.items}>
                        {
                            productsPageResponse.content.map((value, index) => {
                                return <ProductsListItemComponent
                                    key={index}
                                    product={value}
                                    basketItem={findBasketItemByProductId(value.id)}
                                    isFavorite={allFavorites.hasOwnProperty(value.id)}
                                />
                            })
                        }
                    </div>
                    {
                        productsPageResponse.content.length < 1 &&
                        <ListNotContent text="Список товаров пуст"/>
                    }
                    {
                        productsPageResponse.totalPages > 0 &&
                        <ProductsPagination
                            pageRequest={pageRequest}
                            productsPageResponse={productsPageResponse}
                            onUpdatePageable={(pageable) => {
                                setIsShowMore(false);
                                setPageRequest({ ...pageRequest, page: pageable.page, perPage: pageable.perPage });
                            }}
                            onUpdateShowMorePageable={(pageable) => {
                                setIsShowMore(true);
                                setPageRequest({ ...pageRequest, page: pageable.page, perPage: pageable.perPage });
                            }}
                        />
                    }
                </>
            }
        </div>
    )
}