import React, { useState, useCallback } from "react";
import { Role } from "ultravox-client";
import { toggleMute } from "@/lib/callFunctions";
import { MicIcon, MicOffIcon } from "lucide-react";

interface MicToggleButtonProps {
  role: Role;
}

const MicToggleButton: React.FC<MicToggleButtonProps> = ({ role }) => {
  const [isMuted, setIsMuted] = useState(false);

  const toggleMic = useCallback(async () => {
    try {
      toggleMute(role);
      setIsMuted(!isMuted);
    } catch (error) {
      console.error("Error toggling microphone:", error);
    }
  }, [isMuted]);

  return (
    <button onClick={toggleMic}>
      {isMuted ? (
        <>
          <button className="bg-[#18191b] text-white rounded-full p-7 hover:bg-[#56585c] transition-colors w-[80px] h-[80px]">
            <MicOffIcon size={24} />
          </button>
        </>
      ) : (
        <>
          <button className="bg-[#18191b] text-white rounded-full p-7 hover:bg-[#56585c] transition-colors w-[80px] h-[80px]">
            <MicIcon size={24} />
          </button>
        </>
      )}
    </button>
  );
};

export default MicToggleButton;
