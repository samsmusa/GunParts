import React from "react";

const About = () => {
  return (
    <div>
      <div>
        <h3 className="mt-6 font-cursive text-6xl">Our Head-office</h3>
        <div className="hero min-h-screen bg-gray-800">
          <div className="hero-content flex-col lg:flex-row-reverse">
            <img
              src="https://bloximages.chicago2.vip.townnews.com/idahopress.com/content/tncms/assets/v3/editorial/f/59/f590bfc5-694c-560b-9f92-d6b6593f4fbf/5acd4f6775f25.image.jpg?crop=1560%2C1170%2C105%2C0&resize=1560%2C1170&order=crop%2Cresize"
              className="max-w-sm rounded-lg shadow-2xl"
            />
            <div>
              <p className="font-cursive ">
                PistolBD is an online and retail dealer and distribution center
                based in Lincoln, Nebraska. We specialize in providing quality
                firearms and accessories to registered buyers. As a Class 3 NFA
                Dealer, we aim to provide our customers with the best tools for
                shooting sports, hunting, or whatever your firearm needs may be.
                We also have a hundred yard outdoor range, a laser
                engraver/custom designer, and offer knife-sharpening services at
                an unbeatable fee of only $10 for a standard pocket knife blade!
                The DEGuns retail store is 110,000 square feet location standing
                on 34 acres of land! We have over 1,000 guns on display and over
                10,000 in stock! This spacious location gives us the opportunity
                to offer our customers thousands of new products , training
                classes, chp classes, and the helpful knowledge to further their
                firearm experience.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
