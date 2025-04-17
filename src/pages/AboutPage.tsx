
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Car, MapPin, Phone, Mail, Clock, ShieldCheck, HeartHandshake, Leaf } from 'lucide-react';

const AboutPage = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-brand-blue text-white py-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About DriveEasy</h1>
            <p className="text-lg opacity-90 mb-8">
              Providing premium car rental services since 2024. We're committed to making your journey comfortable,
              safe, and memorable with our diverse fleet of quality vehicles.
            </p>
            <Button 
              className="bg-brand-purple hover:bg-brand-purple/90"
              asChild
            >
              <Link to="/cars">Explore Our Fleet</Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Our Story Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-7xl">
          <div className="md:flex items-center gap-12">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <img 
                src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/eb81c233785752.56b844164ce73.jpg" 
                alt="Car rental office" 
                className="rounded-lg shadow-xl"
              />
            </div>
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-gray-700 mb-4">
                It all started with a simple question between three friends:
                "Why is renting a car still so complicated?"
              </p>
              <p className="text-gray-700 mb-4">
                As engineering students passionate about technology and smart design, we noticed that traditional car rental platforms often felt outdated, confusing, or lacked flexibility — especially for students, tourists, or people looking for short-term rides.
                So, during our final-year design engineering project, we decided to do something about it.
              </p>
              <p className="text-gray-700">
                We set out to build a modern, user-friendly car rental website that makes booking a vehicle fast, easy, and transparent. Our goal was to combine smart design with seamless functionality — allowing users to browse cars, check availability, and reserve rides in just a few clicks.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Mission & Values */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Our Mission & Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              At DriveEasy, we're driven by our commitment to providing exceptional service and value to our customers.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-brand-purple/10 text-brand-purple mb-4">
                <ShieldCheck className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold mb-3">Safety First</h3>
              <p className="text-gray-600">
                We prioritize your safety above all else. Our vehicles undergo rigorous maintenance checks, and we ensure they meet the highest safety standards.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-brand-purple/10 text-brand-purple mb-4">
                <HeartHandshake className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold mb-3">Customer Satisfaction</h3>
              <p className="text-gray-600">
                We believe in building lasting relationships with our customers through exceptional service, transparency, and going the extra mile.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-brand-purple/10 text-brand-purple mb-4">
                <Leaf className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold mb-3">Sustainability</h3>
              <p className="text-gray-600">
                We're committed to reducing our environmental impact by maintaining fuel-efficient vehicles and incorporating hybrid and electric options in our fleet.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Team */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Our Leadership Team</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Meet our Developers
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="relative mb-4 mx-auto w-40 h-40 overflow-hidden rounded-full">
                <img 
                  src="https://t4.ftcdn.net/jpg/04/31/12/53/360_F_431125302_JOqEYIykLcle9NvKhkgkpVYtK1vTHwYQ.jpg" 
                  alt="CEO" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold">Krushal Barasiya</h3>
              <p className="text-brand-purple">Full-Stack Developer</p>
            </div>
            
            <div className="text-center">
              <div className="relative mb-4 mx-auto w-40 h-40 overflow-hidden rounded-full">
                <img 
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfTipdVquMnhWsDWP2Ljt47wXDPDgxtTcDDs6CDH9Tt1ntwsPcnhGtivYgkLvStRwo0sw&usqp=CAU" 
                  alt="COO" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold">Urvashi Chavada</h3>
              <p className="text-brand-purple">UI/UX Designer</p>
            </div>
            
            <div className="text-center">
              <div className="relative mb-4 mx-auto w-40 h-40 overflow-hidden rounded-full">
                <img 
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSq5N87Pb5762LsXhq8aTomhRPHxCpRAel5Q&s" 
                  alt="CTO" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold">Raj Bhoraniya</h3>
              <p className="text-brand-purple">Frontend Developer</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Contact Information */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Get In Touch</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Have questions or need assistance? Our team is here to help. Contact us through any of the following channels.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-brand-purple/10 text-brand-purple mb-4">
                <MapPin className="h-7 w-7 transition-transform duration-200 hover:text-brand-pink hover:scale-110" />
              </div>
              <h3 className="text-xl font-bold mb-2">Visit Us</h3>
              <p className="text-gray-600">
                Rajkot , Gujrat<br />
                India
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-brand-purple/10 text-brand-purple mb-4">
                <Phone className="h-7 w-7 transition-transform duration-200 hover:text-brand-pink hover:scale-110" />
              </div>
              <h3 className="text-xl font-bold mb-2">Call Us</h3>
              <p className="text-gray-600">
                Customer Service:<br />
                +91 9974760800<br />
                <br />
                Reservations:<br />
                +91 9265745667
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-brand-purple/10 text-brand-purple mb-4">
                <Clock className="h-7 w-7 transition-transform duration-200 hover:text-brand-pink hover:scale-110" />
              </div>
              <h3 className="text-xl font-bold mb-2">Opening Hours</h3>
              <p className="text-gray-600">
                Monday - Friday:<br />
                8:00 AM - 8:00 PM<br />
                <br />
                Saturday - Sunday:<br />
                9:00 AM - 6:00 PM
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AboutPage;
