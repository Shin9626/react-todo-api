import { useContext, createContext } from 'react';

export const FormContext = createContext(null);

export const useFormContext = () => {
  return useContext(FormContext);
};
