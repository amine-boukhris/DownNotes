import { fetchWithRefreshTry } from "./authApi";

const API_URL = import.meta.env.VITE_API_URL;

export async function fetchNotes() {
  try {
    const response = await fetchWithRefreshTry(`${API_URL}/api/notes`, {
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const data = await response.json();
    if (data.error) {
      console.error(data.error);
    }

    console.log(data.message);

    return data.notes;
  } catch (error) {
    console.error(error);
  }
}

export async function fetchNote(noteId: string) {
  try {
    const response = await fetchWithRefreshTry(`${API_URL}/api/notes/${noteId}`, {
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const data = await response.json();
    if (data.error) {
      console.error(data.error);
    }

    console.log(data.message);

    return data.note;
  } catch (error) {
    console.error(error);
  }
}

export async function createNote(title: string, content: string) {
  try {
    const response = await fetchWithRefreshTry(`${API_URL}/api/notes`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({ title, content }),
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

    return data.note;
  } catch (error) {
    console.error(error);
  }
}

export async function updateNote(noteId: string, title: string, content: string) {
  try {
    const response = await fetchWithRefreshTry(`${API_URL}/api/notes/${noteId}`, {
      method: "PUT",
      credentials: "include",
      body: JSON.stringify({ title, content }),
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

    return data.note;
  } catch (error) {
    console.error(error);
  }
}

export async function deleteNote(noteId: string) {
  try {
    const response = await fetchWithRefreshTry(`${API_URL}/api/notes/${noteId}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const data = await response.json();
    if (data.error) {
      console.error(data.error);
    }

    console.log(data.message);
  } catch (error) {
    console.error(error);
  }
}

export async function checkNoteGrammar(noteId: string) {
  try {
    const response = await fetchWithRefreshTry(`${API_URL}/api/notes/${noteId}`, {
      credentials: "include",
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
}
