import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Plus, X, Clock } from 'lucide-react';
import uk from "./assets/uk.png";
import './Dashboard.css';

// Mock Data Generator
const generateMockRateHistory = (currency, days = 30) => {
  const data = [];
  const today = new Date();
  let baseRate = currency === 'UK' ? 84.00 : 22.5;

  for (let i = days; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const randomVariation = (Math.random() - 0.5) * 0.2;
    const rate = baseRate + randomVariation;
    
    data.push({
      date: date.toLocaleDateString(),
      rate: parseFloat(rate.toFixed(2))
    });
  }
  return data;
};

const Button = ({ children, onClick, variant = 'primary', className = '' }) => {
  const buttonClass = `button ${variant} ${className}`;
  return (
    <button onClick={onClick} className={buttonClass}>
      {children}
    </button>
  );
};

const CurrencySelect = ({ value, onChange }) => (
  <div className="currency-select">
      <img src={uk} alt="flag" />
    <select value={value} onChange={onChange}>
      <option value="UK">UK (£)</option>
      <option value="UAE">UAE (AED)</option>
    </select>
  
  </div>
);

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-body">
          <h3>Set Rate alert!</h3>
          {children}
        </div>
      </div>
    </div>
  );
};

const AlertCard = ({ alert }) => (
  <div className="alert-card">
    <div className="alert-info">
      <div className="alert-icon">A</div>
      <div className="alert-details">
        <p className="alert-rate">₹{alert.targetRate}</p>
        <div className="alert-currency">
          <img src="/api/placeholder/16/16" alt="flag" />
          <span>UK (£)</span>
        </div>
      </div>
    </div>
    <div className="alert-tags">
      <span className="tag">12</span>
      <span>/</span>
      <span className="tag">10</span>
      <span>/</span>
      <span className="tag">24</span>
    </div>
  </div>
);

const CurrencyDashboard = () => {
  const [selectedCurrency, setSelectedCurrency] = useState('UK');
  const [rateHistory, setRateHistory] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newAlert, setNewAlert] = useState({
    currency: 'UK',
    title: '',
    targetRate: ''
  });

  useEffect(() => {
    const mockData = generateMockRateHistory(selectedCurrency);
    setRateHistory(mockData);
  }, [selectedCurrency]);

  const handleCreateAlert = (e) => {
    e.preventDefault();
   
    const alert = {
      id: Date.now(),
      ...newAlert,
      createdAt: new Date().toISOString()
    };
    setAlerts(prev => [...prev, alert]);
    setIsModalOpen(false);
    setNewAlert({ currency: 'UK', title: '', targetRate: '' });
  };

  return (
    <div className="dashboard">
      <div className="dashboard-container">
      <h2 className='dashboard-title'>Rate alert dashboard</h2>
        <div className="rate-card">
          <div className="rate-card-header">
            
            <CurrencySelect
              value={selectedCurrency}
              onChange={(e) => setSelectedCurrency(e.target.value)}
            />
          </div>
          
          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={rateHistory}>
                <defs>
                  <linearGradient id="rateGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10B981" stopOpacity={0.2}/>
                    <stop offset="100%" stopColor="#10B981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="date" 
                  tick={{ fontSize: 12, fill: '#9CA3AF' }}
                  axisLine={{ stroke: '#374151' }}
                  tickLine={{ stroke: '#374151' }}
                />
                <YAxis 
                  tick={{ fontSize: 12, fill: '#9CA3AF' }}
                  axisLine={{ stroke: '#374151' }}
                  tickLine={{ stroke: '#374151' }}
                />
                <CartesianGrid stroke="#374151" strokeDasharray="3 3" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '0.5rem' }}
                  labelStyle={{ color: '#ffffff' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="rate" 
                  stroke="#10B981"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 6, fill: '#10B981' }}
                  fill="url(#rateGradient)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="rate-footer">
            <div className="current-rate">
              <span>₹84.00</span>
            </div>
            <Button onClick={() => setIsModalOpen(true)}>
              Set Alert
            </Button>
          </div>
        </div>

        <div className="alerts-section">
          <div className="alerts-header">
            <h3>Previous alerts</h3>
            <div className="pagination">
              <span className="active">1</span>
              <span>...</span>
              <span>10</span>
            </div>
          </div>
          
          {[1, 2, 3].map((_, index) => (
            <AlertCard 
              key={index}
              alert={{ targetRate: '84.00', currency: 'UK' }}
            />
          ))}
        </div>

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <div className="alert-form">
            <div className="currency-icon">
              <img src={uk} alt="UK flag" />
            </div>
            <div className="currency-label">
              UK (£)
            </div>

            <form>
            <div className='label'><label>Title</label></div>
            <div className="form-group">
              <input
                type="text"
                placeholder="Send money home"
                value={newAlert.title}
                onChange={(e) => setNewAlert(prev => ({ ...prev, title: e.target.value }))}
                required
              />
            </div>
            <div className="form-group">
            <div className='label'><label>Rate alert Value</label></div>
              <input
                type="number"
                placeholder="₹ 9000"
                value={newAlert.targetRate}
                onChange={(e) => setNewAlert(prev => ({ ...prev, targetRate: e.target.value }))}
                required
              />
            </div>
            <div className="form-actions">
              <Button onClick={handleCreateAlert} className="submit-button">
                Set alert
              </Button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="cancel-button"
              >
                Cancel
              </button>
            </div>
            </form>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default CurrencyDashboard;