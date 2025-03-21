import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Alert, 
  ActivityIndicator 
} from 'react-native';
import axios from 'axios';

const ProgressBar = ({ value }: any) => {
  return (
    <View style={styles.progressContainer}>
      <View style={[styles.progressBar, { width: `${value}%` }]} />
    </View>
  );
};

const BomberForm = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [bombing, setBombing] = useState(false);
  const [bombCount, setBombCount] = useState(0);
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [intervalId]);

  const validatePhoneNumber = (number: any) => {
    const regex = /^[6-9]\d{9}$/;
    return regex.test(number);
  };

  const showToast = (title : any, description: any) => {
    Alert.alert(title, description);
  };

  const startBombing = async () => {
    try {
      // Replace with your API endpoint
      const response = await axios.get(`https://smsbomber.live/api/hello?mobile=${phoneNumber}`);
      if (!response.data.success) {
        Alert.alert('Error', response.data.message);
        return;
      }

      setBombCount((prev) => prev + 1);
    } catch (error) {
      console.error('API Error:', error);
      showToast('Error', 'Failed to send SMS bomb. Retrying...');
    }
  };

  const handleSubmit = async () => {
    if (!validatePhoneNumber(phoneNumber)) {
      Alert.alert('Invalid Input', 'Please enter a valid 10-digit Indian phone number');
      return;
    }

    setLoading(true);
    try {
      await startBombing();
      setBombing(true);
      const id = setInterval(startBombing, 5000);
      //@ts-ignore
      setIntervalId(id);
    } catch (error) {
      console.error('API Error:', error);
      showToast('Error', 'Failed to initiate SMS bombing. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleStop = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
    setBombing(false);
    setBombCount(0);
    showToast('Stopped', 'SMS bombing has been stopped');
  };

  if (bombing) {
    return (
      <View style={styles.bombingContainer}>
        <View style={styles.bombingContent}>
          <Text style={styles.bombingTitle}>📡 SMS Bombing in Progress</Text>
          <Text style={styles.bombingTarget}>📞 Target: +91 {phoneNumber}</Text>
          
          <View style={styles.progressWrapper}>
            <ProgressBar value={bombCount % 100} />
          </View>
          
          <TouchableOpacity 
            style={styles.stopButton}
            onPress={handleStop}
          >
            <Text style={styles.stopButtonText}>🛑 Stop Bombing</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.alertBox}>
        <Text style={styles.alertIcon}>⚠️</Text>
        <Text style={styles.alertText}>
          We created this app for fun. No intention to harm anyone.
        </Text>
      </View>

      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>📱 Phone Number</Text>
          <View style={styles.phoneInputContainer}>
            <View style={styles.countryCode}>
              <Text style={styles.countryCodeText}>+91</Text>
            </View>
            <TextInput
              style={styles.input}
              placeholder="Enter Number"
              keyboardType="phone-pad"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              maxLength={10}
            />
          </View>
        </View>

        <TouchableOpacity 
          style={styles.submitButton}
          onPress={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.submitButtonText}>🚀 Submit</Text>
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          📢 Join our <Text style={styles.footerLink}>Telegram Channel</Text> For Latest Updates
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
    padding: 24,
  },
  alertBox: {
    backgroundColor: '#F43F5E',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    marginBottom: 24,
  },
  alertIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  alertText: {
    color: 'white',
    flex: 1,
    fontSize: 14,
  },
  form: {
    marginBottom: 24,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#4B5563',
  },
  phoneInputContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  countryCode: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#D1D5DB',
  },
  countryCodeText: {
    fontSize: 16,
    color: '#4B5563',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
  },
  submitButton: {
    backgroundColor: '#4F46E5',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    alignItems: 'center',
    marginTop: 24,
  },
  footerText: {
    fontSize: 14,
    color: '#6B7280',
  },
  footerLink: {
    color: '#4F46E5',
  },
  bombingContainer: {
    padding: 24,
    borderRadius: 16,
    maxWidth: 400,
    alignSelf: 'center',
  },
  bombingContent: {
    alignItems: 'center',
  },
  bombingTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  bombingTarget: {
    fontSize: 16,
    marginBottom: 24,
  },
  progressWrapper: {
    width: '100%',
    marginBottom: 24,
  },
  progressContainer: {
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#4F46E5',
  },
  stopButton: {
    backgroundColor: '#EF4444',
    paddingVertical: 16,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  stopButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default BomberForm;
