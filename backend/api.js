const express = require('express');
const app = express();
app.use(express.json());

// Dummy data
const agents = [
  { id: 'agent1', name: 'Alpha', status: 'active', lastSeen: '2026-03-21T20:00:00Z' },
  { id: 'agent2', name: 'Beta', status: 'offline', lastSeen: '2026-03-21T19:50:00Z' }
];

const tasks = [
  { id: 'task1', agentId: 'agent1', description: 'Scan perimeter', status: 'running', createdAt: '2026-03-21T20:05:00Z' },
  { id: 'task2', agentId: 'agent2', description: 'Report data', status: 'pending', createdAt: '2026-03-21T19:55:00Z' }
];

const logs = [
  { id: 'log1', agentId: 'agent1', message: 'Scan started', timestamp: '2026-03-21T20:06:00Z' },
  { id: 'log2', agentId: 'agent2', message: 'Data report delayed', timestamp: '2026-03-21T20:00:00Z' }
];

// Endpoints

// Get all agent statuses
app.get('/agents', (req, res) => {
  res.json(agents);
});

// Get all tasks
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// Get tasks for an agent
app.get('/agents/:agentId/tasks', (req, res) => {
  const agentId = req.params.agentId;
  const agentTasks = tasks.filter(task => task.agentId === agentId);
  res.json(agentTasks);
});

// Get logs for an agent
app.get('/agents/:agentId/logs', (req, res) => {
  const agentId = req.params.agentId;
  const agentLogs = logs.filter(log => log.agentId === agentId);
  res.json(agentLogs);
});

// Server start
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Mission Control API listening on port ${PORT}`);
});
