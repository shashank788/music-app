import React, {useState, useEffect} from 'react'
import './LeftSide.css';

const LeftSide = ({ onFilterChange }) => {
    const [checkedValues, setCheckedValues] = useState({
        men: false,
        jewelery: false,
        electronics: false,
        women: false,
      });
    
      
      const handleCheckboxChange = (event) => {
        const { value, checked } = event.target;
        setCheckedValues((prevState) => ({ ...prevState, [value]: checked }));
        onFilterChange({ ...checkedValues, [value]: checked }); // Call onFilterChange directly here
      };


    return (
        <div className="LeftSize_main">
            <div className="leftSide_header">
                Brand
            </div>
            <div className="leftSide_brandname">
                <label className="brandname">
                    <input type="checkbox" value="men" checked={checkedValues.men}
            onChange={handleCheckboxChange}/>Men's
                </label>
                <label className="brandname">
                    <input type="checkbox" value="jewelery" checked={checkedValues.jewelery}
            onChange={handleCheckboxChange}/>Jewelery
                </label>
                <label className="brandname">
                    <input type="checkbox" value="electronics" checked={checkedValues.electronics}
            onChange={handleCheckboxChange}/>Electronics
                </label>
                <label className="brandname">
                    <input type="checkbox" value="women" checked={checkedValues.women}
            onChange={handleCheckboxChange}/>Women's
                </label>
            </div>
        </div>
    )
}

export default LeftSide;