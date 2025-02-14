import CategoryListItem from "@/components/catalog/categories/CategoryListItem";
import {useParams} from "next/navigation";
import {useEffect, useState} from "react";
import {Category} from "@/lib/models";
import {getAll} from "@/lib/http/categoriesRequest";

export default function SubCategoriesListComponent() {
    const params = useParams();
    const [isShowSubCategories, setIsShowSubCategories] = useState(false);
    const [subCategories, setSubCategories] = useState<Category[]>([]);

    useEffect(() => {
        if (params.subCategoryId === null || params.subCategoryId === undefined){
            setIsShowSubCategories(true)
        }else {
            setIsShowSubCategories(false)
        }
    }, [params.subCategoryId]);

    useEffect(() => {
        if (params.categoryId !== undefined || params.categoryId !== null){
            getAll(Number(params.categoryId)).then((resp) => {
                setSubCategories(resp.data);
            })
        }
    }, [params.categoryId]);

    return <>
            {
                isShowSubCategories &&
                subCategories.length > 0 && <div className="subcatalog">
                    {
                        subCategories.map((value, index) => {
                            return <CategoryListItem key={index} category={value}/>
                        })
                    }
                </div>
            }
        </>
}