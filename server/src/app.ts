import express, { Request, Response, NextFunction } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import { config } from 'dotenv'

// Load environment variables
config()

const app = express()
const PORT = process.env.PORT || 5000

// CORS Configuration - ALLOW ALL ORIGINS FOR DEVELOPMENT
const corsOptions = {
  origin: true, // Allow all origins in development
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  exposedHeaders: ['Content-Range', 'X-Content-Range'],
}

// Middleware
app.use(cors(corsOptions)) // Apply CORS with options
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }, // Allow cross-origin resources
}))
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Handle preflight requests for all routes
app.options('*', cors(corsOptions))

// Serve static files from public directory
app.use('/assets', express.static('public/assets'))

// API Routes
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ 
    status: 'OK', 
    message: 'RedLight Magazine API is running',
    timestamp: new Date().toISOString()
  })
})

// Articles endpoints
app.get('/api/articles/featured', (req: Request, res: Response) => {
  const featuredArticles = [
    {
      id: '1',
      title: 'Born is the RedLight Revolution',
      excerpt: 'The beginning of a new era in creative expression',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      imageUrl: '/assets/images/articles/taleen-test.png',
      date: 'December 1996',
      category: 'featured',
      author: 'RedLight Team',
      featured: true,
      published: true,
      views: 2500,
      tags: ['revolution', 'beginning', 'redlight']
    }
  ]
  res.json(featuredArticles)
})

app.get('/api/articles/latest', (req: Request, res: Response) => {
  const latestArticles = [
    {
      id: '1',
      title: 'RedLight Saving Heauxs',
      excerpt: 'The brand innovating adult entertainment and healing the Heauxs',
      content: 'Full article content about innovation and healing...',
      imageUrl: '/assets/images/articles/spreads/saving-heauxs-spread.png',
      date: '2024-01-15',
      category: 'news',
      author: 'Admin',
      featured: false,
      published: true,
      views: 1500,
      tags: ['heauxs', 'innovation', 'healing']
    },
    {
      id: '2',
      title: "RedLight's Top Ten: Animated Baddies",
      excerpt: 'RedLight showcases its top ten animated baddies in fiction',
      content: 'Full article about animated characters...',
      imageUrl: '/assets/images/articles/spreads/top-ten.png',
      date: '2024-01-10',
      category: 'entertainment',
      author: 'Admin',
      featured: false,
      published: true,
      views: 1800,
      tags: ['animated', 'top-ten', 'entertainment']
    },
    {
      id: '3',
      title: 'Industry Experience: Holly Hendrix',
      excerpt: 'An in-depth look at the industry experience',
      content: 'Interview and insights from Holly Hendrix...',
      imageUrl: '/assets/images/articles/spreads/holly.png',
      date: '2024-01-05',
      category: 'interview',
      author: 'Admin',
      featured: false,
      published: true,
      views: 2200,
      tags: ['interview', 'industry', 'experience']
    },
  ]
  res.json(latestArticles)
})

// Get all articles with filters
app.get('/api/articles', (req: Request, res: Response) => {
  const { category, search, page = '1', limit = '10', sortBy = 'date' } = req.query
  
  const articles = [
    {
      id: '1',
      title: 'RedLight Saving Heauxs',
      excerpt: 'The brand innovating adult entertainment and healing the Heauxs',
      content: 'Full article content...',
      imageUrl: '/assets/images/articles/spreads/saving-heauxs-spread.png',
      date: '2024-01-15',
      category: 'news',
      author: 'Admin',
      featured: false,
      published: true,
      views: 1500,
      tags: ['heauxs', 'innovation', 'entertainment']
    },
    {
      id: '2',
      title: "RedLight's Top Ten: Animated Baddies",
      excerpt: 'RedLight showcases its top ten animated baddies in fiction',
      content: 'Full article content...',
      imageUrl: '/assets/images/articles/spreads/top-ten.png',
      date: '2024-01-10',
      category: 'entertainment',
      author: 'Admin',
      featured: false,
      published: true,
      views: 1800,
      tags: ['animated', 'top-ten', 'entertainment']
    },
    {
      id: '3',
      title: 'Industry Experience: Holly Hendrix',
      excerpt: 'An in-depth look at the industry experience',
      content: 'Full article content...',
      imageUrl: '/assets/images/articles/spreads/holly.png',
      date: '2024-01-05',
      category: 'interview',
      author: 'Admin',
      featured: false,
      published: true,
      views: 2200,
      tags: ['interview', 'industry', 'experience']
    },
  ]
  
  // Filter and paginate (mock implementation)
  let filtered = [...articles]
  
  if (category && category !== 'all') {
    filtered = filtered.filter(article => article.category === category)
  }
  
  if (search) {
    const searchLower = search.toString().toLowerCase()
    filtered = filtered.filter(article => 
      article.title.toLowerCase().includes(searchLower) ||
      article.excerpt.toLowerCase().includes(searchLower)
    )
  }
  
  const pageNum = parseInt(page.toString())
  const limitNum = parseInt(limit.toString())
  const startIndex = (pageNum - 1) * limitNum
  const endIndex = startIndex + limitNum
  
  const paginated = filtered.slice(startIndex, endIndex)
  
  res.json({
    success: true,
    data: paginated,
    pagination: {
      page: pageNum,
      limit: limitNum,
      total: filtered.length,
      pages: Math.ceil(filtered.length / limitNum)
    }
  })
})

// Get article by ID
app.get('/api/articles/:id', (req: Request, res: Response) => {
  const { id } = req.params
  
  const article = {
    id: id,
    title: 'Sample Article',
    excerpt: 'This is a sample article excerpt',
    content: 'This is the full content of the article. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    imageUrl: '/assets/images/articles/taleen-test.png',
    date: '2024-01-01',
    category: 'news',
    author: 'Admin',
    featured: true,
    published: true,
    views: 1000,
    tags: ['sample', 'test', 'article']
  }
  
  res.json(article)
})

// Roses endpoints
app.get('/api/roses/featured', (req: Request, res: Response) => {
  const featuredRose = {
    id: '1',
    name: 'Kayla Amber',
    stageName: 'Amber Dreams',
    bio: 'Introducing the latest addition to our garden. Kayla Amber brings a unique perspective on creative expression and artistic freedom.',
    imageUrl: '/assets/images/roses/featured/elexus-thumb-front.png',
    gallery: [],
    category: 'rose' as const,
    featured: true,
    socialLinks: {
      instagram: 'https://instagram.com/kaylaamber',
      twitter: 'https://twitter.com/kaylaamber'
    }
  }
  res.json(featuredRose)
})

app.get('/api/roses', (req: Request, res: Response) => {
  const { category, search, page = '1', limit = '10' } = req.query
  
  const roses = [
    {
      id: '1',
      name: 'Kayla Amber',
      stageName: 'Amber Dreams',
      bio: 'Introducing the latest addition to our garden...',
      imageUrl: '/assets/images/roses/azaria-thumb.png',
      gallery: [],
      category: 'rose' as const,
      featured: true,
      socialLinks: {
        instagram: 'https://instagram.com/kaylaamber',
        twitter: 'https://twitter.com/kaylaamber'
      }
    },
    {
      id: '2',
      name: 'Jasmine Chola',
      stageName: 'Jazzy Chola',
      bio: 'Creative artist and performer...',
      imageUrl: '/assets/images/roses/teresa-thumb.png',
      gallery: [],
      category: 'rose' as const,
      featured: false,
      socialLinks: {
        instagram: 'https://instagram.com/jasminechola'
      }
    },
    {
      id: '3',
      name: 'Nudist Rose',
      bio: 'Artist specializing in body positivity...',
      imageUrl: '/assets/images/roses/ye-thumb.png',
      gallery: [],
      category: 'art' as const,
      featured: false,
      socialLinks: {}
    },
  ]
  
  // Filter (mock implementation)
  let filtered = [...roses]
  
  if (category && category !== 'all') {
    filtered = filtered.filter(rose => rose.category === category)
  }
  
  if (search) {
    const searchLower = search.toString().toLowerCase()
    filtered = filtered.filter(rose => 
      rose.name.toLowerCase().includes(searchLower) ||
      (rose.stageName && rose.stageName.toLowerCase().includes(searchLower))
    )
  }
  
  const pageNum = parseInt(page.toString())
  const limitNum = parseInt(limit.toString())
  const startIndex = (pageNum - 1) * limitNum
  const endIndex = startIndex + limitNum
  
  const paginated = filtered.slice(startIndex, endIndex)
  
  res.json({
    success: true,
    data: paginated,
    pagination: {
      page: pageNum,
      limit: limitNum,
      total: filtered.length,
      pages: Math.ceil(filtered.length / limitNum)
    }
  })
})

// Get rose by ID
app.get('/api/roses/:id', (req: Request, res: Response) => {
  const { id } = req.params
  
  const rose = {
    id: id,
    name: 'Sample Rose',
    stageName: 'Stage Name',
    bio: 'This is a sample rose bio. Creative expression beyond skin.',
    imageUrl: '/assets/images/roses/azaria-thumb.png',
    gallery: [],
    category: 'rose' as const,
    featured: true,
    socialLinks: {
      instagram: 'https://instagram.com/sample',
      twitter: 'https://twitter.com/sample'
    }
  }
  
  res.json(rose)
})

// Products endpoint
app.get('/api/products', (req: Request, res: Response) => {
  res.json([]) // Empty for now since shop is coming soon
})

// Newsletter endpoint
app.post('/api/newsletter/subscribe', (req: Request, res: Response) => {
  const { email } = req.body
  console.log(`Newsletter subscription: ${email}`)
  res.json({ 
    success: true, 
    message: 'Successfully subscribed to newsletter',
    data: { email }
  })
})

// Error handling
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: 'Route not found' })
})

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack)
  res.status(500).json({ error: 'Something went wrong!' })
})

// Start server
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`)
    console.log(`📚 API Documentation: http://localhost:${PORT}/api/health`)
    console.log(`🔗 Frontend: http://localhost:3000`)
    console.log(`🔒 CORS: Enabled for all origins (development mode)`)
  })
}

export default app