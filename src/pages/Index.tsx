
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Book, 
  Heart, 
  Brain, 
  Search, 
  Settings, 
  Bell, 
  Home,
  BookOpen,
  Trophy 
} from "lucide-react";

const featuresData = [
  {
    icon: <Book className="h-6 w-6" />,
    title: "Reflection Journal",
    description: "Track your thoughts and feelings daily to gain insights into your mental health patterns.",
    link: "/reflection-journal",
    color: "bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-300"
  },
  {
    icon: <Brain className="h-6 w-6" />,
    title: "Health Assistant",
    description: "Get personalized guidance and support from our AI-powered health assistant.",
    link: "/health-assistant",
    color: "bg-purple-100 text-purple-600 dark:bg-purple-950 dark:text-purple-300"
  },
  {
    icon: <Heart className="h-6 w-6" />,
    title: "Wellness Center",
    description: "Access resources, exercises, and tools to support your overall wellbeing.",
    link: "/wellness-center",
    color: "bg-green-100 text-green-600 dark:bg-green-950 dark:text-green-300"
  },
  {
    icon: <Trophy className="h-6 w-6" />,
    title: "Achievements",
    description: "Track your progress and celebrate milestones on your wellness journey.",
    link: "/achievements",
    color: "bg-yellow-100 text-yellow-600 dark:bg-yellow-950 dark:text-yellow-300"
  }
];

const FeatureCard = ({ feature }: { feature: typeof featuresData[0] }) => {
  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl border bg-card text-card-foreground shadow-lg overflow-hidden"
    >
      <Link to={feature.link} className="block h-full no-underline">
        <div className="p-6 flex flex-col h-full">
          <div className={`p-3 rounded-full w-fit ${feature.color}`}>
            {feature.icon}
          </div>
          <h3 className="text-xl font-semibold mt-4 mb-2">{feature.title}</h3>
          <p className="text-sm text-muted-foreground flex-grow">{feature.description}</p>
          <div className="mt-4 text-sm font-medium text-primary flex items-center">
            Explore
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="ml-1"
            >
              <path d="M5 12h14"></path>
              <path d="m12 5 7 7-7 7"></path>
            </svg>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/50">
      <header className="sticky top-0 z-40 backdrop-blur-md border-b bg-background/80">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Home className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">AugMend Health</span>
          </div>
          <nav className="hidden md:flex space-x-4">
            <Link to="/reflection-journal" className="text-sm font-medium hover:text-primary transition-colors">
              Journal
            </Link>
            <Link to="/health-assistant" className="text-sm font-medium hover:text-primary transition-colors">
              Assistant
            </Link>
            <Link to="/wellness-center" className="text-sm font-medium hover:text-primary transition-colors">
              Wellness
            </Link>
            <Link to="/achievements" className="text-sm font-medium hover:text-primary transition-colors">
              Achievements
            </Link>
          </nav>
          <div className="flex items-center space-x-2">
            <button aria-label="Search" className="rounded-full p-2 text-muted-foreground hover:text-foreground transition-colors">
              <Search className="h-5 w-5" />
            </button>
            <button aria-label="Notifications" className="rounded-full p-2 text-muted-foreground hover:text-foreground transition-colors">
              <Bell className="h-5 w-5" />
            </button>
            <button aria-label="Settings" className="rounded-full p-2 text-muted-foreground hover:text-foreground transition-colors">
              <Settings className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <section className="py-12 md:py-20 text-center">
          <motion.h1 
            className="text-4xl md:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Your Mental Health Companion
          </motion.h1>
          <motion.p 
            className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Track your journey, gain insights, and improve your wellbeing with personalized tools and guidance.
          </motion.p>
          <motion.div
            className="flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <Link to="/reflection-journal" className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-lg font-medium text-primary-foreground shadow hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
              Start Journal
            </Link>
            <Link to="/wellness-center" className="inline-flex items-center justify-center rounded-md border border-input bg-background px-6 py-3 text-lg font-medium shadow-sm hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
              Explore Resources
            </Link>
          </motion.div>
        </section>

        <section className="py-12">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuresData.map((feature, index) => (
              <FeatureCard key={index} feature={feature} />
            ))}
          </div>
        </section>

        <section className="py-12 md:py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-3xl font-bold mb-6">Evidence-Based Approach</h2>
              <p className="text-muted-foreground mb-4">
                Our platform combines cognitive behavioral therapy techniques, mindfulness practices, and positive psychology to provide comprehensive mental health support.
              </p>
              <p className="text-muted-foreground mb-6">
                All tools and resources are developed in collaboration with mental health professionals to ensure effectiveness and safety.
              </p>
              <div className="flex items-center text-primary">
                <BookOpen className="h-5 w-5 mr-2" />
                <span className="font-medium">Learn about our methodology</span>
              </div>
            </motion.div>
            <motion.div
              className="bg-muted rounded-xl p-6"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-primary/10 rounded-full p-2 mr-4 mt-1">
                    <svg width="20" height="20" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary">
                      <path d="M7.49991 0.877045C3.84222 0.877045 0.877075 3.84219 0.877075 7.49988C0.877075 11.1575 3.84222 14.1227 7.49991 14.1227C11.1576 14.1227 14.1227 11.1575 14.1227 7.49988C14.1227 3.84219 11.1576 0.877045 7.49991 0.877045ZM1.82708 7.49988C1.82708 4.36686 4.36689 1.82704 7.49991 1.82704C10.6329 1.82704 13.1727 4.36686 13.1727 7.49988C13.1727 10.6329 10.6329 13.1727 7.49991 13.1727C4.36689 13.1727 1.82708 10.6329 1.82708 7.49988ZM10.1589 5.53774C10.3178 5.31191 10.2636 5.00001 10.0378 4.84109C9.81194 4.68217 9.50004 4.73642 9.34112 4.96225L6.51977 8.97154L5.35681 7.78706C5.16334 7.59002 4.84677 7.58711 4.64973 7.78058C4.45268 7.97404 4.44978 8.29061 4.64325 8.48765L6.22658 10.1003C6.33054 10.2062 6.47617 10.2604 6.62407 10.2483C6.77197 10.2363 6.90686 10.1591 6.99226 10.0377L10.1589 5.53774Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium">Regular check-ins</h3>
                    <p className="text-sm text-muted-foreground">Track your mental health patterns over time to identify triggers and improvements.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-primary/10 rounded-full p-2 mr-4 mt-1">
                    <svg width="20" height="20" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary">
                      <path d="M7.49991 0.877045C3.84222 0.877045 0.877075 3.84219 0.877075 7.49988C0.877075 11.1575 3.84222 14.1227 7.49991 14.1227C11.1576 14.1227 14.1227 11.1575 14.1227 7.49988C14.1227 3.84219 11.1576 0.877045 7.49991 0.877045ZM1.82708 7.49988C1.82708 4.36686 4.36689 1.82704 7.49991 1.82704C10.6329 1.82704 13.1727 4.36686 13.1727 7.49988C13.1727 10.6329 10.6329 13.1727 7.49991 13.1727C4.36689 13.1727 1.82708 10.6329 1.82708 7.49988ZM10.1589 5.53774C10.3178 5.31191 10.2636 5.00001 10.0378 4.84109C9.81194 4.68217 9.50004 4.73642 9.34112 4.96225L6.51977 8.97154L5.35681 7.78706C5.16334 7.59002 4.84677 7.58711 4.64973 7.78058C4.45268 7.97404 4.44978 8.29061 4.64325 8.48765L6.22658 10.1003C6.33054 10.2062 6.47617 10.2604 6.62407 10.2483C6.77197 10.2363 6.90686 10.1591 6.99226 10.0377L10.1589 5.53774Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium">Personalized suggestions</h3>
                    <p className="text-sm text-muted-foreground">Receive customized recommendations based on your unique needs and preferences.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-primary/10 rounded-full p-2 mr-4 mt-1">
                    <svg width="20" height="20" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary">
                      <path d="M7.49991 0.877045C3.84222 0.877045 0.877075 3.84219 0.877075 7.49988C0.877075 11.1575 3.84222 14.1227 7.49991 14.1227C11.1576 14.1227 14.1227 11.1575 14.1227 7.49988C14.1227 3.84219 11.1576 0.877045 7.49991 0.877045ZM1.82708 7.49988C1.82708 4.36686 4.36689 1.82704 7.49991 1.82704C10.6329 1.82704 13.1727 4.36686 13.1727 7.49988C13.1727 10.6329 10.6329 13.1727 7.49991 13.1727C4.36689 13.1727 1.82708 10.6329 1.82708 7.49988ZM10.1589 5.53774C10.3178 5.31191 10.2636 5.00001 10.0378 4.84109C9.81194 4.68217 9.50004 4.73642 9.34112 4.96225L6.51977 8.97154L5.35681 7.78706C5.16334 7.59002 4.84677 7.58711 4.64973 7.78058C4.45268 7.97404 4.44978 8.29061 4.64325 8.48765L6.22658 10.1003C6.33054 10.2062 6.47617 10.2604 6.62407 10.2483C6.77197 10.2363 6.90686 10.1591 6.99226 10.0377L10.1589 5.53774Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium">Progress tracking</h3>
                    <p className="text-sm text-muted-foreground">Monitor your growth and celebrate achievements on your wellness journey.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="bg-muted py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">AugMend Health</h3>
              <p className="text-sm text-muted-foreground">Your companion for better mental health and wellbeing through technology and evidence-based approaches.</p>
            </div>
            <div>
              <h4 className="font-medium mb-4">Features</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/reflection-journal" className="text-muted-foreground hover:text-foreground transition-colors">Reflection Journal</Link></li>
                <li><Link to="/health-assistant" className="text-muted-foreground hover:text-foreground transition-colors">Health Assistant</Link></li>
                <li><Link to="/wellness-center" className="text-muted-foreground hover:text-foreground transition-colors">Wellness Center</Link></li>
                <li><Link to="/achievements" className="text-muted-foreground hover:text-foreground transition-colors">Achievements</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Blog</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Research</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Mental Health Tips</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Terms of Service</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Cookie Policy</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Contact Us</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-6 border-t text-center text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} AugMend Health. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
