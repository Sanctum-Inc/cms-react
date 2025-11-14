import { createContext } from "react";

const NavigationContext = createContext({
    isGreyed: false,
    setGreyed: (_: boolean) => {}
});

export default NavigationContext;