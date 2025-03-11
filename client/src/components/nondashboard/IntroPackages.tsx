import React from 'react';


const IntroPackages = () => {
  return (
    <div className='bg-gray-50 py-10 px-6'>
      <div className='max-w-4xl mx-auto text-center'>
        <h1 className='text-3xl font-bold text-gray-800 mb-6'>Discover Our Package Benefits</h1>
        <p className='text-gray-600 mb-8'>Choose the perfect package that fits your needs and enjoy exclusive advantages designed just for you.</p>
      </div>
      
      <div className='max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6'>
        <div className='bg-white p-6 rounded-lg shadow-md text-center'>
          <h2 className='text-xl font-semibold text-gray-800 mb-2'>Basic Package</h2>
          <p className='text-gray-600'>Affordable and efficient, perfect for beginners.</p>
        </div>
        
        <div className='bg-white p-6 rounded-lg shadow-md text-center'>
          <h2 className='text-xl font-semibold text-gray-800 mb-2'>Premium Package</h2>
          <p className='text-gray-600'>Enhanced features for professionals and power users.</p>
        </div>
        
        <div className='bg-white p-6 rounded-lg shadow-md text-center'>
          <h2 className='text-xl font-semibold text-gray-800 mb-2'>Ultimate Package</h2>
          <p className='text-gray-600'>All-inclusive experience with top-tier features and support.</p>
        </div>
      </div>
      
      <div className='max-w-4xl mx-auto mt-10'>
      </div>
    </div>
  );
};

export default IntroPackages;