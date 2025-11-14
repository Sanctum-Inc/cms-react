import { createContext } from "react";

const NavigationContext = createContext({
    isGreyed: false,
    setGreyed: (val: boolean) => {}
});

export default NavigationContext;