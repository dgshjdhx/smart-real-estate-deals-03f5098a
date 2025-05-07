
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { SubscriptionTier } from "@/types";

interface SubscribeButtonProps {
  tier: SubscriptionTier;
  price: number;
}

const SubscribeButton: React.FC<SubscribeButtonProps> = ({ tier, price }) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // יש להחליף את אלה בערכים האמיתיים מהפורטל המפתחים של PayPal
  const PLAN_IDS: Record<SubscriptionTier, string> = {
    'Free': '',
    'Pro': 'P-1AB23456CD789012EXYZABCD', // דוגמה - החלף בזיהוי תכנית אמיתי
    'Broker': 'P-2AB23456CD789012EXYZEFGH' // דוגמה - החלף בזיהוי תכנית אמיתי
  };

  // כתובת ה-API של PayPal (לפיתוח או לייצור)
  const PAYPAL_API = "https://api-m.sandbox.paypal.com/v1/billing/subscriptions";
  
  const handleSubscribe = async () => {
    if (tier === 'Free') {
      // אין צורך במנוי עבור התכנית החינמית
      toast({
        title: "חשבון חינמי",
        description: "אתה כבר משתמש בגרסה החינמית.",
      });
      return;
    }

    setLoading(true);
    try {
      // בסביבת הפיתוח (כאן), אנו פשוט פותחים חלון חדש שמדמה את תהליך ההרשמה של PayPal
      // בסביבת הייצור, יש להשתמש ב-API אמיתי עם הרשאות גישה מתאימות
      
      toast({
        title: "מעבר ל-PayPal",
        description: "מעבירים אותך לעמוד התשלום של PayPal"
      });
      
      // בסביבת ייצור אמיתית:
      // 1. שלח בקשה לשרת שלך שיצור מנוי באמצעות פרטי האימות המאובטחים
      // 2. קבל את כתובת האישור והפנה את המשתמש לשם
      
      // פתיחת דף PayPal מדומה עבור הדגמה
      setTimeout(() => {
        const planId = PLAN_IDS[tier];
        window.open(
          `https://www.sandbox.paypal.com/webapps/billing/subscriptions?plan_id=${planId}`,
          "_blank"
        );
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error("שגיאה בתהליך הרישום למנוי:", error);
      toast({
        variant: "destructive",
        title: "שגיאה בהרשמה",
        description: "לא ניתן היה להתחבר לשירותי התשלום. נסה שוב מאוחר יותר.",
      });
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleSubscribe}
      disabled={loading || tier === 'Free'}
      variant={tier === 'Free' ? "outline" : "default"}
      className="w-full"
    >
      {loading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          מעבר לתשלום...
        </>
      ) : tier === 'Free' ? (
        "התחל בחינם"
      ) : (
        `שדרג ל-${tier}`
      )}
    </Button>
  );
};

export default SubscribeButton;
