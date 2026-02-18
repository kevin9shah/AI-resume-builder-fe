import React from 'react'
import ModernTemplate from '../components/templates/ModernTemplate'
import ClassicTemplate from '../components/templates/ClassicTemplate'
import MinimalImageTemplate from '../components/templates/MinimalImageTemplate'
import MinimalTemplate from '../components/templates/MinimalTemplate'

const ResumePreview = ({ data, template, accentColor, classes = "" }) => {

    const renderTemplate = () => {
        switch (template) {
            case "modern":
                return <ModernTemplate data={data} accentColor={accentColor} />;
            case "minimal-image":
                return <MinimalImageTemplate data={data} accentColor={accentColor} />;
            case "minimal":
                return <MinimalTemplate data={data} accentColor={accentColor} />;
            default:
                return <ClassicTemplate data={data} accentColor={accentColor} />;
        }
    }

    return (
        <div className='w-full bg-gray-100'>

            <div
                id='resume-preview'
                className={"border border-gray-200 print:shadow-none print:border-none " + classes}
            >
                {renderTemplate()}
            </div>

            <style jsx>
                {`
                @page {
                    size: letter;
                    margin: 0;
                }

                @media print {
                    body * {
                        visibility: hidden;
                    }

                    #resume-preview, #resume-preview * {
                        visibility: visible;
                    }

                    #resume-preview {
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 8.5in;
                        min-height: 11in;
                        margin: 0;
                        padding: 0;
                        box-shadow: none !important;
                        border: none !important;
                        background: white;
                    }
                }
                `}
            </style>
        </div>
    )
}

export default ResumePreview
