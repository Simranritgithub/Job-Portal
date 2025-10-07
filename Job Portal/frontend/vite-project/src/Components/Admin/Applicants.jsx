import React from 'react'
import Navbar from '../shared/Navbar'
import ApplicantsTable from './ApplicantsTable'

const Applicants = () => {
    
  return (
    <div>
      <Navbar/>

      <div className='max-w-6xl mx-auto'>
     <h1 className='font-medium text-xl '> APPLICANTS</h1>
<ApplicantsTable/>
      </div>
       
    </div>
  )
}

export default Applicants