// src/hooks/useAnalytics.js
import { useState, useEffect } from 'react';
import api from '../utils/api';

export const useAnalytics = () => {
  const [analytics, setAnalytics] = useState({
    totalPurchases: 0,
    totalCO2Saved: 0,
    totalEcoCreds: 0,
    ecoScoreAverage: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const res = await api.get('/auth/me');
      if (res.data.user) {
        setAnalytics({
          totalPurchases: res.data.user.totalPurchases || 0,
          totalCO2Saved: res.data.user.totalCO2Saved || 0,
          totalEcoCreds: res.data.user.ecoCredits || 0,
          ecoScoreAverage: res.data.user.ecoScoreAverage || 0
        });
      }
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  return { analytics, loading, refetch: fetchAnalytics };
};
