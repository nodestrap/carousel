// react:
import { default as React, useRef, useEffect, } from 'react'; // base technology of our nodestrap components
// cssfn:
import { 
// compositions:
mainComposition, 
// styles:
style, imports, 
// rules:
rule, fallbacks, 
//combinators:
children, } from '@cssfn/cssfn'; // cssfn core
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
setRef, } from '@nodestrap/utilities';
// nodestrap components:
import { Element, } from '@nodestrap/element';
import { 
// hooks:
usesSizeVariant, usesPadding, expandPadding, } from '@nodestrap/basic';
import { usesContentChildrenOptions, usesContentLayout, usesContentVariants, 
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
// .carousel > .items > .item > .media
const itemsElm = ':where(.items)'; // zero specificity
const dummyElm = '.dummy';
const itemElm = '*'; // zero specificity
const prevBtnElm = '.prevBtn';
const nextBtnElm = '.nextBtn';
const navElm = '.nav';
export const usesCarouselItemsLayout = (options = {}) => {
    // dependencies:
    // spacings:
    const [, paddingRefs] = usesPadding();
    return style({
        ...imports([
            // resets:
            stripoutList(),
            stripoutScrollbar(), // hides browser's scrollbar
        ]),
        ...style({
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
            ...children(itemElm, {
                ...imports([
                    usesCarouselItemLayout(options),
                ]),
            }),
            // customize:
            ...usesGeneralProps(usesPrefixedProps(cssProps, 'items')), // apply general cssProps starting with items***
        }),
    });
};
export const usesCarouselItemLayout = (options = {}) => {
    // options:
    const { mediaSelectorWithExcept, } = usesContentChildrenOptions(options);
    return style({
        // layouts:
        display: 'flex',
        flexDirection: 'column',
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
        ...children(mediaSelectorWithExcept, {
            ...imports([
                usesCarouselMediaLayout(),
            ]),
        }),
        // customize:
        ...usesGeneralProps(usesPrefixedProps(cssProps, 'item')), // apply general cssProps starting with item***
    });
};
export const usesCarouselMediaLayout = () => {
    return style({
        ...imports([
            stripoutImage(), // removes browser's default styling on image
        ]),
        ...style({
            // layouts:
            ...rule(':where(:first-child:last-child)', {
                display: 'block',
                // sizes:
                // span to maximum width/height while keeps aspect-ratio:
                boxSizing: 'border-box',
                maxInlineSize: 'fill-available',
                maxBlockSize: 'fill-available',
                ...fallbacks({
                    maxInlineSize: '100%',
                    maxBlockSize: '100%',
                }),
                inlineSize: 'auto',
                blockSize: 'auto',
            }),
            // sizes:
            flex: [[0, 0, 'auto']],
            // customize:
            ...usesGeneralProps(usesPrefixedProps(cssProps, 'media')), // apply general cssProps starting with media***
        }),
    });
};
export const usesNavBtnLayout = () => {
    return style({
        // customize:
        ...usesGeneralProps(usesPrefixedProps(cssProps, 'navBtn')), // apply general cssProps starting with navBtn***
    });
};
export const usesPrevBtnLayout = () => {
    return style({
        // layouts:
        gridArea: 'prevBtn',
        // customize:
        ...usesGeneralProps(usesPrefixedProps(cssProps, 'prevBtn')), // apply general cssProps starting with prevBtn***
    });
};
export const usesNextBtnLayout = () => {
    return style({
        // layouts:
        gridArea: 'nextBtn',
        // customize:
        ...usesGeneralProps(usesPrefixedProps(cssProps, 'nextBtn')), // apply general cssProps starting with nextBtn***
    });
};
export const usesNavLayout = () => {
    return style({
        // layouts:
        gridArea: 'nav',
        // sizes:
        justifySelf: 'center',
        // customize:
        ...usesGeneralProps(usesPrefixedProps(cssProps, 'nav')), // apply general cssProps starting with nav***
    });
};
export const usesCarouselLayout = (options = {}) => {
    return style({
        ...imports([
            // layouts:
            usesContentLayout(),
        ]),
        ...style({
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
            ...children(itemsElm, {
                ...imports([
                    usesCarouselItemsLayout(options),
                ]),
            }),
            ...children(dummyElm, {
                // appearances:
                // visibility : 'hidden', // causing onScroll doesn't work in Firefox
                opacity: 0,
                position: 'relative',
                zIndex: -1,
            }),
            ...children([prevBtnElm, nextBtnElm], {
                ...imports([
                    usesNavBtnLayout(),
                ]),
            }),
            ...children(prevBtnElm, {
                ...imports([
                    usesPrevBtnLayout(),
                ]),
            }),
            ...children(nextBtnElm, {
                ...imports([
                    usesNextBtnLayout(),
                ]),
            }),
            ...children(navElm, {
                ...imports([
                    usesNavLayout(),
                ]),
            }),
            // customize:
            ...usesGeneralProps(cssProps),
            // spacings:
            ...expandPadding(cssProps), // expand padding css vars
        }),
    });
};
export const usesCarouselVariants = () => {
    // dependencies:
    // layouts:
    const [sizes] = usesSizeVariant((sizeName) => style({
        // overwrites propName = propName{SizeName}:
        ...overwriteProps(cssDecls, usesSuffixedProps(cssProps, sizeName)),
    }));
    return style({
        ...imports([
            // variants:
            usesContentVariants(),
            // layouts:
            sizes(),
        ]),
    });
};
export const useCarouselSheet = createUseSheet(() => [
    mainComposition(imports([
        // layouts:
        usesCarouselLayout(),
        // variants:
        usesCarouselVariants(),
    ])),
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
function CarouselItem(props) {
    // jsx:
    return (React.createElement(Element, { ...props }));
}
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
    // components:
    prevBtn = React.createElement(ButtonIcon, { size: 'lg', nude: false, gradient: true, outlined: false, btnStyle: 'ghost' }), nextBtn = React.createElement(ButtonIcon, { size: 'lg', nude: false, gradient: true, outlined: false, btnStyle: 'ghost' }), nav = React.createElement(Navscroll, { orientation: 'inline', nude: false, mild: true, listStyle: 'bullet' }), 
    // children:
    children, ...restCarouselProps } = props;
    const { 
    // layouts:
    size, 
    // orientation,
    nude, 
    // colors:
    theme, gradient, outlined, mild, } = restCarouselProps;
    // fn props:
    const itemsTotal = React.Children.count(children);
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
                let itemsShifted = false;
                if (itemsElm && isBeginOfScroll(itemsElm)) {
                    // move the last item to the first:
                    const item = itemsElm.lastElementChild;
                    if (item) {
                        // remember the current scrollPos before modifying:
                        const scrollPos = itemsElm.scrollLeft;
                        itemsElm.insertBefore(item, itemsElm.firstElementChild); // insert the items at the beginning
                        itemsShifted = true;
                        // set the current scrollPos to the next item, so the scrolling effect can occur:
                        itemsElm.scrollTo({ left: (scrollPos + itemsElm.clientWidth), behavior: 'instant' }); // no scrolling animation during sync
                    } // if
                    // calculate the diff of itemsElm & dummyElm:
                    setDummyDiff(-1);
                } // if
                const doScroll = () => {
                    if (isBeginOfScroll(dummyElm)) {
                        // scroll to last:
                        scrollTo(dummyElm.lastElementChild);
                    }
                    else {
                        // scroll to previous:
                        scrollBy(dummyElm, false);
                    } // if
                };
                if (itemsShifted) {
                    setTimeout(doScroll, 0); // wait until scrolling shift completed and then doScroll()
                }
                else {
                    doScroll();
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
                let itemsShifted = false;
                if (itemsElm && isEndOfScroll(itemsElm)) {
                    // move the first item to the last:
                    const item = itemsElm.firstElementChild;
                    if (item) {
                        // remember the current scrollPos before modifying:
                        const scrollPos = itemsElm.scrollLeft;
                        itemsElm.append(item); // insert the items at the end
                        itemsShifted = true;
                        // set the current scrollPos to the prev item, so the scrolling effect can occur:
                        itemsElm.scrollTo({ left: (scrollPos - itemsElm.clientWidth), behavior: 'instant' }); // no scrolling animation during sync
                    } // if
                    // calculate the diff of itemsElm & dummyElm:
                    setDummyDiff(1);
                } // if
                const doScroll = () => {
                    if (isEndOfScroll(dummyElm)) {
                        // scroll to first:
                        scrollTo(dummyElm.firstElementChild);
                    }
                    else {
                        // scroll to next:
                        scrollBy(dummyElm, true);
                    } // if
                };
                if (itemsShifted) {
                    setTimeout(doScroll, 0); // wait until scrolling shift completed and then doScroll()
                }
                else {
                    doScroll();
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
    const defaultComponentProps = {
        // variants:
        // layouts:
        size: size,
        // orientation : orientation,
        nude: nude,
        // colors:
        theme: theme,
        gradient: gradient,
        outlined: outlined,
        mild: mild,
    };
    const defaultPrevBtnProps = {
        // classes:
        classes: [
            'prevBtn',
        ],
        // accessibilities:
        label: 'Previous',
        // appearances:
        icon: 'prev',
        // events:
        onClick: handlePrev,
        // others:
        ...defaultComponentProps,
    };
    const defaultNextBtnProps = {
        // classes:
        classes: [
            'nextBtn',
        ],
        // accessibilities:
        label: 'Next',
        // appearances:
        icon: 'next',
        // events:
        onClick: handleNext,
        // others:
        ...defaultComponentProps,
    };
    const defaultNavscrollProps = {
        // classes:
        classes: [
            'nav',
        ],
        // scrolls:
        targetRef: (infiniteLoop ? listDummyRef : listRef),
        interpolation: true,
        // others:
        ...defaultComponentProps,
    };
    return (React.createElement(Content, { ...restCarouselProps, 
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
                semanticTag: ['ul', 'ol'], semanticRole: 'list', 
                // classes:
                classes: [
                    'items',
                ] }, React.Children.map(children, (child, index) => (React.createElement(CarouselItem
            // essentials:
            , { 
                // essentials:
                key: index, 
                // semantics:
                semanticTag: 'li', semanticRole: 'listitem' }, child)))),
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
        React.cloneElement(React.cloneElement(prevBtn, defaultPrevBtnProps), (!prevBtn.props.onClick ? prevBtn.props : { ...prevBtn.props, onClick: (e) => { prevBtn.props.onClick?.(e); defaultPrevBtnProps.onClick?.(e); } })),
        React.cloneElement(React.cloneElement(nextBtn, defaultNextBtnProps), (!nextBtn.props.onClick ? nextBtn.props : { ...nextBtn.props, onClick: (e) => { nextBtn.props.onClick?.(e); defaultNextBtnProps.onClick?.(e); } })),
        React.cloneElement(React.cloneElement(nav, defaultNavscrollProps, React.Children.map(children, (child, index) => (React.createElement(NavscrollItem
        // essentials:
        , { 
            // essentials:
            key: index, 
            // semantics:
            tag: 'button', ...(React.isValidElement(child) ? {
                title: child.props.title,
            } : {}) })))), nav.props)));
}
export { Carousel as default };
