import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import HeroSection from '@/components/sections/HeroSection'
import MagazineSection from '@/components/sections/MagazineSection'
import RoseGardenSection from '@/components/sections/RoseGardenSection'
import ShopSection from '@/components/sections/ShopSection'
import AboutSection from '@/components/sections/AboutSection'
import { useDispatch } from 'react-redux'
import { setLoading } from '@/store/slices/uiSlice'

const HomePage: React.FC = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    // Simulate loading data
    dispatch(setLoading(true))
    const timer = setTimeout(() => {
      dispatch(setLoading(false))
    }, 1000)

    return () => clearTimeout(timer)
  }, [dispatch])

  const sections = [
    { Component: HeroSection, delay: 0 },
    { Component: MagazineSection, delay: 0.1 },
    { Component: RoseGardenSection, delay: 0.2 },
    { Component: ShopSection, delay: 0.3 },
    { Component: AboutSection, delay: 0.4 },
  ]

  return (
    <div className="space-y-0">
      {sections.map(({ Component, delay }, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay }}
        >
          <Component />
        </motion.div>
      ))}
    </div>
  )
}

export default HomePage