import { LogEntry } from '../types';

export const generateId = () => Math.random().toString(36).substr(2, 9);

export const createLog = (action: string, status: LogEntry['status'], details: string): LogEntry => ({
  id: generateId(),
  timestamp: new Date().toLocaleTimeString(),
  action,
  status,
  details
});

export const simulateSystemAction = async (actionName: string): Promise<LogEntry> => {
  const delay = Math.floor(Math.random() * 1500) + 500; // 0.5s to 2s delay
  
  await new Promise(resolve => setTimeout(resolve, delay));
  
  // Random chance of warning (rare)
  const isWarning = Math.random() > 0.95;
  
  return createLog(
    actionName,
    isWarning ? 'warning' : 'success',
    isWarning ? 'Completed with minor warnings. Check details.' : 'Operation executed successfully.'
  );
};

export const downloadLogs = (logs: LogEntry[]) => {
  const content = logs.map(l => `[${l.timestamp}] [${l.status.toUpperCase()}] ${l.action}: ${l.details}`).join('\n');
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `Knoux_CyberGuard_Logs_${Date.now()}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
