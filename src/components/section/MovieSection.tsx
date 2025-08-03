'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'

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
            className="relative flex items-center justify-center text-white px-4 sm:px-6 md:px-12 h-[70vh] md:h-[80vh] overflow-hidden"
            style={{
                backgroundImage: "url('/images/home-bg.jpg')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }}
        >
            {/* Overlay hitam */}
            <div className="absolute inset-0 bg-black/50"></div>

            {/* Content */}
            <div className="relative z-10 text-center max-w-[90%] sm:max-w-[80%] md:max-w-[60%]">
                <h1
                    ref={textRef}
                    className="text-3xl sm:text-5xl md:text-5xl lg:text-6xl font-bold text-stone-200 max-w-4xl leading-tight mx-auto"
                >
                    Big Screen. Bigger Stories.
                </h1>
                <p className="mt-4 text-sm sm:text-base md:text-lg lg:text-2xl text-stone-100">
                    Catch every release, skip the blackout dates, and never miss a moment again.
                    From action-packed to artsy — it's all here.
                </p>

                {/* Button */}
                <Link
                    href="/movies"
                    className="inline-flex items-center mt-8 px-8 py-3 border border-white text-white uppercase font-semibold tracking-wider hover:bg-white hover:text-black transition-all duration-300"
                >
                    See What's Playing
                    <span className="ml-3 text-xl">→</span>
                </Link>
            </div>
        </section>
    )
}
