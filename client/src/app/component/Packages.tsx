import { Package } from "@/types";
import React from "react";



interface PackagesProps {
  packages: Package[];
  orderButton: (plan_id: number , billing_cycle : string) => void;
}

const Packages: React.FC<PackagesProps> = ({ packages, orderButton }) => {
  return (
    <div className="flex flex-col items-center py-10 bg-gray-50 relative">
      <h2 className="text-5xl font-extrabold mb-8 text-gray-900">Choose Your Package</h2>
      <p className="text-gray-600 text-lg mb-12">Find the plan that suits your needs</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
        {packages.map((pkg) => (
          <div
            key={pkg.ID}
            className="bg-white shadow-md hover:shadow-xl transition-all rounded-xl p-8 flex flex-col justify-between items-center transform hover:scale-105 duration-300"
          >
            <h3 className="text-2xl font-bold text-gray-900">{pkg.name}</h3>
            <p className="text-gray-500 text-lg mt-2 font-medium">{pkg.description}</p>

            <div className="mt-4 text-gray-900 font-semibold text-lg">
              <p>💰 Monthly: ${pkg.price_monthly}</p>
              <p>💳 Annually: ${pkg.price_annually}</p>
            </div>

            <ul className="mt-6 space-y-3 text-gray-700 w-full max-h-[100px] overflow-auto">
              {pkg.features.map((feature, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <span className="text-blue-600">✔</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => orderButton(pkg.ID , "monthly")}
              className="mt-8 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-blue-800 transition-all duration-300"
            >
              Select Plan
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Packages;
