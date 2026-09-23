import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { IndianRupee, ShoppingCart, Users, Package } from 'lucide-react'

const data = [
  { name: 'Mon', revenue: 4000 },
  { name: 'Tue', revenue: 3000 },
  { name: 'Wed', revenue: 2000 },
  { name: 'Thu', revenue: 2780 },
  { name: 'Fri', revenue: 1890 },
  { name: 'Sat', revenue: 2390 },
  { name: 'Sun', revenue: 3490 },
];

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Revenue" value="₹1,24,500" icon={<IndianRupee />} trend="+12%" />
        <StatCard title="Total Orders" value="156" icon={<ShoppingCart />} trend="+5%" />
        <StatCard title="Active Customers" value="2,400" icon={<Users />} trend="+18%" />
        <StatCard title="Total Products" value="84" icon={<Package />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Chart */}
        <div className="lg:col-span-2 bg-card border rounded-3xl p-6 shadow-sm">
          <h2 className="text-xl font-bold mb-6">Revenue (Last 7 Days)</h2>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} tickFormatter={(value) => `₹${value}`} />
                <Tooltip cursor={{fill: '#f1f5f9'}} />
                <Bar dataKey="revenue" fill="#0f172a" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-card border rounded-3xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Recent Orders</h2>
            <button className="text-sm text-accent hover:underline font-medium">View All</button>
          </div>
          <div className="space-y-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                <div>
                  <p className="font-semibold text-sm">JE-2026-00{i}</p>
                  <p className="text-xs text-muted">John Doe • ₹{(1000 * i).toLocaleString('en-IN')}</p>
                </div>
                <span className="bg-amber-100 text-amber-700 text-xs font-bold px-2 py-1 rounded">Pending</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function StatCard({ title, value, icon, trend }: any) {
  return (
    <div className="bg-card border rounded-3xl p-6 shadow-sm flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-muted mb-1">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
        {trend && <p className="text-xs text-green-600 font-medium mt-1">{trend} from last month</p>}
      </div>
      <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center text-primary">
        {icon}
      </div>
    </div>
  )
}
