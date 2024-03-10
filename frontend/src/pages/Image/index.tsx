import React, { useState } from "react";
import { toast } from "react-hot-toast";
import styles from "./Image.module.scss";
import { Button, Empty, Input, Loader, SidebarHeader } from "../../components";
import axios from "axios";

const Image: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [size, setSize] = useState<string>("256x256");
  const [count, setCount] = useState<number>(1);
  const [images, setImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // const navigate = useNavigate();

  const handleInputChange = (value: string) => {
    setInputValue(value);
  };

  const handleSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSize(event.target.value);
  };

  const handleCountChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCount(parseInt(event.target.value));
  };

  const handleGenerate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Button clicked!");
    console.log(import.meta.env.VITE_API_URL);
    setIsLoading(true);
    // setVideo("");
    // if (inputValue) {
    //     return
    // }
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL2}/image`,
        { message: inputValue, size: size, count: count }
      );

      setImages(response.data.result.map((item: any) => item.url));
      console.log(response);
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

  console.log(images);
  return (
    <div className={styles.container}>
      <SidebarHeader
        title="Image generate"
        subtitle="Efficient Automation for Dynamic Image Generation"
      />
      <form onSubmit={handleGenerate}>
        <div className={styles.form}>
          <Input value={inputValue} onChange={handleInputChange} />
          <div className={styles.select}>
            <select name="size" value={size} onChange={handleSizeChange}>
              <option value="256x256">256 x 256</option>
              <option value="512x512">512 x 512</option>
            </select>
          </div>
          <div className={styles.selectCount}>
            <select
              name="count"
              value={count.toString()}
              onChange={handleCountChange}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
            </select>
          </div>
          <Button type="submit" label="Generate" />
        </div>
      </form>

      <div className={styles.imageContainer}>
        {isLoading && (
          <div className={styles.loading}>
            <Loader />
          </div>
        )}
        {images.length === 0 && !isLoading && (
          <Empty label="No conversation started." />
        )}
        <div className={styles.showImages}>
          {images.length > 0 &&
            images.map((url) => (
              <div className={styles.imageSection}>
                <img key={url} src={url} alt="" />
                <button
                  onClick={() => window.open(url)}
                  className={styles.imageDownload}
                >
                  Download
                </button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Image;
