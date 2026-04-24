import type { RouteMetadata } from "@/libs/types/Route.ts";
import type {I18n} from "vue-i18n";

const setPageTitle = (routeMeta: RouteMetadata, i18n: I18n) => {
    const t = i18n.global.t as (key: string) => string;

    // Get title from route metadata, fallback to default
    const titleKey = routeMeta.titleKey || '';

    // Determine product title based on access type (Use LITE for EZYCARGO, otherwise EZYFREIGHT)
    const productTitle = 'TITLE:EZYFREIGHT'

    // Set document title
    document.title = titleKey.length > 0 ? `${t(productTitle)}™ - ${t(titleKey)}` : `${t(productTitle)}™`;
};

export { setPageTitle };