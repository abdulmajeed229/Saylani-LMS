import Link from 'next/link';
import { FaBars, FaTimes } from 'react-icons/fa';

export default function AdminHeader() {
    return (
        <>
            <header className='flex shadow-md py-4 px-4 sm:px-10 bg-white  min-h-[70px] tracking-wide relative z-50'>
                <div className='flex flex-wrap items-center justify-between gap-5 w-full'>

                <Link href={'/admin'}>

                    <span className="max-sm:hidden">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhsPQu_y3T4_JYhmZRTaN30zuSY6VjEfBmdlhM12VPE0gOTpEK-fZAEtebSLAN5W_WMA&usqp=CAU" alt="logo" className='w-[100px]' />
                    </span>
                </Link>    
                    

                    <div id="collapseMenu"
                        className='max-lg:hidden lg:!block max-lg:before:fixed max-lg:before:bg-black max-lg:before:opacity-50 max-lg:before:inset-0 max-lg:before:z-50'>
                        <button id="toggleClose" className='lg:hidden fixed top-2 right-4 z-[100] rounded-full bg-white w-9 h-9 flex items-center justify-center border'>
                            <FaTimes className="text-black w-4 h-4" />
                        </button>

                        <ul className='lg:flex gap-x-5 max-lg:space-y-3 max-lg:fixed max-lg:bg-white max-lg:w-1/2 max-lg:min-w-[300px] max-lg:top-0 max-lg:left-0 max-lg:p-6 max-lg:h-full max-lg:shadow-md max-lg:overflow-auto z-50'>

<Link href={'/admin'}>
                            <li className='mb-6 hidden max-lg:block'>
                                <span>
                                    <img src="https://th.bing.com/th/id/R.70e7819213be93d9e67780e7c7e27253?rik=jXP7KBLocIFabQ&riu=http%3a%2f%2fquiz.saylaniwelfare.com%2fimages%2fsmit.png&ehk=gliNnnEUw7KEsJ32NMyA18tFgmuvc2iS92xUy10L3gY%3d&risl=&pid=ImgRaw&r=0" alt="logo" className='w-[20px] h-[30px]' />
                                </span>
                            </li>
</Link>

                            <Link href={'/admin/students'}>
                            <li className='max-lg:border-b border-gray-300 max-lg:py-3 px-3'>
                                <span  className='hover:text-[#007bff] text-[#007bff] block font-semibold text-[15px]'>Students</span>
                            </li>
                            </Link>

                            <Link href={'/admin/add-course'}>
                            <li className='max-lg:border-b border-gray-300 max-lg:py-3 px-3'>
                                <span className='hover:text-[#007bff] text-gray-500 block font-semibold text-[15px]'>Add Courses</span>
                            </li>
                            </Link>
                           <Link href={'/admin/add-quiz'}>
                            <li className='max-lg:border-b border-gray-300 max-lg:py-3 px-3'>
                                <span  className='hover:text-[#007bff] text-gray-500 block font-semibold text-[15px]'>Add Quizes</span>
                            </li>
                           </Link>

                           <Link href={'/admin/enrolled'}>
                            <li className='max-lg:border-b border-gray-300 max-lg:py-3 px-3'>
                                <span className='hover:text-[#007bff] text-gray-500 block font-semibold text-[15px]'>Enrolled</span>
                            </li>
                            </Link>
                           
                        </ul>
                    </div>

                    <div className='flex max-lg:ml-auto space-x-4'>
                       
                        {/* <button className='px-4 py-2 text-sm rounded-full font-bold text-white border-2 border-[#007bff] bg-[#007bff] transition-all ease-in-out duration-300 hover:bg-transparent hover:text-[#007bff]'>Sign up</button> */}

                       
                    </div>
                </div>
            </header>
        </>
    );
}
