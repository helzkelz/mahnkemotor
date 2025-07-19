import React, { useEffect, useState } from 'react';
import axios from 'axios';

export interface KofiWidgetProps {
  username: string;
  displayName?: string;
  message?: string;
  color?: string;
  style?: 'button' | 'panel' | 'floating';
  showDonationGoal?: boolean;
  customUrl?: string;
}

interface KofiData {
  goal?: number;
  current?: number;
  supporters?: number;
}

const KofiWidget: React.FC<KofiWidgetProps> = ({
  username,
  displayName,
  message = "Support me on Ko-fi!",
  color = "#29ABE0",
  style = "button",
  showDonationGoal = false,
  customUrl
}) => {
  const [kofiData, setKofiData] = useState<KofiData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const kofiUrl = customUrl || `https://ko-fi.com/${username}`;

  useEffect(() => {
    if (showDonationGoal && process.env.KO_FI_TOKEN) {
      fetchKofiData();
    }
  }, [username, showDonationGoal]);

  const fetchKofiData = async () => {
    if (!process.env.KO_FI_TOKEN) {
      setError('Ko-fi token not configured');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get('/api/kofi/data', {
        params: { username },
        headers: {
          'Authorization': `Bearer ${process.env.KO_FI_TOKEN}`
        }
      });
      setKofiData(response.data);
    } catch (err) {
      setError('Failed to fetch Ko-fi data');
      console.error('Ko-fi API error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDonateClick = () => {
    window.open(kofiUrl, '_blank', 'noopener,noreferrer');
  };

  const ButtonStyle: React.FC = () => (
    <button
      onClick={handleDonateClick}
      style={{
        backgroundColor: color,
        color: 'white',
        border: 'none',
        padding: '10px 20px',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '16px',
        fontWeight: 'bold',
        textDecoration: 'none',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        transition: 'all 0.3s ease'
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.opacity = '0.8';
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.opacity = '1';
      }}
    >
      <span>☕</span>
      {message}
    </button>
  );

  const PanelStyle: React.FC = () => (
    <div style={{
      border: `2px solid ${color}`,
      borderRadius: '10px',
      padding: '20px',
      maxWidth: '300px',
      backgroundColor: '#f9f9f9'
    }}>
      <h3 style={{ color: color, marginTop: 0 }}>
        Support {displayName || username}
      </h3>
      <p style={{ margin: '10px 0' }}>{message}</p>
      
      {showDonationGoal && kofiData && (
        <div style={{ marginBottom: '15px' }}>
          <div style={{ 
            backgroundColor: '#e0e0e0', 
            borderRadius: '10px', 
            height: '20px', 
            overflow: 'hidden' 
          }}>
            <div style={{
              backgroundColor: color,
              height: '100%',
              width: kofiData.goal ? `${Math.min((kofiData.current || 0) / kofiData.goal * 100, 100)}%` : '0%',
              transition: 'width 0.3s ease'
            }} />
          </div>
          <p style={{ fontSize: '14px', margin: '5px 0' }}>
            ${kofiData.current || 0} / ${kofiData.goal || 0}
          </p>
          <p style={{ fontSize: '12px', color: '#666' }}>
            {kofiData.supporters || 0} supporters
          </p>
        </div>
      )}

      <ButtonStyle />
    </div>
  );

  const FloatingStyle: React.FC = () => (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      zIndex: 1000
    }}>
      <ButtonStyle />
    </div>
  );

  if (loading) {
    return <div>Loading Ko-fi data...</div>;
  }

  if (error && showDonationGoal) {
    console.warn('Ko-fi widget error:', error);
  }

  switch (style) {
    case 'panel':
      return <PanelStyle />;
    case 'floating':
      return <FloatingStyle />;
    default:
      return <ButtonStyle />;
  }
};

export default KofiWidget;
