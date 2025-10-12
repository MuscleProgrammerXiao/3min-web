// 刚到深圳出差时驻场银行做前端开发。新环境，新工作，新生活，新的开始。公司楼下经过的豪车让我对深圳这座城市慢慢着迷。虽然依然没有目标，但当我幻想着通过努力，有一天能在自己梦想中的车里甩着方向盘时肯定很爽。从此虚幻的目标好像就有了。可能是没接触过外包，亦或是3个月的出差预期，让我总是以“主人公”的心态做着甲方要求的工作，为此向身边同事请教学习了react，每天公司的晨会也成为了我的“提问时间”。住宿离公司近，所以闲着没事在公司敲代码到深夜是常态。因为住宿的酒店很小，所以很多空余时间都喜欢呆在外面。当时想着出差结束回家的时候惊艳一下身边的朋友，想到了健身。于是健身房和公司成为了我在刚到深圳常待的两个地方。在新环境的我，随着工作技能的提升，身体体重的减少。整个人越发自信起来，和健身教练成为很好的朋友，积极主动的交朋友，慢慢也有了深圳的小圈子。三个月的时间很快就到了，因为项目进度，我自愿留下来延期到5个月。在此期间和工作中甲方的同事也熟悉起来。有一天同事突然问我要不要考虑留在深圳。我仔细想了来深圳几个月的变化，工作上生活中似乎都在发生剧烈的变化。当和朋友提起出差要结束时，朋友们也希望我能留在深圳发展。综合这些建议后决定留在深圳。就这样度过了深圳的第一年，回想2022年，身边朋友让我养成了健身，阅读的习惯，工作同事让我的代码水平得到提高。第二年同事说要把我内推进银行，我毫不犹豫的答应了，于是在23年底的时候，进入甲方这一目标实现了。进入一个新的平台后发现这边的同事都是国内外顶尖大学毕业，这让我第一次意识到有一个好的工作平台和工作氛围是一件多么棒的事。在这个集体中，我似乎重新上了一个大学。只要我大胆主动一些，我的所有疑问都可以从身边同事，上级领导那里得到最专业的回答。这是这份工作给予我的一大福利，也让我由衷的钦佩身边的同事。2023年保持着健身阅读的习惯，年底加入了银行。进入银行后，工作内容也发生了变化，除了小组内的前端开发工作，AI工具的学习，产品的学习也同步进行。在系统上线后，每次线下和分行人员收集使用体验，如何改善系统，如何推广，如何制定高效的方案，如何沟通，如何使用AI工具提升效率。都得到的了成长。在工作之余学会了游泳。时间很快来到了2025年。主要负责的项目已经在全国分行上线，得到了行领导的表扬和行内的奖项。也让我在看到了真正热爱编程的同事们的工作方式后开始慢慢意识到自己在代码能力方便和同事之间的鸿沟。我也开始真正思考自己擅长和热爱的方向：做产品或成为一个“冒险家”

"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  MapPin,
  Briefcase,
  GraduationCap,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { AnimatedSection } from "@/components/common";
import { experiences, ExperienceItem } from "@/lib/constants/experienceData";
// import { useRouter } from "next/navigation";

const getIcon = (type: string) => {
  switch (type) {
    case "work":
      return <Briefcase className="h-4 w-4 sm:h-5 sm:w-5" />;
    case "education":
      return <GraduationCap className="h-4 w-4 sm:h-5 sm:w-5" />;
    case "project":
      return <Calendar className="h-4 w-4 sm:h-5 sm:w-5" />;
    default:
      return <Calendar className="h-4 w-4 sm:h-5 sm:w-5" />;
  }
};

const getTypeColor = (type: string) => {
  switch (type) {
    case "work":
      return "bg-blue-500";
    case "education":
      return "bg-green-500";
    case "project":
      return "bg-purple-500";
    default:
      return "bg-gray-500";
  }
};

const getTypeGradient = (type: string) => {
  switch (type) {
    case "work":
      return "from-blue-500 to-blue-600";
    case "education":
      return "from-green-500 to-green-600";
    case "project":
      return "from-purple-500 to-purple-600";
    default:
      return "from-gray-500 to-gray-600";
  }
};

const TimelineItem = ({
  experience,
  index,
}: {
  experience: ExperienceItem;
  index: number;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative mb-6 sm:mb-12"
    >
      {/* 移动端布局 - 单列 */}
      <div className="block lg:hidden">
        <div className="flex items-start space-x-4">
          {/* 时间轴节点 */}
          <div className="flex flex-col items-center">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 + 0.2 }}
              className={`w-3 h-3 rounded-full ${getTypeColor(experience.type)} border-2 border-white shadow-lg flex-shrink-0 mt-2`}
            />
            {index < experiences.length && (
              <div className="w-0.5 h-16 bg-gradient-to-b from-blue-500 via-green-500 to-purple-500 mt-2" />
            )}
          </div>

          {/* 内容卡片 */}
          <div className="flex-1 min-w-0">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-lg shadow-md p-4 border border-gray-100 hover:shadow-lg transition-shadow duration-300"
            >
              {/* 头部信息 */}
              <div className="flex items-start mb-3">
                <div
                  className={`p-1.5 rounded-full ${getTypeColor(experience.type)} text-white mr-3 flex-shrink-0 mt-0.5`}
                >
                  {getIcon(experience.type)}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800 leading-tight">
                    {experience.title}
                  </h3>
                  <p className="text-sm text-gray-600">{experience.company}</p>
                </div>
              </div>

              {/* 时间和地点 */}
              <div className="flex flex-col sm:flex-row sm:items-center text-xs sm:text-sm text-gray-500 mb-3 space-y-1 sm:space-y-0">
                <div className="flex items-center mr-4">
                  <Calendar className="h-3 w-3 sm:h-4 sm:w-4 mr-1 flex-shrink-0" />
                  <span>{experience.period}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-3 w-3 sm:h-4 sm:w-4 mr-1 flex-shrink-0" />
                  <span>{experience.location}</span>
                </div>
              </div>

              {/* 摘要 */}
              <p className="text-sm text-gray-700 mb-3 leading-relaxed">
                {experience.summary}
              </p>

              {/* 关键亮点 */}
              <div className="flex flex-wrap gap-1.5 mb-3">
                {experience.highlights.map((highlight, idx) => (
                  <motion.span
                    key={highlight}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.05 }}
                    className="px-2 py-1 bg-gradient-to-r from-amber-100 to-orange-100 text-amber-700 rounded-md text-xs border border-amber-200"
                  >
                    {highlight}
                  </motion.span>
                ))}
              </div>

              {/* 展开/收起按钮 */}
              <motion.button
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex items-center gap-1 text-blue-600 text-sm font-medium mb-3 hover:text-blue-700 transition-colors"
                whileTap={{ scale: 0.95 }}
              >
                <span>{isExpanded ? "收起详情" : "展开详情"}</span>
                {isExpanded ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </motion.button>

              {/* 可展开的详细内容 */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="space-y-3 mb-4">
                      {experience.description.paragraphs.map(
                        (paragraph, idx) => (
                          <motion.p
                            key={idx}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="text-sm text-gray-600 leading-relaxed pl-3 border-l-2 border-blue-200"
                          >
                            {paragraph}
                          </motion.p>
                        )
                      )}
                    </div>

                    {/* 关键词标签 */}
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {experience.description.keywords.map((keyword, idx) => (
                        <motion.span
                          key={keyword}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: idx * 0.05 }}
                          className="px-2 py-1 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 rounded-md text-xs border border-purple-200"
                        >
                          #{keyword}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* 技能标签 */}
              {experience.skills && (
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {experience.skills.map((skill, skillIndex) => (
                    <motion.span
                      key={skillIndex}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 + skillIndex * 0.05 }}
                      className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full font-medium"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      {/* PC端优化布局 - 双列 */}
      <div className="hidden lg:block">
        <div
          className={`flex items-center ${isEven ? "flex-row" : "flex-row-reverse"} relative`}
        >
          {/* 内容卡片 */}
          <div className={`w-5/12 ${isEven ? "pr-12" : "pl-12"}`}>
            <motion.div
              whileHover={{
                scale: 1.03,
                y: -8,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
              }}
              className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:border-gray-200 transition-all duration-300 relative overflow-hidden group"
            >
              {/* 背景装饰 */}
              <div
                className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${getTypeGradient(experience.type)} opacity-10 rounded-bl-full transition-all duration-300 group-hover:w-24 group-hover:h-24`}
              />

              {/* 类型标签 */}
              <div
                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium text-white bg-gradient-to-r ${getTypeGradient(experience.type)} mb-4`}
              >
                <span className="mr-1">{getIcon(experience.type)}</span>
                {experience.type === "work"
                  ? "工作经历"
                  : experience.type === "education"
                    ? "教育背景"
                    : "项目经验"}
              </div>

              {/* 标题和公司 */}
              <div className="mb-4">
                <h3 className="text-xl font-bold text-gray-800 mb-2 leading-tight">
                  {experience.title}
                </h3>
                <p className="text-base text-gray-600 font-medium">
                  {experience.company}
                </p>
              </div>

              {/* 时间和地点 */}
              <div className="flex items-center text-sm text-gray-500 mb-4 space-x-4">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span className="font-medium">{experience.period}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>{experience.location}</span>
                </div>
              </div>

              {/* 摘要 */}
              <p className="text-gray-700 mb-4 leading-relaxed text-base">
                {experience.summary}
              </p>

              {/* 关键亮点 */}
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-600 mb-2">
                  关键亮点
                </h4>
                <div className="flex flex-wrap gap-2">
                  {experience.highlights.map((highlight, idx) => (
                    <motion.span
                      key={highlight}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      whileHover={{ scale: 1.05 }}
                      transition={{ delay: idx * 0.05 }}
                      className="px-3 py-1 bg-gradient-to-r from-amber-100 to-orange-100 text-amber-700 rounded-lg text-sm border border-amber-200 hover:shadow-sm transition-all duration-200"
                    >
                      {highlight}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* 展开/收起按钮 */}
              <motion.button
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex items-center gap-2 text-blue-600 text-sm font-medium mb-4 hover:text-blue-700 transition-colors group"
                whileTap={{ scale: 0.95 }}
              >
                <span>{isExpanded ? "收起详情" : "展开详情"}</span>
                <motion.div
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="w-4 h-4" />
                </motion.div>
              </motion.button>

              {/* 可展开的详细内容 */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="space-y-4 mb-4 p-4 bg-gray-50 rounded-lg">
                      {experience.description.paragraphs.map(
                        (paragraph, idx) => (
                          <motion.p
                            key={idx}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="text-gray-700 leading-relaxed text-sm pl-4 border-l-3 border-blue-300"
                          >
                            {paragraph}
                          </motion.p>
                        )
                      )}
                    </div>

                    {/* 关键词标签 */}
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-gray-600 mb-2">
                        关键词
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {experience.description.keywords.map((keyword, idx) => (
                          <motion.span
                            key={keyword}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 0.05 }}
                            className="px-3 py-1 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 rounded-lg text-sm border border-purple-200"
                          >
                            #{keyword}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* 技能标签 */}
              {experience.skills && (
                <div>
                  <h4 className="text-sm font-semibold text-gray-600 mb-3">
                    技能标签
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {experience.skills.map((skill, skillIndex) => (
                      <motion.span
                        key={skillIndex}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        whileHover={{ scale: 1.05 }}
                        transition={{ delay: index * 0.1 + skillIndex * 0.05 }}
                        className={`px-3 py-1.5 bg-gradient-to-r ${getTypeGradient(experience.type)} text-white text-sm rounded-full font-medium shadow-sm hover:shadow-md transition-all duration-200`}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </div>

          {/* 增强的时间轴节点 */}
          <div className="absolute left-1/2 transform -translate-x-1/2 z-20">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: index * 0.1 + 0.2,
                type: "spring",
                stiffness: 200,
              }}
              className="relative"
            >
              {/* 外圈光晕 */}
              <div
                className={`absolute inset-0 w-8 h-8 rounded-full bg-gradient-to-r ${getTypeGradient(experience.type)} opacity-20 animate-pulse`}
              />

              {/* 主节点 */}
              <div
                className={`relative w-6 h-6 rounded-full bg-gradient-to-r ${getTypeGradient(experience.type)} border-4 border-white shadow-lg flex items-center justify-center`}
              >
                <div className="text-white text-xs">
                  {getIcon(experience.type)}
                </div>
              </div>

              {/* 连接线装饰 */}
              <div
                className={`absolute top-1/2 ${isEven ? "right-8" : "left-8"} w-8 h-0.5 bg-gradient-to-r ${getTypeGradient(experience.type)} opacity-30`}
              />
            </motion.div>
          </div>

          {/* 空白区域 */}
          <div className="w-5/12" />
        </div>
      </div>
    </motion.div>
  );
};

export default function ExperienceSection() {
  // const router = useRouter();

  // const handleContactClick = () => {
  //   router.push("/contact");
  // };

  // const itemVariants = {
  //   hidden: { opacity: 0, y: 30 },
  //   visible: {
  //     opacity: 1,
  //     y: 0,
  //     transition: {
  //       duration: 0.6,
  //       ease: "easeOut",
  //     } as const,
  //   },
  // };
  return (
    <section
      className="py-16 lg:py-24 bg-gradient-to-br from-gray-50 via-white to-blue-50/30"
      id="experience"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-16 lg:mb-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-medium mb-6"
            >
              <Briefcase className="h-4 w-4 mr-2" />
              我的成长历程
            </motion.div>

            <motion.h2
              className="text-4xl lg:text-6xl font-bold text-gray-800 mb-6 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              我的经历
            </motion.h2>

            <motion.p
              className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              这是我从校园到工作的一些成长经历。
            </motion.p>
          </div>
        </AnimatedSection>

        {/* 时间轴容器 */}
        <div className="relative">
          {/* 增强的中央时间轴线 */}
          <motion.div
            initial={{ height: 0 }}
            whileInView={{ height: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-blue-500 via-green-500 to-purple-500 rounded-full shadow-sm"
          />

          {/* 时间轴背景装饰 */}
          <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-px h-full bg-gradient-to-b from-transparent via-gray-200 to-transparent opacity-50" />

          {/* 时间轴项目 */}
          <div className="relative z-10">
            {experiences.map((experience, index) => (
              <TimelineItem
                key={experience.id}
                experience={experience}
                index={index}
              />
            ))}
          </div>
        </div>
        {/* 联系方式 */}
        {/* <motion.div variants={itemVariants} className="text-center">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 md:p-8 shadow-lg max-w-2xl mx-auto border border-gray-100 dark:border-slate-700">
            <h3 className="text-xl md:text-2xl font-semibold text-gray-800 dark:text-white mb-3 md:mb-4">
              我们一起创造些什么吧！
            </h3>
            <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 mb-4 md:mb-6">
              如果您有有趣的项目想法，或者想要合作，随时欢迎联系我。
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleContactClick}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 md:px-8 py-2 md:py-3 rounded-full font-medium hover:shadow-lg transition-shadow duration-300 text-sm md:text-base"
            >
              联系我
            </motion.button>
          </div>
        </motion.div> */}
      </div>
    </section>
  );
}
