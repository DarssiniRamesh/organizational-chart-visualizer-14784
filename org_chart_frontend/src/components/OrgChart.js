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
  const handleExport = async () => {
    try {
      const chartElement = document.getElementById('org-chart');
      const dataUrl = await toPng(chartElement, {
        quality: 0.95,
        backgroundColor: '#ffffff',
        style: {
          transform: 'scale(1.2)',
          transformOrigin: 'top left'
        }
      });
      
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
    return (
      <TreeNode label={renderNode(nodeData, level)}>
        {nodeData.children?.map((child, index) => (
          <TreeNode key={index} label={renderNode(child, level + 1)}>
            {child.children?.map((grandChild, idx) => (
              <TreeNode key={idx} label={renderNode(grandChild, level + 2)} />
            ))}
          </TreeNode>
        ))}
      </TreeNode>
    );
  };

  return (
    <div className="org-chart" id="org-chart">
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
