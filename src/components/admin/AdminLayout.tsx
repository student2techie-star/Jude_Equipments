import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import { LayoutDashboard, Package, ShoppingCart, Users, BarChart3, Settings, LogOut } from 'lucide-react'
import { useAuthStore } from '../../store/useAuthStore'

export default function AdminLayout() {
  const location = useLocation();
  const path = location.pathname;
  const navigate = useNavigate();
  const signOut = useAuthStore(state => state.signOut);

  const handleLogout = async () => {
    await signOut();
    navigate('/admin/login');
  };

  const isActive = (route: string) => path.startsWith(route) ? 'bg-primary text-primary-foreground' : 'text-muted hover:bg-secondary hover:text-foreground';

  return (
    <div className="min-h-screen flex bg-background text-foreground">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-card flex flex-col fixed h-full z-10">
        <div className="p-6 border-b">
          <Link to="/" className="font-bold text-xl text-primary tracking-tight">Jude Admin</Link>
        </div>
        
        <nav className="flex-grow p-4 space-y-2 overflow-y-auto">
          <Link to="/admin" className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-medium ${path === '/admin' ? 'bg-primary text-primary-foreground' : 'text-muted hover:bg-secondary hover:text-foreground'}`}>
            <LayoutDashboard className="w-5 h-5" /> Dashboard
          </Link>
          <Link to="/admin/orders" className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-medium ${isActive('/admin/orders')}`}>
            <ShoppingCart className="w-5 h-5" /> Orders
          </Link>
          <Link to="/admin/products" className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-medium ${isActive('/admin/products')}`}>
            <Package className="w-5 h-5" /> Products
          </Link>
          <Link to="/admin/customers" className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-medium ${isActive('/admin/customers')}`}>
            <Users className="w-5 h-5" /> Customers
          </Link>
          <Link to="/admin/analytics" className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-medium ${isActive('/admin/analytics')}`}>
            <BarChart3 className="w-5 h-5" /> Analytics
          </Link>
          <Link to="/admin/settings" className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-medium ${isActive('/admin/settings')}`}>
            <Settings className="w-5 h-5" /> Settings
          </Link>
        </nav>
        
        <div className="p-4 border-t">
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-medium text-destructive hover:bg-destructive/10">
            <LogOut className="w-5 h-5" /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area (Offset by sidebar width) */}
      <main className="flex-grow ml-64 p-8 bg-secondary/30 min-h-screen">
        <Outlet />
      </main>
    </div>
  )
}

