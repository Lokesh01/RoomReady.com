import { useParams } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import { useMutation, useQuery } from "react-query";
import { fetchMyHotelByIdAPI, updateMyHotelByIdAPI } from "../apis/hotel-api";
import ManageHotelForm from "../forms/ManageHotelForms/ManageHotelForm";

const EditHotel = () => {
  const { hotelId } = useParams();
  const { showToast } = useAppContext();

  const { data: hotel } = useQuery(
    "fetchMyHotelByIdAPI",
    () => fetchMyHotelByIdAPI(hotelId || ""),
    {
      enabled: !!hotelId, // will check first if hotelId exists
    }
  );

  const { mutate, isLoading } = useMutation(updateMyHotelByIdAPI, {
    onSuccess: () => {
      showToast({ message: "Hotel Saved!", type: "SUCCESS" });
    },
    onError: () => {
      showToast({ message: "Error Saving Hotel", type: "ERROR" });
    },
  });

  const handleSave = (hotelFormData: FormData) => {
    mutate(hotelFormData);
  };

  return (
    <ManageHotelForm
      hotel={hotel}
      onSave={handleSave}
      isLoading={isLoading}
    />
  );
};

export default EditHotel;
