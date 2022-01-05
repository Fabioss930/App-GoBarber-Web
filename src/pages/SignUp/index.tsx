import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import React, { useCallback, useRef } from "react";
import { FiArrowLeft, FiLock, FiMail, FiUser } from 'react-icons/fi';
import * as Yup from 'yup';
import logoimg from '../../assets/logo.svg';
import Button from "../../components/button";
import Input from "../../components/input";
import getValidationError from '../../utils/getValidationErrors';
import { Background, Container, Content } from './styles';

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(async (data: object) => {
    try {
      formRef.current?.setErrors({});
      const schema = Yup.object().shape({
        name: Yup.string().required('Nome obrigatório'),
        email: Yup.string().required('Email obriagatório').email('Digite um e-mail válido'),
        password: Yup.string().min(6, 'No minímo 6 digítos'),
      });
      await schema.validate(data, {
        abortEarly: false,
      });
    } catch (err) {
      const errors = getValidationError(err);
      formRef.current?.setErrors(errors);
   }
  },[])


 return (
    <Container>
      <Background/>
      <Content>
        <img src={logoimg} alt="GoBarber" />

        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Faça seu cadastro</h1>
          <Input icon={FiUser} name="name" placeholder="Nome" />
          <Input icon={FiMail} name="email" placeholder="E-mail" />
          <Input icon={FiLock} name="password" type="password" placeholder="Senha" />
          <Button type="submit">Cadastrar</Button>
        </Form>

        <a href="forgot">
          <FiArrowLeft/>
          Voltar para o login
        </a>

      </Content>

    </Container>
  )
}
export default SignUp;