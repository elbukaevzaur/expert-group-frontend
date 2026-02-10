"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { Fragment, useEffect, useMemo, useState } from "react";
import styles from "@/components/dashboard/navigation-history.module.css";
import { getCategoryBySlug } from "@/lib/http/categoriesRequest";
import { Category, ProductDetailsResponse } from "@/lib/models";
import { getProductDetailsBySlug } from "@/lib/http/productsRequest";

const STATIC_TITLES: Record<string, string> = {
  "": "Главная",
  basket: "Корзина",
  catalog: "Каталог",
  lk: "Личный кабинет",
  buy: "Оформление заказа",
  favorite: "Избранное",
  "about-us": "О компании",
  projects: "Проекты",
  contacts: "Контакты",
  vacancy: "Вакансии",
  certificate: "Сертификаты",
  politics: "Политика конфиденциальности",
  requisites: "Реквизиты",
  "orders-history": "История заказов",
  "current-orders": "Текущие заказы",
  "personal-data": "Личные данные",
  "change-password": "Сменить пароль",
  favorites: "Избранные товары",
};

export default function NavigationHistory() {
  const pathname = usePathname();
  const params = useParams();

  const [productDetails, setProductDetails] = useState<ProductDetailsResponse | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const categorySlugs = params.categorySlug as string[] | undefined;

  useEffect(() => {
    const fetchData = async () => {
      if (!categorySlugs || categorySlugs.length === 0) {
        setCategories([]);
        setProductDetails(null);
        return;
      }

      setLoading(true);
      try {
        const lastSlug = categorySlugs[categorySlugs.length - 1];
        const isProduct = lastSlug.startsWith("product-");

        if (isProduct) {
          const productSlug = lastSlug.replace("product-", "");
          const productResp = await getProductDetailsBySlug(productSlug);
          setProductDetails(productResp.data);
        } else {
          setProductDetails(null);
        }

        const slugsToFetch = isProduct ? categorySlugs.slice(0, -1) : categorySlugs;
        const categoryPromises = slugsToFetch.map((slug) => getCategoryBySlug(slug));
        const responses = await Promise.all(categoryPromises);
        setCategories(responses.map((r) => r.data));
      } catch (err) {
        console.error("Failed to fetch navigation data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [categorySlugs]);

  const breadcrumbs = useMemo(() => {
    const parts = pathname.split("/").filter(Boolean);
    const crumbs: { path: string; title: string; isActive: boolean }[] = [];

    // Always start with Home
    crumbs.push({ path: "/", title: STATIC_TITLES[""], isActive: pathname === "/" });

    let currentPath = "";
    let isHandled = false;

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      currentPath += `/${part}`;
      const isLast = i === parts.length - 1;

      // Special handling for catalog and its dynamic categories/products
      if (part === "catalog" && categorySlugs) {
        crumbs.push({
          path: "/catalog",
          title: STATIC_TITLES.catalog,
          isActive: categorySlugs.length === 0,
        });

        categorySlugs.forEach((slug, slugIndex) => {
          const isProduct = slug.startsWith("product-");
          const slugPath = `/catalog/${categorySlugs
            .slice(0, slugIndex + 1)
            .join("/")}`;
          const isLastSlug = slugIndex === categorySlugs.length - 1;

          let title = slug;
          if (isProduct) {
            title = productDetails?.name || slug.replace("product-", "");
          } else {
            const cat = categories.find((c) => c.slug === slug);
            title = cat?.name || slug;
          }

          crumbs.push({
            path: slugPath,
            title: title,
            isActive: isLastSlug,
          });
        });
        isHandled = true;
        break;
      }

      // Special handling for personal account (lk) nested pages
      if (part === "lk") {
        crumbs.push({
          path: "/lk/current-orders",
          title: STATIC_TITLES.lk,
          isActive: isLast,
        });
        continue;
      }

      // Handle standard static titles
      if (STATIC_TITLES[part]) {
        crumbs.push({
          path: currentPath,
          title: STATIC_TITLES[part],
          isActive: isLast,
        });
      } else if (!isHandled) {
        // Fallback for unknown segments (like IDs or slugs not in catalog)
        // Capitalize for better look
        const title = part.charAt(0).toUpperCase() + part.slice(1);
        crumbs.push({
          path: currentPath,
          title: title.replace(/-/g, " "),
          isActive: isLast,
        });
      }
    }

    return crumbs;
  }, [pathname, categorySlugs, categories, productDetails, params]);

  if (pathname === "/" || breadcrumbs.length <= 2) {
    return <div className={styles.navigator__spacer}></div>;
  }

  return (
    <div className={styles.navigator__wrapper}>
      <h3 className={styles.navigator__back_text}>
        {breadcrumbs.map((crumb, index) => (
          <Fragment key={crumb.path + index}>
            <Link href={crumb.path}>
              <u className={crumb.isActive ? styles.active_history_link : styles.not_active_history_link}>
                {crumb.title}
              </u>
            </Link>
            {index < breadcrumbs.length - 1 && <span> / </span>}
          </Fragment>
        ))}
      </h3>
    </div>
  );
}
