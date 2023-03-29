export interface IAction {
  type: string;
  payload: any;
}

export interface IShopifyData {
  options: any[];
  title: string;
  variants: any[];
  scentOptions?: any[];
  sizeOptions?: any[];
  images?: any[];
  description?: string;
  descriptionHtml?: string;
}
export interface IProduct {
  productContentData: any;
  productShopifyData?: IShopifyData;
  upsellShopifyData?: IShopifyData;
  setProductData?: (data: IProduct) => void;
  logoUrl?: string;
  inCartUpsell?: any;
}

export interface ICartItem {
  imageSrc: string;
  variantId: string;
  productName: string;
  price: { amount: string; currencyCode: string };
  quantity: number;
  sku: string;
  scentVariant?: string;
  sizeVariant?: string;
  available?: boolean;
}
export interface ICart {
  cartItems: ICartItem[];
  isOpenCartSidebar: boolean;
  isOpenCartCTA?: boolean;
  currentCartItem: ICartItem;
  onSetCurrentCurtItem?: (cartItem: ICartItem) => void;
  openCartSidebar?: (isOpen: boolean) => void;
  onSetIsOpenCartCTA?: (isOpen: boolean) => void;
  checkout?: (cartItem?: ICartItem) => void;
  addToCart?: (cartItem: ICartItem) => void;
  updateCart?: (oldVariantId: string, cartItem: ICartItem) => void;
  removeCartItem?: (cartItem: ICartItem) => void;
  onSetAnnouncement?: (data: Announcement) => void;
  announcement?: Announcement;
  alsoLikeProducts?: any[];
  onSetAlsoLikeProducts?: (products: any[]) => void;
}

export interface Announcement {
  title: string;
  progress: number;
}
export interface ICollectionItem {
  collectionId: string;
  collectionName: string;
  imageSrc: string;
  price: { amount: number; currencyCode: string };
}

export interface ICheckout {
  id: string;
  webUrl: string;
}

export type IPDPSecitons =
  | 'product'
  | 'youMayAlsoLikeSection'
  | 'textImageSection'
  | 'reviewSection'
  | 'emailSignupSection'
  | 'influencerReview'
  | 'carouselSection'
  | 'bragBar'
  | 'faqSection'
  | 'textOverImageSection';
