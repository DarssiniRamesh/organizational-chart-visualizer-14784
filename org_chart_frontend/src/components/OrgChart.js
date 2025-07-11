import React from 'react';
import { Tree, TreeNode } from 'react-organizational-chart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getRoleIcon } from '../utils/iconMapping';
import { toPng } from 'html-to-image';
import './OrgChart.css';

// Helper function to determine role category
const getRoleCategory = (role) => {
  const roleLower = role.toLowerCase();
  if (roleLower.includes('lead') || roleLower.includes('project lead')) return 'lead';
  if (roleLower.includes('manager')) return 'manager';
  if (roleLower.includes('tech lead') || roleLower.includes('architect')) return 'tech';
  if (roleLower.includes('developer') || roleLower.includes('analyst')) return 'developer';
  if (roleLower.includes('expert')) return 'expert';
  return 'support';
};

// PUBLIC_INTERFACE
const OrgChart = ({ data }) => {
  const [scale, setScale] = React.useState(1);
  const chartRef = React.useRef(null);
  
  React.useEffect(() => {
    const calculateOptimalScale = () => {
      if (!chartRef.current) return;
      
      const chart = chartRef.current;
      const container = chart.parentElement;
      const chartRect = chart.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      
      // Calculate available space with padding
      const availableWidth = containerRect.width - 20;
      const availableHeight = containerRect.height - 20;
      
      // Calculate scales for both dimensions
      const horizontalScale = availableWidth / chartRect.width;
      const verticalScale = availableHeight / chartRect.height;
      
      // Use the smaller scale to ensure chart fits both dimensions
      // Add a minimum scale to prevent excessive shrinking
      const minScale = 0.4;
      const rawScale = Math.min(horizontalScale, verticalScale, 1);
      const optimalScale = Math.max(rawScale, minScale);
      
      // Update scale if it's significantly different
      if (Math.abs(scale - optimalScale) > 0.02) {
        setScale(optimalScale);
        
        // Apply scale transform
        chart.style.setProperty('--chart-scale', optimalScale);
        
        // Center the chart after scaling
        const scaledWidth = chartRect.width * optimalScale;
        const scaledHeight = chartRect.height * optimalScale;
        const translateX = (availableWidth - scaledWidth) / 2;
        const translateY = (availableHeight - scaledHeight) / 2;
        
        chart.style.transform = `scale(${optimalScale}) translate(${translateX / optimalScale}px, ${translateY / optimalScale}px)`;
      }
    };
    
    calculateOptimalScale();
    window.addEventListener('resize', calculateOptimalScale);
    
    return () => window.removeEventListener('resize', calculateOptimalScale);
  }, [scale, data]);
  const handleExport = async () => {
    try {
      if (!chartRef.current) return;
      
      // Reset scale temporarily for high-quality export
      const currentScale = chartRef.current.style.getPropertyValue('--chart-scale');
      chartRef.current.style.setProperty('--chart-scale', '1');
      
      const dataUrl = await toPng(chartRef.current, {
        quality: 1,
        backgroundColor: '#ffffff',
        pixelRatio: 2,
        skipAutoScale: true,
        style: {
          transform: 'none'
        }
      });
      
      // Restore original scale
      chartRef.current.style.setProperty('--chart-scale', currentScale);
      
      const link = document.createElement('a');
      link.download = 'org-chart.png';
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Failed to export chart:', err);
    }
  };

  const renderNode = (person, level = 0) => {
    const roleCategory = getRoleCategory(person.role);
    
    return (
      <div className="org-node" data-role={roleCategory} data-level={level}>
        <div className="org-node-inner">
          <div className="org-node-name">{person.name}</div>
          <div className="org-node-role">
            <FontAwesomeIcon 
              icon={getRoleIcon(person.role)} 
              className="role-icon"
              data-role={roleCategory}
              title={person.role}
            />
            <span className="role-text">{person.role}</span>
          </div>
        </div>
      </div>
    );
  };

  const renderTreeNodes = (nodeData, level = 0) => {
    if (!nodeData) return null;
    
    return (
      <TreeNode label={renderNode(nodeData, level)}>
        {nodeData.children?.map((child, index) => (
          renderTreeNodes(child, level + 1)
        ))}
      </TreeNode>
    );
  };

  return (
    <div className="org-chart" id="org-chart" ref={chartRef}>
      <div className="org-chart-header">
        <h2>Organization Chart</h2>
        <button 
          className="export-button"
          onClick={handleExport}
          aria-label="Export chart as image"
        >
          Export as PNG
        </button>
      </div>
      <div className="org-chart-container">
        <Tree 
          lineWidth={'1px'}
          lineColor={'rgba(0, 0, 0, 0.15)'}
          lineBorderRadius={'4px'}
          nodePadding={'1.5rem'}
        >
          {renderTreeNodes(data[0])}
        </Tree>
      </div>
    </div>
  );
};

export default OrgChart;
