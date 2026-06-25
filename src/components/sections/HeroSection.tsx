import React, { useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, EffectFade } from 'swiper/modules'
import { motion, AnimatePresence } from 'framer-motion'
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/pagination'

const HeroSection: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState(0)
  const swiperRef = useRef<any>(null)

  const slides = [
    {
      image: 'https://res.cloudinary.com/xamspc0g/image/upload/v1782408905/magazine_iwykkk.png',
      alt: 'Elexus Jionde Magazine Concept',
      title: 'Elexus Jionde Magazine Concept',
      caption: 'A visual exploration of artistic expression'
    },
    {
      image: 'https://res.cloudinary.com/xamspc0g/image/upload/v1782408905/pussypop_kptqzb.png',
      alt: 'Holly Hendrix Experience',
      title: 'Holly Hendrix Experience',
      caption: 'Holly recaps a traumatic experience from the industry'
    },
    {
      image: 'https://res.cloudinary.com/xamspc0g/image/upload/v1782408906/ebonee_ivsvcb.png',
      alt: 'Ebonee Magazine Concept',
      title: 'Ebonee Magazine Concept',
      caption: 'Redefining creative boundaries'
    },
  ]

  return (
    <section className="relative min-h-screen bg-black overflow-hidden border-b border-gray-400">
      <div className="flex flex-col lg:flex-row h-screen ">
      {/* Left Column: RedLight Definition Sidebar */}
      <div className="lg:w-1/4 bg-white text-black p-8 lg:p-12 flex flex-col justify-between hidden lg:block">
        <div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-5xl font-playfair font-bold mb-4"
          >
            red·light
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-4"
          >
            <h2 className="text-xl font-roboto font-semibold text-gray-700">
              [ˌred ˈlīt] noun
            </h2>
            <div className="text-gray-800 space-y-4">
              <div className="pt-4 border-t border-gray-200">
                <p className="text-gray-700 text-l mb-2">
                  Articles, artwork, and creative services for adult entertainers and service providers <br/> — beyond skin.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="pt-8 border-t border-gray-200"
        >
        </motion.div>
      </div>

      {/* Right Column: Full-screen Slider */}
      <div className="lg:absolute lg:right-0 lg:top-0 lg:w-3/4 h-screen">
        <Swiper
          onSwiper={(swiper) => {
            swiperRef.current = swiper
          }}
          onSlideChange={(swiper) => setActiveSlide(swiper.activeIndex)}
          spaceBetween={0}
          effect={'fade'}
          autoplay={{
            delay: 8000, // 12 seconds
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
            el: '.swiper-pagination',
            bulletClass: 'swiper-pagination-bullet',
            bulletActiveClass: 'swiper-pagination-bullet-active',
          }}
          modules={[Autoplay, EffectFade, Pagination]}
          className="h-full w-full"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="relative h-full w-full">
                <img
                  src={slide.image}
                  alt={slide.alt}
                  className="absolute inset-0 h-full w-full object-cover"
                  loading="lazy"
                />
                {/* Dark overlay for better text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              </div>
            </SwiperSlide>
          ))}
          
          {/* Pagination in Top Right Corner */}
        <div className="swiper-pagination !top-6 !right-6 !left-auto !bottom-auto !w-auto !space-x-2" />
        </Swiper>

        {/* Overlay Text with Slide-in Animation */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSlide}
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0 flex items-end pointer-events-none z-10"
          >
            <div className="w-full p-8 lg:p-12">
              <div className="text-white max-w-xl">
                <p className="text-lg md:text-xl font-roboto mb-4">
                  {slides[activeSlide].title}
                  <br />
                  <span className="font-bold">{slides[activeSlide].caption}</span>
                </p>
                <div className="flex items-center gap-4">
                  <div className="h-px w-12 bg-white/50"></div>
                  <span className="text-sm text-white/70">
                    {slides[activeSlide].title}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Mobile Sidebar (only shows on mobile) */}
      <div className="lg:hidden bg-white text-black p-6">
        <div className="mb-4">
          <h1 className="text-3xl font-playfair font-bold mb-2">
            red·light
          </h1>
          <h2 className="text-lg font-roboto font-semibold text-gray-700 mb-2">
            [ˌred ˈlīt] noun
          </h2>
          <p className="text-gray-700">
            Dedications of <span className="font-semibold">art, story, and design for creatives beyond skin</span>.
          </p>
        </div>
        
      </div>
    </div>
    </section>
  )
}

export default HeroSection