import { API_BASE_URL } from "./auth-api";

export const addHotelAPI = async (hotelFormData: FormData) => {
  const response = await fetch(`${API_BASE_URL}/api/my-hotels`, {
    method: "POST",
    credentials: "include",
    body: hotelFormData,
  });

  for (const pair of hotelFormData.entries()) {
    console.log(pair[0] + ", " + pair[1]);
  }

  if (!response.ok) {
    throw new Error("Failed to add hotel");
  }

  return response.json();
};
