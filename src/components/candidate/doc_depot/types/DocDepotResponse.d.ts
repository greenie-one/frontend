type uploadDocumentResponseType = {
  message: string;
  url: string;
};

type deleteDocumentResponseType = {
  ok: boolean;
  value: {
    message: string;
  };
};

interface IDocumentType {
  _id: string;
  name: string;
  type: string;
}

type updateDocumentResponseType = {
  success: boolean;
  message: string;
};
