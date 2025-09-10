// Sistema de gerenciamento de conteúdo
export interface SiteContent {
  // Top Banner
  topBanner: {
    title: string;
    subtitle: string;
    buttonText: string;
  };
  
  // Video Container
  video: {
    embedCode: string;
    duration: string;
    soundWarning: string;
    urgencyWarning: string;
  };
  
  // Page Timer
  pageTimer: {
    enabled: boolean;
    unlockTimeMinutes: number;
    unlockTimeSeconds: number;
    lockedMessage: string;
    lockedTitle: string;
    lockedSubtitle: string;
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
      packageName: string;
      savings: string;
      pricePerBottle: string;
      totalPrice: string;
      shipping: string;
      buttonUrl: string;
    };
    offer2: {
      productImage: string;
      packageName: string;
      savings: string;
      pricePerBottle: string;
      totalPrice: string;
      shipping: string;
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
  
  // Custom CTA Buttons
  customCTAs: {
    doctorTrustCTA: {
      text: string;
      icon: string;
      backgroundColor: string;
      textColor: string;
      url: string;
      enabled: boolean;
    };
    successStoryCTA: {
      text: string;
      icon: string;
      backgroundColor: string;
      textColor: string;
      url: string;
      enabled: boolean;
    };
  };
  
  // Footer
  footer: {
    brandName: string;
    copyright: string;
    disclaimer: string;
    links: string[];
  };
}

// Conteúdo padrão
const defaultContent: SiteContent = {
  topBanner: {
    title: "Baking Soda cures Impotence",
    subtitle: "This secret recipe can reverse Impotence in just 7 Days",
    buttonText: "WATCH BELOW AND SEE HOW IT WORKS"
  },
  
  video: {
    embedCode: "",
    duration: "9:16",
    soundWarning: "Please make sure your sound is on",
    urgencyWarning: "This video may be taken down at any time",
  },
  
  pageTimer: {
    enabled: false,
    unlockTimeMinutes: 0,
    unlockTimeSeconds: 0,
    lockedMessage: "Complete content will be available after watching the video for {{time}}",
    lockedTitle: "🔒 Content Locked",
    lockedSubtitle: "Keep watching the video above to unlock all content"
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
      packageName: "3 BOTTLE PACKAGE",
      savings: "SAVE $398",
      pricePerBottle: "$66",
      totalPrice: "$198",
      shipping: "Free",
      buttonUrl: ""
    },
    offer2: {
      productImage: "https://imgur.com/VZX2Kel.png",
      packageName: "2 BOTTLE PACKAGE",
      savings: "SAVE $200",
      pricePerBottle: "$69",
      totalPrice: "$138",
      shipping: "$9.99",
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
        videoEmbed: ""
      },
      {
        id: 2,
        name: "Dr. Rena Malik",
        title: "Urologist, MD",
        institution: "University of Maryland",
        photo: "https://imgur.com/PgyFyIB.png",
        recommendation: "EAGLEBOOST offers men a proven alternative that supports both physical and mental wellness.",
        videoEmbed: ""
      },
      {
        id: 3,
        name: "Dr. Steven Gundry",
        title: "Cardiologist, Heart Surgeon",
        institution: "Integrative Medicine",
        photo: "https://imgur.com/jsyoqH5.png",
        recommendation: "The ingredients I chose in EAGLEBOOST restore vitality exactly my philosophy.",
        videoEmbed: ""
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
        videoEmbed: ""
      },
      {
        id: 2,
        name: "Robert S.",
        location: "California",
        photo: "https://imgur.com/fyYHrSK.png",
        testimonial: "After 50, I thought there was no hope. EagleBoost proved me wrong!",
        rating: 5,
        videoEmbed: ""
      },
      {
        id: 3,
        name: "Michael R.",
        location: "Texas",
        photo: "https://imgur.com/m9I7AHX.png",
        testimonial: "EagleBoost completely changed my life. I felt the difference in just 2 weeks!",
        rating: 5,
        videoEmbed: ""
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
  
  customCTAs: {
    doctorTrustCTA: {
      text: "If doctors trust it, I trust it too — start my treatment now",
      icon: "👨‍⚕️",
      backgroundColor: "from-blue-500 to-blue-600",
      textColor: "text-white",
      url: "",
      enabled: true
    },
    successStoryCTA: {
      text: "I'm ready to be the next success story!",
      icon: "🚀",
      backgroundColor: "from-green-400 to-green-500",
      textColor: "text-white",
      url: "",
      enabled: true
    }
  },
  
  footer: {
    brandName: "EAGLEBOOST",
    copyright: "Copyright ©2025 | EAGLEBOOST",
    disclaimer: "These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease.",
    links: ["Privacy Policy", "Terms of Service", "Contact Us"]
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
  private mergeWithDefault(stored: any): SiteContent {
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
      
    } catch (error) {
      console.error('Failed to save content:', error);
    }
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
      const imported = JSON.parse(jsonContent);
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

// Hook React para usar o gerenciador de conteúdo
export const useContentManager = () => {
  return contentManager;
};