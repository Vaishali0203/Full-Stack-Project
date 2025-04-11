const axios = require("axios");

const preview = async (crystal, userId) => {
  const { url } = crystal;

  try {
    const { data } = await axios.get(
      `https://api.microlink.io/?url=${encodeURIComponent(url)}`
    );
    const meta = data.data;

    return {
      ...crystal,
      addedBy: userId,
      meta: {
        title: meta.title || "No title",
        description: meta.description || "No description available",
        image: meta.image?.url || null,
        url: meta.url || url,
      },
    };
  } catch (err) {
    console.log(err.message);
    return {
      ...crystal,
      addedBy: userId,
      meta: {
        title: "Failed to fetch preview",
        description: err.message,
        url,
      },
    };
  }
};

module.exports = { preview };
