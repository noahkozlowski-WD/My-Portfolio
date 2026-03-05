// Mock data for portfolio

export const portfolioData = {
  hero: {
    name: "Noah Kozlowski",
    tagline: "Full-Stack Web Developer",
    description: "Crafting elegant digital experiences with modern technologies",
    cta: "View My Work"
  },
  about: {
    title: "About Me",
    story: "I’m a 20-year-old web developer with three years of experience creating modern, responsive, and user-focused websites. I specialize in turning ideas into clean, functional digital experiences, with a strong focus on usability, performance, and attention to detail. I enjoy working across the full web development process, from layout and design to implementation and refinement, and I’m always looking to improve my craft while delivering reliable, well-built solutions..",
    history: "I started making websites for a simple, very practical reason: I needed money to build a PC so I could start taking coding classes. Instead of waiting around, I decided to learn by doing. That push led me to co-found websitethat.rocks with my dad, taking on real projects and learning how the web actually works. What began as a side hustle quickly turned into a foundation, giving me hands-on experience far beyond tutorials. Years later, with stronger skills, clearer direction, and a lot more confidence, I took the leap and started my freelance journey",
    image: "https://res.cloudinary.com/dde3uwkkb/image/upload/v1770639996/contendor1_tnlsvf.jpg"
  },
  skills: [
    {
      category: "Modern Website Design",
      technologies: ["Beautiful Layouts", "Mobile-Friendly", "Easy to Navigate", "Professional Look"],
      icon: "Code2"
    },
    {
      category: "Complete Online Presence",
      technologies: ["Custom Domain Setup", "Google-Ready", "Social Media Links", "Contact Forms"],
      icon: "Database"
    },
    {
      category: "Business Growth Tools",
      technologies: ["Online Bookings", "Customer Reviews", "Email Collection", "Analytics"],
      icon: "Settings"
    },
    {
      category: "Ongoing Support",
      technologies: ["Regular Updates", "Quick Fixes", "Content Changes", "Security"],
      icon: "Palette"
    }
  ],
  services: [
    {
      id: 1,
      title: "Custom Website for Your Business",
      description: "In today's digital world, your website is often the first impression customers have of your business. I'll build you a professional, custom website that showcases your brand and converts visitors into customers.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
      features: ["Stand Out from Competitors", "Build Trust & Credibility", "Available 24/7 to Customers"]
    },
    {
      id: 2,
      title: "Mobile-Friendly & Fast Loading",
      description: "Over 60% of web traffic comes from mobile devices. Your website will look stunning and load instantly on any device - phones, tablets, and computers. Don't lose customers to slow, outdated websites.",
      image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600&h=400&fit=crop",
      features: ["Works on All Devices", "Lightning-Fast Performance", "Better Customer Experience"]
    },
    {
      id: 3,
      title: "Get Found on Google",
      description: "What good is a website if no one can find it? I'll optimize your site so customers can easily discover your business through Google search. More visibility means more customers and more revenue.",
      image: "https://images.unsplash.com/photo-1562577309-4932fdd64cd1?w=600&h=400&fit=crop",
      features: ["Show Up in Local Searches", "Attract More Visitors", "Reach New Customers"]
    },
    {
      id: 4,
      title: "Turn Visitors Into Customers",
      description: "Visitors should instantly know what you do and what to do next. I build websites that are easy to understand, easy to navigate, and designed to turn interest into action.",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
      features: ["Conversion-focused layouts", "Professional visual design", "Always-available presence"]
    }
  ],
  contact: {
    title: "Let's Work Together",
    description: "Have a project in mind? I'd love to hear about it. Send me a message and let's create something amazing together.",
    email: "dev@noahkozlowski.com",
    phone: "+27 63 173 5752",
    social: {
      github: "https://github.com/noahkozlowski-WD",
      linkedin: "https://linkedin.com/in/noah-kozlowksi-807a143a0",
      twitter: "https://twitter.com"
    }
  }
};

// Mock function to simulate form submission
export const submitContactForm = async (formData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Mock form submission:', formData);
      resolve({ success: true, message: 'Message sent successfully!' });
    }, 1000);
  });
};
