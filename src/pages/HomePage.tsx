import { motion } from 'framer-motion'
import HeroSection from '@/components/sections/HeroSection'
import MagazineSection from '@/components/sections/MagazineSection'
import RoseGardenSection from '@/components/sections/RoseGardenSection'
import ShopSection from '@/components/sections/ShopSection'
import AboutSection from '@/components/sections/AboutSection'

const sections = [
  { Component: HeroSection, delay: 0.1 },
  { Component: MagazineSection, delay: 0.3 },
  { Component: RoseGardenSection, delay: 0.5 },
  { Component: ShopSection, delay: 0.7 },
  { Component: AboutSection, delay: 0.9 },
]

export default function HomePage() {
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