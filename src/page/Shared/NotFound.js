import React from 'react';

const NotFound = () => {
  return (
    <div className="">
      <div
        class="hero min-h-screen"
        style={{backgroundImage: "url(https://api.lorem.space/image/fashion?w=1000&h=800)"}}
      >
        <div class="hero-overlay bg-opacity-60"></div>
        <div class="hero-content text-center text-neutral-content">
          <div class="max-w-md">
            <h1 class="mb-5 text-7xl font-bold">404</h1>
            <p class="mb-5">Not FOund</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;