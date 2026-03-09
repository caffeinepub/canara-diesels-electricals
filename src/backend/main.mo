import Time "mo:core/Time";
import List "mo:core/List";

actor {
  type Enquiry = {
    name : Text;
    phone : Text;
    email : Text;
    message : Text;
    timestamp : Time.Time;
  };

  let enquiries = List.empty<Enquiry>();

  public shared ({ caller }) func submitEnquiry(name : Text, phone : Text, email : Text, message : Text) : async () {
    let newEnquiry : Enquiry = {
      name;
      phone;
      email;
      message;
      timestamp = Time.now();
    };
    enquiries.add(newEnquiry);
  };

  public query ({ caller }) func getAllEnquiries() : async [Enquiry] {
    enquiries.toArray();
  };
};
