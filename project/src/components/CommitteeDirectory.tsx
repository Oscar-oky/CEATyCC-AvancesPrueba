import React from 'react';
import { Home } from 'lucide-react';
import { committeeMembers, sponsorLogos } from '@/utils/data';

interface CommitteeDirectoryProps {
  isVisible: boolean;
  onClose: () => void;
}

const CommitteeDirectory: React.FC<CommitteeDirectoryProps> = ({ isVisible, onClose }) => {
  if (!isVisible) return null;

  return (
    <div className="bg-gray-50 py-12">
      {/* Committee Title */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-gray-800 mb-4">Comité CEATyCC</h1>
        <p className="text-xl text-gray-600">Miembros del Comité de Educación en Alta Tecnología y Cloud Computing</p>
      </div>

      {/* Committee Members Grid */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {committeeMembers.map((member, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg p-8 text-center transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl min-h-[400px] flex flex-col justify-start"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-44 h-44 rounded-full object-cover border-4 border-black mx-auto mb-6 shadow-md"
              />
              <h2 className="text-xl font-bold text-gray-800 mb-2 leading-tight">
                {member.name}
              </h2>
              <h3 className="text-lg font-semibold text-blue-600 mb-2">
                {member.institution}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {member.fullInstitution}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommitteeDirectory;