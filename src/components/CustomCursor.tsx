import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
    const cursorRef = useRef<HTMLDivElement>(null);
    const followerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const cursor = cursorRef.current;
        const follower = followerRef.current;

        if (!cursor || !follower) return;

        // Set initial positions
        gsap.set(cursor, { xPercent: -50, yPercent: -50 });
        gsap.set(follower, { xPercent: -50, yPercent: -50 });

        const onMouseMove = (e: MouseEvent) => {
            gsap.to(cursor, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.1,
                ease: 'power2.out'
            });
            gsap.to(follower, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.3,
                ease: 'power2.out'
            });
        };

        const onMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (
                target.tagName === 'A' ||
                target.tagName === 'BUTTON' ||
                target.closest('a') ||
                target.closest('button') ||
                target.classList.contains('interactive')
            ) {
                gsap.to(cursor, { scale: 1.5, opacity: 0.3, duration: 0.2 });
                gsap.to(follower, { scale: 1.6, borderColor: '#ec4899', duration: 0.2, backgroundColor: 'rgba(236,72,153,0.1)' });
            }
        };

        const onMouseOut = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (
                target.tagName === 'A' ||
                target.tagName === 'BUTTON' ||
                target.closest('a') ||
                target.closest('button') ||
                target.classList.contains('interactive')
            ) {
                gsap.to(cursor, { scale: 1, opacity: 1, duration: 0.2 });
                gsap.to(follower, { scale: 1, borderColor: 'rgba(99, 102, 241, 0.5)', duration: 0.2, backgroundColor: 'transparent' });
            }
        };

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseover', onMouseOver);
        window.addEventListener('mouseout', onMouseOut);

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseover', onMouseOver);
            window.removeEventListener('mouseout', onMouseOut);
        };
    }, []);

    return (
        <>
            <div
                ref={cursorRef}
                className="fixed top-0 left-0 w-2 h-2 bg-indigo-500 rounded-full pointer-events-none z-[9999] hidden md:block"
            />
            <div
                ref={followerRef}
                className="fixed top-0 left-0 w-6 h-6 border border-indigo-400/50 rounded-full pointer-events-none z-[9998] hidden md:block transition-[width,height,transform,opacity,border-color,background-color] duration-100 ease-out"
            />
        </>
    );
}
