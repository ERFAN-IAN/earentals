"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import { queryClient } from "@/components/ReactQuery";
const page = () => {
  const [submitting, isSubmitting] = useState(false);
  const router = useRouter();
  return (
    <main className="flex justify-center">
      <form
        className="w-full max-w-[42rem] px-4 py-8 mt-20 flex flex-col gap-y-8 card shadow-xl"
        // action="/api/properties/"
        // method="POST"
        onSubmit={async (e) => {
          e.preventDefault();
          isSubmitting(true);
          try {
            const formData = new FormData(e.currentTarget);
            const response = await fetch(
              `${process.env.NEXT_PUBLIC_API_DOMAIN}/properties`,
              {
                method: "POST",
                body: formData,
              }
            );
            isSubmitting(false);
            const toJson = await response.json();
            if (toJson.id) {
              router.push(`/properties/${toJson.id}`);
            }
            queryClient.invalidateQueries({ queryKey: ["userproperty"] });
            if (toJson.error.message) {
              toast.error(toJson.error.message);
            }
          } catch (error) {
            toast.error(error);
          }
        }}
        encType="multipart/form-data"
      >
        <h1 className=" text-center font-bold text-3xl">Add Property</h1>
        <div className="flex flex-col">
          <label htmlFor="type" className="font-semibold">
            Property Type
          </label>
          <select
            id="type"
            className="mt-2 rounded-lg p-2 border-primary border-2 focus:border-primary outline-none"
            name="type"
            required
          >
            <option value="Apartment">Apartment</option>
            <option value="Condo">Condo</option>
            <option value="House">House</option>
            <option value="Cabin Or Cottage">Cabin or Cottage</option>
            <option value="Room">Room</option>
            <option value="Studio">Studio</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="flex flex-col">
          <label htmlFor="name" className="font-semibold">
            Listing Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            className="mt-2 rounded-lg p-2 border-primary border-2 focus:border-primary outline-none"
            placeholder="eg. Beautiful Apartment In Miami"
            required
          ></input>
        </div>
        <div className="flex flex-col">
          <label htmlFor="description" className="font-semibold">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            className="mt-2 rounded-lg p-2 border-primary border-2 focus:border-primary outline-none"
            placeholder="Add an optional description of your property"
            rows={4}
          ></textarea>
        </div>
        <div className="flex flex-col gap-y-2 px-2 py-4 border-secondary border-2 rounded-lg">
          <p className="font-semibold">Location</p>
          <input
            id="street"
            name="location.street"
            type="text"
            className="mt-2 rounded-lg p-2 border-primary border-2 focus:border-primary outline-none"
            placeholder="Street"
          ></input>
          <input
            id="city"
            name="location.city"
            type="text"
            className="mt-2 rounded-lg p-2 border-primary border-2 focus:border-primary outline-none"
            placeholder="City"
            required
          ></input>
          <input
            id="state"
            name="location.state"
            type="text"
            className="mt-2 rounded-lg p-2 border-primary border-2 focus:border-primary outline-none"
            placeholder="State"
            required
          ></input>
          <input
            id="zipcode"
            name="location.zipcode"
            type="text"
            className="mt-2 rounded-lg p-2 border-primary border-2 focus:border-primary outline-none"
            placeholder="9908"
          ></input>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-4 gap-y-2">
          <div className="flex flex-col">
            <label htmlFor="beds" className="font-semibold">
              Beds
            </label>
            <input
              id="beds"
              name="beds"
              type="number"
              className="mt-2 rounded-lg p-2 border-primary border-2 focus:border-primary outline-none"
            ></input>
          </div>
          <div className="flex flex-col">
            <label htmlFor="baths" className="font-semibold">
              Baths
            </label>
            <input
              id="baths"
              name="baths"
              type="number"
              className="mt-2 rounded-lg p-2 border-primary border-2 focus:border-primary outline-none"
            ></input>
          </div>
          <div className="flex flex-col">
            <label htmlFor="square_feet" className="font-semibold">
              Square Feet
            </label>
            <input
              id="square_feet"
              name="square_feet"
              type="number"
              className="mt-2 rounded-lg p-2 border-primary border-2 focus:border-primary outline-none"
            ></input>
          </div>
        </div>
        <div className="flex flex-col gap-y-2 px-2 py-4 border-secondary border-2 rounded-lg">
          <label className=" font-bold">Amenities</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 gap-y-4 mt-4">
            <div>
              <input
                type="checkbox"
                id="amenity_wifi"
                name="amenities"
                value="Wifi"
                className="mr-2"
              />
              <label htmlFor="amenity_wifi">Wifi</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="amenity_kitchen"
                name="amenities"
                value="Full Kitchen"
                className="mr-2"
              />
              <label htmlFor="amenity_kitchen">Full kitchen</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="amenity_washer_dryer"
                name="amenities"
                value="Washer & Dryer"
                className="mr-2"
              />
              <label htmlFor="amenity_washer_dryer">Washer & Dryer</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="amenity_free_parking"
                name="amenities"
                value="Free Parking"
                className="mr-2"
              />
              <label htmlFor="amenity_free_parking">Free Parking</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="amenity_pool"
                name="amenities"
                value="Swimming Pool"
                className="mr-2"
              />
              <label htmlFor="amenity_pool">Swimming Pool</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="amenity_hot_tub"
                name="amenities"
                value="Hot Tub"
                className="mr-2"
              />
              <label htmlFor="amenity_hot_tub">Hot Tub</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="amenity_24_7_security"
                name="amenities"
                value="24/7 Security"
                className="mr-2"
              />
              <label htmlFor="amenity_24_7_security">24/7 Security</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="amenity_wheelchair_accessible"
                name="amenities"
                value="Wheelchair Accessible"
                className="mr-2"
              />
              <label htmlFor="amenity_wheelchair_accessible">
                Wheelchair Accessible
              </label>
            </div>
            <div>
              <input
                type="checkbox"
                id="amenity_elevator_access"
                name="amenities"
                value="Elevator Access"
                className="mr-2"
              />
              <label htmlFor="amenity_elevator_access">Elevator Access</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="amenity_dishwasher"
                name="amenities"
                value="Dishwasher"
                className="mr-2"
              />
              <label htmlFor="amenity_dishwasher">Dishwasher</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="amenity_gym_fitness_center"
                name="amenities"
                value="Gym/Fitness Center"
                className="mr-2"
              />
              <label htmlFor="amenity_gym_fitness_center">
                Gym/Fitness Center
              </label>
            </div>
            <div>
              <input
                type="checkbox"
                id="amenity_air_conditioning"
                name="amenities"
                value="Air Conditioning"
                className="mr-2"
              />
              <label htmlFor="amenity_air_conditioning">Air Conditioning</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="amenity_balcony_patio"
                name="amenities"
                value="Balcony/Patio"
                className="mr-2"
              />
              <label htmlFor="amenity_balcony_patio">Balcony/Patio</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="amenity_smart_tv"
                name="amenities"
                value="Smart TV"
                className="mr-2"
              />
              <label htmlFor="amenity_smart_tv">Smart TV</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="amenity_coffee_maker"
                name="amenities"
                value="Coffee Maker"
                className="mr-2"
              />
              <label htmlFor="amenity_coffee_maker">Coffee Maker</label>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-y-2 sm:gap-y-6 px-2 py-4 border-secondary border-2 rounded-lg">
          <h4 className="font-bold text-xl">
            Rates (Leave blank if not applicable)
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-4 gap-y-2">
            <div className="flex flex-col">
              <label htmlFor="nightly_rate" className="font-semibold">
                Nightly
              </label>
              <input
                id="nightly_rate"
                name="rates.nightly"
                type="number"
                className="mt-2 rounded-lg p-2 border-primary border-2 focus:border-primary outline-none"
              ></input>
            </div>
            <div className="flex flex-col">
              <label htmlFor="weekly_rate" className="font-semibold">
                Weekly
              </label>
              <input
                id="weekly_rate"
                name="rates.weekly"
                type="number"
                className="mt-2 rounded-lg p-2 border-primary border-2 focus:border-primary outline-none"
              ></input>
            </div>
            <div className="flex flex-col">
              <label htmlFor="monthly_rate" className="font-semibold">
                Monthly
              </label>
              <input
                id="monthly_rate"
                name="rates.monthly"
                type="number"
                className="mt-2 rounded-lg p-2 border-primary border-2 focus:border-primary outline-none"
              ></input>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <label htmlFor="seller_name" className="font-semibold">
            Seller Name
          </label>
          <input
            id="seller_name"
            name="seller_info.name"
            type="text"
            className="mt-2 rounded-lg p-2 border-primary border-2 focus:border-primary outline-none"
            required
          ></input>
        </div>
        <div className="flex flex-col">
          <label htmlFor="seller_email" className="font-semibold">
            Seller Email
          </label>
          <input
            id="seller_email"
            name="seller_info.email"
            type="email"
            className="mt-2 rounded-lg p-2 border-primary border-2 focus:border-primary outline-none"
            required
          ></input>
        </div>
        <div className="flex flex-col">
          <label htmlFor="seller_phone" className="font-semibold">
            Seller Phone
          </label>
          <input
            id="seller_phone"
            name="seller_info.phone"
            type="tel"
            className="mt-2 rounded-lg p-2 border-primary border-2 focus:border-primary outline-none"
          ></input>
        </div>
        <div className="flex flex-col">
          <label htmlFor="images" className="font-semibold">
            Select up to 3 images
          </label>
          <input
            type="file"
            id="images"
            name="images"
            className="mt-2 rounded-lg p-2 border-primary border-2 focus:border-primary outline-none"
            multiple
            accept="image/*"
            required
          ></input>
        </div>
        <button
          type="submit"
          disabled={submitting ? true : false}
          className=" bg-secondary rounded-lg py-2 text-black font-semibold"
        >
          {submitting ? "submitting..." : "Submit Property"}
        </button>
      </form>
    </main>
  );
};

export default page;
