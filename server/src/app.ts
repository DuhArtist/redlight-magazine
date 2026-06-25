import express, { Request, Response, NextFunction } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import { config } from 'dotenv'
import { v2 as cloudinary } from 'cloudinary'
import multer from 'multer'
import path from 'path'
import fs from 'fs'
import { PrismaClient } from '@prisma/client'

// Load environment variables
config()

const app = express()
const prisma = new PrismaClient()
const PORT = process.env.PORT || 5000

// ===== CONFIGURE CLOUDINARY =====
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

// ===== CONFIGURE MULTER (for file uploads) =====
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = './uploads'
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true })
    }
    cb(null, uploadDir)
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
  }
})

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp|mp4|mov|avi|mkv/
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = allowedTypes.test(file.mimetype)
    if (extname && mimetype) {
      return cb(null, true)
    }
    cb(new Error('Only images and videos are allowed'))
  }
})

// CORS Configuration
const corsOptions = {
  origin: true,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  exposedHeaders: ['Content-Range', 'X-Content-Range'],
}

// Middleware
app.use(cors(corsOptions))
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" },
}))
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.options('*', cors(corsOptions))
app.use('/assets', express.static('public/assets'))

// ===== HEALTH CHECK =====
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'OK',
    message: 'RedLight Magazine API is running',
    timestamp: new Date().toISOString()
  })
})

// ===== MEDIA UPLOAD ROUTES =====
app.post('/api/media/upload', upload.single('media'), async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' })
    }

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'redlight-magazine',
      resource_type: 'auto',
      use_filename: true,
      unique_filename: true,
    })

    if (fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path)
    }

    res.json({
      success: true,
      data: {
        url: result.secure_url,
        publicId: result.public_id,
        width: result.width,
        height: result.height,
        format: result.format,
        bytes: result.bytes,
      }
    })
  } catch (error) {
    console.error('Upload error:', error)
    res.status(500).json({ error: 'Upload failed' })
  }
})

app.delete('/api/media/:publicId', async (req: Request, res: Response) => {
  try {
    const { publicId } = req.params
    const result = await cloudinary.uploader.destroy(publicId)
    
    if (result.result === 'ok') {
      res.json({ success: true, message: 'Media deleted' })
    } else {
      res.status(404).json({ error: 'Media not found' })
    }
  } catch (error) {
    console.error('Delete error:', error)
    res.status(500).json({ error: 'Deletion failed' })
  }
})

// ============================================
// ===== ARTICLES ENDPOINTS (DATABASE) =====
// ============================================

// Get featured articles
app.get('/api/articles/featured', async (req: Request, res: Response) => {
  try {
    const articles = await prisma.article.findMany({
      where: { featured: true, published: true },
      orderBy: { date: 'desc' },
      take: 3,
      include: {
        author: {
          select: { name: true }
        }
      }
    })
    res.json(articles)
  } catch (error) {
    console.error('Error fetching featured articles:', error)
    res.status(500).json({ error: 'Failed to fetch featured articles' })
  }
})

// Get latest articles
app.get('/api/articles/latest', async (req: Request, res: Response) => {
  try {
    const articles = await prisma.article.findMany({
      where: { published: true },
      orderBy: { date: 'desc' },
      take: 6,
      include: {
        author: {
          select: { name: true }
        }
      }
    })
    res.json(articles)
  } catch (error) {
    console.error('Error fetching latest articles:', error)
    res.status(500).json({ error: 'Failed to fetch latest articles' })
  }
})

// Get all articles with filters and pagination
app.get('/api/articles', async (req: Request, res: Response) => {
  try {
    const { category, search, page = '1', limit = '10', sortBy = 'date' } = req.query
    
    const where: any = { published: true }
    if (category && category !== 'all') {
      where.category = category as string
    }
    if (search) {
      where.OR = [
        { title: { contains: search as string, mode: 'insensitive' } },
        { excerpt: { contains: search as string, mode: 'insensitive' } },
      ]
    }
    
    const pageNum = parseInt(page as string)
    const limitNum = parseInt(limit as string)
    const skip = (pageNum - 1) * limitNum
    
    const [articles, total] = await Promise.all([
      prisma.article.findMany({
        where,
        orderBy: { date: 'desc' },
        skip,
        take: limitNum,
        include: {
          author: {
            select: { name: true }
          }
        }
      }),
      prisma.article.count({ where })
    ])
    
    res.json({
      success: true,
      data: articles,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        pages: Math.ceil(total / limitNum)
      }
    })
  } catch (error) {
    console.error('Error fetching articles:', error)
    res.status(500).json({ error: 'Failed to fetch articles' })
  }
})

// Get article by ID
app.get('/api/articles/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const article = await prisma.article.findUnique({
      where: { id },
      include: {
        author: {
          select: { name: true }
        }
      }
    })
    
    if (!article) {
      return res.status(404).json({ error: 'Article not found' })
    }
    
    res.json(article)
  } catch (error) {
    console.error('Error fetching article:', error)
    res.status(500).json({ error: 'Failed to fetch article' })
  }
})

// ============================================
// ===== ROSES ENDPOINTS (DATABASE) =====
// ============================================

// Get featured rose
app.get('/api/roses/featured', async (req: Request, res: Response) => {
  try {
    const rose = await prisma.rose.findFirst({
      where: { featured: true },
      include: {
        user: {
          select: { name: true }
        }
      }
    })
    res.json(rose)
  } catch (error) {
    console.error('Error fetching featured rose:', error)
    res.status(500).json({ error: 'Failed to fetch featured rose' })
  }
})

// Get all roses with filters and pagination
app.get('/api/roses', async (req: Request, res: Response) => {
  try {
    const { category, search, page = '1', limit = '10' } = req.query
    
    const where: any = {}
    if (category && category !== 'all') {
      where.category = category as string
    }
    if (search) {
      where.OR = [
        { name: { contains: search as string, mode: 'insensitive' } },
        { stageName: { contains: search as string, mode: 'insensitive' } },
      ]
    }
    
    const pageNum = parseInt(page as string)
    const limitNum = parseInt(limit as string)
    const skip = (pageNum - 1) * limitNum
    
    const [roses, total] = await Promise.all([
      prisma.rose.findMany({
        where,
        skip,
        take: limitNum,
        include: {
          user: {
            select: { name: true }
          }
        }
      }),
      prisma.rose.count({ where })
    ])
    
    res.json({
      success: true,
      data: roses,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        pages: Math.ceil(total / limitNum)
      }
    })
  } catch (error) {
    console.error('Error fetching roses:', error)
    res.status(500).json({ error: 'Failed to fetch roses' })
  }
})

// Get rose by ID
app.get('/api/roses/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const rose = await prisma.rose.findUnique({
      where: { id },
      include: {
        user: {
          select: { name: true }
        }
      }
    })
    
    if (!rose) {
      return res.status(404).json({ error: 'Rose not found' })
    }
    
    res.json(rose)
  } catch (error) {
    console.error('Error fetching rose:', error)
    res.status(500).json({ error: 'Failed to fetch rose' })
  }
})

// ============================================
// ===== PRODUCTS ENDPOINT (DATABASE) =====
// ============================================

app.get('/api/products', async (req: Request, res: Response) => {
  try {
    const products = await prisma.product.findMany({
      where: { inStock: true }
    })
    res.json(products)
  } catch (error) {
    console.error('Error fetching products:', error)
    res.status(500).json({ error: 'Failed to fetch products' })
  }
})

// ============================================
// ===== NEWSLETTER ENDPOINT (DATABASE) =====
// ============================================

app.post('/api/newsletter/subscribe', async (req: Request, res: Response) => {
  try {
    const { email } = req.body
    
    if (!email) {
      return res.status(400).json({ error: 'Email is required' })
    }
    
    const subscriber = await prisma.newsletterSubscriber.upsert({
      where: { email },
      update: { active: true },
      create: { email, active: true }
    })
    
    res.json({
      success: true,
      message: 'Successfully subscribed to newsletter',
      data: { email: subscriber.email }
    })
  } catch (error) {
    console.error('Newsletter subscription error:', error)
    res.status(500).json({ error: 'Failed to subscribe' })
  }
})

// ============================================
// ===== ERROR HANDLING =====
// ============================================

app.use((req: Request, res: Response) => {
  res.status(404).json({ error: 'Route not found' })
})

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack)
  res.status(500).json({ error: 'Something went wrong!' })
})

// ============================================
// ===== START SERVER =====
// ============================================

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`)
    console.log(`📚 API Documentation: http://localhost:${PORT}/api/health`)
    console.log(`🔗 Frontend: http://localhost:3000`)
    console.log(`🔒 CORS: Enabled for all origins (development mode)`)
  })
}

export default app