export const mockArticles = {
  featured: [
    {
      id: '1',
      title: 'Born is the RedLight Revolution',
      excerpt: 'The beginning of a new era in creative expression. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
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
  ],
  latest: [
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
}

export const mockRoses = {
  featured: {
    id: '1',
    name: 'RedLight Rose',
    type: 'Content Creator',
    bio: "The life-force behind RedLight — Roses are the creators that represent the beauty of the movement. Gain access to exclusive discounts, early drops, and collaborative opportunities. Let's create history.",
    imageUrl: '/assets/images/roses/featured/elexus-thumb-front.png',
    gallery: [],
    category: 'rose' as const,
    featured: true,
    socialLinks: {
      instagram: 'https://instagram.com/kaylaamber',
      twitter: 'https://twitter.com/kaylaamber'
    }
  },
  list: [
    {
      id: '1',
      name: 'Elexus Jionde',
      type: 'Content Creator | Mogul',
      bio: 'Introducing the latest addition to our garden...',
      imageUrl: '/assets/images/roses/featured/elexus-thumb-front.png',
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
      name: 'Teresa Lavae',
      type: 'Content Creator',
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
      type: 'Foot Model',
      bio: 'Artist specializing in body positivity...',
      imageUrl: '/assets/images/roses/ye-thumb.png',
      gallery: [],
      category: 'art' as const,
      featured: false,
      socialLinks: {}
    },
  ]
}