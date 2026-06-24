import React from 'react'
import { NavLink } from 'react-router-dom'
import { 
  LayoutDashboard, 
  FileText, 
  Flower, 
  ShoppingBag, 
  Users, 
  Settings,
  BarChart,
  Mail,
  Image
} from 'lucide-react'

const DashboardSidebar: React.FC = () => {
  const menuItems = [
    { path: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/admin/articles', icon: FileText, label: 'Articles' },
    { path: '/admin/roses', icon: Flower, label: 'Roses' },
    { path: '/admin/products', icon: ShoppingBag, label: 'Products' },
    { path: '/admin/users', icon: Users, label: 'Users' },
    { path: '/admin/media', icon: Image, label: 'Media' },
    { path: '/admin/newsletter', icon: Mail, label: 'Newsletter' },
    { path: '/admin/analytics', icon: BarChart, label: 'Analytics' },
    { path: '/admin/settings', icon: Settings, label: 'Settings' },
  ]

  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen">
      <div className="p-6 border-b border-gray-800">
        <h2 className="text-xl font-bold">RedLight Admin</h2>
        <p className="text-gray-400 text-sm">Dashboard</p>
      </div>
      
      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-redlight-red text-white'
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }`
                }
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}

export default DashboardSidebar