export type CreateNoteVariables = {
  title: string;
  text?: string;
}

export type EditNoteVariables = {
  id: string;
  title: string;
  text?: string;
}

export type Note = {
  id: number;
  title: string;
  text?: string;
  updatedAt: string;
}