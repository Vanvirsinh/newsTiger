import React, { Component } from 'react';

class Header extends Component {
    render() {
        return (
            <header className="bg-[#444444] px-6 py-4 flex justify-between items-center">
                <a href="/" className="logo cursor-pointer">
                    <img src="../../images/logo-color.png" className='h-[60px]' alt="" />
                </a>
                <nav className="menu">
                    <ul className="flex space-x-8 font-rubik-medium font-thin">
                        <li><a href="/business" className="text-lg text-[#fff] hover:text-[#00d1cd] ease-in duration-300">Business</a></li>
                        <li><a href="/entertainment" className="text-lg text-[#fff] hover:text-[#00d1cd] ease-in duration-300">Entertainment</a></li>
                        <li><a href="/general" className="text-lg text-[#fff] hover:text-[#00d1cd] ease-in duration-300">General</a></li>
                        <li><a href="/health" className="text-lg text-[#fff] hover:text-[#00d1cd] ease-in duration-300">Health</a></li>
                        <li><a href="/science" className="text-lg text-[#fff] hover:text-[#00d1cd] ease-in duration-300">Science</a></li>
                        <li><a href="/sports" className="text-lg text-[#fff] hover:text-[#00d1cd] ease-in duration-300">Sports</a></li>
                        <li><a href="/technology" className="text-lg text-[#fff] hover:text-[#00d1cd] ease-in duration-300">Technology</a></li>
                    </ul>
                </nav>
            </header>
        );
    }
}

export default Header;
