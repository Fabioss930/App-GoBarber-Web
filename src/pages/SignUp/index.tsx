import { FormHandles } from "@unform/core";
import { Form } from "@unform/web";
import React, { useCallback, useRef } from "react";
import { FiArrowLeft, FiLock, FiMail, FiUser } from "react-icons/fi";
import * as Yup from "yup";
import { Link, useHistory } from "react-router-dom";
import logoimg from "../../assets/logo.svg";
import Button from "../../components/button";
import Input from "../../components/input";
import api from "../../services/api";
import { useToast } from "../../hooks/toast";
import getValidationError from "../../utils/getValidationErrors";
import { Background, Container, Content, AnimationContainer } from "./styles";

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: SignUpFormData) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          name: Yup.string().required("Nome obrigatório"),
          email: Yup.string()
            .required("Email obriagatório")
            .email("Digite um e-mail válido"),
          password: Yup.string().min(6, "No minímo 6 digítos"),
        });
        await schema.validate(data, {
          abortEarly: false,
        });
        await api.post("/users", data);
        history.push("/");
        addToast({
          type: "sucess",
          title: "Cadastro realizado com sucesso!",
          description: "Você já pode realizar seu login!",
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationError(err);
          formRef.current?.setErrors(errors);

          return;
        }
        addToast({
          type: "error",
          title: "Erro no cadastro!",
          description: "Ocorreu um erro ao fazer o cadastro, tente novamente!",
        });
      }
    },
    [addToast, history]
  );

  return (
    <Container>
      <Background />
      <Content>
        <AnimationContainer>
          <img src={logoimg} alt="GoBarber" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Faça seu cadastro</h1>
            <Input icon={FiUser} name="name" placeholder="Nome" />
            <Input icon={FiMail} name="email" placeholder="E-mail" />
            <Input
              icon={FiLock}
              name="password"
              type="password"
              placeholder="Senha"
            />
            <Button type="submit">Cadastrar</Button>
          </Form>

          <Link to="/">
            <FiArrowLeft />
            Voltar para o login
          </Link>
        </AnimationContainer>
      </Content>
    </Container>
  );
};
export default SignUp;
