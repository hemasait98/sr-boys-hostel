import Text "mo:core/Text";
import Int "mo:core/Int";
import Order "mo:core/Order";

module {
  public type Testimonial = {
    id : Text;
    studentName : Text;
    course : Text;
    review : Text;
    rating : Int;
  };

  public func compareByRating(testimonial1 : Testimonial, testimonial2 : Testimonial) : Order.Order {
    Int.compare(testimonial2.rating, testimonial1.rating);
  };
};
