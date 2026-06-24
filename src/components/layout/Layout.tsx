import React, { ReactNode } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { motion, AnimatePresence } from 'framer-motion'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'

interface LayoutProps {
  children: ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const isLoading = useSelector((state: RootState) => state.ui.isLoading)

  // REMOVE the loading spinner logic - it's causing infinite loading
  // We'll handle loading states per component instead

  return (
    <div className="min-h-screen flex flex-col bg-dark-bg">
      <main className="flex-grow">
        {/* Remove the AnimatePresence loading logic */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {children}
        </motion.div>
      </main>
            <Navbar />
      <Footer />
    </div>
  )
}

export default Layout