'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'

gsap.registerPlugin(ScrollTrigger)

export default function JoinSection() {
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
            className="relative flex items-center justify-center px-4 py-32 overflow-hidden"
        >
            <div className="text-center max-w-[90%] sm:max-w-[80%] md:max-w-[60%]">
                <h1 
                    ref={textRef}
                    className="sm:text-2xl md:text-3l lg:text-4xl font-bold text-center text-stone-200 max-w-4xl leading-tight"
                >
                    Movie-going is the best entertainment activity in the world.
                </h1>
                <p className="mt-4 text-sm sm:text-base md:text-lg lg:text-2xl text-stone-100">
                    Unlock the next era of cinema.
                    Connect, experience, and rediscover movies with a community that lives for the screen.

                </p>
                <Link
                    href="/register"
                    className="inline-flex items-center mt-12 px-8 py-3 border border-white text-white uppercase font-semibold tracking-wider hover:bg-white hover:text-black transition-all duration-300"
                >
                    Join Us!
                    <span className="ml-3 text-xl">→</span>
                </Link>
            </div>
        </section>
    )
}