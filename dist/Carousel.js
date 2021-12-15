// react:
import { default as React, useRef, useEffect, } from 'react'; // base technology of our nodestrap components
import { 
// compositions:
composition, mainComposition, imports, 
// layouts:
layout, children, 
// rules:
variants, rule, } from '@cssfn/cssfn'; // cssfn core
import { 
// hooks:
createUseSheet, } from '@cssfn/react-cssfn'; // cssfn for react
import { createCssConfig, 
// utilities:
usesGeneralProps, usesPrefixedProps, usesSuffixedProps, overwriteProps, } from '@cssfn/css-config'; // Stores & retrieves configuration using *css custom properties* (css variables)
// nodestrap utilities:
import { stripoutList, stripoutScrollbar, stripoutImage, } from '@nodestrap/stripouts';
import { 
// utilities:
isTypeOf, setRef, } from '@nodestrap/utilities';
// nodestrap components:
import { 
// hooks:
useTestSemantic, Element, } from '@nodestrap/element';
import { 
// hooks:
usesSizeVariant, usesPadding, expandPadding, } from '@nodestrap/basic';
import { 
// styles:
usesContentLayout, usesContentVariants, 
// configs:
cssProps as ccssProps, Content, } from '@nodestrap/content';
import { ButtonIcon, } from '@nodestrap/button-icon';
import { 
// utilities:
Dimension, 
// react components:
NavscrollItem, Navscroll, } from '@nodestrap/navscroll';
export const useCarouselVariant = (props) => {
    return {
        infiniteLoop: props.infiniteLoop ?? false,
    };
};
// styles:
const itemsElm = '.items'; // `.items` is the slideList
const dummyElm = '.dummy';
// const itemElm    = ['li', '*'];  // poor specificity // any children inside the slideList are slideItem
const itemElm = ':nth-child(n)'; // better specificity // any children inside the slideList are slideItem
const mediaElm = ['figure', 'img', 'svg', 'video', '.media'];
const prevBtnElm = '.prevBtn';
const nextBtnElm = '.nextBtn';
const navElm = '.nav';
export const usesCarouselItemsLayout = () => {
    // dependencies:
    // spacings:
    const [, paddingRefs] = usesPadding();
    return composition([
        imports([
            // resets:
            stripoutList(),
            stripoutScrollbar(), // hides browser's scrollbar
        ]),
        layout({
            // layouts:
            gridArea: '1 / 1 / -1 / -1',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'start',
            alignItems: 'stretch',
            flexWrap: 'nowrap',
            // positions:
            position: 'relative',
            // spacings:
            // cancel-out parent's padding with negative margin:
            marginInline: `calc(0px - ${paddingRefs.paddingInline})`,
            marginBlock: `calc(0px - ${paddingRefs.paddingBlock})`,
            // scrolls:
            overflowX: 'scroll',
            scrollSnapType: [['inline', 'mandatory']],
            scrollBehavior: 'smooth',
            '-webkit-overflow-scrolling': 'touch',
            // children:
            ...children(itemElm, [
                imports([
                    usesCarouselItemLayout(),
                ]),
            ]),
            // customize:
            ...usesGeneralProps(usesPrefixedProps(cssProps, 'items')), // apply general cssProps starting with items***
        }),
    ]);
};
export const usesCarouselItemLayout = () => {
    return composition([
        layout({
            // layouts:
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'nowrap',
            // sizes:
            flex: [[0, 0, '100%']],
            // (important) force the media follow the <li> width, so it doesn't break the flex width:
            boxSizing: 'border-box',
            inlineSize: '100%',
            // scrolls:
            scrollSnapAlign: 'center',
            scrollSnapStop: 'normal',
            // children:
            ...children(mediaElm, [
                imports([
                    usesCarouselMediaLayout(),
                ]),
            ]),
            // customize:
            ...usesGeneralProps(usesPrefixedProps(cssProps, 'item')), // apply general cssProps starting with item***
        }),
    ]);
};
export const usesCarouselMediaLayout = () => {
    return composition([
        imports([
            stripoutImage(), // removes browser's default styling on image
        ]),
        layout({
            // customize:
            ...usesGeneralProps(usesPrefixedProps(cssProps, 'media')), // apply general cssProps starting with media***
        }),
        variants([
            rule(':first-child:last-child', [
                layout({
                    // layouts:
                    display: 'block', // fills the entire parent's width
                }),
            ]),
        ]),
    ]);
};
export const usesNavBtnLayout = () => {
    return composition([
        layout({
            // customize:
            ...usesGeneralProps(usesPrefixedProps(cssProps, 'navBtn')), // apply general cssProps starting with navBtn***
        }),
    ]);
};
export const usesPrevBtnLayout = () => {
    return composition([
        layout({
            // layouts:
            gridArea: 'prevBtn',
            // customize:
            ...usesGeneralProps(usesPrefixedProps(cssProps, 'prevBtn')), // apply general cssProps starting with prevBtn***
        }),
    ]);
};
export const usesNextBtnLayout = () => {
    return composition([
        layout({
            // layouts:
            gridArea: 'nextBtn',
            // customize:
            ...usesGeneralProps(usesPrefixedProps(cssProps, 'nextBtn')), // apply general cssProps starting with nextBtn***
        }),
    ]);
};
export const usesNavLayout = () => {
    return composition([
        layout({
            // layouts:
            gridArea: 'nav',
            // sizes:
            justifySelf: 'center',
            // customize:
            ...usesGeneralProps(usesPrefixedProps(cssProps, 'nav')), // apply general cssProps starting with nav***
        }),
    ]);
};
export const usesCarouselLayout = () => {
    return composition([
        imports([
            // layouts:
            usesContentLayout(),
        ]),
        layout({
            // layouts:
            display: 'grid',
            // explicit areas:
            gridTemplateRows: [[
                    '1fr',
                    'min-content',
                ]],
            gridTemplateColumns: [['15%', '1fr', '15%']],
            gridTemplateAreas: [[
                    '"prevBtn main nextBtn"',
                    '"prevBtn nav  nextBtn"',
                ]],
            // child default sizes:
            justifyItems: 'stretch',
            alignItems: 'stretch',
            // borders:
            overflow: 'hidden',
            // children:
            ...children(itemsElm, [
                imports([
                    usesCarouselItemsLayout(),
                ]),
            ]),
            ...children(dummyElm, [
                layout({
                    // appearances:
                    // visibility : 'hidden', // causing onScroll doesn't work in Firefox
                    opacity: 0,
                    zIndex: -1,
                }),
            ]),
            ...children([prevBtnElm, nextBtnElm], [
                imports([
                    usesNavBtnLayout(),
                ]),
            ]),
            ...children(prevBtnElm, [
                imports([
                    usesPrevBtnLayout(),
                ]),
            ]),
            ...children(nextBtnElm, [
                imports([
                    usesNextBtnLayout(),
                ]),
            ]),
            ...children(navElm, [
                imports([
                    usesNavLayout(),
                ]),
            ]),
            // customize:
            ...usesGeneralProps(cssProps),
            // spacings:
            ...expandPadding(cssProps), // expand padding css vars
        }),
    ]);
};
export const usesCarouselVariants = () => {
    // dependencies:
    // layouts:
    const [sizes] = usesSizeVariant((sizeName) => composition([
        layout({
            // overwrites propName = propName{SizeName}:
            ...overwriteProps(cssDecls, usesSuffixedProps(cssProps, sizeName)),
        }),
    ]));
    return composition([
        imports([
            // variants:
            usesContentVariants(),
            // layouts:
            sizes(),
        ]),
    ]);
};
export const useCarouselSheet = createUseSheet(() => [
    mainComposition([
        imports([
            // layouts:
            usesCarouselLayout(),
            // variants:
            usesCarouselVariants(),
        ]),
    ]),
], /*sheetId :*/ 'v35mas3qt6'); // an unique salt for SSR support, ensures the server-side & client-side have the same generated class names
// configs:
export const [cssProps, cssDecls, cssVals, cssConfig] = createCssConfig(() => {
    return {
        //#region spacings
        paddingInline: 0,
        paddingBlock: 0,
        navMarginBlockEnd: ccssProps.paddingBlock,
        navMarginBlockEndSm: ccssProps.paddingBlockSm,
        navMarginBlockEndLg: ccssProps.paddingBlockLg,
        //#endregion spacings
        //#region borders
        navBtnBorderRadius: 0,
        //#endregion borders
    };
}, { prefix: 'crsl' });
export function CarouselItem(props) {
    // jsx:
    return (React.createElement(Element, { ...props, 
        // classes:
        mainClass: props.mainClass ?? '' }));
}
export { CarouselItem as Item };
export function Carousel(props) {
    // styles:
    const sheet = useCarouselSheet();
    // variants:
    const carouselVariant = useCarouselVariant(props);
    const infiniteLoop = carouselVariant.infiniteLoop;
    // rest props:
    const { 
    // essentials:
    elmRef, scrollRef, 
    // semantics:
    itemsTag, itemTag, itemsRole, itemRole, itemsSemanticTag, itemSemanticTag, itemsSemanticRole, itemSemanticRole, 
    // classes:
    itemsMainClass, itemsClasses, itemsVariantClasses, itemsStateClasses, itemMainClass, itemClasses, itemVariantClasses, itemStateClasses, 
    // children:
    children, prevBtn, nextBtn, nav, ...restProps } = props;
    // fn props:
    const itemsTotal = React.Children.count(children);
    const listTag = ['ul', 'ol'];
    const listRole = 'list';
    const itemsSemanticTagFn = itemsSemanticTag ?? listTag;
    const itemsSemanticRoleFn = itemsSemanticRole ?? listRole;
    const [, , isList, isSemanticList] = useTestSemantic({ tag: itemsTag, role: itemsRole, semanticTag: itemsSemanticTagFn, semanticRole: itemsSemanticRoleFn }, { semanticTag: listTag, semanticRole: listRole });
    const itemSemanticTagFn = itemSemanticTag ?? (isSemanticList ? 'li' : [null]);
    const itemSemanticRoleFn = itemSemanticRole ?? (isList ? 'listitem' : [null]);
    // dom effects:
    const listRef = useRef(null);
    const listDummyRef = useRef(null);
    const dummyDiff = useRef(0);
    const setDummyDiff = (diff) => {
        if (!itemsTotal)
            return;
        dummyDiff.current = (((dummyDiff.current - diff) % itemsTotal) + itemsTotal) % itemsTotal;
    };
    // sync dummyElm scrolling position to itemsElm scrolling position, once at startup:
    useEffect(() => {
        if (!infiniteLoop)
            return; // only for infiniteLoop mode
        const dummyElm = listDummyRef.current;
        if (!dummyElm)
            return; // dummyElm must be exist to sync
        const itemsElm = listRef.current;
        if (!itemsElm)
            return; // itemsElm must be exist for syncing
        // fn props:
        const itemsCurrent = itemsElm.scrollLeft;
        const ratio = (dummyElm.scrollWidth - dummyElm.clientWidth) / (itemsElm.scrollWidth - itemsElm.clientWidth);
        const dummyCurrent = itemsCurrent * ratio;
        // setups:
        dummyElm.scrollTo({
            left: Math.round(Math.min(Math.max(dummyCurrent, 0), (dummyElm.scrollWidth - dummyElm.clientWidth))),
            behavior: 'instant' // no scrolling animation during sync
        });
    }, [infiniteLoop]); // (re)run the setups on every time the infiniteLoop mode changes
    // sync itemsElm scrolling position to dummyElm scrolling position, every `scrollBy()`/`scrollTo()` called:
    useEffect(() => {
        if (!infiniteLoop)
            return; // only for infiniteLoop mode
        const dummyElm = listDummyRef.current;
        if (!dummyElm)
            return; // dummyElm must be exist for syncing
        // functions:
        const calculateScrollItems = (dummyElm, itemsElm, optionsOrX, relative) => {
            const dummyCurrent = relative ? dummyElm.scrollLeft : 0;
            const dummyLeft = (typeof (optionsOrX) !== 'number') ? (optionsOrX?.left ?? 0) : optionsOrX;
            const dummyBehavior = ((typeof (optionsOrX) !== 'number') && optionsOrX?.behavior) || 'smooth';
            const ratio = (itemsElm.scrollWidth - itemsElm.clientWidth) / (dummyElm.scrollWidth - dummyElm.clientWidth);
            const itemsCurrent = dummyCurrent * ratio;
            const itemsLeft = dummyLeft * ratio;
            const itemsDiff = (dummyDiff.current * itemsElm.clientWidth); // converts logical diff to physical diff
            const itemsLeftLoop = itemsCurrent + itemsLeft + itemsDiff; // current scroll + scroll by + diff
            const itemsLeftAbs = itemsLeftLoop % itemsElm.scrollWidth; // wrap overflowed left
            return {
                left: Math.round(Math.min(Math.max(itemsLeftAbs, 0), (itemsElm.scrollWidth - itemsElm.clientWidth))
                    -
                        (relative ? itemsElm.scrollLeft : 0)),
                behavior: dummyBehavior,
            };
        };
        // setups:
        const oriScrollBy = dummyElm.scrollBy;
        dummyElm.scrollBy = function (optionsOrX, y) {
            const itemsElm = listRef.current;
            if (itemsElm) { // itemsElm must be exist to sync
                itemsElm.scrollBy(calculateScrollItems(this, itemsElm, optionsOrX, true));
            } // if
            // call the original:
            if (typeof (optionsOrX) !== 'number') {
                oriScrollBy.call(this, optionsOrX);
            }
            else {
                oriScrollBy.call(this, optionsOrX, y);
            } // if
        };
        const oriScrollTo = dummyElm.scrollTo;
        dummyElm.scrollTo = function (optionsOrX, y) {
            const itemsElm = listRef.current;
            if (itemsElm) { // itemsElm must be exist to sync
                itemsElm.scrollTo(calculateScrollItems(this, itemsElm, optionsOrX, false));
            } // if
            // call the original:
            if (typeof (optionsOrX) !== 'number') {
                oriScrollTo.call(this, optionsOrX);
            }
            else {
                oriScrollTo.call(this, optionsOrX, y);
            } // if
        };
        // cleanups:
        return () => {
            // restore the hacked to original:
            dummyElm.scrollBy = oriScrollBy;
            dummyElm.scrollTo = oriScrollTo;
        };
    }, [infiniteLoop]); // (re)run the setups & cleanups on every time the infiniteLoop mode changes
    // functions:
    const normalizeScrollItems = (itemsElm) => {
        if (!itemsTotal)
            return; // empty items => nothing to do
        const diff = dummyDiff.current;
        if (!diff)
            return; // no difference => nothing to do
        // remember the current scrollPos before modifying:
        const scrollPos = itemsElm.scrollLeft;
        // decide which side to be moved:
        const modifLeft = diff <= (itemsTotal / 2);
        if (modifLeft) { // modify the left side
            Array.from(itemsElm.childNodes).slice(0, diff) // take nth elements from the left
                .forEach((item) => itemsElm.append(item)); // insert the items at the end
        }
        else { // modify the right side
            Array.from(itemsElm.childNodes).slice(-(itemsTotal - diff)) // take nth elements from the right
                .reverse() // inserting at the beginning causes the inserted items to be reversed, so we're re-reversing them to keep the order
                .forEach((item) => itemsElm.insertBefore(item, itemsElm.firstElementChild)); // insert the items at the beginning
        } // if
        // set the scrollPos to the correct image:
        const style = getComputedStyle(itemsElm);
        const step = itemsElm.clientWidth - (Number.parseInt(style.paddingLeft) || 0) - (Number.parseInt(style.paddingRight) || 0);
        const move = modifLeft ? (itemsTotal - diff) : (-diff);
        itemsElm.scrollTo({
            left: scrollPos + (step * move),
            behavior: 'instant' // no scrolling animation during sync
        });
        // reset the diff of itemsElm & dummyElm:
        dummyDiff.current = 0;
    };
    const scrollBy = (itemsElm, nextSlide) => {
        const parent = itemsElm;
        // calculate the limit of the allowed scrolling distances:
        const [minLeft, maxLeft, minTop, maxTop] = [
            -parent.scrollLeft,
            (parent.scrollWidth - parent.clientWidth) - parent.scrollLeft,
            -parent.scrollTop,
            (parent.scrollHeight - parent.clientHeight) - parent.scrollTop,
        ];
        // calculate the scrolling distance:
        const style = getComputedStyle(parent);
        const [scrollLeft, scrollRight] = [
            Math.min(Math.max((itemsElm.clientWidth - (Number.parseInt(style.paddingLeft) || 0) - (Number.parseInt(style.paddingRight) || 0)) * (nextSlide ? 1 : -1), minLeft), maxLeft),
            Math.min(Math.max((itemsElm.clientHeight - (Number.parseInt(style.paddingTop) || 0) - (Number.parseInt(style.paddingBottom) || 0)) * (nextSlide ? 1 : -1), minTop), maxTop),
        ];
        parent.scrollBy({
            left: scrollLeft,
            top: scrollRight,
            behavior: 'smooth',
        });
    };
    const scrollTo = (targetSlide) => {
        if (!targetSlide)
            return;
        const parent = targetSlide.parentElement;
        // calculate the limit of the allowed scrolling distances:
        const [minLeft, maxLeft, minTop, maxTop] = [
            -parent.scrollLeft,
            (parent.scrollWidth - parent.clientWidth) - parent.scrollLeft,
            -parent.scrollTop,
            (parent.scrollHeight - parent.clientHeight) - parent.scrollTop,
        ];
        // calculate the scrolling distance:
        const style = getComputedStyle(parent);
        const dimension = Dimension.from(targetSlide);
        const [scrollLeft, scrollRight] = [
            Math.min(Math.max(dimension.offsetLeft - (Number.parseInt(style.paddingLeft) || 0), minLeft), maxLeft),
            Math.min(Math.max(dimension.offsetTop - (Number.parseInt(style.paddingTop) || 0), minTop), maxTop),
        ];
        parent.scrollBy({
            left: scrollLeft,
            top: scrollRight,
            behavior: 'smooth',
        });
    };
    const isBeginOfScroll = (itemsElm) => ((itemsElm.scrollLeft <= 0.5)
        &&
            (itemsElm.scrollTop <= 0.5));
    const isEndOfScroll = (itemsElm) => ((((itemsElm.scrollWidth - itemsElm.clientWidth) - itemsElm.scrollLeft) <= 0.5)
        &&
            (((itemsElm.scrollHeight - itemsElm.clientHeight) - itemsElm.scrollTop) <= 0.5));
    const handlePrev = (e) => {
        if (!e.defaultPrevented) {
            const dummyElm = listDummyRef.current;
            const itemsElm = listRef.current;
            if (infiniteLoop && dummyElm) {
                if (itemsElm && isBeginOfScroll(itemsElm)) {
                    // move the last item to the first:
                    const item = itemsElm.lastElementChild;
                    if (item) {
                        // remember the current scrollPos before modifying:
                        const scrollPos = itemsElm.scrollLeft;
                        itemsElm.insertBefore(item, itemsElm.firstElementChild); // insert the items at the beginning
                        // set the current scrollPos to the next item, so the scrolling effect can occur:
                        itemsElm.scrollTo({ left: (scrollPos + itemsElm.clientWidth), behavior: 'instant' }); // no scrolling animation during sync
                    } // if
                    // calculate the diff of itemsElm & dummyElm:
                    setDummyDiff(-1);
                } // if
                if (isBeginOfScroll(dummyElm)) {
                    // scroll to last:
                    scrollTo(dummyElm.lastElementChild);
                }
                else {
                    // scroll to previous:
                    scrollBy(dummyElm, false);
                } // if
                // all necessary task has been performed, no further action needed:
                e.preventDefault();
            }
            else if (itemsElm) {
                if (isBeginOfScroll(itemsElm)) {
                    // scroll to last:
                    scrollTo(itemsElm.lastElementChild);
                }
                else {
                    // scroll to previous:
                    scrollBy(itemsElm, false);
                } // if
                // all necessary task has been performed, no further action needed:
                e.preventDefault();
            } // if
        } // if
    };
    const handleNext = (e) => {
        if (!e.defaultPrevented) {
            const dummyElm = listDummyRef.current;
            const itemsElm = listRef.current;
            if (infiniteLoop && dummyElm) {
                if (itemsElm && isEndOfScroll(itemsElm)) {
                    // move the first item to the last:
                    const item = itemsElm.firstElementChild;
                    if (item) {
                        // remember the current scrollPos before modifying:
                        const scrollPos = itemsElm.scrollLeft;
                        itemsElm.append(item); // insert the items at the end
                        // set the current scrollPos to the prev item, so the scrolling effect can occur:
                        itemsElm.scrollTo({ left: (scrollPos - itemsElm.clientWidth), behavior: 'instant' }); // no scrolling animation during sync
                    } // if
                    // calculate the diff of itemsElm & dummyElm:
                    setDummyDiff(1);
                } // if
                if (isEndOfScroll(dummyElm)) {
                    // scroll to first:
                    scrollTo(dummyElm.firstElementChild);
                }
                else {
                    // scroll to next:
                    scrollBy(dummyElm, true);
                } // if
                // all necessary task has been performed, no further action needed:
                e.preventDefault();
            }
            else if (itemsElm) {
                if (isEndOfScroll(itemsElm)) {
                    // scroll to first:
                    scrollTo(itemsElm.firstElementChild);
                }
                else {
                    // scroll to next:
                    scrollBy(itemsElm, true);
                } // if
                // all necessary task has been performed, no further action needed:
                e.preventDefault();
            } // if
        } // if
    };
    // jsx:
    return (React.createElement(Content, { ...restProps, 
        // classes:
        mainClass: props.mainClass ?? sheet.main },
        children && React.createElement(React.Fragment, null,
            React.createElement(Element, { 
                // essentials:
                elmRef: (elm) => {
                    setRef(elmRef, elm);
                    if (!infiniteLoop)
                        setRef(scrollRef, elm);
                    setRef(listRef, elm);
                }, 
                // semantics:
                tag: itemsTag, role: itemsRole, semanticTag: itemsSemanticTagFn, semanticRole: itemsSemanticRoleFn, 
                // classes:
                mainClass: itemsMainClass, classes: [...(itemsClasses ?? []),
                    'items',
                ], variantClasses: itemsVariantClasses, stateClasses: itemsStateClasses }, React.Children.map(children, (child, index) => (isTypeOf(child, CarouselItem)
                ?
                    React.createElement(child.type
                    // other props:
                    , { ...child.props, 
                        // essentials:
                        key: child.key ?? index, 
                        // semantics:
                        tag: child.props.tag ?? itemTag, role: child.props.role ?? itemRole, semanticTag: child.props.semanticTag ?? itemSemanticTagFn, semanticRole: child.props.semanticRole ?? itemSemanticRoleFn, 
                        // classes:
                        mainClass: itemMainClass, classes: itemClasses, variantClasses: itemVariantClasses, stateClasses: itemStateClasses })
                :
                    React.createElement(CarouselItem
                    // essentials:
                    , { 
                        // essentials:
                        key: index, 
                        // semantics:
                        tag: itemTag, role: itemRole, semanticTag: itemSemanticTagFn, semanticRole: itemSemanticRoleFn }, child)))),
            infiniteLoop && React.createElement(Element, { 
                // essentials:
                elmRef: (elm) => {
                    setRef(scrollRef, elm);
                    setRef(listDummyRef, elm);
                }, "aria-hidden": true, 
                // classes:
                mainClass: 'items dummy', 
                // events:
                onScroll: (e) => {
                    const diff = dummyDiff.current;
                    if (!diff)
                        return; // no difference => nothing to do
                    const dummyElm = e.target;
                    const itemsElm = listRef.current;
                    if (!itemsElm)
                        return; // itemsElm must be exist to normalize
                    const style = getComputedStyle(dummyElm);
                    const step = dummyElm.clientWidth - (Number.parseInt(style.paddingLeft) || 0) - (Number.parseInt(style.paddingRight) || 0);
                    if (dummyElm.scrollLeft % step)
                        return; // not an exact step => scrolling is still in progress => abort
                    normalizeScrollItems(itemsElm);
                } }, React.Children.map(children, (child, index) => (React.createElement("div", { 
                // essentials:
                key: index }))))),
        //#region has class prevBtn
        isTypeOf(prevBtn, Element)
            &&
                prevBtn.props.classes?.includes('prevBtn')
            //#endregion has class prevBtn
            ?
                React.createElement(prevBtn.type
                // other props:
                , { ...prevBtn.props, 
                    // events:
                    onClick: (e) => {
                        prevBtn.props.onClick?.(e);
                        handlePrev(e);
                    } })
            :
                React.createElement(NavButton
                // classes:
                , { 
                    // classes:
                    classes: [
                        'prevBtn',
                    ], 
                    // accessibilities:
                    label: 'Previous', 
                    // appearances:
                    icon: 'prev', 
                    // events:
                    onClick: handlePrev }, prevBtn),
        //#region has class nextBtn
        isTypeOf(nextBtn, Element)
            &&
                nextBtn.props.classes?.includes('nextBtn')
            //#endregion has class nextBtn
            ?
                React.createElement(nextBtn.type
                // other props:
                , { ...nextBtn.props, 
                    // events:
                    onClick: (e) => {
                        nextBtn.props.onClick?.(e);
                        handleNext(e);
                    } })
            :
                React.createElement(NavButton
                // classes:
                , { 
                    // classes:
                    classes: [
                        'nextBtn',
                    ], 
                    // accessibilities:
                    label: 'Next', 
                    // appearances:
                    icon: 'next', 
                    // events:
                    onClick: handleNext }, nextBtn),
        nav
            ?
                (isTypeOf(nav, Element)
                    ?
                        React.createElement(nav.type
                        // other props:
                        , { ...nav.props, 
                            // essentials:
                            key: nav.key, 
                            // classes:
                            classes: [...(nav.props.classes ?? []),
                                'nav', // inject nav class
                            ], ...(isTypeOf(nav, Navscroll) ? {
                                // scrolls:
                                targetRef: nav.props.targetRef ?? (infiniteLoop ? listDummyRef : listRef),
                                interpolation: nav.props.interpolation ?? true,
                            } : {}) })
                    :
                        nav)
            :
                React.createElement(Navscroll
                // variants:
                , { 
                    // variants:
                    theme: props.theme, size: props.size, listStyle: 'bullet', orientation: 'inline', 
                    // behaviors:
                    actionCtrl: true, 
                    // classes:
                    classes: [
                        'nav', // inject nav class
                    ], 
                    // scrolls:
                    targetRef: (infiniteLoop ? listDummyRef : listRef), interpolation: true }, React.Children.map(children, (child, index) => (React.createElement(NavscrollItem
                // essentials:
                , { 
                    // essentials:
                    key: index, 
                    // semantics:
                    tag: 'button', ...(React.isValidElement(child) ? {
                        title: child.props.title,
                    } : {}) }))))));
}
export { Carousel as default };
function NavButton(props) {
    // jsx:
    return (React.createElement(ButtonIcon
    // other props:
    , { ...props, 
        // variants:
        size: props.size ?? 'lg', gradient: props.gradient ?? true, btnStyle: props.btnStyle ?? 'ghost' }));
}
