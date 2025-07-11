import React from 'react';
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

  const renderPerson = (person) => (
    <tr className="org-chart-row" key={person.name}>
      <td className="org-chart-cell name">{person.name}</td>
      <td className="org-chart-cell role">
        <FontAwesomeIcon 
          icon={getRoleIcon(person.role)} 
          className="role-icon" 
          title={person.role}
        />
        <span className="role-text">{person.role}</span>
      </td>
    </tr>
  );

  const renderHierarchy = (data) => {
    const rows = [];
    
    // Add root person
    rows.push(renderPerson(data[0]));
    
    // Add their direct reports
    if (data[0].children) {
      data[0].children.forEach(child => {
        rows.push(renderPerson(child));
        
        // Add child's direct reports
        if (child.children) {
          child.children.forEach(grandChild => {
            rows.push(renderPerson(grandChild));
          });
        }
      });
    }
    
    return rows;
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
      <table className="org-chart-table">
        <tbody>
          {renderHierarchy(data)}
        </tbody>
      </table>
    </div>
  );
};

export default OrgChart;
