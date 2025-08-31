import React, { useState } from 'react';
import { Printer, FileText, Download, Settings } from 'lucide-react';

const VoterSlips: React.FC = () => {
  const [selectedArea, setSelectedArea] = useState('');
  const [selectedWord, setSelectedWord] = useState('');
  const [slipsPerPage, setSlipsPerPage] = useState(3);
  const [currentBook, setCurrentBook] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const areas = ['Dhanmondi', 'Gulshan', 'Uttara', 'Wari', 'Old Dhaka'];
  const words = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

  const mockSlips = Array.from({ length: 15 }, (_, i) => ({
    id: i + 1,
    voter_id: `V${String(i + 1).padStart(3, '0')}`,
    name: `Voter ${i + 1}`,
    father_name: `Father ${i + 1}`,
    address: `Address ${i + 1}`,
    vote_center: 'Dhaka High School',
    booth: `B${Math.floor(i / 5) + 1}`,
    voter_no: String(i + 1).padStart(3, '0'),
  }));

  const totalPages = Math.ceil(mockSlips.length / slipsPerPage);
  const totalBooks = Math.ceil(totalPages / 10); // 10 pages per book

  const generateSlips = () => {
    console.log('Generating slips for:', { selectedArea, selectedWord });
    // In real implementation, this would fetch filtered voters and generate slips
  };

  const printSlips = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Slip Generation Controls</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Area
            </label>
            <select
              value={selectedArea}
              onChange={(e) => setSelectedArea(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Areas</option>
              {areas.map(area => (
                <option key={area} value={area}>{area}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Word
            </label>
            <select
              value={selectedWord}
              onChange={(e) => setSelectedWord(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Words</option>
              {words.map(word => (
                <option key={word} value={word}>Word {word}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Slips per Page
            </label>
            <select
              value={slipsPerPage}
              onChange={(e) => setSlipsPerPage(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value={1}>1 slip per page</option>
              <option value={2}>2 slips per page</option>
              <option value={3}>3 slips per page</option>
              <option value={4}>4 slips per page</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={generateSlips}
              className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
            >
              <FileText className="w-4 h-4 mr-2" />
              Generate
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-600">
              Book {currentBook} of {totalBooks} • Page {currentPage} of {totalPages}
            </div>
          </div>
          
          <div className="flex space-x-3">
            <button
              onClick={printSlips}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center"
            >
              <Printer className="w-4 h-4 mr-2" />
              Print Current Page
            </button>
            <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center">
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </button>
          </div>
        </div>
      </div>

      {/* Slip Preview */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Slip Preview</h3>
        
        <div className="print:shadow-none print:border-none">
          <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${Math.min(slipsPerPage, 3)}, 1fr)` }}>
            {mockSlips.slice(0, slipsPerPage).map((slip) => (
              <div key={slip.id} className="border-2 border-gray-300 p-4 rounded-lg bg-gray-50">
                <div className="text-center border-b border-gray-300 pb-2 mb-3">
                  <h4 className="font-bold text-sm">VOTER SLIP</h4>
                  <p className="text-xs text-gray-600">Bangladesh Election Commission</p>
                </div>
                
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="font-medium">Voter ID:</span>
                    <span>{slip.voter_id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Name:</span>
                    <span>{slip.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Father:</span>
                    <span>{slip.father_name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Address:</span>
                    <span className="text-right">{slip.address}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Center:</span>
                    <span>{slip.vote_center}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Booth:</span>
                    <span>{slip.booth}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Serial:</span>
                    <span>{slip.voter_no}</span>
                  </div>
                </div>
                
                <div className="mt-3 pt-2 border-t border-gray-300 text-center">
                  <p className="text-xs text-gray-500">
                    Book {currentBook} • Page {currentPage}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous Page
          </button>
          
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">
              Page {currentPage} of {totalPages}
            </span>
            <div className="flex space-x-2">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const page = i + 1;
                return (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-8 h-8 text-sm rounded ${
                      currentPage === page
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    } transition-colors`}
                  >
                    {page}
                  </button>
                );
              })}
            </div>
          </div>
          
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next Page
          </button>
        </div>
      </div>
    </div>
  );
};

export default VoterSlips;