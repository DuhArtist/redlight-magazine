import React from 'react'
// Remove useWatch and useFieldArray - they're not being used
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Save, X } from 'lucide-react'

const articleSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  excerpt: z.string().min(1, 'Excerpt is required'),
  content: z.string().min(1, 'Content is required'),
  imageUrl: z.string().optional(),
  category: z.string().min(1, 'Category is required'),
  author: z.string().min(1, 'Author is required'),
  featured: z.boolean().optional().default(false),
  tags: z.array(z.string()).optional().default([]),
  published: z.boolean().optional().default(false),
})

type ArticleFormData = z.infer<typeof articleSchema>

interface ArticleFormProps {
  initialData?: Partial<ArticleFormData>
  onSubmit: (data: ArticleFormData) => void
  onCancel: () => void
  isSubmitting?: boolean
}

const ArticleForm: React.FC<ArticleFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  isSubmitting = false,
}) => {
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(articleSchema),
    defaultValues: {
      featured: false,
      tags: [],
      published: false,
      ...initialData
    }
  })

  const tags = watch('tags') || [] // Ensure tags is always an array

  const [tagInput, setTagInput] = React.useState('')

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setValue('tags', [...tags, tagInput.trim()])
      setTagInput('')
    }
  }

  const removeTag = (tagToRemove: string) => {
    setValue(
      'tags',
      tags.filter((tag: string) => tag !== tagToRemove)
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* ... rest of your JSX ... */}
    </form>
  )
}

export default ArticleForm