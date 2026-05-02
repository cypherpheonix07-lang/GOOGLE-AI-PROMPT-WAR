import React, { useState } from 'react';
import { Sparkles, Loader2 } from 'lucide-react';

const AIInsights = ({ tasks }) => {
  const [insight, setInsight] = useState('');
  const [loading, setLoading] = useState(false);

  const generateInsight = async () => {
    setLoading(true);
    // In a real app, you would call the Gemini API here
    // For this demo, we'll simulate the AI reasoning based on task status
    
    setTimeout(() => {
      const todoCount = tasks.filter(t => t.status === 'To Do').length;
      const progressCount = tasks.filter(t => t.status === 'In Progress').length;
      const doneCount = tasks.filter(t => t.status === 'Done').length;

      let message = "Based on your current workflow: ";
      if (progressCount > todoCount) {
        message += "The team is highly active! Consider completing existing tasks before starting new ones to avoid bottlenecks.";
      } else if (todoCount > 5) {
        message += "The backlog is growing. It might be time to prioritize the 'To Do' list or reassign tasks.";
      } else {
        message += "The workflow looks balanced. Keep maintaining this pace!";
      }
      
      setInsight(message);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="glass" style={{ 
      padding: '1.5rem', 
      borderRadius: 'var(--radius-lg)', 
      marginBottom: '2rem',
      borderLeft: '4px solid var(--primary)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Sparkles size={20} color="var(--primary)" />
          <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>Gemini AI Insights</h3>
        </div>
        <button 
          onClick={generateInsight}
          disabled={loading || tasks.length === 0}
          style={{ 
            fontSize: '0.875rem', 
            color: 'var(--primary)', 
            background: 'rgba(37, 99, 235, 0.1)',
            padding: '0.4rem 1rem',
            borderRadius: 'var(--radius-sm)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          {loading && <Loader2 size={14} className="spin" />}
          {loading ? 'Analyzing...' : 'Generate Insight'}
        </button>
      </div>

      <p style={{ 
        fontSize: '0.925rem', 
        color: insight ? 'var(--text)' : 'var(--text-muted)',
        fontStyle: insight ? 'normal' : 'italic'
      }}>
        {insight || "Click 'Generate Insight' to get AI-powered suggestions for your team's workflow."}
      </p>
    </div>
  );
};

export default AIInsights;
