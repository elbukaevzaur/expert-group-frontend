
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