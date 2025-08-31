import React, { useState } from 'react';
import { Plus, Edit, Trash2, MapPin, Building } from 'lucide-react';
import { VoteCenter, Booth } from '../../types/voter';

const CenterManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'centers' | 'booths'>('centers');
  const [centers, setCenters] = useState<VoteCenter[]>([
    {
      id: '1',
      name: 'Dhaka High School',
      address: '123 School Road, Dhaka',
      area: 'Dhanmondi',
      word: '5',
      total_booths: 8,
      status: 'Active',
    },
    {
      id: '2',
      name: 'Gulshan College',
      address: '456 College Avenue, Gulshan',
      area: 'Gulshan',
      word: '3',
      total_booths: 12,
      status: 'Active',
    },
  ]);

  const [booths, setBooths] = useState<Booth[]>([
    {
      id: '1',
      booth_number: 'B1',
      center_id: '1',
      capacity: 600,
      status: 'Active',
    },
    {
      id: '2',
      booth_number: 'B2',
      center_id: '1',
      capacity: 600,
      status: 'Active',
    },
    {
      id: '3',
      booth_number: 'B1',
      center_id: '2',
      capacity: 800,
      status: 'Active',
    },
  ]);

  const [showCenterForm, setShowCenterForm] = useState(false);
  const [showBoothForm, setShowBoothForm] = useState(false);
  const [editingCenter, setEditingCenter] = useState<VoteCenter | null>(null);
  const [editingBooth, setEditingBooth] = useState<Booth | null>(null);

  const handleDeleteCenter = (centerId: string) => {
    if (window.confirm('Are you sure you want to delete this center?')) {
      setCenters(prev => prev.filter(c => c.id !== centerId));
      setBooths(prev => prev.filter(b => b.center_id !== centerId));
    }
  };

  const handleDeleteBooth = (boothId: string) => {
    if (window.confirm('Are you sure you want to delete this booth?')) {
      setBooths(prev => prev.filter(b => b.id !== boothId));
    }
  };

  const getCenterName = (centerId: string) => {
    return centers.find(c => c.id === centerId)?.name || 'Unknown Center';
  };

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('centers')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'centers'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <MapPin className="w-4 h-4 inline mr-2" />
              Vote Centers
            </button>
            <button
              onClick={() => setActiveTab('booths')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'booths'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Building className="w-4 h-4 inline mr-2" />
              Booths
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'centers' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">Vote Centers</h3>
                <button
                  onClick={() => setShowCenterForm(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Center
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Center Details
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Location
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Booths
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {centers.map((center) => (
                      <tr key={center.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{center.name}</div>
                            <div className="text-sm text-gray-500">ID: {center.id}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">{center.address}</div>
                          <div className="text-sm text-gray-500">
                            Area: {center.area} • Word: {center.word}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{center.total_booths} booths</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            center.status === 'Active' 
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {center.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => {
                                setEditingCenter(center);
                                setShowCenterForm(true);
                              }}
                              className="text-blue-600 hover:text-blue-900 p-1 hover:bg-blue-50 rounded transition-colors"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteCenter(center.id)}
                              className="text-red-600 hover:text-red-900 p-1 hover:bg-red-50 rounded transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'booths' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">Booths</h3>
                <button
                  onClick={() => setShowBoothForm(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Booth
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Booth Number
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Vote Center
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Capacity
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {booths.map((booth) => (
                      <tr key={booth.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{booth.booth_number}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{getCenterName(booth.center_id)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{booth.capacity} voters</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            booth.status === 'Active' 
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {booth.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => {
                                setEditingBooth(booth);
                                setShowBoothForm(true);
                              }}
                              className="text-blue-600 hover:text-blue-900 p-1 hover:bg-blue-50 rounded transition-colors"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteBooth(booth.id)}
                              className="text-red-600 hover:text-red-900 p-1 hover:bg-red-50 rounded transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CenterManagement;