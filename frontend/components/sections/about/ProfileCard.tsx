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
        <div className="space-y-4 md:space-y-6 lg:text-left">
          <h3 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-white text-center ">
            欢迎访问我的个人网站
          </h3>
          <div className="text-sm md:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
            <p className="indent-8">
              3min°是我独立设计并搭建的个人网站。在这里我会记录我的成长经历，工作技能和思考感悟。我的目的是通过一个媒介能真切坦诚的表达自己，也方便你能够快速了解我。
            </p>
            <p className="indent-8">
              你好，我是曹潇，1997年出生，2020年大学毕业。我是ENTJ型性格。我喜欢勇敢主动的结识一些不同年龄层的朋友，他们的人生阅历让我受益良多。我尽量保持每天运动和阅读的习惯，因为热爱，会经常参与一些户外活动。对于新鲜和有挑战性的事物总是充满好奇，不过有时候做人做事会显得不够成熟。我很感激周围的朋友能够包容我，陪着我成长。目前从事前端开发工作
              {calculateYearDifference(2020)}
              年，正在思考和探索更适合自己的职业发展方向。
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProfileCard;
