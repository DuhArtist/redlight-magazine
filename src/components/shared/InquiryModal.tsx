import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronRight, Mail, Phone, User, MessageSquare, Palette, PenTool, Brush } from 'lucide-react'

interface InquiryModalProps {
  isOpen: boolean
  onClose: () => void
}

const InquiryModal: React.FC<InquiryModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    workType: '',
    details: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  // Sample gallery images for inspiration
  const galleryImages = [
    { src: '/assets/images/work-samples/sample1.jpg', title: 'Creative Writing Sample' },
    { src: '/assets/images/work-samples/sample2.jpg', title: 'Graphic Design Project' },
    { src: '/assets/images/work-samples/sample3.jpg', title: 'Art Creation' },
    { src: '/assets/images/work-samples/sample4.jpg', title: 'Brand Collaboration' }
  ]

  const workTypes = [
    { value: 'creative-writing', label: 'Creative Writing', icon: PenTool },
    { value: 'graphic-design', label: 'Graphic & Design', icon: Palette },
    { value: 'art-creation', label: 'Art Creation', icon: Brush },
    { value: 'other', label: 'Other Creative Work', icon: MessageSquare }
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitSuccess(true)
      
      // Reset form after success
      setTimeout(() => {
        setSubmitSuccess(false)
        setFormData({
          name: '',
          email: '',
          phone: '',
          workType: '',
          details: ''
        })
        onClose()
      }, 3000)
    }, 1500)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <div className="fixed inset-0 z-[101] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-6xl max-h-[90vh] overflow-hidden bg-gradient-to-br from-gray-900 to-black rounded-2xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 p-2 bg-black/50 rounded-full text-white hover:text-redlight-red hover:bg-white/10 transition-colors"
                aria-label="Close"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="grid lg:grid-cols-2 h-full">
                {/* Left Side - Gallery & Info */}
                <div className="relative p-8 lg:p-12 bg-gradient-to-br from-redlight-purple/10 to-redlight-red/5">
                  {/* Gallery Carousel */}
                  <div className="mb-8">
                    <h3 className="text-2xl font-playfair text-white mb-4">Recent Work</h3>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      {galleryImages.map((image, index) => (
                        <div 
                          key={index}
                          className="relative aspect-square overflow-hidden rounded-lg group cursor-pointer"
                        >
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10" />
                          <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 animate-pulse" />
                          <div className="absolute bottom-2 left-2 right-2 text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity z-20">
                            {image.title}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
                      <span className="w-2 h-2 bg-redlight-red rounded-full"></span>
                      <span className="w-2 h-2 bg-gray-600 rounded-full"></span>
                      <span className="w-2 h-2 bg-gray-600 rounded-full"></span>
                      <span className="w-2 h-2 bg-gray-600 rounded-full"></span>
                    </div>
                  </div>

                  {/* Call to Action Text */}
                  <div className="space-y-4">
                    <h2 className="text-3xl font-playfair font-bold text-white">
                      Let's Create Something Beautiful
                    </h2>
                    <p className="text-gray-300">
                      Every great collaboration starts with a conversation. Whether it's storytelling through words, 
                      visuals through design, or emotion through art - we're here to bring your vision to life.
                    </p>
                    <div className="space-y-3 text-sm text-gray-400">
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-redlight-red rounded-full"></div>
                        <span>Creative direction tailored to your unique voice</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-redlight-red rounded-full"></div>
                        <span>Premium quality with RedLight signature aesthetic</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-redlight-red rounded-full"></div>
                        <span>Dedicated support throughout the creative process</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Side - Form */}
                <div className="p-8 lg:p-12 bg-black/50 backdrop-blur-sm overflow-y-auto">
                  {submitSuccess ? (
                    <div className="h-full flex flex-col items-center justify-center text-center">
                      <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-6">
                        <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-playfair text-white mb-3">Inquiry Sent!</h3>
                      <p className="text-gray-300 mb-6">
                        Thank you for reaching out. We'll get back to you within 24 hours to discuss your creative project.
                      </p>
                      <button
                        onClick={onClose}
                        className="px-6 py-3 bg-redlight-red text-white rounded-full font-medium hover:bg-red-700 transition-colors"
                      >
                        Close
                      </button>
                    </div>
                  ) : (
                    <>
                      <h2 className="text-3xl font-playfair font-bold text-white mb-2">Start Your Creative Project</h2>
                      <p className="text-gray-400 mb-8">
                        Fill out the form below and we'll connect within 24 hours to discuss your vision.
                      </p>

                      <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Name */}
                        <div>
                          <label className="block text-gray-300 mb-2 text-sm font-medium">
                            <span className="flex items-center gap-2">
                              <User className="w-4 h-4" />
                              Name / Stage Name
                            </span>
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-redlight-red focus:ring-1 focus:ring-redlight-red transition-colors"
                            placeholder="Enter your name or stage name"
                          />
                        </div>

                        {/* Email */}
                        <div>
                          <label className="block text-gray-300 mb-2 text-sm font-medium">
                            <span className="flex items-center gap-2">
                              <Mail className="w-4 h-4" />
                              Email Address
                            </span>
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-redlight-red focus:ring-1 focus:ring-redlight-red transition-colors"
                            placeholder="you@example.com"
                          />
                        </div>

                        {/* Phone (Optional) */}
                        <div>
                          <label className="block text-gray-300 mb-2 text-sm font-medium">
                            <span className="flex items-center gap-2">
                              <Phone className="w-4 h-4" />
                              Phone Number <span className="text-gray-500 text-xs">(Optional - we'll text first)</span>
                            </span>
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-redlight-red focus:ring-1 focus:ring-redlight-red transition-colors"
                            placeholder="(123) 456-7890"
                          />
                        </div>

                        {/* Work Type */}
                        <div>
                          <label className="block text-gray-300 mb-2 text-sm font-medium">
                            Type of Work Needed
                          </label>
                          <div className="grid grid-cols-2 gap-3">
                            {workTypes.map((type) => {
                              const Icon = type.icon
                              return (
                                <button
                                  key={type.value}
                                  type="button"
                                  onClick={() => setFormData(prev => ({ ...prev, workType: type.value }))}
                                  className={`p-4 rounded-lg border flex flex-col items-center justify-center gap-2 transition-all ${
                                    formData.workType === type.value
                                      ? 'border-redlight-red bg-redlight-red/10 text-redlight-red'
                                      : 'border-white/10 bg-white/5 text-gray-300 hover:border-redlight-red/50 hover:text-white'
                                  }`}
                                >
                                  <Icon className="w-5 h-5" />
                                  <span className="text-xs font-medium">{type.label}</span>
                                </button>
                              )
                            })}
                          </div>
                          <input
                            type="hidden"
                            name="workType"
                            value={formData.workType}
                            onChange={handleInputChange}
                            required
                          />
                        </div>

                        {/* Details */}
                        <div>
                          <label className="block text-gray-300 mb-2 text-sm font-medium">
                            <span className="flex items-center gap-2">
                              <MessageSquare className="w-4 h-4" />
                              Project Details
                            </span>
                          </label>
                          <textarea
                            name="details"
                            value={formData.details}
                            onChange={handleInputChange}
                            required
                            rows={4}
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-redlight-red focus:ring-1 focus:ring-redlight-red transition-colors resize-none"
                            placeholder="Tell us about your project, vision, timeline, and any specific requirements..."
                          />
                        </div>

                        {/* Submit Button */}
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full py-4 bg-gradient-to-r from-redlight-red to-redlight-purple text-white rounded-full font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                        >
                          {isSubmitting ? (
                            <>
                              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                              Sending...
                            </>
                          ) : (
                            <>
                              Send Inquiry
                              <ChevronRight className="w-5 h-5" />
                            </>
                          )}
                        </button>

                        <p className="text-gray-500 text-xs text-center">
                          By submitting, you agree to receive communications about your inquiry. We respect your privacy.
                        </p>
                      </form>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}

export default InquiryModal