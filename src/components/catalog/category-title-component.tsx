import {useAppSelector} from "@/lib/hooks";
import {useParams} from "next/navigation";
import {useEffect, useState} from "react";

export default function CategoryTitle() {
    const { currentCategory, currentSubCategory } = useAppSelector((state) => state.categories);
    const [isCurrentCategoryLevel, setIsCurrentCategoryLevel] = useState(0);
    const params = useParams();

    useEffect(() => {
        if (params.subCategoryId !== null && params.subCategoryId !== undefined){
            setIsCurrentCategoryLevel(2)
        }else if (params.categoryId !== null && params.categoryId !== undefined){
            setIsCurrentCategoryLevel(1);
        }
    }, [params.categoryId, params.subCategoryId]);

    return <div className="products__info_wrapper">
        <h1 className="products__title">
            {
                isCurrentCategoryLevel == 1 ? currentCategory?.name : isCurrentCategoryLevel == 2 ? currentSubCategory?.name : ''
            }
        </h1>
        <div className="products__info">
            <h3 className="products__info_text">
                {
                    isCurrentCategoryLevel == 1 ? currentCategory?.productCount : isCurrentCategoryLevel == 2 ? currentSubCategory?.productCount : ''
                }
            </h3>
        </div>
    </div>
}