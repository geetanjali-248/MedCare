import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Bot, 
  Send, 
  AlertCircle, 
  User, 
  Sparkles, 
  Stethoscope, 
  ChevronRight,
  Info
} from 'lucide-react';
import Header from '../../components/Header';
import { useApp } from '../../contexts/AppContext';
import { aiResponses } from '../../data/sampleData';
import { t } from '../../utils/translations';
import type { ChatMessage } from '../../types';

export default function AIHealthAssistant() {
  const navigate = useNavigate();
  const { preferences } = useApp();

  const [inputQuery, setInputQuery] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'assistant',
      text: 'Hello! I am your MedCare AI Health Assistant. I can help with general health guidance, understanding symptoms, and first-aid tips. How can I help you today?',
      timestamp: 'Just now',
    },
  ]);
  const [showDoctorPrompt, setShowDoctorPrompt] = useState(false);

  const quickPrompts = [
    'Mild Fever & Body Ache',
    'Dry Cough Remedies',
    'Headache & Stress',
    'Diabetes Management',
    'Stomach Pain & Diet',
  ];

  const handleSendMessage = (textToSend?: string) => {
    const query = textToSend || inputQuery;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');

    // Formulate response
    setTimeout(() => {
      const lower = query.toLowerCase();
      let reply = aiResponses['default'];

      if (lower.includes('headache')) reply = aiResponses['headache'];
      else if (lower.includes('fever')) reply = aiResponses['fever'];
      else if (lower.includes('cough')) reply = aiResponses['cough'];
      else if (lower.includes('cold')) reply = aiResponses['cold'];
      else if (lower.includes('stomach') || lower.includes('gastric')) reply = aiResponses['stomach'];
      else if (lower.includes('diabetes') || lower.includes('sugar')) reply = aiResponses['diabetes'];
      else if (lower.includes('bp') || lower.includes('pressure')) reply = aiResponses['blood pressure'];
      else if (lower.includes('skin') || lower.includes('rash') || lower.includes('itch')) reply = aiResponses['skin'];
      else if (lower.includes('pain')) reply = aiResponses['back_pain'];

      const assistantMsg: ChatMessage = {
        id: `asst-${Date.now()}`,
        sender: 'assistant',
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, assistantMsg]);
      // Always suggest clinical consult triage
      setShowDoctorPrompt(true);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between max-w-lg mx-auto">
      <Header title={t('aiHealthAssistant', preferences.language)} showBack={true} />

      {/* Medical Disclaimer Banner */}
      <div className="bg-amber-50 border-b border-amber-200 px-4 py-2 flex items-start gap-2 text-[11px] text-amber-800">
        <Info size={15} className="text-amber-600 shrink-0 mt-0.5" />
        <p className="leading-tight">
          {t('disclaimer', preferences.language)}
        </p>
      </div>

      {/* Chat Messages Container */}
      <div className="flex-1 p-4 space-y-3 overflow-y-auto">
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          return (
            <div
              key={msg.id}
              className={`flex items-start gap-2.5 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                  isUser ? 'bg-blue-600 text-white' : 'bg-emerald-600 text-white'
                }`}
              >
                {isUser ? <User size={16} /> : <Bot size={16} />}
              </div>

              <div
                className={`max-w-[80%] rounded-2xl p-3.5 text-xs space-y-1 ${
                  isUser
                    ? 'bg-blue-600 text-white rounded-tr-none'
                    : 'bg-white border border-gray-200 text-gray-800 rounded-tl-none shadow-2xs'
                }`}
              >
                <p className="leading-relaxed">{msg.text}</p>
                <span className={`block text-[10px] ${isUser ? 'text-blue-200 text-right' : 'text-gray-400'}`}>
                  {msg.timestamp}
                </span>
              </div>
            </div>
          );
        })}

        {/* Triage Prompt: Would you like to consult a doctor? */}
        {showDoctorPrompt && (
          <div className="p-3.5 bg-blue-50 border border-blue-200 rounded-2xl space-y-2 text-xs">
            <div className="flex items-center gap-2 text-blue-900 font-bold">
              <Stethoscope size={16} className="text-blue-600" />
              <span>Would you like to consult a qualified doctor now?</span>
            </div>
            <p className="text-[11px] text-blue-700">
              A general physician or specialist can examine your symptoms and provide a valid digital prescription.
            </p>
            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={() => navigate('/doctors')}
                className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1 shadow transition"
              >
                <span>Yes, Find Doctor</span>
                <ChevronRight size={14} />
              </button>
              <button
                onClick={() => setShowDoctorPrompt(false)}
                className="px-4 py-2 bg-white border border-gray-200 text-gray-700 font-bold rounded-xl text-xs hover:bg-gray-50 transition"
              >
                No, Thanks
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Suggested Quick Question Chips */}
      <div className="px-4 py-2 bg-white border-t border-gray-100">
        <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
          Suggested Topics
        </p>
        <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none text-[11px]">
          {quickPrompts.map((q) => (
            <button
              key={q}
              onClick={() => handleSendMessage(q)}
              className="px-3 py-1 bg-slate-50 hover:bg-blue-50 text-gray-700 hover:text-blue-700 border border-gray-200 rounded-full whitespace-nowrap transition"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Message Input Bottom Bar */}
      <div className="p-3 bg-white border-t border-gray-200">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            placeholder={t('typeHealthQuestion', preferences.language)}
            className="flex-1 px-4 py-2.5 bg-slate-50 border border-gray-200 rounded-2xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
          />
          <button
            type="submit"
            disabled={!inputQuery.trim()}
            className="p-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl disabled:opacity-40 transition shadow"
            title="Send"
          >
            <Send size={16} />
          </button>
        </form>
      </div>
    </div>
  );
}
