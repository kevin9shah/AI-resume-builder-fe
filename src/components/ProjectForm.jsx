import { Briefcase, Plus, Trash2, Sparkles } from 'lucide-react';
import React from 'react';

const ProjectForm = ({ data, onChange }) => {

    const addProject = () => {
        const newProject = {
            name: "",
            type: "",
            description: "",
        };
        onChange([...data, newProject]);
    };

    const removeProject = (index) => {
        const updated = data.filter((_, i) => i !== index);
        onChange(updated);
    };

    const updateProject = (index, field, value) => {
        const updated = [...data];
        updated[index] = { ...updated[index], [field]: value };
        onChange(updated);
    };

    return (
        <div>
            <div className='flex items-center justify-between'>
                {/* left */}
                <div>
                    {/* FIX: items-cemter → items-center */}
                    <h3 className='flex items-center gap-2 text-lg font-semibold text-gray-900'>
                        Projects
                    </h3>
                    <p className='text-sm text-gray-500'>
                        Add projects
                    </p>
                </div>

                {/* right */}
                <button
                    type="button"
                    onClick={addProject}
                    className='flex items-center gap-2 px-3 py-1 text-sm bg-green-100 text-green-700 rounded hover:bg-green-200 transition-colors'
                >
                    <Plus className='size-4' />
                    Add Project
                </button>
            </div>

            <div className="space-y-4 mt-6">
                {data.map((project, index) => (
                    <div key={index} className="p-4 border border-gray-200 rounded-lg space-y-3">
                        
                        <div className="flex justify-between items-start">
                            <h4>Projects #{index + 1}</h4>
                            <button
                                type="button"
                                onClick={() => removeProject(index)}
                                className="text-red-500 hover:text-red-700 transition-colors"
                            >
                                <Trash2 className="size-4" />
                            </button>
                        </div>

                        <div className="grid md:grid-cols-2 gap-3">
                            <input
                                onChange={(e) => updateProject(index, "name", e.target.value)}
                                value={project.name || ""}
                                type="text"
                                placeholder="Project Name"
                                className="px-3 py-2 text-sm rounded-lg border"
                            />
                            <input
                                onChange={(e) => updateProject(index, "type", e.target.value)}
                                value={project.type || ""}
                                type="text"
                                placeholder="Project Type / Role"
                                className="px-3 py-2 text-sm rounded-lg border"
                            />
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <label className="text-sm font-medium text-gray-600">
                                    Project Description
                                </label>
                                <button
                                    type="button"
                                    className="flex items-center gap-1 px-2 py-1 text-xs bg-purple-300 text-purple-700 rounded hover:bg-purple-200 transition-colors disabled:opacity-50"
                                >
                                    <Sparkles className="w-3 h-3" />
                                    Enhance with AI
                                </button>
                            </div>

                            <textarea
                                onChange={(e) => updateProject(index, "description", e.target.value)}
                                value={project.description || ""}
                                rows={4}
                                className="w-full text-sm px-3 py-3 rounded-lg border resize-none"
                                placeholder="Describe what you built, tech stack, impact..."
                            />
                        </div>

                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProjectForm;
