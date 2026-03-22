const express = require('express');
const router = express.Router();

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

// Helper function to find agent by ID
function findAgent(agentId) {
  return agents.find(agent => agent.id === agentId);
}

// Helper function to validate agent data
function validateAgent(data) {
  return typeof data.id === 'string' &&
         typeof data.name === 'string' &&
         typeof data.status === 'string' &&
         (new Date(data.lastSeen)).toString() !== 'Invalid Date';
}

// Helper function to validate task data
function validateTask(data) {
  return typeof data.id === 'string' &&
         typeof data.agentId === 'string' &&
         typeof data.description === 'string' &&
         typeof data.status === 'string' &&
         (new Date(data.createdAt)).toString() !== 'Invalid Date';
}

// Get all agent statuses
router.get('/agents', (req, res) => {
  res.json(agents);
});

// Get all tasks
router.get('/tasks', (req, res) => {
  res.json(tasks);
});

// Get tasks for an agent
router.get('/agents/:agentId/tasks', (req, res) => {
  const agentId = req.params.agentId;
  if (!findAgent(agentId)) {
    return res.status(404).json({ error: 'Agent not found' });
  }
  const agentTasks = tasks.filter(task => task.agentId === agentId);
  res.json(agentTasks);
});

// Get logs for an agent
router.get('/agents/:agentId/logs', (req, res) => {
  const agentId = req.params.agentId;
  if (!findAgent(agentId)) {
    return res.status(404).json({ error: 'Agent not found' });
  }
  const agentLogs = logs.filter(log => log.agentId === agentId);
  res.json(agentLogs);
});

// POST create a new agent
router.post('/agents', (req, res) => {
  const newAgent = req.body;
  if (!validateAgent(newAgent)) {
    return res.status(400).json({ error: 'Invalid agent data' });
  }
  if (findAgent(newAgent.id)) {
    return res.status(409).json({ error: 'Agent with this ID already exists' });
  }
  agents.push(newAgent);
  res.status(201).json(newAgent);
});

// POST create a new task
router.post('/tasks', (req, res) => {
  const newTask = req.body;
  if (!validateTask(newTask)) {
    return res.status(400).json({ error: 'Invalid task data' });
  }
  const agentExists = findAgent(newTask.agentId);
  if (!agentExists) {
    return res.status(404).json({ error: 'Agent for the task not found' });
  }
  tasks.push(newTask);
  res.status(201).json(newTask);
});

module.exports = router;

