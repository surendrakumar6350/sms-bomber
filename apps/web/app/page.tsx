"use client"
import React, { useState, useRef } from 'react';
import Header from '@/components/Header';
import PhoneInput from '@/components/PhoneInput';
import StatusPanel from '@/components/StatusPanel';
import Footer from '@/components/Footer';
import ParticleBackground from '@/components/ParticleBackground';
import ProcessingHistory, { HistoryEntry } from '@/components/ProcessingHistory';
import { useToast } from '@/components/Toast';
import axios, { AxiosError } from 'axios';


function App() {
  const [isActive, setIsActive] = useState(false);
  const phoneNumber = useRef<string>("");
  const [messagesSent, setMessagesSent] = useState(0);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const numberRef = useRef<string | null>(null);
  const { addToast, ToastContainer } = useToast();

  const simulateBombing = async () => {
    if (!phoneNumber.current) return;

    try {
      await axios.get(`/api/hello?mobile=${phoneNumber.current}`);

      setMessagesSent(prev => prev + Math.floor(Math.random() * 3) + 1);
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;

      console.error("Error:", axiosError);

      addToast({
        type: 'error',
        message: axiosError.response?.data?.message || 'Failed to send SMS'
      });
    }
  };


  const handleStop = () => {
    if (!isActive || !startTime || !phoneNumber.current) return;

    const endTime = new Date();
    const duration = calculateDuration(startTime, endTime);

    // Add to history
    const historyEntry: HistoryEntry = {
      id: Math.random().toString(36).substring(2, 9),
      phoneNumber: phoneNumber.current.toString(),
      messagesSent,
      startTime,
      endTime,
      duration
    };

    setHistory(prev => [historyEntry, ...prev].slice(0, 10));


    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }

    addToast({
      type: 'success',
      message: `Operation completed! Sent ${messagesSent} messages to +91${phoneNumber.current.toString()} in ${duration}`
    });

    setIsActive(false);
    setMessagesSent(0);
    phoneNumber.current = "";
    setStartTime(null);
  };

  const handleSubmit = async (number: string) => {
    phoneNumber.current = number;
    numberRef.current = number;
    setIsActive(true);
    setMessagesSent(0);
    setStartTime(new Date());

    // Show confirmation toast
    addToast({
      type: 'success',
      message: `Process started for +91${number}`
    });

    try {
      // Start immediate bombing
      simulateBombing();

      // Set up interval for continuous bombing
      const id = setInterval(simulateBombing, 3000);
      setIntervalId(id);
    } catch (error) {
      console.error("Error:", error);
      addToast({
        type: 'error',
        message: 'Failed to start the bombing process'
      });
      handleStop();
    }
  };

  const calculateDuration = (start: Date, end: Date): string => {
    const diff = end.getTime() - start.getTime();
    const minutes = Math.floor(diff / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const clearHistory = () => {
    setHistory([]);
    addToast({
      type: 'success',
      message: 'History cleared successfully'
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-white relative transition-colors duration-300">
      <ParticleBackground />
      <Header />
      <ToastContainer />

      <main className="flex-1 flex flex-col items-center justify-center p-6 relative z-10">
        <div className="w-full max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent">
              SMS Bombing Service
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg leading-relaxed">
              Enter an Indian mobile number and hit the button to start SMS bombing.
              Our system will send multiple messages to the target number with real-time feedback.
            </p>
          </div>

          <div className="flex flex-col items-center space-y-6">
            <PhoneInput onSubmit={handleSubmit} isActive={isActive} />

            <StatusPanel
              isActive={isActive}
              phoneNumber={phoneNumber}
              messagesSent={messagesSent}
              startTime={startTime}
            />

            {isActive && (
              <button
                onClick={handleStop}
                className="px-8 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 
                  text-white rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 
                  shadow-lg hover:shadow-xl"
              >
                Stop Operation
              </button>
            )}

            <ProcessingHistory
              history={history}
              onClearHistory={clearHistory}
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;