import React, { useState } from 'react';

const UserProfile = ({ profile, setProfile }) => {
  const [editing, setEditing] = useState(false);
  const [tempProfile, setTempProfile] = useState(profile);

  const handleSave = () => {
    setProfile(tempProfile);
    setEditing(false);
    localStorage.setItem('userProfile', JSON.stringify(tempProfile));
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Tu Perfil Profesional</h3>
        {editing ? (
          <button 
            onClick={handleSave}
            className="text-sm bg-blue-500 text-white px-3 py-1 rounded"
          >
            Guardar
          </button>
        ) : (
          <button 
            onClick={() => setEditing(true)}
            className="text-sm text-blue-500"
          >
            Editar
          </button>
        )}
      </div>

      {editing ? (
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
            <label className="block text-sm text-gray-600 mb-1">Especialidad Principal</label>
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

export default UserProfile;