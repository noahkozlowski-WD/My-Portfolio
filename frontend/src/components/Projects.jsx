import React, { useEffect, useRef, useState } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { portfolioData } from '../mock';

const Projects = () => {
  const { projects } = portfolioData;
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div
          className={`transition-all duration-1000 transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
                Featured Projects
              </span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              A showcase of my recent work and personal projects
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <Card
                key={project.id}
                className={`border-0 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group ${
                  isVisible ? 'opacity-100' : 'opacity-0'
                }`}
                style={{
                  transitionDelay: isVisible ? `${index * 100}ms` : '0ms'
                }}
              >
                <div className="relative overflow-hidden h-48">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-gray-900">
                    {project.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    {project.description}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, techIndex) => (
                        <Badge
                          key={techIndex}
                          variant="secondary"
                          className="bg-purple-100 text-purple-700 hover:bg-purple-200"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        className="flex-1 bg-purple-600 hover:bg-purple-700 text-white"
                        onClick={() => console.log('View project:', project.title)}
                      >
                        <ExternalLink size={16} className="mr-2" />
                        View Project
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-purple-600 text-purple-600 hover:bg-purple-50"
                        onClick={() => console.log('View code:', project.title)}
                      >
                        <Github size={16} />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
