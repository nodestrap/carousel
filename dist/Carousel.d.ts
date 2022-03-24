import { default as React } from 'react';
import { ElementProps } from '@nodestrap/element';
import { ContentProps } from '@nodestrap/content';
export interface CarouselVariant {
    infiniteLoop?: boolean;
}
export declare const useCarouselVariant: (props: CarouselVariant) => {
    infiniteLoop: boolean;
};
export declare const usesCarouselItemsLayout: () => import("@cssfn/cssfn").Rule;
export declare const usesCarouselItemLayout: () => import("@cssfn/cssfn").Rule;
export declare const usesCarouselMediaLayout: () => import("@cssfn/cssfn").Rule;
export declare const usesNavBtnLayout: () => import("@cssfn/cssfn").Rule;
export declare const usesPrevBtnLayout: () => import("@cssfn/cssfn").Rule;
export declare const usesNextBtnLayout: () => import("@cssfn/cssfn").Rule;
export declare const usesNavLayout: () => import("@cssfn/cssfn").Rule;
export declare const usesCarouselLayout: () => import("@cssfn/cssfn").Rule;
export declare const usesCarouselVariants: () => import("@cssfn/cssfn").Rule;
export declare const useCarouselSheet: import("@cssfn/types").Factory<import("jss").Classes<"main">>;
export declare const cssProps: import("@cssfn/css-config").Refs<{
    paddingInline: number;
    paddingBlock: number;
    navMarginBlockEnd: import("@cssfn/css-types").Cust.Ref;
    navMarginBlockEndSm: import("@cssfn/css-types").Cust.Ref;
    navMarginBlockEndLg: import("@cssfn/css-types").Cust.Ref;
    navBtnBorderRadius: number;
}>, cssDecls: import("@cssfn/css-config").Decls<{
    paddingInline: number;
    paddingBlock: number;
    navMarginBlockEnd: import("@cssfn/css-types").Cust.Ref;
    navMarginBlockEndSm: import("@cssfn/css-types").Cust.Ref;
    navMarginBlockEndLg: import("@cssfn/css-types").Cust.Ref;
    navBtnBorderRadius: number;
}>, cssVals: import("@cssfn/css-config").Vals<{
    paddingInline: number;
    paddingBlock: number;
    navMarginBlockEnd: import("@cssfn/css-types").Cust.Ref;
    navMarginBlockEndSm: import("@cssfn/css-types").Cust.Ref;
    navMarginBlockEndLg: import("@cssfn/css-types").Cust.Ref;
    navBtnBorderRadius: number;
}>, cssConfig: import("@cssfn/css-config").CssConfigSettings;
export interface CarouselProps<TElement extends HTMLElement = HTMLElement> extends ContentProps<TElement>, CarouselVariant {
    scrollRef?: React.Ref<HTMLElement>;
    prevBtn?: React.ReactComponentElement<any, ElementProps>;
    nextBtn?: React.ReactComponentElement<any, ElementProps>;
    nav?: React.ReactComponentElement<any, ElementProps>;
    children?: React.ReactNode;
}
export declare function Carousel<TElement extends HTMLElement = HTMLElement>(props: CarouselProps<TElement>): JSX.Element;
export { Carousel as default };
