import React, { useState } from 'react';
import { 
  Users, 
  Ban, 
  History, 
  UserCog, 
  BarChart3, 
  Search,
  Shield,
  MapPin,
  Wifi,
  AlertCircle,
  MessageSquare,
  Eye,
  Zap,
  Database,
  AlertTriangle,
  Trash2,
  ArrowUpDown,
  Crosshair,
  MessageCircle,
  Activity,
  Car,
  Package,
  Plus,
  Minus,
  Edit,
  UserCheck,
  ChevronRight,
  ChevronLeft,
  LogOut,
  Lock,
  Server,
  FileText,
  Clock
} from 'lucide-react';

type Player = {
  id: number;
  name: string;
  steam: string;
  discord: string;
  ip: string;
  ping: number;
  money: {
    cash: number;
    bank: number;
    black: number;
  };
  job: string;
  rank: string;
  position: {
    x: number;
    y: number;
  };
};

type Ban = {
  id: number;
  playerName: string;
  steam: string;
  reason: string;
  admin: string;
  duration: string;
  timestamp: string;
};

type LogEntry = {
  id: number;
  timestamp: string;
  type: 'money' | 'combat' | 'vehicle' | 'item';
  player: string;
  action: string;
  details: string;
};

type Role = {
  id: number;
  name: string;
  permissions: string[];
  members: number;
};

type Vehicle = {
  id: number;
  model: string;
  plate: string;
  owner: string;
  location: {
    x: number;
    y: number;
  };
  condition: number;
  fuel: number;
  stored: boolean;
};

type Item = {
  id: number;
  name: string;
  type: 'weapon' | 'drug' | 'money' | 'misc';
  quantity: number;
  owner: string;
  quality?: number;
};

const mockPlayers: Player[] = [
  {
    id: 1,
    name: "John_Doe",
    steam: "STEAM_0:1:123456789",
    discord: "JohnD#1234",
    ip: "192.168.1.1",
    ping: 45,
    money: {
      cash: 15000,
      bank: 50000,
      black: 5000
    },
    job: "Police",
    rank: "Officer",
    position: {
      x: 1234,
      y: 5678
    }
  },
  {
    id: 2,
    name: "Jane_Smith",
    steam: "STEAM_0:1:987654321",
    discord: "JaneS#5678",
    ip: "192.168.1.2",
    ping: 150,
    money: {
      cash: 25000,
      bank: 75000,
      black: 10000
    },
    job: "Mechanic",
    rank: "Senior",
    position: {
      x: 2345,
      y: 6789
    }
  }
];

const mockBans: Ban[] = [
  {
    id: 1,
    playerName: "Cheater123",
    steam: "STEAM_0:1:55555555",
    reason: "Using money hack",
    admin: "AdminJohn",
    duration: "Permanent",
    timestamp: "2024-03-10 15:30",
  },
  {
    id: 2,
    playerName: "SpeedHacker",
    steam: "STEAM_0:1:66666666",
    reason: "Speed exploitation",
    admin: "AdminSarah",
    duration: "24h",
    timestamp: "2024-03-11 12:45",
  }
];

const mockLogs: LogEntry[] = [
  {
    id: 1,
    timestamp: "2024-03-11 14:30",
    type: "money",
    player: "John_Doe",
    action: "Transfer",
    details: "Sent $5000 to Jane_Smith"
  },
  {
    id: 2,
    timestamp: "2024-03-11 14:35",
    type: "combat",
    player: "Jane_Smith",
    action: "Kill",
    details: "Killed John_Doe with Weapon_Pistol"
  }
];

const mockRoles: Role[] = [
  {
    id: 1,
    name: "Super Admin",
    permissions: ["all"],
    members: 3
  },
  {
    id: 2,
    name: "Moderator",
    permissions: ["kick", "ban", "teleport"],
    members: 5
  }
];

const mockVehicles: Vehicle[] = [
  {
    id: 1,
    model: "Adder",
    plate: "ABC 123",
    owner: "John_Doe",
    location: { x: 1234, y: 5678 },
    condition: 95,
    fuel: 80,
    stored: false
  },
  {
    id: 2,
    model: "Sultan RS",
    plate: "XYZ 789",
    owner: "Jane_Smith",
    location: { x: 2345, y: 6789 },
    condition: 75,
    fuel: 45,
    stored: true
  }
];

const mockItems: Item[] = [
  {
    id: 1,
    name: "Weapon_Pistol",
    type: "weapon",
    quantity: 1,
    owner: "John_Doe",
    quality: 100
  },
  {
    id: 2,
    name: "Cocaine",
    type: "drug",
    quantity: 50,
    owner: "Jane_Smith",
    quality: 85
  }
];

function Sidebar({ activePage, setActivePage, onToggle, loggedInUser, userRole }: { activePage: string; setActivePage: (page: string) => void; onToggle: (collapsed: boolean) => void, loggedInUser: string | null, userRole: string | null }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { name: "Dashboard", icon: BarChart3, page: "dashboard" },
    { name: "Players", icon: Users, page: "players" },
    { name: "Vehicles", icon: Car, page: "vehicles" },
    { name: "Items", icon: Package, page: "items" },
    { name: "Bans", icon: Ban, page: "bans" },
    { name: "Logs", icon: History, page: "logs" },
    { name: "Roles", icon: UserCog, page: "roles" },
    { name: "Server", icon: AlertCircle, page: "server" },
    { name: "Warnings", icon: AlertTriangle, page: "warnings" },
  ];

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
    onToggle(!isCollapsed);
  };

  const handleLogout = () => {
    const rippleContainer = document.createElement("div");
    rippleContainer.className = "fixed inset-0 pointer-events-none overflow-hidden z-50";
    document.body.appendChild(rippleContainer);

    const x = window.innerWidth / 2;
    const y = window.innerHeight / 2;

    const ripple = document.createElement("div");
    ripple.className = "absolute rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 animate-ripple";
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.style.width = "40px";
    ripple.style.height = "40px";
    ripple.style.transform = "translate(-50%, -50%)";
    rippleContainer.appendChild(ripple);

    setTimeout(() => {
      const overlay = document.createElement("div");
      overlay.className = "fixed inset-0 bg-gradient-to-br from-blue-900 via-black to-indigo-900 flex flex-col items-center justify-center z-50 animate-fadeIn";

      const logoutMessage = document.createElement("div");
      logoutMessage.className = "text-center text-white text-6xl font-extrabold tracking-wide animate-fadeInSlow";
      logoutMessage.textContent = "Goodbye, AdminUser.";
      overlay.appendChild(logoutMessage);

      document.body.appendChild(overlay);

      setTimeout(() => {
        logoutMessage.textContent = "Logging out...";
        logoutMessage.className = "text-center text-white text-4xl font-bold animate-fadeIn";
      }, 3000);

      setTimeout(() => {
        overlay.classList.replace("animate-fadeIn", "animate-fadeOut");
        setTimeout(() => {
          document.body.removeChild(rippleContainer);
          document.body.removeChild(overlay);
        }, 1000);

        const logoutUI = document.createElement("div");
        logoutUI.className = "fixed inset-0 bg-gradient-to-br from-blue-900 via-gray-900 to-black flex flex-col items-center justify-center text-white z-50";
        logoutUI.innerHTML = `
          <h1 class="text-5xl font-bold mb-4 animate-fadeIn">You have been logged out</h1>
          <p class="text-lg mb-8 text-gray-300 animate-fadeInSlow">Thank you for using the Admin Hub. See you next time!</p>
          <button class="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all shadow-lg font-semibold transform hover:scale-105 animate-pulse">
            Return to Login
          </button>
        `;
        document.body.appendChild(logoutUI);

        const button = logoutUI.querySelector("button");
        button?.addEventListener("click", () => {
          window.location.reload();
        });
      }, 5000);
    }, 1000);

    setTimeout(() => {
      rippleContainer.remove();
    }, 2000);
  };

  return (
    <>
      <div className="absolute top-4 right-4 bg-gray-900 p-4 rounded-lg shadow-lg flex items-center gap-4 z-50">
        <div className="text-center">
          <p className="text-sm font-medium text-gray-300 flex items-center">
            Logged in as
            <span
              className="line"
              style={{
                border: "0.1vw solid #23a0ff",
                background: "radial-gradient(122.22% 122.22% at 50% 50%, #2395ff 0%, rgba(255, 193, 35, 0) 100%)",
                boxShadow: "0px 0px 2vw 0px #238dff",
                width: "0.4vw",
                height: "1vw",
                marginLeft: "0.8vw",
                marginRight: "0.8vw",
              }}
            ></span>
            {loggedInUser || "Unknown User"}
          </p>
          <p className="text-xs text-gray-400">
            Role: <span className="text-blue-400">{userRole || "Unknown Role"}</span>
          </p>
        </div>
        <LogOut
          onClick={handleLogout}
          className="w-6 h-6 text-red-500 cursor-pointer hover:text-red-600 transition-transform transform hover:scale-105"
        />
      </div>
      <div
        className={`sidebar h-screen fixed left-2 top-2 text-white flex flex-col justify-between transition-all ${
          isCollapsed ? "w-20" : "w-64"
        }`}
        style={{ zIndex: 10 }}
      >
        <div>
          <div className={`flex items-center gap-2 p-4 ${isCollapsed ? "justify-center" : ""}`}>
            <Shield className="w-9 h-9 text-blue-500 animate-pulse " />
            {!isCollapsed && <h1 className="text-lg font-semibold">Admin Hub</h1>}
          </div>

          <nav className="mt-4 space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.page}
                onClick={() => setActivePage(item.page)}
                className={`flex items-center gap-2 w-full p-2 rounded-md transition-all ${
                  activePage === item.page
                    ? "bg-blue-600 text-white"
                    : "hover:bg-gray-700 bg-transparent text-gray-300"
                } ${isCollapsed ? "justify-center" : ""}`}
              >
                <item.icon className="w-5 h-5" />
                {!isCollapsed && (
                  <>
                    <span
                      className="line"
                      style={{
                        border: "0.1vw solid #23a0ff",
                        background: "radial-gradient(122.22% 122.22% at 50% 50%, #2395ff 0%, rgba(255, 193, 35, 0) 100%)",
                        boxShadow: "0px 0px 2vw 0px #238dff",
                        width: "0.4vw",
                        height: "1vw",
                        marginLeft: "0.8vw",
                        marginRight: "0.8vw",
                      }}
                    ></span>
                    <span className="text-sm">{item.name}</span>
                  </>
                )}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-4 border-t border-gray-700 flex justify-start w-full"></div>
        <div className="p-4 flex justify-start">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center transition-all duration-300 ease-in-out transform shadow-md"
            style={{ position: "fixed", left: "30px", bottom: "10px" }}
            title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            {isCollapsed ? (
              <ChevronRight className="w-6 h-6" />
            ) : (
              <ChevronLeft className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>
    </>
  );
}

function Modal({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
      <div className="modal rounded-lg shadow-lg p-6 w-full max-w-md relative z-10">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-200 transition-transform transform hover:scale-110"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
}

function PlayerActionsModal({ player, action, onClose }: { player: Player; action: string; onClose: () => void }) {
  return (
    <Modal onClose={onClose}>
      <h2 className="text-xl font-bold mb-4">{action} Player</h2>
      <p className="mb-4">Perform the action "{action}" on player <strong>{player.name}</strong>.</p>
      
      {action === "Message" && (
        <form className="space-y-4">
          <textarea
            placeholder="Enter your message..."
            className="w-full p-2 border rounded"
          />
          <button type="submit" className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Send Message
          </button>
        </form>
      )}

      {action === "Ban" && (
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Reason"
            className="w-full p-2 border rounded"
          />
          <select className="w-full p-2 border rounded">
            <option value="1h">1 Hour</option>
            <option value="12h">12 Hours</option>
            <option value="24h">24 Hours</option>
            <option value="permanent">Permanent</option>
          </select>
          <button type="submit" className="w-full px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
            Issue Ban
          </button>
        </form>
      )}

      {action === "Teleport" && (
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Enter coordinates (x, y)"
            className="w-full p-2 border rounded"
          />
          <button type="submit" className="w-full px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600">
            Teleport Player
          </button>
        </form>
      )}

      {action === "Kick" && (
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Reason"
            className="w-full p-2 border rounded"
          />
          <button type="submit" className="w-full px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600">
            Kick Player
          </button>
        </form>
      )}

      {action === "Warn" && (
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Reason"
            className="w-full p-2 border rounded"
          />
          <button type="submit" className="w-full px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600">
            Warn Player
          </button>
        </form>
      )}

      <div className="flex justify-end gap-4 mt-4">
        <button onClick={onClose}               className="px-4 py-2 bg-gray-800 rounded hover:bg-gray-850"
        >Cancel</button>
      </div>
    </Modal>
  );
}

function CensoredInfo({ label, value }: { label: string; value: string }) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div>
      <strong>{label}:</strong>{" "}
      {isVisible ? (
        value
      ) : (
        <span className="text-gray-500">[REDACTED]</span>
      )}
      {!isVisible && (
        <button
          onClick={() => setIsVisible(true)}
          className="ml-2 text-blue-500 underline text-sm"
        >
          Show
        </button>
      )}
    </div>
  );
}

function PlayerDetails({ player }: { player: Player }) {
  return (
    <div className="card rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold mb-4 text-gray-100">Player Details</h2>
      <div className="space-y-4">
        <div>
          <h3 className="font-semibold text-gray-300">Basic Info</h3>
          <CensoredInfo label="Steam" value={player.steam} />
          <CensoredInfo label="Discord" value={player.discord} />
          <CensoredInfo label="IP" value={player.ip} />
        </div>
        <div>
          <h3 className="font-semibold text-gray-300">Status</h3>
          <p><strong>Ping:</strong> {player.ping}ms</p>
          <p><strong>Job:</strong> {player.job}</p>
          <p><strong>Rank:</strong> {player.rank}</p>
        </div>
        <div>
          <h3 className="font-semibold text-gray-300">Money</h3>
          <p><strong>Cash:</strong> ${player.money.cash}</p>
          <p><strong>Bank:</strong> ${player.money.bank}</p>
          <p><strong>Black:</strong> ${player.money.black}</p>
        </div>
        <div>
          <h3 className="font-semibold text-gray-300">Position</h3>
          <p><strong>Coordinates:</strong> {player.position.x}, {player.position.y}</p>
        </div>
      </div>
    </div>
  );
}

function PlayerList({
  setActivePage,
  setSelectedPlayer,
}: {
  setActivePage: (page: string) => void;
  setSelectedPlayer: (player: Player | null) => void;
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPlayer, setLocalSelectedPlayer] = useState<Player | null>(null);
  const [action, setAction] = useState<string | null>(null);

  const filteredPlayers = mockPlayers.filter((player) =>
    player.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-dark rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Live Players</h2>
        <div className="flex gap-4">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search players..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
            <thead className="bg-gray-900 border border-gray-700 rounded-t-lg">
            <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider">Player</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider">Location</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider">Money</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider">Actions</th>
            </tr>
            </thead>
          <tbody className="bg-dark divide-y divide-gray-200">
            {filteredPlayers.map((player) => (
              <tr key={player.id} className="hover:bg-gray-50 transition-all duration-200 ease-in-out">
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div>
                      <div className="font-medium text-gray-50">{player.name}</div>
                      <CensoredInfo label="Steam" value={player.steam} />
                      <CensoredInfo label="Discord" value={player.discord} />
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <Wifi className={`w-4 h-4 mr-2 ${player.ping > 100 ? 'text-red-500' : 'text-green-500'} animate-pulse`} />
                    <span>{player.ping}ms</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2 text-gray-500" />
                    <span>{player.position.x}, {player.position.y}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div>
                    <div className="text-sm">Cash: ${player.money.cash}</div>
                    <div className="text-sm">Bank: ${player.money.bank}</div>
                    <div className="text-sm text-gray-500">Black: ${player.money.black}</div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => {
                        setSelectedPlayer(player);
                        setActivePage("PlayerDetails");
                      }}
                      className="p-1 hover:bg-gray-800 rounded transition-transform transform hover:scale-110" title="View"
                    >
                      <Eye className="w-5 h-5 text-blue-500" />
                    </button>
                    <button
                      onClick={() => {
                        setLocalSelectedPlayer(player);
                        setAction("Ban");
                      }}
                      className="p-1 hover:bg-gray-800 rounded transition-transform transform hover:scale-110" title="Ban"
                    >
                      <Ban className="w-5 h-5 text-red-500" />
                    </button>
                    <button 
                      onClick={() => {
                        setLocalSelectedPlayer(player);
                        setAction("Kick");
                      }}
                      className="p-1 hover:bg-gray-800 rounded transition-transform transform hover:scale-110" title="Kick"
                    >
                      <UserCheck className="w-5 h-5 text-yellow-500" />
                    </button>
                    <button
                      onClick={() => {
                        setLocalSelectedPlayer(player);
                        setAction("Warn");
                      }}
                      className="p-1 hover:bg-gray-800 rounded transition-transform transform hover:scale-110" title="Warn"
                    >
                      <AlertCircle className="w-5 h-5 text-orange-500" />
                    </button>
                    <button
                      onClick={() => {
                        setLocalSelectedPlayer(player);
                        setAction("Message");
                      }}
                      className="p-1 hover:bg-gray-800 rounded transition-transform transform hover:scale-110" title="Message"
                    >
                      <MessageSquare className="w-5 h-5 text-green-500" />
                    </button>
                    <button
                      onClick={() => {
                        setLocalSelectedPlayer(player);
                        setAction("Teleport");
                      }}
                      className="p-1 hover:bg-gray-800 rounded transition-transform transform hover:scale-110" title="Teleport"
                    >
                      <Crosshair className="w-5 h-5 text-purple-500" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedPlayer && action && (
        <PlayerActionsModal
          player={selectedPlayer}
          action={action}
          onClose={() => {
            setLocalSelectedPlayer(null);
            setAction(null);
          }}
        />
      )}
    </div>
  );
}

function BanList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBan, setSelectedBan] = useState<Ban | null>(null);
  const [showBanForm, setShowBanForm] = useState(false);

  const filteredBans = mockBans.filter((ban) =>
    ban.playerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="bg-dark rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Ban Management</h2>
          <div className="flex gap-4">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search bans..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              onClick={() => setShowBanForm((prev) => !prev)}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Issue Ban
            </button>
          </div>
        </div>

        {showBanForm && (
          <div className="mb-6 p-4 border rounded-lg bg-gray-800">
            <h3 className="font-semibold mb-4">Issue New Ban</h3>
            <form className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <input
                type="text"
                placeholder="Player Name/Steam ID"
                className="p-2 border rounded focus:ring-2 focus:ring-red-500"
              />
              <input
                type="text"
                placeholder="Reason"
                className="p-2 border rounded focus:ring-2 focus:ring-red-500"
              />
              <select className="p-2 border rounded focus:ring-2 focus:ring-red-500">
                <option value="1h">1 Hour</option>
                <option value="12h">12 Hours</option>
                <option value="24h">24 Hours</option>
                <option value="permanent">Permanent</option>
              </select>
              <button type="submit" className="bg-red-500 text-white p-2 rounded hover:bg-red-600">
                Issue Ban
              </button>
            </form>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full">
                        <thead className="bg-gray-900 border border-gray-700 rounded-t-lg">

              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider">Player</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider">Steam</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider">Reason</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider">Admin</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider">Duration</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-dark divide-y divide-gray-200">
              {filteredBans.map((ban) => (
                <tr key={ban.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="font-medium">{ban.playerName}</div>
                  </td>
                  <td className="px-6 py-4">
                    <CensoredInfo label="Steam" value={ban.steam} />
                  </td>
                  <td className="px-6 py-4">{ban.reason}</td>
                  <td className="px-6 py-4">{ban.admin}</td>
                  <td className="px-6 py-4">{ban.duration}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => setSelectedBan(ban)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedBan && (
        <Modal onClose={() => setSelectedBan(null)}>
          <h2 className="text-xl font-bold mb-4">Delete Ban</h2>
          <p className="mb-4">
            Are you sure you want to delete the ban for <strong>{selectedBan.playerName}</strong>?
          </p>
          <div className="flex justify-end gap-4">
            <button
              onClick={() => setSelectedBan(null)}
              className="px-4 py-2 bg-gray-800 rounded hover:bg-gray-850"
            >
              Cancel
            </button>
            <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
              Delete Ban
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}

function LogsList() {
  const [logType, setLogType] = useState("all");
  const [timeRange, setTimeRange] = useState("24h");

  return (
    <div className="space-y-6">
      <div className="bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold mb-4 text-gray-100">Server Logs</h2>
        <div className="flex flex-wrap gap-4 justify-between items-center mb-6">
          <select
            value={logType}
            onChange={(e) => setLogType(e.target.value)}
            className="p-2 border rounded bg-gray-700 text-gray-200 border-gray-600"
          >
            <option value="all">All Logs</option>
            <option value="money">Money Transfers</option>
            <option value="combat">Combat</option>
            <option value="vehicle">Vehicle</option>
            <option value="item">Items</option>
          </select>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="p-2 border rounded bg-gray-700 text-gray-200 border-gray-600"
          >
            <option value="1h">Last Hour</option>
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
          </select>
        </div>

        <div className="space-y-4">
          {mockLogs.map((log) => (
            <div
              key={log.id}
              className="flex items-center gap-4 p-4 bg-gray-700 rounded-lg shadow hover:shadow-md transition-shadow"
            >
              <div
                className={`p-3 rounded-full ${
                  log.type === "money"
                    ? "bg-green-600 text-green-100"
                    : log.type === "combat"
                    ? "bg-red-600 text-red-100"
                    : "bg-blue-600 text-blue-100"
                }`}
              >
                <Activity className="w-6 h-6" />
              </div>
              <div>
                <p className="font-medium text-gray-200">{log.action}</p>
                <p className="text-sm text-gray-400">{log.details}</p>
              </div>
              <span className="ml-auto text-sm text-gray-400">{log.timestamp}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function RolesList() {
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [showRoleForm, setShowRoleForm] = useState(false);

  return (
    <div className="space-y-6">
      <div className="bg-dark rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Role Management</h2>
          <button
            onClick={() => setShowRoleForm(!showRoleForm)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Role
          </button>
        </div>

        {showRoleForm && (
          <div className="mb-6 p-4 border rounded-lg bg-gray-800">
            <h3 className="font-semibold mb-4">Create New Role</h3>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Role Name"
                className="p-2 border rounded focus:ring-2 focus:ring-blue-500"
              />
              <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
                Create Role
              </button>
            </form>
          </div>
        )}

        <div className="space-y-4">
          {mockRoles.map((role) => (
            <div key={role.id} className="border rounded-lg p-4 bg-dark">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="text-lg font-semibold">{role.name}</h3>
                  <p className="text-sm text-gray-500">{role.members} members</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedRole(role)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Permissions</h4>
                <div className="flex flex-wrap gap-2">
                  {role.permissions.map((permission, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-gray-750 rounded text-sm"
                    >
                      {permission}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedRole && (
        <Modal onClose={() => setSelectedRole(null)}>
          <h2 className="text-xl font-bold mb-4">Delete Role</h2>
          <p className="mb-4">
            Are you sure you want to delete the role <strong>{selectedRole.name}</strong>?
          </p>
          <div className="flex justify-end gap-4">
            <button
              onClick={() => setSelectedRole(null)}
              className="px-4 py-2 bg-gray-800 rounded hover:bg-gray-850"
            >
              Cancel
            </button>
            <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
              Delete Role
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}

function Dashboard() {
  const cpuUsage = 65;
  const ramUsage = 78;

  return (
    <><div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {[
      { icon: Users, label: "Online Players", value: "24/32" },
      { icon: Zap, label: "Server Performance", value: "98%" },
      { icon: Database, label: "Database Status", value: "Healthy" },
      { icon: Server, label: "Server Response Time" , value: "41ms" },
      { icon: Activity, label: "Server Load", value: "75%" },
      { icon: Shield, label: "Security Status", value: "Secure" },
      { icon: FileText, label: "Logs Size", value: "2.5GB" },
      { icon: Clock, label: "Last Backup", value: "2 hours ago" },
      ].map((stat, index) => (
      <div key={index} className="bg-gray-900 rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between">
        <div>
        <p className="text-sm text-gray-400">{stat.label}</p>
        <p className="text-2xl font-bold text-gray-200">{stat.value}</p>
        </div>
        <stat.icon className="w-8 h-8 text-blue-500" />
      </div>
      </div>
      ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-900 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4 text-gray-200">Player Activity Heatmap</h2>
          <div className="relative h-64">
            <iframe
              src="https://heatmap-external-service.com/player-activity"
              title="Player Activity Heatmap"
              className="w-full h-full rounded-lg border-none"
            ></iframe>
          </div>
        </div>
        <div className="bg-gray-900 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4 text-gray-200">Server Load Heatmap</h2>
          <div className="relative h-64">
            <iframe
              src="https://heatmap-external-service.com/server-load"
              title="Server Load Heatmap"
              className="w-full h-full rounded-lg border-none"
            ></iframe>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-gray-900 rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold mb-4 text-gray-200">CPU Usage</h2>
        <div className="relative h-32 flex flex-col items-center justify-center">
        <span className="text-3xl font-bold text-blue-500">{cpuUsage}%</span>
        <p className="text-sm text-gray-400">Current CPU load</p>
        </div>
      </div>
      <div className="bg-gray-900 rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold mb-4 text-gray-200">RAM Usage</h2>
        <div className="relative h-32 flex flex-col items-center justify-center">
        <span className="text-3xl font-bold text-green-500">{ramUsage}%</span>
        <p className="text-sm text-gray-400">Current RAM load</p>
        </div>
      </div>
      <div className="bg-gray-900 rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold mb-4 text-gray-200">Server Uptime</h2>
        <div className="h-32 flex flex-col items-center justify-center">
        <Activity className="w-12 h-12 text-gray-400" />
        <span className="text-gray-500">99.99% uptime</span>
        </div>
      </div>
    </div>
  </div>

    <div className="mt-12 bg-gray-900 rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold mb-4 text-gray-200">Recent Activity</h2>
      <div className="space-y-4">
      {mockLogs.slice(0, 5).map((log) => (
        <div
        key={log.id}
        className="flex items-center gap-4 p-4 bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow"
        >
        <div
          className={`p-3 rounded-full ${log.type === "money"
            ? "bg-green-600 text-green-100"
            : log.type === "combat"
            ? "bg-red-600 text-red-100"
            : "bg-blue-600 text-blue-100"}`}
        >
          <Activity className="w-6 h-6" />
        </div>
        <div>
          <p className="font-medium text-gray-300">{log.action}</p>
          <p className="text-sm text-gray-500">{log.details}</p>
        </div>
        <span className="ml-auto text-sm text-gray-500">{log.timestamp}</span>
        </div>
      ))}
      </div>
    </div></>
  );
}

function VehicleList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [action, setAction] = useState<string | null>(null);
  const [showGiveForm, setShowGiveForm] = useState(false);

  const filteredVehicles = mockVehicles.filter((vehicle) =>
    vehicle.model.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="bg-dark rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Manage Vehicles</h2>
          <div className="flex gap-4">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search vehicles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              onClick={() => setShowGiveForm((prev) => !prev)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Give Vehicle
            </button>
          </div>
        </div>

        {showGiveForm && (
          <div className="mb-6 p-4 border rounded-lg relative bg-gray-800">
            <h3 className="font-semibold mb-4">Give New Vehicle</h3>
            <form className="grid grid-cols-1 md:grid-cols-1 gap-4">
              <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Vehicle Model"
            className="p-2 border rounded flex-1"
          />
          <input
            type="text"
            placeholder="Player ID/Name"
            className="p-2 border rounded flex-1"
          />
          <input
            type="text"
            placeholder="Plate"
            className="p-2 border rounded flex-1"
          />
          <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
            Give Vehicle
          </button>
              </div>
            </form>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full">
          <thead className="bg-gray-900 border border-gray-700 rounded-t-lg">
          <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider">Vehicle</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider">Owner</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-dark divide-y divide-gray-200">
              {filteredVehicles.map((vehicle) => (
                <tr key={vehicle.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-medium">{vehicle.model}</div>
                      <div className="text-sm text-gray-500">Plate: {vehicle.plate}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">{vehicle.owner}</td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm">Condition:</span>
                        <div className="w-24 h-2 bg-gray-200 rounded">
                          <div
                            className={`h-full rounded ${
                              vehicle.condition > 75 ? 'bg-green-500' :
                              vehicle.condition > 25 ? 'bg-yellow-500' :
                              'bg-red-500'
                            }`}
                            style={{ width: `${vehicle.condition}%` }}
                          />
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm">Fuel:</span>
                        <div className="w-24 h-2 bg-gray-200 rounded">
                          <div
                            className="h-full bg-blue-500 rounded"
                            style={{ width: `${vehicle.fuel}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {vehicle.stored ? (
                      <span className="text-gray-500">In Garage</span>
                    ) : (
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2 text-gray-500" />
                        <span>{vehicle.location.x}, {vehicle.location.y}</span>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => {
                          setSelectedVehicle(vehicle);
                          setAction("Teleport");
                        }}
                        className="p-1 hover:bg-gray-800 rounded" title="Teleport to Vehicle"
                      >
                        <Crosshair className="w-5 h-5 text-blue-500" />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedVehicle(vehicle);
                          setAction("Delete");
                        }}
                        className="p-1 hover:bg-gray-800 rounded" title="Delete Vehicle"
                      >
                        <Trash2 className="w-5 h-5 text-red-500" />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedVehicle(vehicle);
                          setAction("Repair");
                        }}
                        className="p-1 hover:bg-gray-800 rounded" title="Repair Vehicle"
                      >
                        <Zap className="w-5 h-5 text-green-500" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedVehicle && action && (
        <Modal onClose={() => {
          setSelectedVehicle(null);
          setAction(null);
        }}>
          <h2 className="text-xl font-bold mb-4">{action} Vehicle</h2>
          <p className="mb-4">Perform the action "{action}" on vehicle <strong>{selectedVehicle.model}</strong>.</p>
          {action === "Teleport" && (
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Enter coordinates (x, y)"
                className="w-full p-2 border rounded"
              />
              <button type="submit" className="w-full px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 mt-4">
                Teleport Vehicle
              </button>
            </form>
          )}
          {action === "Delete" && (
            <>
              <p className="mb-4">Are you sure you want to delete this vehicle?</p>
              <button type="submit" className="w-full px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                Delete Vehicle
              </button>
            </>
          )}
          {action === "Repair" && (
            <>
              <p className="mb-4">Repair the vehicle to full condition?</p>
              <button type="submit" className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                Repair Vehicle
              </button>
            </>
          )}
          <div className="flex justify-end gap-4 mt-4">
            <button
              onClick={() => {
                setSelectedVehicle(null);
                setAction(null);
              }}
              className="px-4 py-2 bg-gray-800 rounded hover:bg-gray-850"
            >
              Cancel
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}

function ItemList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [action, setAction] = useState<string | null>(null);
  const [showGiveForm, setShowGiveForm] = useState(false);

  const filteredItems = mockItems.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="bg-dark rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Manage Items</h2>
          <div className="flex gap-4">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              onClick={() => setShowGiveForm((prev) => !prev)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Give Item
            </button>
          </div>
        </div>

        {showGiveForm && (
  <div className="mb-6 p-4 border rounded-lg relative bg-gray-800">
    <div className="flex justify-between items-center mb-4">
      <h3 className="font-semibold">Give Items to Player</h3>
    </div>
    <form className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <input
          type="text"
          placeholder="Item Name"
          className="p-2 border rounded focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="number"
          placeholder="Quantity"
          className="p-2 border rounded focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Player ID/Name"
          className="p-2 border rounded focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Give Item
        </button>
      </div>
    </form>
  </div>
)}


        <div className="overflow-x-auto">
          <table className="w-full">
                        <thead className="bg-gray-900 border border-gray-700 rounded-t-lg">

              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider">Item</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider">Owner</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider">Quantity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider">Quality</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-dark divide-y divide-gray-200">
              {filteredItems.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="font-medium">{item.name}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-sm ${
                      item.type === 'weapon' ? 'bg-red-100 text-red-800' :
                      item.type === 'drug' ? 'bg-purple-100 text-purple-800' :
                      item.type === 'money' ? 'bg-green-100 text-green-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {item.type}
                    </span>
                  </td>
                  <td className="px-6 py-4">{item.owner}</td>
                  <td className="px-6 py-4">{item.quantity}</td>
                  <td className="px-6 py-4">
                    {item.quality && (
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-gray-200 rounded">
                          <div
                            className={`h-full rounded ${
                              item.quality > 75 ? 'bg-green-500' :
                              item.quality > 25 ? 'bg-yellow-500' :
                              'bg-red-500'
                            }`}
                            style={{ width: `${item.quality}%` }}
                          />
                        </div>
                        <span className="text-sm text-gray-500">{item.quality}%</span>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => {
                          setSelectedItem(item);
                          setAction("Edit");
                        }}
                        className="p-1 hover:bg-gray-800 rounded" title="Edit Item"
                      >
                        <Edit className="w-5 h-5 text-blue-500" />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedItem(item);
                          setAction("Delete");
                        }}
                        className="p-1 hover:bg-gray-800 rounded" title="Remove Item"
                      >
                        <Minus className="w-5 h-5 text-red-500" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedItem && action && (
        <Modal onClose={() => {
          setSelectedItem(null);
          setAction(null);
        }}>
          <h2 className="text-xl font-bold mb-4">{action} Item</h2>
          {action === "Edit" && (
            <form className="space-y-4">
              <input
                type="text"
                defaultValue={selectedItem.name}
                placeholder="Item Name"
                className="w-full p-2 border rounded"
              />
              <input
                type="number"
                defaultValue={selectedItem.quantity}
                placeholder="Quantity"
                className="w-full p-2 border rounded"
              />
              <button type="submit" className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                Save Changes
              </button>
            </form>
          )}
          {action === "Delete" && (
            <>
              <p className="mb-4">Are you sure you want to delete the item <strong>{selectedItem.name}</strong>?</p>
              <button type="submit" className="w-full px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                Delete Item
              </button>
            </>
          )}
          <div className="flex justify-end gap-4 mt-4">
            <button
              onClick={() => {
                setSelectedItem(null);
                setAction(null);
              }}
              className="px-4 py-2 bg-gray-800 rounded hover:bg-gray-850"
            >
              Cancel
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}

function ServerManagement({ setActivePage }: { setActivePage: (page: string) => void }) {
  const [modalAction, setModalAction] = useState<string | null>(null);

  const handleAction = (action: string) => {
    setModalAction(action);
  };

  const closeModal = () => {
    setModalAction(null);
  };

  const confirmAction = () => {
    if (modalAction === "IP & HWID Tracker") {
      setActivePage("ipHwidTracker");
    }
    closeModal();
  };

  return (
    <div className="bg-dark rounded-lg shadow-lg p-8">
      <h2 className="text-3xl font-bold mb-6 text-gray-50">Server Management</h2>
      <p className="text-gray-400 mb-8">
        Manage critical server functions such as restarts, announcements, and updates. Use the buttons below to perform actions.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <button
          onClick={() => handleAction("Restart Server")}
          className="bg-red-500 text-white px-6 py-4 rounded-lg hover:bg-red-600 transition-all shadow-md flex items-center justify-center gap-2"
        >
          <Zap className="w-5 h-5" />
          Restart Server
        </button>
        <button
          onClick={() => handleAction("Announce Message")}
          className="bg-yellow-500 text-white px-6 py-4 rounded-lg hover:bg-yellow-600 transition-all shadow-md flex items-center justify-center gap-2"
        >
          <MessageCircle className="w-5 h-5" />
          Announce Message
        </button>
        <button
          onClick={() => handleAction("Update Server")}
          className="bg-green-500 text-white px-6 py-4 rounded-lg hover:bg-green-600 transition-all shadow-md flex items-center justify-center gap-2"
        >
          <ArrowUpDown className="w-5 h-5" />
          Update Server
        </button>
        <button
          onClick={() => handleAction("Backup Database")}
          className="bg-blue-500 text-white px-6 py-4 rounded-lg hover:bg-blue-600 transition-all shadow-md flex items-center justify-center gap-2"
        >
          <Database className="w-5 h-5" />
          Backup Database
        </button>
        <button
          onClick={() => handleAction("View Server Logs")}
          className="bg-gray-500 text-white px-6 py-4 rounded-lg hover:bg-gray-600 transition-all shadow-md flex items-center justify-center gap-2"
        >
          <History className="w-5 h-5" />
          View Server Logs
        </button>
        <button
          onClick={() => handleAction("IP & HWID Tracker")}
          className="bg-purple-500 text-white px-6 py-4 rounded-lg hover:bg-purple-600 transition-all shadow-md flex items-center justify-center gap-2"
        >
          <UserCheck className="w-5 h-5" />
          IP & HWID Tracker
        </button>
      </div>

      {modalAction && (
        <Modal onClose={closeModal}>
          <h2 className="text-xl font-bold mb-4">{modalAction}</h2>
          {modalAction === "Announce Message" && (
            <form className="space-y-4">
              <textarea
                placeholder="Enter your announcement..."
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-yellow-500"
              />
              <button
                type="submit"
                className="w-full px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
              >
                Send Announcement
              </button>
            </form>
          )}
          {modalAction === "Restart Server" && (
            <p className="mb-4">Are you sure you want to restart the server?</p>
          )}
          {modalAction === "Update Server" && (
            <p className="mb-4">Are you sure you want to update the server?</p>
          )}
          {modalAction === "Backup Database" && (
            <p className="mb-4">Are you sure you want to backup the database?</p>
          )}
          {modalAction === "View Server Logs" && (
            <>
              <p className="mb-4">Last 10 Log Entries:</p>
              <div className="bg-dark-700 p-4 rounded-lg space-y-2">
                <p>Server started</p>
                <p>Player JohnDoe joined</p>
                <p>Player JohnDoe left</p>
                <p>Server restarted</p>
                <p>Player JaneDoe joined</p>
                <p>Player JaneDoe left</p>
                <p>Server updated</p>
                <p>Database backup completed</p>
                <p>Resource XYZ started</p>
                <p>Resource XYZ stopped</p>
              </div>
            </>
            )}
            {modalAction === "IP & HWID Tracker" && (
            <div>
              <ul className="list-disc pl-6">
              <li>Track player IP addresses and HWIDs</li>
              <li>Identify duplicate accounts</li>
              <li>Monitor suspicious activity</li>
              </ul>
            </div>
            )}
          <div className="flex justify-end gap-4 mt-6">
            <button
              onClick={closeModal}
              className="px-4 py-2 bg-gray-800 rounded hover:bg-gray-850"
            >
              Cancel
            </button>
            {modalAction !== "Announce Message" && (
              <button
                onClick={confirmAction}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Confirm
              </button>
          )}
          </div>
        </Modal>
      )}
    </div>
  );
}

function IPHWIDTrackerPage({ setActivePage, setSelectedPlayer }: { setActivePage: (page: string) => void; setSelectedPlayer: (player: Player | null) => void }) {
  const exampleData = [
    { id: 1, player: "John_Doe", ip: "192.168.1.1", hwid: "HWID12345", suspicious: false },
    { id: 2, player: "Jane_Smith", ip: "192.168.1.2", hwid: "HWID67890", suspicious: true },
  ];

  const handleViewDetails = (playerName: string) => {
    const player = mockPlayers.find((p) => p.name === playerName);
    if (player) {
      setSelectedPlayer(player);
      setActivePage("PlayerDetails");
    }
  };

  return (
    <div className="bg-dark rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">IP & HWID Tracker</h2>
      <p className="text-gray-600 mb-6">
        Monitor player IP addresses and HWIDs to identify duplicate accounts and suspicious activity.
      </p>

      <div className="overflow-x-auto">
      <table className="w-full border-collapse border-gray-900 border-gray-900">
      <thead className="bg-gray-900 border border-gray-700 rounded-t-lg">

            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider">Player</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider">IP Address</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider">HWID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider">Suspicious</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-dark divide-y divide-gray-200">
            {exampleData.map((entry) => (
              <tr key={entry.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">{entry.player}</td>
                <td className="px-6 py-4">
                  <CensoredInfo label="IP" value={entry.ip} />
                </td>
                <td className="px-6 py-4">
                  <CensoredInfo label="HWID" value={entry.hwid} />
                </td>
                <td className="px-6 py-4">
                  {entry.suspicious ? (
                    <span className="px-2 py-1 text-xs font-medium text-red-800 bg-red-100 rounded">Yes</span>
                  ) : (
                    <span className="px-2 py-1 text-xs font-medium text-green-800 bg-green-100 rounded">No</span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleViewDetails(entry.player)}
                      className="px-3 py-1 text-xs text-white bg-blue-500 rounded hover:bg-blue-600"
                    >
                      View Details
                    </button>
                    <button className="px-3 py-1 text-xs text-white bg-red-500 rounded hover:bg-red-600">
                      Mark Suspicious
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex justify-end space-x-4">
        <button className="px-4 py-2 bg-gray-500 text-gray-50 rounded hover:bg-gray-400">
          Back
        </button>
      </div>
    </div>
  );
}

function PlayerWarnings({ setActivePage, setSelectedPlayer }: { setActivePage: (page: string) => void; setSelectedPlayer: (player: Player | null) => void }) {
  const mockWarnings = [
    {
      id: 1,
      player: "John_Doe",
      message: "Spamming in chat",
      date: "2024-03-10",
    },
    {
      id: 2,
      player: "Jane_Smith",
      message: "Abusive language",
      date: "2024-03-11",
    },
  ];

  const handleViewDetails = (playerName: string) => {
    const player = mockPlayers.find((p) => p.name === playerName);
    if (player) {
      setSelectedPlayer(player);
      setActivePage("PlayerDetails");
    }
  };

  return (
    <div className="bg-dark rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold mb-4">Player Warnings</h2>
      <p>View and manage warnings issued to players.</p>

      <div className="mt-4">
        <table className="w-full border-collapse border-gray-900 border-gray-900">
                      <thead className="bg-gray-900 border border-gray-700 rounded-t-lg">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider">Player</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider">Warning</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-dark divide-y divide-gray-200">
            {mockWarnings.map((warning) => (
              <tr key={warning.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">{warning.player}</td>
                <td className="px-6 py-4">{warning.message}</td>
                <td className="px-6 py-4">{warning.date}</td>
                <td className="px-6 py-4">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleViewDetails(warning.player)}
                      className="px-3 py-1 text-xs text-white bg-blue-500 rounded hover:bg-blue-600"
                    >
                      View Player Details
                    </button>
                    <button className="px-3 py-1 text-xs text-white bg-red-500 rounded hover:bg-red-600">
                      Remove Warning
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Login({ onLogin }: { onLogin: (token: string) => void }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoggingIn(true);

    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.message || 'Login failed');
        setIsLoggingIn(false);
        return;
      }

      const { token } = await response.json();
      localStorage.setItem('authToken', token);

      setTimeout(() => {
        setIsTransitioning(true);
        setTimeout(() => {
          onLogin(token); // Token an die App weitergeben
        }, 1000);
      }, 3000);
    } catch (err) {
      setError('An error occurred. Please try again.');
      setIsLoggingIn(false);
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-gray-900 to-black text-gray-200 overflow-hidden relative transition-opacity duration-1000 ${
      isTransitioning ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {isLoggingIn && (
      <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black bg-opacity-90 transition-opacity duration-500">
        <div className="relative">
        <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 blur-2xl rounded-full"></div>
        <Shield className="w-32 h-32 text-blue-500 animate-spin-slow relative z-10" />
        </div>
        <h2 className="text-4xl font-extrabold mt-8 text-white animate-fadeIn">
        Logging in...
        </h2>
      </div>
      )}
      <div
      className={`bg-gray-800 p-8 rounded-lg shadow-2xl w-full max-w-md transition-transform duration-700 ease-in-out ${
        isLoggingIn ? 'scale-110 opacity-0' : 'scale-100 opacity-100'
      }`}
      >
      <div className="text-center mb-4">
        <Shield className="w-16 h-16 text-blue-500 mx-auto animate-pulse" />
        <h2 className="text-4xl font-extrabold mt-4 text-white">Admin Hub</h2>
        <p className="text-gray-400 text-sm">Sign in to manage your server</p>
      </div>
      {error && (
        <div className="bg-red-600 text-white text-sm p-3 rounded mb-4 shadow-md">
        {error}
        </div>
      )}
      <form
        onSubmit={async (e) => {
        e.preventDefault();
        setError('');
        setIsLoggingIn(true);
        await new Promise((resolve) => setTimeout(resolve, 3000)); // Simulate 3 seconds delay
        handleLogin(e);
        }}
        className="space-y-6"
      >
        <div>
        <label className="block text-sm font-medium mb-2 text-gray-300">Username</label>
        <div className="relative">
          <UserCog className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-700 rounded-lg bg-gray-700 text-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          placeholder="Enter your username"
          required
          />
        </div>
        </div>
        <div>
        <label className="block text-sm font-medium mb-2 text-gray-300">Password</label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-700 rounded-lg bg-gray-700 text-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          placeholder="Enter your password"
          required
          />
        </div>
        </div>
        <button
        type="submit"
        className="w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all shadow-lg font-semibold transform hover:scale-105 animate-pulse hover:animate-none flex items-center justify-center gap-2"
        >
        <LogOut className="w-5 h-5" />
        Login
        </button>
      </form>
      </div>
      <p className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-gray-400 text-xs text-center">
      This project is not affiliated with{' '}
      <a href="https://fivem.net/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
        FiveM
      </a>{' '}
      or{' '}
      <a href="https://cfx.re/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
        Cfx.re
      </a>. <br />
      Made with <span className="text-red-500 animate-pulse">❤️</span> by{' '}
      <a href="https://github.com/Lucentix" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
        Lucentix
      </a>. <br />
      Licensed under the{' '}
      <a href="https://opensource.org/licenses/MIT" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
        MIT License
      </a>.
      </p>
    </div>
  );
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activePage, setActivePage] = useState("dashboard");
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState<string | null>(null); // Neuer State für den Benutzernamen
  const [userRole, setUserRole] = useState<string | null>(null); // Neuer State für die Rolle

  const handleSidebarToggle = (collapsed: boolean) => {
    setIsSidebarCollapsed(collapsed);
  };

  const handlePageChange = (page: string) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setActivePage(page);
      setIsTransitioning(false);
    }, 500); // Duration matches the fade-out animation
  };

  const handleLogin = (token: string) => {
    const decodedToken = JSON.parse(atob(token.split('.')[1])); // JWT-Dekodierung
    setLoggedInUser(decodedToken.username); // Benutzername aus dem Token speichern
    setUserRole(decodedToken.role); // Rolle aus dem Token speichern
    setIsAuthenticated(true);
  };

  if (!isAuthenticated) {
    return <Login onLogin={(token) => handleLogin(token)} />;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 flex flex-col">
      <Sidebar
        activePage={activePage}
        setActivePage={handlePageChange}
        onToggle={handleSidebarToggle}
        loggedInUser={loggedInUser}
        userRole={userRole}
      />
      <div
        className={`transition-all ${
          isSidebarCollapsed ? "ml-20" : "ml-64"
        } p-8 flex-1`}
      >
        <div
          className={`transition-opacity duration-500 ${
            isTransitioning ? "opacity-0" : "opacity-100"
          }`}
        >
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-100">
              {activePage === "PlayerDetails" && selectedPlayer
                ? `Player Details: ${selectedPlayer.name}`
                : activePage.charAt(0).toUpperCase() + activePage.slice(1)}
            </h1>
            <p className="text-gray-400">Monitor and manage your FiveM server</p>
          </div>
          <div className="container bg-gray-800 p-6 rounded-lg shadow-lg">
            {/* Render active page */}
            {activePage === "dashboard" && <Dashboard />}
            {activePage === "players" && (
              <PlayerList
                setActivePage={handlePageChange}
                setSelectedPlayer={setSelectedPlayer}
              />
            )}
            {activePage === "vehicles" && <VehicleList />}
            {activePage === "items" && <ItemList />}
            {activePage === "bans" && <BanList />}
            {activePage === "logs" && <LogsList />}
            {activePage === "roles" && <RolesList />}
            {activePage === "server" && <ServerManagement setActivePage={handlePageChange} />}
            {activePage === "warnings" && (
              <PlayerWarnings
                setActivePage={handlePageChange}
                setSelectedPlayer={setSelectedPlayer}
              />
            )}
            {activePage === "ipHwidTracker" && (
              <IPHWIDTrackerPage
                setActivePage={handlePageChange}
                setSelectedPlayer={setSelectedPlayer}
              />
            )}
            {activePage === "PlayerDetails" && selectedPlayer && (
              <PlayerDetails player={selectedPlayer} />
            )}
          </div>
        </div>
      </div>
    <footer className="mt-auto mb-4">
      <p className="text-gray-400 text-xs text-center">
      This project is not affiliated with{' '}
      <a href="https://fivem.net/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
      FiveM
      </a>{' '}
      or{' '}
      <a href="https://cfx.re/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
      Cfx.re
      </a>. <br />
      Made with <span className="text-red-500 animate-pulse">❤️</span> by{' '}
      <a href="https://github.com/Lucentix" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
      Lucentix
      </a>. <br />
      Licensed under the{' '}
      <a href="https://opensource.org/licenses/MIT" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
      MIT License
      </a>.
      </p>
    </footer>
    </div>
  );
}

export default App;