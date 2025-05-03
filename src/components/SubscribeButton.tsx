import React, { useState } from "react";

// הכנס כאן את ה-plan_id שלך
const PLAN_ID = "PASTE_YOUR_PLAN_ID_HERE";

// כתובת ה-API של PayPal Sandbox (לבדיקות)
const PAYPAL_API = "https://api-m.sandbox.paypal.com/v1/billing/subscriptions";

const SubscribeButton: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // הכנס כאן את ה-access token שלך (רק לבדיקה! לא לשים בפרודקשן)
  const ACCESS_TOKEN = "PASTE_YOUR_ACCESS_TOKEN_HERE";

  const handleSubscribe = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(PAYPAL_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
        body: JSON.stringify({
          plan_id: PLAN_ID,
          application_context: {
            brand_name: "העסק שלך",
            return_url: "https://your-site.com/success", // שנה לכתובת שלך
            cancel_url: "https://your-site.com/cancel", // שנה לכתובת שלך
          },
        }),
      });
      const data = await res.json();
      if (data && data.links) {
        const approval = data.links.find((l: any) => l.rel === "approve");
        if (approval) {
          window.location.href = approval.href;
          return;
        }
      }
      setError("לא התקבל קישור אישור מ-PayPal");
    } catch (e) {
      setError("שגיאה ביצירת מנוי: " + (e as any).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={handleSubscribe} disabled={loading} style={{padding: 12, fontSize: 18}}>
        {loading ? "טוען..." : "הירשם למנוי ב-PayPal"}
      </button>
      {error && <div style={{color: 'red', marginTop: 8}}>{error}</div>}
    </div>
  );
};

export default SubscribeButton; 