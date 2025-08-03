'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function HeroSection() {
    const sectionRef = useRef<HTMLDivElement | null>(null)
    const textRef = useRef<HTMLHeadingElement | null>(null)

    useEffect(() => {
        const words = textRef.current?.innerText.split(' ') || []
        if (!textRef.current || words.length === 0) return

        textRef.current.innerHTML = words
        .map((word, index) => `<span class="inline-block opacity-0 mr-2" style="display:inline-block;">${word}</span>`)
        .join(' ')

        const spans = textRef.current.querySelectorAll('span')

        gsap.to(spans, {
            opacity: 1,
            y: 0,
            stagger: 0.2,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: textRef.current,
                start: 'top 80%',
            },
        })

        // Parallax background
        gsap.to(sectionRef.current, {
            backgroundPosition: 'center 0px',
            ease: 'none',
            scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
            },
        })
    }, [])  
        
    return (
        <section
            ref={sectionRef}
            className="relative min-h-screen flex items-center justify-center text-white px-4 sm:px-6 md:px-12 h-[70vh] md:h-[80vh] overflow-hidden"
            style={{ 
                backgroundImage: "url('/images/hero-bg.jpg')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }}
        >
            <div className="text-center max-w-[90%] sm:max-w-[80%] md:max-w-[60%]">
                <h1 
                    ref={textRef}
                    className="text-3xl sm:text-5xl md:text-xl lg:text-6xl font-bold text-center text-stone-200 max-w-4xl leading-tight"
                >
                    Lights. Camera. Your Experience Begins Now.
                </h1>
                <p className="mt-4 text-sm sm:text-base md:text-lg lg:text-2xl text-stone-100">
                    Discover and book your favorite movies in seconds with TICS Cinema.
                </p>
            </div>
        </section>
    )
}
