// pages/trainingCenters.js
import { useState, useEffect } from 'react';
import { getAllTrainCenters } from '../services/trainCentre';

const TrainingCenters = () => {
  const [trainCenters, setTrainCenters] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchTrainCenters = async () => {
      try {
        const data = await getAllTrainCenters();
        setTrainCenters(data.trainCentres);
      } catch (error) {
        console.error('Error fetching training centers:', error);
      }
    };

    fetchTrainCenters();
  }, []);

  const filteredTrainCenters = trainCenters.filter(trainCenter =>
    trainCenter.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Find a Training Center</h1>
        <div className="mt-4">
          <input
            className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-full max-w-md"
            placeholder="Search by name"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredTrainCenters.map((trainCenter) => (
          <div key={trainCenter._id} className="rounded-lg border bg-card text-card-foreground shadow-sm" data-v0-t="card">
            <div className="flex flex-col space-y-1.5 p-6">
              <h2 className="text-xl font-bold">{trainCenter.name}</h2>
            </div>
            <div className="p-6">
              <div className="space-y-2">
                <p>{trainCenter.location}</p>
                <p>Capacity: {trainCenter.capacity}</p>
                <p>Available Seats: {trainCenter.availableSeats}</p>
                <p>Contact: {trainCenter.contactInfo}</p>
              </div>
            </div>
            <div className="flex items-center p-6">
              <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default TrainingCenters;
