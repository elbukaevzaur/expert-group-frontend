import { notFound } from 'next/navigation';

export default async function CategoryPageNew({ params }: { params: { categorySlug: string[] } }) {
    const categoryPath = params.categorySlug;
    // categoryPath будет массивом: ['books', 'fiction', 'sci-fi']

    // Здесь вы можете использовать categoryPath для запроса данных.
    // Например, найти категорию по полному пути.
    const category = await getCategoryByPath(categoryPath);

    if (!category) {
        // Если категория не найдена, показываем 404
        notFound();
    }


    return (
        <div>
            <h1>Категория: {category.name}</h1>
            <p>Полный путь: /{categoryPath.join('/')}</p>
            {/* Здесь можно отобразить подкатегории или товары */}
        </div>
    );
}

// Пример функции для получения данных (может быть API-запрос, запрос к БД и т.д.)
interface Category {
    name: string;
}

// Define the type for the categories data store
interface CategoriesData {
    [key: string]: Category;
}

// Function to get a category by its path
async function getCategoryByPath(pathArray: string[]): Promise<Category | undefined> {
    // Mock data store with explicit typing
    const categories: CategoriesData = {
        'books': { name: 'Книги' },
        'books/fiction': { name: 'Художественная литература' },
        'books/fiction/sci-fi': { name: 'Научная фантастика' },
    };

    const fullPath = pathArray.join('/');

    // Return the found category or undefined if not found
    return categories[fullPath];
}