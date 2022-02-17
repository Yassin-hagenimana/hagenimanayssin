import {mount} from "react"
import Signup from "../components/BuyToken";

describe("", () => {
    it("accepts user token props", () => {
      const wrapper = mount(<Signup user={Signup} />);
      expect(wrapper.props().user).toEqual(Signup);
    });
    it("contains users account email", () => {
      const wrapper = mount(<Signup user={Signup} />);
      const value = wrapper.find("p").text();
      expect(value).toEqual(1200);
    });
  });
  