import React from 'react'
import{Table,TableHeader,TableHead,TableRow,TableCell,TableBody} from "./ui/table"
import {Badge} from "./ui/badge"

const ApplicationTable = () => {
  return (
    <div className='bg-black'>
      <Table className="text-white">
        <TableHeader>
          <TableRow >
            <TableHead>Date</TableHead>
            <TableHead>Job Role</TableHead>
            <TableHead>Company</TableHead>
            <TableHead className="text-right">Status</TableHead>
          
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            [1,2,3,4].map((item,index)=>(
              <TableRow key={index}>
                <TableCell>17-07-2024</TableCell>
                <TableCell>Frontend Developer</TableCell>
                <TableCell>Google</TableCell>
                <TableCell className="text-right my-4"><Badge>Selected</Badge></TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </div>
  )
}

export default ApplicationTable