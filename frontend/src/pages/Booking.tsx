import BookingForm from "../forms/BookingForm/BookingForm";
import { useQuery } from "react-query";
import { createPaymentIntent, fetchCurrentUser } from "../apis/booking-api";
import { useSearchContext } from "../contexts/SearchContext";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchHotelById } from "../apis/hotel-api";
import BookingDetailsSummary from "../components/BookingDetailsSummary";
import { useAppContext } from "../contexts/AppContext";
import { Elements } from "@stripe/react-stripe-js";

const Booking = () => {
  const search = useSearchContext();
  const { hotelId } = useParams();
  const [numberOfNights, setNumberOfNights] = useState<number>(0);
  const { stripePromise } = useAppContext();

  useEffect(() => {
    if (search.checkIn && search.checkOut) {
      const nights =
        Math.abs(search.checkOut.getTime() - search.checkIn.getTime()) /
        (1000 * 60 * 60 * 24);
      setNumberOfNights(Math.ceil(nights));
    }
  }, [search.checkIn, search.checkOut]);

  const { data: paymentIntentData } = useQuery(
    "createPaymentIntent",
    () => createPaymentIntent(hotelId as string, numberOfNights.toString()),
    { enabled: !!hotelId && numberOfNights > 0 }
  );

  const { data: hotel } = useQuery(
    "fetchHotelById",
    () => fetchHotelById(hotelId as string),
    {
      enabled: !!hotelId,
    }
  );

  const { data: currentUser } = useQuery("fetchCurrentUser", fetchCurrentUser);

  if (!hotel) return <></>;

  return (
    <div className="grid md:grid-cols-[1fr_2fr] gap-2">
      <BookingDetailsSummary
        checkIn={search.checkIn}
        checkOut={search.checkOut}
        adultCount={search.adultCount}
        childCount={search.childCount}
        numberOfNights={numberOfNights}
        hotel={hotel}
      />

      {currentUser && paymentIntentData && (
        <Elements
          stripe={stripePromise}
          options={{ clientSecret: paymentIntentData.clientSecret }}
        >
          <BookingForm
            currentUser={currentUser}
            paymentIntent={paymentIntentData}
          />
        </Elements>
      )}
    </div>
  );
};

export default Booking;
