import React, { useState } from 'react';
import { Upload, Download, FileSpreadsheet, CheckCircle, AlertCircle } from 'lucide-react';

const ExcelOperations: React.FC = () => {
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [uploadMessage, setUploadMessage] = useState('');

  const handleFileUpload = (type: 'voters' | 'centers' | 'booths') => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.xlsx,.xls,.csv';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        setUploadStatus('uploading');
        // Simulate upload process
        setTimeout(() => {
          setUploadStatus('success');
          setUploadMessage(`${file.name} uploaded successfully`);
          setTimeout(() => setUploadStatus('idle'), 3000);
        }, 2000);
      }
    };
    input.click();
  };

  const handleDownload = (type: 'voters' | 'centers' | 'booths') => {
    // Simulate download
    const filename = `${type}_export_${new Date().toISOString().split('T')[0]}.xlsx`;
    console.log(`Downloading ${filename}`);
    // In real implementation, this would trigger actual file download
  };

  const operations = [
    {
      title: 'Voter List Management',
      description: 'Upload and download voter information in Excel format',
      type: 'voters' as const,
      icon: FileSpreadsheet,
      color: 'bg-blue-500',
    },
    {
      title: 'Vote Center Maps',
      description: 'Manage vote center locations and mappings',
      type: 'centers' as const,
      icon: FileSpreadsheet,
      color: 'bg-green-500',
    },
    {
      title: 'Booth Map Lists',
      description: 'Upload and manage booth assignments and mappings',
      type: 'booths' as const,
      icon: FileSpreadsheet,
      color: 'bg-purple-500',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Upload Status */}
      {uploadStatus !== 'idle' && (
        <div className={`p-4 rounded-lg border ${
          uploadStatus === 'success' 
            ? 'bg-green-50 border-green-200 text-green-800'
            : uploadStatus === 'error'
            ? 'bg-red-50 border-red-200 text-red-800'
            : 'bg-blue-50 border-blue-200 text-blue-800'
        }`}>
          <div className="flex items-center">
            {uploadStatus === 'success' && <CheckCircle className="w-5 h-5 mr-2" />}
            {uploadStatus === 'error' && <AlertCircle className="w-5 h-5 mr-2" />}
            {uploadStatus === 'uploading' && (
              <div className="w-5 h-5 mr-2 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            )}
            <span className="font-medium">
              {uploadStatus === 'uploading' && 'Uploading file...'}
              {uploadStatus === 'success' && uploadMessage}
              {uploadStatus === 'error' && 'Upload failed. Please try again.'}
            </span>
          </div>
        </div>
      )}

      {/* Operations Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {operations.map((operation) => {
          const Icon = operation.icon;
          return (
            <div key={operation.type} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center mb-4">
                <div className={`${operation.color} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900">{operation.title}</h3>
                </div>
              </div>
              
              <p className="text-gray-600 mb-6">{operation.description}</p>
              
              <div className="space-y-3">
                <button
                  onClick={() => handleFileUpload(operation.type)}
                  className="w-full flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Excel File
                </button>
                
                <button
                  onClick={() => handleDownload(operation.type)}
                  className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Template
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* File Format Guidelines */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">File Format Guidelines</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Voter List Format</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• voter_id (required)</li>
              <li>• name (required)</li>
              <li>• father_name</li>
              <li>• mother_name</li>
              <li>• address</li>
              <li>• birth_date (YYYY-MM-DD)</li>
              <li>• house, area, word</li>
              <li>• union_name, occupation</li>
              <li>• gender (Male/Female/Other)</li>
              <li>• mobile, vote_center, booth</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Vote Center Format</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• center_id (required)</li>
              <li>• name (required)</li>
              <li>• address</li>
              <li>• area</li>
              <li>• word</li>
              <li>• total_booths</li>
              <li>• status (Active/Inactive)</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Booth Map Format</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• booth_id (required)</li>
              <li>• booth_number (required)</li>
              <li>• center_id (required)</li>
              <li>• capacity</li>
              <li>• status (Active/Inactive)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExcelOperations;