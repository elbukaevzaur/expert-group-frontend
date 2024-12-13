"use client"

import Link from "next/link";
import Image from "next/image";
import {usePathname, useRouter} from "next/navigation";

export default function NavigationHistory() {
    const router = useRouter()
    const pathname = usePathname();

    const isBack = (): boolean => {
        if (pathname.split("/").length > 2)
            return true;
        return false;
    }
    const history = (): { path: string; title: string }[] => {
        const parts = pathname.split("/").filter(Boolean);
        if (parts.length !== 0 && parts[0].length > 1){
            parts.unshift('')
        }
        return parts.reduce((acc, value, index) => {
            let title = value;
            let isAdd = true;
            switch (value) {
                case '':
                    title = 'Главная';
                    break;
                case 'basket':
                    title = 'Корзина';
                    break;
                case 'products':
                    title = 'Каталог';
                    break;
                default:
                    isAdd = false
                    break;
            }
            if (isAdd){
                if (parts.length > 1 && index === 0){
                    acc.push({ path: `/`, title });
                }else {
                    const fullPath = parts.slice(0, index + 1).join("/");
                    acc.push({ path: `${fullPath}`, title });
                }
            }
            return acc;
        }, [] as { path: string; title: string }[]);
    };

    return (
        <div className="navigator__wrapper">
            {
                isBack() &&
                <div className="navigator__back" onClick={router.back}>
                    <button className="navigator__back_button">
                        <Image src={'/images/Back_button.png'} alt="Назад" width={18} height={14}/>
                    </button>
                    <u className="navigator__back_text">Назад</u>
                </div>
            }
            <h3 className="navigator__back_text">
            {
                history().map((value, index) => {
                    return <Link key={index} href={value.path}>
                        {value.title} {index < (history().length - 1) && ' /'}
                    </Link>
                })
            }
            </h3>
        </div>
    )
}