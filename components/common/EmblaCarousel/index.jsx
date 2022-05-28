import React, { useState, useEffect, useCallback, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { DotButton, NextButton, PrevButton } from "../EmblaCarouselButtons";
// import { mediaByIndex } from "../media";
import Autoplay from "embla-carousel-autoplay";
import { getStrapiMedia } from "../../../lib/media";
import ImagePerso from "../../bloc/image";
import Link from "next/link";
import { ButtonSecondary } from "../Button";

// function to slice string and add ... at the end
const sliceString = (str, limit) => {
  const newStr = str.slice(0, limit);
  return `${newStr}...`;
};

const PARALLAX_FACTOR = 1.2;

const EmblaCarousel = ({ slides }) => {
  const autoplay = useRef(
    Autoplay(
      { delay: 10000, stopOnInteraction: false },
      (emblaRoot) => emblaRoot.parentElement
    )
  );

  useEffect(() => {
    console.log(slides);

  }, [slides]);

  // const [emblaRef, emblaApi] = useEmblaCarousel(options, [autoplay.current]);
  const [viewportRef, embla] = useEmblaCarousel({ skipSnaps: false, loop: true }, [autoplay.current]);
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);
  const [parallaxValues, setParallaxValues] = useState([]);


  const scrollNext = useCallback(() => {
    if (!embla) return;
    embla.scrollNext();
    autoplay.current.reset();
  }, [embla]);

  const scrollPrev = useCallback(() => {
    if (!embla) return;
    embla.scrollPrev();
    autoplay.current.reset();
  }, [embla]);

  const scrollTo = useCallback((index) => embla && embla.scrollTo(index), [
    embla
  ]);

  const onSelect = useCallback(() => {
    if (!embla) return;
    setSelectedIndex(embla.selectedScrollSnap());
    setPrevBtnEnabled(embla.canScrollPrev());
    setNextBtnEnabled(embla.canScrollNext());
  }, [embla, setSelectedIndex]);

  const onScroll = useCallback(() => {
    if (!embla) return;

    const engine = embla.internalEngine();
    const scrollProgress = embla.scrollProgress();

    const styles = embla.scrollSnapList().map((scrollSnap, index) => {
      if (!embla.slidesInView().includes(index)) return 0;
      let diffToTarget = scrollSnap - scrollProgress;

      if (engine.options.loop) {
        engine.slideLooper.loopPoints.forEach((loopItem) => {
          const target = loopItem.getTarget();
          if (index === loopItem.index && target !== 0) {
            const sign = Math.sign(target);
            if (sign === -1) diffToTarget = scrollSnap - (1 + scrollProgress);
            if (sign === 1) diffToTarget = scrollSnap + (1 - scrollProgress);
          }
        });
      }
      return diffToTarget * (-1 / PARALLAX_FACTOR) * 100;
    });
    setParallaxValues(styles);
  }, [embla, setParallaxValues]);

  useEffect(() => {
    if (!embla) return;
    onSelect();
    setScrollSnaps(embla.scrollSnapList());
    embla.on("select", onSelect);
    embla.on("select", onSelect);
    embla.on("scroll", onScroll);
    embla.on("resize", onScroll);
  }, [embla, setScrollSnaps, onSelect]);


  return (
    <div className="embla__section">
      <div className="embla">
        <div className="embla__viewport" ref={viewportRef}>
          <div className="embla__container">
            {slides.map((slide, index) => (
              <div className="embla__slide" key={index}>
                <div className="embla__slide__inner">
                  <div
                    className="embla__slide__parallax"
                    style={{ transform: `translateX(${parallaxValues[index]}%)` }}
                  >
                    <div className="embla__slide__card">
                      <div className="embla__slide__card__body">
                        <div className="embla__slide__card__body--title t-1">{slide.attributes.titre}</div>
                        <div className="embla__slide__card__body--description p-1">{sliceString(slide.attributes.description, 50)}</div>
                        <Link href={`/article/${slide.attributes.slug}`}>
                          <ButtonSecondary className="embla__slide__card__body--btn">Voir l'article</ButtonSecondary>
                        </Link>
                      </div>
                      <div className="embla__slide__card--categories">{slide.attributes?.podcast_types?.data.map(((type, index) => <span key={index} className="category">{type.attributes.type}</span>))}</div>
                      <ImagePerso classProp="embla__slide__card--background" image={slide.attributes.cover} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* <PrevButton onClick={scrollPrev} enabled={prevBtnEnabled} />
        <NextButton onClick={scrollNext} enabled={nextBtnEnabled} /> */}
      </div>
      <div className="embla__dots">
        {scrollSnaps.map((_, index) => (
          <DotButton
            key={index}
            selected={index === selectedIndex}
            onClick={() => scrollTo(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default EmblaCarousel;
