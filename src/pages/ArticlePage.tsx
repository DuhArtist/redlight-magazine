import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useGetArticleByIdQuery } from '@/store/api/articlesApi'
import { Calendar, User, Tag, ArrowLeft } from 'lucide-react'

const ArticlePage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const { data: article, isLoading } = useGetArticleByIdQuery(id || '')

  // Helper function to safely render date
  const renderDate = (date: string | Date | undefined) => {
    if (!date) return 'Date unavailable'
    if (date instanceof Date) return date.toLocaleDateString()
    return String(date)
  }

  // Helper function to safely render author
  const renderAuthor = (author: string | { name: string } | undefined) => {
    if (!author) return 'Unknown author'
    if (typeof author === 'string') return author
    if (typeof author === 'object' && author.name) return author.name
    return 'Unknown author'
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-redlight-red"></div>
      </div>
    )
  }

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-playfair font-bold mb-4">Article not found</h2>
          <Link to="/reads" className="text-redlight-red hover:text-red-700">
            Back to Reads
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Back Button */}
      <div className="container-narrow pt-8">
        <Link 
          to="/reads" 
          className="inline-flex items-center gap-2 text-gray-600 hover:text-redlight-red transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Reads
        </Link>
      </div>

      {/* Article Header */}
      <div className="container-narrow py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {article.category && (
            <span className="inline-block px-3 py-1 bg-redlight-red/10 text-redlight-red text-sm font-semibold rounded-full mb-4">
              {article.category}
            </span>
          )}
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold text-gray-900 mb-6">
            {article.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-8">
            <span className="flex items-center gap-2">
              <User className="w-4 h-4" />
              {renderAuthor(article.author)}
            </span>
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {renderDate(article.date)}
            </span>
            {article.tags && article.tags.length > 0 && (
              <span className="flex items-center gap-2">
                <Tag className="w-4 h-4" />
                {article.tags.map((tag, index) => (
                  <span key={index} className="text-sm">
                    #{tag}{index < article.tags.length - 1 ? ', ' : ''}
                  </span>
                ))}
              </span>
            )}
          </div>

          {article.imageUrl && (
            <div className="rounded-2xl overflow-hidden mb-8 shadow-xl">
              <img 
                src={article.imageUrl} 
                alt={article.title}
                className="w-full h-auto max-h-[600px] object-cover"
              />
            </div>
          )}

          {article.excerpt && (
            <div className="text-xl text-gray-700 font-medium border-l-4 border-redlight-red pl-6 mb-8">
              {article.excerpt}
            </div>
          )}
        </motion.div>
      </div>

      {/* Article Content */}
      <div className="container-narrow pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="prose prose-lg max-w-none"
        >
          <div dangerouslySetInnerHTML={{ __html: article.content }} />
        </motion.div>
      </div>
    </div>
  )
}

export default ArticlePage