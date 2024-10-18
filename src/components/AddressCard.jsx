import React, { useContext,useState } from 'react'
import AddCircleIcon from '@mui/icons-material/AddCircle';

const AddressCard = ({address}) => {

  return (
    <div>
        {
            address ? <div className='border'></div> :
            
                <div className='border flex flex-col items-center h-52 w-72 justify-center'>
                    <div>
                    <AddCircleIcon/>
                   </div>
                   <div>
                    Add new address
                   </div>
                </div>
        }
        
    </div>
  )
}

export default AddressCard