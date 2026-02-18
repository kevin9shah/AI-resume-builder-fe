import React, { useEffect, useState } from "react";
import {
  FilePenLineIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
  UploadCloud,
  UploadCloudIcon,
  XIcon,
} from "lucide-react";
import { dummyResumeData } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const colors = ["#273c3e", "#731b13", "#dc0f72"];
  const [allResumes, setAllResumes] = useState([]);
  const [showCreateResume, setShowCreateResume] = useState(false);
  const [showUploadResume, setShowUploadResume] = useState(false);
  const [Title, setTitle] = useState("");
  const [Resume, setResume] = useState(null);
  const [editResumeId, setEditResumeId] = useState("");
  const navigate = useNavigate();
  const loadAllResumes = async () => {
    setAllResumes(dummyResumeData);
  };

  const createResume = async (e) => {
    e.preventDefault();
    setShowCreateResume(false);
    navigate(`/app/builder/resume123`);
  };

  const uploadResume = async (e) => {
    e.preventDefault();
    setShowUploadResume(false);
    navigate(`/app/builder/resume321`);
  };

const editTitle = async (e) => {
  e.preventDefault();
  setEditResumeId('');
 
}

const deleteResume = async(resumeId) => {
  const confirm = window.confirm("Are you sure you want to delete this resume?");
  if(confirm){
    setAllResumes(prev => prev.filter(resume => resume._id !== resumeId))
  }
}

  useEffect(() => {
    loadAllResumes();
  }, []);

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <p className="text-2xl font-medium mb-6 bg-gradient-to-r from-slate-600 to-slate-700 bg-clip-text text-transparent sm:hidden">
          Welcome, John Doe
        </p>
        <div className="flex gap-4 ">
          <button
            onClick={() => setShowCreateResume(true)}
            className="w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 text-slate-600 border border-dashed border-purple-300 group hover:border-green-500 hover:shadow-lg transition-all duration-300 cursor-pointer"
          >
            <PlusIcon className="size-11 transition-all duration-300 p-2.5 bg-gradient-to-br from-green-600 to-green-300 text-white rounded-full" />
            <p className="text-sm group-hover:text-green-600 transition-all duration-300">
              Create Resume
            </p>
          </button>
          <button
            onClick={() => setShowUploadResume(true)}
            className="w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 text-slate-600 border border-dashed border-slate-300 group hover:border-green-500 hover:shadow-lg transition-all duration-300 cursor-pointer"
          >
            <UploadCloudIcon className="size-11 transition-all duration-300 p-2.5 bg-gradient-to-br from-yellow-600 to-yellow-300 text-white rounded-full" />
            <p className="text-sm group-hover:text-green-600 transition-all duration-300">
              Upload Existing
            </p>
          </button>
        </div>

        <hr className="my-8 border-slate-300" />

        <div className="grid grid-cols-2 sm:flex flex-wrap gap-4">
          {allResumes.map((resume, index) => {
            const baseColor = colors[index % colors.length];
            return (
              <button
                key={index}
                onClick={() => navigate(`/app/builder/${resume._id}`)}
                className="relative w-full sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 border group hover:shadow-lg transition-all duration-300 cursor-pointer"
                style={{
                  background: `linear-gradient(135 deg, ${baseColor}10, ${baseColor}40)`,
                  borderColor: baseColor + "40",
                }}
              >
                <FilePenLineIcon
                  className="size-11 transition-all duration-300 p-2.5 bg-gradient-to-br from-purple-600 to-purple-300 text-white rounded-full"
                  style={{ color: baseColor }}
                />
                <p
                  className="text-sm group-hover:text-purple-600 transition-all duration-300"
                  style={{ color: baseColor }}
                >
                  {resume.title}
                </p>
                <p
                  className="absolute bottom-1 text-[11px] text-slate-400 group-hover:text-slate-500 transition-all duration-300 px-2 text-center"
                  style={{ color: baseColor + "90" }}
                >
                  {new Date(resume.updatedAt).toLocaleDateString()}
                </p>
                <div onClick={(e) =>e.stopPropagation()} className="absolute top-1 right-1 group-hover:flex hidden items-center ">
                  <TrashIcon onClick ={()=>deleteResume(resume._id)}  className="size-7 p-1.5 hover:bg-white/50 rounded text-slate-700 transition-colors" />
                  <PencilIcon onClick={() => {setEditResumeId(resume._id); setTitle(resume.title)}} className="size-7 p-1.5 hover:bg-white/50 rounded text-slate-700 transition-colors" />
                </div>
              </button>
            );
          })}
        </div>
        <div>
          {showCreateResume && (
            <form
              onSubmit={createResume}
              onClick={() => setShowCreateResume(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative"
              >
                <h2 className="text-xl font-bold mb-4 text-center">
                  Create a Resumé
                </h2>
                <input
                  type="text"
                  placeholder="Enter resume title"
                  className="w-full px-4 py-2 mb-4 border rounded focus:ring-2 focus:ring-green-600"
                  required
                  value={Title}
                  onChange={(e) => setTitle(e.target.value)}
                />

                <button className="w-full py-2 bg-green-700 hover:bg-green-800 text-white rounded transition-colors">
                  Create Resumé
                </button>
                <XIcon
                  className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors"
                  onClick={() => {
                    setShowCreateResume(false);
                    setTitle("");
                  }}
                />
              </div>
            </form>
          )}
          {showUploadResume && (
            <form
              onSubmit={uploadResume}
              onClick={() => setShowUploadResume(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative"
              >
                <h2 className="text-xl font-bold mb-4 text-center">
                  Upload a Resumé
                </h2>
                <input
                  type="text"
                  placeholder="upload resume title"
                  className="w-full px-4 py-2 mb-4 border rounded focus:ring-2 focus:ring-green-600"
                  required
                  value={Title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <div>
                  <label
                    htmlFor="resume-input"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Select Resumé File
                    <div className="mt-1 flex items-center justify-center w-full h-32 border-2 border-dashed rounded-md cursor-pointer hover:border-green-500 transition-colors">
                      {Resume ? (
                        <p className="text-green-650">{Resume.name}</p>
                      ) : (
                        <>
                          <UploadCloud className="size-13 stroke-1" />
                          <p>Upload resume</p>
                        </>
                      )}
                    </div>
                  </label>
                  <input
                    type="file"
                    id="resume-input"
                    accept=".pdf"
                    hidden
                    onChange={(e) => setResume(e.target.files[0])}
                  ></input>
                </div>
                <button className="w-full py-2 bg-green-700 hover:bg-green-800 text-white rounded transition-colors">
                  Upload Resumé
                </button>
                <XIcon
                  className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors"
                  onClick={() => {
                    setShowUploadResume(false);
                    setTitle("");
                  }}
                />
              </div>
            </form>
          )}
            {editResumeId && (
            <form
              onSubmit={editTitle}
              onClick={() => setEditResumeId('')}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative"
              >
                <h2 className="text-xl font-bold mb-4 text-center">
                 Edit Resume Title
                </h2>
                <input
                  type="text"
                  placeholder="Enter resume title"
                  className="w-full px-4 py-2 mb-4 border rounded focus:ring-2 focus:ring-green-600"
                  required
                  value={Title}
                  onChange={(e) => setTitle(e.target.value)}
                />

                <button className="w-full py-2 bg-green-700 hover:bg-green-800 text-white rounded transition-colors">
                 Edit
                </button>
                <XIcon
                  className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors"
                  onClick={() => {
                    setEditResumeId('');
                    setTitle("");
                  }}
                />
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
