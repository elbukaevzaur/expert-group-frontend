/**
 * Утилиты для работы с Яндекс.Метрикой.
 * Счётчик инициализируется в компоненте YandexMetrika.
 */

export const YANDEX_METRIKA_COUNTER_ID = 106763449;

/** Инициализация dataLayer до загрузки тега (обязательно для e-commerce). */
export function ensureDataLayer(): void {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
}

/** Достижение цели. goal_id задаётся в настройках счётчика в интерфейсе Метрики. */
export function reachGoal(goalId: string, params?: Record<string, unknown>): void {
  if (typeof window === "undefined" || !window.ym) return;
  if (params) {
    window.ym(YANDEX_METRIKA_COUNTER_ID, "reachGoal", goalId, params);
  } else {
    window.ym(YANDEX_METRIKA_COUNTER_ID, "reachGoal", goalId);
  }
}

/** Идентификация пользователя (для связки визитов авторизованных пользователей). */
export function setUserID(userId: string | number | null): void {
  if (typeof window === "undefined" || !window.ym) return;
  window.ym(YANDEX_METRIKA_COUNTER_ID, "setUserID", userId ?? undefined);
}

/** Объект товара для e-commerce (совместим с форматом Метрики/GA). */
export interface EcommerceProduct {
  id: string | number;
  name: string;
  price: number;
  quantity?: number;
  category?: string;
  brand?: string;
  variant?: string;
  list?: string;
  position?: number;
}

/** Просмотр карточки товара. */
export function pushEcommerceDetail(product: EcommerceProduct, listName?: string): void {
  ensureDataLayer();
  window.dataLayer!.push({
    ecommerce: {
      currencyCode: "RUB",
      detail: {
        products: [
          {
            id: String(product.id),
            name: product.name,
            price: product.price,
            category: product.category,
            list: listName ?? product.list,
            position: product.position,
          },
        ],
      },
    },
  });
}

/** Добавление товара в корзину. */
export function pushEcommerceAdd(product: EcommerceProduct, listName?: string): void {
  ensureDataLayer();
  window.dataLayer!.push({
    ecommerce: {
      currencyCode: "RUB",
      add: {
        products: [
          {
            id: String(product.id),
            name: product.name,
            price: product.price,
            quantity: product.quantity ?? 1,
            category: product.category,
            list: listName ?? product.list,
            position: product.position,
          },
        ],
      },
    },
  });
}

/** Удаление товара из корзины. */
export function pushEcommerceRemove(product: EcommerceProduct, listName?: string): void {
  ensureDataLayer();
  window.dataLayer!.push({
    ecommerce: {
      currencyCode: "RUB",
      remove: {
        products: [
          {
            id: String(product.id),
            name: product.name,
            price: product.price,
            quantity: product.quantity ?? 1,
            category: product.category,
            list: listName ?? product.list,
            position: product.position,
          },
        ],
      },
    },
  });
}

/** Покупка (оформление заказа). Вызывать в момент подтверждения заказа, до перехода на другую страницу. */
export function pushEcommercePurchase(
  orderId: string,
  products: EcommerceProduct[],
  revenue?: number
): void {
  ensureDataLayer();
  const productsPayload = products.map((p, index) => ({
    id: String(p.id),
    name: p.name,
    price: p.price,
    quantity: p.quantity ?? 1,
    category: p.category,
    list: p.list,
    position: index + 1,
  }));
  window.dataLayer!.push({
    ecommerce: {
      currencyCode: "RUB",
      purchase: {
        actionField: {
          id: orderId,
          ...(revenue != null && { revenue }),
        },
        products: productsPayload,
      },
    },
  });
}
