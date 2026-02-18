import { Sparkles } from 'lucide-react'
import React from 'react'

const ProfessionalSummaryForm = ({data, onChange, setResumeData}) => {
  return (
    <div className='space-y-4'>
        <div className='flex items-center justify-between'>
        {/* left */}
        <div>
            <h3 className='flex items-cemter gap-2 text-lg font-semibold text-gray-900'> Professional Summary</h3>
            <p className='text-sm text-gray-500'>
                Add summary for your resume
            </p>
        </div>
        {/* right */}
        <button className='flex items-center gap-2 px-3 py-1 text-sm bg-green-100 text-green-700 rounded hover:bg-green-200 transition-colors disables:opacity-50'>

<Sparkles  className='size-4'/>
AI Enhance
        </button>
        </div>
        <div className='mt-6'>
    <textarea  onChange={(e) => onChange(e.target.value)} value={data || ""} rows={7} className='w-full p-3 px-4 mt-2 border text-sm border-gray-300 rounded-lg focus:ring focus:ring-green-500 focus:border-blue-500 outline-none transition-colors resize:none'
    placeholder='write'>
        <p className='text-xs text-gray-500 max-w-4/5 mx-auto text-center'> TEXT</p>
    </textarea>
    
        </div>
    </div>
  )
}

export default ProfessionalSummaryForm