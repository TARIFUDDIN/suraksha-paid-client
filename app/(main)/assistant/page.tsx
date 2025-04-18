"use client"
import Image from "next/image";
import { Mic, Phone, Volume2, User, PhoneOffIcon } from "lucide-react";
import { AlertDialog, Flex, ScrollArea } from "@radix-ui/themes";
import moment from "moment";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  Medium,
  Role,
  Transcript,
  UltravoxExperimentalMessageEvent,
  UltravoxSessionStatus,
  UltravoxSession,
} from "ultravox-client";
import { useSearchParams } from "next/navigation";
import { CallConfig, SelectedTool } from "@/lib/types";
import { demoConfig } from "@/app/demo-config";
import { startCall, endCall, getCurrentSession } from "@/lib/callFunctions";
import MicToggleButton from "@/components/MicToggleButton";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type SearchParamsProps = {
  showMuteSpeakerButton: boolean;
  modelOverride: string | undefined;
  showDebugMessages: boolean;
  showUserTranscripts: boolean;
};

type SearchParamsHandlerProps = {
  children: (props: SearchParamsProps) => React.ReactNode;
};

function SearchParamsHandler({ children }: SearchParamsHandlerProps) {
  const searchParams = useSearchParams();
  const showMuteSpeakerButton = Boolean(searchParams.get("showSpeakerMute")) ?? false;
  const showDebugMessages = Boolean(searchParams.get("showDebugMessages")) ?? false;
  const showUserTranscripts = Boolean(searchParams.get("showUserTranscripts")) ?? false;
  let modelOverride: string | undefined;

  if (searchParams.get("model")) {
    modelOverride = "fixie-ai/" + searchParams.get("model");
  }

  return children({
    showMuteSpeakerButton,
    modelOverride,
    showDebugMessages,
    showUserTranscripts,
  });
}

// Declare a global variable to store the session
declare global {
  var ultravoxSession: any;
}

export default function AssistantPage() {
  const [isCallActive, setIsCallActive] = useState(false);
  const [callTranscript, setCallTranscript] = useState<Transcript[] | null>([
    {
      speaker: Role.AGENT,
      text: "Hi there!",
      isFinal: false,
      medium: Medium.VOICE,
    },
    {
      speaker: Role.USER,
      text: "Hi am user!",
      isFinal: false,
      medium: Medium.VOICE,
    },
  ]);
  const transcriptContainerRef = useRef<HTMLDivElement>(null);
  const [agentStatus, setAgentStatus] = useState<string>("off");
  const [callDebugMessages, setCallDebugMessages] = useState<
    UltravoxExperimentalMessageEvent[]
  >([]);
  const [customerProfileKey, setCustomerProfileKey] = useState<string | null>(
    null
  );
  const [textInput, setTextInput] = useState("");
  const [showTextInput, setShowTextInput] = useState(false);
  const textInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (transcriptContainerRef.current) {
      transcriptContainerRef.current.scrollTop =
        transcriptContainerRef.current.scrollHeight;
    }
  }, [callTranscript]);

  useEffect(() => {
    if (showTextInput && textInputRef.current) {
      textInputRef.current.focus();
    }
  }, [showTextInput]);

  useEffect(() => {
    if (callTranscript && callTranscript.length > 0) {
      const lastMessage = callTranscript[callTranscript.length - 1];
      if (lastMessage.speaker === Role.AGENT) {
        const text = lastMessage.text.toLowerCase();
        if (
          text.includes("email") ||
          text.includes("phone number") ||
          text.includes("contact") ||
          text.includes("type") ||
          text.includes("spell")
        ) {
          setShowTextInput(true);
        } else if (text.includes("thank you") && text.includes("verified")) {
          setShowTextInput(false);
        }
      }
    }
  }, [callTranscript]);

  const handleStatusChange = useCallback(
    (status: UltravoxSessionStatus | string | undefined) => {
      if (status) {
        setAgentStatus(status);
      } else {
        setAgentStatus("off");
      }
    },
    []
  );

  const handleTranscriptChange = useCallback(
    (transcripts: Transcript[] | undefined) => {
      if (transcripts) {
        setCallTranscript([...transcripts]);
      }
    },
    []
  );

  const handleDebugMessage = useCallback(
    (debugMessage: UltravoxExperimentalMessageEvent) => {
      setCallDebugMessages((prevMessages) => [...prevMessages, debugMessage]);
    },
    []
  );

  const clearCustomerProfile = useCallback(() => {
    setCustomerProfileKey((prev) => (prev ? `${prev}-cleared` : "cleared"));
  }, []);

  const handleStartCallButtonClick = async () => {
    try {
      handleStatusChange("Starting call...");
      setCallTranscript(null);
      setCallDebugMessages([]);
      clearCustomerProfile();

      const newKey = `call-${Date.now()}`;
      setCustomerProfileKey(newKey);

      let callConfig: CallConfig = {
        systemPrompt: demoConfig.callConfig.systemPrompt,
        model: demoConfig.callConfig.model,
        languageHint: demoConfig.callConfig.languageHint,
        voice: demoConfig.callConfig.voice,
        temperature: demoConfig.callConfig.temperature,
        maxDuration: demoConfig.callConfig.maxDuration,
        timeExceededMessage: demoConfig.callConfig.timeExceededMessage,
      };

      const paramOverride: { [key: string]: any } = {
        callId: newKey,
      };

      let cpTool: SelectedTool | undefined =
        demoConfig?.callConfig?.selectedTools?.find(
          (tool) => tool.toolName === "createProfile"
        );

      if (cpTool) {
        cpTool.parameterOverrides = paramOverride;
      }
      callConfig.selectedTools = demoConfig.callConfig.selectedTools;
      await startCall(
        {
          onStatusChange: handleStatusChange,
          onTranscriptChange: handleTranscriptChange,
          onDebugMessage: handleDebugMessage,
        },
        callConfig
      );
      setIsCallActive(true);
      handleStatusChange("Call started successfully");
    } catch (error) {
      handleStatusChange(
        `Error starting call: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
    }
  };

  const handleEndCallButtonClick = async () => {
    try {
      handleStatusChange("Ending call...");
      await endCall();
      setIsCallActive(false);
      setShowTextInput(false);
  
      if (globalThis.ultravoxSession) {
        globalThis.ultravoxSession = null;
      }
      
      clearCustomerProfile();
      setCustomerProfileKey(null);
      handleStatusChange("Call ended successfully");
    } catch (error) {
      handleStatusChange(
        `Error ending call: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
    }
  };

const handleTextInputSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  const currentSession = getCurrentSession();

  if (!textInput.trim()) {
    const errorTranscript: Transcript = {
      speaker: Role.AGENT,
      text: "Please enter some text to send",
      isFinal: true,
      medium: Medium.TEXT,
    };
    setCallTranscript(prev => prev ? [...prev, errorTranscript] : [errorTranscript]);
    return;
  }

  if (!currentSession) {
    const errorTranscript: Transcript = {
      speaker: Role.AGENT,
      text: "Call is not active. Please start a call first.",
      isFinal: true,
      medium: Medium.TEXT,
    };
    setCallTranscript(prev => prev ? [...prev, errorTranscript] : [errorTranscript]);
    return;
  }

  const userTextTranscript: Transcript = {
    speaker: Role.USER,
    text: textInput,
    isFinal: true,
    medium: Medium.TEXT,
  };

  try {
    setCallTranscript(prev => prev ? [...prev, userTextTranscript] : [userTextTranscript]);
    currentSession.sendText(textInput);
    setTextInput("");
  } catch (error) {
    console.error("Failed to send text:", error);

    setCallTranscript(prev => prev ? prev.filter(t => t.text !== textInput || t.speaker !== Role.USER) : []);

    const errorTranscript: Transcript = {
      speaker: Role.AGENT,
      text: "Failed to send your message. Please try again.",
      isFinal: true,
      medium: Medium.TEXT,
    };
    setCallTranscript(prev => prev ? [...prev, errorTranscript] : [errorTranscript]);
  }
};
  return (
    <>
      <Navbar />
      <div className="bg-white px-6 py-6 lg:px-24 lg:py-12 font-poppins">
        <header className="flex justify-between items-center mb-12">
          <div className="logo">
            <Image
              src="/image.png"
              alt="MedSchedular AI"
              width={120}
              height={60}
              className="h-[92px]"
            />
          </div>
          <button className="border border-[#2a509b] text-[#2a509b] rounded-full px-6 py-2 hover:bg-[#f6f7f8] transition-colors h-[45px]" onClick={() => window.open("https://forms.gle/qVSQEEsmccpHvRog8", "_blank")}>
            Join the Waitlist
          </button>
        </header>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex flex-col md:w-1/2">
            <div className="bg-[#f6f7f8] rounded-xl p-4 mb-8 w-full heading-text">
              <p className="text-[#18191b]">
              Surakhsha AI: Compassionate Care, Seamless Scheduling for Your Health Needs
              </p>
            </div>

            <div className="relative mb-8 self-center">
              <div className="rounded-full border-4 border-[#34c759] overflow-hidden">
                <Image
                  src="/ccr.jpg"
                  alt="Medical Agent"
                  width={268}
                  height={270}
                  className="object-cover"
                />
              </div>
            </div>
            <div className="flex gap-12 mb-8 self-center items-center">
              <button className="bg-[#D7E1F4] text-[#1241A1] px-8 py-2 rounded-3xl hover:bg-[#d7e1f4] transition-colors">
                {agentStatus}
              </button>
            </div>

            <div className="flex flex-col justify-between items-start h-full p-4">
              {isCallActive ? (
                <div className="w-full">
                  <div className="mb-5 relative">
                    <div
                      ref={transcriptContainerRef}
                      className="bg-gray-900 rounded-xl px-2 py-6 mb-8 cards"
                    >
                      <ScrollArea
                        size="2"
                        type="always"
                        scrollbars="vertical"
                        style={{ height: 345 }}
                        className="pl-2 pr-4 py-2"
                      >
                        {callTranscript &&
                          callTranscript.map((transcript, index) => (
                            <div key={index}>
                              <>
                                {transcript.speaker === "agent" ? (
                                  <>
                                    <div className="mt-4 mb-4">
                                      <div className="bg-gray-800 text-white text-[14px] pl-3 pt-4 pr-16 pb-4 rounded-3xl hover:bg-gray-700 transition-colors">
                                        {transcript.text}
                                        <div className="text-gray-400 pt-1">
                                          {moment().format("LT")}
                                        </div>
                                      </div>
                                    </div>
                                  </>
                                ) : (
                                  <div className="mt-4 mb-4 flex justify-end">
                                    <div className="w-3/4 lg:w-1/2 bg-gray-700 text-white text-[14px] pl-3 pt-4 pr-12 pb-4 rounded-3xl hover:bg-gray-600 transition-colors">
                                      {transcript.text}
                                      <div className="text-gray-400 pt-1">
                                        {moment().format("LT")}
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </>
                            </div>
                          ))}
                      </ScrollArea>
                    </div>
                    <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-t from-transparent to-gray-900 pointer-events-none" />
                  </div>
                  
                  {/* Text input field for email/phone */}
                  {showTextInput && (
                    <form onSubmit={handleTextInputSubmit} className="mb-4">
                      <div className="flex">
                        <input
                          ref={textInputRef}
                          type="text"
                          value={textInput}
                          onChange={(e) => setTextInput(e.target.value)}
                          placeholder="Type your email or phone number here..."
                          className="w-full px-4 py-2 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                          type="submit"
                          className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 transition-colors"
                        >
                          Send
                        </button>
                      </div>
                    </form>
                  )}
                  
                  <div className="flex justify-center space-x-12 p-4 w-full">
                    <MicToggleButton role={Role.USER} />
                    <button
                      className="bg-[#ff4b4b] text-white rounded-full p-7 hover:bg-[#ff6b6b] transition-colors w-[80px] h-[80px]"
                      onClick={handleEndCallButtonClick}
                      disabled={!isCallActive}
                    >
                      <Phone size={24} />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="w-full flex justify-center">
                  <button
                    type="button"
                    className="hover:bg-blue-700 hover:text-white px-6 py-2 border-2 border-blue-500 text-blue-500 rounded-lg w-full mb-4 transition duration-300"
                    onClick={() => handleStartCallButtonClick()}
                  >
                    Start Call
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="md:w-1/2">
            <div className="bg-white rounded-xl p-6 mb-8 cards">
              <h2 className="text-[19px] font-[600] mb-4">Call Status</h2>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Image
                      src="/images/voice.svg"
                      alt="Real Estate Agent"
                      width={20}
                      height={20}
                      className="object-cover"
                    />
                    <span className="text-[#56585c]">Voice Quality</span>
                  </div>
                  <span className="text-[#34c759]">Excellent</span>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="text-[#ff4b4b]">
                      <Image
                        src="/images/sentiment.svg"
                        alt="Real Estate Agent"
                        width={20}
                        height={20}
                        className="object-cover"
                      />
                    </div>
                    <span className="text-[#56585c]">Sentiment</span>
                  </div>
                  <span className="text-[#ff4b4b]">Neutral</span>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="text-[#34c759] rounded-full">
                      <Image
                        src="/images/lead-status.svg"
                        alt="Real Estate Agent"
                        width={20}
                        height={20}
                        className="object-cover"
                      />
                    </div>
                    <span className="text-[#56585c]">Lead Status</span>
                  </div>
                  <span className="text-[#34c759]">Qualified</span>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="text-[#ffb800]">
                      <Image
                        src="/images/priority.svg"
                        alt="Real Estate Agent"
                        width={20}
                        height={20}
                        className="object-cover"
                      />
                    </div>
                    <span className="text-[#56585c]">Priority</span>
                  </div>
                  <span className="text-[#ffb800]">High</span>
                </div>
              </div>
            </div>

            {isCallActive && (
              <div className="bg-white rounded-xl p-6 mb-8 cards">
                <h2 className="text-[19px] font-[600] mb-4">Input Method</h2>
                <div className="space-y-4">
                  <div className="p-3 border border-gray-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-8 h-8 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full">
                        <Mic size={16} />
                      </div>
                      <span className="font-medium">Voice Input</span>
                    </div>
                    <p className="text-gray-500 text-sm pl-10">Speak your information</p>
                  </div>
                  
                  <div className="p-3 border border-gray-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-8 h-8 flex items-center justify-center bg-green-100 text-green-600 rounded-full">
                        <User size={16} />
                      </div>
                      <span className="font-medium">Text Input</span>
                    </div>
                    <p className="text-gray-500 text-sm pl-10">Type your email or phone number when prompted</p>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-white rounded-xl p-6 cards">
              <h2 className="text-[19px] font-[600] mb-4">
                Available Time Slots
              </h2>

              <div className="space-y-4">
                <div className="flex justify-between items-center border p-4 rounded">
                  <div>
                    <p className="font-medium">10:00 AM</p>
                    <p className="text-sm text-[#56585c]">Today</p>
                  </div>
                  <button className="bg-[#D7E1F4] text-[#1241A1] px-4 py-2 rounded hover:bg-[#d7e1f4] transition-colors">
                    Book
                  </button>
                </div>

                <div className="flex justify-between items-center border p-4 rounded">
                  <div>
                    <p className="font-medium">2:30 PM</p>
                    <p className="text-sm text-[#56585c]">Today</p>
                  </div>
                  <button className="bg-[#D7E1F4] text-[#1241A1] px-4 py-2 rounded hover:bg-[#d7e1f4] transition-colors">
                    Book
                  </button>
                </div>

                <div className="flex justify-between items-center border p-4 rounded">
                  <div>
                    <p className="font-medium">11:00 AM</p>
                    <p className="text-sm text-[#56585c]">Tomorrow</p>
                  </div>
                  <button className="bg-[#D7E1F4] text-[#1241A1] px-4 py-2 rounded hover:bg-[#d7e1f4] transition-colors">
                    Book
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}