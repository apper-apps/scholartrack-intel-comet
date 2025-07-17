import { useContext } from 'react'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'
import { AuthContext } from '@/App'

const Header = ({ onMobileMenuClick, title }) => {
  const { logout } = useContext(AuthContext);

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={onMobileMenuClick}
              className="lg:hidden mr-2"
            >
              <ApperIcon name="Menu" className="w-5 h-5" />
            </Button>
            <h1 className="text-xl font-semibold text-gray-900">
              {title || "ScholarTrack"}
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              <ApperIcon name="Bell" className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="sm">
              <ApperIcon name="Settings" className="w-5 h-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={logout}
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <ApperIcon name="LogOut" className="w-5 h-5" />
            </Button>
            <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
              <ApperIcon name="User" className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header