export interface BragBarInterface {
  data: {
    assetsCollection: {
      __typename: string;
      items: {
        asset: { __typename: string; url: string };
        url: string;
        __typename: string;
      }[];
    };
    pagePosition: number;
    __typename: string;
  };
}
