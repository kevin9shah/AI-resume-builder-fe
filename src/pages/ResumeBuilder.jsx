import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { dummyResumeData } from "../assets/assets";
import {
  ArrowLeftIcon,
  User,
  FileText,
  Briefcase,
  GraduationCap,
  FolderIcon,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Share2Icon,
  EyeOffIcon,
  Eye,
  DownloadIcon,
} from "lucide-react";
import PersonalInfoForm from "../components/PersonalInfoForm";
import ResumePreview from "../components/ResumePreview";
import TemplateSelector from "../components/TemplateSelector";
import ColorPicker from "../components/ColorPicker";
import ProfessionalSummaryForm from "../components/ProfessionalSummaryForm";
import ExperienceForm from "../components/ExperienceForm";
import EducationForm from "../components/EducationForm";
import ProjectForm from "../components/ProjectForm";
import SkillsForm from "../components/SkillsForm";
import { useSelector } from "react-redux";
import api from "../configs/api";
import toast from "react-hot-toast";

const ResumeBuilder = () => {
  const { resumeId } = useParams();
  const { token } = useSelector(state => state.auth)


  const [resumeData, setResumeData] = useState({
    _id: "",
    title: "",
    personal_info: {},
    professional_summary: "",
    experience: [],
    education: [],
    projects: [],
    skills: [],
    template: "classic",
    accentColor: "#273c3e",
    public: false,
  });

  console.log(resumeData.education);

  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [removeBackground, setRemoveBackground] = useState(false);

  const sections = [
    { id: "personal", name: "Personal info", icon: User },
    { id: "summary", name: "Summary", icon: FileText },
    { id: "experience", name: "Experience", icon: Briefcase },
    { id: "education", name: "Education", icon: GraduationCap },
    { id: "projects", name: "Projects", icon: FolderIcon },
    { id: "skills", name: "Skills", icon: Sparkles },
  ];

  const activeSection = sections[activeSectionIndex];

  const loadExistingResume = async () => {
    if (!token) return;
    try {
      const { data } = await api.get("/api/resumes/get/" + resumeId, { headers: { Authorization: token } })
      if (data.resume) {
        setResumeData(data.resume)
        document.title = data.resume.title;
      }
    } catch (error) {
      console.log(error.message)
    }
  };

  useEffect(() => {
    loadExistingResume();
  }, [resumeId, token]);

  const changeResumeVisibility = async () => {
    try {
      const f = new FormData()
      f.append("resumeId", resumeId)
      f.append("resumeData", JSON.stringify({ public: !resumeData.public }))

      const { data } = await api.put("/api/resumes/update", f, { headers: { Authorization: token } })
      setResumeData({ ...resumeData, public: !resumeData.public })
      toast.success(data.message)
    } catch (error) {
      console.error("error saving", error)
    }
  };

  const handleShare = () => {
    const frontendUrl = window.location.href.split("/app/")[0];
    const resumeUrl = frontendUrl + "/view/" + resumeId;

    if (navigator.share) {
      navigator.share({
        url: resumeUrl,

      });
    } else {
      alert("Share not supported on Browser");
    }
  };

  const downloadResume = () => {
    window.print();
  }

  const saveResume = async () => {
    try {
      let updatedResumeData = structuredClone(resumeData)

      // remove image
      if (typeof resumeData.personal_info.image === 'object') {
        delete updatedResumeData.personal_info.image
      }
      const formData = new FormData();
      formData.append("resumeId", resumeId)
      formData.append("resumeData", JSON.stringify(updatedResumeData))
      removeBackground && formData.append("removeBackground", "yes")
      typeof resumeData.personal_info.image === 'object' && formData.append("image", resumeData.personal_info.image)

      const { data } = await api.put('/api/resumes/update', formData, { headers: { Authorization: token } })
      setResumeData(data.resume)
      toast.success(data.message)
      return data;

    } catch (error) {
      console.error("error sving resume", error)
      throw error;
    }
  }


  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Back link */}
      <div className="mb-6 text-left">
        <Link
          to="/app"
          className="flex items-center text-gray-600 hover:text-gray-900 font-medium"
        >
          <ArrowLeftIcon className="w-5 h-5 mr-2" /> BACK TO DASHBOARD
        </Link>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* Left sidebar */}
        <div className="relative lg:col-span-5 rounded-lg overflow-hidden">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 pt-1">
            {/* Progress bar */}
            <hr className="absolute top-0 left-0 right-0 border-2 border-gray-200" />
            <hr
              className="absolute top-0 left-0 h-1 bg-linear-to-r from-green-500 to-green-600 border-none transition-all duration-300"
              style={{
                width: `${(activeSectionIndex * 100) / (sections.length - 1)}%`,
              }}
            />

            {/* Navigation buttons */}
            <div className="flex justify-between items-center mb-4 border-b border-gray-200 py-1">
              <div className="flex items-center gap-2">
                <TemplateSelector
                  selectedTemplate={resumeData.template}
                  onChange={(template) =>
                    setResumeData((prev) => ({ ...prev, template }))
                  }
                />

                <ColorPicker
                  selectedColor={resumeData.accentColor}
                  onChange={(color) =>
                    setResumeData((prev) => ({
                      ...prev,
                      accentColor: color,
                    }))
                  }
                />
              </div>

              <div className="flex items-center">
                {activeSectionIndex !== 0 && (
                  <button
                    onClick={() =>
                      setActiveSectionIndex((prevIndex) =>
                        Math.max(prevIndex - 1, 0)
                      )
                    }
                    className="flex items-center gap-1 p-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all"
                  >
                    <ChevronLeft className="w-4 h-4" /> Previous
                  </button>
                )}

                <button
                  onClick={() =>
                    setActiveSectionIndex((prevIndex) =>
                      Math.min(prevIndex + 1, sections.length - 1)
                    )
                  }
                  className={`flex items-center gap-1 p-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all ${activeSectionIndex === sections.length - 1
                      ? "opacity-50"
                      : ""
                    }`}
                  disabled={activeSectionIndex === sections.length - 1}
                >
                  <ChevronRight className="w-4 h-4" /> Next
                </button>
              </div>
            </div>

            <div className="space-y-6">
              {activeSection.id === "personal" && (
                <PersonalInfoForm
                  data={resumeData.personal_info}
                  onChange={(data) =>
                    setResumeData((prev) => ({
                      ...prev,
                      personal_info: data,
                    }))
                  }
                  removeBackground={removeBackground}
                  setRemoveBackground={setRemoveBackground}
                />
              )}

              {activeSection.id === "summary" && (
                <ProfessionalSummaryForm
                  data={resumeData.professional_summary}
                  onChange={(data) =>
                    setResumeData((prev) => ({
                      ...prev,
                      professional_summary: data,
                    }))
                  }
                  setResumeData={setResumeData}
                />
              )}

              {activeSection.id === "experience" && (
                <ExperienceForm
                  data={resumeData.experience}
                  onChange={(data) =>
                    setResumeData((prev) => ({ ...prev, experience: data }))
                  }
                />
              )}

              {activeSection.id === "education" && (
                <EducationForm
                  data={resumeData.education}
                  onChange={(data) =>
                    setResumeData((prev) => ({ ...prev, education: data }))
                  }
                />
              )}

              {activeSection.id === "projects" && (
                <ProjectForm
                  data={resumeData.projects}
                  onChange={(data) =>
                    setResumeData((prev) => ({ ...prev, projects: data }))
                  }
                />
              )}

              {activeSection.id === "skills" && (
                <SkillsForm
                  data={resumeData.skills}
                  onChange={(data) =>
                    setResumeData((prev) => ({ ...prev, skills: data }))
                  }
                />
              )}
            </div>

            <button
              onClick={() => {
                toast.promise(saveResume(), {
                  loading: "Saving...",
                  success: "Resume saved ✅",
                  error: "Failed to save ❌",
                });
              }}
              className="bg-linear-to-br from-green-100 to-green-200 ring-green-300 text-green-600 ring hover:ring-green-400 transition-all rounded-md px-6 py-2 mt-6 text-sm"
            >              Save Changes
            </button>
          </div>
        </div>

        {/* Right content */}
        <div className="lg:col-span-7 max-lg:mt-6">
          <div className="relative w-full">
            <div className="absolute bottom-3 left-0 right-0 flex items-center justify-end gap-2">
              {resumeData.public && (
                <button
                  onClick={handleShare}
                  className="flex items-center p-2 px-4 gap-2 text-xs bg-linear-to-br from-blue-100 to-blue-200 text-blue-600 rounded-lg ring-blue-300 hover:ring transition-colors"
                >
                  <Share2Icon className="size-4" />
                  Share
                </button>
              )}

              <button
                className="flex items-center gap-2 px-6 py-2 text-xs bg-linear-to-br from-green-100 to-green-200 text-black rounded-lg ring-green-300 hover:ring transition-colors"
                onClick={changeResumeVisibility}
              >
                {resumeData.public ? (
                  <Eye className="size-4" />
                ) : (
                  <EyeOffIcon className="size-4" />
                )}
                {resumeData.public ? "Private" : "Public"}
              </button>

              <button onClick={downloadResume} className="flex items-center gap-2 px-6 py-2 text-xs bg-linear-to-br from-green-100 to-green-200 text-black rounded-lg ring-green-300 hover:ring transition-colors">
                <DownloadIcon className="size-4" /> Download
              </button>
            </div>
          </div>

          <ResumePreview
            data={resumeData}
            template={resumeData.template}
            accentColor={resumeData.accentColor}
          />
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
