import { MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function FloatingAIButton() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate('/ai-assistant')}
      className="fixed bottom-20 right-4 z-40 w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-105 active:scale-95"
      title="AI Health Assistant"
    >
      <MessageCircle size={24} />
      <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white animate-pulse" />
    </button>
  );
}
