# Six Red Marbles VR Solutions Website

A modern, responsive website showcasing Six Red Marbles' Virtual Reality training and educational solutions, designed to match the main Six Red Marbles brand identity.

## 🎨 Design System

This website follows the Six Red Marbles brand guidelines:

### Colors
- **Primary Text**: `#001b2d` (Dark Blue/Black)
- **Accent Color**: `#E60000` (Vibrant Red)
- **Background**: `#ffffff` (Clean White)
- **Secondary Background**: `#f8f9fa` (Light Gray)
- **Text Secondary**: `#666` (Medium Gray)

### Typography
- **Font Family**: Nunito (Google Fonts)
- **Weights**: 300, 400, 600, 700, 800
- **Primary Headings**: 700-800 weight
- **Body Text**: 400 weight
- **Navigation**: 600 weight

### Design Elements
- Clean, minimalist interface
- White navigation bar with red accent elements
- Rounded buttons with red primary color
- Subtle shadows and hover effects
- Professional spacing and typography

## 🚀 Features

- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Interactive Portfolio**: Click on work cards to view video demonstrations
- **Contact Form**: Integrated with SheetDB for lead generation
- **Smooth Animations**: Scroll-triggered animations and hover effects
- **Accessibility**: WCAG compliant with keyboard navigation and screen reader support
- **Brand Consistency**: Matches Six Red Marbles main website design

## 📁 Project Structure

```
VR Solutions Webpage/
├── Index.html          # Main HTML file
├── Styles.css          # Complete CSS stylesheet with Six Red Marbles branding
├── interact.js         # JavaScript functionality
├── SRM-Logo_India.png  # Company logo (you need to add this)
└── README.md           # This file
```

## 🛠️ Setup Instructions

### 1. File Organization
- Ensure all files are in the same directory
- Add your company logo as `SRM-Logo_India.png`

### 2. SheetDB Integration
The contact form is configured to use SheetDB. To set up:

1. Go to [SheetDB.io](https://sheetdb.io/)
2. Create a new Google Sheet with columns: `Name`, `Email`, `Company`, `Message`
3. Get your API endpoint URL
4. Replace the `SHEETDB_API` constant in `interact.js` (line 25)

```javascript
const SHEETDB_API = "https://sheetdb.io/api/v1/YOUR_ENDPOINT_HERE";
```

### 3. Deployment
You can deploy this website to any static hosting service:

- **GitHub Pages**: Push to a GitHub repository and enable Pages
- **Netlify**: Drag and drop the folder to Netlify
- **Vercel**: Connect your GitHub repository
- **Traditional Hosting**: Upload files to your web server

## 🎨 Brand Consistency

### Navigation Bar
- White background with subtle shadow
- Dark blue text (`#001b2d`)
- Red accent color for hover states (`#E60000`)
- Red outlined "CONTACT" button
- Clean, professional appearance

### Hero Section
- Clean white background with subtle pattern
- Large, bold headings in dark blue
- Red primary button with rounded corners
- Professional typography with Nunito font

### Color Usage
- **Primary Actions**: Red (`#E60000`)
- **Text**: Dark blue (`#001b2d`)
- **Secondary Text**: Gray (`#666`)
- **Backgrounds**: White and light gray
- **Accents**: Red for highlights and CTAs

## 📱 Responsive Breakpoints

- **Desktop**: 1200px and above
- **Tablet**: 768px - 1199px
- **Mobile**: Below 768px

## 🔧 Technical Features

### JavaScript Functionality
- **Smooth Scrolling**: Navigation links scroll smoothly to sections
- **Active Navigation**: Highlights current section in navigation
- **Mobile Menu**: Hamburger menu for mobile devices
- **Video Modals**: Click work cards to view videos in modal
- **Form Validation**: Real-time validation with visual feedback
- **Intersection Observer**: Scroll-triggered animations

### CSS Features
- **CSS Grid & Flexbox**: Modern layout techniques
- **Nunito Font**: Google Fonts integration
- **Smooth Transitions**: Professional hover and focus effects
- **Accessibility**: High contrast and focus indicators
- **Brand Colors**: Consistent Six Red Marbles color palette

## 🎯 SEO & Performance

### SEO Optimizations
- Semantic HTML structure
- Meta tags for social sharing
- Alt text for images
- Proper heading hierarchy

### Performance Features
- Optimized images (use WebP format when possible)
- Minimal JavaScript bundle
- CSS animations using transform/opacity
- Lazy loading for videos

## 🔒 Security Considerations

- Form validation on both client and server side
- HTTPS required for production deployment
- No sensitive data in client-side code
- XSS protection through proper input sanitization

## 📊 Analytics Integration

To add Google Analytics:

1. Get your Google Analytics tracking ID
2. Add this script before the closing `</head>` tag:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_TRACKING_ID');
</script>
```

## 🐛 Troubleshooting

### Common Issues

1. **Logo not displaying**: Ensure `SRM-Logo_India.png` is in the same directory
2. **Form not working**: Check SheetDB API endpoint in `interact.js`
3. **Videos not playing**: Ensure video files are accessible and formats are supported
4. **Mobile menu not working**: Check if JavaScript is enabled
5. **Font not loading**: Ensure internet connection for Google Fonts

### Browser Support
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 📞 Support

For technical support or customization requests, contact:
- Email: contact@sixredmarbles.com
- Website: https://sixredmarbles.com

## 📄 License

This project is proprietary to Six Red Marbles. All rights reserved.

---

**Built with ❤️ for Six Red Marbles VR Solutions**

*Design matches the main Six Red Marbles website branding and color scheme.* 