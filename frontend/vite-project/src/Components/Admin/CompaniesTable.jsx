
import React from 'react'
import { TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow,Table} from '../ui/Table';

const CompaniesTable = () => {
  return (
    <div>
      <Table>
        <TableCaption>A list of your recent registered Companies</TableCaption>
        <TableHeader>
          
            <TableRow>
              <TableHead>LOGO</TableHead>
              <TableHead>NAME</TableHead>
              <TableHead>DATE</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          
        </TableHeader>
        
          <TableBody>
            <TableRow>
              <TableCell>logo</TableCell>
              <TableCell>Simran PVT LTD</TableCell>
              <TableCell>2025-06-24</TableCell>
          <TableCell>
            <button className="text-blue-600 hover:underline">Apply</button>
          </TableCell>
            </TableRow>
          </TableBody>
          
       
      </Table>
    </div>
  )
}
export default CompaniesTable;
