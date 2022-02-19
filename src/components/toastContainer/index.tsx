import React from "react";
import { useTransition } from "react-spring";

import { Container } from "./style";
import { ToastMessage } from "../../hooks/toast";
import Toast from "./Toast";

interface ToastContainerProps {
  messages: ToastMessage[];
}

const ToastContainer: React.FC<ToastContainerProps> = ({ messages }) => {
  // const id = messages.map((item) => item.id);
  // Fabio mane
  // Teste
  const messagesWithTransitions = useTransition(
    messages,

    {
      keys: (item) => item.id,
      from: { right: "-120%" },
      enter: { right: "0%" },
      leave: { right: "-120%" },
    }
  );

  return (
    <Container>
      {messagesWithTransitions((item, style, key) => (
        <Toast key={key} style={style} message={item} />
      ))}
    </Container>
  );
};

export default ToastContainer;
