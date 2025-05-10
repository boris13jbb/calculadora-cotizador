import React, { useState, useEffect } from 'react';

const UserProfileManager = ({ profile, setProfile }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempProfile, setTempProfile] = useState(profile);

  useEffect(() => {
    setTempProfile(profile);
  }, [profile]);

  const saveProfile = () => {
    setProfile(tempProfile);
    localStorage.setItem('userProfile', JSON.stringify(tempProfile));
    setIsEditing(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Tu Perfil</h3>
        <button
          onClick={() => isEditing ? saveProfile() : setIsEditing(true)}
          className="text-sm bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
        >
          {isEditing ? 'Guardar' : 'Editar'}
        </button>
      </div>

      {isEditing ? (
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Nivel de Experiencia</label>
            <select
              value={tempProfile.experience}
              onChange={(e) => setTempProfile({...tempProfile, experience: e.target.value})}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="junior">Junior (1-3 años)</option>
              <option value="mid">Mid-Level (3-5 años)</option>
              <option value="senior">Senior (5+ años)</option>
              <option value="expert">Experto (10+ años)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Especialidad</label>
            <input
              type="text"
              value={tempProfile.specialty}
              onChange={(e) => setTempProfile({...tempProfile, specialty: e.target.value})}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
        </div>
      ) : (
        <div>
          <p className="text-sm"><span className="font-medium">Experiencia:</span> {{
            junior: 'Junior (1-3 años)',
            mid: 'Mid-Level (3-5 años)',
            senior: 'Senior (5+ años)',
            expert: 'Experto (10+ años)'
          }[profile.experience]}</p>
          <p className="text-sm"><span className="font-medium">Especialidad:</span> {profile.specialty || 'No especificada'}</p>
        </div>
      )}
    </div>
  );
};

export default UserProfileManager;