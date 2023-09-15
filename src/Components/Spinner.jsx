import React, { Component } from 'react';

class Spinner extends Component {
    render() {
        return (
            <div className='fixed top-0 left-0 h-full w-full flex justify-center items-center bg-[#f1f2f3] z-50'>
                <img className='h-28 w-28' src="images/loading.svg" alt="Loading..." />
            </div>
        );
    }
}

export default Spinner;
