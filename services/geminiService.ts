import { GoogleGenAI, Type } from "@google/genai";
import { ImageSize, AspectRatio } from "../types";

// Helper to get the AI client, ensuring we use the latest key
const getAiClient = (): GoogleGenAI => {
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

// Specific technical contexts for tools to ensure realistic output
// Merged contexts for System Protection (Phase 1), Deep Scan (Phase 2), and Network Tools (Phase 3)
const TOOL_CONTEXTS: Record<string, string> = {
  // --- SECTION 1: SYSTEM PROTECTION ---
  'sys_harden': "Focus on GPO (Group Policy Object) modifications, disabling unneeded services (e.g., RemoteRegistry, Telnet), and enforcing NTLMv2. Mention specific registry keys in HKLM\\SOFTWARE\\Policies.",
  'def_max': "Simulate PowerShell 'Set-MpPreference' commands. Mention enabling 'AttackSurfaceReductionRules', 'MAPSReporting', and 'CloudBlockLevel' set to High Plus.",
  'priv_shield': "Focus on blocking telemetry IPs, modifying 'hosts' file, and disabling Windows DiagTrack/Connected User Experiences and Telemetry services.",
  'anti_malware': "Simulate a quick heuristic scan. Mention scanning memory pages, specific DLLs injected in explorer.exe, or checking common persistence locations like Run keys.",
  'anti_ransom': "Mention establishing file system filter drivers (Minifilter), creating honeypot files, and monitoring specific API calls like 'NtWriteFile' or 'vssadmin'.",
  'reg_prot': "Mention locking critical hives (SAM, SECURITY). Report generic write attempts blocked to HKLM\\SYSTEM\\CurrentControlSet\\Services.",
  'fs_guard': "Act as a File System Filter Driver. Log realtime access events to critical system files (drivers, sys32). Mention IRQ levels or handle IDs.",
  'sec_boot': "Verify UEFI Secure Boot state, TPM 2.0 PCR bank hash validation, and check for unsigned kernel drivers.",
  'usr_sec': "Audit LSASS process access, check for 'SeDebugPrivilege', and verify Administrator group membership changes.",
  'threat_alert': "Query external threat intelligence feeds (simulated). Report current DEFCON level or specific active CVE identifiers (e.g., CVE-2024-XXXX) relevant to the OS.",

  // --- SECTION 2: DEEP SCAN ---
  'full_scan': "Simulate parsing the Master File Table ($MFT) and USN Journal. Mention checking Alternate Data Streams (ADS) on NTFS volumes and verifying file descriptors.",
  'threat_scan': "Focus on scanning WMI Event Consumers, Task Scheduler jobs, and 'HKLM\\Software\\Microsoft\\Windows\\CurrentVersion\\Run'. Mention detecting unbacked executable code in memory.",
  'zeroday_det': "Analyze behavioral heuristics. Mention checking for Heap Spraying techniques, ROP (Return-Oriented Programming) gadgets in active threads, or stack pivoting.",
  'mal_remove': "Simulate force-terminating a process ID (PID), unlinking files from the directory entry, wiping free space to prevent recovery, and deleting registry persistence keys.",
  'rootkit': "Simulate hooking the SSDT (System Service Dispatch Table) to check for inline hooks. Verify the IDT (Interrupt Descriptor Table) and scan for hidden IRP handlers.",
  'file_int': "Calculate SHA-256 hashes of critical system binaries (ntoskrnl.exe, svchost.exe, kernel32.dll). Compare against known good manifests (CAT files).",
  'heuristic': "Perform static analysis of PE headers. Check for high entropy sections indicating packed code. Simulate execution in a sandbox environment.",
  'quarantine': "Move file to a secure container. Encrypt the file using AES-256. Modify file ACLs (Access Control Lists) to deny execution and read access.",
  'sched_scan': "Create a scheduled task 'KnouxDeepScan' using COM interfaces. Set triggers for 'Idle' state and configure power conditions (AC only).",
  'scan_rep': "Generate an XML or JSON summary of analysis. Aggregate detected anomalies, hash mismatches, and scan duration. Export to %ProgramData%\\Knoux\\Reports.",

  // --- SECTION 3: NETWORK TOOLS ---
  'port_scan': "Simulate a TCP SYN stealth scan. Mention sending SYN packets to range 1-1024. Report specific open ports (e.g., 445 SMB, 3389 RDP) and service banners.",
  'net_mon': "Enable promiscuous mode on the network interface. Analyze inbound TCP/UDP throughput. Mention tracking specific flows or socket states (ESTABLISHED, LISTENING).",
  'fw_check': "Audit Windows Filtering Platform (WFP) layers. List active blocking rules in the MPSSVC policy. Check for 'Any/Any' inbound allow rules.",
  'packet': "Simulate Deep Packet Inspection (DPI). Dump PCAP header data or hex snippet of suspicious payload. Detect cleartext HTTP or unencrypted headers.",
  'vpn_check': "Verify TAP adapter status and IKEv2/OpenVPN handshake completion. Check for DNS leaks by querying multiple resolvers. Validate AES-256-GCM cipher suite.",
  'bw_track': "Query NetStat or NDIS drivers for per-process bandwidth IO. Report peak Mbps for specific PIDs (e.g., chrome.exe, svchost.exe).",
  'dev_view': "Perform an ARP sweep of the local subnet (192.168.x.x). Resolve MAC addresses to OUI vendors (e.g., Intel, Apple). Detect promiscuous nodes.",
  'router_audit': "Check default gateway for UPnP exposure. Attempt generic credential login (simulated check). Verify firmware version against CVE database.",
  'proxy_det': "Inspect WinHTTP and WinInet proxy settings. Parse PAC (Proxy Auto-Config) files. Detect transparent proxies via traceroute TTL anomalies.",
  'net_alert': "Match network patterns against Snort-style IDS signatures. Detect SYN Flood patterns, port knocking sequences, or Bogon IP traffic."
};

export const generateThreatVisualization = async (
  prompt: string,
  size: ImageSize,
  ratio: AspectRatio
): Promise<string> => {
  const ai = getAiClient();
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-image-preview',
      contents: {
        parts: [{ text: prompt }],
      },
      config: {
        imageConfig: {
          imageSize: size,
          aspectRatio: ratio,
        },
      },
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    
    throw new Error("No image data received from the model.");
  } catch (error) {
    console.error("Gemini Image Gen Error:", error);
    throw error;
  }
};

export const generateToolActivity = async (
  toolId: string,
  toolName: string,
  description: string
): Promise<{ status: 'success' | 'warning' | 'error' | 'info'; details: string }> => {
  const ai = getAiClient();
  
  // Inject specific technical context if available
  const specificContext = TOOL_CONTEXTS[toolId] 
    ? `TECHNICAL REQUIREMENT: ${TOOL_CONTEXTS[toolId]}`
    : "Generate a realistic system log.";

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Act as the kernel-level core engine of Knoux CyberGuard. The user executed the tool "${toolName}" (${description}).
      
      ${specificContext}
      
      Generate a highly technical, realistic, and professional log message (max 15 words) describing the specific action taken or result. Use hex codes, file paths, or specific error codes where appropriate to sound authentic.
      
      Return ONLY valid JSON in this format:
      {
        "status": "success" | "warning" | "error" | "info",
        "details": "The technical log message"
      }`,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            status: { type: Type.STRING, enum: ['success', 'warning', 'error', 'info'] },
            details: { type: Type.STRING }
          }
        }
      }
    });

    if (response.text) {
        const result = JSON.parse(response.text);
        return {
            status: result.status,
            details: result.details
        };
    }
    throw new Error("Empty response");
  } catch (error) {
    console.error("Tool Simulation Error:", error);
    return {
        status: 'info',
        details: `${toolName} cycle completed (Offline Mode).`
    };
  }
};