import Link from "next/link";

export default function Dashboard(){

    return (
        <div>
            <Link href='/'>Home</Link>
            <Link href='/products'>Products</Link>
        </div>
    )
}