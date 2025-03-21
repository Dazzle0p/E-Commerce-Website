import React from 'react'
import { HiArrowPathRoundedSquare, HiOutlineCreditCard, HiShoppingBag } from 'react-icons/hi2'

const FeaturesSection = () => {
  return (
    <section className='py-16 px-4 bg-white'>
        <div className="container max-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {/* Features 1 */}
            <div className="flex flex-col items-center">
                <div className="p-4 rounded-full mb-4">
                    <HiShoppingBag className='text-xl '/>
                </div>
                <h4 className="tracking-tighter mb-2">FREE INTERNATIONAL SHOPPING</h4>
                <p className="text-gray-600 text-sm tracking-tighter">
                  On order above 100$
                </p>
            </div>
            {/* Features 2 */}
            <div className="flex flex-col items-center">
                <div className="p-4 rounded-full mb-4">
                    <HiArrowPathRoundedSquare className='text-xl '/>
                </div>
                <h4 className="tracking-tighter mb-2">45 Days return</h4>
                <p className="text-gray-600 text-sm tracking-tighter">
                  Money back gurantee
                </p>
            </div>
            {/* Features 3 */}
            <div className="flex flex-col items-center">
                <div className="p-4 rounded-full mb-4">
                    <HiOutlineCreditCard className='text-xl '/>
                </div>
                <h4 className="tracking-tighter mb-2">SECURE CHECKOUT</h4>
                <p className="text-gray-600 text-sm tracking-tighter">
                  100% Secure Checkout process
                </p>
            </div>
        </div>
    </section>
  )
}

export default FeaturesSection
