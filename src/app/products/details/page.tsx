"use client"
import { useRouter } from "next/navigation"

export default function ProductDetails(){
    const router = useRouter()
    return (
        <div>
            <h1>Product details</h1>
            <button onClick={router.back}>Go back</button>
        </div>
    )
}