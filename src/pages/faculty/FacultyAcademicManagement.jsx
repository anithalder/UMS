import React, { useState } from "react";
import {
  Upload,
  FileText,
  Video,
  Trash2,
  Edit3,
  CalendarDays,
  BookOpen,
  Link2,
} from "lucide-react";

export default function FacultyAcademicManagement() {
  const [materials, setMaterials] = useState([
    {
      id: 1,
      title: "Data Structures - Unit 1 Notes",
      type: "PDF",
      subject: "Data Structures",
      semester: "3rd",
      topic: "Introduction & Arrays",
      date: "2025-11-10",
    },
    {
      id: 2,
      title: "OOP Concepts - Lecture 02",
      type: "Video",
      subject: "OOP",
      semester: "4th",
      topic: "Encapsulation and Inheritance",
      date: "2025-11-08",
    },
  ]);

  const [newMaterial, setNewMaterial] = useState({
    title: "",
    type: "",
    subject: "",
    semester: "",
    topic: "",
  });

  const handleUpload = () => {
    if (!newMaterial.title || !newMaterial.type)
      return alert("Please fill all fields!");
    setMaterials([
      ...materials,
      {
        ...newMaterial,
        id: Date.now(),
        date: new Date().toISOString().split("T")[0],
      },
    ]);
    setNewMaterial({
      title: "",
      type: "",
      subject: "",
      semester: "",
      topic: "",
    });
  };

  const handleDelete = (id) =>
    setMaterials(materials.filter((m) => m.id !== id));

  return (
    <div className="p-6 bg-base-100 min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-royalblue to-blue-700 text-white p-6 rounded-xl shadow-lg mb-6">
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          <BookOpen className="w-6 h-6" /> Academic Management
        </h2>
        <p className="text-sm text-blue-100 mt-1">
          Manage your course materials, lectures, and live sessions for
          students.
        </p>
      </div>

      {/* Upload Section */}
      <div className="bg-base-200 border border-base-300 p-5 rounded-xl shadow-sm mb-6">
        <h3 className="font-semibold text-lg mb-3 flex items-center gap-2 text-base-content">
          <Upload className="w-5 h-5 text-blue-600" /> Upload New Material
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Title (e.g., Unit 1 Notes)"
            className="input input-bordered input-sm w-full"
            value={newMaterial.title}
            onChange={(e) =>
              setNewMaterial({ ...newMaterial, title: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Subject (e.g., Data Structures)"
            className="input input-bordered input-sm w-full"
            value={newMaterial.subject}
            onChange={(e) =>
              setNewMaterial({ ...newMaterial, subject: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Semester (e.g., 3rd)"
            className="input input-bordered input-sm w-full"
            value={newMaterial.semester}
            onChange={(e) =>
              setNewMaterial({ ...newMaterial, semester: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Topic (e.g., Arrays)"
            className="input input-bordered input-sm w-full"
            value={newMaterial.topic}
            onChange={(e) =>
              setNewMaterial({ ...newMaterial, topic: e.target.value })
            }
          />
          <select
            className="select select-bordered select-sm w-full"
            value={newMaterial.type}
            onChange={(e) =>
              setNewMaterial({ ...newMaterial, type: e.target.value })
            }
          >
            <option value="">Select Type</option>
            <option value="PDF">PDF / Notes</option>
            <option value="PPT">Presentation</option>
            <option value="Video">Recorded Lecture</option>
            <option value="Assignment">Assignment</option>
          </select>
          <button
            onClick={handleUpload}
            className="btn btn-primary btn-sm hover:from-blue-700 hover:to-indigo-600 bg-gradient-to-r from-blue-600 to-primary text-white"
          >
            <Upload className="w-4 h-4 mr-2" /> Upload
          </button>
        </div>
      </div>

      {/* Uploaded Materials */}
      <div className="bg-base-200 border border-base-300 p-5 rounded-xl shadow-sm mb-6">
        <h3 className="font-semibold text-lg mb-3 flex items-center gap-2 text-base-content">
          <FileText className="w-5 h-5 text-blue-600" /> Uploaded Materials
        </h3>

        {materials.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            <FileText className="w-10 h-10 mx-auto mb-3 text-gray-400" />
            <p>No materials uploaded yet</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {materials.map((m) => (
              <div
                key={m.id}
                className="p-4 bg-base-100 border border-base-300 rounded-xl shadow hover:shadow-md transition-all"
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-base text-base-content">
                    {m.title}
                  </h4>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleDelete(m.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <button className="text-blue-600 hover:text-blue-800">
                      <Edit3 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-2">
                  {m.subject} • {m.semester} Sem • {m.topic}
                </p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <CalendarDays className="w-3 h-3" /> {m.date}
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-xs bg-blue-100 text-blue-600 font-medium">
                    {m.type}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Live Classes Section */}
      <div className="bg-base-200 border border-base-300 p-5 rounded-xl shadow-sm mb-6">
        <h3 className="font-semibold text-lg mb-3 flex items-center gap-2 text-base-content">
          <Video className="w-5 h-5 text-blue-600" /> Live & Recorded Lectures
        </h3>

        <div className="flex flex-col gap-3">
          <button className="btn btn-sm bg-gradient-to-r from-blue-600 to-primary text-white hover:from-blue-700 hover:to-indigo-600 shadow-sm">
            <CalendarDays className="w-4 h-4 mr-2" /> Schedule Live Class
          </button>
          <button className="btn btn-outline btn-sm border-base-300 hover:bg-base-300">
            <Video className="w-4 h-4 mr-2" /> Upload Recorded Lecture
          </button>
          <button className="btn btn-ghost btn-sm border-base-300 hover:bg-base-300">
            <Link2 className="w-4 h-4 mr-2" /> Share Session Link via
            Notifications
          </button>
        </div>
      </div>

      {/* Archives Section */}
      <div className="bg-base-200 border border-base-300 p-5 rounded-xl shadow-sm">
        <h3 className="font-semibold text-lg mb-3 flex items-center gap-2 text-base-content">
          <BookOpen className="w-5 h-5 text-blue-600" /> Lecture Archives
        </h3>
        <p className="text-sm text-gray-600">
          Access and maintain lecture archives by course and date.
        </p>
        <button className="mt-3 btn btn-outline btn-sm border-base-300 hover:bg-base-300">
          View Archives
        </button>
      </div>
    </div>
  );
}
