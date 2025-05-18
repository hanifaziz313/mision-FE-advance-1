"use client";
import { useState } from "react";

export default function CrudComponent() {
  const [dataArray, setDataArray] = useState([]);
  const [inputData, setInputData] = useState("");

  const tambahData = () => {
    if (inputData.trim()) {
      setDataArray([...dataArray, inputData]);
      setInputData("");
    }
  };

  const editData = (index) => {
    const newData = prompt("Edit Data:", dataArray[index]);
    if (newData !== null) {
      const updatedData = [...dataArray];
      updatedData[index] = newData.trim();
      setDataArray(updatedData);
    }
  };

  const hapusData = (index) => {
    if (confirm(`Yakin ingin menghapus "${dataArray[index]}"?`)) {
      setDataArray(dataArray.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">CRUD Operations</h2>

      <div className="flex mb-6">
        <input
          type="text"
          value={inputData}
          onChange={(e) => setInputData(e.target.value)}
          placeholder="Masukan data..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          onKeyPress={(e) => e.key === "Enter" && tambahData()}
        />
        <button onClick={tambahData} disabled={!inputData.trim()} className={`px-4 py-2 rounded-r-lg font-medium ${inputData.trim() ? "bg-blue-600 hover:bg-blue-700 text-white" : "bg-gray-300 cursor-not-allowed text-gray-500"}`}>
          Tambah
        </button>
      </div>

      {dataArray.length > 0 ? (
        <ul className="space-y-3">
          {dataArray.map((data, index) => (
            <li key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <span className="flex-1 text-gray-800">{data}</span>
              <div className="flex space-x-2">
                <button onClick={() => editData(index)} className="px-3 py-1 bg-yellow-500 hover:bg-yellow-600 text-white rounded text-sm font-medium transition-colors">
                  Edit
                </button>
                <button onClick={() => hapusData(index)} className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded text-sm font-medium transition-colors">
                  Hapus
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-center py-8 text-gray-500">
          <p>Tidak ada data. Silahkan tambahkan data baru.</p>
        </div>
      )}

      {dataArray.length > 0 && <div className="mt-4 text-sm text-gray-500">Total data: {dataArray.length}</div>}
    </div>
  );
}
