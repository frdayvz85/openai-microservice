import React, { useState } from "react";
import styles from "./Video.module.scss";
import axios from "axios";
import { Button, Empty, Input, Loader, SidebarHeader } from "../../components";
// import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const Video: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [video, setVideo] = useState<string>("");
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
    setVideo("");
    // if (inputValue) {
    //     return
    // }
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL1}/video`,
        { prompt: inputValue }
      );

      setVideo(response.data.result[0]);
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
      console.log(error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  // console.log(messages)
  return (
    <div className={styles.container}>
      <SidebarHeader
        title="Video generate"
        subtitle="Efficient Automation for Dynamic Video Generation"
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
            <Loader />
          </div>
        )}
        {!video && !isLoading && <Empty label="No conversation started." />}
        {video && (
          <video controls className={styles.videoContent}>
            <source src={video} />
          </video>
        )}
      </div>
    </div>
  );
};

export default Video;
