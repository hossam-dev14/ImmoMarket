import React from "react";

export default function Map() {
  return (
    <div className="w-full h-full">
        <iframe
          title="Google Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387191.0362016315!2d-74.30934755060792!3d40.697539940608515!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sbd!4v1698771625172!5m2!1sen!2sbd"
          className='rounded-md shadow-md w-full h-full'
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>

        {/* <iframe width="100%" height="100%"  
          src={`https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d311.56461936388797!2d12.374193!3d51.338404!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sfr!2sus!4v1714059113521!5m2!1sfr!2sus`} 
          className='rounded-md shadow-md'
          title="Google Map"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe> */}
    </div>
  );
};

