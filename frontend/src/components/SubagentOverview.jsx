import React from 'react';

const dummySubagents = [
  {
    id: 'bde23829-1de7-44dc-8dae-c6c13fc58e45',
    label: 'Mission Control Backend Agent',
    status: 'done',
    runtime: '1m',
    tokens: 8400,
  },
];

function SubagentOverview() {
  return (
    <div style={{ padding: 10, backgroundColor: '#282c34', color: 'white', borderRadius: 8 }}>
      <h2>Subagenten Übersicht</h2>
      {dummySubagents.length === 0 ? (
        <div>Keine aktiven Subagenten</div>
      ) : (
        <ul>
          {dummySubagents.map((agent) => (
            <li key={agent.id} style={{ marginBottom: 8 }}>
              <strong>{agent.label}</strong> - Status: {agent.status} - Laufzeit: {agent.runtime} - Tokens: {agent.tokens}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SubagentOverview;
