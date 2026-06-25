import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const AboutSection: React.FC = () => {
  return (
    <section className="section-padding bg-black text-white relative overflow-hidden">
      <div className="container-narrow">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <img 
            src="https://res.cloudinary.com/xamspc0g/image/upload/v1782412714/redlight-beyond-skin-logo_atqkdj.png" 
            alt="RedLight Beyond Skin"
            className="h-36 mx-auto mb-8 opacity-90"
          />
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          
          
          <div className="space-y-6 text-lg leading-relaxed">
            <p>
              RedLight is a safe place for women to constructively build themselves, creatively be themselves, and access people & information of value.
            </p>
            
            <p>
              Every idea, work of art, sound, production, and intention is rooted in love, truth, and authenticity. RedLight is a network and a resource — creating what it feels is necessary to <em className="italic text-pink-200">progress good people.</em>
            </p>
            
            <p>
              There is enough porn. There are enough platforms that leech rather than teach. There is enough of being senseless with our bodies, unknowing with our minds, and lost in our spirits. Beyond being a safe place for women, <em className="italic text-pink-200">RedLight is an example of ownership, freedom, and constructive power</em> for anyone who studies the movement as we grow. Rebellious & militant — yet constructive in power, pushing forward sovereignty of self and civil rights <em className="italic text-pink-200">beyond skin...</em>
            </p>
            
            <p>
              This is a safe place. This is a creative space.
            </p>
          </div>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap justify-center gap-4 mt-12"
          >
            <Link
              to="/about"
              className="px-8 py-3 border-2 border-white-200 text-white-200 rounded-full hover:bg-pink-200 hover:text-black transition-colors font-semibold"
            >
              Let's Work
            </Link>
          </motion.div>
          
        </motion.div>
      </div>
    </section>
  )
}

export default AboutSection