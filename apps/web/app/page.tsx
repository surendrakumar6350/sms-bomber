"use client";

import React, { useState, useRef } from 'react';
import axios from 'axios';
import Header from '@/components/v2/components/Header';
import PhoneInput from '@/components/v2/components/PhoneInput';
import StatusPanel from '@/components/v2/components/StatusPanel';
import Footer from '@/components/v2/components/Footer';
import ParticleBackground from '@/components/v2/components/ParticleBackground';

function App() {
  const [isActive, setIsActive] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState<string | null>(null);
  const [messagesSent, setMessagesSent] = useState(0);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  const numberRef = useRef<string | null>(null);

  const startBombing = async () => {
    if (!numberRef.current) return;

    try {
      const response = await axios.get(`/api/hello?mobile=${numberRef.current}`);
      if (!response.data.success) {
        alert(response.data.message);
      }

      setMessagesSent(prev => prev + Math.floor(Math.random() * 3) + 1);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleStop = () => {
    setIsActive(false);
    setMessagesSent(0);

    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
  };

  const handleSubmit = async (number: string) => {
    setPhoneNumber(number);
    numberRef.current = number;
    setIsActive(true);
    setMessagesSent(0);
    setStartTime(new Date());

    try {
      await startBombing();
      const id = setInterval(startBombing, 5000);
      setIntervalId(id);
    } catch (error) {
      console.error("API Error:", error);
      handleStop();
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-transparent text-white relative">
      <ParticleBackground />
      <Header />

      <main className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
              SMS Bombing Service
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Enter an Indian mobile number and hit the button to start SMS bombing. Our system will send multiple messages to the target number.
            </p>
          </div>

          <div className="flex flex-col items-center">
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
                className="mt-6 px-6 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
              >
                Stop Operation
              </button>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
