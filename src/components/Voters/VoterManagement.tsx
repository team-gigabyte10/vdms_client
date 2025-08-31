import React, { useState } from 'react';
import VoterTable from './VoterTable';
import VoterForm from './VoterForm';
import { Voter } from '../../types/voter';

const VoterManagement: React.FC = () => {
  const [voters, setVoters] = useState<Voter[]>([
    {
      voter_id: 'V001',
      name: 'Ahmed Rahman',
      father_name: 'Mohammad Rahman',
      mother_name: 'Fatima Rahman',
      address: '123 Main Street, Dhaka',
      birth_date: '1985-05-15',
      house: '123',
      area: 'Dhanmondi',
      word: '5',
      union_name: 'Dhaka Central',
      occupation: 'Teacher',
      gender: 'Male',
      voter_slip: 'VS001',
      section: 'A',
      voter_no: '001',
      vote_center: 'Dhaka High School',
      booth: 'B1',
      sms: true,
      vote_given: false,
      status: 'Active',
      mobile: '+8801712345678',
    },
    {
      voter_id: 'V002',
      name: 'Rashida Begum',
      father_name: 'Abdul Karim',
      mother_name: 'Salma Begum',
      address: '456 Park Road, Dhaka',
      birth_date: '1990-08-22',
      house: '456',
      area: 'Gulshan',
      word: '3',
      union_name: 'Dhaka North',
      occupation: 'Doctor',
      gender: 'Female',
      voter_slip: 'VS002',
      section: 'B',
      voter_no: '002',
      vote_center: 'Gulshan College',
      booth: 'B2',
      sms: true,
      vote_given: true,
      status: 'Active',
      mobile: '+8801812345679',
    },
  ]);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingVoter, setEditingVoter] = useState<Voter | undefined>();

  const handleAddVoter = () => {
    setEditingVoter(undefined);
    setIsFormOpen(true);
  };

  const handleEditVoter = (voter: Voter) => {
    setEditingVoter(voter);
    setIsFormOpen(true);
  };

  const handleSaveVoter = (voterData: Partial<Voter>) => {
    if (editingVoter) {
      // Update existing voter
      setVoters(prev => prev.map(v => 
        v.voter_id === editingVoter.voter_id 
          ? { ...v, ...voterData }
          : v
      ));
    } else {
      // Add new voter
      const newVoter: Voter = {
        ...voterData as Voter,
        voter_id: voterData.voter_id || `V${Date.now()}`,
      };
      setVoters(prev => [...prev, newVoter]);
    }
    setIsFormOpen(false);
    setEditingVoter(undefined);
  };

  const handleDeleteVoter = (voterId: string) => {
    if (window.confirm('Are you sure you want to delete this voter?')) {
      setVoters(prev => prev.filter(v => v.voter_id !== voterId));
    }
  };

  const handleCancelForm = () => {
    setIsFormOpen(false);
    setEditingVoter(undefined);
  };

  return (
    <div>
      <VoterTable
        voters={voters}
        onEdit={handleEditVoter}
        onDelete={handleDeleteVoter}
        onAdd={handleAddVoter}
      />
      
      <VoterForm
        voter={editingVoter}
        onSave={handleSaveVoter}
        onCancel={handleCancelForm}
        isOpen={isFormOpen}
      />
    </div>
  );
};

export default VoterManagement;