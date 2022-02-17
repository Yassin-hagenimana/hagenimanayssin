import Signup from "../components/BuyToken";

import {render,screen,fireEvent,waitFor} from "react"
test('successful generate token', async () => {
    jest
      .spyOn(window, 'post')
      .mockResolvedValue({ json: () => ({ token: '123456' }) });
  
    render(<Signup/>);
  
    const amountField = screen.getByRole('textbox', { name: "amount" });
    const meterNumberField = screen.getByLabelText('meterNumber');
    const button = screen.getByRole('button');
  
    // fill out and submit form
    fireEvent.change(amountField, { target: { value: 200 } });
    fireEvent.change(meterNumberField, { target: { value: 123456 } });
    fireEvent.click(button);
  
    // it sets loading state
    expect(button).toBeDisabled();
    expect(button).toHaveTextContent('Loading...');
  
    await waitFor(() => {
      // it hides form elements
      expect(button).not.toBeInTheDocument();
      expect(amountField).not.toBeInTheDocument();
      expect(meterNumberField).not.toBeInTheDocument();
  
  
      const generateToken = screen.getByText('generated token is');
      expect(generateToken).toBeInTheDocument();
      const token = screen.getByText("token");
      expect(token).toBeInTheDocument();
    });
  });