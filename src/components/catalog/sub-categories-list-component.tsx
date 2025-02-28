import CategoryListItem from "@/components/catalog/categories/CategoryListItem";
import {useParams} from "next/navigation";
import {useEffect, useState} from "react";
import {Category} from "@/lib/models";
import {getAll} from "@/lib/http/categoriesRequest";

interface Props {
    parentCategoryId: number
}

export default function SubCategoriesListComponent(props: Props) {
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
        if (isShowSubCategories && props.parentCategoryId){
            getAll(props.parentCategoryId).then((resp) => {
                setSubCategories(resp.data);
            })
        }
    }, [isShowSubCategories, props.parentCategoryId]);

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