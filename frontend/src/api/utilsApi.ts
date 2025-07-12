const API_URL = import.meta.env.VITE_API_URL;

export const convert = async (content: string) => {
  try {
    const response = await fetch(`${API_URL}/api/utils/convert`, {
      method: "POST",
      body: JSON.stringify({ content }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const data = await response.json();
    if (data.error) {
      console.error(data.error);
    }

    console.log(data.message);

    return data.htmlContent;
  } catch (error) {
    console.error(error);
  }
};

export const checkGrammar = async (content: string) => {
  try {
    const response = await fetch(`${API_URL}/api/utils/check-grammar`, {
      method: "POST",
      body: JSON.stringify({ content }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const data = await response.json();
    if (data.error) {
      console.error(data.error);
    }

    console.log(data.message);

    return data.issues;
  } catch (error) {
    console.error(error);
  }
};
