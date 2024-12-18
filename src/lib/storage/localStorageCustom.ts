export const saveToLocalStorage = (value: any, key: string) => {
    try {
        const serializedState = JSON.stringify(value);
        localStorage.setItem(key, serializedState);
    } catch (e) {
        console.warn(e);
    }
};

// Функция для получения данных из localStorage
export const loadFromLocalStorage = (key: string) => {
    try {
        const serializedState = localStorage.getItem(key);
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (e) {
        console.warn(e);
        return undefined;
    }
}

export const removeFromLocalStorage = (key: string) => {
    try {
        localStorage.removeItem(key);
    } catch (e) {
        console.warn(e);
    }
}