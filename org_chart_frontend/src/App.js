import React from 'react';
import OrgChart from './components/OrgChart';
import './App.css';

const orgData = [
  {
    name: 'Brett Ramirez',
    role: 'Project Lead (Overall)',
    children: [
      {
        name: 'Chad Ramirez',
        role: 'Project Manager',
        children: [
          {
            name: 'Suresh Jagannathan',
            role: 'IT Project Manager (Lead Expert)'
          },
          {
            name: 'Malini Srinivasan',
            role: 'Tech Lead'
          },
          {
            name: 'Ravi Rampersad',
            role: 'Project Governance and client support'
          },
          {
            name: 'Dale Connell',
            role: 'Nursing / Maintenance Lead'
          },
          {
            name: 'Shankar S. Narasimhan',
            role: 'Software Architect'
          },
          {
            name: 'Pratima Suresh Kumar',
            role: 'Back-End Developer/Analyst'
          },
          {
            name: 'Mahendra C/ Priyanka Mahajan',
            role: 'Front-End Developer/Analyst/ UX Designer'
          },
          {
            name: 'Dighvijay Giri',
            role: 'IoT Expert'
          },
          {
            name: 'Preetha Balasundaram',
            role: 'Data Engineer/Architect'
          },
          {
            name: 'Ganesh Babu',
            role: 'QA Expert'
          },
          {
            name: 'Sanjay S',
            role: 'Developer'
          },
          {
            name: 'Pon Arun Kumar',
            role: 'Developer'
          },
          {
            name: 'Brandon Murphy',
            role: 'Biodiversity Expert'
          },
          {
            name: 'Brent Barnette',
            role: 'Parametric Insurance Expert/ Training'
          }
        ]
      }
    ]
  }
];

// PUBLIC_INTERFACE
function App() {
  return (
    <div className="App">
      <OrgChart data={orgData} />
    </div>
  );
}

export default App;
