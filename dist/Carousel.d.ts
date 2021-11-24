import { default as React } from 'react';
import type { Optional } from '@cssfn/types';
import { Tag, Role, SemanticTag, SemanticRole, ElementProps } from '@nodestrap/element';
import { ContentProps } from '@nodestrap/content';
export interface CarouselVariant {
    infiniteLoop?: boolean;
}
export declare const useCarouselVariant: (props: CarouselVariant) => {
    infiniteLoop: boolean;
};
export declare const usesCarouselItemsLayout: () => import("@cssfn/cssfn").StyleCollection;
export declare const usesCarouselItemLayout: () => import("@cssfn/cssfn").StyleCollection;
export declare const usesCarouselMediaLayout: () => import("@cssfn/cssfn").StyleCollection;
export declare const usesNavBtnLayout: () => import("@cssfn/cssfn").StyleCollection;
export declare const usesPrevBtnLayout: () => import("@cssfn/cssfn").StyleCollection;
export declare const usesNextBtnLayout: () => import("@cssfn/cssfn").StyleCollection;
export declare const usesNavLayout: () => import("@cssfn/cssfn").StyleCollection;
export declare const usesCarouselLayout: () => import("@cssfn/cssfn").StyleCollection;
export declare const usesCarouselVariants: () => import("@cssfn/cssfn").StyleCollection;
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
export interface CarouselItemProps<TElement extends HTMLElement = HTMLElement> extends ElementProps<TElement> {
}
export declare function CarouselItem<TElement extends HTMLElement = HTMLElement>(props: CarouselItemProps<TElement>): JSX.Element;
export type { CarouselItemProps as ItemProps };
export { CarouselItem as Item };
export interface CarouselProps<TElement extends HTMLElement = HTMLElement> extends ContentProps<TElement>, CarouselVariant {
    scrollRef?: React.Ref<HTMLElement>;
    itemsTag?: Tag;
    itemTag?: Tag;
    itemsRole?: Role;
    itemRole?: Role;
    itemsSemanticTag?: SemanticTag;
    itemSemanticTag?: SemanticTag;
    itemsSemanticRole?: SemanticRole;
    itemSemanticRole?: SemanticRole;
    itemsMainClass?: Optional<string>;
    itemsClasses?: Optional<string>[];
    itemsVariantClasses?: Optional<string>[];
    itemsStateClasses?: Optional<string>[];
    itemMainClass?: Optional<string>;
    itemClasses?: Optional<string>[];
    itemVariantClasses?: Optional<string>[];
    itemStateClasses?: Optional<string>[];
    children?: React.ReactNode;
    prevBtn?: React.ReactChild | boolean | null;
    nextBtn?: React.ReactChild | boolean | null;
    nav?: React.ReactChild | boolean | null;
}
export declare function Carousel<TElement extends HTMLElement = HTMLElement>(props: CarouselProps<TElement>): JSX.Element;
export { Carousel as default };
