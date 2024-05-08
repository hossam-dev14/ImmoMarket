import React, { useEffect } from 'react'
import PropTypes from 'prop-types'; // Import PropTypes
import { Link, useNavigate } from "react-router-dom";
import { SlNote, SlTrash } from "react-icons/sl";
import { useSelector } from 'react-redux';
import axios from 'axios';

const TableData = ({ propsTable, onDelete }) => {
  const {userInfo} = useSelector((state) => state.auth);
  // const navigate = useNavigate();

  return ( 
    <tr className="border-b-2 border-gray-200" key={propsTable.id}>
      <td className=" px-4 py-3 border-x-2">{propsTable.title}</td>
      <td className=" px-4 py-3 border-r-2">{propsTable.createdAt.slice(0, 10)}</td>
      <td className=" px-4 py-3 border-r-2">For {propsTable.category}</td>
      <td className=" px-4 py-3 border-r-2">{propsTable.listingType}</td>
      <td className=" px-4 py-3 border-r-2 text-gray-700">{propsTable.price}</td>
      <td className=" px-4 py-3 border-r-2 flex justify-evenly items-center h-16 w-36 text-lg text-center">
        <Link to={`/edit-property/${propsTable.id}`} className="text-green-500 flex justify-center items-center h-10 w-10 text-xl font-bold  
        bg-gray-100 rounded-md shadow-md hover:bg-gray-300"><SlNote /></Link>
        <Link onClick={() => onDelete(propsTable.id)} className="text-red-500 flex justify-center items-center h-10 w-10 text-xl font-bold  
        bg-gray-100 rounded-md shadow-md
        hover:bg-gray-300"><SlTrash /></Link>
      </td>
    </tr>
  )
}
// onClick={() => navigate(`../properties/${propsCard.id}`)}

// Define propsTable for your component
TableData.propTypes = {
  propsTable: PropTypes.shape({
    id: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    listingType: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};


export default TableData;