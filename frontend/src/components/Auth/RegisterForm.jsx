import React, { useState } from "react";
import styled from "styled-components";
import { useAuth } from "../../context/AuthContext";

const Container = styled.div`
  background: rgba(30, 30, 60, 0.95);
  border-radius: 18px;
  box-shadow: 0 8px 32px rgba(40, 40, 90, 0.25);
  padding: 38px 32px 32px 32px;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 10;
`;

const Title = styled.h2`
  color: #fff;
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 18px;
  letter-spacing: 1px;
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Label = styled.label`
  color: #bfc8e6;
  font-size: 1rem;
  font-weight: 500;
`;

const Input = styled.input`
  padding: 12px 16px;
  border-radius: 10px;
  border: 2px solid #3a3a5a;
  background: rgba(255, 255, 255, 0.07);
  color: #fff;
  font-size: 1rem;
  transition: border 0.2s;
  &:focus {
    border-color: #7f5fff;
    outline: none;
    background: rgba(127, 95, 255, 0.08);
  }
`;

const ErrorMessage = styled.div`
  color: #ff5f5f;
  background: rgba(255, 95, 95, 0.08);
  border-radius: 8px;
  padding: 8px 12px;
  font-size: 0.98rem;
  margin-bottom: 8px;
  text-align: center;
`;

const SubmitButton = styled.button`
  background: linear-gradient(90deg, #7f5fff 0%, #3cbbff 100%);
  color: #fff;
  font-weight: 600;
  font-size: 1.1rem;
  border: none;
  border-radius: 10px;
  padding: 12px 0;
  margin-top: 10px;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(127, 95, 255, 0.12);
  transition: background 0.2s, transform 0.2s;
  &:hover {
    background: linear-gradient(90deg, #3cbbff 0%, #7f5fff 100%);
    transform: translateY(-2px) scale(1.03);
  }
`;

const SwitchText = styled.p`
  color: #bfc8e6;
  font-size: 1rem;
  margin-top: 18px;
  text-align: center;
`;

const LinkButton = styled.button`
  background: none;
  border: none;
  color: #7f5fff;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  text-decoration: underline;
  margin-left: 6px;
  transition: color 0.2s;
  &:hover {
    color: #3cbbff;
  }
`;

export default function RegisterForm({ onSwitchToLogin, onClose }) {
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Las contraseñas no coinciden");
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      setIsLoading(false);
      return;
    }

    const result = await register(
      formData.email,
      formData.password,
      formData.name
    );

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
    <Container>
      <Title>Crear Cuenta</Title>
      <Form onSubmit={handleSubmit}>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <FormGroup>
          <Label htmlFor="name">Nombre</Label>
          <Input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            disabled={isLoading}
          />
        </FormGroup>
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
            minLength="6"
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
          <Input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            disabled={isLoading}
            minLength="6"
          />
        </FormGroup>
        <SubmitButton type="submit" disabled={isLoading}>
          {isLoading ? "Creando cuenta..." : "Crear Cuenta"}
        </SubmitButton>
      </Form>
      <SwitchText>
        ¿Ya tienes cuenta?
        <LinkButton type="button" onClick={onSwitchToLogin}>
          Inicia sesión aquí
        </LinkButton>
      </SwitchText>
    </Container>
  );
}
