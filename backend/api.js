const express = require('express');
const router = express.Router();

// In-memory dummy data (to be replaced with persistent storage)
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

// --- Helper functions ---

/**
 * Find an agent by ID
 * @param {string} agentId
 * @returns {object|undefined}
 */
function findAgent(agentId) {
  return agents.find(agent => agent.id === agentId);
}

/**
 * Validate agent data for required fields and types
 * @param {object} data
 * @returns {boolean}
 */
function validateAgent(data) {
  return data && typeof data.id === 'string' &&
         typeof data.name === 'string' &&
         typeof data.status === 'string' &&
         (new Date(data.lastSeen)).toString() !== 'Invalid Date';
}

/**
 * Validate task data for required fields and types
 * @param {object} data
 * @returns {boolean}
 */
function validateTask(data) {
  return data && typeof data.id === 'string' &&
         typeof data.agentId === 'string' &&
         typeof data.description === 'string' &&
         typeof data.status === 'string' &&
         (new Date(data.createdAt)).toString() !== 'Invalid Date';
}

// --- API Endpoints ---

// Get all agent statuses
router.get('/agents', (req, res) => {
  res.json(agents);
});

// Get all tasks
router.get('/tasks', (req, res) => {
  res.json(tasks);
});

// Get tasks for a specific agent
router.get('/agents/:agentId/tasks', (req, res) => {
  const agentId = req.params.agentId;
  const agent = findAgent(agentId);
  if (!agent) {
    return res.status(404).json({ error: 'Agent not found' });
  }
  const agentTasks = tasks.filter(task => task.agentId === agentId);
  res.json(agentTasks);
});

// Get logs for a specific agent
router.get('/agents/:agentId/logs', (req, res) => {
  const agentId = req.params.agentId;
  const agent = findAgent(agentId);
  if (!agent) {
    return res.status(404).json({ error: 'Agent not found' });
  }
  const agentLogs = logs.filter(log => log.agentId === agentId);
  res.json(agentLogs);
});

// Create a new agent with validation
router.post('/agents', (req, res) => {
  const newAgent = req.body;
  if (!validateAgent(newAgent)) {
    return res.status(400).json({ error: 'Invalid agent data' });
  }
  if (findAgent(newAgent.id)) {
    return res.status(409).json({ error: 'Agent with this ID already exists' });
  }

  // Add to in-memory storage (replace with DB persistence in future)
  agents.push(newAgent);
  res.status(201).json(newAgent);
});

// Create a new task with validation
router.post('/tasks', (req, res) => {
  const newTask = req.body;
  if (!validateTask(newTask)) {
    return res.status(400).json({ error: 'Invalid task data' });
  }
  const agentExists = findAgent(newTask.agentId);
  if (!agentExists) {
    return res.status(404).json({ error: 'Agent for the task not found' });
  }

  // Add to in-memory storage (replace with DB persistence in future)
  tasks.push(newTask);
  res.status(201).json(newTask);
});

module.exports = router;
