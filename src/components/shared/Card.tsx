import React, { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

interface BaseCardProps {
  children: ReactNode
  className?: string
  hoverable?: boolean
  onClick?: () => void
}

export const BaseCard: React.FC<BaseCardProps> = ({ 
  children, 
  className = '', 
  hoverable = true,
  onClick 
}) => {
  return (
    <motion.div
      className={`
        bg-white/5 backdrop-blur-sm border border-gray-800 rounded-xl 
        overflow-hidden transition-all duration-300
        ${hoverable ? 'hover:bg-white/10 hover:border-gray-700 hover:scale-[1.02]' : ''}
        ${className}
      `}
      whileHover={hoverable ? { y: -3 } : {}}
      onClick={onClick}
    >
      {children}
    </motion.div>
  )
}

interface CardProps {
  children: ReactNode
  className?: string
  hoverable?: boolean
  onClick?: () => void
  variant?: 'default' | 'article' | 'rose' | 'issue' | 'product' | 'art' | 'design'
  href?: string
}

const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  hoverable = true,
  onClick,
  variant = 'default',
  href
}) => {
  const baseClasses = {
    default: 'bg-white/5 backdrop-blur-sm border border-gray-800',
    article: 'bg-white shadow-lg hover:shadow-2xl border border-gray-100',
    rose: 'bg-white shadow-lg hover:shadow-2xl border border-gray-100',
    issue: 'bg-white/10 backdrop-blur-sm border border-white/20',
    product: 'bg-white shadow-lg hover:shadow-2xl border border-gray-100',
    art: 'bg-white shadow-lg hover:shadow-xl border border-gray-100',
    design: 'bg-white shadow-lg hover:shadow-xl border border-gray-100'
  }

  const content = (
    <motion.div
      className={`
        rounded-xl overflow-hidden transition-all duration-300
        ${baseClasses[variant]}
        ${hoverable ? 'hover:scale-[1.02]' : ''}
        ${className}
      `}
      whileHover={hoverable ? { y: -8 } : {}}
      onClick={onClick}
    >
      {children}
    </motion.div>
  )

  if (href) {
    return (
      <Link to={href} className="block">
        {content}
      </Link>
    )
  }

  return content
}

// Helper components for specific card types
interface ArticleCardProps {
  image: string
  title: string
  excerpt: string
  date?: string
  slug: string
  category?: string
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  image,
  title,
  excerpt,
  date,
  slug,
  category
}) => {
  return (
    <Card variant="article" href={`/article/${slug}`}>
      <div className="group">
        <div className="overflow-hidden rounded-t-xl">
          <img 
            src={image} 
            alt={title}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="p-6">
          {category && (
            <span className="inline-block px-3 py-1 bg-redlight-red/10 text-redlight-red text-xs rounded-full mb-2">
              {category}
            </span>
          )}
          <h3 className="font-playfair font-bold text-xl mb-2 group-hover:text-redlight-red transition-colors">
            {title}
          </h3>
          {excerpt && (
            <p className="text-gray-600 text-sm line-clamp-2 mb-3">
              {excerpt}
            </p>
          )}
          {date && (
            <span className="text-gray-400 text-xs">{date}</span>
          )}
        </div>
      </div>
    </Card>
  )
}

interface RoseCardProps {
  image: string
  name: string
  bio: string
  slug: string
  category?: string
}

export const RoseCard: React.FC<RoseCardProps> = ({
  image,
  name,
  bio,
  slug,
  category
}) => {
  return (
    <Card variant="rose" href={`/rose/${slug}`}>
      <div className="group">
        <div className="aspect-square overflow-hidden">
          <img 
            src={image} 
            alt={name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
        </div>
        <div className="p-4 text-center mt-4">
          <h3 className="font-playfair font-bold text-lg text-gray-900">{name}</h3>
          {bio && (
            <p className="text-gray-600 text-sm mt-2 line-clamp-2">
              {bio}
            </p>
          )}
          {category && (
            <span className="inline-block px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full mt-2">
              {category}
            </span>
          )}
        </div>
      </div>
    </Card>
  )
}

interface IssueCardProps {
  image: string
  title: string
  description: string
  issueNumber: string
  slug: string
}

export const IssueCard: React.FC<IssueCardProps> = ({
  image,
  title,
  description,
  issueNumber,
  slug
}) => {
  return (
    <Card variant="issue" href={`/magazine/${slug}`}>
      <div className="group p-6 text-center">
        <img 
          src={image} 
          alt={title}
          className="w-full max-w-xs mx-auto aspect-[3/4] object-cover rounded-lg"
        />
        <div className="mt-4">
          <h2 className="text-xl font-playfair font-bold text-white mb-2">{title}</h2>
          <p className="text-gray-300 text-sm mb-3">{description}</p>
          <div className="w-8 h-px bg-gray-400 mx-auto my-4"></div>
          <p className="text-gray-400 text-sm">Issue {issueNumber}</p>
        </div>
      </div>
    </Card>
  )
}

interface ProductCardProps {
  image: string
  name: string
  price: string
  category: string
  onClick: () => void
}

export const ProductCard: React.FC<ProductCardProps> = ({
  image,
  name,
  price,
  category,
  onClick
}) => {
  return (
    <Card variant="product" hoverable onClick={onClick}>
      <div className="group cursor-pointer">
        <div className="overflow-hidden">
          <img 
            src={image} 
            alt={name}
            className="w-full h-48 object-cover"
          />
        </div>
        <div className="p-4">
          <span className="text-gray-500 text-xs uppercase tracking-wider">{category}</span>
          <h3 className="font-semibold text-gray-900 mt-1">{name}</h3>
          <p className="text-redlight-red font-bold mt-2">{price}</p>
        </div>
      </div>
    </Card>
  )
}

interface ArtDesignCardProps {
  image: string
  title: string
  artist: string
  description: string
  slug: string
  type: 'art' | 'design'
}

export const ArtDesignCard: React.FC<ArtDesignCardProps> = ({
  image,
  title,
  artist,
  description,
  slug,
  type
}) => {
  return (
    <Card variant={type as any} href={`/${type}/${slug}`}>
      <div className="group">
        <div className="overflow-hidden bg-gray-50">
          <img 
            src={image} 
            alt={title}
            className="w-full h-64 object-cover"
          />
        </div>
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-playfair font-bold text-lg text-gray-900">{title}</h3>
            <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
              {type === 'art' ? 'Art' : 'Design'}
            </span>
          </div>
          <p className="text-gray-600 text-sm mb-1">by {artist}</p>
          <p className="text-gray-500 text-sm line-clamp-2">{description}</p>
        </div>
      </div>
    </Card>
  )
}

export default Card