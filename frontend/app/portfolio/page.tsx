import { Button } from '@/components/ui/button'
import { ExternalLink, Github } from 'lucide-react'

export default function PortfolioPage() {
  const projects = [
    {
      id: 1,
      title: '项目一',
      description: '这是一个示例项目的描述，展示了主要功能和技术栈。',
      image: '/placeholder-project.jpg',
      technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
      githubUrl: '#',
      liveUrl: '#'
    },
    {
      id: 2,
      title: '项目二',
      description: '另一个示例项目，展示了不同的技术实现和设计理念。',
      image: '/placeholder-project.jpg',
      technologies: ['Vue.js', 'Node.js', 'MongoDB', 'Express'],
      githubUrl: '#',
      liveUrl: '#'
    },
    {
      id: 3,
      title: '项目三',
      description: '第三个示例项目，专注于移动端体验和性能优化。',
      image: '/placeholder-project.jpg',
      technologies: ['React Native', 'Firebase', 'Redux', 'Styled Components'],
      githubUrl: '#',
      liveUrl: '#'
    }
  ]

  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">我的作品</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            这里展示了我的一些技术项目，涵盖了前端、后端和移动端开发
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div key={project.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              {/* Project Image */}
              <div className="h-48 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500">项目截图</span>
              </div>
              
              {/* Project Content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-gray-600 mb-4">{project.description}</p>
                
                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                      {tech}
                    </span>
                  ))}
                </div>
                
                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" asChild>
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4 mr-2" />
                      代码
                    </a>
                  </Button>
                  <Button size="sm" asChild>
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      预览
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}