import React, { useState } from 'react';

export const AccreditationForm = ({
  initialData,
  handleSaveInformation,
}: {
  initialData: {
    comment: string;
    accredited: boolean;
  };
  handleSaveInformation: (values: any, url: string, useActivityID?: boolean) => void;
}) => {
  const url = `methods/ni-mcit-d-01/instrument-zero-check/`;
  const [data, setData] = useState(initialData);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSave = () => {
    handleSaveInformation(data, url);
  };

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex flex-col space-y-2">
        <label>
          Comment:
          <textarea
            name="comment"
            value={data.comment}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </label>
        <label>
          Accredited:
          <input
            type="checkbox"
            name="accredited"
            checked={data.accredited}
            onChange={handleInputChange}
            className="ml-2"
          />
        </label>
      </div>
      <button onClick={handleSave} className="px-4 py-2 bg-blue-500 text-white rounded">
        Save
      </button>
    </div>
  );
};
