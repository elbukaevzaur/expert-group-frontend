"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { YANDEX_METRIKA_COUNTER_ID, ensureDataLayer } from "@/lib/yandex-metrika";

const SCRIPT_URL = "https://mc.yandex.ru/metrika/tag.js";

function initYandexMetrika() {
  if (typeof window === "undefined" || !window.ym) return;
  window.ym(YANDEX_METRIKA_COUNTER_ID, "init", {
    ssr: true,
    webvisor: true,
    clickmap: true,
    ecommerce: "dataLayer",
    referrer: document.referrer,
    url: location.href,
    accurateTrackBounce: true,
    trackLinks: true,
  });
}

export function YandexMetrika() {
  const pathname = usePathname();
  const initialized = useRef(false);

  const handleScriptLoad = () => {
    if (initialized.current) return;
    initialized.current = true;
    initYandexMetrika();
  };

  // Инициализация dataLayer до загрузки тега (для e-commerce)
  useEffect(() => {
    ensureDataLayer();
  }, []);

  // Отправка визита при смене страницы (SPA-навигация)
  useEffect(() => {
    if (typeof window === "undefined" || !window.ym || !initialized.current) return;
    window.ym(YANDEX_METRIKA_COUNTER_ID, "hit", pathname);
  }, [pathname]);

  return (
    <>
      <Script
        id="yandex-metrika"
        src={SCRIPT_URL}
        strategy="afterInteractive"
        onLoad={handleScriptLoad}
      />
      <noscript>
        <div>
          <img
            src={`https://mc.yandex.ru/watch/${YANDEX_METRIKA_COUNTER_ID}`}
            style={{ position: "absolute", left: -9999 }}
            alt=""
          />
        </div>
      </noscript>
    </>
  );
}
