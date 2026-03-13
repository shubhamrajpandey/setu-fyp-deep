'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  BarChart3,
  AlertCircle,
  Users,
  ShoppingCart,
  Leaf,
  TrendingUp,
  Award,
  Package,
  BarChart2,
  MessageSquare,
  Megaphone,
  Settings,
  LogOut,
  Menu,
  X,
} from 'lucide-react'
import { useState } from 'react'

const navItems = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: BarChart3,
    section: 'main',
  },
  {
    title: 'Campaigns',
    href: '/dashboard/campaigns',
    icon: AlertCircle,
    section: 'main',
  },
  {
    title: 'Users & Donors',
    href: '/dashboard/users',
    icon: Users,
    section: 'main',
  },
  {
    title: 'Transactions',
    href: '/dashboard/transactions',
    icon: ShoppingCart,
    section: 'main',
  },
  {
    title: 'Categories',
    href: '/dashboard/categories',
    icon: Leaf,
    section: 'management',
  },
  {
    title: 'Hall of Fame',
    href: '/dashboard/hall-of-fame',
    icon: Award,
    section: 'management',
  },
  {
    title: 'Relief Goods',
    href: '/dashboard/goods',
    icon: Package,
    section: 'management',
  },
  {
    title: 'Reports',
    href: '/dashboard/reports',
    icon: BarChart2,
    section: 'analytics',
  },
  {
    title: 'Comments',
    href: '/dashboard/comments',
    icon: MessageSquare,
    section: 'content',
  },
  {
    title: 'Announcements',
    href: '/dashboard/announcements',
    icon: Megaphone,
    section: 'content',
  },
  {
    title: 'Settings',
    href: '/dashboard/settings',
    icon: Settings,
    section: 'settings',
  },
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const getSectionTitle = (section: string) => {
    const titles: Record<string, string> = {
      main: 'Main',
      management: 'Management',
      analytics: 'Analytics',
      content: 'Content',
      settings: 'Settings',
    }
    return titles[section]
  }

  const groupedItems = navItems.reduce(
    (acc, item) => {
      const section = acc.find((s) => s.section === item.section)
      if (section) {
        section.items.push(item)
      } else {
        acc.push({ section: item.section, items: [item] })
      }
      return acc
    },
    [] as Array<{ section: string; items: typeof navItems }>
  )

  return (
    <div className="flex h-screen bg-cream text-setu-950">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'fixed' : 'hidden'
        } md:relative md:flex flex-col w-64 bg-setu-700 text-white border-r border-setu-600 z-40 md:z-auto transition-all duration-300`}
      >
        <div className="p-6 border-b border-setu-600">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-display font-bold">Setu Admin</h1>
            <button
              onClick={() => setSidebarOpen(false)}
              className="md:hidden text-setu-100 hover:text-white"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-8">
          {groupedItems.map((group) => (
            <div key={group.section}>
              <h3 className="text-xs font-semibold text-setu-300 uppercase tracking-wider mb-4 px-2">
                {getSectionTitle(group.section)}
              </h3>
              <ul className="space-y-2">
                {group.items.map((item) => {
                  const Icon = item.icon
                  const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={() => setSidebarOpen(false)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                          isActive
                            ? 'bg-setu-500 text-white shadow-lg'
                            : 'text-setu-100 hover:bg-setu-600 hover:text-white'
                        }`}
                      >
                        <Icon size={18} />
                        <span className="text-sm font-medium">{item.title}</span>
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </nav>

        <div className="p-4 border-t border-setu-600">
          <button className="flex items-center gap-3 w-full px-4 py-3 text-setu-100 hover:bg-setu-600 rounded-lg transition-all duration-200">
            <LogOut size={18} />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-setu-100 shadow-sm">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="md:hidden text-setu-700 hover:text-setu-900"
              >
                <Menu size={24} />
              </button>
              <h2 className="text-xl font-display font-semibold text-setu-700">
                Admin Dashboard
              </h2>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-medium text-setu-700">Admin User</p>
                <p className="text-xs text-setu-500">Disaster Relief Manager</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto bg-cream">
          <div className="p-6">{children}</div>
        </main>
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 md:hidden z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  )
}
