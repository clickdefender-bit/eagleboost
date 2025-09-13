// Sistema de gerenciamento de conteúdo
export interface SiteContent {
  // Top Banner
  topBanner: {
    title: string;
    subtitle: string;
    buttonText: string;
    titleColor: string;
    subtitleColor: string;
    buttonColor: string;
  };
  
  // Video Container
  video: {
    embedCode: string;
    aspectRatio: '16:9' | '9:16';
    soundWarning: string;
    urgencyWarning: string;
  };
  
  // Content Blocker
  contentBlocker: {
    enabled: boolean;
    // Modo de agendamento
    scheduleMode: 'immediate' | 'specific_time' | 'after_video';
    // Para modo imediato (baseado em duração)
    unlockTimeMinutes: number;
    unlockTimeSeconds: number;
    // Para modo de horário específico
    scheduledStartTime?: string; // ISO string
    scheduledEndTime?: string; // ISO string
    // Configurações de duração flexível
    durationType: 'minutes' | 'hours' | 'days';
    durationValue: number;
    // Fuso horário
    timezone: string;
    // Configurações de exibição (não usadas no modo silencioso)
    blockedTitle: string;
    blockedSubtitle: string;
    blockedMessage: string;
    timerDisplay: boolean;
  };
  
  // Main Offer
  mainOffer: {
    productName: string;
    packageName: string;
    productImage: string;
    savings: string;
    buttonText: string;
    buttonUrl: string;
    pricePerBottle: string;
    totalPrice: string;
    badges: {
      guarantee: string;
      shipping: string;
      security: string;
    };
  };
  
  // Alternative Offers
  alternativeOffers: {
    offer1: {
      productImage: string;
      productName: string;
      packageName: string;
      savings: string;
      pricePerBottle: string;
      totalPrice: string;
      shipping: string;
      guarantee: string;
      security: string;
      buttonUrl: string;
    };
    offer2: {
      productImage: string;
      productName: string;
      packageName: string;
      savings: string;
      pricePerBottle: string;
      totalPrice: string;
      shipping: string;
      guarantee: string;
      security: string;
      buttonUrl: string;
    };
  };
  
  // Doctors Section
  doctors: {
    title: string;
    subtitle: string;
    dragInstruction: string;
    doctors: Array<{
      id: number;
      name: string;
      title: string;
      institution: string;
      photo: string;
      recommendation: string;
      videoEmbed: string;
    }>;
  };
  
  // Customer Testimonials
  testimonials: {
    title: string;
    subtitle: string;
    customers: Array<{
      id: number;
      name: string;
      location: string;
      photo: string;
      testimonial: string;
      rating: number;
      videoEmbed: string;
    }>;
  };
  
  // News Section
  news: {
    title: string;
    subtitle: string;
    dragInstruction: string;
    articles: Array<{
      id: number;
      outlet: string;
      logo: string;
      redirectUrl: string;
      title: string;
      description: string;
      videoEmbed: string;
    }>;
  };
  
  // Guarantee
  guarantee: {
    days: string;
    title: string;
    subtitle: string;
    description: string[];
    brandName: string;
  };
  
  // FAQ
  faq: {
    title: string;
    items: Array<{
      id: number;
      question: string;
      answer: string;
      hasBadge?: boolean;
      badgeText?: string;
    }>;
  };
  
  // Footer
  footer: {
    brandName: string;
    copyright: string;
    disclaimer: string;
    links: string[];
  };
  
  // Title Blocks
  titleBlocks: {
    noFilters: {
      title: string;
      subtitle: string;
      titleColor: string;
      subtitleColor: string;
    };
    newsOutlets: {
      title: string;
      subtitle: string;
      dragInstruction: string;
      titleColor: string;
      subtitleColor: string;
    };
    transformLife: {
      title: string;
      subtitle1: string;
      subtitle2: string;
      titleColor: string;
      subtitle1Color: string;
      subtitle2Color: string;
    };
  };

  // Global Title Styling
  globalTitleStyling: {
    availableColors: Array<{
      name: string;
      value: string;
      type: 'solid' | 'gradient';
    }>;
  };
  
  // Global Background Settings
  globalBackground: {
    backgroundClass: string;
    availableBackgrounds: Array<{
      name: string;
      class: string;
    }>;
  };
  
  // Custom CTAs
  customCTAs: {
    globalSettings: {
      defaultBackgroundColor: string;
      defaultTextColor: string;
      availableColors: Array<{
        name: string;
        background: string;
      }>;
    };
    doctorTrustCTA: {
      enabled: boolean;
      text: string;
      icon: string;
      backgroundColor: string;
      textColor: string;
      usePulseAnimation: boolean;
      url: string;
    };
    successStoryCTA: {
      enabled: boolean;
      text: string;
      icon: string;
      backgroundColor: string;
      textColor: string;
      usePulseAnimation: boolean;
      url: string;
    };
  };
}

// Conteúdo padrão
const defaultContent: SiteContent = {
  topBanner: {
    title: "Baking Soda cures Impotence",
    subtitle: "This secret recipe can reverse Impotence in just 7 Days",
    buttonText: "WATCH BELOW AND SEE HOW IT WORKS",
    titleColor: "text-blue-300",
    subtitleColor: "text-blue-200",
    buttonColor: "text-blue-300"
  },
  
  video: {
    embedCode: "<vturb-smartplayer id='vid-68c1baf2d111494b6113b2dc' style='display: block; margin: 0 auto; width: 100%; height: 100%;'></vturb-smartplayer><script type='text/javascript'>var s=document.createElement('script');s.src='https://scripts.converteai.net/d37be28a-dfe1-4a86-98a2-9c82944967ec/players/68c1baf2d111494b6113b2dc/v4/player.js',s.async=!0,document.head.appendChild(s);</script>",
    aspectRatio: "9:16",
    soundWarning: "Please make sure your sound is on",
    urgencyWarning: "This video may be taken down at any time",
  },

  contentBlocker: {
    enabled: false,
    scheduleMode: 'immediate',
    unlockTimeMinutes: 1,
    unlockTimeSeconds: 0,
    scheduledStartTime: undefined,
    scheduledEndTime: undefined,
    durationType: 'minutes',
    durationValue: 1,
    timezone: 'America/New_York',
    blockedTitle: "",
    blockedSubtitle: "",
    blockedMessage: "",
    timerDisplay: false
  },
  
  mainOffer: {
    productName: "EAGLEBOOST",
    packageName: "6 BOTTLE PACKAGE",
    productImage: "https://imgur.com/8lVaUqP.png",
    savings: "YOU'RE SAVING $900",
    buttonText: "CLAIM OFFER NOW",
    buttonUrl: "",
    pricePerBottle: "$49",
    totalPrice: "$294",
    badges: {
      guarantee: "90-Day",
      shipping: "Free Ship",
      security: "Secure"
    }
  },
  
  alternativeOffers: {
    offer1: {
      productImage: "https://imgur.com/zDHfVkS.png",
      productName: "EAGLEBOOST",
      packageName: "3 BOTTLE PACKAGE",
      savings: "SAVE $398",
      pricePerBottle: "$66",
      totalPrice: "$198",
      shipping: "Free",
      guarantee: "90d",
      security: "Safe",
      buttonUrl: ""
    },
    offer2: {
      productImage: "https://imgur.com/VZX2Kel.png",
      productName: "EAGLEBOOST",
      packageName: "2 BOTTLE PACKAGE",
      savings: "SAVE $200",
      pricePerBottle: "$69",
      totalPrice: "$138",
      shipping: "$9.99",
      guarantee: "90d",
      security: "Safe",
      buttonUrl: ""
    }
  },
  
  doctors: {
    title: "Clinically Reviewed. Doctor Approved.",
    subtitle: "What Doctors Say About EAGLEBOOST",
    dragInstruction: "Drag to navigate between doctors",
    doctors: [
      {
        id: 1,
        name: "Dr. Mehmet OZ",
        title: "MD Cardiothoracic Surgeon, MD",
        institution: "Columbia University",
        photo: "https://imgur.com/Jsdpslh.png",
        recommendation: "EAGLEBOOST represents a breakthrough in natural men's health. Simple ingredients, impressive results.",
        videoEmbed: "<script type='text/javascript'> var s=document.createElement('script'); s.src='https://scripts.converteai.net/lib/js/smartplayer-wc/v4/sdk.js', s.async=!0,document.head.appendChild(s); </script> <div id='ifr_68c1baf2d111494b6113b2dc_wrapper' style='margin: 0 auto; width: 100%; max-width: 400px;'> <div style='position: relative; padding: 177.77777777777777% 0 0 0;' id='ifr_68c1baf2d111494b6113b2dc_aspect'> <iframe frameborder='0' allowfullscreen src='about:blank' id='ifr_68c1baf2d111494b6113b2dc' style='position: absolute; top: 0; left: 0; width: 100%; height: 100%;' referrerpolicy='origin' onload='this.onload=null, this.src=\"https://scripts.converteai.net/d37be28a-dfe1-4a86-98a2-9c82944967ec/players/68c1baf2d111494b6113b2dc/v4/embed.html\" +(location.search||\"?\") +\"&vl=\" +encodeURIComponent(location.href)'></iframe> </div> </div>"
      },
      {
        id: 2,
        name: "Dr. Rena Malik",
        title: "Urologist, MD",
        institution: "University of Maryland",
        photo: "https://imgur.com/PgyFyIB.png",
        recommendation: "EAGLEBOOST offers men a proven alternative that supports both physical and mental wellness.",
        videoEmbed: "<script type='text/javascript'> var s=document.createElement('script'); s.src='https://scripts.converteai.net/lib/js/smartplayer-wc/v4/sdk.js', s.async=!0,document.head.appendChild(s); </script> <div id='ifr_68c2dc54023399f4a5c43932_wrapper' style='margin: 0 auto; width: 100%; max-width: 400px;'> <div style='position: relative; padding: 177.77777777777777% 0 0 0;' id='ifr_68c2dc54023399f4a5c43932_aspect'> <iframe frameborder='0' allowfullscreen src='about:blank' id='ifr_68c2dc54023399f4a5c43932' style='position: absolute; top: 0; left: 0; width: 100%; height: 100%;' referrerpolicy='origin' onload='this.onload=null, this.src=\"https://scripts.converteai.net/d37be28a-dfe1-4a86-98a2-9c82944967ec/players/68c2dc54023399f4a5c43932/v4/embed.html\" +(location.search||\"?\") +\"&vl=\" +encodeURIComponent(location.href)'></iframe> </div> </div>"
      },
      {
        id: 3,
        name: "Dr. Steven Gundry",
        title: "Cardiologist, Heart Surgeon",
        institution: "Integrative Medicine",
        photo: "https://imgur.com/jsyoqH5.png",
        recommendation: "The ingredients I chose in EAGLEBOOST restore vitality exactly my philosophy.",
        videoEmbed: "<script type='text/javascript'> var s=document.createElement('script'); s.src='https://scripts.converteai.net/lib/js/smartplayer-wc/v4/sdk.js', s.async=!0,document.head.appendChild(s); </script> <div id='ifr_68c2dc54023399f4a5c43933_wrapper' style='margin: 0 auto; width: 100%; max-width: 400px;'> <div style='position: relative; padding: 177.77777777777777% 0 0 0;' id='ifr_68c2dc54023399f4a5c43933_aspect'> <iframe frameborder='0' allowfullscreen src='about:blank' id='ifr_68c2dc54023399f4a5c43933' style='position: absolute; top: 0; left: 0; width: 100%; height: 100%;' referrerpolicy='origin' onload='this.onload=null, this.src=\"https://scripts.converteai.net/d37be28a-dfe1-4a86-98a2-9c82944967ec/players/68c2dc54023399f4a5c43933/v4/embed.html\" +(location.search||\"?\") +\"&vl=\" +encodeURIComponent(location.href)'></iframe> </div> </div>"
      }
    ]
  },
  
  testimonials: {
    title: "No Filters. Just Real Results.",
    subtitle: "What Real Men Are Saying About EAGLEBOOST",
    customers: [
      {
        id: 1,
        name: "John O.",
        location: "Florida",
        photo: "https://imgur.com/uEGrHTs.png",
        testimonial: "My wife noticed the difference before I even told her about EagleBoost!",
        rating: 5,
        videoEmbed: "<vturb-smartplayer id='vid-68c2dc54023399f4a5c43934' style='display: block; margin: 0 auto; width: 100%; height: 100%;'></vturb-smartplayer><script type='text/javascript'>var s=document.createElement('script');s.src='https://scripts.converteai.net/d37be28a-dfe1-4a86-98a2-9c82944967ec/players/68c2dc54023399f4a5c43934/v4/player.js',s.async=!0,document.head.appendChild(s);</script>"
      },
      {
        id: 2,
        name: "Robert S.",
        location: "California",
        photo: "https://imgur.com/fyYHrSK.png",
        testimonial: "After 50, I thought there was no hope. EagleBoost proved me wrong!",
        rating: 5,
        videoEmbed: "<vturb-smartplayer id='vid-68c2dc54023399f4a5c43935' style='display: block; margin: 0 auto; width: 100%; height: 100%;'></vturb-smartplayer><script type='text/javascript'>var s=document.createElement('script');s.src='https://scripts.converteai.net/d37be28a-dfe1-4a86-98a2-9c82944967ec/players/68c2dc54023399f4a5c43935/v4/player.js',s.async=!0,document.head.appendChild(s);</script>"
      },
      {
        id: 3,
        name: "Michael R.",
        location: "Texas",
        photo: "https://imgur.com/m9I7AHX.png",
        testimonial: "EagleBoost completely changed my life. I felt the difference in just 2 weeks!",
        rating: 5,
        videoEmbed: "<vturb-smartplayer id='vid-68c2dc54023399f4a5c43936' style='display: block; margin: 0 auto; width: 100%; height: 100%;'></vturb-smartplayer><script type='text/javascript'>var s=document.createElement('script');s.src='https://scripts.converteai.net/d37be28a-dfe1-4a86-98a2-9c82944967ec/players/68c2dc54023399f4a5c43936/v4/player.js',s.async=!0,document.head.appendChild(s);</script>"
      }
    ]
  },
  
  news: {
    title: "As Seen In Major News Outlets",
    subtitle: "Leading Health Publications Cover EAGLEBOOST",
    dragInstruction: "Drag to navigate between news articles",
    articles: [
      {
        id: 1,
        outlet: "CNN Health",
        logo: "https://imgur.com/whCOxev.png",
        redirectUrl: "",
        title: "A Surprising Natural Solution to Men's Performance Issues",
        description: "CNN reveals the growing demand for natural solutions among men over 40. Products like EagleBoost are gaining ground as alternatives to traditional treatments.",
        videoEmbed: ""
      },
      {
        id: 2,
        outlet: "MAYO CLINIC",
        logo: "https://imgur.com/alZJUOD.png",
        redirectUrl: "",
        title: "The Science Behind Herbal Support for Men's Vitality",
        description: "Mayo Clinic explores the benefits and limitations of natural approaches, suggesting products like EagleBoost may complement traditional treatment.",
        videoEmbed: ""
      },
      {
        id: 3,
        outlet: "WebMD",
        logo: "https://imgur.com/Yyd3b5o.png",
        redirectUrl: "",
        title: "Natural Male Enhancers Gaining Ground in 2025",
        description: "WebMD highlights studies on the use of simple ingredients to improve male sexual health and performance naturally.",
        videoEmbed: ""
      }
    ]
  },
  
  guarantee: {
    days: "90",
    title: "90 Days Guarantee",
    subtitle: "100% money-back guarantee",
    description: [
      "Start using EagleBoost as soon as it arrives, and within days, you might notice enhanced energy, improved stamina, and a stronger sense of confidence.",
      "This is your opportunity to track your transformation—whether it's regaining the energy for date nights, feeling revitalized during your workouts, or simply rediscovering the confidence you thought was gone.",
      "If after several weeks or even months you're not completely satisfied with your results, we'll refund your money in full—no questions asked."
    ],
    brandName: "EAGLEBOOST"
  },
  
  faq: {
    title: "Frequently Asked Questions",
    items: [
      {
        id: 1,
        question: "Is EagleBoost a Genuine Product for Male Vitality?",
        answer: "Absolutely! EagleBoost is a 100% genuine product, developed with high-quality natural ingredients that are rigorously tested.",
        hasBadge: true,
        badgeText: "✓ 90-Day Guarantee"
      },
      {
        id: 2,
        question: "Can I Take EagleBoost Alongside Other Supplements?",
        answer: "EagleBoost has been formulated to be safe when used as directed. However, we recommend consulting with a healthcare professional before combining with other supplements."
      },
      {
        id: 3,
        question: "Will EagleBoost Be Effective for Supporting My Vitality?",
        answer: "EagleBoost has been developed with clinically studied ingredients that have demonstrated support for male energy, stamina, and vitality.",
        hasBadge: true,
        badgeText: "✓ Results or your money back"
      }
    ]
  },
  
  footer: {
    brandName: "EAGLEBOOST",
    copyright: "Copyright ©2025 | EAGLEBOOST",
    disclaimer: "These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease.",
    links: ["Privacy Policy", "Terms of Service", "Contact Us"]
  },
  
  titleBlocks: {
    noFilters: {
      title: "No Filters. Just Real Results.",
      subtitle: "What Real Men Are Saying About EAGLEBOOST",
      titleColor: "bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent",
      subtitleColor: "text-slate-300"
    },
    newsOutlets: {
      title: "As Seen In Major News Outlets",
      subtitle: "Leading Health Publications Cover EAGLEBOOST",
      dragInstruction: "Drag to navigate between news articles",
      titleColor: "bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent",
      subtitleColor: "text-slate-300"
    },
    transformLife: {
      title: "Ready to Transform Your Life?",
      subtitle1: "Choose your EAGLEBOOST package below",
      subtitle2: "Don't miss this opportunity to transform your health and confidence",
      titleColor: "bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent",
      subtitle1Color: "text-slate-300",
      subtitle2Color: "text-slate-400"
    }
  },

  globalTitleStyling: {
    availableColors: [
      { name: "Azul Sólido", value: "text-blue-400", type: "solid" },
      { name: "Verde Sólido", value: "text-green-400", type: "solid" },
      { name: "Roxo Sólido", value: "text-purple-400", type: "solid" },
      { name: "Laranja Sólido", value: "text-orange-400", type: "solid" },
      { name: "Vermelho Sólido", value: "text-[#BE1D1E]", type: "solid" },
      { name: "Vermelho Forte", value: "text-[#BE1D1E]", type: "solid" },
      { name: "Rosa Sólido", value: "text-pink-400", type: "solid" },
      { name: "Amarelo Sólido", value: "text-yellow-400", type: "solid" },
      { name: "Branco", value: "text-white", type: "solid" },
      { name: "Cinza Claro", value: "text-slate-300", type: "solid" },
      { name: "Azul → Roxo", value: "bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent", type: "gradient" },
      { name: "Verde → Azul", value: "bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent", type: "gradient" },
      { name: "Laranja → Vermelho", value: "bg-gradient-to-r from-orange-400 to-[#BE1D1E] bg-clip-text text-transparent", type: "gradient" },
      { name: "Rosa → Roxo", value: "bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent", type: "gradient" },
      { name: "Amarelo → Laranja", value: "bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent", type: "gradient" },
      { name: "Ciano → Azul", value: "bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent", type: "gradient" },
      { name: "Roxo → Rosa", value: "bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent", type: "gradient" },
      { name: "Verde → Amarelo", value: "bg-gradient-to-r from-green-400 to-yellow-500 bg-clip-text text-transparent", type: "gradient" }
    ]
  },
  
  globalBackground: {
      backgroundClass: 'bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900',
      availableBackgrounds: [
      { name: "Azul Padrão", class: "bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900" },
      { name: "Verde Escuro", class: "bg-gradient-to-br from-green-900 via-green-800 to-emerald-900" },
      { name: "Roxo Escuro", class: "bg-gradient-to-br from-purple-900 via-purple-800 to-violet-900" },
      { name: "Vermelho Escuro", class: "bg-gradient-to-br from-red-900 via-red-800 to-rose-900" },
      { name: "Cinza Escuro", class: "bg-gradient-to-br from-gray-900 via-gray-800 to-slate-900" },
      { name: "Laranja Escuro", class: "bg-gradient-to-br from-orange-900 via-orange-800 to-amber-900" },
      { name: "Teal Escuro", class: "bg-gradient-to-br from-teal-900 via-teal-800 to-cyan-900" },
      { name: "Preto Sólido", class: "bg-black" },
      { name: "Azul Sólido", class: "bg-blue-900" },
      { name: "Verde Sólido", class: "bg-green-900" }
    ]
  },
  
  customCTAs: {
    globalSettings: {
      defaultBackgroundColor: "from-blue-600 to-purple-600",
      defaultTextColor: "text-white",
      availableColors: [
        { name: "Azul para Roxo", background: "from-blue-600 to-purple-600" },
        { name: "Verde para Azul", background: "from-green-500 to-blue-600" },
        { name: "Laranja para Vermelho", background: "from-orange-500 to-[#BE1D1E]" },
        { name: "Rosa para Roxo", background: "from-pink-500 to-purple-600" },
        { name: "Amarelo para Laranja", background: "from-yellow-500 to-orange-500" },
        { name: "Vermelho para Rosa", background: "from-[#BE1D1E] to-pink-500" },
        { name: "Vermelho Forte", background: "from-[#BE1D1E] to-[#BE1D1E]" },
        { name: "Índigo para Azul", background: "from-indigo-600 to-blue-500" },
        { name: "Teal para Verde", background: "from-teal-500 to-green-500" }
      ]
    },
    doctorTrustCTA: {
      enabled: true,
      text: "Start Your Doctor-Approved Treatment — Tap Now!",
      icon: "👨‍⚕️",
      backgroundColor: "from-blue-600 to-purple-600",
      textColor: "text-white",
      usePulseAnimation: true,
      url: ""
    },
    successStoryCTA: {
      enabled: true,
      text: "Ready to Be Our Next Success Story?",
      icon: "🚀",
      backgroundColor: "from-green-500 to-blue-600",
      textColor: "text-white",
      usePulseAnimation: true,
      url: ""
    }
  }
};

class ContentManager {
  private content: SiteContent;
  private storageKey = 'site_content';
  private listeners: Array<(content: SiteContent) => void> = [];

  constructor() {
    this.content = this.loadContent();
    // Global access for debugging
    (window as any).contentManager = this;
  }

  // Carrega conteúdo do localStorage ou usa padrão
  private loadContent(): SiteContent {
    try {
      const stored = localStorage.getItem(this.storageKey);
      if (stored) {
        const parsedContent = JSON.parse(stored);
        // Merge com conteúdo padrão para garantir que todas as propriedades existam
        return this.mergeWithDefault(parsedContent);
      }
    } catch (error) {
      console.warn('Failed to load content from storage:', error);
    }
    return defaultContent;
  }

  // Merge conteúdo salvo com padrão para garantir compatibilidade
  private mergeWithDefault(stored: Partial<SiteContent>): SiteContent {
    return {
      ...defaultContent,
      ...stored,
      doctors: {
        ...defaultContent.doctors,
        ...stored.doctors,
        doctors: stored.doctors?.doctors || defaultContent.doctors.doctors
      },
      testimonials: {
        ...defaultContent.testimonials,
        ...stored.testimonials,
        customers: stored.testimonials?.customers || defaultContent.testimonials.customers
      },
      news: {
        ...defaultContent.news,
        ...stored.news,
        articles: stored.news?.articles || defaultContent.news.articles
      },
      faq: {
        ...defaultContent.faq,
        ...stored.faq,
        items: stored.faq?.items || defaultContent.faq.items
      },
      titleBlocks: {
        ...defaultContent.titleBlocks,
        ...stored.titleBlocks
      }
    };
  }

  // Salva conteúdo no localStorage
  private saveContent(): void {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.content));
      
      console.log('💾 ContentManager: Content saved, notifying listeners:', this.listeners.length);
      
      // Notify all listeners directly
      this.listeners.forEach(listener => {
        try {
          listener({ ...this.content });
          console.log('✅ Listener notified successfully');
        } catch (error) {
          console.error('❌ Error notifying listener:', error);
        }
      });
      
      // Dispatch custom event for components that might not be using the hook
      const event = new CustomEvent('contentUpdated', { 
        detail: { ...this.content } 
      });
      window.dispatchEvent(event);
      console.log('📡 ContentManager: Custom event dispatched');
      
    } catch (error) {
      console.error('Failed to save content:', error);
    }
  }

  private notifyListeners(event: string, data?: unknown) {
    console.log(`🔔 Notifying ${this.listeners.length} listeners for event: ${event}`);
    this.listeners.forEach(listener => {
      try {
        listener({ ...this.content });
      } catch (error) {
        console.error('Error notifying listener:', error);
      }
    });
  }

  // Subscribe to content changes
  subscribe(listener: (content: SiteContent) => void): () => void {
    this.listeners.push(listener);
    console.log('👂 New listener subscribed, total:', this.listeners.length);
    
    // Return unsubscribe function
    return () => {
      const index = this.listeners.indexOf(listener);
      if (index > -1) {
        this.listeners.splice(index, 1);
        console.log('👋 Listener unsubscribed, remaining:', this.listeners.length);
      }
    };
  }

  // Obtém todo o conteúdo
  getContent(): SiteContent {
    return this.content;
  }

  // Atualiza conteúdo específico
  updateContent(updates: Partial<SiteContent>): void {
    this.content = { ...this.content, ...updates };
    console.log('🔄 ContentManager: updateContent called');
    this.saveContent();
  }

  // Atualiza seção específica
  updateSection<K extends keyof SiteContent>(section: K, data: SiteContent[K]): void {
    this.content[section] = data;
    console.log('🔄 ContentManager: updateSection called for:', section);
    this.saveContent();
  }

  // Reset para conteúdo padrão
  resetToDefault(): void {
    this.content = defaultContent;
    this.saveContent();
  }

  // Exporta conteúdo como JSON
  exportContent(): string {
    return JSON.stringify(this.content, null, 2);
  }

  // Importa conteúdo de JSON
  importContent(jsonContent: string): boolean {
    try {
      const imported = JSON.parse(jsonContent) as Partial<SiteContent>;
      this.content = this.mergeWithDefault(imported);
      this.saveContent();
      return true;
    } catch (error) {
      console.error('Failed to import content:', error);
      return false;
    }
  }
}

// Instância global do gerenciador de conteúdo
export const contentManager = new ContentManager();