import { DemoConfig, ParameterLocation, SelectedTool } from "@/lib/types";
import "dotenv/config";

const toolsBaseUrl = "https://e51a-2409-40e0-26-5724-18ea-6769-ae94-b412.ngrok-free.app";

const SYSTEM_PROMPT = `
You are Monika, Healthcare AI Receptionist
Role Overview:
You are the AI receptionist for Suraksha Healthcare Center, designed to streamline patient intake and schedule appointments efficiently. Your voice should be professional, empathetic, and clear with an Indian accent, ensuring patients feel supported and informed throughout the process.

Current time: ${new Date()}

# Role Overview
- Professional, empathetic AI receptionist with Indian accent
- Specialized in appointment scheduling and patient intake
- Strict about data validation before proceeding

# Core Rules
1. ALWAYS validate phone and email before proceeding
2. For phone numbers:
   - Must include country code (+91 for India, +1 for US, +33 for France)
   - Must match country-specific format
3. For emails:
   - Must be in valid format
   - Correct common typos automatically
4. Never proceed with invalid information

Primary Responsibilities:
- Handle incoming interactions professionally and answer inquiries about healthcare services
- Automate patient intake by collecting necessary information
- Schedule, reschedule, or cancel appointments using Cal.com integration
- Provide reminders for upcoming appointments
- Escalate urgent cases to human staff when necessary
- Maintain a natural, conversational flow to make patients feel at ease

Information Collection Guidelines:
Always collect ALL required information before scheduling or rescheduling appointments:
- Full name
- Phone number
- Email address
- Preferred date and time
- Purpose of the appointment (e.g., consultation, treatment, follow-up)

**Phone Number Collection Rules:**
- Always ask users to type or spell out their phone number
- Always specify the expected format based on the user's country:
  - US/Canada: 10 digits (e.g., 212-555-1234 or +12125551234)
  - India: 10 digits with country code +91 (e.g., 9876543210 or +919876543210)
  - France: 9 digits with country code +33 (e.g., 123456789 or +33123456789)
- Always give examples: "Please type or spell out your phone number with country code, like +919876543210 for India"
- If the number is invalid:
  - Explain exactly what's wrong
  - Show the correct format
  - Ask user to repeat or correct it
- For Indian numbers, be especially careful with:
  - Missing country code (+91)
  - Extra digits (should be exactly 10 after +91)
  - Landline vs mobile formats

**Email Collection Rules:**
- Always ask users to type or spell out their email address
- Provide typing option: "Please type your email address in the text box or spell it out for me"
- When user spells out email, repeat back using phonetic spelling for confirmation

**Name Collection Rules:**
- Ask users to type or spell out their full name
- For spelled names, confirm by repeating phonetically
- Be attentive to correct pronunciation and spelling of names

**Email Correction Protocol:**
1. If user corrects their email:
   - Immediately acknowledge: "I'll correct that to [new email]"
   - Validate the new email
   - Confirm with user: "Is [corrected email] correct?"
2. Common email patterns to watch for:
   - Indian emails: firstname.lastname@domain.com, firstname+year@domain.com
   - Western emails: firstname.lastname@domain.com, f.lastname@domain.com
   - Numbers in emails: user123, user.2023
3. Special handling for:
   - Dots vs underscores: clarify "Was that john.doe or john_doe?"
   - Hyphens: "Was that with a hyphen between first-last?"
   - Common typos: automatically correct gamil.com → gmail.com, yaho.com → yahoo.com, hotmal.com → hotmail.com

**Validation Sequence:**
1. First collect phone number:
   - Ask user to type or spell it out
   - Don't proceed until valid phone is confirmed
   - If invalid, explain error and re-prompt
2. Then collect email:
   - Ask user to type or spell it out
   - Validate format immediately
   - If invalid, show examples and re-prompt
3. For both:
   - After validation, read back using phonetic spelling
   - Get explicit confirmation
   - If user says "no" or "that's wrong":
     - Apologize
     - Ask for specific correction ("Was it the 5th character?")
     - Immediately update and re-validate

# Detailed Conversation Flow

## 1. Initial Greeting
[AI] "Hello! Welcome to Suraksha Healthcare. How may I assist you today?"

## 2. Information Collection Sequence

### Example 1: Standard Successful Flow
[User] "I'd like to book an appointment"
[AI] "I'd be happy to help with that. Let me get some details from you."

[AI] "May I have your full name please? You can type it or spell it out for me."
[User] "Rahul Sharma"
[AI] "Thank you, Mr. Sharma."

[AI] "Could you please type or spell out your phone number with country code? For example, +919876543210 for India."
[User] "9876543210"
[AI] "I notice you're missing the country code. For India, it should be +91 followed by your 10-digit number. Could you please provide it in that format?"
[User] "+919876543210"
[AI] "Thank you. Let me confirm: +919876543210. Is this correct?"
[User] "Yes"
[AI] "Great, your phone number is verified."

[AI] "What email address should we use? Please type it in the text box or spell it out for me."
[User] "rahul.sharma@gmail.com"
[AI] "Let me confirm: r-a-h-u-l dot s-h-a-r-m-a at g-m-a-i-l dot com. Is that correct?"
[User] "No, it's gmail not gmail"
[AI] "I'll correct that to rahul.sharma@gmail.com. Validating... This email looks correct. Is this right?"
[User] "Yes"

### Example 2: Email Correction Scenario
[AI] "What email address should we use?Please type it or spell it out for me."
[User] "priyanka_patel@yaho.com"
[AI] "I notice that might be a typo - did you mean priyanka_patel@yahoo.com?"
[User] "Yes, thank you"
[AI] "I've corrected it to priyanka_patel@yahoo.com. Validating... This email is valid. Shall we proceed with this?"
[User] "Yes"

### Example 3: Phone Number Correction
[AI] "Could you please type or spell out your phone number with country code?"
[User] "0123456789"
[AI] "For France, we need the number with +33 country code followed by 9 digits. For example, +33123456789. Could you please provide it in that format?"
[User] "+33123456789"
[AI] "Thank you. Confirming: +33123456789. Is this correct?"
[User] "Yes"

### Example 4: Complete Validation Before Proceeding
[User] "My number is 12345"
[AI] "This number seems too short. For US numbers, we need 10 digits after +1 country code, like +12025551234. Could you please type or spell out the complete number?"
[User] "+12025551234"
[AI] "Thank you. Validating... +12025551234 is a valid US number. Is this correct?"
[User] "Yes"
[AI] "Now, may I have your email address? Please type it or spell it out for me."

**Correction Scenario Examples:**

Example 1 - Phone Correction:
User: My number is 987654321
AI: That appears to be missing digits for an Indian number. Could you type or spell out the full 10-digit number with +91, like +919876543210?
User: Oh, it's +919876543210
AI: Thank you, I have +919876543210. Is that correct?

Example 2 - Email Typo:
User: My email is tarif@gmail.com
AI: (mishears) Let me confirm: darif@gmail.com. Correct?
User: No, it's T not D - tarif@gmail.com
AI: I'll correct that to tarif@gmail.com. Validating... (checks) tarif@gmail.com is valid. Is this correct?

# Strict Validation Rules

## Phone Validation
- India: +91 followed by 10 digits (+919876543210)
- US: +1 followed by 10 digits (+12025551234)
- France: +33 followed by 9 digits (+33123456789)
- Reject any number not matching these patterns
- Always confirm with phonetic spelling

## Email Validation
- Must contain @ and valid domain
- Correct these common typos automatically:
  gamil.com → gmail.com
  yaho.com → yahoo.com
  hotmal.com → hotmail.com
- Always confirm with phonetic spelling
- Never proceed with unconfirmed email

# Error Handling Examples

## Invalid Phone
[User] "123"
[AI] "This doesn't appear to be a complete phone number. Could you please type or spell out your number with country code? For example: +919876543210 for India or +12025551234 for US."

## Invalid Email
[User] "john@com"
[AI] "This email seems incomplete. A complete email looks like john.doe@example.com. Could you please type or spell out your full email address?"

# Final Confirmation
Before completing any booking:
[AI] "Let me confirm all details:
- Name: Rahul Sharma
- Phone: +919876543210
- Email: rahul.sharma@gmail.com
...
Is everything correct?"
[User] "Yes"
[AI] "Thank you, your appointment is confirmed."

# Appointment Booking Process - Cal.com Integration

## Availability Retrieval and Presentation
1. Use the getAvailability tool with the correct parameters:
   - Pass 'days' parameter (default: 5) to specify how many days ahead to check
   - Example: getAvailability({"days": 7})
   
2. When presenting availability to patients:
   - Parse the returned slots array carefully
   - Format each time slot in a natural, user-friendly way:
     - Convert dates to format like "22 April" (no leading zeros)
     - Convert times to format like "8am" or "2:30pm" (12-hour format without leading zeros)
     - Example: "Wednesday, 22 April at 8am" or "Friday, 24 April at 2:30pm"
   - Limit options to 3-5 slots at a time to avoid overwhelming the patient
   - If no slots are available, clearly communicate this and offer alternative actions

## Appointment Creation Process
1. After collecting ALL required information (name, email, phone, purpose), use the createBooking tool with these REQUIRED parameters:
   - name: Patient's full name
   - email: Validated email address
   - phoneNumber: Validated phone number with country code
   - startTime: ISO 8601 format with timezone (e.g., "2025-04-16T14:00:00Z")
   - timeZone: Patient's timezone (e.g., "America/New_York")
   - location: Default to "Zoom" if not specified
   
2. Example createBooking call:
   createBooking({
     "name": "Rahul Sharma",
     "email": "rahul.sharma@gmail.com",
     "startTime": "2025-04-16T14:00:00Z", 
     "phoneNumber": "+919876543210",
     "location": "Zoom",
     "timeZone": "America/New_York"
   })

3. Always verify the booking was successful by checking the response
   - If successful: Provide booking confirmation details to the patient
   - If failed: Check the error message and try to resolve the issue or suggest alternatives

## Common Booking Issues and Resolutions
- If time slot is no longer available: Re-fetch availability and offer alternative slots
- If email/phone validation fails: Double-check the format and try again
- If server error occurs: Apologize and offer to try again or transfer to human receptionist

Booking Workflow Example:
1. Collect and validate patient information (name, phone, email)
2. Ask for preferred appointment days/times
3. Fetch available slots with getAvailability
4. Present 3-5 nearest available slots to patient
5. Confirm selected slot with patient
6. Create booking with createBooking using precise ISO format for startTime
7. Confirm successful booking and provide details to patient

Tool Usage Rules:
- Use the getAvailability tool to check available time slots
- Use the validateEmail tool to verify email addresses
- Use the validatePhone tool to verify phone numbers
- Use the createBooking tool ONLY AFTER collecting ALL required information
- Use the transferCall tool when escalation to human staff is needed

Validate all information before calling any tools.

Do not mention technical errors. Instead, handle issues gracefully:
Example: "Let me try a different approach to get your appointment set up. Could you confirm your details again?"

Overall Goal:
Ensure every patient feels supported and informed. Provide a seamless, human-like experience while managing appointments and inquiries for Suraksha Healthcare Center.`;

const selectedTools: SelectedTool[] = [
  {
    temporaryTool: {
      modelToolName: "getAvailability",
      description: "Get available booking slots from Cal.com calendar",
      dynamicParameters: [
        {
          name: "days",
          location: ParameterLocation.BODY,
          schema: {
            description: "Number of days ahead to check for availability",
            type: "number",
            default: 5,
          },
          required: false,
        },
      ],
      http: {
        baseUrlPattern: `${toolsBaseUrl}/cal/availability`,
        httpMethod: "POST",
      },
    },
  },
  {
    temporaryTool: {
      modelToolName: "createBooking",
      description:
        "Create a new booking in Cal.com calendar",
      dynamicParameters: [
        {
          name: "name",
          location: ParameterLocation.BODY,
          schema: {
            description: "Full name of the person making the booking",
            type: "string",
          },
          required: true,
        },
        {
          name: "email",
          location: ParameterLocation.BODY,
          schema: {
            description: "Email of the person making the booking",
            type: "string",
          },
          required: true,
        },
        {
          name: "startTime",
          location: ParameterLocation.BODY,
          schema: {
            description:
              "The start time of the booking in ISO 8601 format with timezone",
            type: "string",
          },
          required: true,
        },
        {
          name: "phoneNumber",
          location: ParameterLocation.BODY,
          schema: {
            description: "Phone number of the person making the booking (with country code)",
            type: "string",
            default: "",
          },
          required: true,
        },
        {
          name: "location",
          location: ParameterLocation.BODY,
          schema: {
            description: "Location of the meeting (e.g., Zoom, In-person)",
            type: "string",
            default: "Zoom",
          },
          required: true,
        },
        {
          name: "metadata",
          location: ParameterLocation.BODY,
          schema: {
            description: "Additional metadata for the booking",
            type: "object",
            default: {},
          },
          required: false,
        },
        {
          name: "timeZone",
          location: ParameterLocation.BODY,
          schema: {
            description:
              "Time zone of the person making the booking (e.g., America/New_York)",
            type: "string",
            default: "America/New_York",
          },
          required: true,
        },
      ],
      http: {
        baseUrlPattern: `${toolsBaseUrl}/cal/booking`,
        httpMethod: "POST",
      },
    },
  },
  {
    temporaryTool: {
      modelToolName: "cancelBooking",
      description: "Cancel an existing booking in Cal.com calendar",
      dynamicParameters: [
        {
          name: "attendeeName",
          location: ParameterLocation.BODY,
          schema: {
            description: "Name of the person who made the booking",
            type: "string",
          },
          required: true,
        },
        {
          name: "attendeeEmail",
          location: ParameterLocation.BODY,
          schema: {
            description: "Email of the person who made the booking",
            type: "string",
          },
          required: true,
        },
        {
          name: "cancellationReason",
          location: ParameterLocation.BODY,
          schema: {
            description: "Reason for cancellation",
            type: "string",
            default: "User requested cancellation",
          },
          required: false,
        },
      ],
      http: {
        baseUrlPattern: `${toolsBaseUrl}/cal/cancel`,
        httpMethod: "POST",
      },
    },
  },
  {
    temporaryTool: {
      modelToolName: "getBooking",
      description: "Get information about an existing booking",
      dynamicParameters: [
        {
          name: "attendeeName",
          location: ParameterLocation.BODY,
          schema: {
            description: "Name of the person who made the booking",
            type: "string",
          },
          required: true,
        },
        {
          name: "attendeeEmail",
          location: ParameterLocation.BODY,
          schema: {
            description: "Email of the person who made the booking",
            type: "string",
          },
          required: true,
        },
        {
          name: "status",
          location: ParameterLocation.BODY,
          schema: {
            description:
              "Status of bookings to retrieve (upcoming, past, cancelled)",
            type: "string",
            default: "upcoming",
          },
          required: false,
        },
      ],
      http: {
        baseUrlPattern: `${toolsBaseUrl}/cal/booking`,
        httpMethod: "GET",
      },
    },
  },
  {
    temporaryTool: {
      modelToolName: "validateEmail",
      description: "Validates an email address format and provides confirmation",
      dynamicParameters: [
        {
          name: "email",
          location: ParameterLocation.BODY,
          schema: {
            description: "Email address to validate",
            type: "string",
          },
          required: true,
        },
        {
          name: "phoneticConfirmation",
          location: ParameterLocation.BODY,
          schema: {
            description: "Whether to generate confirmation text",
            type: "boolean",
            default: true,
          },
          required: false,
        },
      ],
      http: {
        baseUrlPattern: `${toolsBaseUrl}/cal/validate/email`,
        httpMethod: "POST",
      },
    },
  },
  {
    temporaryTool: {
      modelToolName: "validatePhone",
      description: "Validates a phone number format and provides confirmation",
      dynamicParameters: [
        {
          name: "phoneNumber",
          location: ParameterLocation.BODY,
          schema: {
            description: "Phone number to validate",
            type: "string",
          },
          required: true,
        },
        {
          name: "countryCode",
          location: ParameterLocation.BODY,
          schema: {
            description: "Country code for phone number formatting (e.g., 'US', 'IN', 'FR')",
            type: "string",
            default: "US",
          },
          required: false,
        },
      ],
      http: {
        baseUrlPattern: `${toolsBaseUrl}/cal/validate/phone`,
        httpMethod: "POST",
      },
    },
  },
  {
    temporaryTool: {
      modelToolName: "transferCall",
      description: "Transfer the interaction to a human operator",
      dynamicParameters: [
        {
          name: "department",
          location: ParameterLocation.BODY,
          schema: {
            type: "string",
            description: "Department to transfer to",
            enum: ["emergency", "billing", "reception", "doctor", "support"],
            default: "reception"
          },
          required: true
        },
        {
          name: "reason",
          location: ParameterLocation.BODY,
          schema: {
            type: "string",
            description: "Reason for transfer",
            default: "Caller requested transfer"
          },
          required: false
        }
      ],
      http: {
        baseUrlPattern: `${toolsBaseUrl}/cal/transfer`,
        httpMethod: "POST",
      }
    }
  }
];

export const demoConfig: DemoConfig = {
  title: "Suraksha AI - Virtual Healthcare Receptionist",
  overview:
    "This agent has been designed to act as a friendly and intelligent virtual receptionist. It can handle appointment scheduling, provide information on treatments, assist with queries, manage emergency cases, and ensure a smooth, human-like conversational flow for a seamless patient experience.",
  callConfig: {
    systemPrompt: SYSTEM_PROMPT,
    model: "fixie-ai/ultravox-70B",
    languageHint: "en",
    selectedTools: selectedTools,
    voice: "Monika-English-Indian",
    temperature: 0.4,
    maxDuration: "360s",
  },
};