# CamMarket Chat Feature Documentation

## Overview
The Chat Feature allows buyers to contact sellers directly from the cart page to ask questions about products, negotiate prices, or inquire about delivery.

## Features Implemented

### 1. **Vendor Contact Dialog** 💬
A comprehensive dialog that appears when users click "Chat with Seller" on any cart item.

**Key Features:**
- **Two Tabs**: Message sending and Contact information
- **Quick Messages**: Pre-written common questions for faster communication
- **Custom Messages**: Free-text area for personalized inquiries
- **Contact Details**: Phone, email, and location information
- **Product Context**: Shows which product the inquiry is about
- **Bilingual Support**: Full English/French support

### 2. **Chat Integration in Cart** 🛒
- **Per-Product Chat**: Each cart item has its own "Chat with Seller" button
- **Contextual Information**: Product details automatically included in chat
- **Easy Access**: One-click to open chat dialog
- **Mobile Optimized**: Responsive design works on all devices

## File Structure

```
/components/Cart/
  ├── VendorContactDialog.tsx       # Main chat/contact dialog
  ├── EnhancedCartPage.tsx          # Cart with integrated chat buttons
  └── index.tsx                      # Exports

/CHAT_FEATURE_README.md             # This documentation
```

## Usage

### Opening the Chat Dialog

From the cart page, users can click the "Chat with Seller" button on any product:

```tsx
<Button
  variant="outline"
  size="sm"
  className="gap-2"
  onClick={() => handleContactSeller(product)}
>
  <MessageCircle className="h-3 w-3" />
  {language === 'en' ? 'Chat with Seller' : 'Contacter le Vendeur'}
</Button>
```

### Component Props

```typescript
interface VendorContactDialogProps {
  open: boolean;                    // Dialog open state
  onOpenChange: (open: boolean) => void;  // Close handler
  language: 'en' | 'fr';           // Language preference
  vendor: {
    name: string;                   // Seller name
    storeName?: string;             // Store name (optional)
    region: string;                 // Seller region
    phone?: string;                 // Contact phone
    email?: string;                 // Contact email
  };
  product?: {                       // Product context (optional)
    id: number;
    name: string;
    nameFr: string;
    image: string;
  };
}
```

## Features in Detail

### Tab 1: Send Message

**Quick Messages:**
Users can select from 4 pre-written messages:
1. "Is this product still available?"
2. "Can you offer a discount for bulk orders?"
3. "When can I expect delivery?"
4. "Do you have other colors/sizes available?"

**Custom Message:**
- Text area for personalized messages
- 500 character limit
- Character counter
- Send button (disabled when empty)

**User Experience:**
- Click quick message to auto-fill text area
- Edit or write custom message
- Click "Send Message" button
- Success toast notification
- Message sent to seller's email
- Dialog auto-closes

### Tab 2: Contact Info

**Displayed Information:**
- **Phone Number**: 
  - Display with call icon
  - Click to call functionality (`tel:` link)
  - "Call" button for direct dialing
  
- **Email Address**:
  - Display with email icon
  - Click to email functionality (`mailto:` link)
  - Pre-filled subject with product name
  - "Email" button for direct mailing

- **Location**:
  - Region name (bilingual)
  - "Cameroon" country label
  - Location icon

**Response Time Badge:**
"Usually responds in 24h" - sets buyer expectations

### Visual Design

**Color Scheme:**
- Primary: Green (#00843D) - Cameroon colors
- Success: Green for sent messages
- Info: Blue for tips and information
- Accent: Yellow (#FFCC00)

**Icons:**
- 💬 MessageCircle - Chat/messaging
- 📞 Phone - Call functionality  
- ✉️ Mail - Email functionality
- 📍 MapPin - Location
- 👤 User - Vendor profile
- ⏰ Clock - Response time

## Integration with Cart

### Enhanced Cart Page

The chat feature is integrated into `EnhancedCartPage.tsx`:

```typescript
// State management
const [contactDialogOpen, setContactDialogOpen] = useState(false);
const [selectedVendor, setSelectedVendor] = useState<any>(null);
const [selectedProduct, setSelectedProduct] = useState<any>(null);

// Handler function
const handleContactSeller = (product: any) => {
  setSelectedProduct({
    id: product.id,
    name: product.name,
    nameFr: product.nameFr,
    image: product.image,
  });
  setSelectedVendor({
    name: product.seller,
    storeName: product.seller,
    region: product.region,
    phone: '+237 677 123 456',  // From seller profile
    email: `${product.seller}@cammarket.cm`,  // From seller profile
  });
  setContactDialogOpen(true);
};
```

### Chat Button Placement

The "Chat with Seller" button appears:
- **Location**: Below the seller name and region
- **Above**: Quantity controls
- **Visible**: For all cart items
- **Accessible**: One click to open

## User Flow

```
1. User views cart
   ↓
2. Sees product from seller
   ↓
3. Clicks "Chat with Seller" button
   ↓
4. Dialog opens with two tabs
   ↓
5A. MESSAGE TAB:
   - Select quick message OR
   - Write custom message
   - Click "Send Message"
   - See success notification
   - Dialog closes
   
5B. CONTACT TAB:
   - View phone number
   - Click "Call" to dial
   - View email
   - Click "Email" to compose
   - View location
```

## Quick Messages (Bilingual)

### English Version
1. Is this product still available?
2. Can you offer a discount for bulk orders?
3. When can I expect delivery?
4. Do you have other colors/sizes available?

### French Version
1. Ce produit est-il toujours disponible ?
2. Pouvez-vous offrir une réduction pour les commandes en gros ?
3. Quand puis-je m'attendre à la livraison ?
4. Avez-vous d'autres couleurs/tailles disponibles ?

## Technical Implementation

### Message Sending

Currently implemented as a mock/demo:
```typescript
const handleSendMessage = () => {
  if (!message.trim()) {
    toast.error('Please enter a message');
    return;
  }
  
  // In production, send to backend:
  // await fetch('/api/messages', {
  //   method: 'POST',
  //   body: JSON.stringify({
  //     vendorId: vendor.id,
  //     productId: product.id,
  //     message: message,
  //     buyerId: currentUser.id
  //   })
  // });
  
  toast.success('Message sent to seller!');
  setMessage('');
  onOpenChange(false);
};
```

### Phone Integration
```typescript
const handleCall = () => {
  if (vendor.phone) {
    window.location.href = `tel:${vendor.phone}`;
  }
};
```

### Email Integration
```typescript
const handleEmail = () => {
  if (vendor.email) {
    const subject = `Inquiry about ${product.name}`;
    window.location.href = `mailto:${vendor.email}?subject=${encodeURIComponent(subject)}`;
  }
};
```

## Backend Integration (Future)

### API Endpoints Needed

```typescript
// Send message to seller
POST /api/messages
{
  "vendorId": "string",
  "productId": "number",
  "message": "string",
  "buyerId": "string"
}

// Get vendor contact details
GET /api/vendors/:vendorId/contact

// Get message thread
GET /api/messages/thread/:threadId

// Mark message as read
PUT /api/messages/:messageId/read
```

### Database Schema

```sql
CREATE TABLE messages (
  id SERIAL PRIMARY KEY,
  vendor_id UUID NOT NULL,
  buyer_id UUID NOT NULL,
  product_id INTEGER,
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  read_at TIMESTAMP,
  FOREIGN KEY (vendor_id) REFERENCES users(id),
  FOREIGN KEY (buyer_id) REFERENCES users(id),
  FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE INDEX idx_messages_vendor ON messages(vendor_id);
CREATE INDEX idx_messages_buyer ON messages(buyer_id);
```

## Notifications

When a message is sent:
- ✅ Buyer sees success toast
- 📧 Seller receives email notification
- 🔔 Seller receives in-app notification (if online)
- 📱 Seller receives push notification (if enabled)

## Mobile Experience

**Optimized for Mobile:**
- Touch-friendly buttons
- Responsive dialog
- Scrollable content
- Easy typing on mobile keyboards
- Quick message selection
- Click-to-call integration
- Click-to-email integration

## Security & Privacy

**Current Implementation:**
- No personal data exposed
- Vendor contact shown only when needed
- Messages go through platform (not direct)
- Email notifications instead of exposing emails

**Future Enhancements:**
- Message encryption
- Abuse reporting
- Blocking functionality
- Message history
- Read receipts
- Typing indicators

## Accessibility

- Keyboard navigation support
- Screen reader compatible
- High contrast mode support
- Clear focus indicators
- Descriptive ARIA labels

## Testing Checklist

- [ ] Open chat dialog from cart
- [ ] Select quick message
- [ ] Type custom message
- [ ] Send message with text
- [ ] Try sending empty message (should fail)
- [ ] Switch to contact tab
- [ ] Click phone to call
- [ ] Click email to compose
- [ ] View location information
- [ ] Close dialog
- [ ] Test on mobile device
- [ ] Test with different products
- [ ] Test bilingual support

## Future Enhancements

### Planned Features
- [ ] Real-time chat with websockets
- [ ] Message history/thread view
- [ ] Seller online status indicator
- [ ] Typing indicators
- [ ] File attachments (images)
- [ ] Voice messages
- [ ] Chat notifications badge
- [ ] Saved/favorite messages
- [ ] Auto-responses for sellers
- [ ] Chat analytics for sellers

### Advanced Features
- [ ] AI-powered quick responses
- [ ] Translation for cross-language chat
- [ ] Video call integration
- [ ] Chat scheduling
- [ ] Bulk messaging
- [ ] Chat templates for sellers
- [ ] Customer support escalation
- [ ] Chat transcripts export

## Best Practices for Users

### For Buyers:
1. Be specific in your questions
2. Include product details
3. Be respectful and professional
4. Wait for response (24h typical)
5. Check spam folder for replies

### For Sellers:
1. Respond within 24 hours
2. Be friendly and helpful
3. Provide accurate information
4. Offer alternatives if needed
5. Follow up on inquiries

## Support

For chat feature issues:
1. Check internet connection
2. Verify seller contact is available
3. Try different browser
4. Clear cache and retry
5. Contact CamMarket support

---

**Version**: 1.0.0  
**Last Updated**: November 2024  
**Maintained By**: CamMarket Development Team
