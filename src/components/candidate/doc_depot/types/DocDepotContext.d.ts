type DocDepotContextType = {
  documentForm: UseFormReturnType<documentFormType>;
  deleteDocument: (id: string) => void;
  moveDocument: (id: string, type: string) => void;
  experienceDocuments: DocumentResponseType[];
  educationDocuments: DocumentResponseType[];
  otherDocuments: DocumentResponseType[];
};
