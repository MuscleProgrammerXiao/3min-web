'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { itemVariants } from './animations'



const ProfileCard = () => {
  return (
    <motion.div variants={itemVariants} className="space-y-8">
      {/* 关于我标题 */}
      <motion.div 
        className="text-center"
        variants={itemVariants}
      >
        <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
          关于我
        </h2>
        <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
      </motion.div>

      {/* 个人信息卡片 */}
      <motion.div 
        variants={itemVariants} 
        className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center"
      >
        {/* 头像部分 */}
        <div className="flex justify-center lg:justify-center">
          <motion.div 
            className="relative w-48 h-48 md:w-64 md:h-64"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full p-1">
              <div className="w-full h-full bg-white dark:bg-gray-800 rounded-full overflow-hidden">
                <Image
                  src="/images/avctor.jpg"
                  alt="个人头像"
                  width={256}
                  height={256}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
            </div>
            <motion.div
              className="absolute -top-2 -right-2 md:-top-4 md:-right-4 w-4 h-4 md:w-6 md:h-6 bg-green-400 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute -bottom-2 -left-2 md:-bottom-4 md:-left-4 w-4 h-4 md:w-6 md:h-6 bg-pink-400 rounded-full"
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </div>
        
        {/* 介绍文字部分 */}
        <div className="space-y-4 md:space-y-6 text-center lg:text-left">
          <h3 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-white">
            你好，我是一名全栈开发者
          </h3>
          <div className="space-y-3 md:space-y-4 text-sm md:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
            <p>
              我热衷于创造优雅的数字体验，专注于前端技术和用户体验设计。
              从概念到实现，我享受将创意转化为现实的每一个过程。
            </p>
            <p>
              除了技术，我也是一个生活的探索者。摄影让我捕捉美好瞬间，
              户外运动让我保持活力，阅读让我不断成长。
            </p>
            <p>
              我相信技术应该服务于人，让生活变得更好。
              如果你也有这样的想法，我们一定会有很多共同话题！
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default ProfileCard