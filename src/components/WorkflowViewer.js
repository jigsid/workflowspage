import React, { useEffect, useState, useMemo, useCallback } from 'react';
import ReactFlow, { 
  Background, 
  Controls, 
  Handle, 
  Position, 
  MarkerType,
  useNodesState, 
  useEdgesState,
  MiniMap,
  Panel
} from 'reactflow';
import 'reactflow/dist/style.css';
import './WorkflowViewer.css';

// Custom node component to match n8n style
const CustomNode = ({ data, isConnectable }) => {
  return (
    <div className="custom-node" style={{ borderColor: data.color, backgroundColor: `${data.color}10` }}>
      <Handle 
        type="target" 
        position={Position.Top} 
        className="node-handle" 
        isConnectable={isConnectable} 
        style={{ backgroundColor: data.color }}
      />
      <div className="node-header" style={{ backgroundColor: data.color }}>
        <span className="node-title">{data.label}</span>
      </div>
      <div className="node-content">
        {data.description && <div className="node-description">{data.description}</div>}
        {data.fields && (
          <div className="node-fields">
            {data.fields.map((field, index) => (
              <div key={index} className="node-field">
                <span className="field-name">{field.name}</span>
                <span className="field-value">{field.value}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      <Handle 
        type="source" 
        position={Position.Bottom} 
        className="node-handle" 
        isConnectable={isConnectable}
        style={{ backgroundColor: data.color }} 
      />
    </div>
  );
};

// Note node for workflow description
const StickyNote = ({ data }) => {
  return (
    <div className="sticky-note" style={{ backgroundColor: `var(--color-${data.color || 1})` }}>
      <div dangerouslySetInnerHTML={{ __html: data.content }} />
    </div>
  );
};

// Define node types to color mapping
const typeToColor = {
  'trigger': '#6956E5',        // Trigger nodes (purple)
  'action': '#FF6B6B',         // Action nodes (red)
  'processing': '#5AAAFA',     // Processing nodes (blue)
  'decision': '#FF9A3C',       // Decision nodes (orange)
  'ai': '#28C76F',             // AI nodes (green)
  'api': '#7367F0',            // API nodes (indigo)
  'database': '#336791',       // Database nodes (blue-gray)
  'whatsapp': '#25D366',       // WhatsApp nodes (green)
  'output': '#FFC600',         // Output nodes (yellow)
  'input': '#FF6B6B'           // Input nodes (red)
};

// Mini-map node color representation
const nodeColor = (node) => {
  if (node.type === 'sticky') return '#f9f9d4';
  return node.data.color || '#888';
};

// Node type definitions for ReactFlow
const nodeTypes = {
  default: CustomNode,
  sticky: StickyNote
};

const WorkflowViewer = ({ workflowData }) => {
  const [nodes, setNodes] = useNodesState([]);
  const [edges, setEdges] = useEdgesState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [workflowInfo, setWorkflowInfo] = useState({
    name: "",
    description: "",
    features: [],
    technology: {}
  });

  // ReactFlow options
  const defaultEdgeOptions = useMemo(() => ({
    type: 'smoothstep',
    animated: true,
    style: { stroke: '#555', strokeWidth: 2 },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 20,
      height: 20,
      color: '#555',
    },
  }), []);

  // First WhatsApp Chatbot flow visualization
  const processFirstWhatsAppChatbot = useCallback(() => {
    // Create nodes for the workflow
    const nodes = [
      {
        id: 'trigger1',
        type: 'default',
        position: { x: 250, y: 0 },
        data: {
          label: 'WhatsApp Webhook',
          description: 'Receives incoming messages from WhatsApp',
          color: typeToColor.trigger,
          fields: [
            { name: 'Event', value: 'New Message' },
            { name: 'API Version', value: 'v2.35.0' }
          ]
        }
      },
      {
        id: 'decision1',
        type: 'default',
        position: { x: 250, y: 150 },
        data: {
          label: 'Message Type?',
          description: 'Determines the type of message received',
          color: typeToColor.decision,
          fields: [
            { name: 'Conditions', value: 'Text/Image/Voice' },
            { name: 'Default', value: 'Unsupported Format' }
          ]
        }
      },
      {
        id: 'process1',
        type: 'default',
        position: { x: 50, y: 300 },
        data: {
          label: 'Text Processing',
          description: 'Processes text messages',
          color: typeToColor.processing,
          fields: [
            { name: 'Operation', value: 'Extract Intent' },
            { name: 'Library', value: 'NLP.js' }
          ]
        }
      },
      {
        id: 'process2',
        type: 'default',
        position: { x: 250, y: 300 },
        data: {
          label: 'Image Processing',
          description: 'Analyzes product images',
          color: typeToColor.processing,
          fields: [
            { name: 'Operation', value: 'Extract Product Info' },
            { name: 'Service', value: 'Google Vision API' }
          ]
        }
      },
      {
        id: 'process3',
        type: 'default',
        position: { x: 450, y: 300 },
        data: {
          label: 'Voice Processing',
          description: 'Transcribes voice messages',
          color: typeToColor.processing,
          fields: [
            { name: 'Operation', value: 'Speech to Text' },
            { name: 'Service', value: 'OpenAI Whisper' }
          ]
        }
      },
      {
        id: 'ai1',
        type: 'default',
        position: { x: 250, y: 450 },
        data: {
          label: 'Vector Search',
          description: 'Searches product database',
          color: typeToColor.database,
          fields: [
            { name: 'Database', value: 'Products Vector DB' },
            { name: 'Engine', value: 'Pinecone' }
          ]
        }
      },
      {
        id: 'ai2',
        type: 'default',
        position: { x: 250, y: 600 },
        data: {
          label: 'AI Sales Agent',
          description: 'Generates sales recommendations',
          color: typeToColor.ai,
          fields: [
            { name: 'Model', value: 'GPT-4' },
            { name: 'Context', value: 'Product Info + Chat History' },
            { name: 'System Prompt', value: 'Act as a helpful sales agent...' }
          ]
        }
      },
      {
        id: 'output1',
        type: 'default',
        position: { x: 250, y: 750 },
        data: {
          label: 'WhatsApp Reply',
          description: 'Sends message back to customer',
          color: typeToColor.whatsapp,
          fields: [
            { name: 'Message Type', value: 'Text + Product Cards' },
            { name: 'API', value: 'WhatsApp Business API' }
          ]
        }
      },
      {
        id: 'workflow-description',
        type: 'sticky',
        position: { x: 0, y: -100 },
        data: {
          content: '<strong>First WhatsApp Chatbot</strong><br>An AI-powered sales agent that can process text, image, and voice inputs to recommend products',
          color: 7
        }
      }
    ];

    // Create edges connecting the nodes
    const edges = [
      { id: 'e1-2', source: 'trigger1', target: 'decision1', animated: true },
      { id: 'e2-3', source: 'decision1', target: 'process1', label: 'Text', animated: true },
      { id: 'e2-4', source: 'decision1', target: 'process2', label: 'Image', animated: true },
      { id: 'e2-5', source: 'decision1', target: 'process3', label: 'Voice', animated: true },
      { id: 'e3-6', source: 'process1', target: 'ai1', animated: true },
      { id: 'e4-6', source: 'process2', target: 'ai1', animated: true },
      { id: 'e5-6', source: 'process3', target: 'ai1', animated: true },
      { id: 'e6-7', source: 'ai1', target: 'ai2', animated: true },
      { id: 'e7-8', source: 'ai2', target: 'output1', animated: true }
    ];

    return { nodes, edges };
  }, []);

  // Advanced WhatsApp AI Assistant flow visualization
  const processAdvancedWhatsAppAI = useCallback(() => {
    // Create nodes for the workflow
    const nodes = [
      {
        id: 'trigger1',
        type: 'default',
        position: { x: 250, y: 0 },
        data: {
          label: 'WhatsApp Business API',
          description: 'Receives incoming messages',
          color: typeToColor.trigger,
          fields: [
            { name: 'Event', value: 'Message Received' },
            { name: 'API Version', value: 'v2.41.0' }
          ]
        }
      },
      {
        id: 'process1',
        type: 'default',
        position: { x: 250, y: 125 },
        data: {
          label: 'Message Router',
          description: 'Routes messages based on content type',
          color: typeToColor.processing,
          fields: [
            { name: 'Types', value: 'Text, Media, Location, Contact' },
            { name: 'Method', value: 'Webhook payload analysis' }
          ]
        }
      },
      {
        id: 'db1',
        type: 'default',
        position: { x: 450, y: 125 },
        data: {
          label: 'User Context Store',
          description: 'Retrieves conversation history',
          color: typeToColor.database,
          fields: [
            { name: 'Data', value: 'User Preferences, History' },
            { name: 'Storage', value: 'MongoDB Atlas' }
          ]
        }
      },
      {
        id: 'process2',
        type: 'default',
        position: { x: 50, y: 250 },
        data: {
          label: 'Media Handler',
          description: 'Processes images, audio, documents',
          color: typeToColor.processing,
          fields: [
            { name: 'Operations', value: 'Extract, Analyze, Store' },
            { name: 'Formats', value: 'Images, Audio, PDF, etc.' }
          ]
        }
      },
      {
        id: 'process3',
        type: 'default',
        position: { x: 250, y: 250 },
        data: {
          label: 'Text Analysis',
          description: 'NLP processing of text messages',
          color: typeToColor.processing,
          fields: [
            { name: 'Operations', value: 'Intent, Sentiment, Entities' },
            { name: 'Library', value: 'OpenAI Embeddings' }
          ]
        }
      },
      {
        id: 'process4',
        type: 'default',
        position: { x: 450, y: 250 },
        data: {
          label: 'Location Processor',
          description: 'Handles location data',
          color: typeToColor.processing,
          fields: [
            { name: 'Operations', value: 'Geocoding, POI Search' },
            { name: 'Service', value: 'Google Maps API' }
          ]
        }
      },
      {
        id: 'ai1',
        type: 'default',
        position: { x: 250, y: 375 },
        data: {
          label: 'AI Assistant',
          description: 'Generates intelligent responses',
          color: typeToColor.ai,
          fields: [
            { name: 'Model', value: 'GPT-4 with Functions' },
            { name: 'Features', value: 'Multi-modal understanding' },
            { name: 'Context Window', value: '128k tokens' }
          ]
        }
      },
      {
        id: 'api1',
        type: 'default',
        position: { x: 50, y: 500 },
        data: {
          label: 'External API',
          description: 'Calls external services if needed',
          color: typeToColor.api,
          fields: [
            { name: 'Services', value: 'Weather, Maps, Search' },
            { name: 'Integration', value: 'Function Calling' }
          ]
        }
      },
      {
        id: 'db2',
        type: 'default',
        position: { x: 450, y: 500 },
        data: {
          label: 'Response Templates',
          description: 'Pre-defined message templates',
          color: typeToColor.database,
          fields: [
            { name: 'Types', value: 'Text, Rich Media, Interactive' },
            { name: 'Storage', value: 'JSON Templates' }
          ]
        }
      },
      {
        id: 'process5',
        type: 'default',
        position: { x: 250, y: 625 },
        data: {
          label: 'Response Formatter',
          description: 'Formats response for WhatsApp',
          color: typeToColor.processing,
          fields: [
            { name: 'Formats', value: 'Text, Buttons, Lists, Media' },
            { name: 'Optimization', value: 'Engagement-focused' }
          ]
        }
      },
      {
        id: 'output1',
        type: 'default',
        position: { x: 250, y: 750 },
        data: {
          label: 'WhatsApp Message Sender',
          description: 'Sends response back to user',
          color: typeToColor.whatsapp,
          fields: [
            { name: 'Delivery', value: 'Immediate/Scheduled' },
            { name: 'API', value: 'Cloud API' }
          ]
        }
      },
      {
        id: 'workflow-description',
        type: 'sticky',
        position: { x: 0, y: -100 },
        data: {
          content: '<strong>Advanced WhatsApp AI Assistant</strong><br>A sophisticated AI system that processes various message types and provides helpful responses',
          color: 3
        }
      }
    ];

    // Create edges connecting the nodes
    const edges = [
      { id: 'e1-2', source: 'trigger1', target: 'process1', animated: true },
      { id: 'e1-3', source: 'trigger1', target: 'db1', animated: true, label: 'Get Context' },
      { id: 'e2-4', source: 'process1', target: 'process2', label: 'Media', animated: true },
      { id: 'e2-5', source: 'process1', target: 'process3', label: 'Text', animated: true },
      { id: 'e2-6', source: 'process1', target: 'process4', label: 'Location', animated: true },
      { id: 'e3-7', source: 'db1', target: 'ai1', animated: true },
      { id: 'e4-7', source: 'process2', target: 'ai1', animated: true },
      { id: 'e5-7', source: 'process3', target: 'ai1', animated: true },
      { id: 'e6-7', source: 'process4', target: 'ai1', animated: true },
      { id: 'e7-8', source: 'ai1', target: 'api1', label: 'If needed', animated: true },
      { id: 'e7-10', source: 'ai1', target: 'process5', animated: true },
      { id: 'e8-10', source: 'api1', target: 'process5', animated: true },
      { id: 'e9-10', source: 'db2', target: 'process5', animated: true, label: 'Apply template' },
      { id: 'e10-11', source: 'process5', target: 'output1', animated: true }
    ];

    return { nodes, edges };
  }, []);

  // Fetch workflow data from JSON file
  const fetchWorkflowData = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/data/${workflowData}.json`);
      if (!response.ok) {
        console.error(`Failed to fetch workflow data: ${response.status} ${response.statusText}`);
        throw new Error(`Failed to fetch workflow data: ${response.status}`);
      }
      
      const data = await response.json();
      setWorkflowInfo(data);
      
      // Process nodes with n8n styling
      const processedNodes = data.nodes.map(node => ({
        id: node.id,
        type: 'default',
        position: { x: node.position[0], y: node.position[1] },
        data: {
          label: node.name,
          description: node.description,
          color: typeToColor[node.type] || '#336791',
          fields: node.fields || []
        }
      }));
      
      // Add a sticky note with workflow description
      processedNodes.push({
        id: 'workflow-description',
        type: 'sticky',
        position: { x: 0, y: -100 },
        data: {
          content: `<strong>${data.name}</strong><br>${data.description}`,
          color: data.color || 7
        }
      });
      
      // Process edges with animation and labels
      const processedEdges = data.connections.map((connection, index) => ({
        id: `e${index}`,
        source: connection.source,
        target: connection.target,
        label: connection.label || '',
        animated: true,
        type: 'smoothstep',
        markerEnd: {
          type: MarkerType.ArrowClosed,
        }
      }));
      
      setNodes(processedNodes);
      setEdges(processedEdges);
    } catch (error) {
      console.error("Error loading workflow data:", error);
      
      // Show a clear error message to the user
      setWorkflowInfo({
        name: "Workflow Visualization Error",
        description: "Unable to load the workflow data. Using a pre-built fallback visualization instead.",
        features: ["Fallback Visualization", "Basic Workflow Structure", "Core Components"],
        technology: {
          platform: "n8n",
          error: error.message
        }
      });
      
      // Fall back to the built-in workflow visualization if JSON loading fails
      if (workflowData === 'first-whatsapp-chatbot') {
        const flowData = processFirstWhatsAppChatbot();
        setNodes(flowData.nodes);
        setEdges(flowData.edges);
      } else if (workflowData === 'advanced-whatsapp-ai') {
        const flowData = processAdvancedWhatsAppAI();
        setNodes(flowData.nodes);
        setEdges(flowData.edges);
      }
    } finally {
      setIsLoading(false);
    }
  }, [workflowData, setNodes, setEdges, setWorkflowInfo, processFirstWhatsAppChatbot, processAdvancedWhatsAppAI]);

  // Set workflow data when workflowData changes
  useEffect(() => {
    fetchWorkflowData();
  }, [fetchWorkflowData]);

  const onNodeClick = useCallback((event, node) => {
    // Focus on the clicked node (optional feature)
    console.log("Node clicked:", node);
  }, []);

  if (isLoading) {
    return <div className="loading">Loading workflow...</div>;
  }

  return (
    <div className="workflow-viewer-container">
      <div className="reactflow-wrapper" style={{ height: '100%', width: '100%' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          defaultEdgeOptions={defaultEdgeOptions}
          fitView
          minZoom={0.1}
          maxZoom={1.5}
          attributionPosition="bottom-right"
          onNodeClick={onNodeClick}
        >
          <Controls showInteractive={false} />
          <MiniMap 
            nodeColor={nodeColor} 
            maskColor="rgba(0, 0, 0, 0.05)"
            style={{ right: 10, bottom: 10 }}
            zoomable={true}
            pannable={true}
            height={80}
            width={140}
          />
          <Background color="#aaa" gap={16} size={1} />
          <Panel position="top-left">
            <div className="workflow-panel-header">
              <strong>{workflowInfo.name}</strong>
              <span className="workflow-type-badge">n8n Workflow</span>
            </div>
          </Panel>
        </ReactFlow>
      </div>
      <div className="workflow-details">
        <div className="workflow-info">
          <h3>{workflowInfo.name}</h3>
          <p>{workflowInfo.description}</p>
        </div>
        <div className="workflow-features">
          <h4>Features</h4>
          <ul>
            {workflowInfo.features && workflowInfo.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>
        <div className="workflow-technology">
          <h4>Technology</h4>
          <div className="technology-grid">
            {workflowInfo.technology && Object.entries(workflowInfo.technology).map(([key, value], index) => (
              <div key={index} className="technology-item">
                <span className="technology-label">{key}</span>
                <span className="technology-value">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkflowViewer; 