
export const getTitleByField = (field: string): string => {
    let title = '';
    switch (field){
        case 'price':
            title = 'Цена';
            break
        case 'width':
            title = 'Ширина';
            break
        case 'height':
            title = 'Высота';
            break
        case 'length':
            title = 'Длина';
            break
        case 'thickness':
            title = 'Толщина';
            break
        case 'outerDiameter':
            title = 'Внешний диаметр';
            break
        case 'material':
            title = 'Материал';
            break
    }
    return title;
}

export const getUnitTypeTitle = (value: string): string => {
    let title = '';
    switch (value){
        case 'PIECE':
            title = 'шт';
            break
        case 'KILOGRAM':
            title = 'кг';
            break
        case 'LITER':
            title = 'л';
            break
        case 'METER':
            title = 'м';
            break
        case 'CENTIMETER':
            title = 'см';
            break
    }
    return title;
}

export const getProductCountText = (count: number): string => {
    const lastDigit = count % 10;
    const lastTwoDigits = count % 100;
    
    if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
        return `${count} товаров`;
    }
    
    if (lastDigit === 1) {
        return `${count} товар`;
    }
    
    if (lastDigit >= 2 && lastDigit <= 4) {
        return `${count} товара`;
    }
    
    return `${count} товаров`;
}