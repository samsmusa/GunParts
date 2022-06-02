import React from "react";

const Portfolio = () => {
  return (
    <div className="bg-slate-800 font-code">
      <div class="hero bg-base-200">
        <div class="hero-content text-center">
          <div class="max-w-md">
            <h1 class="text-5xl font-bold">Muhammad Samsudding</h1>
            <p class="py-6">
              A self-driven attitude, willingness to learn and a strong presence
              of mind. Optimistic, confident and benevolent. Energetic, devoted,
              sincere and hardworking
            </p>
          </div>
        </div>
      </div>
      <div className="container mb-5">
        <div className="flex justify-around">
          <div className="">
            <p className="mb-4 text-2xl">My skills</p>
            <table>
              <tr className="text-left">
                <td className="pr-4 text-left">HTML</td>
                <td>
                  <progress
                    class="progress progress-success w-56"
                    value="80"
                    max="100"
                  ></progress>
                </td>
              </tr>
              <tr>
                <td className="pr-4 text-left">css</td>
                <td>
                  <progress
                    class="progress progress-success w-56"
                    value="70"
                    max="100"
                  ></progress>
                </td>
              </tr>
              <tr>
                <td className="pr-4 text-left">JavaScript</td>
                <td>
                  <progress
                    class="progress progress-success w-56"
                    value="70"
                    max="100"
                  ></progress>
                </td>
              </tr>
              <tr>
                <td className="pr-4 text-left">Python</td>
                <td>
                  <progress
                    class="progress progress-success w-56"
                    value="80"
                    max="100"
                  ></progress>
                </td>
              </tr>
              <tr>
                <td className="pr-4 text-left">Django</td>
                <td>
                  <progress
                    class="progress progress-success w-56"
                    value="70"
                    max="100"
                  ></progress>
                </td>
              </tr>
              <tr>
                <td className="pr-4 text-left">SQL</td>
                <td>
                  <progress
                    class="progress progress-success w-56"
                    value="80"
                    max="100"
                  ></progress>
                </td>
              </tr>
              <tr>
                <td className="pr-4 text-left">Matlab</td>
                <td>
                  <progress
                    class="progress progress-success w-56"
                    value="70"
                    max="100"
                  ></progress>
                </td>
              </tr>
            </table>
          </div>
          <div className="">
            <p className="mb-4 text-2xl">My Projects</p>
            <table>
              <tr className="text-left">
                <td className="pr-4 text-left">
                  <a href="https://scholaruni.com">ScholarUni</a>
                </td>
                <td className="text-left">
                  HTML | CSS | JavaScript | Python | MySQL
                </td>
              </tr>
              <tr>
                <td className="pr-4 text-left">
                  <a href="https://natural-food-inventory.web.app/">
                    Natural Food WareHOuse
                  </a>
                </td>
                <td className="text-left">
                  HTML | CSS | Boostrap | Reactjs | Nodejs | Mongodb
                </td>
              </tr>
              <tr>
                <td className="pr-4 text-left">
                  <a href="https://superlative-kitsune-a1714d.netlify.app/">
                    Kajkarbari
                  </a>
                </td>
                <td className="text-left">HTML | CSS | JavaScript</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
