'use client'
import { useRouter } from 'next/navigation'

export default function BackButton() {
    const router = useRouter()
    return (
        <div className="w-full max-w-7xl mx-auto px-4 mt-4 mb-4">
            <button 
                onClick={() => router.back()}
                className="mt-4 mb-4 ml-2 flex items-center text-stone-300 hover:text-stone-500 transition-colors duration-200 font-medium"
            >
                <span className="mr-2 text-xl">←</span> Back
            </button>
        </div>
        
    )
}