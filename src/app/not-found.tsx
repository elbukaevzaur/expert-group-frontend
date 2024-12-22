import Link from 'next/link'

export default function NotFound() {
    return (
        <div style={{textAlign: 'center'}}>
            <h2>Не найдено</h2>
            <p>Не удалось найти запрошенный ресурс</p>
            <Link href="/">Вернуться домой</Link>
        </div>
    )
}