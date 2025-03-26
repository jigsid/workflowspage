import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Automation.module.css';
import { Text } from '../components/Text';
import { Button } from '../components/Button';
import WorkflowViewer from '../components/WorkflowViewer';
import placeholderImages from '../placeholderImages';

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
    videoUrl: '/videos/yt-transcript.mp4',
    hasWorkflow: true,
    workflowData: 'youtube-transcript'
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
    videoUrl: '/videos/web-scraping.mp4',
    hasWorkflow: true,
    workflowData: 'web-scraping'
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
      { label: 'Posts Analyzed', value: '1000+' },
      { label: 'Business Ideas', value: '50+' },
      { label: 'Subreddits', value: '15' }
    ],
    details: 'I created an advanced n8n workflow that leverages AI to discover business opportunities from Reddit discussions. This system includes:\n\n• Multi-Subreddit Monitoring: Continuously monitors 15+ business and entrepreneurship-focused subreddits\n\n• Problem Identification: Uses keyword filtering and sentiment analysis to identify posts discussing genuine business problems\n\n• Content Classification: Categorizes posts by industry, problem type, and potential solution complexity\n\n• GPT-Powered Analysis: Utilizes GPT-4 to analyze problems and generate potential business solutions\n\n• Opportunity Scoring: Implements a scoring algorithm to rank opportunities by viability and market potential\n\n• Detailed Reporting: Generates comprehensive reports with problem statements, solution ideas, and market analyses\n\n• Trend Identification: Identifies emerging problem patterns across multiple posts and communities\n\nThis workflow has successfully identified over 50 viable business opportunities, providing detailed solution concepts and initial market sizing for each.',
    videoUrl: '/videos/reddit-ideas.mp4',
    hasWorkflow: true,
    workflowData: 'reddit-biz-ideas'
  },
  {
    id: 4,
    title: 'First WhatsApp Chatbot',
    tool: 'n8n',
    toolIcon: placeholderImages.n8nLogo,
    description: 'A complete WhatsApp chatbot solution that serves as an AI-powered product sales agent using a vector store knowledgebase.',
    impact: 'Automated customer product inquiries with 24/7 availability and improved response quality using vector search technology',
    image: '/images/automation/whatsapp-chatbot.jpg',
    tags: ['WhatsApp API', 'AI Agent', 'Vector Store', 'Customer Support'],
    metrics: [
      { label: 'Response Time', value: '<5 sec' },
      { label: 'Accuracy', value: '92%' },
      { label: 'Uptime', value: '24/7' }
    ],
    details: 'I developed a comprehensive WhatsApp chatbot that functions as an AI-powered sales assistant for product inquiries. The workflow includes:\n\n• WhatsApp Business API Integration: Establishes a secure connection to receive and respond to customer messages\n\n• Vector Store Knowledge Base: Processes product brochures and documentation into a searchable vector database\n\n• Message Type Handling: Detects and routes incoming message types, focusing on text message processing\n\n• AI Agent Integration: Utilizes OpenAI\'s GPT models to generate intelligent, context-aware responses\n\n• Memory Management: Implements a windowed buffer memory system to maintain conversation context for each user\n\n• Product Catalog Access: Grants the AI agent direct access to product specifications and features via vector search\n\n• User Identification: Tracks unique users to maintain personalized conversation history\n\n• Error Recovery: Includes fallback mechanisms for handling unsupported message types\n\nThis solution has significantly improved customer service efficiency by providing instant, accurate responses to product inquiries around the clock.',
    hasWorkflow: true,
    workflowData: 'first-whatsapp-chatbot'
  },
  {
    id: 'advanced-whatsapp-ai',
    title: 'Advanced WhatsApp AI Assistant',
    tool: 'n8n',
    toolIcon: placeholderImages.n8nLogo,
    description: 'Build a sophisticated AI assistant that can process various types of WhatsApp messages including text, voice, images, and more.',
    impact: 'Enhanced customer engagement by enabling multimedia support with 95% message analysis accuracy across all formats',
    image: '/images/automation/whatsapp-ai.jpg',
    tags: ['Multimodal AI', 'Media Processing', 'WhatsApp Integration', 'Google Gemini'],
    metrics: [
      { label: 'Message Types', value: '4' },
      { label: 'Analysis Speed', value: '7-12 sec' },
      { label: 'GPT Integration', value: 'Full' }
    ],
    details: 'I engineered an advanced WhatsApp AI assistant capable of handling and analyzing multiple message types with remarkable accuracy. The system features:\n\n• Multi-Format Message Processing: Handles text, audio, video, and image messages using appropriate AI models\n\n• Audio Transcription: Transcribes voice notes and audio messages using specialized AI models\n\n• Video Content Analysis: Utilizes Google Gemini to summarize and describe video content\n\n• Image Recognition: Processes images to extract and describe visual content and text\n\n• Text Summarization: Condenses and processes text messages for efficient AI analysis\n\n• Knowledge Tool Access: Integrates with Wikipedia tool for enhanced information retrieval\n\n• Windowed Memory System: Maintains conversation context across multiple interactions\n\n• Seamless Response Delivery: Returns analysis results and AI responses directly through WhatsApp\n\nThis versatile system provides a complete multimedia communication experience, allowing users to interact naturally using their preferred message format while receiving intelligent, context-aware responses.',
    hasWorkflow: true,
    workflowData: 'respond-whatsapp-message'
  },
  {
    id: 'financial-documents-assistant',
    title: 'Financial Documents Assistant',
    tool: 'n8n',
    toolIcon: '/n8nlogo.jpg',
    description: 'A sophisticated document processing system that uses vector search and LLMs to analyze financial documents and provide intelligent answers to queries.',
    impact: 'Streamlined financial document analysis and reduced query response time by 90% while improving accuracy',
    image: '/images/automation/financial-documents-assistant.jpg',
    tags: ['Vector Search', 'Qdrant', 'Mistral.ai', 'Document Analysis'],
    metrics: [
      { label: 'Query Time', value: '-90%' },
      { label: 'Accuracy', value: '95%' },
      { label: 'File Types', value: 'Multiple' }
    ],
    details: 'I built a comprehensive financial documents assistant that leverages vector search technology and large language models to analyze and retrieve information from financial documents. This system includes:\n\n• Local File Monitoring: Automatically detects when files are added, changed, or removed from a target folder\n\n• Document Synchronization: Seamlessly synchronizes file changes with the Qdrant vector database\n\n• Text Processing Pipeline: Splits documents into manageable chunks and prepares them for embedding\n\n• AI Embeddings: Uses Mistral.ai to generate high-quality vector embeddings of document content\n\n• Vector Storage: Stores embeddings with rich metadata in Qdrant for efficient retrieval\n\n• Natural Language Interface: Provides a conversational interface for asking questions about financial documents\n\n• Intelligent Retrieval: Implements vector search to find the most relevant document sections for each query\n\n• AI-Powered Responses: Generates accurate, contextual answers based on retrieved document segments\n\nThis system dramatically improves the efficiency of financial document analysis, allowing users to get instant answers to complex questions about their financial data without having to manually search through documents.',
    hasWorkflow: true,
    workflowData: 'financial-documents-assistant'
  },
  {
    id: 6,
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
    id: 7,
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
    id: 8,
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
    id: 9,
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
    id: 10,
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
  },
  {
    id: 11,
    title: 'AI-powered WooCommerce Support Agent',
    tool: 'n8n',
    toolIcon: placeholderImages.n8nLogo,
    description: 'A sophisticated AI support agent that integrates with WooCommerce to provide real-time order status and tracking information to customers.',
    impact: 'Reduced customer service inquiries by 75% while improving customer satisfaction through 24/7 instant responses',
    image: placeholderImages.woocommerceSupport,
    tags: ['WooCommerce', 'AI Agent', 'Customer Support', 'Order Tracking'],
    metrics: [
      { label: 'Response Time', value: '< 2 sec' },
      { label: 'Accuracy', value: '96%' },
      { label: 'Inquiries Handled', value: '1000+/day' }
    ],
    details: 'I developed a comprehensive AI-powered WooCommerce support agent that provides customers with instant, accurate information about their orders. This innovative solution includes:\n\n• Secure Authentication: Implements encrypted email verification to ensure customers can only access their own order data\n\n• Real-time Order Lookup: Connects directly to WooCommerce API to retrieve current order status and details\n\n• Shipping Integration: Pulls live tracking data from shipping providers (DHL, UPS) to provide accurate delivery updates\n\n• Natural Language Processing: Utilizes advanced AI models to understand and respond to a wide range of customer queries\n\n• Contextual Memory: Maintains conversation history to provide coherent responses throughout the interaction\n\n• Multilingual Support: Capable of communicating with customers in multiple languages\n\n• Error Handling: Provides helpful responses when information is missing or orders cannot be found\n\nThis agent significantly reduced the workload on human customer service representatives while providing customers with immediate 24/7 access to order information.',
    hasWorkflow: true,
    workflowData: 'woocommerce-support-agent'
  },
  {
    id: 12,
    title: 'Hacker News to Video Content Pipeline',
    tool: 'n8n',
    toolIcon: placeholderImages.n8nLogo,
    description: 'End-to-end workflow that transforms popular Hacker News articles into professional video content for social media platforms.',
    impact: 'Generated 120+ viral tech videos with minimal human intervention, resulting in over 1M social media impressions',
    image: placeholderImages.hackerNewsVideo,
    tags: ['Content Generation', 'AI Video', 'Social Media', 'Multimodal AI'],
    metrics: [
      { label: 'Production Time', value: '-90%' },
      { label: 'Videos/Month', value: '30+' },
      { label: 'Platforms', value: '4' }
    ],
    details: 'I engineered an innovative content pipeline that automatically transforms trending Hacker News articles into engaging video content. The workflow features:\n\n• Article Analysis: Intelligently selects and analyzes top Hacker News content to determine video suitability\n\n• Content Preparation: Processes articles into script-ready format with appropriate sectioning and highlights\n\n• Multi-model AI Processing: Utilizes advanced AI models for topic relevance scoring and content summarization\n\n• Image Generation: Creates custom visuals that match the content theme using AI image generation\n\n• Video Assembly: Combines text, images, and styling into cohesive video presentations\n\n• Content Distribution: Uploads finished videos to multiple platforms (YouTube, LinkedIn, Twitter, Instagram)\n\n• Performance Tracking: Monitors engagement metrics across platforms to refine future content\n\nThis automated system reduced content production time by 90% while maintaining high quality standards and dramatically increasing content output capability.',
    hasWorkflow: true,
    workflowData: 'hacker-news-video'
  },
  {
    id: 13,
    title: 'Email Subscription Service with AI Content Generation',
    tool: 'n8n',
    toolIcon: placeholderImages.n8nLogo,
    description: 'Complete subscription management system that combines n8n Forms, Airtable, and AI to deliver personalized content to subscribers.',
    impact: 'Achieved 45% higher engagement rates with AI-generated content compared to traditional newsletter formats',
    image: placeholderImages.emailSubscription,
    tags: ['Email Automation', 'Content Generation', 'Airtable', 'Subscription Management'],
    metrics: [
      { label: 'Open Rate', value: '+62%' },
      { label: 'Subscribers', value: '5000+' },
      { label: 'Personalization', value: '100%' }
    ],
    details: 'I designed and implemented a sophisticated email subscription system that uses AI to generate personalized content for subscribers. This comprehensive solution includes:\n\n• Subscription Management: Uses n8n forms for seamless subscriber registration and preference collection\n\n• Database Integration: Leverages Airtable for efficient subscriber data management and segmentation\n\n• Scheduled Delivery: Implements intelligent timing algorithms to deliver content at optimal times for each subscriber\n\n• AI Content Generation: Utilizes advanced language models to create personalized factoids and content based on subscriber preferences\n\n• Image Creation: Generates custom images for each email to increase visual engagement\n\n• Unsubscribe Handling: Provides simple, compliant unsubscribe functionality with immediate database updates\n\n• Analytics Tracking: Monitors open rates, click-through rates, and other key metrics to optimize performance\n\nThis system has dramatically improved subscriber engagement while reducing the manual effort required to create and distribute newsletter content.',
    hasWorkflow: true,
    workflowData: 'email-subscription-service'
  }
];

export default function Automation() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showWorkflow, setShowWorkflow] = useState(false);
  const [fullscreenImage, setFullscreenImage] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [workflowJson, setWorkflowJson] = useState(null);
  
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Fetch workflow JSON when project changes
  useEffect(() => {
    const fetchWorkflowJson = async () => {
      if (selectedProject?.hasWorkflow) {
        try {
          const response = await fetch(`/data/${selectedProject.workflowData}.json`);
          if (!response.ok) throw new Error('Failed to fetch workflow JSON');
          const data = await response.json();
          setWorkflowJson(data);
        } catch (error) {
          console.error('Error fetching workflow JSON:', error);
          setWorkflowJson(null);
        }
      } else {
        setWorkflowJson(null);
      }
    };

    fetchWorkflowJson();
  }, [selectedProject]);

  // Reset workflow view when project changes
  useEffect(() => {
    setShowWorkflow(false);
  }, [selectedProject]);

  const handleProjectSelect = (project) => {
    setSelectedProject(project);
    // Reset workflow view
    setShowWorkflow(false);
  };

  const toggleWorkflowView = () => {
    setShowWorkflow(!showWorkflow);
  };

  const openFullscreenImage = (e) => {
    e.stopPropagation();
    setFullscreenImage(true);
    setZoomLevel(1);
  };

  const closeFullscreenImage = (e) => {
    e.stopPropagation();
    setFullscreenImage(false);
    setZoomLevel(1);
  };

  const handleZoomIn = (e) => {
    e.stopPropagation();
    setZoomLevel(prev => Math.min(prev + 0.25, 3));
  };

  const handleZoomOut = (e) => {
    e.stopPropagation();
    setZoomLevel(prev => Math.max(prev - 0.25, 0.5));
  };

  const handleResetZoom = (e) => {
    e.stopPropagation();
    setZoomLevel(1);
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
              className={`${styles.modalContent} ${showWorkflow ? styles.modalContentLarge : ''}`}
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
                  <h3>Workflow Overview</h3>
                  <div className={styles.workflowImage}>
                    <img 
                      src={selectedProject.image} 
                      alt={selectedProject.title}
                      className={styles.workflowScreenshot}
                      onClick={openFullscreenImage}
                    />
                    <button className={styles.viewFullscreen} onClick={openFullscreenImage}>
                      <svg className={styles.fullscreenIcon} viewBox="0 0 24 24" fill="currentColor">
                        <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" />
                      </svg>
                      View Fullscreen
                    </button>
                  </div>
                  {selectedProject.hasWorkflow && (
                    <div className={styles.workflowJson}>
                      <h4>Workflow Configuration</h4>
                      <div className={styles.jsonViewer}>
                        <pre>
                          <code>
                            {workflowJson ? JSON.stringify(workflowJson, null, 2) : 'Loading workflow configuration...'}
                          </code>
                        </pre>
                      </div>
                    </div>
                  )}
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

                {/* New section for workflow visualization */}
                {selectedProject.hasWorkflow && (
                  <div className={styles.workflowSection}>
                    <div className={styles.workflowHeader}>
                      <Text variant="h3">Workflow Visualization</Text>
                      <Button 
                        onClick={toggleWorkflowView}
                        className={styles.workflowToggleButton}
                      >
                        {showWorkflow ? 'Hide Workflow' : 'Show Workflow'}
                      </Button>
                    </div>
                    
                    {showWorkflow && (
                      <div className={styles.workflowContainer} style={{ 
                        height: '450px', 
                        width: '100%', 
                        overflow: 'hidden', 
                        borderRadius: '8px', 
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                        margin: '20px 0 40px 0',
                        maxWidth: '100%'
                      }}>
                        <WorkflowViewer workflowData={selectedProject.workflowData} />
                      </div>
                    )}
                  </div>
                )}

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

      <AnimatePresence>
        {fullscreenImage && selectedProject && (
          <motion.div 
            className={styles.fullscreenOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeFullscreenImage}
          >
            <button 
              className={styles.fullscreenClose} 
              onClick={closeFullscreenImage}
              aria-label="Close fullscreen"
            >
              ×
            </button>
            <motion.img 
              src={selectedProject.image} 
              alt={selectedProject.title}
              className={styles.fullscreenImage}
              style={{ transform: `scale(${zoomLevel})` }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: zoomLevel }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
            <div className={styles.zoomControls} onClick={e => e.stopPropagation()}>
              <button className={styles.zoomButton} onClick={handleZoomOut} aria-label="Zoom out">
                −
              </button>
              <div className={styles.zoomLevel}>{Math.round(zoomLevel * 100)}%</div>
              <button className={styles.zoomButton} onClick={handleZoomIn} aria-label="Zoom in">
                +
              </button>
              <button className={styles.zoomButton} onClick={handleResetZoom} aria-label="Reset zoom">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                  <path d="M12 5V2L8 6l4 4V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z" />
                </svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 