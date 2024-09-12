import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  AI_PROMPT,
  SelectBudgetOptions,
  SelectTravelesList,
} from "@/constants/options";
import { chatSession } from "@/service/AIModal";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/service/firebaseConfig";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

function CreateTrip() {
  const [place, setPlace] = useState("");
  const [locationOptions, setLocationOptions] = useState([]);
  const [formData, setFormData] = useState([]);
  const [openDailog, setOpenDailog] = useState(false);
  const [loading, setLoading] = useState(false);
  const GEOAPIFY_API_KEY = "730ef94a1509487cb08619603ab6caf4";
  const navigate = useNavigate();

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error),
  });

  const fetchLocationSuggestions = async (query) => {
    if (query.length < 3) return;

    try {
      const response = await axios.get(
        `https://api.geoapify.com/v1/geocode/autocomplete?text=${query}&apiKey=${GEOAPIFY_API_KEY}`
      );
      setLocationOptions(response.data.features);
      console.log("Location options:", response.data.features);
    } catch (error) {
      console.error("Error fetching location data:", error);
      toast.error("Error fetching location data. Try again later.");
    }
  };

  const handleLocationSelect = (option) => {
    setPlace(option.properties.formatted);
    handleInputChange("location", option.properties);
    setLocationOptions([]);
  };

  const OnGenerateTrip = async () => {
    const user = localStorage.getItem("user");
    if (!user) {
      setOpenDailog(true);
      return;
    }

    if (
      formData?.totalDays > 5 ||
      !formData?.location ||
      !formData?.budget ||
      !formData?.traveler
    ) {
      toast("Please fill all details!");
      return;
    }

    setLoading(true);
    const FINAL_PROMPT = AI_PROMPT.replace(
      "{location}",
      formData?.location?.formatted
    )
      .replace("{totalDays}", formData?.noOfDays)
      .replace("{traveler}", formData?.traveler)
      .replace("{budget}", formData?.budget)
      .replace("{totalDays}", formData?.noOfDays);

      console.log(FINAL_PROMPT);

    const result = await chatSession.sendMessage(FINAL_PROMPT);
    console.log("--", result?.response?.text());
    setLoading(false);
    SaveAiTrip(result?.response?.text());
  };

  const SaveAiTrip = async (TripData) => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem("user"));
    const docId = Date.now().toString();
    await setDoc(doc(db, "AITrips", docId), {
      userSelection: formData,
      TripData: JSON.parse(TripData),
      userEmail: user?.email,
      id: docId,
    });
    setLoading(false);
    navigate("/view-trip/" + docId);
  };

  const GetUserProfile = (tokenInfo) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?acess_token= ${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "Application/json",
          },
        }
      )
      .then((resp) => {
        console.log(resp);
        localStorage.setItem("user", JSON.stringify(resp.data));
        setOpenDailog(false);
        OnGenerateTrip();
      });
  };

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10">
      <h2 className="font-bold text-3xl">
        Tell us your travel preferences 🌄🏔🌴
      </h2>
      <p className="mt-3 text-gray-500 text-xl">
        Just provide some basic information, and our trip planner will generate
        a customized itinerary based on your preferences.
      </p>

      <div className="mt-20 flex flex-col gap-10">
        <div>
          <h2 className="text-xl my-3 font-medium">What is your destination of choice?</h2>
          <Input
            value={place}
            onChange={(e) => {
              setPlace(e.target.value);
              fetchLocationSuggestions(e.target.value);
            }}
            placeholder="Search for a place..."
          />
          {locationOptions.length > 0 && (
            <ul className="bg-white border rounded mt-2 max-h-64 overflow-auto">
              {locationOptions.map((option, index) => (
                <li
                  key={index}
                  className="p-2 cursor-pointer hover:bg-gray-200"
                  onClick={() => handleLocationSelect(option)}
                >
                  {option.properties.formatted}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <h2 className="text-xl my-3 font-medium">
            How many days are you planning your trip?
          </h2>
          <Input
            placeholder="Example: 2"
            type="number"
            min="1"
            onChange={(e) => handleInputChange("noOfDays", e.target.value)}
          />
        </div>
      </div>
      <div>
        <label className="taxt-xl my-3 font-medium">What is your Budget?</label>
        <p>The budget is exclusively allocated for activities and dining purposes.</p>
        <div className="grid grid-cols-3 gap-5 mt-5 ">
          {SelectBudgetOptions.map((item, index) => (
            <div
              key={index}
              onClick={() => handleInputChange("budget", item.title)}
              // className={`p-4 border 
              // rounded-lg cursor cursor-pointer hover:shadow-2xl
              // ${formData?.budget == item.title && "shadow-lg border-black"}
              // `}
              className={`card-container
                cursor-pointer hover:shadow-2xl
                ${formData?.budget === item.title ? "selected" : ""}
              `}
            >
              <h2 className="text-4xl">{item.icon}</h2>
              <h2 className="font-bold text-lg">{item.title}</h2>
              <h2 className="text-sm text-gray-500">{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="taxt-xl my-3 font-medium">
          Who do you plan on traveling with on your next adventure?
        </h2>
        <div className="grid grid-cols-3 gap-5 mt-5 ">
  {SelectTravelesList.map((item, index) => (
    <div
      key={index}
      onClick={() => handleInputChange("traveler", item.people)}
      className={`card-container
        cursor-pointer hover:shadow-2xl
        ${formData?.traveler === item.people ? "selected" : ""}
      `}
    >
      <h2 className="text-4xl">{item.icon}</h2>
      <h2 className="font-bold text-lg">{item.title}</h2>
      <h2 className="text-sm text-gray-500">{item.desc}</h2>
    </div>
  ))}
</div>

      </div>

      <div className="my-10 justify-center flex">
        <Button disabled={loading} onClick={OnGenerateTrip}>
          {loading ? (
            <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin" />
          ) : (
            "Generate Trip"
          )}
        </Button>
      </div>

      <Dialog open={openDailog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img src="road-trip-vacation.avif" />
              <h2 className="font-bold text-lg mt-7">Sign in With Google</h2>
              <p>Sign in to the App with Google authentication securely</p>

              <Button
                onClick={login}
                className="w-full mt-5 flex gap-4 items-center"
              >
                <FcGoogle className="h-7 w-7" />
                Sign In With Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateTrip;