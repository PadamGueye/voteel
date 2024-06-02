import React from "react";
import com from "../assets/community.png"

const Footer = () => {

    return(
        <div className="text-center flex flex-col justify-center items-center mt-10 pb-10 text-white">
            <img src={com} alt="" className="w-52"/>
            <div className="text-sm">wilfred, LHackSRT 2022 © All Rights Reserved</div>
        </div>
    )
}

export default Footer;