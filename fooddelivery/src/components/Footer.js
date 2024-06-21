import { faYoutube, faTwitter, faFacebook } from '@fortawesome/free-brands-svg-icons'
import { faMailBulk } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'


export const Footer = () => {
    return (
        <>
            <div className="footer">
                <div className='sub-footer'>

                    <div className='left'>
                        <div className='img'>
                            <img src='/logo.png' alt='logo' />
                        </div>
                    </div>
                    <div className='center'>
                        <h1> Site Map</h1>
                        <div className='terms'>Business</div>
                        <div className='terms'>Products</div>
                        <div className='terms'>Gallary</div>
                        <div className='terms'>Contact</div>
                        <div className='terms'>Support</div>
                    </div>

                    <div className='right'>
                        <input type='text' className='form-control' name='email' id='email' placeholder='Email' />
                        <button className='subscribe '>SUBSCRIBE</button>
                    </div>

                </div>
                <div className='social-media'>
                    <FontAwesomeIcon icon={faFacebook} className='f-icon' size='1x' />&nbsp;&nbsp;
                    <FontAwesomeIcon icon={faTwitter} className='f-icon' size='1x' />&nbsp;&nbsp;
                    <FontAwesomeIcon icon={faMailBulk} className='f-icon' size='1x' />&nbsp;&nbsp;
                    <FontAwesomeIcon icon={faYoutube} className='f-icon' size='1x' />
                </div>
                <hr className='text-white' />
                <p className='text-white d-flex justify-content-center'>CopyRight &copy; 2024</p>
            </div >

        </>
    )
}
