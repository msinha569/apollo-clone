import React from "react";

const Card = ({ doctor }) => {
    console.log(doctor);
    
  return (
    <div className="flex justify-between  p-4  items-center border rounded-lg shadow-sm hover:shadow-md transition">
      <div className="flex items-start space-x-4">
        <img
          src={doctor?.image || "/doctor.png"} 
          alt={doctor.name}
          className="w-24 h-24 rounded-md object-cover"
        />

        <div>
          <h2 className="text-lg font-semibold">
            {doctor.name} <span className="text-gray-500">ⓘ</span>
          </h2>
          <p className="text-sm text-gray-500">{doctor.specialization}</p>
          <p className="text-sm font-semibold text-purple-700 mt-1">
            {doctor.experience} YEARS • {doctor.qualification}
          </p>
          <p className="text-sm text-gray-600 mt-1">{doctor.location}</p>
          <p className="text-sm text-gray-500">
            {doctor.hospital} - {doctor.location}
          </p>
        </div>
      </div>

      <div className="flex flex-col items-end space-y-2">
        <div className="text-right">
          <p className="text-lg font-semibold">₹{doctor.price}</p>
          <p className="text-sm text-amber-700">
            <span className="bg-yellow-100 px-1 py-0.5 rounded-full text-xs font-medium">
              Circle
            </span>{" "}
            ₹{doctor.cashback} Cashback
          </p>
        </div>

        {/* Consult Button */}
        <button className="border border-cyan-700 text-cyan-800 px-4 py-2 rounded-md text-sm font-medium hover:bg-cyan-50 transition">
          <div className="flex flex-col items-center leading-tight">
            <span>Consult Online</span>
            <span className="text-xs text-gray-500">Available in {doctor.availableIn} minutes</span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Card;
