import Link from "next/link";
import Image from "next/image";
import {Category, OrderItems, Products} from "@/lib/models";
import {useAppDispatch} from "@/lib/hooks";
import {CHANGE_FAVORITES_REQUEST} from "@/lib/reducers";
import {LikeSvg} from "@/lib/icon-svg";
import styles from "./products-list-item-component.module.css"
import {AddToCartButton, CartItemQuantity} from "@/components/basket/basket-actions";
import {useRouter} from "next/navigation";
import {getCategoryById, getCategoryHierarchyById} from "@/lib/http/categoriesRequest";
import {AxiosResponse} from "axios";
import { motion, AnimatePresence } from "framer-motion";

interface ProductsProps {
    key: number | string,
    product: Products,
    basketItem: OrderItems | null,
    isFavorite: boolean
}

export const getCurrentUrlForProductDetails = async (product: {categoryId: number, parentCategoryId: number, slug: string}): Promise<string> => {
    return  new Promise((resolve, reject) => {
        getCategoryById(product.categoryId).then((categoryResp) => {
            getCategoryById(product.parentCategoryId).then((subCategoryResp) => {
                return resolve(`/catalog/${subCategoryResp.data.slug}/${categoryResp.data.slug}/product-${product.slug}`);
            }).catch((e) => {
                reject();
            })
        }).catch((e) => {
            reject();
        })
    })
}

export function ProductsListItemComponent(props: ProductsProps) {
    const { product, isFavorite, basketItem } = props;
    const dispatch = useAppDispatch();
    const router = useRouter();

    function handleToProductDetails() {
        getCategoryHierarchyById(product.categoryId).then((resp: AxiosResponse<Category[]>) => {
            console.log(resp.data, product.slug)
            return router.push(`/catalog/${resp.data.reverse().map(m => m.slug).join("/")}/product-${product.slug}`);
        })
        // getCurrentUrlForProductDetails(product).then((result) => {
        //     router.push(result);
        // })
    }


    const handleChangeFavorite = () => {
        const request = {
            productId: product.id
        }
        dispatch(CHANGE_FAVORITES_REQUEST(request))
    }

    return (
        <div className={styles.item}>
            <button className={styles.button} onClick={() => handleToProductDetails()}>
                {
                    product.defaultImage == null ?
                        ''
                        :
                        <img
                            className={styles.image}
                            src={`${process.env.NEXT_PUBLIC_API_URL}/images/get/product?name=${'small_' + product.defaultImage}`}
                            alt={product.name}
                        />
                }
            </button>
            <div className={styles.info}>
                <h3 className={styles.name}  onClick={() => handleToProductDetails()}>{product.name}</h3>
                <h3 className={styles.availability}>
                    {product.currentQuantity > 0 
                        ? 'В наличии' 
                        : product.allowOrderWithoutStock 
                            ? '' 
                            : 'Нет в наличии'}
                </h3>
                <div className={styles.price_action_row}>
                    <h2 className={styles.price}>{product.price.toLocaleString()} &#8381;</h2>
                    <div className={styles.action}>
                        {
                            props.basketItem == null ?
                                <AddToCartButton productId={product.id} orderItem={basketItem} productQuantity={product.currentQuantity} allowOrderWithoutStock={product.allowOrderWithoutStock}/>
                                :
                                <CartItemQuantity orderItem={basketItem} productId={product.id} productQuantity={product.currentQuantity} allowOrderWithoutStock={product.allowOrderWithoutStock}/>
                        }
                    </div>
                </div>
                <motion.button 
                    onClick={handleChangeFavorite} 
                    className={styles.like}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={isFavorite ? 'active' : 'inactive'}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <LikeSvg width={28} height={24} stroke='#fff' fill={isFavorite ? '#ffffff' : 'none'}/>
                        </motion.div>
                    </AnimatePresence>
                </motion.button>
            </div>
        </div>
    )
}