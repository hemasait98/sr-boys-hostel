import Text "mo:core/Text";
import Int "mo:core/Int";
import Order "mo:core/Order";

module {
  public type Inquiry = {
    id : Text;
    name : Text;
    phone : Text;
    roomType : Text;
    moveInDate : Int;
    createdAt : Int;
  };

  public func compareByDate(inquiry1 : Inquiry, inquiry2 : Inquiry) : Order.Order {
    Int.compare(inquiry2.createdAt, inquiry1.createdAt);
  };
};
