import React from 'react';
import "./Footer.css";
import { Link } from 'react-router-dom';

const Footer = () => {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };
    return (
        <div className='footer_body'>
            <div className='footer_top'>
                <h3 onClick={scrollToTop}>Back to top</h3>
            </div>
            <div className='footer_middle'>
                <div className='footer_middle_1'>
                    <div className='footer_part'>
                        <h2>Get to Know Us</h2>
                        <ul>
                            <li className='list'>About Us</li>
                            <li className='list'>Careers</li>
                            <li className='list'>Press Releases</li>
                            <li className='list'>Amazon Science</li>
                        </ul>
                    </div>
                    <div className='footer_part'>
                        <h2>Connect with Us</h2>
                        <ul>
                            <li className='list'>Facebook</li>
                            <li className='list'>Instagram</li>
                            <li className='list'>Twitter</li>
                        </ul>
                    </div>
                    <div className='footer_part footer_part_mobile'>
                        <h2>Make Money with Us</h2>
                        <ul>
                            <li className='list'>Sell on Amazon</li>
                            <li className='list'>Sell under Amazon Accelerator</li>
                            <li className='list'>Protect and Build Your Brand</li>
                            <li className='list'>Amazon Global Selling</li>
                            <li className='list'>Become an Affiliate</li>
                            <li className='list'>Fulfilment by Amazon</li>
                            <li className='list'>Advertise Your Products</li>
                            <li className='list'>Amazon Pay on Merchants</li>
                        </ul>
                    </div>
                    <div className='footer_part'>
                        <h2>Let Us Help You</h2>
                        <ul>
                            <li className='list'>COVID-19 and Amazon</li>
                            <li className='list'>Your Account</li>
                            <li className='list'>Returns Centre</li>
                            <li className='list'>100% Purchase Protection</li>
                            <li className='list'>Amazon App Download</li>
                            <li className='list'>Help</li>
                        </ul>
                    </div>
                </div>
                <div className='footer_middle_2'>
                    <Link to="/">
                        <div className='footer_logo' onClick={scrollToTop}></div>
                    </Link>
                    <div className='footer_drop'>
                        <img className='footer_world_logo' src='https://static.vecteezy.com/system/resources/previews/000/357/012/original/vector-globe-icon.jpg' width={"20px"} />
                        <span>
                            <select className='footer_select'>
                                <option>English</option>
                                <option>Hindi</option>
                                <option>Telugu</option>
                                <option>Marathi</option>
                            </select>
                        </span>
                    </div>
                </div>
                <div className='footer_middle_3'>
                    <ul>
                        <li>Australia</li>
                        <li>Brazil</li>
                        <li>Canada</li>
                        <li>China</li>
                        <li>France</li>
                        <li>Germany</li>
                        <li>Italy</li>
                        <li>Japan</li>
                        <li>Mexico</li>
                        <li>Netherlands</li>
                        <li className='footer_middle_3_mob'>Poland</li>
                        <li className='footer_middle_3_mob'>Singapore</li>
                        <li className='footer_middle_3_mob'>Spain</li>
                        <li className='footer_middle_3_mob'>Turkey</li>
                        <li className='footer_middle_3_mob'>United Arab Emirates</li>
                        <li className='footer_middle_3_mob'>United Kingdom</li>
                        <li className='footer_middle_3_mob'>United States</li>
                    </ul>
                </div>
            </div>
            <div className='footer_bottom'>
                <div className='footer_bottom_body'>
                    <div className='footer_list'>
                        <ul>
                            <li className='color_main'>AbeBooks</li>
                            <li className='color_body'>Books, art</li>
                            <li className='color_body'>& collectibles</li>
                        </ul>
                        <ul>
                            <li className='color_main'>Amazon Web Services</li>
                            <li className='color_body'>Scalable Cloud</li>
                            <li className='color_body'>Computing Services</li>
                        </ul>
                        <ul>
                            <li className='color_main'>Audible</li>
                            <li className='color_body'>Download</li>
                            <li className='color_body'>Audio Books</li>
                        </ul>
                        <ul>
                            <li className='color_main'>DPReview</li>
                            <li className='color_body'>Digital</li>
                            <li className='color_body'>Photography</li>
                        </ul>
                        <ul>
                            <li className='color_main'>IMDB</li>
                            <li className='color_body'>Movies, Tv</li>
                            <li className='color_body'>& Celebrities</li>
                        </ul>
                        <ul>
                            <li className='color_main'>Shopbop</li>
                            <li className='color_body'>Designer</li>
                            <li className='color_body'>Fashion Brands</li>
                        </ul>
                        <ul>
                            <li className='color_main'>Amazon Business</li>
                            <li className='color_body'>Everthing for</li>
                            <li className='color_body'>Your Busuness</li>
                        </ul>
                        <ul>
                            <li className='color_main'>Prime Now</li>
                            <li className='color_body'>2-Hour Delivery</li>
                            <li className='color_body'>on Everyday Items</li>
                        </ul>
                        <ul>
                            <li className='color_main'>Amazon Prime Music</li>
                            <li className='color_body'>100 million songs, ad-free</li>
                            <li className='color_body'>Over 15 million podcast episodes</li>
                        </ul>
                    </div>
                    <div className='footer_list2'>
                        <ul>
                            <li>Conditions of Use & Sale</li>
                            <li>Privacy Notice</li>
                            <li>Interest-Based Ads</li>
                        </ul>
                        <span>© 1996-2023, Amazon.com, Inc. or its affiliates</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer;