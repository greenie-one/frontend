type DocDepotContextType = {
  documentForm: UseFormReturnType<documentFormType>;
  deleteDocument: (id: string) => void;
  moveDocument: (id: string, type: string) => void;
  experienceDocuments: IDocumentType[];
  educationDocuments: IDocumentType[];
  otherDocuments: IDocumentType[];
  setForceRender: React.Dispatch<React.SetStateAction<boolean>>;
  forceRender: boolean;
};
