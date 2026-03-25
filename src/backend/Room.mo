import Text "mo:core/Text";
import Int "mo:core/Int";
import Order "mo:core/Order";

module {
  public type Room = {
    id : Text;
    name : Text;
    price : Int;
    features : [Text];
    isAvailable : Bool;
  };

  public func compareByPrice(room1 : Room, room2 : Room) : Order.Order {
    Int.compare(room1.price, room2.price);
  };
};
