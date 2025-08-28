import { useState, useEffect } from "react";
import QRCode from "qrcode";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Download, QrCode, Share2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/hooks/use-language";

interface QRCodeGeneratorProps {
  url: string;
  title?: string;
}

export function QRCodeGenerator({ url, title }: QRCodeGeneratorProps) {
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();
  const { language } = useLanguage();

  useEffect(() => {
    if (url && isOpen) {
      generateQRCode();
    }
  }, [url, isOpen]);

  const generateQRCode = async () => {
    try {
      const qrUrl = await QRCode.toDataURL(url, {
        width: 256,
        margin: 2,
        color: {
          dark: '#16a34a', // Green color for better branding
          light: '#ffffff'
        },
        errorCorrectionLevel: 'M'
      });
      setQrCodeUrl(qrUrl);
    } catch (error) {
      console.error('Error generating QR code:', error);
      toast({
        title: language === 'ar' ? 'خطأ' : 'Error',
        description: language === 'ar' ? 'فشل في إنشاء رمز QR' : 'Failed to generate QR code',
        variant: "destructive",
      });
    }
  };

  const downloadQRCode = () => {
    if (!qrCodeUrl) return;
    
    const link = document.createElement('a');
    link.download = `QR_${title || 'whatsapp-link'}.png`;
    link.href = qrCodeUrl;
    link.click();
    
    toast({
      title: language === 'ar' ? 'تم التحميل' : 'Downloaded',
      description: language === 'ar' ? 'تم تحميل رمز QR بنجاح' : 'QR code downloaded successfully',
    });
  };

  const shareQRCode = async () => {
    if (!qrCodeUrl) return;

    try {
      // Convert data URL to blob
      const response = await fetch(qrCodeUrl);
      const blob = await response.blob();
      const file = new File([blob], `QR_${title || 'whatsapp-link'}.png`, { type: 'image/png' });

      if (navigator.share && navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: language === 'ar' ? 'رمز QR للرابط' : 'QR Code for Link',
          text: language === 'ar' ? 'رمز QR لرابط واتساب' : 'QR Code for WhatsApp link',
          files: [file]
        });
      } else {
        // Fallback - copy to clipboard
        await navigator.clipboard.writeText(url);
        toast({
          title: language === 'ar' ? 'تم النسخ' : 'Copied',
          description: language === 'ar' ? 'تم نسخ الرابط' : 'Link copied to clipboard',
        });
      }
    } catch (error) {
      console.error('Error sharing QR code:', error);
      toast({
        title: language === 'ar' ? 'خطأ' : 'Error',
        description: language === 'ar' ? 'فشل في المشاركة' : 'Failed to share',
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <QrCode className="h-4 w-4" />
          {language === 'ar' ? 'رمز QR' : 'QR Code'}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">
            {language === 'ar' ? 'رمز QR للرابط' : 'QR Code for Link'}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Card>
            <CardContent className="flex justify-center items-center p-6">
              {qrCodeUrl ? (
                <div className="space-y-4 text-center">
                  <img 
                    src={qrCodeUrl} 
                    alt="QR Code" 
                    className="mx-auto rounded-lg shadow-lg border"
                    width={256}
                    height={256}
                  />
                  <p className="text-sm text-muted-foreground">
                    {language === 'ar' ? 
                      'امسح الرمز للفتح في واتساب' : 
                      'Scan to open in WhatsApp'
                    }
                  </p>
                </div>
              ) : (
                <div className="flex items-center justify-center h-64 w-64">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              )}
            </CardContent>
          </Card>

          {qrCodeUrl && (
            <div className="flex gap-2 justify-center">
              <Button onClick={downloadQRCode} variant="outline" className="gap-2">
                <Download className="h-4 w-4" />
                {language === 'ar' ? 'تحميل' : 'Download'}
              </Button>
              <Button onClick={shareQRCode} variant="outline" className="gap-2">
                <Share2 className="h-4 w-4" />
                {language === 'ar' ? 'مشاركة' : 'Share'}
              </Button>
            </div>
          )}

          <div className="text-xs text-muted-foreground text-center break-all">
            {url}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}