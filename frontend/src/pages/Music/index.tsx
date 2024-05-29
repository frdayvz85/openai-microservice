import React, { useState } from "react";
import { toast } from "react-hot-toast";
import styles from "./Music.module.scss";
import { Button, Empty, Input, Loading, SidebarHeader } from "../../components";
import axios from "axios";

const Music: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [music, setMusic] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleInputChange = (value: string) => {
    setInputValue(value);
  };

  const handleGenerate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Button clicked!");
    console.log(import.meta.env.VITE_API_URL);
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/music`,
        { message: inputValue }
      );

      console.log({ response });
      setInputValue("");
      setIsLoading(false);
      setMusic(response?.data?.result);
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

  return (
    <div className={styles.container}>
      <SidebarHeader
        title="Music generate"
        subtitle="Efficient Automation for Dynamic Music Generation"
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
        {!music && !isLoading && <Empty label="No conversation started." />}

        {music && (
          <div className={styles.music}>
            <audio controls>
              <source src={music} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </div>
        )}
      </div>
    </div>
  );
};

export default Music;
