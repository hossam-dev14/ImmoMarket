import React from 'react'

export default function ThreeDTour() {
  return (
    <div className="w-full h-full">
      <iframe width="100%" height="100%"  
      src="https://my.matterport.com/show/?m=zEWsxhZpGba&amp;play=1&amp;qs=1" allowfullscreen="allowfullscreen"
      className='rounded-md shadow-md'
      title="3D Tour"
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  )
}
