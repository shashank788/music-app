import React from 'react';
import "./AddOne.css";

const AddOne = (props) => {
  return (
    <div className="AdvertisementOne_main">
            <div className="AdvertisementOne_header">
                {props.definition.header}
            </div>
            <div className="AdvertisementOne_body">
                <img src={props.definition.definition[0]} width="287px" />
            </div>
            <div className="AdvertisementOne_footer">
                See more
            </div>
        </div>
  )
}

export default AddOne;