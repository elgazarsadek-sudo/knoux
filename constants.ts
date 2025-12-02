import { 
  Shield, Search, Network, Zap, Activity, Bot, Eye, Bug, Lock, FileText,
  HardDrive, Cpu, Wifi, AlertTriangle, Layers, Database, LockKeyhole,
  Terminal, Globe, Server, Trash2, Save, RefreshCw, BarChart2, Image
} from 'lucide-react';
import { Section, TabId } from './types';

export const THEME = {
  colors: {
    bg: '#1a1a1a',
    primary: '#800080',
    accent: '#DDA0DD',
    success: '#00FF00',
    warning: '#FFD700',
    error: '#FF4500',
    text: '#FFFFFF'
  }
};

export const SECTIONS: Section[] = [
  {
    id: TabId.SYSTEM_PROTECTION,
    title: 'System Protection',
    icon: Shield,
    tools: [
      { id: 'sys_harden', name: 'System Hardening', description: 'Enforce GPO policies & disable vulnerable services', icon: Lock, actionType: 'simulation' },
      { id: 'def_max', name: 'Defender Max Mode', description: 'Enable ASR rules & Cloud Protection Level High', icon: Shield, actionType: 'simulation' },
      { id: 'priv_shield', name: 'Privacy Shield', description: 'Block telemetry IPs & DiagTrack service', icon: Eye, actionType: 'simulation' },
      { id: 'anti_malware', name: 'Anti-Malware Scan', description: 'Heuristic memory & persistence scan', icon: Bug, actionType: 'simulation' },
      { id: 'anti_ransom', name: 'Anti-Ransomware', description: 'Minifilter driver for behavioral locking', icon: LockKeyhole, actionType: 'simulation' },
      { id: 'reg_prot', name: 'Registry Protection', description: 'Lock SAM & SYSTEM hives against write', icon: Database, actionType: 'simulation' },
      { id: 'fs_guard', name: 'File System Guard', description: 'Real-time kernel filter for sys32', icon: HardDrive, actionType: 'simulation' },
      { id: 'sec_boot', name: 'Secure Boot Check', description: 'Validate UEFI & TPM 2.0 PCR banks', icon: CheckCircle, actionType: 'simulation' },
      { id: 'usr_sec', name: 'User Account Security', description: 'Audit LSASS & Admin privileges', icon: UserCheck, actionType: 'simulation' },
      { id: 'threat_alert', name: 'Threat Alerts', description: 'Check CVE feeds & Defcon level', icon: AlertTriangle, actionType: 'simulation' },
    ]
  },
  {
    id: TabId.DEEP_SCAN,
    title: 'Deep Scan',
    icon: Search,
    tools: [
      { id: 'full_scan', name: 'Full Disk Scan', description: 'MFT parsing & ADS verification on all volumes', icon: HardDrive, actionType: 'simulation' },
      { id: 'threat_scan', name: 'Threat Scan', description: 'Scan WMI consumers, Task Scheduler & Run keys', icon: AlertTriangle, actionType: 'simulation' },
      { id: 'zeroday_det', name: 'Zero-Day Detection', description: 'Heuristic ROP chain & heap spray detection', icon: Bug, actionType: 'simulation' },
      { id: 'mal_remove', name: 'Malware Removal', description: 'Force terminate & secure delete artifacts', icon: Trash2, actionType: 'simulation' },
      { id: 'rootkit', name: 'Rootkit Scan', description: 'SSDT/IDT hook verification & IRP scan', icon: Layers, actionType: 'simulation' },
      { id: 'file_int', name: 'File Integrity', description: 'SHA-256 verification against known manifests', icon: FileText, actionType: 'simulation' },
      { id: 'heuristic', name: 'Heuristic Analysis', description: 'PE header entropy & sandbox simulation', icon: Activity, actionType: 'simulation' },
      { id: 'quarantine', name: 'Quarantine Manager', description: 'AES-256 encryption & ACL lockdown', icon: Box, actionType: 'simulation' },
      { id: 'sched_scan', name: 'Scheduled Scan', description: 'Task Scheduler integration & idle triggers', icon: Calendar, actionType: 'simulation' },
      { id: 'scan_rep', name: 'Scan Reports', description: 'XML/JSON report generation & export', icon: FileText, actionType: 'simulation' },
    ]
  },
  {
    id: TabId.NETWORK,
    title: 'Network Tools',
    icon: Network,
    tools: [
      { id: 'port_scan', name: 'Port Scanner', description: 'TCP SYN Stealth Scan & Service Versioning', icon: Search, actionType: 'simulation' },
      { id: 'net_mon', name: 'Network Monitor', description: 'Promiscuous Mode Interface & Protocol Analysis', icon: Activity, actionType: 'simulation' },
      { id: 'fw_check', name: 'Firewall Rules', description: 'Audit Windows Filtering Platform (WFP) Rules', icon: Shield, actionType: 'simulation' },
      { id: 'packet', name: 'Packet Sniffer', description: 'Deep Packet Inspection (DPI) & PCAP Dump', icon: Search, actionType: 'simulation' },
      { id: 'vpn_check', name: 'VPN Checker', description: 'Tunnel Integrity, DNS Leak & Cipher Suite Test', icon: Lock, actionType: 'simulation' },
      { id: 'bw_track', name: 'Bandwidth Usage', description: 'Real-time Throughput & Process IO Counters', icon: BarChart2, actionType: 'simulation' },
      { id: 'dev_view', name: 'Connected Devices', description: 'ARP Cache Poisoning Check & MAC OUI Lookup', icon: Server, actionType: 'simulation' },
      { id: 'router_audit', name: 'Router Audit', description: 'Gateway Firmware Vulnerability & UPnP Scan', icon: Wifi, actionType: 'simulation' },
      { id: 'proxy_det', name: 'Proxy Detection', description: 'WinHTTP Proxy Audit & PAC File Analysis', icon: Globe, actionType: 'simulation' },
      { id: 'net_alert', name: 'Network Alerts', description: 'IDS Signature Match & Anomaly Detection', icon: AlertTriangle, actionType: 'simulation' },
    ]
  },
  {
    id: TabId.OPTIMIZER,
    title: 'System Boost',
    icon: Zap,
    tools: [
      { id: 'clean_temp', name: 'Clean Temp', description: 'Remove temporary files', icon: Trash2, actionType: 'simulation' },
      { id: 'clear_cache', name: 'Clear Cache', description: 'Flush system caches', icon: RefreshCw, actionType: 'simulation' },
      { id: 'opt_mem', name: 'Optimize Memory', description: 'Free RAM resources', icon: Cpu, actionType: 'simulation' },
      { id: 'opt_cpu', name: 'Optimize CPU', description: 'Prioritize active tasks', icon: Activity, actionType: 'simulation' },
      { id: 'start_mgr', name: 'Startup Manager', description: 'Speed up boot time', icon: Power, actionType: 'simulation' },
      { id: 'disk_defrag', name: 'Disk Defragmenter', description: 'Optimize drive storage', icon: HardDrive, actionType: 'simulation' },
      { id: 'store_anlz', name: 'Storage Analyzer', description: 'Visualize disk usage', icon: PieChart, actionType: 'simulation' },
      { id: 'bg_proc', name: 'Background Proc', description: 'Kill unused processes', icon: XOctagon, actionType: 'simulation' },
      { id: 'reg_clean', name: 'Registry Cleaner', description: 'Fix registry errors', icon: Database, actionType: 'simulation' },
      { id: 'perf_rep', name: 'Perf Reports', description: 'System health summary', icon: FileText, actionType: 'simulation' },
    ]
  },
  {
    id: TabId.MONITORING,
    title: 'Realtime Monitor',
    icon: Activity,
    tools: [
      { id: 'cpu_use', name: 'CPU Usage', description: 'Monitor processor load', icon: Cpu, actionType: 'chart' },
      { id: 'ram_use', name: 'RAM Usage', description: 'Monitor memory allocation', icon: Database, actionType: 'chart' },
      { id: 'disk_act', name: 'Disk Activity', description: 'Read/Write operations', icon: HardDrive, actionType: 'chart' },
      { id: 'net_act', name: 'Network Activity', description: 'Upload/Download rates', icon: Wifi, actionType: 'chart' },
      { id: 'gpu_use', name: 'GPU Usage', description: 'Graphics processing load', icon: Monitor, actionType: 'chart' },
      { id: 'sys_temp', name: 'System Temp', description: 'Hardware thermals', icon: Thermometer, actionType: 'chart' },
      { id: 'act_proc', name: 'Active Processes', description: 'List running tasks', icon: List, actionType: 'simulation' },
      { id: 'evt_logs', name: 'Event Logs', description: 'System event viewer', icon: FileText, actionType: 'simulation' },
      { id: 'alerts_not', name: 'Alerts & Notify', description: 'Manage notification rules', icon: Bell, actionType: 'simulation' },
      { id: 'dash_ov', name: 'Overview', description: 'Global status dashboard', icon: LayoutDashboard, actionType: 'simulation' },
    ]
  },
  {
    id: TabId.AUTOMATION,
    title: 'Automation',
    icon: Bot,
    tools: [
      { id: 'full_auto', name: 'Run Full Auto', description: 'Execute all protection tasks', icon: PlayCircle, actionType: 'simulation' },
      { id: 'auto_upd', name: 'Auto-Update', description: 'Check for engine updates', icon: RefreshCw, actionType: 'simulation' },
      { id: 'sch_task', name: 'Scheduled Tasks', description: 'Manage automated jobs', icon: Calendar, actionType: 'simulation' },
      { id: 'bg_svc', name: 'Background Svcs', description: 'Service management', icon: Settings, actionType: 'simulation' },
      { id: 'maint_sch', name: 'Maintenance', description: 'Auto-cleanup scheduler', icon: ToolIcon, actionType: 'simulation' },
      { id: 'bkp_auto', name: 'Backup Auto', description: 'Automatic file backup', icon: Save, actionType: 'simulation' },
      { id: 'log_arch', name: 'Log Archiving', description: 'Compress old logs', icon: Archive, actionType: 'simulation' },
      { id: 'upd_not', name: 'Update Notify', description: 'Version alerts', icon: Bell, actionType: 'simulation' },
      { id: 'auto_res', name: 'Auto-Resolve', description: 'Fix common errors', icon: CheckSquare, actionType: 'simulation' },
      { id: 'auto_rep', name: 'Auto Reports', description: 'Generated daily summaries', icon: FileText, actionType: 'simulation' },
    ]
  },
  {
    id: TabId.PRIVACY,
    title: 'Privacy Tools',
    icon: Eye,
    tools: [
      { id: 'vpn_mgr', name: 'VPN Manager', description: 'Secure tunnel config', icon: Lock, actionType: 'simulation' },
      { id: 'brw_clean', name: 'Browser Cleanup', description: 'Wipe history and cache', icon: Trash2, actionType: 'simulation' },
      { id: 'cookie_mgr', name: 'Cookie Manager', description: 'Manage tracking cookies', icon: Cookie, actionType: 'simulation' },
      { id: 'enc_tool', name: 'Encryption', description: 'File encryption utility', icon: LockKeyhole, actionType: 'simulation' },
      { id: 'file_shred', name: 'File Shredder', description: 'Secure permanent delete', icon: Trash2, actionType: 'simulation' },
      { id: 'clip_mon', name: 'Clipboard Monitor', description: 'Clear sensitive data', icon: Clipboard, actionType: 'simulation' },
      { id: 'cam_prot', name: 'Cam/Mic Prot', description: 'Block hardware access', icon: VideoOff, actionType: 'simulation' },
      { id: 'sens_data', name: 'Sensitive Data', description: 'Scan for PII', icon: Search, actionType: 'simulation' },
      { id: 'priv_rep', name: 'Privacy Reports', description: 'Exposure analysis', icon: FileText, actionType: 'simulation' },
      { id: 'anon_chk', name: 'Anonymity Check', description: 'Digital fingerprint', icon: Fingerprint, actionType: 'simulation' },
    ]
  },
  {
    id: TabId.ZERO_DAY,
    title: 'Zero-Day Watch',
    icon: AlertTriangle,
    tools: [
      { id: 'zd_watch', name: 'Zero-Day Watch', description: 'New threat heuristics', icon: Eye, actionType: 'simulation' },
      { id: 'rt_threat', name: 'Realtime Threat', description: 'Live attack blocking', icon: Shield, actionType: 'simulation' },
      { id: 'exploit_mon', name: 'Exploit Mon', description: 'Monitor CVE attempts', icon: Activity, actionType: 'simulation' },
      { id: 'beh_anal', name: 'Behavior Analysis', description: 'Process behavior logic', icon: Cpu, actionType: 'simulation' },
      { id: 'patch_chk', name: 'Patch Checker', description: 'Verify security patches', icon: CheckCircle, actionType: 'simulation' },
      { id: 'threat_intel', name: 'Threat Intel', description: 'Global feed updates', icon: Globe, actionType: 'simulation' },
      { id: 'risk_score', name: 'Risk Scoring', description: 'System vulnerability score', icon: BarChart2, actionType: 'simulation' },
      { id: 'auto_blk', name: 'Auto-Block', description: 'Block suspicious IPs', icon: Slash, actionType: 'simulation' },
      { id: 'not_sys', name: 'Notify System', description: 'Alert configuration', icon: Bell, actionType: 'simulation' },
      { id: 'thr_rep', name: 'Threat Reports', description: 'Incident history', icon: FileText, actionType: 'simulation' },
    ]
  },
  {
    id: TabId.FIREWALL,
    title: 'Firewall',
    icon: Lock,
    tools: [
      { id: 'fw_stat', name: 'Firewall Status', description: 'Service health check', icon: Activity, actionType: 'simulation' },
      { id: 'port_blk', name: 'Port Blocking', description: 'Close dangerous ports', icon: Slash, actionType: 'simulation' },
      { id: 'conn_alrt', name: 'Connection Alerts', description: 'Inbound request notify', icon: Bell, actionType: 'simulation' },
      { id: 'net_iso', name: 'Network ISO', description: 'Emergency internet cut', icon: Scissors, actionType: 'simulation' },
      { id: 'ips', name: 'Intrusion Prev', description: 'IPS System', icon: Shield, actionType: 'simulation' },
      { id: 'rules_ed', name: 'Rules Editor', description: 'Custom firewall rules', icon: Edit, actionType: 'simulation' },
      { id: 'logs_alrt', name: 'Logs & Alerts', description: 'Traffic history', icon: FileText, actionType: 'simulation' },
      { id: 'auto_rules', name: 'Auto Rules', description: 'Smart rule generation', icon: Wand2, actionType: 'simulation' },
      { id: 'adv_filt', name: 'Adv. Filtering', description: 'Deep packet inspection', icon: Filter, actionType: 'simulation' },
      { id: 'def_dash', name: 'Defense Dash', description: 'Visual traffic map', icon: Map, actionType: 'simulation' },
    ]
  },
  {
    id: TabId.REPORTS,
    title: 'Reports & AI',
    icon: FileText,
    tools: [
      { id: 'ai_vis', name: 'AI Visualizer', description: 'Generate threat visuals', icon: Image, actionType: 'ai-gen' },
      { id: 'sec_rep', name: 'Security Reports', description: 'Monthly security summary', icon: Shield, actionType: 'simulation' },
      { id: 'perf_rep_2', name: 'Perf Reports', description: 'Hardware performance', icon: Cpu, actionType: 'simulation' },
      { id: 'thr_rep_2', name: 'Threat Reports', description: 'Malware incidents', icon: Bug, actionType: 'simulation' },
      { id: 'net_rep', name: 'Network Reports', description: 'Bandwidth usage', icon: Wifi, actionType: 'simulation' },
      { id: 'sys_hlt', name: 'System Health', description: 'Overall system score', icon: Heart, actionType: 'simulation' },
      { id: 'exp_log', name: 'Export Logs', description: 'Save logs to CSV/TXT', icon: Download, actionType: 'simulation' },
      { id: 'grph_chrt', name: 'Charts', description: 'Visual analytics', icon: BarChart2, actionType: 'simulation' },
      { id: 'hist_anl', name: 'History Analysis', description: 'Trend prediction', icon: TrendingUp, actionType: 'simulation' },
      { id: 'alrt_sum', name: 'Alerts Summary', description: 'Recent notifications', icon: Bell, actionType: 'simulation' },
    ]
  }
];

// Helper imports for icons used above (needed to avoid 'undefined' errors if I missed imports)
import { 
  CheckCircle, UserCheck, Box, Calendar, Power, PieChart, XOctagon, Monitor, Thermometer, List, Bell, LayoutDashboard, PlayCircle, Settings, Wrench as ToolIcon, Archive, CheckSquare, Cookie, Clipboard, VideoOff, Fingerprint, Slash, Scissors, Edit, Wand2, Filter, Map, Heart, Download, TrendingUp
} from 'lucide-react';