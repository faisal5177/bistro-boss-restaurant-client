import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FaBook, FaDollarSign, FaUsers, FaShoppingCart } from 'react-icons/fa';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, PieChart, Pie, Legend, Tooltip, ResponsiveContainer } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink'];

const AdminHome = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: stats = {} } = useQuery({
        queryKey: ['admin-stats'],
        queryFn: async () => {
            const res = await axiosSecure.get('/admin-stats');
            return res.data;
        },
    });

    const { data: chartData = [] } = useQuery({
        queryKey: ['order-stats'],
        queryFn: async () => {
            const res = await axiosSecure.get('/order-stats');
            return res.data;
        },
    });

    const getPath = (x, y, width, height) => {
        return `M${x},${y + height}
      C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
      ${x + width / 2},${y}
      C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height}
      ${x + width},${y + height}Z`;
    };

    const TriangleBar = (props) => {
        const { fill, x, y, width, height } = props;
        return <path d={getPath(x, y, width, height)} fill={fill} />;
    };

    const RADIAN = Math.PI / 180;
    const renderLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);
        return (
            <text
                x={x}
                y={y}
                fill="white"
                textAnchor={x > cx ? 'start' : 'end'}
                dominantBaseline="central"
            >
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    const pieChartData = chartData.map((data) => ({
        name: data.category,
        value: data.revenue,
    }));

    return (
        <div className="px-6 py-8 space-y-8">
            {/* Header */}
            <h2 className="text-3xl font-semibold text-center">
                Welcome, <span className="text-primary">{user?.displayName || 'Admin'}</span> 👋
            </h2>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="stat bg-base-100 rounded-2xl shadow-md p-4 text-center">
                    <div className="flex justify-center text-4xl text-primary mb-2">
                        <FaDollarSign />
                    </div>
                    <div className="text-lg font-medium">Revenue</div>
                    <div className="text-2xl font-bold">${stats.revenue || 0}</div>
                    <p className="text-gray-500 text-sm mt-1">Total Earnings</p>
                </div>

                <div className="stat bg-base-100 rounded-2xl shadow-md p-4 text-center">
                    <div className="flex justify-center text-4xl text-success mb-2">
                        <FaUsers />
                    </div>
                    <div className="text-lg font-medium">Users</div>
                    <div className="text-2xl font-bold">{stats.users || 0}</div>
                    <p className="text-gray-500 text-sm mt-1">Active Members</p>
                </div>

                <div className="stat bg-base-100 rounded-2xl shadow-md p-4 text-center">
                    <div className="flex justify-center text-4xl text-warning mb-2">
                        <FaBook />
                    </div>
                    <div className="text-lg font-medium">Menu Items</div>
                    <div className="text-2xl font-bold">{stats.menuItems || 0}</div>
                    <p className="text-gray-500 text-sm mt-1">Available Dishes</p>
                </div>

                <div className="stat bg-base-100 rounded-2xl shadow-md p-4 text-center">
                    <div className="flex justify-center text-4xl text-accent mb-2">
                        <FaShoppingCart />
                    </div>
                    <div className="text-lg font-medium">Orders</div>
                    <div className="text-2xl font-bold">{stats.orders || 0}</div>
                    <p className="text-gray-500 text-sm mt-1">Completed Orders</p>
                </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Bar Chart */}
                <div className="bg-base-100 rounded-2xl shadow-md p-5">
                    <h3 className="text-xl font-semibold mb-4 text-center">
                        Order Quantity by Category
                    </h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={chartData} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="category" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="quantity" shape={<TriangleBar />} label={{ position: 'top' }}>
                                {chartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Pie Chart */}
                <div className="bg-base-100 rounded-2xl shadow-md p-5">
                    <h3 className="text-xl font-semibold mb-4 text-center">
                        Revenue Distribution
                    </h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={pieChartData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={renderLabel}
                                outerRadius={100}
                                dataKey="value"
                            >
                                {pieChartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default AdminHome;
