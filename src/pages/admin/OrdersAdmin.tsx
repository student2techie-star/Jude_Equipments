import { Search, Eye } from 'lucide-react'

export default function OrdersAdmin() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Orders Management</h1>
      </div>

      <div className="bg-card border rounded-3xl shadow-sm overflow-hidden flex flex-col">
        <div className="p-4 border-b flex justify-between items-center bg-secondary/50">
          <div className="relative w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
            <input 
              type="text" 
              placeholder="Search by order ID or customer..." 
              className="w-full bg-background border rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>
          <select className="bg-background border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent">
            <option>All Statuses</option>
            <option>Pending</option>
            <option>Processing</option>
            <option>Shipped</option>
            <option>Delivered</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-secondary/30 text-muted uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 font-medium">Order ID</th>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium">Customer</th>
                <th className="px-6 py-4 font-medium">Total</th>
                <th className="px-6 py-4 font-medium">Payment</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[1, 2, 3, 4, 5].map(i => (
                <tr key={i} className="hover:bg-secondary/20 transition-colors">
                  <td className="px-6 py-4 font-semibold text-foreground">JE-2026-000{i}</td>
                  <td className="px-6 py-4 text-muted">{new Date().toLocaleDateString()}</td>
                  <td className="px-6 py-4">
                    <p className="font-medium">John Doe</p>
                    <p className="text-xs text-muted">john@example.com</p>
                  </td>
                  <td className="px-6 py-4 font-bold">₹{(1000 * i + 500).toLocaleString('en-IN')}</td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-semibold px-2 py-1 rounded bg-secondary">
                      {i % 2 === 0 ? 'Stripe' : 'COD'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="bg-amber-100 text-amber-700 text-xs font-bold px-2 py-1 rounded">Pending</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 text-muted hover:text-accent hover:bg-accent/10 rounded-lg transition-colors">
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
