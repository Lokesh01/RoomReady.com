import { useMutation } from "react-query";
import { useAppContext } from "../contexts/AppContext";
import ManageHotelForm from "../forms/ManageHotelForms/ManageHotelForm";
import { addHotelAPI } from "../apis/hotel-api";

const AddHotel = () => {
  const { showToast } = useAppContext();
  const { mutate, isLoading } = useMutation(addHotelAPI, {
    onSuccess: () => {
      showToast({ message: "Hotel Saved !", type: "SUCCESS" });
    },
    onError: () => {
      showToast({ message: "Error saving hotel !", type: "ERROR" });
    },
  });

  const handleSave = (hotelFormData: FormData) => {
    mutate(hotelFormData);
  };

  return <ManageHotelForm onSave={handleSave} isLoading={isLoading} />;
};

export default AddHotel;
