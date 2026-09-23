import { useState } from 'react'
import { Package, User, MapPin, LogOut } from 'lucide-react'

export default function Account() {
  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'addresses'>('orders');

  return (
    <div className="py-12">
      <h1 className="text-3xl font-bold tracking-tight mb-8">My Account</h1>

      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Sidebar */}
        <aside className="w-full md:w-64 flex-shrink-0">
          <div className="bg-secondary rounded-2xl p-4 sticky top-24">
            <div className="flex items-center gap-4 mb-6 p-4 border-b border-black/5">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-lg">
                JD
              </div>
              <div>
                <p className="font-bold">John Doe</p>
                <p className="text-xs text-muted">john@example.com</p>
              </div>
            </div>
            
            <nav className="space-y-2">
              <button 
                onClick={() => setActiveTab('orders')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-medium text-left ${activeTab === 'orders' ? 'bg-background shadow-sm text-accent' : 'text-muted hover:text-foreground hover:bg-background/50'}`}
              >
                <Package className="w-5 h-5" /> My Orders
              </button>
              <button 
                onClick={() => setActiveTab('profile')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-medium text-left ${activeTab === 'profile' ? 'bg-background shadow-sm text-accent' : 'text-muted hover:text-foreground hover:bg-background/50'}`}
              >
                <User className="w-5 h-5" /> Profile Settings
              </button>
              <button 
                onClick={() => setActiveTab('addresses')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-medium text-left ${activeTab === 'addresses' ? 'bg-background shadow-sm text-accent' : 'text-muted hover:text-foreground hover:bg-background/50'}`}
              >
                <MapPin className="w-5 h-5" /> Saved Addresses
              </button>
              
              <div className="pt-4 mt-4 border-t border-black/5">
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-medium text-left text-destructive hover:bg-destructive/10">
                  <LogOut className="w-5 h-5" /> Logout
                </button>
              </div>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-grow">
          <div className="bg-card border rounded-3xl p-6 md:p-8">
            
            {activeTab === 'orders' && (
              <div>
                <h2 className="text-xl font-bold mb-6">Order History</h2>
                <div className="space-y-4">
                  {[1, 2].map((order) => (
                    <div key={order} className="border rounded-2xl p-6 flex flex-col md:flex-row gap-6 md:items-center justify-between">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <span className="font-bold">JE-2026-00010{order}</span>
                          <span className="bg-amber-100 text-amber-700 text-xs font-bold px-2 py-1 rounded">Processing</span>
                        </div>
                        <p className="text-sm text-muted mb-1">Placed on {new Date().toLocaleDateString()}</p>
                        <p className="text-sm">2 items • Total: ₹21,499</p>
                      </div>
                      <button className="bg-secondary hover:bg-secondary/80 px-6 py-2 rounded-lg font-medium transition-colors text-sm">
                        View Details
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'profile' && (
              <div>
                <h2 className="text-xl font-bold mb-6">Profile Settings</h2>
                <div className="max-w-md space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Full Name</label>
                    <input type="text" defaultValue="John Doe" className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email Address</label>
                    <input type="email" defaultValue="john@example.com" disabled className="w-full border rounded-lg px-4 py-2 bg-secondary text-muted" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Phone Number</label>
                    <input type="tel" defaultValue="+91 98765 43210" className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent" />
                  </div>
                  <button className="bg-primary text-primary-foreground px-6 py-2 rounded-lg font-medium transition-colors hover:bg-primary/90 mt-4">
                    Save Changes
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'addresses' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold">Saved Addresses</h2>
                  <button className="text-sm font-medium text-accent hover:underline">Add New</button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border border-accent bg-accent/5 rounded-2xl p-6 relative">
                    <span className="absolute top-4 right-4 text-xs font-bold bg-accent text-white px-2 py-1 rounded">Default</span>
                    <p className="font-bold mb-1">Home</p>
                    <p className="text-sm text-muted mb-4">
                      Flat 402, Business Tower<br />
                      M.G. Road, City Center<br />
                      Mumbai, Maharashtra 400001
                    </p>
                    <div className="flex gap-4 text-sm font-medium">
                      <button className="text-accent hover:underline">Edit</button>
                      <button className="text-destructive hover:underline">Delete</button>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>
        </main>
      </div>
    </div>
  )
}
