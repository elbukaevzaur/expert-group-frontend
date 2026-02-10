'use client'

import styles from './search.module.css'
import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { getProductsFullTextSearch } from '@/lib/http/productsRequest'
import { ProductsListItemComponent } from '@/components/catalog/products-list-item-component'
import { useAppSelector } from '@/lib/hooks'
import { OrderItems, Products } from '@/lib/models'
import ListNotContent from '@/components/ListNotContent'
import ProductsPagination from '@/components/catalog/products-pagination-component'

function SearchContent() {
    const searchParams = useSearchParams()
    const query = searchParams.get('query') || ''
    const [results, setResults] = useState<{ products: Products[], totalHits: number }>({ products: [], totalHits: 0 })
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1)
    const perPage = 20

    const { orderItems } = useAppSelector((state) => state.basket)
    const { allFavorites } = useAppSelector((state) => state.favorites)

    useEffect(() => {
        if (query) {
            handleSearch(query, page)
        } else {
            setResults({ products: [], totalHits: 0 })
        }
    }, [query, page])

    const handleSearch = async (q: string, p: number) => {
        setLoading(true)
        try {
            const resp = await getProductsFullTextSearch(q, p - 1, perPage)
            // Преобразуем данные из Elasticsearch для совместимости с ProductsListItemComponent
            const mappedProducts = resp.data.products.map((p: any) => ({
                ...p,
                id: Number(p.id),
                categoryId: p.category.id,
                parentCategoryId: p.category.parentId
            }))
            setResults({ products: mappedProducts, totalHits: resp.data.totalHits })
        } catch (error) {
            console.error('Search error:', error)
        } finally {
            setLoading(false)
        }
    }

    function findBasketItemByProductId(productId: number): OrderItems | null {
        const index = orderItems.map(m => m.productId).indexOf(productId);
        if (index === -1) {
            return null;
        }
        return orderItems[index]
    }

    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <h2 className={styles.title}>{query}</h2>
                {!loading && results.totalHits > 0 && (
                    <span className={styles.count}>Найдено: {results.totalHits}</span>
                )}
            </div>
            
            {loading ? (
                <div className={styles.loading}>Загрузка...</div>
            ) : (
                <>
                    <div className={styles.grid}>
                        {results.products.map((product, index) => (
                            <ProductsListItemComponent
                                key={product.id || index}
                                product={product}
                                basketItem={findBasketItemByProductId(product.id)}
                                isFavorite={allFavorites.hasOwnProperty(product.id)}
                            />
                        ))}
                    </div>
                    
                    {results.products.length === 0 && query && (
                        <ListNotContent text={`По запросу "${query}" ничего не найдено`} />
                    )}

                    {results.totalHits > perPage && (
                        <div className={styles.pagination_container}>
                            <ProductsPagination
                                pageRequest={{ page, perPage, filters: [], orderedColumns: [] }}
                                productsPageResponse={{
                                    content: results.products,
                                    totalPages: Math.ceil(results.totalHits / perPage),
                                    totalResult: results.totalHits,
                                    page: page,
                                    perPage: perPage,
                                    orderedColumns: []
                                }}
                                onUpdatePageable={(p) => setPage(p.page)}
                                onUpdateShowMorePageable={(p) => setPage(p.page)}
                            />
                        </div>
                    )}
                </>
            )}
        </div>
    )
}

export default function SearchPage() {
    return (
        <Suspense fallback={<div>Загрузка...</div>}>
            <SearchContent />
        </Suspense>
    )
}