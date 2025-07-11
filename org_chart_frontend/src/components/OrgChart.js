import React from 'react';
import { Tree, TreeNode } from 'react-organizational-chart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getRoleIcon } from '../utils/iconMapping';
import { toPng } from 'html-to-image';
import './OrgChart.css';

// PUBLIC_INTERFACE
const OrgChart = ({ data }) => {
  const handleExport = async () => {
    try {
      const chartElement = document.getElementById('org-chart');
      const dataUrl = await toPng(chartElement, {
        quality: 0.95,
        backgroundColor: '#ffffff'
      });
      
      // Create download link
      const link = document.createElement('a');
      link.download = 'org-chart.png';
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Failed to export chart:', err);
    }
  };

  const renderNode = (person) => {
    return (
      <div className="org-node">
        <div className="org-node-inner">
          <div className="org-node-name">{person.name}</div>
          <div className="org-node-role">
            <FontAwesomeIcon 
              icon={getRoleIcon(person.role)} 
              className="role-icon" 
              title={person.role}
            />
            <span className="role-text">{person.role}</span>
          </div>
        </div>
      </div>
    );
  };

  const renderTreeNodes = (nodeData) => {
    return (
      <TreeNode label={renderNode(nodeData)}>
        {nodeData.children?.map((child, index) => (
          <TreeNode key={index} label={renderNode(child)}>
            {child.children?.map((grandChild, idx) => (
              <TreeNode key={idx} label={renderNode(grandChild)} />
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
          lineWidth={'2px'}
          lineColor={'var(--oc-border)'}
          lineBorderRadius={'10px'}
        >
          {renderTreeNodes(data[0])}
        </Tree>
      </div>
    </div>
  );
};

export default OrgChart;
