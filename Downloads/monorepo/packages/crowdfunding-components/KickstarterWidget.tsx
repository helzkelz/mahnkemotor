import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as cheerio from 'cheerio';

export interface KickstarterWidgetProps {
  campaignUrl: string;
  displayName?: string;
  message?: string;
  color?: string;
  style?: 'button' | 'panel' | 'card';
  showProgress?: boolean;
  customText?: string;
}

interface KickstarterData {
  title?: string;
  description?: string;
  goal?: number;
  pledged?: number;
  backers?: number;
  daysLeft?: number;
  percentFunded?: number;
  state?: string;
  imageUrl?: string;
}

const KickstarterWidget: React.FC<KickstarterWidgetProps> = ({
  campaignUrl,
  displayName,
  message = "Support this project on Kickstarter!",
  color = "#05CE78",
  style = "button",
  showProgress = false,
  customText
}) => {
  const [kickstarterData, setKickstarterData] = useState<KickstarterData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (showProgress && campaignUrl) {
      fetchKickstarterData();
    }
  }, [campaignUrl, showProgress]);

  const fetchKickstarterData = async () => {
    setLoading(true);
    setError(null);

    try {
      // Try official API first if available
      if (process.env.KICKSTARTER_API_KEY) {
        const response = await axios.get('/api/kickstarter/data', {
          params: { url: campaignUrl },
          headers: {
            'Authorization': `Bearer ${process.env.KICKSTARTER_API_KEY}`
          }
        });
        setKickstarterData(response.data);
      } else {
        // Fallback to scraping via server-side endpoint
        const response = await axios.post('/api/kickstarter/scrape', {
          url: campaignUrl
        });
        setKickstarterData(response.data);
      }
    } catch (err) {
      setError('Failed to fetch Kickstarter data');
      console.error('Kickstarter API error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleBackProject = () => {
    window.open(campaignUrl, '_blank', 'noopener,noreferrer');
  };

  const formatCurrency = (amount: number | undefined) => {
    if (!amount) return '$0';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const ButtonStyle: React.FC = () => (
    <button
      onClick={handleBackProject}
      style={{
        backgroundColor: color,
        color: 'white',
        border: 'none',
        padding: '12px 24px',
        borderRadius: '4px',
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
        e.currentTarget.style.backgroundColor = '#04B469';
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.backgroundColor = color;
      }}
    >
      <span>🚀</span>
      {customText || message}
    </button>
  );

  const PanelStyle: React.FC = () => (
    <div style={{
      border: `2px solid ${color}`,
      borderRadius: '8px',
      padding: '20px',
      maxWidth: '350px',
      backgroundColor: '#ffffff',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
    }}>
      <h3 style={{ color: color, marginTop: 0, marginBottom: '15px' }}>
        {kickstarterData?.title || displayName || 'Kickstarter Campaign'}
      </h3>
      
      {kickstarterData?.description && (
        <p style={{ 
          margin: '10px 0', 
          fontSize: '14px', 
          lineHeight: '1.4',
          color: '#666'
        }}>
          {kickstarterData.description}
        </p>
      )}

      {showProgress && kickstarterData && (
        <div style={{ marginBottom: '20px' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '10px'
          }}>
            <span style={{ fontSize: '14px', fontWeight: 'bold' }}>
              {formatCurrency(kickstarterData.pledged)}
            </span>
            <span style={{ fontSize: '14px', color: '#666' }}>
              of {formatCurrency(kickstarterData.goal)} goal
            </span>
          </div>
          
          <div style={{
            backgroundColor: '#e0e0e0',
            borderRadius: '10px',
            height: '8px',
            overflow: 'hidden'
          }}>
            <div style={{
              backgroundColor: color,
              height: '100%',
              width: `${Math.min(kickstarterData.percentFunded || 0, 100)}%`,
              transition: 'width 0.3s ease'
            }} />
          </div>
          
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '10px',
            fontSize: '12px',
            color: '#666'
          }}>
            <span>{kickstarterData.backers || 0} backers</span>
            <span>{kickstarterData.daysLeft || 0} days left</span>
          </div>
        </div>
      )}

      <ButtonStyle />
    </div>
  );

  const CardStyle: React.FC = () => (
    <div style={{
      border: `1px solid #e0e0e0`,
      borderRadius: '12px',
      padding: '0',
      maxWidth: '400px',
      backgroundColor: '#ffffff',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      overflow: 'hidden'
    }}>
      {kickstarterData?.imageUrl && (
        <div style={{
          width: '100%',
          height: '200px',
          backgroundImage: `url(${kickstarterData.imageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }} />
      )}
      
      <div style={{ padding: '20px' }}>
        <h3 style={{ 
          color: '#333', 
          marginTop: 0, 
          marginBottom: '10px',
          fontSize: '18px'
        }}>
          {kickstarterData?.title || displayName || 'Kickstarter Campaign'}
        </h3>
        
        {kickstarterData?.description && (
          <p style={{ 
            margin: '10px 0 20px 0', 
            fontSize: '14px', 
            lineHeight: '1.4',
            color: '#666'
          }}>
            {kickstarterData.description}
          </p>
        )}

        {showProgress && kickstarterData && (
          <div style={{ marginBottom: '20px' }}>
            <div style={{
              backgroundColor: '#f0f0f0',
              borderRadius: '8px',
              height: '6px',
              overflow: 'hidden',
              marginBottom: '10px'
            }}>
              <div style={{
                backgroundColor: color,
                height: '100%',
                width: `${Math.min(kickstarterData.percentFunded || 0, 100)}%`,
                transition: 'width 0.3s ease'
              }} />
            </div>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr',
              gap: '10px',
              fontSize: '12px',
              textAlign: 'center'
            }}>
              <div>
                <div style={{ fontWeight: 'bold', color: '#333' }}>
                  {formatCurrency(kickstarterData.pledged)}
                </div>
                <div style={{ color: '#666' }}>pledged</div>
              </div>
              <div>
                <div style={{ fontWeight: 'bold', color: '#333' }}>
                  {kickstarterData.backers || 0}
                </div>
                <div style={{ color: '#666' }}>backers</div>
              </div>
              <div>
                <div style={{ fontWeight: 'bold', color: '#333' }}>
                  {kickstarterData.daysLeft || 0}
                </div>
                <div style={{ color: '#666' }}>days left</div>
              </div>
            </div>
          </div>
        )}

        <ButtonStyle />
      </div>
    </div>
  );

  if (loading) {
    return <div>Loading Kickstarter data...</div>;
  }

  if (error && showProgress) {
    console.warn('Kickstarter widget error:', error);
  }

  switch (style) {
    case 'panel':
      return <PanelStyle />;
    case 'card':
      return <CardStyle />;
    default:
      return <ButtonStyle />;
  }
};

export default KickstarterWidget;
