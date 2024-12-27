'use client'

import { Send } from 'lucide-react'

export default function Contact() {
  return (
    <div className="">
      <div className="bg-gradient-to-r from-blue-700 to-blue-300 w-full h-60">
        <img src="https://readymadeui.com/cardImg.webp" alt="Banner Image" className="w-full h-full object-cover" />
      </div>

      <div className="-mt-28 mb-6 px-4">
        <div className="mx-auto max-w-6xl shadow-lg p-8 relative bg-white rounded-md">
          <h2 className="text-xl text-gray-800 font-bold">Contact Us
          </h2>

          <form className="mt-8 grid sm:grid-cols-2 gap-6">
            <div>
              <label className="text-gray-800 text-sm block mb-2">Your Name</label>
              <input type='text' placeholder='Enter Name'
                className="w-full rounded-md py-2.5 px-4 border border-gray-300 text-sm outline-[#007bff]" />
            </div>
            <div>
              <label className="text-gray-800 text-sm block mb-2">Your Email</label>
              <input type='email' placeholder='Email'
                className="w-full rounded-md py-2.5 px-4 border border-gray-300 text-sm outline-[#007bff]" />
            </div>
            <div>
              <label className="text-gray-800 text-sm block mb-2">Your Number</label>
              <input type='tel' placeholder='Phone No.'
                className="w-full rounded-md py-2.5 px-4 border border-gray-300 text-sm outline-[#007bff]" />
            </div>
            <div>
              <label className="text-gray-800 text-sm block mb-2">Website</label>
              <input type='text' placeholder='Website'
                className="w-full rounded-md py-2.5 px-4 border border-gray-300 text-sm outline-[#007bff]" />
            </div>
            <div>
              <label className="text-gray-800 text-sm block mb-2">Company</label>
              <input type='text' placeholder='Company'
                className="w-full rounded-md py-2.5 px-4 border border-gray-300 text-sm outline-[#007bff]" />
            </div>
            <div>
              <label className="text-gray-800 text-sm block mb-2">Subject</label>
              <input type='text' placeholder='Subject'
                className="w-full rounded-md py-2.5 px-4 border border-gray-300 text-sm outline-[#007bff]" />
            </div>
            <div className="col-span-full">
              <label className="text-gray-800 text-sm block mb-2">Message</label>
              <textarea placeholder='Message' rows={6}
                className="w-full rounded-md px-4 border border-gray-300 text-sm pt-3 outline-[#007bff]"></textarea>
            </div>
          

            <button type='button'
              className="text-white w-max bg-[#007bff] hover:bg-blue-600 tracking-wide rounded-md text-sm px-6 py-3 mt-4 flex items-center">
              <Send className="mr-2" size={16} />
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

