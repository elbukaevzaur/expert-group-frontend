export const handleShare = async (url: string, title: string) => {
    if (navigator.share) {
        try {
            await navigator.share({
                title: title,
                url: url,
            });
        } catch (error) {
            // console.error("Ошибка при отправке ссылки:", error);
        }
    } else {
        try {
            await navigator.clipboard.writeText(url);
        } catch (error) {
            console.error("Ошибка копирования:", error);
        }
    }
};