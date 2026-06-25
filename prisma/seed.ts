// prisma/seed.ts
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌹 Seeding RedLight Magazine database...')

  // ===== 1. CREATE ADMIN USER =====
  const adminPassword = await bcrypt.hash('admin123', 10)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@redlightmag.com' },
    update: {},
    create: {
      email: 'admin@redlightmag.com',
      name: 'RedLight Admin',
      password: adminPassword,
      role: 'ADMIN',
      avatar: '/assets/images/admin/avatar.png'
    }
  })
  console.log('✅ Admin user created')

  // ===== 2. CREATE ROSES =====
  const roses = [
    {
      name: 'Kayla Amber',
      stageName: 'Amber Dreams',
      bio: 'Introducing the latest addition to our garden. Kayla Amber brings a unique perspective on creative expression and artistic freedom.',
      imageUrl: '/assets/images/roses/featured/elexus-thumb-front.png',
      gallery: ['/assets/images/roses/featured/elexus-1.png', '/assets/images/roses/featured/elexus-2.png'],
      category: 'ROSE' as const,
      featured: true,
      userId: admin.id,
      socialLinks: {
        instagram: 'https://instagram.com/kaylaamber',
        twitter: 'https://twitter.com/kaylaamber'
      }
    },
    {
      name: 'Jasmine Chola',
      stageName: 'Jazzy Chola',
      bio: 'Creative artist and performer redefining boundaries in the adult entertainment industry.',
      imageUrl: '/assets/images/roses/teresa-thumb.png',
      gallery: ['/assets/images/roses/teresa-1.png', '/assets/images/roses/teresa-2.png'],
      category: 'ROSE' as const,
      featured: false,
      userId: admin.id,
      socialLinks: {
        instagram: 'https://instagram.com/jasminechola'
      }
    },
    {
      name: 'Nudist Rose',
      stageName: '',
      bio: 'Artist specializing in body positivity and creative expression beyond skin.',
      imageUrl: '/assets/images/roses/ye-thumb.png',
      gallery: ['/assets/images/roses/ye-1.png', '/assets/images/roses/ye-2.png'],
      category: 'ART' as const,
      featured: false,
      userId: admin.id,
      socialLinks: {}
    },
  ]

  for (const rose of roses) {
    await prisma.rose.upsert({
      where: { userId: rose.userId },
      update: rose,
      create: rose,
    })
  }
  console.log('✅ Roses created')

  // ===== 3. CREATE ARTICLES =====
  const articles = [
    {
      title: 'Born is the RedLight Revolution',
      slug: 'born-is-the-redlight-revolution',
      excerpt: 'The beginning of a new era in creative expression. RedLight Magazine launches with a vision to redefine adult entertainment media.',
      content: `
        <h2>The Revolution Begins</h2>
        <p>RedLight Magazine was born from a simple idea: adult entertainment media should be artistic, respectful, and empowering.</p>
        <p>Our mission is to showcase the artistry, the business, and the humanity behind adult entertainment.</p>
      `,
      imageUrl: '/assets/images/articles/taleen-test.png',
      date: new Date('2024-01-01'),
      category: 'featured',
      authorId: admin.id,
      featured: true,
      published: true,
      views: 2500,
      tags: ['revolution', 'beginning', 'redlight']
    },
    {
      title: 'RedLight Saving Heauxs',
      slug: 'redlight-saving-heauxs',
      excerpt: 'The brand innovating adult entertainment and healing the Heauxs. How RedLight is changing the narrative.',
      content: `
        <h2>Healing Through Creativity</h2>
        <p>The adult entertainment industry has long been plagued by stigma and exploitation. RedLight is changing that.</p>
      `,
      imageUrl: '/assets/images/articles/spreads/saving-heauxs-spread.png',
      date: new Date('2024-01-15'),
      category: 'news',
      authorId: admin.id,
      featured: false,
      published: true,
      views: 1500,
      tags: ['heauxs', 'innovation', 'healing']
    },
    {
      title: "RedLight's Top Ten: Animated Baddies",
      slug: 'redlights-top-ten-animated-baddies',
      excerpt: 'RedLight showcases its top ten animated baddies in fiction. From classic cartoons to modern anime.',
      content: `
        <h2>Top Ten Animated Baddies</h2>
        <p>Animation has given us some of the most memorable villains in pop culture.</p>
      `,
      imageUrl: '/assets/images/articles/spreads/top-ten.png',
      date: new Date('2024-01-10'),
      category: 'entertainment',
      authorId: admin.id,
      featured: false,
      published: true,
      views: 1800,
      tags: ['animated', 'top-ten', 'entertainment']
    },
    {
      title: 'Industry Experience: Holly Hendrix',
      slug: 'industry-experience-holly-hendrix',
      excerpt: 'An in-depth look at the industry experience. Holly Hendrix shares her journey in the adult entertainment world.',
      content: `
        <h2>Holly Hendrix: A Voice for Heauxs</h2>
        <p>Holly Hendrix is a name that's become synonymous with authenticity in the adult entertainment industry.</p>
      `,
      imageUrl: '/assets/images/articles/spreads/holly.png',
      date: new Date('2024-01-05'),
      category: 'interview',
      authorId: admin.id,
      featured: false,
      published: true,
      views: 2200,
      tags: ['interview', 'industry', 'holly-hendrix']
    },
  ]

  for (const article of articles) {
    await prisma.article.upsert({
      where: { slug: article.slug },
      update: article,
      create: article,
    })
  }
  console.log('✅ Articles created')

  // ===== 4. CREATE NEWSLETTER SUBSCRIBERS =====
  const subscribers = ['test@example.com', 'subscriber@redlightmag.com']
  for (const email of subscribers) {
    await prisma.newsletterSubscriber.upsert({
      where: { email },
      update: {},
      create: {
        email,
        active: true
      }
    })
  }
  console.log('✅ Newsletter subscribers created')

  console.log('🌹 RedLight Magazine database seeded successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })