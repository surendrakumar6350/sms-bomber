"use client"
import BomberForm from "@/components/ui/BomberForm";
import Navbar from "@/components/ui/Navbar";
import VisitCounter from "@/components/ui/visits";

const Index = () => {

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-50">
      <Navbar />

      <main className="container mx-auto px-4 py-12 md:py-16">
        <div className="text-center mb-12 space-y-6 animate-fadeIn">
          <div className="inline-block">
            <span className="px-4 py-1.5 rounded-full text-sm font-medium bg-purple-100 text-purple-800 mb-4 inline-block">
              2025 Edition - sms bomber online
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Welcome To SMS Bomber
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Experience the most powerful SMS bombing service on the internet.
            Perfect for pranking friends with our mobile-friendly and easy-to-use platform.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-purple-100/50 p-6 md:p-8">
            <BomberForm />
          </div>
        </div>
        <VisitCounter />

        <div className="mt-12 text-center text-sm text-gray-500">
          <p className="animate-pulse">
            🔒 Safe & Secure • 100% Anonymous • No Registration Required
          </p>
        </div>
      </main>

      <div className="fixed inset-0 -z-10 bg-[radial-gradient(45%_25%_at_50%_50%,rgba(124,58,237,0.05)_0%,rgba(124,58,237,0)_100%)]" />
    </div>
  );
};

export default Index;