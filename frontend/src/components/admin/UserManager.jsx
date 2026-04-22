import React from 'react';
import { Mail, Calendar, Trash2, Search, User as UserIcon } from 'lucide-react';

const UserManager = ({ users, onDeleteUser }) => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="bg-white p-6 rounded-[2rem] border border-secondary/5 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h3 className="text-xl font-black text-content font-display">User Directory</h3>
          <p className="text-xs font-bold text-content/30 uppercase tracking-widest mt-1">Manage your registered customers</p>
        </div>
        <div className="relative w-full md:w-64">
           <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-content/30" />
           <input type="text" placeholder="Search by name or email..." className="w-full pl-10 pr-4 py-2.5 bg-surface border-none rounded-xl text-sm outline-none" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user) => (
          <div key={user._id} className="bg-white p-8 rounded-[2.5rem] border border-secondary/5 shadow-sm hover:shadow-xl transition-all duration-500 group">
             <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary relative overflow-hidden">
                    <UserIcon size={28} />
                    <div className="absolute inset-0 bg-secondary opacity-0 group-hover:opacity-10 transition-opacity" />
                </div>
                <div>
                   <h4 className="font-bold text-content text-lg leading-tight">{user.name}</h4>
                   <div className="flex items-center gap-2 mt-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                      <span className="text-[10px] font-bold text-content/30 uppercase tracking-widest">Active Member</span>
                   </div>
                </div>
             </div>

             <div className="space-y-4">
                <div className="flex items-center gap-4 text-xs font-bold text-content/60 bg-surface/50 p-3 rounded-xl">
                   <Mail size={16} className="text-secondary/40" />
                   <span className="truncate">{user.email}</span>
                </div>
                <div className="flex items-center gap-4 text-xs font-bold text-content/60 bg-surface/50 p-3 rounded-xl">
                   <Calendar size={16} className="text-secondary/40" />
                   <span>Joined {new Date(user.createdAt).toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}</span>
                </div>
             </div>

             <div className="mt-8 pt-6 border-t border-secondary/5 flex gap-3">
                <button 
                  onClick={() => onDeleteUser(user._id)}
                  className="flex-1 bg-red-50 hover:bg-red-500 hover:text-white text-red-500 py-3 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2"
                >
                   <Trash2 size={14} /> Terminate Access
                </button>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserManager;
