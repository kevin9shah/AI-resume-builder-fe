import { BriefcaseBusiness, Globe, Linkedin, Mail, MapPin, Phone, User } from "lucide-react";
import React from "react";

const PersonalInfoForm = ({ data, onChange, removeBackground, setremoveBackground }) => {

    const handleChange = (field, value) => {
        onChange({ ...data, [field]: value });
    };

    const fields = [
        { key: "full_name", label: "Full Name", icon: User, type: "text", required: true },
        { key: "email", label: "Email Address", icon: Mail, type: "email", required: true },
        { key: "phone", label: "Phone Number", icon: Phone, type: "tel" },
        { key: "location", label: "Location", icon: MapPin, type: "text" },
        { key: "profession", label: "Profession", icon: BriefcaseBusiness, type: "text" },
        { key: "linkedin", label: "LinkedIn", icon: Linkedin, type: "url" },
        { key: "website", label: "Personal Website", icon: Globe, type: "url" }
    ];

    return (
        <div>
            <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
            <p className="text-sm text-gray-600 mb-4">Start with your info</p>

            {/* Image Upload */}
            <div className="flex items-center gap-4 mb-6">
                <label className="cursor-pointer">
                    {data.image ? (
                        <img
                            src={typeof data.image === "string" ? data.image : URL.createObjectURL(data.image)}
                            alt="user"
                            className="w-16 h-16 rounded-full object-cover mt-2 ring ring-slate-300"
                        />
                    ) : (
                        <div className="inline-flex items-center gap-2 mt-2 text-slate-600 hover:text-slate-700">
                            <User className="w-10 h-10 p-2.5 border rounded-full" />
                            Upload image
                        </div>
                    )}
                    <input
                        type="file"
                        accept="image/jpeg, image/png"
                        className="hidden"
                        onChange={(e) => handleChange("image", e.target.files[0])}
                    />
                </label>

                {typeof data.image === "object" && (
                    <div className="flex flex-col gap-1 text-sm">
                        <p>Remove bg</p>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={removeBackground}
                                onChange={() => setremoveBackground(prev => !prev)}
                            />
                            <div className="w-9 h-5 bg-slate-300 rounded-full peer-checked:bg-green-600 transition-colors duration-200"></div>
                            <span className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-4"></span>
                        </label>
                    </div>
                )}
            </div>

            {/* Form Fields */}
            <div className="space-y-4">
                {fields.map((field) => {
                    const Icon = field.icon;
                    return (
                        <div key={field.key} className="flex flex-col">
                            <label className="flex items-center gap-2 text-sm font-medium text-gray-600 mb-1">
                                <Icon className="w-5 h-5 text-gray-400" />
                                {field.label}
                                {field.required && <span className="text-red-500">*</span>}
                            </label>
                            <input
                                type={field.type}
                                required={field.required}
                                value={data[field.key] || ""}
                                onChange={(e) => handleChange(field.key, e.target.value)}
                                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                placeholder={`Enter your ${field.label.toLowerCase()}`}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default PersonalInfoForm;
