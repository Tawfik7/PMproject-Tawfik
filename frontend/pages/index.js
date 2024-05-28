import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getAllTrainCenters } from '../services/trainCentre';

export default function HomePage() {
  const [trainCenters, setTrainCenters] = useState([]);

  useEffect(() => {
    const fetchTrainCenters = async () => {
      try {
        const data = await getAllTrainCenters();
        setTrainCenters(data.trainCentres.slice(0, 3)); // Get only the first 3 training centers
      } catch (error) {
        console.error('Failed to fetch training centers:', error);
      }
    };

    fetchTrainCenters();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <main className="flex-1">
        <section className="w-full pt-12 md:pt-24 lg:pt-32">
          <div className="container space-y-10 xl:space-y-16">
            <div className="grid gap-4 px-10 md:grid-cols-2 md:gap-16">
              <div>
                <h1 className="lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem] text-blue-900">
                  Elevate Your Skills at Our Training Center
                </h1>
              </div>
              <div className="flex flex-col items-start space-y-4">
                <p className="mx-auto max-w-[700px] text-gray-700 md:text-xl">
                  Discover a wide range of training courses designed to help you reach new heights in your career. Our
                  state-of-the-art facilities and expert instructors are here to guide you every step of the way.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-blue-50" id="how-it-works">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-blue-100 px-3 py-1 text-sm">How it Works</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-blue-900">A Seamless Booking Experience</h2>
                <p className="max-w-[900px] text-gray-700 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Discover our simple and efficient booking process, designed to make your training center experience
                  hassle-free.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <div className="grid gap-1">
                <h3 className="text-xl font-bold text-blue-900">1. Browse Courses</h3>
                <p className="text-gray-700">
                  Explore our wide selection of training courses and find the one that best suits your needs.
                </p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-xl font-bold text-blue-900">2. Select a Date</h3>
                <p className="text-gray-700">
                  Choose a convenient date and time for your training session.
                </p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-xl font-bold text-blue-900">3. Confirm Booking</h3>
                <p className="text-gray-700">
                  Review your booking details and complete the payment to secure your spot.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-blue-100 px-3 py-1 text-sm">Our Courses</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-blue-900">Expand Your Horizons</h2>
                <p className="max-w-[900px] text-gray-700 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Explore our diverse range of training courses and find the perfect fit for your professional
                  development.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              {trainCenters.map(center => (
                <div key={center._id} className="rounded-lg border bg-white text-gray-900 shadow-sm p-6 hover:shadow-xl transition-shadow">
                  <h3 className="text-2xl font-semibold leading-none tracking-tight">{center.name}</h3>
                  <p className="text-gray-700">Location: {center.location}</p>
                  <p className="text-gray-700">Capacity: {center.capacity}</p>
                  <p className="text-gray-700">Contact: {center.contactInfo}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-blue-50" id="testimonials">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-blue-100 px-3 py-1 text-sm">Testimonials</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-blue-900">What Our Clients Say</h2>
                <p className="max-w-[900px] text-gray-700 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Hear from our satisfied customers and learn why they chose our training center.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <div className="rounded-lg border bg-white text-gray-900 shadow-sm p-6">
                <div className="flex items-center gap-4">
                  <span className="relative flex shrink-0 overflow-hidden rounded-full w-11 h-11 border">
                    <span className="flex h-full w-full items-center justify-center rounded-full bg-blue-200">CN</span>
                  </span>
                  <div className="grid">
                    <div className="font-semibold">Sarah Johnson</div>
                    <div className="text-sm text-gray-600">Marketing Manager</div>
                  </div>
                </div>
                <blockquote className="mt-4 space-y-2">
                  <p className="leading-7">
                    “The training center provided me with invaluable skills and knowledge. The instructors were highly
                    experienced and supportive.”
                  </p>
                </blockquote>
              </div>
              <div className="rounded-lg border bg-white text-gray-900 shadow-sm p-6">
                <div className="flex items-center gap-4">
                  <span className="relative flex shrink-0 overflow-hidden rounded-full w-11 h-11 border">
                    <span className="flex h-full w-full items-center justify-center rounded-full bg-blue-200">TN</span>
                  </span>
                  <div className="grid">
                    <div className="font-semibold">John Smith</div>
                    <div className="text-sm text-gray-600">Software Developer</div>
                  </div>
                </div>
                <blockquote className="mt-4 space-y-2">
                  <p className="leading-7">
                    “I highly recommend this training center. The courses are comprehensive and well-structured,
                    helping me advance in my career.”
                  </p>
                </blockquote>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

