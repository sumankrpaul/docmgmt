import React from 'react'

export default function SubmitButton(props) {
  return (
    <button {...props} className="flex items-center gap-2 rounded bg-green-600 py-2 px-5 font-medium text-white hover:bg-opacity-80 disabled:bg-opacity-50 disabled:cursor-not-allowed transition-all">
        {props.isSubmitting ?  <div className='w-4 h-4 border animate-spin border-white border-t-[transparent] rounded-full mr-2'></div>:''}
        {props.children}
      </button>
  )
}
