import React from 'react';
import NavBar from '../../components/navBar/navBar';
import Footer from '../footer/footer';


const Wrapper = (props) => {
    return(
    <div className='d-flex  h-100 w-100  flex-column align-items-center'>
        <NavBar />
        {props.children}
       <Footer/>
    </div>
    )
}
export default Wrapper