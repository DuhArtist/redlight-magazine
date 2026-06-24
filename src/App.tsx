import { Routes, Route, Navigate } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import Layout from '@/components/layout/Layout'
import LoadingSpinner from '@/components/shared/LoadingSpinner'

// Lazy load pages for code splitting
const HomePage = lazy(() => import('@/pages/HomePage'))
const ReadsPage = lazy(() => import('@/pages/ReadsPage'))
const RoseGardenPage = lazy(() => import('@/pages/RoseGardenPage'))
const ArticlePage = lazy(() => import('@/pages/ArticlePage'))
const RoseModelProgramPage = lazy(() => import('@/pages/RoseModelProgramPage'))

function App() {
  return (
    <Layout>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/reads" element={<ReadsPage />} />
          <Route path="/magazine" element={<Navigate to="/reads" replace />} />
          <Route path="/rose-garden" element={<RoseGardenPage />} />
          <Route path="/article/:id" element={<ArticlePage />} />
          <Route path="/rose/:id" element={<ArticlePage />} />
          <Route path="/rose-model-program" element={<RoseModelProgramPage />} />
        </Routes>
      </Suspense>
    </Layout>
  )
}

export default App