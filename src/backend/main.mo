import Map "mo:core/Map";
import Text "mo:core/Text";
import Int "mo:core/Int";
import Iter "mo:core/Iter";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import Testimonial "Testimonial";
import Room "Room";
import Inquiry "Inquiry";

actor {
  let rooms = Map.empty<Text, Room.Room>();
  let inquiries = Map.empty<Text, Inquiry.Inquiry>();
  let testimonials = Map.empty<Text, Testimonial.Testimonial>();

  public shared ({ caller }) func submitInquiry(name : Text, phone : Text, roomType : Text, moveInDate : Int) : async Text {
    let id = name.concat(phone);
    let inquiry : Inquiry.Inquiry = {
      id;
      name;
      phone;
      roomType;
      moveInDate;
      createdAt = Time.now();
    };
    inquiries.add(id, inquiry);
    id;
  };

  public query ({ caller }) func getRooms() : async [Room.Room] {
    rooms.values().toArray().sort(Room.compareByPrice);
  };

  public query ({ caller }) func getTestimonials() : async [Testimonial.Testimonial] {
    testimonials.values().toArray();
  };

  public query ({ caller }) func getInquiries() : async [Inquiry.Inquiry] {
    inquiries.values().toArray().sort(Inquiry.compareByDate);
  };

  // Seed data (not exposed as public methods)
  system func preupgrade() {};
  system func postupgrade() {};

  let initialRooms : [Room.Room] = [
    {
      id = "room1";
      name = "Single";
      price = 10000;
      features = ["WiFi", "Furnished", "Laundry"];
      isAvailable = true;
    },
    {
      id = "room2";
      name = "Double";
      price = 8000;
      features = ["WiFi", "Shared Bathroom"];
      isAvailable = true;
    },
    {
      id = "room3";
      name = "Triple";
      price = 6000;
      features = ["Furnished", "Study Table"];
      isAvailable = true;
    },
    {
      id = "room4";
      name = "AC Deluxe";
      price = 15000;
      features = ["AC", "WiFi", "Private Bathroom"];
      isAvailable = false;
    },
  ];

  let initialTestimonials : [Testimonial.Testimonial] = [
    {
      id = "test1";
      studentName = "Rahul Sharma";
      course = "B.Tech";
      review = "Great facilities and friendly staff!";
      rating = 5;
    },
    {
      id = "test2";
      studentName = "Priya Singh";
      course = "MBA";
      review = "Clean rooms and good food.";
      rating = 4;
    },
    {
      id = "test3";
      studentName = "Amit Kumar";
      course = "BSc";
      review = "Affordable and comfortable stay.";
      rating = 5;
    },
    {
      id = "test4";
      studentName = "Neha Gupta";
      course = "MCA";
      review = "Excellent location near college.";
      rating = 4;
    },
    {
      id = "test5";
      studentName = "Vikas Mehra";
      course = "BA";
      review = "Helpful management and clean environment.";
      rating = 5;
    },
  ];

  // Add seed data if not already present
  for (room in initialRooms.values()) {
    rooms.add(room.id, room);
  };

  for (testimonial in initialTestimonials.values()) {
    testimonials.add(testimonial.id, testimonial);
  };
};
