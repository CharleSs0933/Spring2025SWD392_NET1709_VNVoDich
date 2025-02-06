import Link from "next/link";
import React from "react";
import Eyes from "./eyes";

const Footer = () => {
  return (
    <div className="bg-customgreys-secondarybg bottom-0 w-full py-8  text-center text-sm">
      <p>&copy; 2024 Tutor Platform. All Rights Reserved</p>
      <div className="mt-2">
        {["About", "Privacy Policy", "Licensing", "Contact"].map((item) => (
          <Link
            key={item}
            href={`/${item.toLowerCase().replace(" ", "-")}`}
            className="text-primary-500 mx-2"
            scroll={false}
          >
            {item}
          </Link>
        ))}
      </div>
      <div className="flex justify-center items-center mt-4">
        <Eyes/>
      </div>
    </div>
  );
};

export default Footer;
