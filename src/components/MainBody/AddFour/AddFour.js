import React from 'react';
import "./AddFour.css";

const AddFour = (props) => {
  return (
    <div className="AdvertisementOne_main">
            <div className="AdvertisementOne_header">
                {props.definition.header}
            </div>
            <div className="AdvertisementOne_body">
                <img src={props.definition.definition[0]} className="ad_fourImage" />
                <img src={props.definition.definition[1]} className="ad_fourImage" />
                <img src={props.definition.definition[2]} className="ad_fourImage" />
                <img src={props.definition.definition[3]} className="ad_fourImage" />
             </div>
            <div className="AdvertisementOne_footer">
                See more
            </div>
        </div>
  )
}

export default AddFour;