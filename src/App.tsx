import ExpertBookingPageAlternative7 from './pages/ExpertBookingPageAlternative7';
import { BookingProvider } from './context/BookingContext';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      <BookingProvider>
        <ExpertBookingPageAlternative7 />
      </BookingProvider>
    </div>
  );
}

export default App;