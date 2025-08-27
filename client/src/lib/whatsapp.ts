export function generateWhatsAppLink(phoneNumber: string, message?: string): string {
  // Remove any non-digit characters except +
  const cleanPhone = phoneNumber.replace(/[^\d+]/g, '');
  
  // Ensure phone starts with +
  const formattedPhone = cleanPhone.startsWith('+') ? cleanPhone : `+${cleanPhone}`;
  
  // Create base wa.me URL
  let link = `https://wa.me/${formattedPhone.slice(1)}`; // Remove + for wa.me format
  
  // Add message if provided
  if (message && message.trim()) {
    const encodedMessage = encodeURIComponent(message.trim());
    link += `?text=${encodedMessage}`;
  }
  
  return link;
}

export function validatePhoneNumber(phoneNumber: string): boolean {
  // Basic validation for international phone numbers
  const phoneRegex = /^\+[1-9]\d{1,14}$/;
  const cleanPhone = phoneNumber.replace(/[\s-()]/g, '');
  return phoneRegex.test(cleanPhone);
}

export function formatPhoneNumber(phoneNumber: string): string {
  // Remove any non-digit characters except +
  const cleaned = phoneNumber.replace(/[^\d+]/g, '');
  
  // Ensure it starts with +
  if (!cleaned.startsWith('+')) {
    return '+' + cleaned;
  }
  
  return cleaned;
}
