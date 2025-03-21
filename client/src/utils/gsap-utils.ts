import gsap from "gsap";
import { MutableRefObject, RefObject } from "react";
import SplitType from "split-type";

function aboutSectionParallaxImage(
    aboutWrapperRef: RefObject<HTMLDivElement | null>,
    aboutImageRef: RefObject<HTMLDivElement | null>
) {
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: aboutWrapperRef.current,
            start: "-=100% top",
            end: "50% top",
            scrub: true,
        },
    });

    tl.to(aboutImageRef.current, {
        ease: "none",
        yPercent: -50,
    });
}

function aboutSectionTextReveal(
    text: SplitType,
    aboutWrapperRef: RefObject<HTMLDivElement | null>,
) {
    gsap.from(text.chars, {
        scrollTrigger: {
            trigger: aboutWrapperRef.current,
            start: "top center",
            end: "center center",
            scrub: true,
        },
        opacity: 0.2,
        stagger: 0.1,
    });

    return () => {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
}


function artWorkSectionParallax(
    artWorkWrapperRef: MutableRefObject<HTMLDivElement | null>,
    artWorkParallaxImageRef: MutableRefObject<HTMLDivElement | null>
) {
    const parallaxTl = gsap.timeline({
        scrollTrigger: {
            trigger: artWorkWrapperRef.current,
            start: "-=100% top",
            end: "50% top",
            scrub: true,
        },
    });

    parallaxTl.to(artWorkParallaxImageRef.current, {
        ease: "none",
        yPercent: -150,
    });

    return () => {
        parallaxTl.kill();
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
}

function artWorkSectionScale(
    artWorkWrapperRef: MutableRefObject<HTMLDivElement | null>,
    artWorkScaleImageRef: MutableRefObject<HTMLDivElement | null>,
    word1: SplitType,
    word2: SplitType
) {
    const scaleTl = gsap.timeline({
        scrollTrigger: {
            trigger: artWorkWrapperRef.current,
            start: "top 100vh",
            end: "bottom+=50% top",
            scrub: true,
            // pin: true,
            // markers: true
        },
        
    });

    scaleTl
        .to(artWorkScaleImageRef.current, {
            ease: "none",
            width: "100vw",
            marginLeft: 0,
            marginTop: "-30vw",
            height: "200vh",
        })
        .to(
            ".art_work_container",
            {
                paddingTop: "0px",
                height: "100vh",
                overflow: "hidden",
            },
            0
        )
        // Both word1 and word2 animations start at the same time
        .fromTo(
            word1.chars,
            { opacity: 0, translateY: "100%" },
            {
                translateY: "0%",
                opacity: 1,
                stagger: -0.05, // Stagger backwards for word1
            },
            "-=0.1"
        )
        .fromTo(
            word2.chars,
            { opacity: 0, translateY: "100%" },
            {
                translateY: "0%",
                opacity: 1,
                stagger: 0.05, // Stagger forwards for word2
            },
            "<"
        )
        .to(
            ".art_overlay",
            {
                opacity: 1,
            },
            "<"
        );

    // Sync word1 and word2 animation with image reaching 100% width
    // scaleTl.addLabel("textStart", "+=1") // Start the text animation shortly after the image starts scaling
    //     .fromTo(word1.chars, { opacity: 0 }, { opacity: 1, stagger: 0.1, duration: 1, ease: "power1.inOut" }, "textStart")
    //     .fromTo(word2.chars, { opacity: 0 }, { opacity: 1, stagger: 0.1, duration: 1, ease: "power1.inOut" }, "textStart+=0.5");
        return () => {
            scaleTl.kill();
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
}


export {
    artWorkSectionParallax,
    artWorkSectionScale,
    aboutSectionParallaxImage,
    aboutSectionTextReveal
};
