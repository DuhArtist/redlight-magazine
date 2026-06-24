import React from 'react'
import SocialIcons from '@/components/shared/SocialIcons'

const Footer: React.FC = () => {
  return (
    <footer className="bg-black border-t border-gray-800 py-8">
      <div className="container-narrow px-4">
        <div className="flex flex-col items-center space-y-6">
          <SocialIcons />
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} RedLight Safe Place LLC. — Beyond Skin
          </p>
          <p className="text-gray-500 text-xs text-center max-w-md">
            RedLight is a safe place for women to constructively build themselves, 
            creatively be themselves, and access information of value and people of value.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer