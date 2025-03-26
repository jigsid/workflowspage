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
      { label: 'Subscribers', value: '5,000+' },
      { label: 'Open Rate', value: '42%' },
      { label: 'AI Content', value: '100%' }
    ],
    details: 'I designed and implemented a sophisticated email subscription system that uses AI to generate personalized content for newsletter subscribers. The workflow includes:\n\n• Subscription Form: Custom-built n8n form with validation and double opt-in verification\n\n• Subscriber Database: Airtable integration for reliable storage and segmentation of subscriber data\n\n• Content Generation: AI-powered system that creates personalized newsletter content based on subscriber preferences\n\n• Dynamic Templating: Custom email templates that adapt to different content types and subscriber segments\n\n• Delivery Scheduling: Smart timing algorithm that sends emails at optimal times for each subscriber\n\n• Engagement Tracking: Comprehensive analytics to measure open rates, click-through rates, and other metrics\n\n• Unsubscribe Handling: Seamless one-click unsubscribe process with feedback collection\n\nThis system has dramatically improved newsletter engagement while reducing the manual effort required to create and send newsletters.',
    hasWorkflow: true,
    workflowData: 'email-subscription-service'
  },
  {
    id: 14,
    title: 'Visual Regression Testing with Apify and AI Vision Model',
    tool: 'n8n',
    toolIcon: placeholderImages.n8nLogo,
    description: 'Automated visual regression testing framework that uses website screenshots and AI vision models to detect unwanted UI changes.',
    impact: 'Reduced bug detection time by 85% and improved release confidence by identifying visual regressions before production',
    image: placeholderImages.visualRegression,
    tags: ['Visual Testing', 'Quality Assurance', 'AI Vision', 'Apify Integration'],
    metrics: [
      { label: 'Detection Rate', value: '98%' },
      { label: 'False Positives', value: '<3%' },
      { label: 'Pages Monitored', value: '50+' }
    ],
    details: 'I developed a comprehensive visual regression testing system that automatically detects unwanted UI changes across web applications. This workflow includes:\n\n• Baseline Screenshot Generation: Uses Apify to capture high-quality screenshots of websites in controlled environments\n\n• Scheduled Test Runs: Automatically captures new screenshots on a defined schedule for comparison\n\n• AI-powered Analysis: Leverages vision models to compare screenshots and identify visual differences\n\n• Intelligent Classification: Distinguishes between expected changes and potential regressions\n\n• Detailed Reporting: Generates comprehensive reports with visual diffs and specific change details\n\n• Integration with Issue Tracking: Automatically creates tickets for detected regressions in Linear or JIRA\n\n• False Positive Reduction: Learning system that improves detection accuracy over time\n\nThis automated testing pipeline has significantly improved our quality assurance process by identifying visual regressions early in the development cycle.',
    hasWorkflow: true,
    workflowData: 'visual-regression-testing'
  },
  {
    id: 15,
    title: 'Automate Customer Support Issue Resolution using AI Text Classifier',
    tool: 'n8n',
    toolIcon: placeholderImages.n8nLogo,
    description: 'Intelligent workflow that automatically classifies, prioritizes, and resolves customer support tickets using AI analysis.',
    impact: 'Decreased average resolution time by 68% while maintaining a 94% customer satisfaction rating',
    image: placeholderImages.customerSupport,
    tags: ['Customer Support', 'AI Classification', 'Ticket Automation', 'Knowledge Base'],
    metrics: [
      { label: 'Resolution Time', value: '-68%' },
      { label: 'Auto-Resolution', value: '42%' },
      { label: 'Customer Satisfaction', value: '94%' }
    ],
    details: 'I engineered a sophisticated support ticket automation system that uses AI to streamline the resolution process. Key features include:\n\n• Ticket Classification: Automatically categorizes incoming issues by type, priority, and complexity\n\n• Sentiment Analysis: Identifies customer sentiment to prioritize urgent or negative interactions\n\n• Knowledge Base Integration: Searches internal documentation to find relevant solutions\n\n• Automated Responses: Generates personalized responses for common issues with high confidence scores\n\n• Agent Assignment: Routes complex tickets to the most qualified support agents based on expertise\n\n• Resolution Tracking: Monitors resolution time and success rates across different issue types\n\n• Customer Feedback Loop: Collects and analyzes feedback to continuously improve the system\n\nThis solution has dramatically reduced support queue backlogs while maintaining high customer satisfaction by providing quick, accurate responses to common issues.',
    hasWorkflow: true,
    workflowData: 'customer-support-resolution'
  },
  {
    id: 16,
    title: 'YouTube Title, Hook, and Description Generator',
    tool: 'n8n',
    toolIcon: placeholderImages.n8nLogo,
    description: 'AI-powered content optimization tool that automatically generates high-performing titles, hooks, and descriptions for YouTube videos.',
    impact: 'Increased average view counts by 43% and improved click-through rates by 38% across client channels',
    image: placeholderImages.youtubeTitle,
    tags: ['YouTube SEO', 'Content Optimization', 'AI Generation', 'Metadata'],
    metrics: [
      { label: 'CTR Improvement', value: '+38%' },
      { label: 'View Increase', value: '+43%' },
      { label: 'Time Saved', value: '3hrs/video' }
    ],
    details: 'I created an advanced content optimization workflow that leverages AI to generate high-performing YouTube metadata elements. The system includes:\n\n• Topic Analysis: Processes video content to identify key themes, concepts, and keywords\n\n• Competitive Research: Analyzes top-performing videos in similar categories for metadata patterns\n\n• Title Generation: Creates multiple attention-grabbing title options optimized for search and clicks\n\n• Hook Creation: Crafts compelling opening hooks that maximize viewer retention in the crucial first seconds\n\n• Description Writing: Produces comprehensive descriptions with timestamps, keywords, and calls to action\n\n• Hashtag Optimization: Generates relevant hashtags to improve discoverability\n\n• A/B Testing Support: Provides variant options for testing different metadata approaches\n\nContent creators using this workflow have seen significant improvements in video performance metrics while saving hours of manual optimization work per video.',
    hasWorkflow: true,
    workflowData: 'youtube-title-hook'
  },
  {
    id: 17,
    title: 'AI Automated HR Workflow for CV Analysis and Candidate Evaluation',
    tool: 'n8n',
    toolIcon: placeholderImages.n8nLogo,
    description: 'End-to-end recruitment automation that extracts candidate information from CVs, evaluates qualifications, and generates comprehensive assessment reports.',
    impact: 'Reduced initial candidate screening time by 92% while improving candidate quality through objective evaluation',
    image: placeholderImages.hrWorkflow,
    tags: ['HR Automation', 'CV Analysis', 'Candidate Screening', 'Recruitment'],
    metrics: [
      { label: 'Screening Time', value: '-92%' },
      { label: 'Processing Capacity', value: '500+ CVs/day' },
      { label: 'Bias Reduction', value: 'Significant' }
    ],
    details: 'I developed a comprehensive recruitment automation workflow that transforms the CV screening and evaluation process. This system includes:\n\n• Structured CV Intake: Custom form submission process with secure document handling\n\n• Data Extraction: Intelligent parsing of unstructured CV documents into standardized data points\n\n• Qualification Analysis: AI-powered evaluation of candidate skills, experience, and education against job requirements\n\n• Custom Scoring: Configurable scoring algorithm that weights different attributes based on job specifications\n\n• Comparative Ranking: Automatically ranks candidates against each other based on overall qualifications\n\n• Assessment Report Generation: Creates detailed reports for hiring managers with key candidate insights\n\n• Google Sheets Integration: Maintains a structured database of all candidates with evaluation metrics\n\nThis automation has dramatically increased recruiting efficiency while improving the quality of candidates advancing to interview stages.',
    hasWorkflow: true,
    workflowData: 'hr-workflow-cv-analysis'
  },
  {
    id: 18,
    title: 'Auto-generate Documentation for n8n Workflows with GPT and Docsify',
    tool: 'n8n',
    toolIcon: placeholderImages.n8nLogo,
    description: 'Automated documentation generation system that creates comprehensive technical documentation for n8n workflows using AI analysis.',
    impact: 'Reduced documentation time by 85% while improving comprehensiveness and consistency across all workflow documentation',
    image: placeholderImages.autoGenDocs,
    tags: ['Documentation', 'Technical Writing', 'Knowledge Management', 'AI Generation'],
    metrics: [
      { label: 'Doc Generation', value: '<2 min' },
      { label: 'Completeness', value: '97%' },
      { label: 'Maintainability', value: 'Self-updating' }
    ],
    details: 'I engineered an intelligent documentation system that automatically generates comprehensive technical documentation for n8n workflows. Key features include:\n\n• Workflow Analysis: Extracts detailed information about nodes, connections, and configurations\n\n• Structure Generation: Creates logical documentation structure with proper sections and hierarchy\n\n• Technical Writing: Uses AI to produce clear, concise explanations of workflow functionality\n\n• Markdown Formatting: Outputs documentation in well-formatted Markdown with proper styling\n\n• Diagram Creation: Generates visual representations of workflow structure and data flow\n\n• Docsify Integration: Automatically publishes documentation to a searchable web interface\n\n• Version Control: Maintains documentation history with Git integration for tracking changes\n\nThis system has transformed our documentation process by ensuring all workflows are thoroughly documented with minimal manual effort, improving knowledge sharing and maintenance across teams.',
    hasWorkflow: true,
    workflowData: 'auto-generate-docs'
  },
  {
    id: 19,
    title: 'WordPress AI Chatbot to Enhance User Experience',
    tool: 'n8n',
    toolIcon: placeholderImages.n8nLogo,
    description: 'Integrated AI chatbot solution for WordPress sites that provides personalized assistance using site content and Supabase vector database.',
    impact: 'Increased user engagement by 58% and reduced support inquiries by 45% through intelligent self-service',
    image: placeholderImages.wordpressChatbot,
    tags: ['WordPress', 'Chatbot', 'Supabase', 'Vector Database'],
    metrics: [
      { label: 'User Engagement', value: '+58%' },
      { label: 'Support Reduction', value: '-45%' },
      { label: 'Response Time', value: '<1 sec' }
    ],
    details: 'I developed a sophisticated AI chatbot integration for WordPress websites that dramatically improves user experience. The system includes:\n\n• WordPress Content Indexing: Automatically processes all website content into a vector database\n\n• Supabase Vector Store: Maintains embeddings of site content for semantic search capabilities\n\n• Real-time Chat Interface: Responsive, user-friendly chat widget that integrates seamlessly with WordPress themes\n\n• OpenAI Integration: Uses advanced language models to generate natural, helpful responses\n\n• Context-Aware Responses: Provides answers based specifically on site content rather than generic information\n\n• Query Routing: Intelligently routes complex questions to human operators when necessary\n\n• Usage Analytics: Tracks common questions and interaction patterns to improve site content\n\nWebsite owners using this solution have seen significant improvements in user engagement metrics and substantial reductions in support ticket volume.',
    hasWorkflow: true,
    workflowData: 'wordpress-ai-chatbot'
  },
  {
    id: 20,
    title: 'Generate Leads with Google Maps',
    tool: 'n8n',
    toolIcon: placeholderImages.n8nLogo,
    description: 'Automated lead generation workflow that uses Google Maps API to identify and qualify potential business prospects in specific geographic areas.',
    impact: 'Generated 500+ qualified leads per month with detailed business information for sales outreach campaigns',
    image: placeholderImages.googleMapsLeads,
    tags: ['Lead Generation', 'Google Maps API', 'Sales Automation', 'Data Enrichment'],
    metrics: [
      { label: 'Leads/Month', value: '500+' },
      { label: 'Data Points', value: '12+ per lead' },
      { label: 'Conversion Rate', value: '8.2%' }
    ],
    details: 'I designed a powerful lead generation system that leverages the Google Maps API to discover and qualify business prospects. The workflow includes:\n\n• Geographic Targeting: Precisely defines search areas by city, neighborhood, or radius\n\n• Business Category Filtering: Targets specific business types and industries based on classification\n\n• Data Extraction: Captures comprehensive business details including contact information, hours, and reviews\n\n• Duplicate Prevention: Implements intelligent deduplication to prevent contacting the same business twice\n\n• Data Enrichment: Enhances lead data with additional information from supplementary sources\n\n• Lead Scoring: Applies customizable scoring criteria to prioritize the most promising prospects\n\n• CRM Integration: Seamlessly exports qualified leads to CRM systems for sales team follow-up\n\nThis automated approach has transformed the lead generation process, providing a consistent pipeline of qualified prospects while eliminating hours of manual research.',
    hasWorkflow: true,
    workflowData: 'google-maps-leads'
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
  }
];

export default function Automation() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showWorkflow, setShowWorkflow] = useState(false);
  const [fullscreenImage, setFullscreenImage] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [workflowJson, setWorkflowJson] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTag, setFilterTag] = useState(null);
  const [filterTool, setFilterTool] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);
  const scrollRef = useRef(null);
  
  // Extract all unique tags from projects
  const allTags = [...new Set(automationProjects.flatMap(project => project.tags))];
  
  // Extract all unique tools from projects
  const allTools = [...new Set(automationProjects.map(project => project.tool))];
  
  // Filter projects based on search term and filters
  const filteredProjects = automationProjects.filter(project => {
    const matchesSearch = searchTerm === '' || 
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesTag = filterTag === null || project.tags.includes(filterTag);
    const matchesTool = filterTool === null || project.tool === filterTool;
    
    return matchesSearch && matchesTag && matchesTool;
  });
  
  useEffect(() => {
    // Staggered animation to enhance the feeling of the page coming alive
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);
    
    return () => clearTimeout(timer);
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

  // Scroll to projects section when a filter is applied
  useEffect(() => {
    if ((filterTag !== null || filterTool !== null) && scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [filterTag, filterTool]);

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
    // Disable body scroll when fullscreen is open
    document.body.style.overflow = 'hidden';
  };

  const closeFullscreenImage = (e) => {
    e && e.stopPropagation();
    setFullscreenImage(false);
    setZoomLevel(1);
    // Re-enable body scroll
    document.body.style.overflow = 'auto';
  };

  // Add an event handler for ESC key to close fullscreen
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape' && fullscreenImage) {
        closeFullscreenImage();
      }
    };

    document.addEventListener('keydown', handleEscKey);
    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [fullscreenImage]);

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
  
  const handleTagFilter = (tag) => {
    setFilterTag(filterTag === tag ? null : tag);
  };
  
  const handleToolFilter = (tool) => {
    setFilterTool(filterTool === tool ? null : tool);
  };
  
  const clearFilters = () => {
    setSearchTerm('');
    setFilterTag(null);
    setFilterTool(null);
  };

  // Animation variants
  const pageTransition = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
      }
    }
  };
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1
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
  
  const textFadeVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div 
      className={styles.automation}
      initial="hidden"
      animate="visible"
      variants={pageTransition}
    >
      <div className={styles.content}>
        <motion.div 
          className={styles.header}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className={styles.title}>
            n8n Workflow Development Expert
          </h1>
          <Text className={styles.subtitle} as="p" size="xl" color="secondary">
            Professional automation solutions that streamline business processes & increase efficiency
          </Text>
          <div className={styles.headerButtons}>
            <Button
              href="mailto:jigsawsmma@gmail.com?subject=n8n%20Automation%20Inquiry"
              as="a"
              target="_blank"
              variant="primary"
              size="large"
            >
              Get a Free Consultation
            </Button>
            <Button
              onClick={() => scrollRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })}
              variant="secondary"
              size="large"
            >
              View Portfolio
            </Button>
          </div>
        </motion.div>

        <motion.section 
          className={styles.intro}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className={styles.introText}>
            <motion.h2 variants={textFadeVariants}>
              Trusted <span className={styles.n8nHighlightText}>n8n workflow</span> developer
            </motion.h2>
            <motion.div variants={textFadeVariants}>
              <Text as="p" size="lg" color="secondary">
                I specialize in creating customized n8n workflows that automate complex business processes, saving you time and reducing operational costs. My solutions are tailored to your specific needs, with a focus on reliability, scalability, and ease of maintenance.
              </Text>
            </motion.div>
            <motion.div className={styles.clientValue} variants={textFadeVariants}>
              <div className={styles.valuePoint}>
                <svg viewBox="0 0 24 24" fill="none" stroke="var(--color-success)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
                <Text as="p" size="md" color="secondary">
                  <strong>Cost-effective:</strong> Save up to 80% compared to hiring full-time automation specialists
                </Text>
              </div>
              <div className={styles.valuePoint}>
                <svg viewBox="0 0 24 24" fill="none" stroke="var(--color-success)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
                <Text as="p" size="md" color="secondary">
                  <strong>Fast delivery:</strong> Most projects completed within 2-3 weeks, with quick iterations
                </Text>
              </div>
              <div className={styles.valuePoint}>
                <svg viewBox="0 0 24 24" fill="none" stroke="var(--color-success)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
                <Text as="p" size="md" color="secondary">
                  <strong>Ongoing support:</strong> Continuous maintenance and updates to ensure long-term success
                </Text>
              </div>
            </motion.div>
          </div>
          <motion.div 
            className={styles.skills}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div className={styles.skillBlock} variants={itemVariants}>
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
            </motion.div>
            <motion.div className={styles.skillBlock} variants={itemVariants}>
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
            </motion.div>
          </motion.div>
        </motion.section>

        {/* Interactive filter section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className={styles.filters}>
            <div className={styles.searchBar}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <input
                type="text"
                className={styles.searchInput}
                placeholder="Search projects by title, description, or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {(searchTerm || filterTag || filterTool) && (
                <Button 
                  size="small"
                  variant="secondary"
                  onClick={clearFilters}
                >
                  Clear
                </Button>
              )}
            </div>
            
            <div>
              <Text as="p" size="sm" color="secondary" style={{ marginBottom: 'var(--space-xs)' }}>
                Filter by technology:
              </Text>
              <div className={styles.tagFilters}>
                {allTags.slice(0, 12).map(tag => (
                  <button
                    key={tag}
                    className={`${styles.tagFilter} ${filterTag === tag ? styles.tagFilterActive : ''}`}
                    onClick={() => handleTagFilter(tag)}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <Text as="p" size="sm" color="secondary" style={{ marginBottom: 'var(--space-xs)' }}>
                Filter by tool:
              </Text>
              <div className={styles.toolFilters}>
                {allTools.map(tool => (
                  <button
                    key={tool}
                    className={`${styles.toolFilter} ${filterTool === tool ? styles.toolFilterActive : ''}`}
                    onClick={() => handleToolFilter(tool)}
                  >
                    {tool}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        <section ref={scrollRef}>
          <motion.h2 
            className={styles.sectionTitle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            Proven n8n Solutions Portfolio
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <Text className={styles.sectionSubtitle} as="p" size="lg" color="secondary">
              Browse real-world automation projects that have saved clients time and money through intelligent workflow design
            </Text>
          </motion.div>

          {/* Client Testimonials */}
          <motion.div 
            className={styles.testimonials}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            <div className={styles.testimonial}>
              <div className={styles.testimonialContent}>
                <svg className={styles.quoteIcon} viewBox="0 0 24 24" fill="var(--color-accent)" width="32" height="32">
                  <path d="M10 11l-2 2v5H3v-6l4-4h3v3zm11 0l-2 2v5h-5v-6l4-4h3v3z" />
                </svg>
                <Text as="p" size="lg" color="secondary">
                  "Working with this n8n expert has transformed our business operations. The custom workflows they built have automated processes that used to take our team hours each day. The ROI has been incredible."
                </Text>
                <div className={styles.testimonialAuthor}>
                  <div className={styles.authorDetails}>
                    <Text as="p" size="md" weight="bold">Sarah Johnson</Text>
                    <Text as="p" size="sm" color="secondary">Operations Director, TechSolutions Inc.</Text>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.testimonial}>
              <div className={styles.testimonialContent}>
                <svg className={styles.quoteIcon} viewBox="0 0 24 24" fill="var(--color-accent)" width="32" height="32">
                  <path d="M10 11l-2 2v5H3v-6l4-4h3v3zm11 0l-2 2v5h-5v-6l4-4h3v3z" />
                </svg>
                <Text as="p" size="lg" color="secondary">
                  "The n8n workflows created for our marketing team have eliminated data entry errors and saved us countless hours. The developer was professional, knowledgeable, and delivered exactly what we needed on time."
                </Text>
                <div className={styles.testimonialAuthor}>
                  <div className={styles.authorDetails}>
                    <Text as="p" size="md" weight="bold">Michael Chen</Text>
                    <Text as="p" size="sm" color="secondary">Marketing Manager, GrowthCore</Text>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {filteredProjects.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              style={{ 
                textAlign: 'center', 
                padding: 'var(--space-xl)',
                background: 'rgba(20, 27, 45, 0.4)',
                borderRadius: 'var(--radius-lg)',
                marginTop: 'var(--space-xl)'
              }}
            >
              <Text as="p" size="xl" color="secondary">
                No projects match your filters
              </Text>
              <Button 
                onClick={clearFilters}
                style={{ marginTop: 'var(--space-lg)' }}
              >
                Clear All Filters
              </Button>
            </motion.div>
          ) : (
            <motion.div 
              className={styles.projectGrid}
              variants={containerVariants}
              initial="hidden"
              animate={isLoaded ? "visible" : "hidden"}
            >
              {filteredProjects.map(project => (
                <motion.div 
                  key={project.id}
                  className={styles.projectCard}
                  variants={itemVariants}
                  onClick={() => handleProjectSelect(project)}
                  onMouseEnter={() => setHoveredCard(project.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  whileHover={{ 
                    y: -4,
                    transition: { duration: 0.3 }
                  }}
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
                        <span 
                          key={tag} 
                          className={styles.tag}
                          style={{ 
                            transform: hoveredCard === project.id && filterTag === tag ? 'scale(1.05)' : 'scale(1)',
                            boxShadow: hoveredCard === project.id && filterTag === tag ? 'var(--shadow-glow)' : 'none',
                            transition: 'all 0.3s ease'
                          }}
                        >
                          {tag}
                        </span>
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
          )}
        </section>

        <motion.section 
          className={styles.footer}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          <h2>Ready to automate your business processes?</h2>
          <Text as="p" size="lg" color="secondary" className={styles.footerText}>
            Let's discuss how custom n8n workflows can save you time and money. I offer a free consultation to understand your needs.
          </Text>
          <div className={styles.footerButtons}>
            <Button
              href="mailto:jigsawsmma@gmail.com?subject=n8n%20Automation%20Inquiry"
              as="a"
              target="_blank"
              className={styles.contactButton}
              variant="primary"
              size="large"
            >
              Schedule Free Consultation
            </Button>
            
          </div>
        </motion.section>
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

                {/* Workflow visualization section */}
                {selectedProject.hasWorkflow && (
                  <div className={styles.workflowSection}>
                    <div className={styles.workflowHeader}>
                      <Text as="h3">Workflow Visualization</Text>
                      <Button 
                        onClick={toggleWorkflowView}
                        className={styles.workflowToggleButton}
                      >
                        {showWorkflow ? 'Hide Workflow' : 'Show Workflow'}
                      </Button>
                    </div>
                    
                    <div className={styles.workflowContainerWrapper} style={{ minHeight: showWorkflow ? '450px' : '0' }}>
                      <AnimatePresence>
                        {showWorkflow && (
                          <motion.div 
                            className={styles.workflowContainer}
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ 
                              opacity: 1, 
                              height: '450px',
                              transition: { 
                                duration: 0.4,
                                ease: [0.4, 0.0, 0.2, 1] // Use a smooth easing function
                              }
                            }}
                            exit={{ 
                              opacity: 0, 
                              height: 0,
                              transition: { 
                                duration: 0.3,
                                ease: [0.4, 0.0, 0.2, 1]
                              } 
                            }}
                            style={{ 
                              width: '100%', 
                              overflow: 'hidden', 
                              borderRadius: 'var(--radius-lg)',
                              boxShadow: 'var(--shadow-sm)',
                              margin: '20px 0',
                              maxWidth: '100%',
                              border: '1px solid rgba(255, 255, 255, 0.1)'
                            }}
                          >
                            <WorkflowViewer workflowData={selectedProject.workflowData} />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                )}

                <div style={{ marginTop: 'auto', textAlign: 'center' }}>
                  <Button
                    href={`mailto:jigsawsmma@gmail.com?subject=n8n%20Project%20Inquiry:%20${selectedProject.title}`}
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
              onClick={(e) => {
                e.stopPropagation();
                closeFullscreenImage();
              }}
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
              onClick={(e) => e.stopPropagation()}
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
    </motion.div>
  );
} 