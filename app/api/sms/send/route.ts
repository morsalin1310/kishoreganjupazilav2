import { NextResponse } from "next/server";

// Helper: Convert Bengali digits to English
function normalizePhoneNumber(phone: string): string {
  const banglaDigits: { [key: string]: string } = {
    "০": "0", "১": "1", "২": "2", "৩": "3", "৪": "4",
    "৫": "5", "৬": "6", "৭": "7", "৮": "8", "৯": "9",
  };
  let cleaned = phone.replace(/[০-৯]/g, (d) => banglaDigits[d] || d);
  cleaned = cleaned.replace(/[^0-9]/g, "");

  // Format to standard 11 digits (e.g., 017XXXXXXXX) or 880XXXXXXXXXXX
  if (cleaned.startsWith("880") && cleaned.length === 13) {
    return cleaned;
  }
  if (cleaned.startsWith("0") && cleaned.length === 11) {
    return "88" + cleaned; // Standard international prefix for BD SMS gateways
  }
  return cleaned;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { to, message, recipient_type, recipient_target } = body;

    if (!to || !message) {
      return NextResponse.json(
        { success: false, error: "মোবাইল নম্বর ও মেসেজ বাধ্যতামূলক।" },
        { status: 400 }
      );
    }

    const provider = process.env.SMS_PROVIDER || "bulksmsbd";
    const apiKey = process.env.SMS_API_KEY || "";
    const senderId = process.env.SMS_SENDER_ID || "KUSD";
    const apiUrl = process.env.SMS_API_URL || "";

    const recipients = Array.isArray(to) ? to : [to];
    const normalizedRecipients = recipients
      .map(normalizePhoneNumber)
      .filter((p) => p.length >= 11);

    // If no real SMS API key is configured, run in safe simulated mode
    if (!apiKey) {
      console.log(`[SMS-SIMULATION] Provider: ${provider}`);
      console.log(`[SMS-SIMULATION] To: ${normalizedRecipients.join(", ")}`);
      console.log(`[SMS-SIMULATION] Message: ${message}`);

      return NextResponse.json({
        success: true,
        mode: "simulated",
        message: "মেসেজ সফলভাবে প্রসেস হয়েছে (সিমুলেশন মোড: SMS API Key সেট করা হলে সরাসরি মোবাইলে যাবে)।",
        recipients_count: normalizedRecipients.length,
        timestamp: new Date().toISOString(),
      });
    }

    // Real SMS Sending logic based on provider
    let gatewayResponse: any = null;

    if (provider === "bulksmsbd") {
      // BulkSMSBD API (Very popular in Bangladesh)
      const targetUrl = apiUrl || "http://bulksmsbd.net/api/smsapi";
      const params = new URLSearchParams({
        api_key: apiKey,
        type: "unicode", // for Bengali Bangla text support
        number: normalizedRecipients.join(","),
        senderid: senderId,
        message: message,
      });

      const res = await fetch(`${targetUrl}?${params.toString()}`, {
        method: "GET",
      });
      gatewayResponse = await res.json().catch(() => res.text());
    } else if (provider === "greenweb") {
      // Greenweb SMS API
      const targetUrl = apiUrl || "https://api.greenweb.com.bd/api.php";
      const params = new URLSearchParams({
        token: apiKey,
        to: normalizedRecipients.join(","),
        message: message,
      });

      const res = await fetch(`${targetUrl}?${params.toString()}`, {
        method: "GET",
      });
      gatewayResponse = await res.text();
    } else if (provider === "mimsms") {
      // MimSMS API
      const targetUrl = apiUrl || "https://mimsms.com/smsapi";
      const params = new URLSearchParams({
        api_key: apiKey,
        type: "unicode",
        contacts: normalizedRecipients.join(","),
        senderid: senderId,
        msg: message,
      });

      const res = await fetch(`${targetUrl}?${params.toString()}`, {
        method: "GET",
      });
      gatewayResponse = await res.json().catch(() => res.text());
    } else {
      // Generic POST Webhook Gateway
      const targetUrl = apiUrl;
      if (targetUrl) {
        const res = await fetch(targetUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            to: normalizedRecipients,
            message: message,
            sender_id: senderId,
          }),
        });
        gatewayResponse = await res.json().catch(() => res.text());
      }
    }

    return NextResponse.json({
      success: true,
      mode: "live_gateway",
      provider: provider,
      recipients_count: normalizedRecipients.length,
      response: gatewayResponse,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error("SMS API Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "এসএমএস প্রেরণে ত্রুটি ঘটেছে।",
      },
      { status: 500 }
    );
  }
}

