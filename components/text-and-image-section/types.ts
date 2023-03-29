export interface TextAndImageSectionInterface {
  sectionBody: {
    __typename: string;
    json: {
      content: {
        content: {
          data: any;
          marks: [];
          nodeType: string;
          value: string;
        }[];
      }[];
      data: any;
      nodeType: string;
    };
  };
  sectionImageOrGif: { __typename: string; url: string };
  sectionTitle: string;
  __typename: string;
}
