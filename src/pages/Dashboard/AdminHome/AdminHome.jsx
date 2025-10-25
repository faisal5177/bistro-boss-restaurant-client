import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FaBook, FaDollarSign, FaUsers } from 'react-icons/fa';
import {
    BarChart,
    Bar,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    ResponsiveContainer,
    PieChart,
    Pie,
    Legend
} from 'recharts';

const AdminHome = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: stats = {} } = useQuery({
        queryKey: ['admin-stats'],
        queryFn: async () => {
            const res = await axiosSecure.get('/admin-stats');
            return res.data;
        }
    });

    const { data: chartData = [] } = useQuery({
        queryKey: ['order-stats'],
        queryFn: async () => {
            const res = await axiosSecure.get('/order-stats');
            return res.data;
        }
    });

    const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink'];
    const RADIAN = Math.PI / 180;

    // ✅ Custom bar shape
    const getPath = (x, y, width, height) => {
        return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2
            },${y + height / 3}
    ${x + width / 2},${y}
    C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3
            },${y + height} ${x + width},${y + height}
    Z`;
    };

    const TriangleBar = (props) => {
        const { fill, x, y, width, height } = props;
        return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
    };

    // ✅ Custom label for Pie
    const renderCustomizedLabel = ({
        cx,
        cy,
        midAngle,
        innerRadius,
        outerRadius,
        percent
    }) => {
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

    const barData = chartData.map((item) => ({
        name: item.category,
        quantity: item.quantity
    }));

    const pieChartData = chartData.map((item) => ({
        name: item.category,
        value: item.revenue
    }));

    return (
        <div className="p-4">
            <h2 className="text-3xl mb-6">
                Hi, Welcome{' '}
                <span className="text-orange-500 font-bold">
                    {user?.displayName || 'Admin'}
                </span>
            </h2>

            {/* ---------- Stats ---------- */}
            <div className="stats shadow mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <FaDollarSign className="text-3xl" />
                    </div>
                    <div className="stat-title">Revenue</div>
                    <div className="stat-value">${stats.revenue || 0}</div>
                    <div className="stat-desc">Jan 1st - Feb 1st</div>
                </div>

                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <FaUsers className="text-3xl" />
                    </div>
                    <div className="stat-title">Users</div>
                    <div className="stat-value">{stats.users || 0}</div>
                </div>

                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <FaBook className="text-3xl" />
                    </div>
                    <div className="stat-title">Menu Items</div>
                    <div className="stat-value">{stats.menuItems || 0}</div>
                </div>

                <div className="stat">
                    <div className="stat-title">Orders</div>
                    <div className="stat-value">{stats.orders || 0}</div>
                </div>
            </div>

            {/* ---------- Charts Section ---------- */}
            <div className="flex flex-col md:flex-row gap-6">
                {/* Bar Chart */}
                <div className="flex-1 min-h-[320px] bg-white p-4 rounded-2xl shadow">
                    <h3 className="text-lg font-semibold mb-2">
                        Order Quantity by Category
                    </h3>
                    {barData.length > 0 ? (
                        <ResponsiveContainer width="100%" height="90%">
                            <BarChart
                                data={barData}
                                margin={{ top: 20, right: 20, left: 0, bottom: 5 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Bar
                                    dataKey="quantity"
                                    shape={<TriangleBar />}
                                    label={{ position: 'top' }}
                                >
                                    {barData.map((_entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={colors[index % colors.length]}
                                        />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    ) : (
                        <p className="text-center text-gray-500">
                            No order data available
                        </p>
                    )}
                </div>

                {/* Pie Chart */}
                <div className="flex-1 min-h-[320px] bg-white p-4 rounded-2xl shadow">
                    <h3 className="text-lg font-semibold mb-2">
                        Revenue Distribution by Category
                    </h3>
                    {pieChartData.length > 0 ? (
                        <ResponsiveContainer width="100%" height="90%">
                            <PieChart>
                                <Pie
                                    data={pieChartData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={renderCustomizedLabel}
                                    outerRadius={100}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {pieChartData.map((entry, index) => (
                                        <Cell
                                            key={entry.name}
                                            fill={colors[index % colors.length]}
                                        />
                                    ))}
                                </Pie>
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    ) : (
                        <p className="text-center text-gray-500">
                            No revenue data available
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminHome;
