import { GraduationCap, Plus, Trash2, Sparkles } from 'lucide-react';
import React from 'react'

const EducationForm = ({ data, onChange }) => {

    const addEducation = () => {
        const newEducation = {
            institution: "",
            degree: "",
            field: "",
            graduation_date: "",
            gpa: ""
        };
        onChange([...data, newEducation])
    }

    const removeEducation = (index) => {
        const updated = data.filter((_, i) => i !== index);
        onChange(updated)
    }

    const updateEducation = (index, field, value) => {
        const updated = [...data];
        updated[index] = { ...updated[index], [field]: value }
        onChange(updated)
    }

    return (
        <div className='space-y-6'>
            <div className='flex items-center justify-between'>

                {/* left */}
                <div>
                    <h3 className='flex items-center gap-2 text-lg font-semibold text-gray-900'>
                        Education
                    </h3>
                    <p className='text-sm text-gray-500'>
                        Add your education details
                    </p>
                </div>

                {/* right */}
                <button
                    onClick={addEducation}
                    className='flex items-center gap-2 px-3 py-1 text-sm bg-green-100 text-green-700 rounded hover:bg-green-200 transition-colors'
                >
                    <Plus className='size-4' />
                    Add Education
                </button>
            </div>

            {data.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                    <GraduationCap className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <p>None yet</p>
                    <p className="text-sm">Click add</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {data.map((education, index) => (
                        <div key={index} className="p-4 border border-gray-200 rounded-lg space-y-3">

                            {/* Header */}
                            <div className="flex justify-between items-start">
                                <h4>Education #{index + 1}</h4>
                                <button
                                    onClick={() => removeEducation(index)}
                                    className="text-red-500 hover:text-red-700 transition-colors"
                                >
                                    <Trash2 className="size-4" />
                                </button>
                            </div>

                            {/* Inputs */}
                            <div className="grid md:grid-cols-2 gap-3">

                                <input
                                    onChange={(e) => updateEducation(index, "institution", e.target.value)}
                                    value={education.institution || ""}
                                    type="text"
                                    placeholder="Institution Name"
                                    className="px-3 py-2 text-sm rounded-lg border"
                                />

                                <input
                                    onChange={(e) => updateEducation(index, "degree", e.target.value)}
                                    value={education.degree || ""}
                                    type="text"
                                    placeholder="Degree Title"
                                    className="px-3 py-2 text-sm rounded-lg border"
                                />

                                <input
                                    onChange={(e) => updateEducation(index, "field", e.target.value)}
                                    value={education.field || ""}
                                    type="text"
                                    placeholder="Field of Study"
                                    className="px-3 py-2 text-sm rounded-lg border"
                                />

                                <input
                                    onChange={(e) => updateEducation(index, "graduation_date", e.target.value)}
                                    value={education.graduation_date || ""}
                                    type="month"
                                    className="px-3 py-2 text-sm rounded-lg border"
                                />

                                <input
                                    onChange={(e) => updateEducation(index, "gpa", e.target.value)}
                                    value={education.gpa || ""}
                                    type="text"
                                    placeholder="GPA / Percentage"
                                    className="px-3 py-2 text-sm rounded-lg border"
                                />
                            </div>

                            {/* Description */}
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <label className="text-sm font-medium text-gray-300">
                                        Education Description
                                    </label>

                                    <button className="flex items-center gap-1 px-2 py-1 text-xs bg-purple-300 text-purple-700 rounded hover:bg-purple-200 transition-colors disabled:opacity-50">
                                        <Sparkles className="w-3 h-3" />
                                        Enhance with AI
                                    </button>
                                </div>

                                <textarea
                                    onChange={(e) => updateEducation(index, "description", e.target.value)}
                                    value={education.description || ""}
                                    rows={4}
                                    className="w-full text-sm px-3 py-3 rounded-lg resize-none border"
                                    placeholder="Achievements, coursework, honors, etc."
                                />
                            </div>

                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default EducationForm
