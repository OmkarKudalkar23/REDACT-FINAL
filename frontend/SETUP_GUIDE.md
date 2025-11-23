# BankHub Setup & Usage Guide

## Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation
```bash
npm install
```

### Running the Development Server
```bash
npm run dev
```

The application will be available at `http://localhost:5174` (or the next available port)

### Building for Production
```bash
npm run build
```

## Project Structure

### New Pages Created
All banking features are located in `/src/pages/`:

1. **Dashboard.jsx** - Main dashboard with account overview
2. **SendMoney.jsx** - Money transfer functionality
3. **Transactions.jsx** - Transaction history and filtering
4. **Bills.jsx** - Bill management and payments
5. **Cards.jsx** - Card management interface
6. **Investments.jsx** - Investment portfolio tracking
7. **Settings.jsx** - User settings and preferences

### New Components
- **DashboardLayout.jsx** - Reusable layout with sidebar navigation for all dashboard pages

### Updated Files
- **App.jsx** - Added routes for all new pages

## Feature Walkthrough

### 1. Dashboard (`/dashboard`)
**Purpose**: Central hub for all banking activities

**Key Features**:
- View multiple accounts with real-time balances
- Quick action buttons for common tasks
- Recent transaction feed
- Financial statistics (income, expenses, savings rate)
- Toggle balance visibility for privacy

**How to Use**:
1. Navigate to `/dashboard` after login
2. Click account cards to switch between accounts
3. Use quick action buttons to access other features
4. View recent transactions with one-click access to full history

### 2. Send Money (`/send-money`)
**Purpose**: Transfer funds to contacts or new recipients

**Key Features**:
- 3-step transfer process
- Recipient management (save, search, add new)
- Flexible amount entry with quick buttons
- Transaction notes/memo
- Confirmation before sending

**How to Use**:
1. Click "Send Money" from dashboard or sidebar
2. Select a recipient from contacts or add new
3. Enter amount and optional note
4. Review details and confirm
5. See success confirmation

### 3. Transactions (`/transactions`)
**Purpose**: View and analyze all account transactions

**Key Features**:
- Complete transaction history
- Filter by type (All, Income, Expenses)
- Search by merchant or transaction name
- Transaction categorization
- Summary statistics
- Export functionality

**How to Use**:
1. Navigate to Transactions page
2. Use search bar to find specific transactions
3. Click filter buttons to view income/expenses
4. Click export to download transaction history
5. View detailed transaction information

### 4. Bills & Payments (`/bills`)
**Purpose**: Manage and pay bills efficiently

**Key Features**:
- View all bills organized by status
- Pay bills with one click
- Bill reminders and due dates
- Payment confirmation
- Bill summary statistics
- Add new bills

**How to Use**:
1. Go to Bills & Payments page
2. View pending and paid bills
3. Click "Pay Now" on any pending bill
4. Confirm payment details
5. See payment success notification

### 5. Cards (`/cards`)
**Purpose**: Manage debit and credit cards

**Key Features**:
- Display multiple cards with beautiful designs
- Lock/unlock cards for security
- View full card details (with CVV toggle)
- Add new cards
- Card balance tracking
- Active card status

**How to Use**:
1. Navigate to Cards page
2. Click any card to view full details
3. Use lock button to secure cards
4. Click "Add New Card" to add debit/credit cards
5. View total balance across all cards

### 6. Investments (`/investments`)
**Purpose**: Track and manage investment portfolio

**Key Features**:
- Portfolio overview with total value
- Individual investment tracking
- Gain/loss indicators
- Investment type categories
- Expected returns display
- Start new investment

**How to Use**:
1. Go to Investments page
2. View portfolio summary at top
3. Check individual investment performance
4. Click "Start New Investment" to invest
5. Select investment type and amount
6. Choose investment duration

### 7. Settings (`/settings`)
**Purpose**: Manage account settings and preferences

**Features by Tab**:

**Profile Tab**:
- Edit personal information
- Upload profile picture
- Update contact details

**Security Tab**:
- Change password
- Enable 2FA
- Biometric login
- View active sessions
- Login alerts

**Notifications Tab**:
- Email notifications toggle
- SMS notifications toggle
- Transaction alerts
- Promotional emails
- Security alerts
- Weekly reports

**Privacy Tab**:
- Data collection preferences
- Download personal data
- Delete account option

**How to Use**:
1. Click Settings in sidebar
2. Select desired tab
3. Make changes
4. Click Save/Update buttons
5. Changes apply immediately

## Navigation

### Sidebar Navigation
The sidebar is available on all dashboard pages and includes:
- Dashboard
- Send Money
- Transactions
- Bills & Payments
- Cards
- Investments
- Settings
- Logout button

### Mobile Navigation
On mobile devices:
- Sidebar is hidden by default
- Click hamburger menu (☰) to open
- Click menu items to navigate
- Click overlay to close sidebar

## Design System

### Color Palette
```
Primary Blue: #0066FF, #0052CC
Secondary Purple: #7C3AED
Success Green: #10B981
Warning Yellow: #F59E0B
Danger Red: #EF4444
Background: #000000
Surface: #1E3A8A (blue-900)
```

### Typography
- **Headings**: Zentry font (special-font class)
- **Body**: General Sans font
- **Monospace**: For numbers and codes

### Spacing & Layout
- Grid-based layout with Tailwind CSS
- Responsive breakpoints: sm, md, lg, xl
- Consistent padding and margins
- Rounded corners: lg, xl, 2xl

## Mock Data

All pages include realistic mock data:
- **Accounts**: Multiple account types with balances
- **Transactions**: Various transaction categories
- **Bills**: Different bill providers and amounts
- **Cards**: Debit and credit cards
- **Investments**: Different investment types
- **Recipients**: Sample contacts for transfers

## Integration with Backend

### Ready for API Integration
All pages are structured to easily connect with backend APIs:

1. **Replace Mock Data**: Replace useState with API calls
2. **Add Loading States**: Show spinners during data fetch
3. **Error Handling**: Add try-catch blocks
4. **Authentication**: Integrate with auth system
5. **Real-time Updates**: Use WebSockets for live data

### Example API Endpoints (to be implemented)
```
GET /api/accounts - Get user accounts
GET /api/transactions - Get transaction history
GET /api/bills - Get bills
POST /api/transfer - Send money
POST /api/pay-bill - Pay a bill
GET /api/cards - Get user cards
GET /api/investments - Get investment portfolio
GET /api/user/settings - Get user settings
PUT /api/user/settings - Update user settings
```

## Styling Guidelines

### Consistent Patterns
1. **Cards**: `bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-blue-900/30 rounded-lg`
2. **Buttons**: `bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800`
3. **Inputs**: `bg-blue-900/20 border border-blue-900/30 rounded-lg px-4 py-2 text-blue-50`
4. **Hover Effects**: `hover:border-blue-900/40 hover:shadow-lg hover:shadow-blue-600/20 transition-all`

### Responsive Classes
- Mobile-first approach
- Use `hidden md:block` for desktop-only
- Use `w-full md:w-1/2` for responsive widths
- Grid: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`

## Performance Optimization

### Current Implementation
- Lazy component loading via React Router
- Optimized re-renders with proper state management
- CSS classes pre-compiled with Tailwind
- Minimal external dependencies

### Recommendations
- Add React.memo for expensive components
- Implement pagination for long lists
- Add image optimization
- Consider code splitting for large features
- Add service workers for offline support

## Troubleshooting

### Port Already in Use
If port 5174 is in use, Vite will automatically try the next available port.

### Styling Issues
- Clear browser cache (Ctrl+Shift+Delete)
- Rebuild Tailwind CSS: `npm run build`
- Check that postcss.config.js is configured

### Navigation Issues
- Ensure all routes are added to App.jsx
- Check that component imports are correct
- Verify file paths match exactly

## Browser Support
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Development Tips

### Adding New Features
1. Create new page in `/src/pages/`
2. Add route to `App.jsx`
3. Import DashboardLayout for consistency
4. Use existing components as templates
5. Follow color and styling patterns

### Modifying Existing Pages
1. All pages use DashboardLayout
2. Maintain responsive grid layouts
3. Keep consistent button and input styling
4. Use existing icons from react-icons
5. Test on mobile and desktop

### Testing Locally
1. Use browser DevTools for responsive testing
2. Test on actual mobile devices
3. Check console for errors
4. Verify all links work
5. Test form submissions

## Support & Documentation

For more information:
- See `BANKING_FEATURES.md` for detailed feature documentation
- Check existing components for code examples
- Review Tailwind CSS documentation
- Refer to React Router documentation

## Next Steps

1. **Backend Integration**: Connect to real APIs
2. **Authentication**: Implement proper auth flow
3. **Data Persistence**: Add database integration
4. **Real-time Updates**: Implement WebSocket connections
5. **Mobile App**: Consider React Native version
6. **Testing**: Add unit and integration tests
7. **Deployment**: Set up CI/CD pipeline

---

**Last Updated**: 2024
**Version**: 1.0
**Status**: Ready for Development
