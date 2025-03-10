import React from 'react'
import { motion } from "framer-motion"

const ProgressBar = () => {
    return (
        <div className='w-full bg-gray-200 rounded-full h-3 mt-5 mb-5 relative overflow-hidden'>
            <motion.div
                className="absolute top-0 left-0 right-0 bottom-0 bg-blue-400 opacity-50"
                animate={{
                    x: ["0%", "100%", "0%"],
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear",
                }}
            >


            </motion.div>

        </div>
    )
}

export default ProgressBar