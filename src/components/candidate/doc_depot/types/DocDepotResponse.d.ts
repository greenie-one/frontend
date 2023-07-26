type UploadDocumentResponseType = {
  message: string;
  url: string;
};

type DeleteDocumentResponseType = {
  ok: boolean;
  value: {
    message: string;
  };
};

type DocumentResponseType = {
  _id: string;
  name: string;
  type: string;
  privateUrl: string;
};

type UpdateDocumentResponseType = {
  success: boolean;
  message: string;
};
