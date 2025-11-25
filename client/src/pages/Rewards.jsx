// src/pages/Rewards.jsx
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import api from '../utils/api';

// Enhanced rewards with better thresholds and benefits
const REWARDS = [
  { id: 'r1', title: '5% Off Coupon', threshold: 50, description: 'Get 5% off on your next purchase' },
  { id: 'r2', title: 'Free Shipping', threshold: 100, description: 'Free shipping on any order' },
  { id: 'r3', title: '10% Off Coupon', threshold: 150, description: 'Get 10% off on your next purchase' },
  { id: 'r4', title: 'Eco Starter Kit', threshold: 200, description: 'Free sustainable starter kit' },
  { id: 'r5', title: '15% Off Coupon', threshold: 300, description: 'Get 15% off on your next purchase' },
  { id: 'r6', title: 'Premium Membership', threshold: 500, description: '1 month premium membership' },
  { id: 'r7', title: '20% Off Coupon', threshold: 750, description: 'Get 20% off on your next purchase' },
  { id: 'r8', title: 'Eco Ambassador', threshold: 1000, description: 'Become an Eco Ambassador' },
  { id: 'r9', title: '25% Off Coupon', threshold: 1500, description: 'Get 25% off on your next purchase' },
  { id: 'r10', title: 'Carbon Neutral Certificate', threshold: 2000, description: 'Official carbon neutral certificate' },
];

export default function Rewards() {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const res = await api.get('/auth/me');
      setUser(res.data.user);
      setUserData(res.data);
    } catch (error) {
      console.error('Failed to fetch user data');
    }
  };

  const ecoCreds = userData?.ecoCreds || 0;
  const co2Saved = userData?.totalCO2Saved || 0;

  const claimReward = async (reward) => {
    if (ecoCreds < reward.threshold) {
      alert(`You need ${reward.threshold} EcoCreds to claim this reward. You have ${ecoCreds}.`);
      return;
    }
    
    try {
      await api.post('/rewards/claim', { rewardId: reward.id });
      alert(`Congratulations! You've claimed: ${reward.title}`);
      fetchUserData(); // Refresh user data
    } catch (error) {
      alert('Failed to claim reward. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      <Navbar user={user} />
      
      <div className="max-w-7xl mx-auto p-6">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-green-100">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Rewards</h1>
              <p className="text-gray-600">Redeem your EcoCred points for amazing benefits</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-green-600">{ecoCreds}</div>
              <div className="text-sm text-gray-500">Available EcoCreds</div>
            </div>
          </div>
        </div>

        {/* Points Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-green-100">
            <h3 className="text-xl font-bold text-gray-900 mb-4">🎯 How to Earn Points</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-600">CO₂ Saved</span>
                <span className="font-semibold text-green-600">3 points per kg</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-600">Purchase Amount</span>
                <span className="font-semibold text-green-600">1 point per ₹100</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-600">Eco Alternatives</span>
                <span className="font-semibold text-green-600">+5 bonus points</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-600">Your Total CO₂ Saved</span>
                <span className="font-semibold text-green-600">{co2Saved.toFixed(2)} kg</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-green-100">
            <h3 className="text-xl font-bold text-gray-900 mb-4">📈 Your Progress</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Next Reward: 50 points</span>
                  <span>{ecoCreds}/50</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-600 h-2 rounded-full transition-all duration-300" 
                    style={{ width: `${Math.min((ecoCreds / 50) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600">
                  {ecoCreds >= 50 ? '🎉 You can claim rewards!' : `You need ${50 - ecoCreds} more points for your first reward`}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Rewards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {REWARDS.map(reward => {
            const canClaim = ecoCreds >= reward.threshold;
            const progress = Math.min((ecoCreds / reward.threshold) * 100, 100);
            
            return (
              <div 
                key={reward.id} 
                className={`bg-white rounded-2xl shadow-lg p-6 border-2 transition-all duration-300 ${
                  canClaim 
                    ? 'border-green-500 transform hover:scale-105 hover:shadow-xl' 
                    : 'border-gray-200'
                }`}
              >
                <div className="text-center mb-4">
                  <div className={`w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center ${
                    canClaim ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
                  }`}>
                    {canClaim ? '🎁' : '🔒'}
                  </div>
                  <h3 className="font-bold text-lg text-gray-900 mb-1">{reward.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">{reward.description}</p>
                  <div className="text-2xl font-bold text-green-600 mb-2">{reward.threshold} pts</div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-xs mb-1">
                    <span>Progress</span>
                    <span>{ecoCreds}/{reward.threshold}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${
                        canClaim ? 'bg-green-600' : 'bg-green-400'
                      }`}
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>

                <button
                  onClick={() => claimReward(reward)}
                  disabled={!canClaim}
                  className={`w-full py-3 rounded-lg font-semibold transition duration-300 ${
                    canClaim
                      ? 'bg-green-600 hover:bg-green-700 text-white shadow-md'
                      : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {canClaim ? 'Claim Reward' : 'Not Enough Points'}
                </button>
              </div>
            );
          })}
        </div>

        {/* Empty state if no rewards available */}
        {REWARDS.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🎁</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No Rewards Available</h3>
            <p className="text-gray-600">Start shopping to earn EcoCred points!</p>
          </div>
        )}
      </div>
    </div>
  );
}