import Link from "next/link";

export default function ProductsListItem() {

    return (
        <div style={{ flexDirection: 'column' }}>
            <span>Products list item</span>
            <div>
                <Link href='/products/details'>Details</Link>
            </div>
        </div>
    )
}