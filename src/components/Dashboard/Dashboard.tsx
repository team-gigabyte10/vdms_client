import React from 'react';
import { Users, FileSpreadsheet, Printer, MapPin, TrendingUp, AlertCircle } from 'lucide-react';

const Dashboard: React.FC = () => {
  const stats = [
    {
      title: 'Total Voters',
      value: '12,847',
      change: '+2.5%',
      changeType: 'positive' as const,
      icon: Users,
      color: 'bg-blue-500',
    },
    {
      title: 'Vote Centers',
      value: '45',
      change: '+1',
      changeType: 'positive' as const,
      icon: MapPin,
      color: 'bg-green-500',
    },
    {
      title: 'Printed Slips',
      value: '8,234',
      change: '+12.3%',
      changeType: 'positive' as const,
      icon: Printer,
      color: 'bg-purple-500',
    },
    {
      title: 'Pending Updates',
      value: '23',
      change: '-5',
      changeType: 'negative' as const,
      icon: AlertCircle,
      color: 'bg-orange-500',
    },
  ];

  const recentActivities = [
    { action: 'New voter registered', details: 'John Doe - Area 5, Word 12', time: '2 minutes ago' },
    { action: 'Voter slip printed', details: 'Batch #45 - 150 slips', time: '15 minutes ago' },
    { action: 'Center updated', details: 'Dhaka Central - Booth capacity increased', time: '1 hour ago' },
    { action: 'Excel import completed', details: '500 voters imported successfully', time: '2 hours ago' },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
                  <div className="flex items-center mt-2">
                    <TrendingUp className={`w-4 h-4 mr-1 ${
                      stat.changeType === 'positive' ? 'text-green-500' : 'text-red-500'
                    }`} />
                    <span className={`text-sm font-medium ${
                      stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stat.change}
                    </span>
                    <span className="text-sm text-gray-500 ml-1">vs last month</span>
                  </div>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activities</h3>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                  <p className="text-sm text-gray-600">{activity.details}</p>
                  <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <Users className="w-6 h-6 text-blue-600 mb-2" />
              <span className="text-sm font-medium text-gray-700">Add Voter</span>
            </button>
            <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <FileSpreadsheet className="w-6 h-6 text-green-600 mb-2" />
              <span className="text-sm font-medium text-gray-700">Import Excel</span>
            </button>
            <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <Printer className="w-6 h-6 text-purple-600 mb-2" />
              <span className="text-sm font-medium text-gray-700">Print Slips</span>
            </button>
            <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <MapPin className="w-6 h-6 text-orange-600 mb-2" />
              <span className="text-sm font-medium text-gray-700">Manage Centers</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;