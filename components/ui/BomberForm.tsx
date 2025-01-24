import { useState, useEffect } from "react";
import { AlertCircle } from "lucide-react";
import axios from "axios";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";

const BomberForm = () => {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [agreed] = useState(true);
    const [loading, setLoading] = useState(false);
    const [bombing, setBombing] = useState(false);
    const [bombCount, setBombCount] = useState(0);
    const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
    const { toast } = useToast();

    useEffect(() => {
        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [intervalId]);

    const startBombing = async () => {
        try {
            const response = await axios.get(`/api/hello?mobile=${phoneNumber}`);
            if (!response.data.success) {
                alert(response.data.message);
                return;
            }

            setBombCount(prev => prev + 1);
            toast({
                title: "Success",
                description: `SMS bomb ${bombCount + 1} sent successfully`,
            });
        } catch (error) {
            console.error('API Error:', error);
            toast({
                variant: "destructive",
                title: "Error",
                description: "Failed to send SMS bomb. Retrying...",
            });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!agreed) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Please agree to the terms and conditions",
            });
            return;
        }

        if (!phoneNumber) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Please enter a phone number",
            });
            return;
        }

        setLoading(true);
        try {
            await startBombing();
            setBombing(true);
            const id = setInterval(startBombing, 5000);
            setIntervalId(id);
        } catch (error) {
            console.error('API Error:', error);
            toast({
                variant: "destructive",
                title: "Error",
                description: "Failed to initiate SMS bombing. Please try again.",
            });
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
        toast({
            title: "Stopped",
            description: "SMS bombing has been stopped",
        });
    };

    if (bombing) {
        return (
            <div className="w-full max-w-md mx-auto p-6 bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-purple-100/50 animate-fadeIn">
                <div className="space-y-6">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">SMS Bombing in Progress</h2>
                        <p className="text-gray-600">Target: +91 {phoneNumber}</p>
                    </div>

                    <div className="space-y-2">
                        <Progress value={bombCount % 100} className="h-2" />
                    </div>

                    <Button
                        onClick={handleStop}
                        className="w-full bg-red-500 hover:bg-red-600 text-white"
                    >
                        Stop Bombing
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full max-w-md mx-auto p-6 animate-fadeIn">
            <Alert variant="destructive" className="mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                    We created this website for fun purpose. We don&#39;t have any intention to harm anyone
                </AlertDescription>
            </Alert>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="flex space-x-2">
                        <Input
                            disabled
                            value="+91"
                            className="w-16"
                        />
                        <Input
                            id="phone"
                            type="tel"
                            placeholder="Enter Number"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            className="flex-1"
                        />
                    </div>
                </div>

                <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
                >
                    {loading ? "Processing..." : "Submit"}
                </Button>
            </form>

            <div className="mt-6 text-center text-sm text-gray-500">
                <p>
                    Join our{" "}
                    <a href="#" className="text-indigo-600 hover:underline">
                        Telegram Channel
                    </a>{" "}
                    For Latest Update
                </p>
            </div>
        </div>
    );
};

export default BomberForm;