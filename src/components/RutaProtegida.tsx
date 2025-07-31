import React from "react";
import AccesoDenegado from "./AccesoDenegado";

interface Props {
  isAuthenticated: boolean;
  children: React.ReactNode;
}

const RutaProtegida: React.FC<Props> = ({ isAuthenticated, children }) => {
  return isAuthenticated ? <>{children}</> : <AccesoDenegado />;
};

export default RutaProtegida;

