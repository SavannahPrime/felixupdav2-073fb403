
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { MessageSquare, Mail, Trash2, Archive, Reply } from 'lucide-react';
import { toast } from 'sonner';
import AdminLayout from '../../components/Admin/AdminLayout';
import { supabase } from '@/integrations/supabase/client';

interface Message {
  id: string;
  sender_name: string;
  sender_email: string;
  subject: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

const AdminMessages = () => {
  const location = useLocation();
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        throw error;
      }
      
      setMessages(data || []);
    } catch (error) {
      console.error('Error fetching messages:', error);
      toast.error('Failed to load messages');
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id: string) => {
    try {
      const { error } = await supabase
        .from('messages')
        .update({ is_read: true })
        .eq('id', id);
        
      if (error) throw error;
      
      // Update the local state
      setMessages(messages.map(msg => 
        msg.id === id ? { ...msg, is_read: true } : msg
      ));
      
      if (selectedMessage?.id === id) {
        setSelectedMessage({ ...selectedMessage, is_read: true });
      }
    } catch (error) {
      console.error('Error marking message as read:', error);
    }
  };

  const handleMessageClick = (message: Message) => {
    setSelectedMessage(message);
    
    // If message is unread, mark it as read
    if (!message.is_read) {
      markAsRead(message.id);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this message?')) {
      return;
    }
    
    try {
      const { error } = await supabase
        .from('messages')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      
      toast.success('Message deleted successfully');
      
      // Update local state
      setMessages(messages.filter(msg => msg.id !== id));
      
      // Clear selected message if it was deleted
      if (selectedMessage?.id === id) {
        setSelectedMessage(null);
      }
    } catch (error) {
      console.error('Error deleting message:', error);
      toast.error('Failed to delete message');
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) {
      return '1 day ago';
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else if (diffDays < 30) {
      const weeks = Math.floor(diffDays / 7);
      return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
    } else {
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    }
  };

  const unreadCount = messages.filter(msg => !msg.is_read).length;

  return (
    <AdminLayout title="Messages" currentPath={location.pathname}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <h2 className="text-2xl font-serif text-fashion-champagne">Incoming Messages</h2>
          {unreadCount > 0 && (
            <span className="ml-3 px-2 py-1 text-xs font-medium bg-fashion-gold/20 text-fashion-gold rounded-full">
              {unreadCount} unread
            </span>
          )}
        </div>
      </div>
      
      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-fashion-gold border-r-transparent"></div>
          <p className="mt-4 text-fashion-champagne/80">Loading messages...</p>
        </div>
      ) : messages.length === 0 ? (
        <div className="text-center py-12 bg-black/20 rounded-lg border border-fashion-gold/10">
          <MessageSquare className="mx-auto h-12 w-12 text-fashion-champagne/40" />
          <h3 className="mt-2 text-lg font-medium text-fashion-champagne">No messages</h3>
          <p className="mt-1 text-fashion-champagne/60">Messages from your contact form will appear here</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Messages list */}
          <div className="lg:col-span-1">
            <div className="bg-black/30 backdrop-blur-md border border-fashion-gold/20 rounded-lg overflow-hidden h-[600px] flex flex-col">
              <div className="p-3 border-b border-fashion-gold/10 flex justify-between items-center">
                <h3 className="text-fashion-champagne font-medium">Inbox</h3>
                <span className="text-xs text-fashion-champagne/60">
                  {messages.length} message{messages.length !== 1 ? 's' : ''}
                </span>
              </div>
              
              <div className="overflow-y-auto flex-grow">
                {messages.map(message => (
                  <div
                    key={message.id}
                    onClick={() => handleMessageClick(message)}
                    className={`p-4 border-b border-fashion-gold/10 cursor-pointer transition-colors ${
                      selectedMessage?.id === message.id 
                        ? 'bg-fashion-gold/5 border-l-2 border-l-fashion-gold' 
                        : message.is_read ? '' : 'bg-fashion-gold/5'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="font-medium text-fashion-champagne flex items-center">
                        {!message.is_read && (
                          <span className="w-2 h-2 rounded-full bg-fashion-gold mr-2"></span>
                        )}
                        {message.sender_name}
                      </h4>
                      <span className="text-xs text-fashion-champagne/60">{formatDate(message.created_at)}</span>
                    </div>
                    <p className="text-sm font-medium text-fashion-champagne/90 mb-1 truncate">
                      {message.subject}
                    </p>
                    <p className="text-xs text-fashion-champagne/60 truncate">
                      {message.message.substring(0, 80)}...
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Message details */}
          <div className="lg:col-span-2">
            {selectedMessage ? (
              <div className="bg-black/30 backdrop-blur-md border border-fashion-gold/20 rounded-lg overflow-hidden h-[600px] flex flex-col">
                <div className="p-4 border-b border-fashion-gold/10 flex justify-between items-center">
                  <h3 className="text-xl font-serif text-fashion-champagne">{selectedMessage.subject}</h3>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleDelete(selectedMessage.id)}
                      className="text-fashion-champagne/60 hover:text-red-500 p-1 rounded-full hover:bg-red-500/10 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
                
                <div className="p-4 border-b border-fashion-gold/10 bg-black/20">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-fashion-champagne font-medium">{selectedMessage.sender_name}</p>
                      <p className="text-sm text-fashion-champagne/60">{selectedMessage.sender_email}</p>
                    </div>
                    <span className="text-xs text-fashion-champagne/60">
                      {new Date(selectedMessage.created_at).toLocaleString()}
                    </span>
                  </div>
                </div>
                
                <div className="p-6 overflow-y-auto flex-grow">
                  <p className="text-fashion-champagne/90 whitespace-pre-line">
                    {selectedMessage.message}
                  </p>
                </div>
                
                <div className="p-4 border-t border-fashion-gold/10 flex justify-end space-x-2">
                  <button className="px-3 py-1 text-sm bg-fashion-midnight border border-fashion-gold/30 text-fashion-gold hover:bg-fashion-gold/10 rounded transition-colors flex items-center">
                    <Archive size={14} className="mr-1" />
                    Archive
                  </button>
                  <a
                    href={`mailto:${selectedMessage.sender_email}?subject=Re: ${selectedMessage.subject}`}
                    className="px-3 py-1 text-sm bg-fashion-gold/20 border border-fashion-gold/30 text-fashion-gold hover:bg-fashion-gold/30 rounded transition-colors flex items-center"
                  >
                    <Reply size={14} className="mr-1" />
                    Reply
                  </a>
                </div>
              </div>
            ) : (
              <div className="bg-black/30 backdrop-blur-md border border-fashion-gold/20 rounded-lg overflow-hidden h-[600px] flex items-center justify-center">
                <div className="text-center p-6">
                  <MessageSquare className="mx-auto h-12 w-12 text-fashion-champagne/30 mb-4" />
                  <h3 className="text-lg font-medium text-fashion-champagne">Select a message</h3>
                  <p className="text-fashion-champagne/60 mt-1">Choose a message from the list to view its contents</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminMessages;
