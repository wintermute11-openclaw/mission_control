import React from 'react';
import SubagentOverview from './components/SubagentOverview';

function MissionControlDashboard() {
  return (
    <div style={{ padding: 20 }}>
      <h1>Mission Control Dashboard (Beta)</h1>
      <SubagentOverview />
      <div style={{
        width: '100%',
        height: '400px',
        backgroundColor: '#20232a',
        borderRadius: 10,
        color: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '1.5rem',
        fontWeight: 'bold'
      }}>
        Office Space: Noch keine aktiven Agenten ...
      </div>
    </div>
  );
}

export default MissionControlDashboard;
