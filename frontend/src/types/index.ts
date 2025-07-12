export type Layout = "horizontal" | "vertical";
export type User = { id: string; email: string };
export type NoteFile = {
  id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
};
export type Note = NoteFile & {
  content: string;
  htmlContent: string;
  userId: string;
};
