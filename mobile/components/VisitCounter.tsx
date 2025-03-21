import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';

const VisitCounter = () => {
  const [visits, setVisits] = useState({ today: 0, total: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchVisits = async () => {
      try {
        // Replace with your API endpoint
        const response = await axios.post('https://smsbomber.live/api/visitCount');
        if (!response.data.success) {
          setError(response.data.message || "Failed to fetch visit data");
          return;
        }
        setVisits({ today: response.data.today, total: response.data.total });
      } catch (err) {
        console.error(err);
        setError("Unable to fetch visit counts");
      } finally {
        setLoading(false);
      }
    };

    fetchVisits();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4F46E5" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.iconText}>👁️</Text>
        <Text style={styles.headerText}>App Visits</Text>
      </View>
      
      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.iconText}>📊</Text>
          <Text style={styles.statLabel}>Today's Visits</Text>
          <Text style={[styles.statValue, styles.blueText]}>{visits.today}</Text>
        </View>
        
        <View style={styles.statBox}>
          <Text style={styles.iconText}>📈</Text>
          <Text style={styles.statLabel}>Total Visits</Text>
          <Text style={[styles.statValue, styles.greenText]}>{visits.total}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    marginVertical: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  iconText: {
    fontSize: 24,
    marginRight: 12,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statBox: {
    flex: 1,
    backgroundColor: '#EFF6FF',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  blueText: {
    color: '#1D4ED8',
  },
  greenText: {
    color: '#047857',
  },
  loadingContainer: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#FECACA',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  errorText: {
    color: '#B91C1C',
    fontWeight: '600',
  },
});

export default VisitCounter;
