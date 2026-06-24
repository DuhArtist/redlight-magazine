import React from 'react'
import { Instagram, Twitter, Youtube } from 'lucide-react'

const SocialIcons: React.FC = () => {
  const socialLinks = [
    {
      name: 'Instagram',
      icon: Instagram,
      url: 'https://www.instagram.com/1generousking/',
      color: 'hover:text-pink-500',
    },
    {
      name: 'Twitter',
      icon: Twitter,
      url: 'https://x.com/1generousking',
      color: 'hover:text-blue-400',
    },
    {
      name: 'YouTube',
      icon: Youtube,
      url: 'https://www.youtube.com/@1generousking',
      color: 'hover:text-red-500',
    },
  ]

  return (
    <div className="flex items-center space-x-4">
      {socialLinks.map((social) => (
        <a
          key={social.name}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`text-gray-400 ${social.color} transition-colors duration-300`}
          aria-label={social.name}
        >
          <social.icon className="h-6 w-6" />
        </a>
      ))}
    </div>
  )
}

export default SocialIcons