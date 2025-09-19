import React from "react";

const Footer = () => {
  return (
    <footer style={{  background: 'linear-gradient(135deg, #dbeafe 0%, #e0e7ff 50%, #f3e8ff 100%)'}} className="text-white text-center py-4">
      <p className="text-sm text-black">
        © {new Date().getFullYear()} All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;
