import React from 'react';
import { X, UserCheck, MessageSquare, CheckCheck } from 'lucide-react';

const notifications = [
  {
    id: 1,
    type: 'message',
    sender: 'Sarah Johnson',
    content: 'Can you send me the details for tomorrow\'s meeting?',
    time: '5m ago',
    read: false,
  },
  {
    id: 2,
    type: 'delivery',
    sender: 'SMS Delivery',
    content: 'Your message to +1 (555) 123-4567 was delivered',
    time: '10m ago',
    read: false,
  },
  {
    id: 3,
    type: 'contact',
    sender: 'Michael Brown',
    content: 'Added you as a contact',
    time: '2h ago',
    read: true,
  },
  {
    id: 4,
    type: 'message',
    sender: 'Team Updates',
    content: 'Weekly report is ready to view',
    time: '1d ago',
    read: true,
  },
];

const NotificationPanel = () => {
  return (
    <div className="bg-gray-900/95 backdrop-blur-md border border-violet-800/30 rounded-lg shadow-xl p-3 animate-slideIn overflow-hidden">
      <div className="flex items-center justify-between mb-3 pb-2 border-b border-violet-800/30">
        <h3 className="text-blue-300 font-medium">Notifications</h3>
        <div className="flex items-center gap-2">
          <button className="text-xs text-blue-300 hover:text-blue-200 transition-colors">
            Mark all as read
          </button>
          <button className="text-gray-400 hover:text-gray-300 transition-colors">
            <X size={16} />
          </button>
        </div>
      </div>
      
      <div className="max-h-80 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-violet-800/50">
        {notifications.length > 0 ? (
          <div className="space-y-2">
            {notifications.map((notification) => (
              <div 
                key={notification.id}
                className={`p-2 rounded-md transition-all hover:bg-violet-800/20 ${
                  notification.read ? 'opacity-70' : 'bg-violet-800/10'
                }`}
              >
                <div className="flex gap-3">
                  <div className="flex-shrink-0 mt-1">
                    {notification.type === 'message' && (
                      <div className="bg-blue-500/20 p-1.5 rounded-full">
                        <MessageSquare size={14} className="text-blue-400" />
                      </div>
                    )}
                    {notification.type === 'delivery' && (
                      <div className="bg-green-500/20 p-1.5 rounded-full">
                        <CheckCheck size={14} className="text-green-400" />
                      </div>
                    )}
                    {notification.type === 'contact' && (
                      <div className="bg-purple-500/20 p-1.5 rounded-full">
                        <UserCheck size={14} className="text-purple-400" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <span className="font-medium text-sm text-gray-200">{notification.sender}</span>
                      <span className="text-xs text-gray-400">{notification.time}</span>
                    </div>
                    <p className="text-xs text-gray-300 mt-0.5">{notification.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-400 text-sm">No new notifications</p>
          </div>
        )}
      </div>
      
      <div className="mt-3 pt-2 border-t border-violet-800/30 flex justify-center">
        <button className="text-xs text-purple-300 hover:text-purple-200 transition-colors">
          View all notifications
        </button>
      </div>
    </div>
  );
};

export default NotificationPanel;