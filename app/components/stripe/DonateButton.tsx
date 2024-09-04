'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Loader2 } from 'lucide-react';

interface DonateButtonProps {
  repositoryFullName: string;
  issueNumber: number;
  onDonate: (repositoryFullName: string, issueNumber: number) => Promise<void>;
}

export default function DonateButton({ repositoryFullName, issueNumber, onDonate }: DonateButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleDonate = async () => {
    setLoading(true);
    try {
      await onDonate(repositoryFullName, issueNumber);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleDonate}
      disabled={loading}
      variant="outline"
      size="sm"
      className="bg-green-500 text-white hover:bg-green-600"
    >
      {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
      {loading ? 'Processing...' : 'Donate'}
    </Button>
  );
}