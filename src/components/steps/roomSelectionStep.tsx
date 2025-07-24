import React, { useEffect } from 'react';
import { FormData } from '../../types/stepper';

interface RoomSelectionStepProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

export default function RoomSelectionStep({
  formData,
  setFormData,
}: RoomSelectionStepProps) {
  const bhk = formData.bhkType;
  const maxCount = ['1'].includes(bhk) ? 1 : parseInt(bhk || '1');

  const rooms = [
    { key: 'livingRoom' as const, label: 'Living Room' },
    { key: 'kitchen' as const, label: 'Kitchen' },
    { key: 'bedroom' as const, label: 'Bedroom' },
    { key: 'bathroom' as const, label: 'Bathroom' },
    { key: 'dining' as const, label: 'Dining' },
  ];

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      rooms: {
        ...prev.rooms,
        bedroom: prev.rooms.bedroom || maxCount,
        bathroom: prev.rooms.bathroom || maxCount,
        livingRoom: Math.min(prev.rooms.livingRoom, maxCount),
        kitchen: Math.min(prev.rooms.kitchen, maxCount),
        dining: Math.min(prev.rooms.dining, maxCount),
      },
    }));
  }, [bhk]);

  const updateRoomCount = (
    room: keyof FormData['rooms'],
    delta: number
  ) => {
    setFormData((prev) => {
      const current = prev.rooms[room];
      const updated = Math.max(0, Math.min(current + delta, maxCount));

      return {
        ...prev,
        rooms: {
          ...prev.rooms,
          [room]: updated,
        },
      };
    });
  };

  return (
    <div className="w-full max-w-sm mx-auto text-center font-gtpro">
      <h2 className="text-base sm:text-xl font-semibold text-zinc-900 mb-2">
        Select the rooms you’d like us to design
      </h2>
      <p className="text-xs sm:text-sm text-gray-600 mb-6">
        To know more about this,{' '}
        <span className="text-orange-500 cursor-pointer">click here</span>
      </p>

      <div className="space-y-3">
        {rooms.map((room) => {
          const count = formData.rooms[room.key];

          return (
            <div
              key={room.key}
              className="flex items-center justify-between p-3 border border-gray-200 rounded-lg bg-white shadow-sm"
            >
              <span className="text-xs sm:text-base font-medium text-gray-900">
                {room.label}
              </span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => updateRoomCount(room.key, -1)}
                  className={`size-5.5 sm:size-7 rounded-full text-white text-lg flex items-center justify-center transition cursor-pointer
                    ${count <= 0 ? 'bg-[#F86642]/70 cursor-not-allowed' : 'bg-[#F86642] hover:bg-orange-600'}
                  `}
                  disabled={count <= 0}
                >
                  −
                </button>
                <span className="text-xs sm:text-base font-semibold w-6 text-center">
                  {count}
                </span>
                <button
                  onClick={() => updateRoomCount(room.key, 1)}
                  className={`size-5.5 sm:size-7 rounded-full text-white text-lg flex items-center justify-center transition cursor-pointer
                    ${count >= maxCount ? 'bg-[#F86642]/70 cursor-not-allowed' : 'bg-[#F86642] hover:bg-orange-600'}
                  `}
                  disabled={count >= maxCount}
                >
                  +
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
