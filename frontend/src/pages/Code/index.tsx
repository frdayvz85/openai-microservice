import React, { useState } from "react";
import styles from "./Code.module.scss";
import axios from "axios";
import { Button, Empty, Input, Loading, SidebarHeader } from "../../components";
// import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import ReactMarkdown from "react-markdown";
import { BiSolidUserCircle } from "react-icons/bi";
import { FaRobot } from "react-icons/fa";

interface ChatCompletionRequestMessage {
  role: "user" | "assistant" | "system";
  content: string;
  name?: string;
}

const Code: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // const navigate = useNavigate();

  const handleInputChange = (value: string) => {
    setInputValue(value);
  };

  const handleGenerate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Button clicked!");
    console.log(import.meta.env.VITE_API_URL);
    setIsLoading(true);
    try {
      const userMessage: ChatCompletionRequestMessage = {
        role: "user",
        content: inputValue,
      };
      const newMessages = [...messages, userMessage];

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/code`,
        { messages: newMessages }
      );

      console.log({ response });
      setMessages((current) => [...current, userMessage, response.data.result]);

      setInputValue("");
      setIsLoading(false);
    } catch (error: any) {
      if (error?.response?.status === 403) {
        toast.error(
          "Sorry, you do not have permission to access the requested resource. "
        );
      } else if (error?.response?.status === 429) {
        toast.error(error?.response?.data);
      } else {
        toast.error("Something went wrong.");
      }
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  console.log(messages);
  return (
    <div className={styles.container}>
      <SidebarHeader
        title="Code generate"
        subtitle="Efficient Automation for Dynamic Code Generation"
      />
      <form onSubmit={handleGenerate}>
        <div className={styles.form}>
          <Input value={inputValue} onChange={handleInputChange} />
          <Button type="submit" label="Generate" />
        </div>
      </form>

      <div className={styles.codeContainer}>
        {isLoading && (
          <div className={styles.loading}>
            <Loading />
          </div>
        )}
        {messages.length === 0 && !isLoading && (
          <Empty label="No conversation started." />
        )}
        <div className={styles.message}>
          {messages.map((message) => (
            <div
              key={message.content}
              className={`${styles.messageContainer} ${
                message.role === "user"
                  ? styles.userMessageContainer
                  : styles.botMessageContainer
              }`}
            >
              {message.role === "user" ? (
                <BiSolidUserCircle className={styles.user} />
              ) : (
                <FaRobot className={styles.bot} />
              )}
              <ReactMarkdown
                components={{
                  pre: ({ node, ...props }) => (
                    <div className={styles.preMessage}>
                      <pre {...props} />
                    </div>
                  ),
                  code: ({ node, ...props }) => (
                    <code className={styles.codeMessage} {...props} />
                  ),
                }}
                className={styles.messageContent}
              >
                {message.content || ""}
              </ReactMarkdown>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Code;
