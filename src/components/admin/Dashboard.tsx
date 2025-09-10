import React, { useState, useEffect } from 'react';
import { 
  Users, 
  MousePointer, 
  TrendingUp, 
  Eye,
  Clock,
  Globe,
  Smartphone,
  Monitor
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { realTimeTracker, VisitorData } from '../../utils/realTimeTracker';

interface MetricCard {
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  icon: React.ElementType;
}

const mockTrafficData = [
  { time: '00:00', visitors: 45, conversions: 3 },
  { time: '04:00', visitors: 32, conversions: 2 },
  { time: '08:00', visitors: 78, conversions: 8 },
  { time: '12:00', visitors: 124, conversions: 15 },
  { time: '16:00', visitors: 156, conversions: 22 },
  { time: '20:00', visitors: 98, conversions: 12 },
];

const deviceData = [
  { name: 'Mobile', value: 65, color: '#3B82F6' },
  { name: 'Desktop', value: 30, color: '#10B981' },
  { name: 'Tablet', value: 5, color: '#F59E0B' },
];

export const Dashboard: React.FC = () => {
  const [realVisitors, setRealVisitors] = useState<VisitorData[]>([]);
  const [todayStats, setTodayStats] = useState({
    totalVisitors: 0,
    totalPageViews: 0,
    totalClicks: 0
  });
  const [liveVisitors, setLiveVisitors] = useState(0);

  // Load real data
  useEffect(() => {
    const updateRealData = () => {
      const activeVisitors = realTimeTracker.getActiveVisitors();
      const stats = realTimeTracker.getTodayStats();
      
      setRealVisitors(activeVisitors);
      setTodayStats(stats);
      setLiveVisitors(activeVisitors.length);
    };

    // Update immediately
    updateRealData();

    // Update every 5 seconds
    const interval = setInterval(updateRealData, 5000);
    return () => clearInterval(interval);
  }, []);

  const [metrics, setMetrics] = useState<MetricCard[]>([
    {
      title: 'Total Visitors',
      value: todayStats.totalVisitors.toString(),
      change: '+12.5%',
      changeType: 'positive',
      icon: Users
    },
    {
      title: 'Page Views',
      value: todayStats.totalPageViews.toString(),
      change: '+18.2%',
      changeType: 'positive',
      icon: Eye
    },
    {
      title: 'Total Clicks',
      value: todayStats.totalClicks.toString(),
      change: '+15.3%',
      changeType: 'positive',
      icon: MousePointer
    },
    {
      title: 'Active Now',
      value: liveVisitors.toString(),
      change: 'Live',
      changeType: 'positive',
      icon: Clock
    }
  ]);

  // Update metrics when stats change
  useEffect(() => {
    setMetrics([
      {
        title: 'Total Visitors',
        value: todayStats.totalVisitors.toString(),
        change: '+12.5%',
        changeType: 'positive',
        icon: Users
      },
      {
        title: 'Page Views',
        value: todayStats.totalPageViews.toString(),
        change: '+18.2%',
        changeType: 'positive',
        icon: Eye
      },
      {
        title: 'Total Clicks',
        value: todayStats.totalClicks.toString(),
        change: '+15.3%',
        changeType: 'positive',
        icon: MousePointer
      },
      {
        title: 'Active Now',
        value: liveVisitors.toString(),
        change: 'Live',
        changeType: 'positive',
        icon: Clock
      }
    ]);
  }, [todayStats, liveVisitors]);

  return (
    <div className="space-y-8 text-white bg-slate-900 min-h-screen">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <p className="text-slate-400">Monitor your EAGLEBOOST campaign performance</p>
      </div>

      {/* Live Visitors */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 text-white border border-blue-500/20">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">Live Visitors</h2>
            <p className="text-3xl font-bold">{liveVisitors}</p>
          </div>
          <div className="relative">
            <div className="w-4 h-4 bg-white rounded-full animate-pulse"></div>
            <div className="absolute inset-0 w-4 h-4 bg-white rounded-full animate-ping"></div>
          </div>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <div key={index} className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-400">{metric.title}</p>
                <p className="text-2xl font-bold text-white">{metric.value}</p>
                <p className={`text-sm ${
                  metric.changeType === 'positive' ? 'text-green-600' : 
                  metric.changeType === 'negative' ? 'text-red-600' : 'text-slate-400'
                }`}>
                  {metric.change} from yesterday
                </p>
              </div>
              <div className="p-3 bg-blue-900/30 rounded-lg">
                <metric.icon className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Traffic Chart */}
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-4">Traffic Overview</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={mockTrafficData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="visitors" stroke="#60A5FA" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Device Distribution */}
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-4">Device Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={deviceData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {deviceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
        <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {[
            { action: 'New visitor from Brazil', time: '2 minutes ago', type: 'success' },
            { action: 'Button click tracked', time: '15 minutes ago', type: 'info' },
            { action: 'Facebook Pixel fired', time: '23 minutes ago', type: 'neutral' },
            { action: 'New visitor from Google', time: '1 hour ago', type: 'neutral' },
          ].map((activity, index) => (
            <div key={index} className="flex items-center gap-4 p-3 rounded-lg hover:bg-slate-700">
              <div className={`w-2 h-2 rounded-full ${
                activity.type === 'success' ? 'bg-green-500' :
                activity.type === 'info' ? 'bg-blue-500' : 'bg-slate-400'
              }`}></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-white">{activity.action}</p>
                <p className="text-xs text-slate-400">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};