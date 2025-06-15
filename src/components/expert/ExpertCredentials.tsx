import React from 'react';
import { Credential } from '../../types/expert';
import { Award } from 'lucide-react';

interface ExpertCredentialsProps {
  credentials: Credential[];
}

const ExpertCredentials: React.FC<ExpertCredentialsProps> = ({ credentials }) => {
  return (
    <div>
      <h3 className="text-lg font-semibold text-secondary-900 mb-3">Credentials</h3>
      <div className="space-y-3">
        {credentials.map((credential) => (
          <div 
            key={credential.id}
            className="flex items-start p-3 bg-secondary-50 rounded-md"
          >
            <Award className="w-5 h-5 text-primary-600 mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-secondary-900">{credential.title}</h4>
              <p className="text-sm text-secondary-600">
                {credential.institution}, {credential.year}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExpertCredentials;