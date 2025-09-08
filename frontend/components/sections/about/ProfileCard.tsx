"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { itemVariants } from "./animations";
import { calculateYearDifference } from "@/lib/utils/scroll";
const ProfileCard = () => {
  return (
    <motion.div variants={itemVariants} className="space-y-8">
      {/* 关于我标题 */}
      <motion.div className="text-center" variants={itemVariants}>
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
            你好，我是一名开发者
          </h3>
          <div className="space-y-3 md:space-y-4 text-sm md:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
            <p>
              我的名字叫曹潇，欢迎来到我的个人网站！从大学毕业至今，我已有
              {calculateYearDifference(2020)}
              年前端开发和
              {calculateYearDifference(2023)}
              年产品经验。对页面设计和代码的热爱让我进入前端开发领域，在经历每一个项目的过程中，对产品设计的细节，与用户的反馈交流让我逐渐喜欢上产品经理工作，现在我正向AI领域产品出发！
            </p>
            <p>
              除了技术，对生活的热爱和户外运动的狂热让我保持活力。每天运动健身，阅读和思考让我更加清晰的认识自己...
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProfileCard;
