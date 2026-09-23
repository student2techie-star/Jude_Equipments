import { Routes, Route, HashRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import MainLayout from './components/layout/MainLayout'
import AdminLayout from './components/admin/AdminLayout'
import Home from './pages/Home'

import Products from './pages/Products'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import OrderSuccess from './pages/OrderSuccess'
import Account from './pages/Account'
import About from './pages/About'

import Dashboard from './pages/admin/Dashboard'
import ProductsAdmin from './pages/admin/ProductsAdmin'
import OrdersAdmin from './pages/admin/OrdersAdmin'

function App() {
  return (
    <HelmetProvider>
      <HashRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="products" element={<Products />} />
            <Route path="products/:slug" element={<ProductDetails />} />
            <Route path="cart" element={<Cart />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="order-success" element={<OrderSuccess />} />
            <Route path="account/*" element={<Account />} />
          </Route>

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="products" element={<ProductsAdmin />} />
            <Route path="orders" element={<OrdersAdmin />} />
          </Route>
        </Routes>
      </HashRouter>
    </HelmetProvider>
  )
}

export default App
