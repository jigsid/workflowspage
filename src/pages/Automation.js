import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Automation.module.css';
import { Text } from '../components/Text';
import { Button } from '../components/Button';

const automationProjects = [
  {
    id: 1,
    title: 'YouTube Transcript Extraction Workflow',
    tool: 'n8n',
    toolIcon: '/n8nlogo.jpg',
    description: 'Automated workflow that extracts and processes transcripts from YouTube videos, with support for batch processing across entire channels.',
    impact: 'Eliminated manual transcript retrieval and enabled content analysis at scale for multiple YouTube channels',
    image: '/images/automation/yt-transcript.jpg',
    tags: ['YouTube API', 'Data Extraction', 'Content Analysis', 'Transcript Processing'],
    metrics: [
      { label: 'Channels', value: 'Unlimited' },
      { label: 'Videos', value: '50+ per run' },
      { label: 'Format', value: 'Text/JSON' }
    ],
    details: 'I designed and implemented a comprehensive n8n workflow that automates the extraction of transcripts from YouTube videos. The solution includes:\n\n• Channel Processing: Automatically extracts videos from any YouTube channel using the YouTube API\n\n• Batch Processing: Handles multiple videos (50+ per run) with efficient error handling\n\n• Transcript Extraction: Utilizes specialized nodes to pull full video transcripts\n\n• Content Cleaning: Implements HTML entity decoding to ensure clean, readable text\n\n• Multiple Export Formats: Provides both structured JSON for data analysis and readable text formats\n\n• Error Recovery: Includes fallback mechanisms when transcript extraction fails\n\n• Flexible Configuration: Supports custom settings for channel ID and API parameters\n\nThis workflow eliminates hours of manual work and enables content analysis, searchability, and archiving of YouTube content at scale.',
    videoUrl: '/videos/yt-transcript.mp4'
  },
  {
    id: 2,
    title: 'Website Scraping & Analysis Workflow',
    tool: 'n8n',
    toolIcon: '/n8nlogo.jpg',
    description: 'Intelligent workflow that analyzes websites, extracts sitemaps, and catalogues content using AI-powered processing.',
    impact: 'Reduced manual website analysis time by 95% and enabled automated content extraction from hundreds of websites',
    image: '/images/automation/web-scraping.jpg',
    tags: ['Web Scraping', 'AI Processing', 'Content Extraction', 'Google Sheets Integration'],
    metrics: [
      { label: 'Analysis Time', value: '-95%' },
      { label: 'Data Points', value: '1000+' },
      { label: 'Success Rate', value: '98%' }
    ],
    details: 'I built a sophisticated website scraping workflow that intelligently discovers and analyzes website content structures. The workflow features:\n\n• URL Normalization: Standardizes input URLs following best practices (HTTPS, subdomain handling)\n\n• Robots.txt Analysis: Automatically checks for robots.txt files to locate sitemaps and respect crawling rules\n\n• Sitemap Detection: Identifies and extracts sitemaps in multiple formats (XML, HTML, etc.)\n\n• AI-Powered Processing: Uses GPT models to intelligently analyze website structure and content\n\n• Content Extraction: Pulls content from structured pages with proper formatting and metadata\n\n• Format Adaptation: Automatically detects and handles different content structures (XML vs. regular URLs)\n\n• Data Organization: Processes and stores all extracted data in Google Sheets for analysis\n\n• Error Handling: Includes comprehensive error recovery for websites with varying structures\n\nThis system can process websites of any complexity while maintaining high success rates (98%) and dramatically reducing manual analysis time.',
    videoUrl: '/videos/web-scraping.mp4'
  },
  {
    id: 3,
    title: 'Reddit Business Ideas AI Analyzer',
    tool: 'n8n',
    toolIcon: '/n8nlogo.jpg',
    description: 'AI-powered workflow that monitors Reddit for business problems and automatically generates potential solution ideas using GPT models.',
    impact: 'Identified 50+ viable business opportunities by analyzing real-world problems posted on Reddit',
    image: '/images/automation/reddit-biz-ideas.jpg',
    tags: ['Reddit API', 'AI Analysis', 'Business Intelligence', 'GPT Integration'],
    metrics: [
      { label: 'Success Rate', value: '85%' },
      { label: 'Data Sources', value: 'Reddit' },
      { label: 'Processing Time', value: '<2 min' }
    ],
    details: 'I created an intelligent business opportunity discovery system that monitors Reddit for posts describing business problems or requests for solutions. This innovative workflow includes:\n\n• Targeted Subreddit Monitoring: Automatically searches r/smallbusiness and other relevant subreddits for specific keywords\n\n• Content Filtering: Applies multiple filters (upvotes ≥2, post age, content length) to focus on quality posts\n\n• AI-Powered Analysis: Uses an AI agent to determine if a post genuinely describes a business problem\n\n• Business Opportunity Identification: Processes relevant posts to extract business challenges and needs\n\n• Solution Generation: Leverages GPT models to generate viable business ideas and solutions for identified problems\n\n• Multi-Channel Distribution: Automatically sends results to Google Sheets, Slack channels, and email\n\n• Sentiment Analysis: Analyzes emotional content to prioritize urgent business needs\n\n• Comprehensive Data Collection: Captures metadata including subreddit size, post date, and engagement metrics\n\nThis workflow has successfully identified dozens of viable business opportunities by analyzing real market needs posted on Reddit, creating a steady stream of potential business ideas with minimal manual effort.',
    videoUrl: '/videos/reddit-biz-ideas.mp4'
  },
  {
    id: 4,
    title: 'Enterprise n8n Self-Hosting',
    tool: 'n8n',
    toolIcon: '/n8nlogo.jpg',
    description: 'Deployed and maintained a self-hosted n8n instance on Kubernetes with high availability, load balancing, and automated backups.',
    impact: 'Achieved 99.9% uptime with secure access for 50+ team members across departments',
    image: '/images/automation/n8n-selfhosting.jpg',
    tags: ['Kubernetes', 'Docker', 'Self-Hosting', 'High Availability'],
    metrics: [
      { label: 'Uptime', value: '99.9%' },
      { label: 'Users', value: '50+' },
      { label: 'Workflows', value: '200+' }
    ],
    details: 'I architected and implemented a robust self-hosted n8n environment on Kubernetes to ensure high availability and scalability. The setup includes automated database backups, version-controlled deployments, and a secure access layer with SSO integration. This enterprise-grade implementation allows teams across the organization to create and manage their automation workflows while maintaining data sovereignty and security compliance.',
    videoUrl: '/videos/n8n-selfhosting.mp4'
  },
  {
    id: 5,
    title: 'Custom n8n Nodes Development',
    tool: 'n8n',
    toolIcon: '/n8nlogo.jpg',
    description: 'Developed custom n8n nodes for proprietary systems and specialized APIs, extending n8n\'s capabilities for unique business requirements.',
    impact: 'Reduced integration development time by 70% and enabled 15+ new automation scenarios',
    image: '/images/automation/n8n-custom-nodes.jpg',
    tags: ['TypeScript', 'API Integration', 'Custom Nodes', 'Open Source'],
    metrics: [
      { label: 'Dev Time', value: '-70%' },
      { label: 'New Automations', value: '15+' },
      { label: 'Code Reuse', value: '85%' }
    ],
    details: 'I designed and implemented several custom n8n nodes to integrate with proprietary internal systems and specialized third-party APIs. Using TypeScript and following n8n\'s node development best practices, I created reusable components that seamlessly extend n8n\'s capabilities. These custom nodes include advanced authentication handling, complex data transformation, and specialized error management. Some of these nodes have been contributed back to the n8n community as open-source packages.',
    videoUrl: '/videos/n8n-custom-nodes.mp4'
  },
  {
    id: 6,
    title: 'Data Pipeline Orchestration',
    tool: 'n8n',
    toolIcon: '/n8nlogo.jpg',
    description: 'Built complex data pipelines using n8n to extract, transform, and load data between multiple systems with error handling and monitoring.',
    impact: 'Processed over 1M records daily with 99.8% reliability and comprehensive error recovery',
    image: '/images/automation/n8n-data-pipeline.jpg',
    tags: ['ETL', 'Data Integration', 'Error Handling', 'Monitoring'],
    metrics: [
      { label: 'Daily Records', value: '1M+' },
      { label: 'Reliability', value: '99.8%' },
      { label: 'Systems', value: '12+' }
    ],
    details: 'I designed and implemented sophisticated data pipeline workflows in n8n that handle the extraction, transformation, and loading of data between multiple systems. These workflows include comprehensive error handling with automatic retry mechanisms, data validation, and alerting. The pipelines process millions of records daily while maintaining high reliability. I implemented custom monitoring solutions to track performance metrics and detect anomalies in real-time.',
    videoUrl: '/videos/n8n-data-pipeline.mp4'
  },
  {
    id: 7,
    title: 'n8n Workflow Optimization',
    tool: 'n8n',
    toolIcon: '/n8nlogo.jpg',
    description: 'Optimized existing n8n workflows for performance, reliability, and maintainability using advanced n8n features and best practices.',
    impact: 'Reduced execution time by 65% and error rates by 90% across critical workflows',
    image: '/images/automation/n8n-optimization.jpg',
    tags: ['Performance', 'Reliability', 'Best Practices', 'Refactoring'],
    metrics: [
      { label: 'Speed Gain', value: '+65%' },
      { label: 'Error Reduction', value: '90%' },
      { label: 'Workflows', value: '35+' }
    ],
    details: 'I conducted comprehensive audits and optimizations of existing n8n workflows to improve their performance, reliability, and maintainability. By implementing advanced n8n features such as batching, queuing, and parallel processing, I significantly reduced execution times. I refactored workflows to follow best practices, including modularization, error handling, and proper documentation. The optimized workflows are now more resilient, easier to maintain, and execute much faster.',
    videoUrl: '/videos/n8n-optimization.mp4'
  },
  {
    id: 8,
    title: 'Multi-System Integration Hub',
    tool: 'n8n',
    toolIcon: '/n8nlogo.jpg',
    description: 'Created a centralized integration hub using n8n to connect and synchronize data between CRM, ERP, marketing, and support platforms.',
    impact: 'Eliminated data silos and reduced manual data entry by 85% across departments',
    image: '/images/automation/n8n-integration-hub.jpg',
    tags: ['System Integration', 'API Orchestration', 'Data Sync', 'Webhooks'],
    metrics: [
      { label: 'Systems Connected', value: '8+' },
      { label: 'Manual Work', value: '-85%' },
      { label: 'Data Accuracy', value: '+95%' }
    ],
    details: 'I architected and implemented a comprehensive integration hub using n8n that serves as the central nervous system connecting various business applications. This hub manages bidirectional data synchronization between CRM, ERP, marketing automation, support ticketing, and other critical systems. Using a combination of webhooks, scheduled triggers, and API polling, the hub ensures near real-time data consistency across all platforms while handling complex data mapping and transformation requirements.',
    videoUrl: '/videos/n8n-integration-hub.mp4'
  }
];

export default function Automation() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (selectedProject && videoRef.current) {
      // Ensure video src is set correctly
      if (videoRef.current.src !== selectedProject.videoUrl) {
        videoRef.current.src = selectedProject.videoUrl;
      }
      
      videoRef.current.load();
      
      const playTimer = setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.currentTime = 0;
          videoRef.current.play().catch(e => console.log('Video play error:', e));
        }
      }, 100);
      
      return () => clearTimeout(playTimer);
    }
  }, [selectedProject]);

  // Add lazy loading of video assets
  useEffect(() => {
    // Only load workflow videos when on the automation page
    const preloadWorkflowVideos = () => {
      // Create preload links for workflow videos - but with a lower priority
      const videos = automationProjects.slice(0, 3).map(project => project.videoUrl);
      videos.forEach(videoUrl => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = videoUrl;
        link.as = 'video';
        link.setAttribute('fetchpriority', 'low');
        document.head.appendChild(link);
      });
    };

    preloadWorkflowVideos();

    return () => {
      // Clean up preload links when component unmounts
      const preloadLinks = document.querySelectorAll('link[rel="preload"][as="video"]');
      preloadLinks.forEach(link => {
        if (link.href.includes('yt-transcript.mp4') || 
            link.href.includes('web-scraping.mp4') || 
            link.href.includes('reddit-biz-ideas.mp4')) {
          document.head.removeChild(link);
        }
      });
    };
  }, []);

  // Create a handler for project selection that manages video loading
  const handleProjectSelect = (project) => {
    setSelectedProject(project);
    // Videos will be handled in the useEffect with videoRef dependency
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
      }
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 70,
        damping: 15
      }
    }
  };

  return (
    <div className={styles.automation}>
      <div className={styles.content}>
        <div className={styles.header}>
          <h1 className={styles.title}>
            n8n Automation Expertise
          </h1>
          <Text className={styles.subtitle} as="p" size="xl" color="secondary">
            Discover how I leverage n8n to create powerful, scalable automation solutions through custom workflows, self-hosting, and node development
          </Text>
        </div>

        <section className={styles.intro}>
          <div className={styles.introText}>
            <h2>
              <span className={styles.n8nHighlightText}>Workflow automation</span> expert
            </h2>
            <Text as="p" size="lg" color="secondary">
              n8n is a powerful workflow automation platform that allows for flexible, scalable integrations between virtually any system. As an n8n specialist, I leverage its open-source architecture to create custom solutions that go beyond the capabilities of traditional automation tools.
            </Text>
            <Text as="p" size="lg" color="secondary">
              With n8n, I can build complex automation workflows that perfectly match your business processes, without the limitations of SaaS products. Whether you need custom node development, enterprise self-hosting, or complex workflow optimization, I bring specialized expertise to maximize your automation potential.
            </Text>
          </div>
          <div className={styles.skills}>
            <div className={styles.skillBlock}>
              <h3>Workflow Development</h3>
              <ul>
                <li>
                  <Text as="p" size="md" color="secondary">Creating sophisticated automation flows with error handling, conditional logic, and data transformation</Text>
                </li>
                <li>
                  <Text as="p" size="md" color="secondary">Integrating with 200+ systems including CRMs, databases, APIs, and messaging platforms</Text>
                </li>
                <li>
                  <Text as="p" size="md" color="secondary">Building scalable data pipelines for ETL processes and real-time data synchronization</Text>
                </li>
              </ul>
            </div>
            <div className={styles.skillBlock}>
              <h3>Technical Implementation</h3>
              <ul>
                <li>
                  <Text as="p" size="md" color="secondary">Self-hosting n8n in production environments with high availability and security</Text>
                </li>
                <li>
                  <Text as="p" size="md" color="secondary">Developing custom nodes using TypeScript to extend n8n capabilities</Text>
                </li>
                <li>
                  <Text as="p" size="md" color="secondary">Performance optimization and workflow reliability engineering</Text>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className={styles.sectionTitle}>
            n8n Automation Projects
          </h2>
          <Text className={styles.sectionSubtitle} as="p" size="lg" color="secondary">
            Explore my portfolio of professional n8n automation projects, from custom workflow development to enterprise implementations
          </Text>

          <motion.div 
            className={styles.projectGrid}
            variants={containerVariants}
            initial="hidden"
            animate={isLoaded ? "visible" : "hidden"}
          >
            {automationProjects.map(project => (
              <motion.div 
                key={project.id}
                className={styles.projectCard}
                variants={itemVariants}
                onClick={() => handleProjectSelect(project)}
              >
                <div className={styles.projectImage}>
                  <img src={project.image} alt={project.title} />
                  <div className={styles.toolBadge}>
                    <img src={project.toolIcon} alt={project.tool} />
                    {project.tool}
                  </div>
                </div>
                <div className={styles.projectContent}>
                  <h3>{project.title}</h3>
                  <Text as="p" size="md" color="secondary" className={styles.description}>
                    {project.description}
                  </Text>
                  <div className={styles.tags}>
                    {project.tags.slice(0, 3).map(tag => (
                      <span key={tag} className={styles.tag}>{tag}</span>
                    ))}
                  </div>
                  <div className={styles.metrics}>
                    {project.metrics.map(metric => (
                      <div key={metric.label} className={styles.metric}>
                        <Text as="span" size="lg" weight="bold" color="accent" className={styles.metricValue}>
                          {metric.value}
                        </Text>
                        <Text as="span" size="xs" color="secondary" className={styles.metricLabel}>
                          {metric.label}
                        </Text>
                      </div>
                    ))}
                  </div>
                  <div className={styles.impact}>
                    <h4>Impact</h4>
                    <Text as="p" size="sm" color="secondary">
                      {project.impact}
                    </Text>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        <section className={styles.footer}>
          <h2>Want to leverage n8n for your automation needs?</h2>
          <Button
            href="mailto:jigsawsmma@gmail.com?subject=n8n%20Automation%20Inquiry"
            as="a"
            target="_blank"
            className={styles.contactButton}
            variant="primary"
            size="large"
          >
            Let's discuss your project
          </Button>
        </section>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            className={styles.modalOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div 
              className={styles.modalContent}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              onClick={e => e.stopPropagation()}
            >
              <button 
                className={styles.modalClose} 
                onClick={() => setSelectedProject(null)}
                aria-label="Close modal"
              >
                ×
              </button>
              <div className={styles.modalBody}>
                <div className={styles.modalHeader}>
                  <h2>{selectedProject.title}</h2>
                  <div className={styles.modalTool}>
                    <img src={selectedProject.toolIcon} alt={selectedProject.tool} />
                    {selectedProject.tool}
                  </div>
                </div>
                
                <div className={styles.modalVideo}>
                  <h3>Workflow Demo</h3>
                  <video 
                    ref={videoRef}
                    controls
                    muted
                    loop
                    playsInline
                    poster={selectedProject.image}
                  >
                    <source src={selectedProject.videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
                
                <div>
                  <h3>Description</h3>
                  <Text as="div" size="md" color="secondary" className={styles.modalDescription}>
                    {selectedProject.details.split('\n\n').map((paragraph, index) => (
                      <p key={index} style={{ marginBottom: '1rem' }}>
                        {paragraph}
                      </p>
                    ))}
                  </Text>
                </div>
                
                <div>
                  <h3>Impact</h3>
                  <Text as="p" size="md" color="secondary" className={styles.modalDescription}>
                    {selectedProject.impact}
                  </Text>
                </div>
                
                <div className={styles.modalMetrics}>
                  {selectedProject.metrics.map(metric => (
                    <div key={metric.label} className={styles.metric}>
                      <Text as="span" size="xl" weight="bold" color="accent" className={styles.metricValue}>
                        {metric.value}
                      </Text>
                      <Text as="span" size="xs" color="secondary" className={styles.metricLabel}>
                        {metric.label}
                      </Text>
                    </div>
                  ))}
                </div>
                
                <div>
                  <h3>Technologies</h3>
                  <div className={styles.tags}>
                    {selectedProject.tags.map(tag => (
                      <span key={tag} className={styles.tag}>{tag}</span>
                    ))}
                  </div>
                </div>

                <div style={{ marginTop: 'auto', textAlign: 'center' }}>
                  <Button
                    href="mailto:jigsawsmma@gmail.com?subject=n8n%20Project%20Inquiry:%20"
                    as="a"
                    target="_blank"
                    variant="primary"
                    size="default"
                  >
                    Contact me about this project
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 