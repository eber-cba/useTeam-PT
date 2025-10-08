import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import styled from "styled-components";

const FormContainer = styled.div`
  width: 100%;
  max-width: 350px;
  background: rgba(255,255,255,0.07);
  border-radius: 18px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.12);
  padding: 2rem 1.5rem 1.5rem 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h2`
  color: #fff;
  margin-bottom: 1.2rem;
  font-weight: 700;
  letter-spacing: 1px;
`;

const StyledForm = styled.form`
  width: 100%;
`;

const FormGroup = styled.div`
  margin-bottom: 1.1rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Label = styled.label`
  color: #e0e7ef;
  font-size: 0.98rem;
  margin-bottom: 0.3rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.7rem 1rem;
  border-radius: 8px;
  border: none;
  background: rgba(255,255,255,0.15);
  color: #fff;
  font-size: 1rem;
  outline: none;
  transition: background 0.2s;
  &:focus { background: rgba(255,255,255,0.25); }
`;

const ErrorMsg = styled.div`
  color: #ef4444;
  background: rgba(239,68,68,0.12);
  border-radius: 6px;
  padding: 0.5rem 1rem;
  margin-bottom: 1rem;
  font-size: 0.98rem;
  text-align: center;
`;

const SubmitBtn = styled.button`
  width: 100%;
  padding: 0.8rem;
  border-radius: 8px;
  border: none;
  background: linear-gradient(90deg,#667eea,#764ba2);
  color: #fff;
  font-size: 1.08rem;
  font-weight: 600;
  cursor: pointer;
  margin-top: 0.5rem;
  box-shadow: 0 2px 8px rgba(102,126,234,0.15);
  transition: background 0.2s, transform 0.2s;
  &:hover { background: linear-gradient(90deg,#764ba2,#667eea); transform: scale(1.04); }
`;

const SwitchText = styled.p`
  color: #e0e7ef;
  margin-top: 1.2rem;
  font-size: 0.98rem;
  text-align: center;
`;

const LinkBtn = styled.button`
  background: none;
  border: none;
  color: #a5b4fc;
  font-weight: 600;
  cursor: pointer;
  text-decoration: underline;
  font-size: 1rem;
  margin-left: 4px;
  &:hover { color: #fff; }
`;

export default function LoginForm({ onSwitchToRegister, onClose }) {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    const result = await login(formData.email, formData.password);
    if (result.success) {
      onClose?.();
    } else {
      setError(result.error);
    }
    setIsLoading(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <FormContainer>
      <Title>Iniciar Sesión</Title>
      <StyledForm onSubmit={handleSubmit}>
        {error && <ErrorMsg>{error}</ErrorMsg>}
        <FormGroup>
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={isLoading}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="password">Contraseña</Label>
          <Input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            disabled={isLoading}
          />
        </FormGroup>
        <SubmitBtn type="submit" disabled={isLoading}>
          {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
        </SubmitBtn>
      </StyledForm>
      <SwitchText>
        ¿No tienes cuenta?
        <LinkBtn type="button" onClick={onSwitchToRegister}>
          Regístrate aquí
        </LinkBtn>
      </SwitchText>
    </FormContainer>
  );
}
