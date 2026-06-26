import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleMobileMenu, closeMobileMenu } from '@/store/slices/uiSlice'
import { RootState } from '@/store'
import InquiryModal from '@/components/shared/InquiryModal'

const Navbar: React.FC = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isInquiryOpen, setIsInquiryOpen] = useState(false)
  const dispatch = useDispatch()
  const mobileMenuOpen = useSelector((state: RootState) => state.ui.mobileMenuOpen)

  const navItems = [
    { 
      label: 'Reads', 
      path: '/reads',
      icon: null
    },
    { 
      label: 'Visit Garden', 
      path: '/rose-garden',
      submenu: [
        { label: 'Roses', path: '/rose-garden?category=roses' },
        { label: 'Artwork', path: '/rose-garden?category=artwork' },
        { label: 'Design', path: '/rose-garden?category=design' },
        { label: 'Collabs', path: '/rose-garden?category=collabs' },
      ]
    },
    { 
      label: 'Inquire', 
      onClick: () => setIsInquiryOpen(true),
      icon: null
    },
    { 
      label: 'Sto\'', 
      path: '/shop',
      icon: null
    },
  ]

  // Handle scroll for sticky navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Custom upward diagonal arrow icon
  const UpDiagonalArrow = () => (
    <svg 
      className="ml-1 h-3 w-3" 
      fill="none" 
      stroke="currentColor" 
      viewBox="0 0 24 24"
    >
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeWidth={2} 
        d="M7 17L17 7M17 7H7M17 7V17" 
      />
    </svg>
  )

  return (
    <>
      <nav className={`fixed top-8 right-8 z-50 transition-all duration-300 ease-in-out ${
        scrolled ? 'opacity-45 hover:opacity-100' : 'opacity-100'
      }`}>
        <div className="relative">
          {/* Main Navbar Container */}
          <div className="bg-black/80 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 shadow-2xl flex items-center">
            {/* Home Image Tab */}
            <div className="relative group mr-4">
              <Link
                to="/"
                onClick={() => dispatch(closeMobileMenu())}
                className="block"
              >
                <div className="w-8 h-8 opacity-80 hover:opacity-100 hover:scale-110 transition-all duration-300">
                  <img 
                    src="https://res.cloudinary.com/xamspc0g/image/upload/v1782413710/redlight-neon-logo_uwt6wm.png"
                    alt="Home"
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    title="Home"
                  />
                </div>
                {/* Tooltip on hover */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black/90 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                  Home
                </div>
              </Link>
            </div>

            {/* Divider */}
            <div className="h-6 w-px bg-white/30 mr-4"></div>

            {/* Navigation Items */}
            <div className="flex items-center space-x-6">
              {navItems.map((item) => (
                <div key={item.label} className="relative group">
                  {item.submenu ? (
                    <>
                      <button
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        className="flex items-center text-white/90 hover:text-redlight-red font-playfair text-sm font-medium transition-colors uppercase tracking-wider group"
                      >
                        {item.label}
                        <UpDiagonalArrow />
                      </button>
                      <AnimatePresence>
                        {dropdownOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 10, x: -10 }}
                            animate={{ opacity: 1, y: 0, x: 0 }}
                            exit={{ opacity: 0, y: 10, x: -10 }}
                            className="absolute left-0 bottom-full mb-2 w-48 bg-black/90 backdrop-blur-sm border border-white/10 rounded-lg shadow-xl z-50"
                          >
                            {item.submenu.map((subItem) => (
                              <Link
                                key={subItem.label}
                                to={subItem.path}
                                className="block px-4 py-3 text-white/80 hover:text-redlight-red hover:bg-white/5 transition-colors text-sm uppercase tracking-wider"
                                onClick={() => setDropdownOpen(false)}
                              >
                                {subItem.label}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : item.onClick ? (
                    <button
                      onClick={item.onClick}
                      className="text-white/90 hover:text-redlight-red font-playfair text-sm font-medium transition-colors uppercase tracking-wider"
                    >
                      {item.label}
                    </button>
                  ) : (
                    <Link
                      to={item.path}
                      className="text-white/90 hover:text-redlight-red font-playfair text-sm font-medium transition-colors uppercase tracking-wider"
                      onClick={() => dispatch(closeMobileMenu())}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => dispatch(toggleMobileMenu())}
            className="md:hidden absolute -top-12 left-0 text-white/90 hover:text-redlight-red p-2 bg-black/50 backdrop-blur-sm rounded-full"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          {/* Mobile Menu */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="md:hidden absolute bottom-full left-0 mb-2 w-64 bg-black/95 backdrop-blur-sm border border-white/10 rounded-lg shadow-xl"
              >
                <div className="p-4 space-y-3">
                  {/* Home in mobile menu */}
                  <div className="pb-3 border-b border-white/10">
                    <Link
                      to="/"
                      className="flex items-center gap-3 text-white/90 hover:text-redlight-red"
                      onClick={() => dispatch(closeMobileMenu())}
                    >
                      <div className="w-8 h-8 rounded-full overflow-hidden">
                        <img 
                          src="https://res.cloudinary.com/xamspc0g/image/upload/v1782413710/redlight-neon-logo_uwt6wm.png"
                          alt="Home"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="font-playfair font-medium">Home</span>
                    </Link>
                  </div>

                  {navItems.map((item) => (
                    <div key={item.label}>
                      {item.submenu ? (
                        <>
                          <button
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                            className="flex items-center justify-between w-full text-white/90 hover:text-redlight-red font-playfair text-sm font-medium py-2 uppercase tracking-wider"
                          >
                            <span>{item.label}</span>
                            <svg 
                              className={`h-3 w-3 transition-transform ${dropdownOpen ? 'rotate-45' : ''}`}
                              fill="none" 
                              stroke="currentColor" 
                              viewBox="0 0 24 24"
                            >
                              <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={2} 
                                d="M7 17L17 7M17 7H7M17 7V17" 
                              />
                            </svg>
                          </button>
                          <AnimatePresence>
                            {dropdownOpen && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="pl-4 space-y-2 border-l border-white/10"
                              >
                                {item.submenu.map((subItem) => (
                                  <Link
                                    key={subItem.label}
                                    to={subItem.path}
                                    className="block text-white/70 hover:text-redlight-red py-1.5 text-sm uppercase tracking-wider"
                                    onClick={() => {
                                      setDropdownOpen(false)
                                      dispatch(closeMobileMenu())
                                    }}
                                  >
                                    {subItem.label}
                                  </Link>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </>
                      ) : item.onClick ? (
                        <button
                          onClick={() => {
                            item.onClick?.()
                            dispatch(closeMobileMenu())
                          }}
                          className="block w-full text-left text-white/90 hover:text-redlight-red font-playfair text-sm font-medium py-2 uppercase tracking-wider"
                        >
                          {item.label}
                        </button>
                      ) : (
                        <Link
                          to={item.path}
                          className="block text-white/90 hover:text-redlight-red font-playfair text-sm font-medium py-2 uppercase tracking-wider"
                          onClick={() => dispatch(closeMobileMenu())}
                        >
                          {item.label}
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      {/* Inquiry Modal */}
      <InquiryModal isOpen={isInquiryOpen} onClose={() => setIsInquiryOpen(false)} />
    </>
  )
}

export default Navbar