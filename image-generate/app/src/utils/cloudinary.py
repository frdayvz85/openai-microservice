
# Set your Cloudinary credentials
# ==============================
import json
import cloudinary.api
import cloudinary.uploader
import cloudinary
import os
from dotenv import load_dotenv
load_dotenv()

# Import the Cloudinary libraries
# ==============================

# Import to format the JSON responses
# ==============================

# Set configuration parameter: return "https" URLs by setting secure=True
# ==============================
config = cloudinary.config(
    cloud_name=os.getenv("CLOUD_NAME"),
    api_key=os.getenv("API_KEY"),
    api_secret=os.getenv("API_SECRET")
)

# Log the configuration
# ==============================
print("Set up and configure the SDK: cloud_name: ", config.cloud_name)
print("Set up and configure the SDK: api_key: ", config.api_key)
print("Set up and configure the SDK: api_secret: ", config.api_secret)


def upload_image(url: str, folder: str):
    try:
        # Upload image to Cloudinary
        upload_result = cloudinary.uploader.upload(url, folder=folder)
        # Return the URL of the uploaded image
        print("upload_result: ", upload_result)
        return upload_result['secure_url']
    except Exception as e:
        print("An error occurred:", e)
        return None
