import React, { ReactNode } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { motion } from 'framer-motion'
// Remove useSelector and RootState imports if not needed
// import { useSelector } from 'react-redux'
// import { RootState } from '@/store'

interface LayoutProps {
  children: ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  // Remove the unused isLoading variable entirely
  // const _isLoading = useSelector((state: RootState) => state.ui.isLoading)

  return (
    <div className="min-h-screen flex flex-col bg-dark-bg">
      <main className="flex-grow">
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