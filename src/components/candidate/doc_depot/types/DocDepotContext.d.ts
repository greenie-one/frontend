type DocDepotContextType = {
  documentForm: UseFormReturnType<documentFormType>;
  deleteDocument: (id: string) => void;
  moveDocument: (id: string, type: string) => void;
  docDepoDocuments: DocumentResponseType[];
  docDepotActivePage: number;
  setDocDepotActivePage: React.Dispatch<React.SetStateAction<number>>;
};
